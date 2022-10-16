/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-01 16:26:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:28:45
 */
import mapUtils from "./mapUtils";
import Popup from "@/components/Popup";
import Vue from "vue";
import store from "@/store";
import router from "@/router";
export default {
  selectClickObj: null,
  selectClickObjEvent: null,
  vue:null,
  initMap(id,that) {
    this.vue=that
    
    mapObj.loadMap(
      {
        container: document.getElementById(id), //container参数支持兼容string和HTMLDivElement
        accessToken: "accessToken",
      },
      (maps, map) => {
        window.$tMap = map.map;
        mapObj.Tool.addControl("Zoom");
        mapObj.Tool.addControl("ZoomSlider");
        //  // 鼠标位置控件
        mapObj.Tool.addControl("MousePosition", {
          className: "", //坐标信息显示样式类名，默认是'custom-mouse-position'
          target: "mousePosition", //显示鼠标位置信息的目标容器
          format: "x：{x},y：{y}", //坐标格式
          len: 12, //坐标保留位数
        });
      }
    );
  },
  /**
   * @name: selectClick
   * @description: 单击选中
   * @msg:
   * @param {*} styles 样式
   * @param {*} callback
   * @return {*}
   */
  selectClick(styles, callback) {
    this.selectClickObj = mapUtils.selectClick(styles);
    window.$tMap.addInteraction(this.selectClickObj);
    this.selectClickObjEvent = this.selectClickObj.on("select", (e) => {
      if (typeof callback == "function") callback(e);
      if (!e.selected[0]) return;
      this.addPopup(
        {
          html: `<div id='PropUp-con'></div>`,
          position: "",
          feature: e.selected[0],
        },
        () => {
          //点击取消按钮的回调
          this.selectClickObj.getFeatures().clear();
        }
      );
      // 挂载vue组件
      let mountTest = Vue.extend(Popup); //将导入组件转为类
      new mountTest({
        router,
        store,
        propsData:{
          feature:mapUtils.getFeatureDatas(e.selected)[0]
        }
      }).$mount("#PropUp-con"); //实例化组件类,挂载到
    });
  },
  addPopup(options = { html: "", position: [] }, callback) {
    let { feature, position } = options;
    /**
     * 实现popup的html元素
     */
    let container = document.getElementById("popup");
    let content = document.getElementById("popup-content");
    let closer = document.getElementById("popup-closer");
    // 移除多余的popup
    let popups = [];
    window.$tMap.getOverlays().forEach((item) => {
      if (item.values_.type == "popup") {
        popups.push(item);
      }
    });
    if (popups.length) {
      popups.forEach((item) => {
        window.$tMap.getOverlays().remove(item);
      });
    }
    /**
     * 在地图容器中创建一个Overlay
     */
    let popup = new ol.Overlay(
      /** @type {olx.OverlayOptions} */
      ({
        //要转换成overlay的HTML元素
        element: container,
        //当前窗口可见
        autoPan: true,
        // 距离顶部的距离
        autoPanMargin: 150,
        //Popup放置的位置
        positioning: "bottom-center",
        //是否应该停止事件传播到地图窗口
        stopEvent: true,
        autoPanAnimation: {
          //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
          duration: 250,
        },
        offset: [0, -20],
      })
    );
    popup.values_.type = "popup";
    window.$tMap.addOverlay(popup);
    content.innerHTML = options.html;
    let pos = [];
    if (feature) {
      if (feature.getGeometry().getType() == "Point") {
        pos = feature.getGeometry().getCoordinates();
      } else if (feature.getGeometry().getType() == "LineString") {
        pos = feature.getGeometry().getCoordinates()[
          Math.floor(feature.getGeometry().getCoordinates().length / 2)
        ];
        pos = options.clickPosition || pos;
      } else if (feature.getGeometry().getType() == "Polygon") {
        let poss = feature.getGeometry().getCoordinates()[0];
        let extent = ol.extent.boundingExtent(poss); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
        let center = ol.extent.getCenter(extent); //获取边界区域的中心位置
        pos = center;
      }
    } else if (position) {
      pos = position;
    }

    feature && popup.setPosition(pos);
    position && popup.setPosition(pos);
    /**
     * 添加关闭按钮的单击事件（隐藏popup）
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function () {
      //未定义popup位置
      popup.setPosition(undefined);
      //失去焦点
      closer.blur();
      if (typeof callback == "function") callback();
      return false;
    };
  },
};

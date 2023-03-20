/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2022-06-02 09:13:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-12 15:59:16
 */
import featureStyle from "@/utils/config/featureStyle";

export default {
  async initLayer($httpRequest,callback) {
    // 请求数据
    let res
    let getItemUser=localStorage.getItem("user")
    let user={}
    if(getItemUser){
      user=JSON.parse(getItemUser)
     }
    try{
       res = await $httpRequest.getAllPoint({userId:user.userId});
     }catch(error){
       Message.error("点位加载失败："+error.message)
     }
    // 创建图层
    let layer = this.createLayer(res?res.data:null);
    layer.set("layertype", "point");
    layer.set("isBase", true);
    // 设置样式
    layer.setStyle((feature) => {
      let style = this.setStyle(feature, featureStyle.point.dao);
      return style;
    });
    // 添加图层
    let all = window.$tMap.getLayers().getArray();
    let f = [];
    // 查找当前图层
    all.forEach((item, i) => {
      if (item.values_.layertype == "point") {
        f.push(i);
      }
    });
    // 无则新增，有则重置
    if (!f[0]) {
      window.$tMap.addLayer(layer);
    } else {
      window.$tMap.getLayers().setAt(f[0], layer);
    }
    if(typeof callback=="function")callback()
  },
  // 创建图层
  createLayer: (data) => {
    let source = new ol.source.Vector({
      features: data ? new ol.format.GeoJSON().readFeatures(data) : [],
      wrapX: false,
      crossOrigin: "anonymous",
    });
    return new ol.layer.Vector({
      zIndex: 5,
      visible: true,
      source: source,
    });
  },
  // 设置样式
  setStyle(feature, styles) {
    let style;
    if (feature.getGeometry().getType() == "Point") {
      style = this.setLabelStyle(feature, styles);
    } else {
      style = this.setLayerStyle(feature, styles);
    }
    return style;
  },
  // 要素样式
  setLabelStyle(bm, styles) {
    console.log(bm, styles);
    return new ol.style.Style({
      image:
        styles.image && styles.image.src
          ? new ol.style.Icon({
              src: styles.image.src || "", //图标的URL
              color: "#fff", //颜色、渐变或图案
              offset: styles.image.offset || [0, 0], //偏移值，默认为[0,0]
              opacity: styles.image.opacity || 1, //默认是1  （0，1）
              scale: styles.image.scale || 1, //默认是1
              size: 0, //图标大小(以像素为单位)。
            })
          : new ol.style.Circle({
              radius: styles.circle.radius || 8,
              stroke: new ol.style.Stroke({
                color: styles.circle.strokeColor || "rgba(0, 0, 0, 0)",
                width: styles.circle.strokeWidth || 1, // 边框宽度
              }),
              fill: new ol.style.Fill({
                color: styles.circle.fillColor || "rgba(45, 200, 150, 1)",
              }),
            }),
      text: new ol.style.Text({
        text: bm.get(styles.text.textField || "") || "",
        fill: new ol.style.Fill({
          color: styles.text.fill ? styles.text.fill.color || "#000" : "#000",
        }),
        backgroundFill: new ol.style.Fill({
          color: "rgba(255,255,255,0)",
        }),
        font: "normal 13px 微软雅黑",
        textAlign: styles.text.textAlign || "center",
        textBaseline: styles.text.textBaseline || "middle",
        offsetX: styles.text.offsetX || 0,
        offsetY: styles.text.offsetY || 10,
        padding: styles.text.padding || [0, 3, 0, 3],
        stroke: new ol.style.Stroke({
          color: styles.text.stroke
            ? styles.text.stroke.color || "rgba(255,255,255,0)"
            : "rgba(255,255,255,0)",
          width: styles.text.stroke ? styles.text.stroke.width || 1 : 1,
        }),
      }),
      geometry: function (feature) {
        var coordinates = [];
        if (feature.getGeometry().getType() == "LineString") {
          coordinates = feature.getGeometry().getCoordinates();
        } // else if (feature.getGeometry().getType() == "Polygon") {
        //   coordinates = feature.getGeometry().getCoordinates()[0];
        // } else
        if (feature.getGeometry().getType() == "Point") {
          coordinates = [feature.getGeometry().getCoordinates()];
          return new ol.geom.MultiPoint(coordinates);
        }
      },
    });
  },
  // 图层样式
  setLayerStyle(bm, styles = {}) {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: styles.line.fillColor || "rgba(0, 0, 0, 0.2)", //填充颜色
      }),
      stroke: new ol.style.Stroke({
        color: styles.line.strokeColor || "red", //边框颜色
        width: styles.line.strokeWidth || 1, // 边框宽度
      }),
      text: new ol.style.Text({
        text:
          bm.getGeometry().getType() == "Point"
            ? ""
            : styles.text.textField
            ? bm.get(styles.text.textField)
            : "",
        fill: new ol.style.Fill({
          color: styles.text.fillColor || "#000",
        }),
        backgroundFill: new ol.style.Fill({
          color: styles.text.backgroundFill || "rgba(255,255,255,0)",
        }),
        font: styles.text.font || "normal 10px 微软雅黑",
        textAlign: styles.text.textAlign || "center",
        textBaseline: styles.text.textBaseline || "middle",
        offsetX: styles.text.offsetX || 0,
        offsetY: styles.text.offsetY || 10,
        padding: styles.text.padding || [0, 3, 0, 3],
        stroke: new ol.style.Stroke({
          color: styles.text.strokeColor || "#fff",
          width: styles.text.strokeWidth || 1,
        }),
      }),
    });
  },
  // 选择器
  selectClick(styles = {}) {
    return new ol.interaction.Select({
      multi: styles.multi == true ? true : false,
      condition: ol.events.condition.singleClick,
      style: (feature) => {
        return this.setStyle(feature, styles);
      },
    });
  },
  // 获取要素数据
  getFeatureDatas(features) {
    let f = [];
    features.forEach((item) => {
      let val = item.values_;
      let v = {};
      for (let key in val) {
        if (key != "geometry") v[key] = val[key];
      }
      v.position = item.getGeometry().getCoordinates();
      f.push(v);
    });
    return f;
  },
};

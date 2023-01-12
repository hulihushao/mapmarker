<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-01 16:23:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-12 15:55:52
-->
<template>
  <div id="mapCon">
    <TimeData/>
    <div id="map"></div>
    <div id="mousePosition"></div>
    <MapTool />
    <!-- 提示框容器 -->
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <FormDialog></FormDialog>
    <User />
    <div class="bar">
      <el-button
        style="border: none; border-radius: 0"
        size="small"
        plain
        @click="reStore"
        ><i class="el-icon-refresh" style="font-size: 13px"></i
      ></el-button>
      <el-button
        style="border: none; margin: 0; border-radius: 0"
        size="small"
        plain
        @click="location"
        ><i class="el-icon-place" style="font-size: 13px"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
import mapUtils from "@/utils/map/mapUtils";
import featureStyle from "@/utils/config/featureStyle";
import MapTool from "@/components/MapTool";
import UploadPic from "@/components/UploadPic";
import FormDialog from "@/components/FormDialog";
import User from "@/components/User";
import TimeData from "@/components/Time";
export default {
  name: "Map",
  components: {
    UploadPic,
    MapTool,
    FormDialog,User,TimeData
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // 初始化地图
    this.$tMap.initMap("map", this);

    mapUtils.initLayer(this.$httpRequest);
    // 单击选择
    this.$tMap.selectClick(featureStyle.selectPoint, (e) => {
      console.log(e);
    });
  },
  methods:{
     reStore(){
      this.$tMap.reStore()
    },
    location() {
      if (navigator.geolocation) {
        //getCurrentPosition()中需要传入一个回调函数
        navigator.geolocation.getCurrentPosition(
          (location) => {
            mapObj.Tool.setPanTo(
              [location.coords.longitude, location.coords.latitude],
              20,
              () => {
                 window.$tMap.getView().setRotation(0)
              }
            );

          },
          (err) => {
            alert(1);
          }
        );
      } else {
        alert( "无法获取当前位置");
      }
    },
  },
  beforeDestroy(){
    this.$tMap.destory()
  }
};
</script>

<style lang="scss" scoped>
#mapCon {
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    overflow: hidden;
    height: 100%;
  }
  #mousePosition {
    width: 340px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    padding: 4px 5px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .bar{
    position:absolute;
    right:5%;
    top:80%;
  }
}
</style>

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
    <div id="map"></div>
    <div id="mousePosition"></div>
    <MapTool />
    <!-- 提示框容器 -->
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
    <FormDialog></FormDialog>
  </div>
</template>

<script>
import mapUtils from "@/utils/map/mapUtils";
import featureStyle from "@/utils/config/featureStyle";
import MapTool from "@/components/MapTool";
import UploadPic from "@/components/UploadPic";
import FormDialog from "@/components/FormDialog";

export default {
  name: "Map",
  components: {
    UploadPic,
    MapTool,
    FormDialog,
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
    width: 330px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    padding: 4px 5px;
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>

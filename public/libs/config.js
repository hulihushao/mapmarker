/*
 * @Author: your name
 * @Date: 2021-04-13 10:53:47
 * @LastEditTime: 2022-06-02 09:59:54
 * @LastEditors: sueRimn
 * @Description: 地图配置
 * @FilePath: \gis-Hmap2D\config.js
 */
/*
 *初始化配置项
 */
let initConfig = {
  options: {
    version: "",
    mapType: "BAIDU_MAP", //配置厂商地图
  },
};
/**
 * WGS84坐标系配置
 */
let WGS84MapConfig = new ol.proj.Projection({
  code: "EPSG:4326",
  extent: [-180, -90, 180, 90],
  units: "METERS",
  axisOrientation: "neu",
});
// 分辨率
var resolutions = [];
for (var i = 0; i < 19; i++) {
  resolutions[i] = Math.pow(2, 18 - i);
}


/**
 * 百度地图配置        mapType: "BAIDU_MAP"
 */
let BAIDUMapConfig = {
  //地图容器中要加载的图层列表
  layers: [
    //加载瓦片图层数据
    new ol.layer.Tile({
      zIndex:1,
      title: "百度地图",
      source: new ol.source.TileImage({
        projection: ol.proj.get("EPSG:3857"), //投影；
        tileGrid: new ol.tilegrid.TileGrid({
          origin: [0, 0],
          resolutions: resolutions,
        }),
        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
          if (!tileCoord) {
            return "";
          }
          var z = tileCoord[0];
          var x = tileCoord[1];
          var y = tileCoord[2];
          if (x < 0) {
            x = "M" + -x;
          }
          if (y < 0) {
            y = "M" + -y;
          }
          return (
            "https://maponline1.bdimg.com/onlinelabel/?qt=tile&x=" +
            x +
            "&y=" +
            y +
            "&z=" +
            z +
            "&styles=pl&udt=20151021&scaler=1&p=1"
          );
        },
        crossOrigin: "anonymous",
      }),
      isBaseLayer:true,
    }),
  ],
};
/**
 * 高德地图配置          mapType: "GAODE_MAP"
 */
let GAODEMapConfig = {
  layers: [
    //加载图层数据
    new ol.layer.Tile({
      title: "高德地图",
      zIndex:1,
      source: new ol.source.XYZ({
        url:
          "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
        wrapX: false,
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
      }),
      isBaseLayer:true
    }),
  ],
};
/**
 * 高德影像地图配置          mapType: "GAODEIMG_MAP"
 */
let GAODEIMGMapConfig = {
  layers: [
    //加载图层数据
    new ol.layer.Tile({
      title: "高德影像地图",
      zIndex:1,
      source: new ol.source.XYZ({
        url:
          "https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        wrapX: false,
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
      }),
      isBaseLayer:true
    }),
    //加载图层数据
    new ol.layer.Tile({
      title: "高德影像地图注记",
      zIndex:1,
      source: new ol.source.XYZ({
        url:
          "https://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
        wrapX: false,
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
      }),
      isBaseLayer:true
    }),
  ],
};
/** 
 * 天地图配置   mapType:  TIAN_MAP
 * https://www.tianditu.gov.cn/ 申请key
 * */
let TIANMapConfig = {
  layers: [
    new ol.layer.Tile({
      title: "天地图矢量图层",
      zIndex:1,
      source: new ol.source.XYZ({
        url:
          "https://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" /* TiandituKey */ +
          "27c199d949d448c75e9a241e996d65da", //TiandituKey为天地图密钥,
        wrapX: false,
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
        // maxZoom:10
      }),
      isBaseLayer:true,
      // maxZoom:10
    }),
    new ol.layer.Tile({
      title: "天地图矢量注记图层",
      zIndex:1,
      source: new ol.source.XYZ({
        url:
          "https://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=" /* TiandituKey */ +
          "27c199d949d448c75e9a241e996d65da", //TiandituKey为天地图密钥
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
        // maxZoom:10
      }),
      isBaseLayer:true,
      // maxZoom:10
    }),
  ],
};
// 天地图影像    mapType:  TIANIMG_MAP
let TIANMap_ImgConfig = {
  layers: [
    new ol.layer.Tile({
      title: "天地图影像图层",
      zIndex: 1,
      source: new ol.source.XYZ({
        url:
          "http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" /* TiandituKey */ +
          "27c199d949d448c75e9a241e996d65da", //TiandituKey为天地图密钥
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
      }),
      isBaseLayer: true,
      // maxZoom:10

    }),
    new ol.layer.Tile({
      title: "天地图影像标注图层",
      zIndex: 1,
      source: new ol.source.XYZ({
        url:
          "http://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" /* TiandituKey */ +
          "27c199d949d448c75e9a241e996d65da", //TiandituKey为天地图密钥
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
      }),
      isBaseLayer: true,
      // maxZoom:10


    }),
  ],
};
/**
 * 腾讯地图配置            mapType: "TX_MAP"
 */
let TX_MAPConfig = {
  layers: [
    new ol.layer.Tile({
      zIndex:1,
      title: "腾讯地图",
      source: new ol.source.XYZ({
        tileSize: 256,
        wrapX: false,
        tileUrlFunction(xyz) {
          const z = xyz[0];
          const x = xyz[1];
          const y = xyz[2];
          const newY = parseInt(String(2 ** z), 10) + y;
          return (
            `https://rt1.map.gtimg.com/realtimerender?z=${z}&x=${x}&y=${newY}&key=` /* TXkey */ +
            "UJCBZ-7DULU-QKPV5-43UXH-LGLY6-OQBCY"
          ); //TXkey为腾讯地图密钥
        },
        projection: ol.proj.get("EPSG:3857"), //投影；
        crossOrigin: "anonymous",
      }),
      isBaseLayer:true
    }),
  ],
};
//实例化鹰眼控件（OverviewMap）,自定义样式的鹰眼控件
var overviewMapControl = new ol.control.OverviewMap({
  //鹰眼控件样式
  className: "ol-overviewmap ol-custom-overviewmap",
  //鹰眼中加载同坐标系下不同数据源的图层
  layers: TIANMapConfig.layers,
  view: new ol.View({
    projection: "EPSG:4326",
  }),
  //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
  collapseLabel: "\u00BB",
  //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
  label: "\u00AB",
  //初始为展开显示方式
  collapsed: false,
});
let overviewMapControlObj = {
  overviewMapControl,
  show: false, //是否添加鹰眼控件
};
/*
 *加载地图配置项
 */
let LOADMapConfig = {
  mapUrl: [
    { indoor: "" },
    { outdoor: "" },
    { baseMap: "" },
  ], 
  layers: [{
    name:'全省遥感影像',/* 发布的图层名称 */ layerType:'1'/* 图层类型：1：瓦片，2：文档 */,maxZoom:15,/* 瓦片的最大级别 */
  }], //地图容器中要加载的图层列表    mapType:  ZONDY_MAP
  extent: [-180, -90, 180, 90], //限制视图的范围
  controls: { zoom: false /* rotate:true */ }, //最初添加到映射中的默认控件
  interactions: {
    //最初添加到地图的默认互动
    mouseWheelZoom: true, //允许滚轮缩放地图
    doubleClickZoom: false, //屏蔽双击放大事件
  },
  view: {
    center: [121.71614954715, 29.950921576339], //中心点，必填
    zoom: 8, //初始缩放级别，必填
    maxZoom: 22, //最大缩放级别，必填
    minZoom: 2, //最小缩放级别，必填
    projection: WGS84MapConfig, //投影坐标系,DEGREES:度数,FEET:英尺,METERS:米,PIXELS:像素,TILE_PIXELS:平铺像素	,USFEET:美国英尺
    // rotation: Math.PI / 6, //配合rotate:true使用
  },
  // isMaxZoom:true,
};

// 拉框图纸地图配置
let lktzMapConfig = {
  baseUrl:{
    MAPGIS_URL:'http://192.168.90.101:6163'//igserver地址
  },
  layers: 'TIAN_MAP',//地图类型
  interactions: {
    mouseWheelZoom: true, //允许滚轮缩放地图
    doubleClickZoom: false, //屏蔽双击放大事件
  },
  controls: { attribution: false, zoom: false, scale: true },
  view: {
    center: [114.05758237851842, 22.65751862453908], //中心点
    zoom: 18, //初始缩放级别
    maxZoom: 28, //最大缩放级别
    minZoom: 2, //最小缩放级别
    projection: WGS84MapConfig,
  },
  compassImg: "./static/icons/mbfuncbtn/North.png",//指北针图片
};
let TC={/* 除特殊情况无需更改 */
  service: "WFS",//必选
  version: "1.1.0",//必选
  request: "GetFeature",//必选
  outputFormat: "json",//必选
}










// let GSCG2000MapConfig={
// 4490
// }

﻿(function (win) {
  // 引入地图配置文件
  // document.write("<script language=javascript src='./config.js'></script>");

  //将Marker事件名称映射为gis厂商的事件名称
  const MarkerEvent = {
    click: "singleclick",
    dblclick: "dblclick",
    rightclick: "contextmenu",
    mouseover: "mousehover",
    mouseup: "mouseup",
    mousedown: "mousedown",
  };

  //将Map事件名称映射为gis厂商的事件名称
  const MapEvent = {
    click: "singleclick",
    dblclick: "dblclick",
    rightclick: "contextmenu",
    pointermove: "pointermove",
    mouseover: "pointerenter",
    mouseup: "pointerup",
    mousedown: "pointerdown",
    movestart: "movestart",
    moveend: "moveend",
    mousewheel: "wheel",
    touchmove: "touchmove",
  };

  //将Map事件名称（zoom相关）映射为gis厂商的事件名称
  const MapZoomEvent = {
    zoomstart: "zoomstart",
    zoomchanged: "zoomchanged",
    zoomend: "zoomend",
  };

  //将折线事件名称映射为gis厂商的事件名称
  const PolylineEvent = {
    click: "singleclick",
  };

  //生成随机数字符串
  var random = function () {
    const crypto = window.crypto || window.msCrypto;
    var array = new Uint32Array(1);
    return crypto.getRandomValues(array)[0];
  };

  var login = "/getGISUserToken";
  //坐标字符转数字
  var numberAdapter = function (coordinate) {
    return [parseFloat(coordinate[0]), parseFloat(coordinate[1])];
  };

  const conversionEvent = function (eventMap, event) {
    return Object.entries(eventMap).find((item) => item[1] == event)[0];
  };

  var Adapter = {};

  //定义gis厂商唯一标识符
  Adapter.getThirdPartyMapName = function () {
    return "ZONDY_MAP";
  };

  //定义gis厂商名称
  Adapter.getThirdPartyMapLabel = function () {
    return "中地数码";
  };

  /**
   * 初始化
   * @param initParam
       mapType: 'ZONDY_MAP',
       key: 'xxxxx',  //百度谷歌高德使用
       //url: selectedMap[1], //废弃
       //之前通过rest接口，使用用户名密码获取的第三方地图token
       token:"",
       //GIS厂商sdk中所有rest请求使用的基地址
       serviceURL:"",
   * @returns {Promise<Adapter>}
   */

  addMarker = function (options) {
    var tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.markers.forEach(function (marker) {
      var position = numberAdapter(marker.position);
      marker.position = [Number(position[0]), Number(position[1])];
      // if(marker.title){
      if (marker.titleStyle) {
        var offSet = marker.titleStyle.offset
          ? numberAdapter(marker.titleStyle.offset)
          : [0, -marker.height];
      } else {
        var offSet = [0, -marker.height];
      }
      marker.titleStyle = {
        text: marker.title,
        font: "10px sans-serif",
        offset: offSet,
        padding: [2, 5, 2, 5],
        fillColor: "#FFFFFF",
        strokeColor: "#FFDD51",
        backgroundFillColor: "#202a35",
        backgroundStrokeColor: "#202a35",
      };
      // }
    });
    return mapFacade.addMarker(tempOptions);
  };
  addClusterMarker = function (options) {
    var tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.markers.forEach(function (marker) {
      var position = numberAdapter(marker.position);
      marker.position = [Number(position[0]), Number(position[1])];
      // if(marker.title){
      if (marker.titleStyle) {
        var offSet = marker.titleStyle.offset
          ? numberAdapter(marker.titleStyle.offset)
          : [0, -marker.height];
      } else {
        var offSet = [0, -marker.height];
      }
      marker.titleStyle = {
        text: marker.title,
        font: "10px sans-serif",
        offset: offSet,
        padding: [2, 5, 2, 5],
        fillColor: "#FFFFFF",
        strokeColor: "#FFDD51",
        backgroundFillColor: "#202a35",
        backgroundStrokeColor: "#202a35",
      };
      // }
    });
    return mapFacade.addClusterMarker(tempOptions);
  };
  addFlashMarker = function (options) {
    var tempOptions = JSON.parse(JSON.stringify(options));
    tempOptions.markers.forEach(function (marker) {
      marker.position = numberAdapter(marker.position);
      // if(marker.title){
      if (marker.titleStyle) {
        var offSet = marker.titleStyle.offset
          ? numberAdapter(marker.titleStyle.offset)
          : [0, -marker.height];
      } else {
        var offSet = [0, -marker.height];
      }
      marker.titleStyle = {
        text: marker.title,
        font: "10px sans-serif",
        offset: offSet,
        padding: [2, 5, 2, 5],
        fillColor: "#FFFFFF",
        strokeColor: "#FFDD51",
        backgroundFillColor: "#202a35",
        backgroundStrokeColor: "#202a35",
      };
      // }
    });
    return mapFacade.addFlashMarker(tempOptions);
  };
  changeClusterTextStyle = function (options) {
    mapFacade.changeClusterTextStyle(options);
  };
  /*
   *图标事件
   */
  onMarker = function (eventName, instanceId, handler) {
    mapFacade.onMarker(
      MarkerEvent[eventName],
      instanceId,
      ({ feature, type, e }) => {
        var marker = feature.get("data");
        marker.positionNew = feature.getGeometry().flatCoordinates;
        handler({
          markerId: feature.id_,
          marker,
          type: conversionEvent(MarkerEvent, type),
          pixel: e
            ? { x: e.mapBrowserEvent.pixel[0], y: e.mapBrowserEvent.pixel[1] }
            : {},
        });
      }
    );
  };
  onMarker_click = function (instanceId, handler) {
    mapFacade.onMarker(
      MarkerEvent["click"],
      instanceId,
      ({ feature, type, e }) => {
        var marker = feature.get("data");
        marker.positionNew = feature.getGeometry().flatCoordinates;
        handler({
          markerId: feature.id_,
          marker,
          type: conversionEvent(MarkerEvent, type),
          pixel: e
            ? { x: e.mapBrowserEvent.pixel[0], y: e.mapBrowserEvent.pixel[1] }
            : {},
        });
      }
    );
  };
  onMarker_dblclick = function (instanceId, handler) {
    mapFacade.onMarker(
      MarkerEvent["dblclick"],
      instanceId,
      ({ feature, type, e }) => {
        var marker = feature.get("data");
        marker.positionNew = feature.getGeometry().flatCoordinates;
        handler({
          markerId: feature.id_,
          marker,
          type: conversionEvent(MarkerEvent, type),
          pixel: e
            ? { x: e.mapBrowserEvent.pixel[0], y: e.mapBrowserEvent.pixel[1] }
            : {},
        });
      }
    );
  };
  onMarker_rightclick = function (instanceId, handler) {
    mapFacade.onMarker(
      MarkerEvent["rightclick"],
      instanceId,
      ({ feature, type, e }) => {
        var marker = feature.get("data");
        marker.positionNew = feature.getGeometry().flatCoordinates;
        handler({
          markerId: feature.id_,
          marker,
          type: conversionEvent(MarkerEvent, type),
          pixel: e
            ? { x: e.mapBrowserEvent.pixel[0], y: e.mapBrowserEvent.pixel[1] }
            : {},
        });
      }
    );
  };
  removeMarkerEvent = function () {
    mapFacade.removeMarkerEvent();
  };

  getZoom = function () {
    return mapFacade.getZoom();
  };

  setZoom = function (options) {
    if (options.center) {
      options.center = numberAdapter(options.center);
    }
    mapFacade.setZoom(options);
  };
  zoomIn = function (callback) {
    mapFacade.zoomIn(callback);
  };
  zoomOut = function (callback) {
    mapFacade.zoomOut(callback);
  };
  centerPoint = function (options) {
    options.center = numberAdapter(options.center);
    mapFacade.centerPoint(options);
  };
  deleteMarker = function (id) {
    mapFacade.deleteMarker(id);
  };

  setLayerVisibility = function (layerId, visible) {
    mapFacade.setLayerVisibility(layerId, visible);
  };
  clearClusterMarker = function (id) {
    mapFacade.clearClusterMarker();
  };
  deleteLayer = function (options) {
    mapFacade.deleteLayer(options);
  };
  drawCustomPath = function (options) {
    (options.points || []).forEach(function (element) {
      element.coords = numberAdapter(element.coords);
    });
    mapFacade.drawCustomPath(
      Object.assign({}, options, {
        points: options.points.map((item) => item.coords),
      })
    );
  };
  clearPath = function (callback) {
    mapFacade.clearPath(callback);
  };
  calcRoutePath = function (options) {
    if (options.wayPoints) {
      options.wayPoints.forEach((element) => {
        element.coords = numberAdapter(element.coords);
      });
    }
    mapFacade.calcRoutePath(options);
  };
  clearRoutePath = function (callback) {
    mapFacade.clearRoutePath(callback);
  };
  /*
   * 地图鼠标事件
   */
  onMap = function (eventName, handler) {
    if (MapEvent[eventName]) {
      mapFacade.on(MapEvent[eventName], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        handler(arg);
      });
    }
  };

  removeOnMap = function (callback) {
    mapFacade.removeOn(callback);
  };
  /*
   * 缩放事件
   */
  onZoom = function (eventName, handler) {
    if (MapZoomEvent[eventName]) {
      mapFacade.onZoom(MapZoomEvent[eventName], handler);
    }
  };
  onZoom_start = function (handler) {
    if (MapZoomEvent["zoomstart"]) {
      mapFacade.onZoom(MapZoomEvent["zoomstart"], handler);
    }
  };
  onZoom_changed = function (handler) {
    if (MapZoomEvent["zoomchanged"]) {
      mapFacade.onZoom(MapZoomEvent["zoomchanged"], handler);
    }
  };
  onZoom_end = function (handler) {
    if (MapZoomEvent["zoomend"]) {
      mapFacade.onZoom(MapZoomEvent["zoomend"], handler);
    }
  };
  removeZoomEvent = function () {
    mapFacade.removeZoomEvent();
  };
  onClusterMarker = function (layerId, handler) {
    mapFacade.onClusterMarker(MarkerEvent["click"], layerId, (e) => {
      handler(e.feature.values_.features);
    });
  };
  addImageLayer = function (layerId, data) {
    for (var i = 0; i < data.length; i++) {
      data[i].leftBottom = numberAdapter(data[i].leftBottom);
      data[i].rightTop = numberAdapter(data[i].rightTop);
    }
    mapFacade.addImageLayer(layerId, data);
  };
  removeImageLayer = function (layerId) {
    mapFacade.removeImageLayer(layerId);
  };

  addrDeSearchSpaceCode = function (lng, lat, radius, callback) {
    mapFacade.addrDeSearchSpaceCode(lng, lat, radius, function (e) {
      callback({ spaceCode: e.spaceCodes[0] });
    });
  };
  addPopup = function (options) {
    options.position = numberAdapter(options.position);
    options.offset = numberAdapter(options.offset);
    var firstStr = "";
    if (options.boxTheme == "dark") {
      firstStr = "<div class='sp-infowin-box dark'";
    } else {
      firstStr = "<div class='sp-infowin-box light'";
    }
    if (options.height === 0) {
      options.height = "auto";
      firstStr += "'>";
    } else {
      firstStr += "style='height: " + options.height + "px;'>";
    }

    options.content =
      firstStr +
      "<div class='sp-infowin-top'><span class='sp-infowin-close'></span></div>" +
      options.content +
      "</div>";

    mapFacade.addPopup(options);

    var infoBoxs = document.getElementsByClassName("sp-infowin-close");
    for (var i = 0; i < infoBoxs.length; i++) {
      infoBoxs[i].onclick = function () {
        mapFacade.closePopup();
      };
    }
  };
  closePopup = function () {
    mapFacade.closePopup();
  };
  destroy = function () {
    mapFacade.destroy();
  };
  setMarkerHideLevel = function (level) {
    mapFacade.setMarkerHideLevel(level);
  };

  addrSearch = function (addr, callback) {
    mapFacade.searchAddress(addr, callback);
  };
  addrDeSearch = function (lng, lat, radius, callback, type) {
    lng = parseFloat(lng);
    lat = parseFloat(lat);
    mapFacade.addrDeSearch(lng, lat, radius, callback, type);
  };
  getCenter = function () {
    return mapFacade.getCenter();
  };
  trigger = function (instanceId, eventName, isshowindoor) {
    //isshowindoor新增判断是否嵌套在showindoormap使用
    mapFacade.activateMarker(instanceId, MarkerEvent[eventName], isshowindoor);
  };
  activeMarkers = function (markerIds, eventName) {
    mapFacade.activeMarkers(markerIds, MarkerEvent[eventName]);
  };
  deActiveMarkers = function (markerIds) {
    mapFacade.deActiveMarkers(markerIds);
  };
  addControl = function (controlType, options) {
    mapFacade.addControl(controlType, options);
  };
  // 添加比例尺控件
  addControl_Scale = function () {
    mapFacade.addControl("Scale");
  };
  //添加缩放控件
  addControl_Zoom = function () {
    mapFacade.addControl("Zoom");
  };

  addPolyline = function (options) {
    options.path.forEach((element) => {
      element = numberAdapter(element);
    });
    return mapFacade.addPolyline(options);
  };
  onPolyline = function (eventName, handler) {
    mapFacade.onPolyline(PolylineEvent[eventName], ({ feature }) => {
      handler({
        id: feature.id_,
        options: feature.values_.data,
      });
    });
  };
  /* onPolyline_click = function (handler) {
    mapFacade.onPolyline(PolylineEvent["click"], ({ feature }) => {
      handler({
        id: feature.id_,
        options: feature.values_.data,
      });
    });
  }; */
  deletePolyline = function (id) {
    mapFacade.deletePolyline(id);
  };

  getOriginMapObj = function () {
    return mapFacade.map.map;
  };
  clearOverlays = function () {
    mapFacade.clearOverlays();
  };
  /*
   * 室外切换到室内
   */
  showIndoorMap = function (options, callback) {
    mapFacade.showIndoorMap(options, callback);
  };

  addIndoorTip = function (buildingId) {
    mapFacade.addIndoorTip(buildingId);
  };
  removeIndoorTip = function (buildingId) {
    mapFacade.removeIndoorTip(buildingId);
  };
  /*
   * 室内切换到室外
   */
  switchOutdoor = function (callback) {
    mapFacade.switchOutdoor(callback);
  };
  /*
   * 绘制几何区域
   */
  drawGeometry = function (options, callback) {
    mapFacade.drawGeometry(options, callback);
  };
  drawGeometry_circle = function (options, callback) {
    if (options.type !== "circle") {
      throw new Error("type的值为circle");
    }
    mapFacade.drawGeometry(options, callback);
  };
  drawGeometry_rectangle = function (options, callback) {
    if (options.type !== "rectangle") {
      throw new Error("type的值为rectangle");
    }
    mapFacade.drawGeometry(options, callback);
  };
  drawGeometry_polygon = function (options, callback) {
    if (options.type !== "polygon") {
      throw new Error("type的值为polygon");
    }
    mapFacade.drawGeometry(options, callback);
  };
  /*
   * 创建或修改几何区域
   */
  setGeometry = function (options) {
    if (options.type == "circle") {
      options.centerPoint = numberAdapter(options.centerPoint);
    } else if (options.type == "rectangle") {
      options.bounds.forEach((element) => {
        element = numberAdapter(element);
      });
    } else if (options.type == "polygon") {
      options.pointList.forEach((element) => {
        element = numberAdapter(element);
      });
    }
    mapFacade.setGeometry(options);
  };
  setGeometry_circle = function (options) {
    if (options.type == "circle") {
      options.centerPoint = numberAdapter(options.centerPoint);
    } else {
      throw new Error("type的值为circle");
    }
    mapFacade.setGeometry(options);
  };
  setGeometry_rectangle = function (options) {
    if (options.type == "rectangle") {
      options.bounds.forEach((element) => {
        element = numberAdapter(element);
      });
    } else {
      throw new Error("type的值为rectangle");
    }
    mapFacade.setGeometry(options);
  };
  setGeometry_polygon = function (options) {
    if (options.type == "polygon") {
      options.pointList.forEach((element) => {
        element = numberAdapter(element);
      });
    } else {
      throw new Error("type的值为polygon");
    }
    mapFacade.setGeometry(options);
  };

  /*
   * 删除几何区域
   */
  removeGeometry = function (id) {
    mapFacade.removeGeometry(id);
  };
  /*
   * 显示热力图
   */
  showHeatMap = function (points, radius, opacity, gradient) {
    var newpoints = JSON.parse(JSON.stringify(points));
    newpoints.forEach(function (point) {
      point.lng = parseFloat(point.lng);
      point.lat = parseFloat(point.lat);
    });
    mapFacade.showHeatMap(newpoints, radius, opacity, gradient);
  };
  /*
   * 清除热力图
   */
  clearHeatMap = function (callback) {
    mapFacade.clearHeatMap(callback);
  };
  /*
   * 开启热力圈选
   */
  enableSelectMode = function (options) {
    mapFacade.enableSelectMode(options);
  };

  /*
   * 停止热力圈选
   */
  disableSelectMode = function () {
    mapFacade.disableSelectMode();
  };
  /*
   * 获取热力圈选
   */
  getSelectedHeatObjects = function (options) {
    return mapFacade.getSelectedHeatObjects(options);
  };
  /*
   * 获取Marker圈选
   */
  getSelectedMarkers = function (callback) {
    var markers = mapFacade.getSelectedMarkers();
    var mks = [];
    (markers || []).forEach(function (marker) {
      if (marker.values_ && marker.values_.data) {
        mks.push(marker.values_.data);
      }
    });
    callback(mks);
  };
  /*
   * 显示周界
   */
  displayPerimeter = function (options) {
    mapFacade.displayPerimeter(options);
  };

  /*
   * 清除周界
   */
  removePerimeter = function () {
    mapFacade.removePerimeter();
  };
  /*
   * 模型高亮显示
   */
  showModelHighlight = function (options) {
    mapFacade.showModelHighlight(options);
  };
  /*
   * 清除模型图层
   */
  removeModelHighlight = function () {
    mapFacade.removeModelHighlight();
  };
  /*
   * 显示全国分区
   */
  showZones = function (options) {
    mapFacade.showZones(options);
  };

  /*
   * 清除全国分区
   */
  clearZones = function () {
    mapFacade.clearZones();
  };
  /*
   * 获取地图建筑信息
   */
  getBuildingInfo = function (buildingId, callback) {
    mapFacade.getBuildingInfo(buildingId, function (e) {
      var el = {
        common: {
          buildingId: buildingId,
          floors: e.FLOORLIST,
          SMSDRIE: e.SMSDRIE, // 建筑东经
          SMSDRIN: e.SMSDRIN, // 建筑北纬
          SMSDRIS: e.SMSDRIS, // 建筑南纬
          SMSDRIW: e.SMSDRIW, // 建筑西经
        },
      };
      callback(el);
    });
  };
  /*
   * 响应建筑鼠标事件
   */
  onBuilding = function (eventName, handler) {
    mapFacade.onBuilding(MapEvent[eventName], handler);
  };
  onBuilding_click = function (handler) {
    mapFacade.onBuilding(MapEvent["click"], handler);
  };
  onBuilding_dblclick = function (handler) {
    mapFacade.onBuilding(MapEvent["dblclick"], handler);
  };
  onBuilding_rightclick = function (handler) {
    mapFacade.onBuilding(MapEvent["rightclick"], handler);
  };
  /*
   * 注销建筑鼠标事件
   */
  removeBuildingEvent = function () {
    mapFacade.removeBuildingEvent();
  };
  /*
   * 响应分区鼠标事件
   */
  onSelectZone = function (eventName, handler) {
    mapFacade.onSelectZone(MarkerEvent[eventName], handler);
  };
  /*
   * 注销分区鼠标事件
   */
  offSelectZone = function () {
    mapFacade.offSelectZone();
  };
  /*
   * 响应热力圈选事件
   */
  frameOn = function (eventName, handler) {
    mapFacade.frameOn(eventName, handler);
  };
  frameOn_begin = function (handler) {
    mapFacade.frameOn("begin", handler);
  };
  frameOn_end = function (handler) {
    mapFacade.frameOn("end", handler);
  };

  /*
   * 注销热力圈选事件
   */
  frameOff = function () {
    mapFacade.frameOff();
  };
  getNavigation = function (paramObj, callback) {
    if (paramObj.floor) {
      paramObj.buildingId = paramObj.floor.split(":")[0];
      paramObj.floorId = paramObj.floor.split(":")[1];
    }
    paramObj.centers = numberAdapter(paramObj.centers);
    mapFacade.getNavigation(paramObj, callback);
  };
  /*
   * 语音播报
   */
  speechPlay = function (paramObj) {
    isSelect({
      tex: paramObj.tex,
      spd: paramObj.spd,
      pit: paramObj.pit,
      vol: paramObj.vol,
      client_id: paramObj.client_id,
      client_secret: paramObj.client_secret,
    });
    mapFacade.speechPlay(paramObj);
  };

  /*
   * 停止语音播报
   */
  speechStop = function () {
    mapFacade.speechStop();
  };
  // 测距
  ranging = function (message, style, callback) {
    mapFacade.ranging(message, style, callback);
  };
  //测面
  measuringSurface = function (message, style, callback) {
    mapFacade.measuringSurface(message, style, callback);
  };
  clearDraw = function (callback) {
    mapFacade.clearDraw(callback);
  };
  //绘制点
  addPoint = function (featureStyle, callback) {
    return mapFacade.addPoint(featureStyle, callback);
  };
  //删除点要素
  removePoint = function (featureId) {
    mapFacade.removePoint(featureId);
  };
  //批量删除点要素
  removeAllPoints = function (featureId, callback) {
    mapFacade.removeAllPoints(featureId, callback);
  };
  //绘制线
  addLine = function (message, style, callback) {
    mapFacade.addLine("LineString", message, style, callback);
  };
  //绘制面
  addPolygon = function (message, style, callback) {
    mapFacade.addPolygon("surface", message, style, callback);
  };
  //删除线、面
  removeLine = function (lineId, callback) {
    mapFacade.removeLineAndSurface("line", lineId, callback);
  };
  removePolygon = function (surfaceId, callback) {
    mapFacade.removeLineAndSurface("surface", surfaceId, callback);
  };
  //批量删除线、面
  removeAllLines = function (lineIds, callback) {
    mapFacade.removeAllLineAndSurface("line", lineIds, callback);
  };
  removeAllPolygons = function (surfaceIds, callback) {
    mapFacade.removeAllLineAndSurface("surface", surfaceIds, callback);
  };
  // 绘制圆
  drawCircle = function (paramObj, callback) {
    mapFacade.drawCircle(paramObj, callback);
  };
  // 删除圆
  removeCircle = function (id, callback) {
    mapFacade.removeCircle(id, callback);
  };
  //结束绘制
  endDraw = function (callback) {
    mapFacade.endDraw(callback);
  };
  //
  modifyPoint = function (styles, callback) {
    mapFacade.modifyPoint(styles, callback);
  };
  //
  modifyLine = function (styles, callback) {
    mapFacade.modifyLine(styles, callback);
  };
  //修改面
  modifyPolygon = function (styles, callback) {
    mapFacade.modifyPolygon(styles, callback);
  };
  modifyFan = function (styles, callback) {
    mapFacade.modifyFan(styles, callback);
  };
  //结束修改
  endModify = function (callback) {
    mapFacade.endModify(callback);
  };
  //添加扇形
  addFan = function (options, id, style, callback) {
    return mapFacade.addFan(options, id, style, callback);
  };
  // 扇形样式
  setFanStyle = function (id, style, callback) {
    mapFacade.setFanStyle(id, style, callback);
  };
  // 圆样式
  setCircleStyle = function (id, style, callback) {
    mapFacade.setCircleStyle(id, style, callback);
  };
  //移除扇形
  removeFan = function (fanId, callback) {
    mapFacade.removeFan(fanId, callback);
  };
  //移除扇形批量
  removeAllFans = function (fanIds, callback) {
    mapFacade.removeAllFans(fanIds, callback);
  };
  //拉框平移
  dropDownTranslation = function (type, style, callback) {
    mapFacade.dropDownTranslation(type, style, callback);
  };
  //要素显示隐藏
  setFeatureVisibility = function (feature, visibility, callback) {
    mapFacade.setFeatureVisibility(feature, visibility, callback);
  };
  //点要素样式自定义
  setPointStyle = function (featureId, style, callback) {
    mapFacade.setPointStyle(featureId, style, callback);
  };
  // 线要素样式自定义
  setLineStyle = function (featureId, style, callback) {
    mapFacade.setLineStyle(featureId, style, callback);
  };
  // 面要素样式自定义
  setPolygonStyle = function (featureId, style, callback) {
    mapFacade.setPolygonStyle(featureId, style, callback);
  };
  //要素定位
  setFeaturePosition = function (featureArr, style, callback) {
    mapFacade.setFeaturePosition(featureArr, style, callback);
  };
  //要素聚合
  setCluster = function (paramObj, callback) {
    mapFacade.setCluster(paramObj, callback);
  };
  //点要素清除
  clearPoint = function (callback) {
    mapFacade.clearPoint(callback);
  };
  //线要素清除
  clearLine = function (callback) {
    mapFacade.clearLine(callback);
  };
  //面要素清除
  clearPolygon = function (callback) {
    mapFacade.clearPolygon(callback);
  };
  //扇形要素清除
  clearFan = function (callback) {
    mapFacade.clearFan(callback);
  };
  //圆要素清除
  clearCircle = function (callback) {
    mapFacade.clearCircle(callback);
  };
  //图层样式自定义
  setVectorStyle = function (id, style, callback) {
    mapFacade.setVectorStyle(id, style, callback);
  };
  //点图层清除
  clearVectorPoint = function (callback) {
    mapFacade.clearVectorPoint(callback);
  };
  //线图层清除
  clearVectorLine = function (callback) {
    mapFacade.clearVectorLine(callback);
  };
  //面图层清除
  clearVectorPolygon = function (callback) {
    mapFacade.clearVectorPolygon(callback);
  };
  //标注自定义
  setLabel = function (featureId, style, callback) {
    mapFacade.setLabel(featureId, "Point", style, callback);
  };
  //鼠标移动事件
  onMapPointerMove = function (callback) {
    if (MapEvent["pointermove"]) {
      return mapFacade.on(MapEvent["pointermove"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //鼠标拖拽开始事件
  onMapMoveStart = function (callback) {
    if (MapEvent["movestart"]) {
      return mapFacade.onMapMoveStart(MapEvent["movestart"], callback);
    }
  };
  //鼠标拖拽事件
  onMapMoveEnd = function (callback) {
    if (MapEvent["moveend"]) {
      return mapFacade.onMapMoveEnd(MapEvent["moveend"], callback);
    }
  };
  // 单击
  onMapLeftClick = function (handler) {
    if (MapEvent["click"]) {
      return mapFacade.on(MapEvent["click"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        handler(arg);
      });
    }
  };
  // 双击
  onMapDblLeftclick = function (handler) {
    if (MapEvent["dblclick"]) {
      return mapFacade.on(MapEvent["dblclick"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        handler(arg);
      });
    }
  };
  // 右击
  onMapRightClick = function (handler) {
    if (MapEvent["rightclick"]) {
      return mapFacade.on(MapEvent["rightclick"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        handler(arg);
      });
    }
  };
  //鼠标按下事件
  onMapMouseDown = function (callback) {
    if (MapEvent["mousedown"]) {
      return mapFacade.on(MapEvent["mousedown"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //鼠标抬起事件
  onMapMouseUp = function (callback) {
    if (MapEvent["mouseup"]) {
      return mapFacade.on(MapEvent["mouseup"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //鼠标悬浮事件
  onMapMouseOver = function (callback) {
    if (MapEvent["mouseover"]) {
      mapFacade.on(MapEvent["mouseover"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //滚轮事件
  onMapMouseWheel = function (callback) {
    if (MapEvent["mousewheel"]) {
      return mapFacade.on(MapEvent["mousewheel"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //缩放级别控制图层
  setLayerByZoom = function (zoom, layerId, callback) {
    mapFacade.setLayerByZoom(zoom, layerId, callback);
  };
  //移动端双指缩放
  setPinchZoom = function (callback) {
    return mapFacade.setPinchZoom(callback);
  };
  //移动端移动事件
  setMobileMove = function (callback) {
    if (MapEvent["touchmove"]) {
      return mapFacade.on(MapEvent["touchmove"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //移动端单击事件
  setMobileClick = function (callback) {
    if (MapEvent["click"]) {
      mapFacade.on(MapEvent["click"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //移动端双击事件
  setMobileDblClick = function (callback) {
    if (MapEvent["dblclick"]) {
      mapFacade.on(MapEvent["dblclick"], (arg) => {
        arg.type = conversionEvent(MapEvent, arg.type);
        callback(arg);
      });
    }
  };
  //长按
  setMapLongPress = function (callback) {
    mapFacade.setMapLongPress(callback);
  };
  //地图平移
  setPanTo = function (center, zoom, callback) {
    mapFacade.setPanTo(center, zoom, callback);
  };
  //复位
  setReStore = function (callback) {
    mapFacade.setReStore(callback);
  };
  //更新
  setReFresh = function (layer, callback) {
    mapFacade.setReFresh(layer, callback);
  };
  //交互提示框
  addInteractionPopup = function (optopns, callback) {
    mapFacade.addInteractionPopup(optopns, callback);
  };
  closePopup = function (callback) {
    mapFacade.closePopup(callback);
  };
  //切换地图
  changeMap = function (map, callback) {
    let layers = [];
    switch (map) {
      case "ZONDY_MAP":
        layers = LOADMapConfig.layers;
        break;
      case "GAODE_MAP":
        layers = GAODEMapConfig.layers;
        break;
      case "GAODEIMG_MAP":
        layers = GAODEIMGMapConfig.layers;
        break;
      case "BAIDU_MAP":
        layers = BAIDUMapConfig.layers;
        break;
      case "TIAN_MAP":
        layers = TIANMapConfig.layers;
        break;
      case "TIANIMG_MAP":
        layers = TIANMap_ImgConfig.layers;
        break;
      case "TX_MAP":
        layers = TX_MAPConfig.layers;
        break;
      default:
        break;
    }
    mapFacade.changeMap(layers, map, callback);
  };
  //地图影像切换
  switchMapImage = function (Tian_layers, value, callback) {
    mapFacade.switchMapImage(Tian_layers, value, callback);
  };
  hightLight = function (feature, style,obj, callback) {
    mapFacade.hightLight(feature, style,obj, callback);
  };
  cancelHightLight = function (callback) {
    mapFacade.cancelHightLight(callback);
  };
  // 图层初始化
  initLayers = function (urls, styles, callback) {
    mapFacade.initLayers(urls, styles, callback);
  };
  // 单击选中
  selectClick = function (styles, callback) {
    mapFacade.selectClick(styles, callback);
  };
  // 选中
  selectHover = function (styles, callback) {
    mapFacade.selectHover(styles, callback);
  };
  // 单击选中
  endSelect = function (callback) {
    mapFacade.endSelect(callback);
  };
  clearSelect = function (obj, callback) {
    mapFacade.clearSelect(obj, callback);
  };
  // 滑过要素改变鼠标
  setCursor = function (id, callback) {
    mapFacade.setCursor(id, callback);
  };
  getExtent = function () {
    return mapFacade.getExtent();
  };
  clearVectors = function (obj, callback) {
    mapFacade.clearVectors(obj, callback);
  };
  removeFeature = function (fs, callback) {
    mapFacade.removeFeature(fs, callback);
  };
  removeLastPoint = function (callback) {
    mapFacade.removeLastPoint(callback);
  };
  formatLength = function (line, callback) {
    mapFacade.formatLength(line, callback);
  };
  formatArea = function (polygon, callback) {
    mapFacade.formatArea(polygon, callback);
  };
  getBboxData = function (layers, bbox, callback) {
    return mapFacade.getBboxData(layers, bbox, callback);
  };
  locationJudging = function (polygon, callback) {
    return mapFacade.locationJudging(polygon, callback);
  };
  locationJudgingPoint = function (point, callback) {
   return mapFacade.locationJudgingPoint(point, callback);
  };

  /**
   * @name: 验证必填项
   * @test: test font
   * @msg:
   * @param {*}
   * @return {*}
   */
  function isSelect() {
    let count = 0;
    for (let key in arguments[0]) {
      if (!arguments[0][key]) {
        // console.error(key + "是必填项");
        throw new Error(key + "是必填项");
        // count++;
      } else if (Array.isArray(arguments[0][key])) {
        if (arguments[0][key].length > 0) {
          arguments[0][key].forEach((item) => {
            isSelect(item);
          });
        } else {
          // console.error(key + "是必填项");
          throw new Error(key + "是必填项");
          // count++;
        }
      }
    }
    // if (count > 0) return false;
    // return true;
  }
  /*
   * 基础类
   */
  class Feature {
    constructor() {
      this.removeFeature = removeFeature;
      //点要素添加
      this.addPoint = addPoint;
      //点要素删除
      this.removePoint = removePoint;
      //批量删除点要素
      this.removeAllPoints = removeAllPoints;
      //绑定线要素添加
      this.addLine = addLine;
      this.removeLastPoint = removeLastPoint;
      //绑定面要素添加
      this.addPolygon = addPolygon;
      //绑定面要素删除
      this.removeLine = removeLine;
      this.removePolygon = removePolygon;
      //批量删除线、面
      this.removeAllLines = removeAllLines;
      this.removeAllPolygons = removeAllPolygons;
      // 绘制圆
      this.drawCircle = drawCircle;
      // 圆样式
      this.setCircleStyle = setCircleStyle;
      //  删除圆
      this.removeCircle = removeCircle;
      //结束绘制
      this.endDraw = endDraw;
      //修改点要素
      this.modifyPoint = modifyPoint;
      this.modifyLine = modifyLine;
      this.modifyPolygon = modifyPolygon;
      this.modifyFan = modifyFan;
      //结束修改
      this.endModify = endModify;
      //添加扇形
      this.addFan = addFan;
      // 扇形样式
      this.setFanStyle = setFanStyle;
      //删除扇形
      this.removeFan = removeFan;
      //删除扇形批量
      this.removeAllFans = removeAllFans;
      //拉框平移
      this.dropDownTranslation = dropDownTranslation;
      //要素显示隐藏
      this.setFeatureVisibility = setFeatureVisibility;
      //点要素样式自定义
      this.setPointStyle = setPointStyle;
      // 线要素样式自定义
      this.setLineStyle = setLineStyle;
      // 面要素样式自定义
      this.setPolygonStyle = setPolygonStyle;
      //要素定位
      this.setFeaturePosition = setFeaturePosition;
      //聚合要素
      this.setCluster = setCluster;
      //点要素清除
      this.clearPoint = clearPoint;
      //线要素清除
      this.clearLine = clearLine;
      //面要素清除
      this.clearPolygon = clearPolygon;
      //扇形要素清除
      this.clearFan = clearFan;
      this.clearCircle = clearCircle;
    }
  }
  class Label {
    constructor() {
      //标注自定义
      this.setLabel = setLabel;
    }
  }
  class Tool {
    constructor() {
      this.setZoom=setZoom
      this.selectClick = selectClick;
      this.selectHover = selectHover;
      this.endSelect = endSelect;
      this.clearSelect = clearSelect;
      this.hightLight = hightLight;
      this.cancelHightLight = cancelHightLight;
      // this.setCursor=setCursor
      this.getZoom = getZoom;
      this.getExtent = getExtent;
      // 绑定地图放大功能
      this.zoomIn = zoomIn;
      // 绑定地图缩小功能
      this.zoomOut = zoomOut;
      // 控件添加
      this.addControl = addControl;
      //平移
      this.setPanTo = setPanTo;
      //复位
      this.setReStore = setReStore;
      //更新
      this.setReFresh = setReFresh;
      //绑定测距功能
      this.ranging = ranging;
      // 绑定测面功能
      this.measuringSurface = measuringSurface;
      //绑定清除并取消绘制功能
      this.clearDraw = clearDraw;
      //交互提示框
      this.addInteractionPopup = addInteractionPopup;
      this.closePopup = closePopup;
      // 绑定轨迹描绘功能
      this.drawCustomPath = drawCustomPath;
      // 绑定清除轨迹描绘功能
      this.clearPath = clearPath;
      // 绑定路径规划功能
      this.calcRoutePath = calcRoutePath;
      // 绑定清除路径规划功能
      this.clearRoutePath = clearRoutePath;
      // 绑定添加热力图功能
      this.showHeatMap = showHeatMap;
      // 绑定清除热力图功能
      this.clearHeatMap = clearHeatMap;
      // 绑定导航功能
      this.getNavigation = getNavigation;
      // 绑定打开室内地图功能
      this.showIndoorMap = showIndoorMap;
      // 绑定切换至室外功能
      this.switchOutdoor = switchOutdoor;
      //地图影像切换
      this.switchMapImage = switchMapImage;
      //地图切换
      this.changeMap = changeMap;
      //
      this.formatLength = formatLength;
      this.formatArea = formatArea;
      //
      this.getBboxData = getBboxData;
      this.locationJudging = locationJudging;
      this.locationJudgingPoint = locationJudgingPoint;
    }
  }
  /*  class Map {
    constructor() {
      // 绑定设置中心点功能
      this.centerPoint = centerPoint;
      // 绑定添加地图控件功能
      this.addControl = addControl;
      this.addControl_Scale = addControl_Scale;
      this.addControl_Scale = addControl_Scale;
      // 绑定销毁地图功能
      this.destroy = destroy;
    }
  } */
  class Marker {
    constructor() {
      // 绑定添加普通图标功能
      this.addMarker = addMarker;
      // // 绑定添加聚合图标功能
      // this.addClusterMarker = addClusterMarker;
      // // 绑定清楚聚合图标功能
      // this.clearClusterMarker = clearClusterMarker;
      // // 绑定修改聚合样式功能
      // this.changeClusterTextStyle = changeClusterTextStyle;
      // // 绑定添加闪烁图标功能
      // this.addFlashMarker = addFlashMarker;
      // // 绑定删除图标功能
      // this.deleteMarker = deleteMarker;
      // // 绑定激活图标功能
      // this.trigger = trigger;
      // // 绑定批量激活图标功能
      // this.activeMarkers = activeMarkers;
      // // 绑定取消激活图标功能
      // this.deActiveMarkers = deActiveMarkers;
      // // 绑定设置图标自动隐藏功能
      // this.setMarkerHideLevel = setMarkerHideLevel;
    }
  }
  class Event {
    constructor() {
      // 绑定地图事件
      // this.onMap = onMap;
      this.onMapLeftClick = onMapLeftClick;
      this.onMapDblLeftclick = onMapDblLeftclick;
      this.onMapRightClick = onMapRightClick;
      this.onMapPointerMove = onMapPointerMove;
      this.onMapMoveStart = onMapMoveStart;
      this.onMapMoveEnd = onMapMoveEnd;
      this.onMapMouseDown = onMapMouseDown;
      this.onMapMouseUp = onMapMouseUp;
      // this.onMapMouseOver = onMapMouseOver;
      //滚轮事件
      this.onMapMouseWheel = onMapMouseWheel;
      // 绑定移除地图事件
      this.removeOnMap = removeOnMap;
      // 绑定聚合图标点击事件
      // this.onClusterMarker = onClusterMarker;
      //移动端双指缩放
      // this.setPinchZoom = setPinchZoom;
      // //移动端移动事件
      // this.setMobileMove = setMobileMove;
      // this.setMobileClick = setMobileClick;
      // this.setMobileDblClick = setMobileDblClick;
      // this.setMapLongPress = setMapLongPress;
    }
  }
  class Layer {
    constructor() {
      // 绑定清除地图覆盖物功能
      this.clearOverlays = clearOverlays;
      //图层样式自定义
      this.setVectorStyle = setVectorStyle;
      //图层清除
      this.clearVectorPoint = clearVectorPoint;
      this.clearVectorLine = clearVectorLine;
      this.clearVectorPolygon = clearVectorPolygon;
      //缩放级别控制图层
      this.setLayerByZoom = setLayerByZoom;
      //图层初始化
      this.initLayers = initLayers;
      this.clearVectors = clearVectors;
    }
  }
  /*  class Polyline {
    constructor() {
      // 绑定添加折线功能
      this.addPolyline = addPolyline;
      // 绑定删除折线功能
      this.deletePolyline = deletePolyline;
    }
  } */
  /* class Search {
    constructor() {
      // 绑定POI区域查询功能
      this.addrDeSearch = addrDeSearch;
      // 绑定获取建筑信息功能
      this.getBuildingInfo = getBuildingInfo;
      // 绑定地址查询功能
      this.addrSearch = addrSearch;
      // 绑定园区信息查询功能
      this.addrDeSearchSpaceCode = addrDeSearchSpaceCode;
    }
  } */
  /* class Navigation {
    constructor() {
      // 绑定语音播报功能
      this.speechPlay = speechPlay;
      // 绑定语音播报停止功能
      this.speechStop = speechStop;
    }
  } */
  /* class Popup {
    constructor() {
      // 绑定添加信息框功能
      this.addPopup = addPopup;
      // 绑定关闭信息框功能
      this.closePopup = closePopup;
    }
  } */
  /* class Indoor {
    constructor() {
      // 绑定室内信息提示功能
      this.addIndoorTip = addIndoorTip;
      // 绑定移除室内信息提示功能
      this.removeIndoorTip = removeIndoorTip;
    }
  } */
  class Select {
    constructor() {
      // 绑定热力圈选功能
      this.enableSelectMode = enableSelectMode;
      // 绑定移除热力圈选功能
      this.disableSelectMode = disableSelectMode;
      // 绑定获取热力圈选人员功能
      this.getSelectedHeatObjects = getSelectedHeatObjects;
      // 绑定获取热力圈选图标功能
      this.getSelectedMarkers = getSelectedMarkers;
    }
  }
  /* class Geometry {
    constructor() {
      // 绑定绘制几何区域功能
      this.drawGeometry = drawGeometry;
      this.drawGeometry_circle = drawGeometry_circle;
      this.drawGeometry_rectangle = drawGeometry_rectangle;
      this.drawGeometry_polygon = drawGeometry_polygon;
      // 绑定设置/修改几何区域功能
      this.setGeometry = setGeometry;
      this.setGeometry_circle = setGeometry_circle;
      this.setGeometry_rectangle = setGeometry_rectangle;
      this.setGeometry_polygon = setGeometry_polygon;
      // 绑定删除几何区域功能
      this.removeGeometry = removeGeometry;
    }
  } */
  var mapFacade;
  Adapter.initialize = function (initParam) {
    // //验证必填项
    // if (
    // isSelect({
    //   mapType: initParam.mapType,
    //   serviceURL: initParam.serviceURL,
    // });
    // )
    //   return;

    //获取gis厂商的实例，以调用gis厂商接口
    mapFacade = new gis.Hmap2D(initParam.serviceURL, initParam.MAPGIS_URL, {
      // option: function (param) {
      //   console.log(1);
      // },
    });
    var securityMode = initParam.securityMode ? initParam.securityMode : 1;
    var workspaceSerices = LOADMapConfig.mapUrl;

    /*
    修改点包括但不限于：
    1.构造基础功能类
    2.必填项验证
    */
    this.getAccessToken = function (username, password, expiration, callback) {
      mapFacade.getAccessToken(username, password, expiration, callback, login);
    };
    this.loadMap = function (options, callback) {
      //验证必填项
      // if (
      // isSelect({
      //   center: LOADMapConfig.view.center,
      //   zoom: LOADMapConfig.view.zoom,
      //   minZoom: LOADMapConfig.view.minZoom,
      //   maxzoom: LOADMapConfig.view.maxZoom,
      // });
      // )
      //   return;
      switch (initConfig.options.mapType) {
        case "ZONDY_MAP":
          options.layers = LOADMapConfig.layers;
          break;
        case "GAODE_MAP":
          options.layers = GAODEMapConfig.layers;
          break;
        case "GAODEIMG_MAP":
          options.layers = GAODEIMGMapConfig.layers;
          break;
        case "BAIDU_MAP":
          options.layers = BAIDUMapConfig.layers;
          break;
        case "TIAN_MAP":
          options.layers = TIANMapConfig.layers;
          break;
        case "TIANIMG_MAP":
          options.layers = TIANMap_ImgConfig.layers;
          break;
        case "TX_MAP":
          options.layers = TX_MAPConfig.layers;
          break;
        default:
          options.layers = [];
          break;
      }
      options.extents = LOADMapConfig.extent;
      options.view = LOADMapConfig.view;
      options.view.center = numberAdapter(LOADMapConfig.view.center);
      options.interactions = LOADMapConfig.interactions;
      options.controls = LOADMapConfig.controls;
      options.mapUrl = workspaceSerices ? workspaceSerices : options.mapUrl;

      options.accessToken = options.accessToken;
      options.securityMode = securityMode;
      options.isMaxZoom = LOADMapConfig.isMaxZoom;
      mapFacade.loadMap(options, (a, map) => {
        callback(this, map);
      });
    };
    /*
     *实例化各类功能
     */
    this.Feature = new Feature({
      // option: function (param) {
      //   console.log(1);
      // },
    });
    // this.Map = new Map();
    this.Marker = new Marker();
    this.Label = new Label();
    this.Event = new Event();
    this.Layer = new Layer();
    // this.Polyline = new Polyline();
    // this.Search = new Search();
    // this.Navigation = new Navigation();
    this.Tool = new Tool();
    // this.Popup = new Popup();
    // this.Indoor = new Indoor();
    this.Select = new Select();
    // this.Geometry = new Geometry();

    return Promise.resolve(this);
  };

  win.Adapter = Adapter;
})(window);

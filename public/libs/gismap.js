window.hgis = {};
window.hgis.Hmap2D = function (options, callback) {
  var mapObj = new Adapter.initialize(options).then((mapObj) =>
    callback(mapObj)
  );
};

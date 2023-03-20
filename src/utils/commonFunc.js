export default {
  deleteFeature(that, data, callback) {
    that.$httpRequest
      .delFeature(data)
      .then((res) => {
        if (typeof callback == "function") callback(res);
      })
      .catch((error) => {
        that.$message({
          message: "删除失败："+error.response.data.message,
          type: "error",
        });
      })
  },
};

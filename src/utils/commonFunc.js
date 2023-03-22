export default {
  deleteFeature(that, data, callback,errcbk) {
    that.$httpRequest
      .delFeature(data)
      .then((res) => {
        if (typeof callback == "function") callback(res);
      })
      .catch((error) => {
        if (typeof errcbk == "function") errcbk(res);
        that.$message({
          message: "删除失败："+error.response.data.message,
          type: "error",
        });
      })
  },
};

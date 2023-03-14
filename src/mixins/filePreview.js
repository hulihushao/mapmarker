import FilePreview from "@/components/FilePreview.vue"; // 预览组件；
export default {
  components: {
    FilePreview,
  },
  data() {
    return {
      // 预览数据
      IsPreview: false, // 控制预览弹窗字段
      timers: "", //时间戳
      FilePreAll: [], // 预览数组
      TragetPic: {}, // 当前点击的预览文件对象
    };
  },
  methods: {
    // 打开预览
    onClickOpenPreview(val) {
      this.TragetPic = {
        // 当前点击的文件
        FileName: val.name || val.file.name, // 文件名称
        name: val.name || val.file.name, // 文件名称（可以不传）
        id: val.uid, // 文件id
        format: (val.name || val.file.name).split(".")[
          (val.name || val.file.name).split(".").length - 1
        ], // 文件格式
        url: val.url || this.$parent.getimgs(val), // 预览地址
        downUrl: "", // 下载地址
      }; // 目标对象
      this.FilePreAll = [];
      this.imgs.forEach((item, index) => {
        let url;
        if (item.uid == val.uid) {
          url = val.url;
        }
        // 需要预览的文件数组（可以传空数组就是单张预览）
        let obj = {
          FileName: item.name || item.file.name,
          name: item.name || item.file.name,
          id: item.uid, // 文件id

          format: (item.name || item.file.name).split(".")[
            (item.name || item.file.name).split(".").length - 1
          ], // 文件格式
          url: url || this.srcList[index], // 预览地址

          downUrl: "",
        };
        this.FilePreAll.push(obj);
      });

      this.IsPreview = true; // 打开预览弹窗
      this.timers = new Date().getTime(); // 刷新预览地址
    },
    // 关闭预览
    onClickClosePreview(val) {
      this.IsPreview = val; // 由组件内部传入的关闭数据赋值关闭
    },
  },
};

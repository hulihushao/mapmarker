<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 11:51:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-12 16:31:56
-->
<template>
  <div id="popup">
    <p class="content" v-for="(value, key) in feature" :key="key" v-if="val[key]">
      <span>{{ val[key] }}</span>：
      <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start" :disabled="feature.disabled">
        <span>{{ value }}</span>
      </el-tooltip>
    </p>
    <div class="btn-con">
      <span class="bj" @click="changeSj">编辑</span>
      <span class="showpic" @click="showPic">上传/浏览图片</span>
      <el-popconfirm title="这是一段内容确定删除吗？">
        <span class="del" @click="delFeature"><i v-if="delLoading" class="iconfont el-icon-loading" />删除</span>
      </el-popconfirm>
    </div>
    <UploadPic class="upload" :dialogVisible="dialogVisible" :featureData="feature" @closeDialog="closeDialog">
    </UploadPic>
  </div>
</template>

<script>
import val from "@/utils/config/val";
import UploadPic from "@/components/UploadPic";
import commonFunc from "@/utils/commonFunc"
export default {
  props: {
    feature: {
      required: true,
      type: Object,
    },
  },
  components: {
    UploadPic,
  },
  data() {
    return {
      val: val,
      dialogVisible: false,
      delLoading: false,
    };
  },
  computed: {},
  created() { },
  methods: {
    showPic() {
      this.dialogVisible = true

    },
    closeDialog() {
      this.dialogVisible = false
    },
    changeSj() {
      this.$EventBus.$emit('changeSj', this.feature)
    },
    delFeature() {
      this.$confirm("此操作将永久删除该点位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true
          commonFunc.deleteFeature(
            this,
            {
              fid: this.feature.id,
              uid: JSON.parse(localStorage.getItem("user")).userId,
            },
            (res) => {
              if (res.code != 200) return
              this.$tMap.selectClickObj.getFeatures().clear()
              this.$tMap.closeOverlays();
              this.delLoading = false
              this.$tMap.refreshLayer(this.$httpRequest);
            },
            () => { this.delLoading = false }
          );
        })
        .catch(() => {

        });
    }
  },
};
</script>

<style lang="less" scoped>
#popup {
  p {
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }

  .showpic,
  .bj {
    color: rgba(58, 58, 247, 0.904);
    text-align: right;
    cursor: pointer;

    &:hover {
      color: blue;
    }

    float: right;
    margin-right: 10px;
  }

  .bj {}

  .btn-con {
    display: flex;
    justify-content: space-between;
  }
}
</style>

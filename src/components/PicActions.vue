<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: TJP
 * @LastEditTime: 2024-02-05 14:56:54
-->
<template>
  <div id="pic-actions-con" :class="{ newHeight: showPL }">
    <div id="pic-actions">
      <i
        style=""
        class="iconfont icon-batch"
        :class="{ active: showPL }"
        @click="handlePL"
      ></i>
      <div style="width: 40px; display: flex; justify-content: space-between">
        <i
          class="iconfont icon-liebiao1"
          :class="{ active: isActive1 }"
          @click="handleActive(1)"
        ></i
        >|
        <i
          class="iconfont icon-liebiaoxingshi"
          :class="{ active: isActive2 }"
          @click="handleActive(2)"
        ></i>
      </div>
    </div>
    <div class="plBtn" :class="{ showPLBtn: showPLBtn }">
      <el-checkbox
        size="mini"
        border
        style="
          border: none;
          margin-top: 0px;
          width: 60px;
          display: flex;
          align-items: center;
        "
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <el-button
        @click="handleDeletes"
        type="text"
        size="mini"
        style="margin: 0 12px; padding: 0"
        >删除</el-button
      >
      <el-tooltip
        :disabled="!reUploadDisabled"
        popper-class="popperClass1"
        content="选中的包含已上传的文件，请重新选择"
        placement="top"
        effect="light"
      >
        <span>
          <el-button
            :disabled="reUploadDisabled"
            type="text"
            size="mini"
            style="margin: 0 12px 0 0; padding: 0"
            >重传</el-button
          ></span
        >
      </el-tooltip>
      <el-button type="text" size="mini" style="margin: 0 12px 0 0; padding: 0"
        >一键重传</el-button
      >
      <el-tooltip
        popper-class="popperClass"
        content="自动重新上传上传失败的文件"
        placement="top"
        effect="light"
      >
        <i
          style="font-size: 10px; line-height: 15px"
          class="iconfont icon-tishi"
        ></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
export default {
  props: {
    
  },
  data() {
    return {
      isActive0: true,
      isActive1: true,
      isActive2: false,
      showPL: false,
      showPLBtn: false,
      isIndeterminate: false,
      checkAll: false,
    };
  },
  created() {
    this.$EventBus.$on("changeCheckAll", (value, imgs) => {
      let checkedCount = value.length;
      this.checkAll = checkedCount === imgs.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < imgs.length;
    });
  },
  computed: {
    reUploadDisabled() {
      return this.$store.state.reUploadDisabled;
    },
  },
  methods: {
    handleActive(num) {
      for (let i = 1; i < 3; i++) {
        this["isActive" + i] = false;
      }
      this["isActive" + num] = true;
      this.$emit("changeActive", num);
    },
    handlePL() {
      this.showPL = !this.showPL;
      setTimeout(() => {
        this.showPLBtn = !this.showPLBtn;
      });
      this.$store.commit("setShowChecked", this.showPL);
    },
    handleCheckAllChange(val) {
      this.isIndeterminate = false;
      this.$EventBus.$emit("CheckAll", val);
    },
    handleDeletes() {
      this.$EventBus.$emit("deletes");
    },
    handleReUpload() {
      this.$EventBus.$emit("reUpload");
    },
    handleAllReUpload() {
      this.$EventBus.$emit("allReUpload");
    },
  },
};
</script>

<style lang="scss">
.newHeight {
  height: 40px !important;
}
#pic-actions-con {
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
  padding: 0 10px 0px;
  transition: all 0.3s;
  margin-top: -30px;
  height: 20px;
  #pic-actions {
    display: flex;
    justify-content: space-between;
    .active {
      color: #409eff;
    }
  }
  .plBtn {
    transition: all 0.3s;
    height: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .showPLBtn {
    height: 15px;
    padding: 5px 0;
  }
}
.popperClass,
.popperClass1 {
  padding: 5px;
  margin: 4px -1px !important;
}
.popperClass1 {
  margin-left: -7px !important;
}
</style>

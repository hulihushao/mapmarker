<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:16:52
-->
<template>
  <div id="pic-actions-con">
    <div id="pic-actions">
      <i style="" class="iconfont icon-batch" @click="handlePL"></i>
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
    <div class="plBtn" v-show="showPL">
      <span>删除</span>
       <span>重传</span>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
export default {
  props: {
    active: {
      type: Number,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isActive0: true,
      isActive1: true,
      isActive2: false,
      showPL: false,
    };
  },
  created() {},
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
      this.$store.commit("setShowChecked",this.showPL)
    },
  },
};
</script>

<style lang="less" >
#pic-actions-con {
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
  padding: 0 10px 5px;
  transition: all 5s;
  #pic-actions {
    margin-top: -30px;

    display: flex;
    justify-content: space-between;

    .active {
      color: #409eff;
    }
    .plplBtn {
    }
  }
}
</style>

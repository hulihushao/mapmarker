<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:16:52
-->
<template>
  <div id="pic-actions-con" :class="{newHeight:showPL}">
    <div id="pic-actions">
      <i style="" class="iconfont icon-batch" :class="{active:showPL}" @click="handlePL"></i>
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
    <div class="plBtn" :class="{showPLBtn:showPLBtn}" >
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
      showPLBtn:false
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
      setTimeout(()=>{this.showPLBtn=!this.showPLBtn})
      this.$store.commit("setShowChecked",this.showPL)
    },
  },
};
</script>

<style lang="less" >
.newHeight{
    height:35px !important;
  }
#pic-actions-con {
  margin-bottom: 5px;
  border-bottom: 1px solid #ccc;
  padding: 0 10px 5px;
  transition: all .3s;
  margin-top: -30px;
  height:20px;
  #pic-actions {
    display: flex;
    justify-content: space-between;
    .active {
      color: #409eff;
    }
    
  }
  .plBtn {
      transition: all .3s;
      height:0;
      overflow:hidden;
    }
    .showPLBtn{
      height:20px
    }
}
</style>

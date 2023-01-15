<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:16:52
-->
<template>
  <div id="pic-actions">
    <i class="iconfont icon-batch"></i>
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
    };
  },
  created() {},
  methods: {
    handleActive(num) {
      for (let i = 1; i < 3; i++) {
        this["isActive" + i] = false;
      }
      this["isActive" + num] = true;
      this.$emit('changeActive',num)
    },
  },
};
</script>

<style lang="less">
#pic-actions {
  border-bottom: 1px solid #ccc;
  margin-top: -30px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 5px;
  .active {
    color: #409eff;
  }
}
</style>

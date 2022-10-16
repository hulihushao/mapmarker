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
    <p
      class="content"
      v-for="(value, key) in feature"
      :key="key"
      v-if="val[key]"
    >
      <span>{{ val[key] }}</span
      >：
      <el-tooltip
        class="item"
        effect="dark"
        content="Top Left 提示文字"
        placement="top-start"
        :disabled="feature.disabled"
      >
        <span>{{ value }}</span>
      </el-tooltip>
    </p>
    <span class="bj" @click="changeSj">编辑</span>
    <span class="showpic" @click="showPic">上传/浏览图片</span>
    <UploadPic class="upload" :dialogVisible="dialogVisible" :featureData="feature" @closeDialog="closeDialog"></UploadPic>
  </div>
</template>

<script>
import val from "@/utils/config/val";
import UploadPic from "@/components/UploadPic";
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
    };
  },
  computed: {},
  created() {},
  methods: {
    showPic() {
      this.dialogVisible=true
      
    },
    closeDialog(){
      this.dialogVisible=false
    },
    changeSj(){
      this.$EventBus.$emit('changeSj',this.feature)
    },
  },
};
</script>

<style lang="scss" scoped>
#popup {
  p {
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
  .showpic,.bj {
    color: rgba(58, 58, 247, 0.904);
    text-align: right;
    cursor: pointer;
    &:hover {
      color: blue;
    }
    float: right;
    margin-right: 10px;
  }
  .bj{
    float: left;
    margin-left: 10px;
  }
  
}
</style>

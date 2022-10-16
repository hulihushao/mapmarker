<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:16:52
-->
<template>
  <div id="uploadPic">
    <el-dialog
      title="图片上传/浏览"
      :visible.sync="dialogVisible"
      append-to-body @close="closeDia"
    >
      <Upload :featureData="featureData" ></Upload>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia">取 消</el-button>
        <el-button type="primary" @click="$emit('closeDialog')"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
    featureData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    Upload,
  },
  data() {
    return {
      imgList: [],
    };
  },
  created() {
    
  },
  methods: {
    closeDia() {
      this.$emit("closeDialog");
      this.$EventBus.$emit('closeDialog')
    },
  },
};
</script>

<style></style>

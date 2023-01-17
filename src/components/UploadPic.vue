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
      <PicActions @changeActive="changeActive"/>
      <div style="min-height:250px">
        <Upload :featureData="featureData" style="max-height:500px;"></Upload>
      </div>
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
import PicActions from "@/components/PicActions";
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
    Upload,,PicActions
  },
  data() {
    return {
      imgList: [],
      active:2
    };
  },
  created() {
    
  },
  methods: {
    closeDia() {
      this.$emit("closeDialog");
      this.$EventBus.$emit('closeDialog')
      this.active=1
    },
    changeActive(num){
      this.active=num
    }
  },
};
</script>

<style></style>

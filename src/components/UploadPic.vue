<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: TJP
 * @LastEditTime: 2023-05-29 18:52:23
-->
<template>
  <div id="uploadPic">
    <el-dialog
      title="图片上传/浏览"
      :visible.sync="dialogVisible"
      append-to-body destroy-on-close
      @close="closeDia"
      width="90vw"
    >
      <PicActions @changeActive="changeActive"/>
      <div style="min-height:25vh">
        <Upload :featureData="featureData" :show="show" :showUpload="showUpload" :active="active" style="max-height:50vh;"></Upload>
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
    Upload,PicActions
  },
  data() {
    return {
      imgList: [],
      active:2,
      show: false,
      showUpload:true
    };
  },
  created() {
    
  },
  methods: {
    closeDia() {
      this.$emit("closeDialog");
      this.$EventBus.$emit('closeDialog')
      this.active=1
      this.show = false;
      this.$store.commit("setShowChecked",false)
      this.$store.commit("setReUploadDisabled",false)
    },
    changeActive(num){
      if (num == 2) {
        this.show = true;
        if(this.active==1){
          this.showUpload=false
        }
        setTimeout(() => {
          this.showUpload=true
          this.active = num;
          
        }, 10);
      } else {
        this.show = false;
        this.showUpload=true
        this.active = num;
      }
    }
  },
};
</script>

<style></style>

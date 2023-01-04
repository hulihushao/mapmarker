<template>
  <div class="image-body">
    <template v-if="imgs.length">
      <div v-for="(item, index) in imgs" :key="'bg-img' + index">
        <el-popover placement="top" trigger="manual" v-model="item.visible">
          <i
            style="float: right; margin: 5px 5px 0 0; cursor: pointer"
            class="el-icon-close img-close"
            @click="closeDescribe(index, item)"
          ></i>
          <el-input
            style="margin: 10px 5px 0px"
            type="textarea"
            :rows="2"
            placeholder="请输入图片描述"
            v-model="item.command"
          ></el-input>
          <div style="text-align: right; margin: 0; margin-top: 10px">
            <el-button
              type="primary"
              size="mini"
              @click="handlePicSave(index, item)"
              >保存</el-button
            >
          </div>
          <div
            class="img-box animate__animated animate__fadeInDown"
            slot="reference"
            @mouseover="showDescribe(index, item);showActions(index,item)"
          >
            <div class="imgLoading" v-if="item.uploading">
              <b style="font-size:12px;position:absolute;left:0;right:0;:auto">{{item.jd}}%</b>
              <i style="font-size:50px;position:relative;" class="el-icon-loading"></i>           
            </div>
            <div class="imgLoading" v-if="!item.res&&!item.uploading">
              <span
                class="el-upload-list__item-preview"
                @click="handleReupLoad(index, item)"
                ><i class="el-icon-refresh"></i
              ></span>
            </div>
            <el-image v-if="!item.url"
              class="img-content"
              :src="getimgs(item)"
              :preview-src-list="srcList"
            ></el-image>
            <div v-else class="imgs">
              <video v-if="item.type=='mp4'" width="100%" :src="item.url" autoplay/>
              <img v-else :src="item.url" alt="" />
            </div>
            <transition name="el-fade-in-linear">

<div class="actions" v-show="item.res&&!item.uploading&&item.isShowActions">
                <span @click="handlePreviewPic(index,item)"><i class="el-icon-zoom-in"></i></span>
                <span @click="handleDownload(index, item)"><i class="el-icon-download"></i></span>
                <span @click="handleRemove(index, item)"><i class="el-icon-delete"></i></span></div>
</transition>
            <div class="toolbox">
              <i></i>
              <i v-if="!item.res||item.uploading"
                class="el-icon-close img-close"
                @click="handleRemove(index, item)"
              ></i>
            </div>
          </div>
        </el-popover>
      </div>
    </template>
    <div class="img-add">
      <el-upload
        action="#"
        list-type="picture-card"
        :multiple="true"
        :auto-upload="false"
        accept=".jpeg,.jpg,.png,"
        :on-change="handlePreview"
      >
        <i slot="default" class="el-icon-loading" v-if="uploading"></i>
        <i slot="default" class="el-icon-plus" v-else></i>
        <div slot="file" slot-scope="{ file }"></div>
      </el-upload>
    </div>
    <transition name="el-fade-in-linear"><el-image-viewer style="z-index:999999" v-if="showViewer" :on-close="closeViewer" :url-list="srcList" /></transition>
  </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  props: {
    featureData: {
      type: Object,
    },
  },
  components:{ElImageViewer},
  data() {
    return {
      imgs: [
        { encode_str: "static/img/star", type_tail: ".png" },
      ],
      srcList: [], // 浏览数据  ['http:...jpg']
      disabled: false,
      uploading: false,
      showViewer: false,
    };
  },
  computed: {},
  created() {
    this.getPic();
    this.$EventBus.$on("closeDialog", () => {
      this.imgs.forEach((item) => {
        item.visible = false;
      });
    });
    this.imgs.forEach(item=>{
      this.srcList.push(this.getimgs(item))
    })  },
  methods: {
    getPic(params) {
      this.$httpRequest.getPic().then((res) => {
        console.log(res);
        res.forEach((item) => {
          item.visible = false;
        });
        this.imgs = res;
        this.imgs.forEach((item) => {
          this.srcList.push(this.getimgs(item));
        });
      });
    },
    // 删除图片
    handleRemove(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {

        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: TextTrackCueList,
      })
        .then(async () => {
          this.imgs.splice(index, 1);

          this.srcList.splice(index, 1);
          try {
            this.$httpRequest
              .deletePic(param)

              .then((res) => {
                this.$message.success("删除成功！");
              })
              .catch(() => {
                this.$message.erroe("接口异常！");
              });
          } catch {
            
          }
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleDownload(index,row){

    },
    // 图片获取
    getimgs(item) {
      return window.imgUrl + "/" + item.encode_str + item.type_tail;
    },
    // 上传图片
    handlePreview(file, fileList) {
      console.log(file);
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10MB!");
        return;
      }
      this.uploading = true;
      let getfs = this.imgs.filter((item) => item.uid == file.uid);
      if (!getfs.length) {
        setTimeout(()=>{
        this.imgs.push({
        url: URL.createObjectURL(file.raw),
          uploading: true,
          uid: file.uid,
          file: file,
          res: true,
          visible: false,
          type:file.name.split(".")[file.name.split(".").length-1],
        });},100)
        this.srcList.push(URL.createObjectURL(file.raw))
      }else{
        this.imgs[index].uploading=true
        this.imgs[index].res=true
      }
      let params = {
        relPoint: this.featureData.encodeStr,
        command: "",
      };
      let newfile = new FormData();
      newfile.append("file", file.raw);
      for (let item in params) {
        newfile.append(item, params[item]);
      }
      this.$httpRequest
        .postPic(newfile,(e)=>{
          const { loaded, total } = e
          let fs = this.imgs.filter((item) => item.uid == file.uid);
          fs[0].jd = ((loaded / total) * 100) | 0)
        .then((res) => {
          if (res.code == 200) {
            this.getPic();
          }
        })
        .catch((err) => {
          let fs = this.imgs.filter((item) => item.uid == file.uid);
          if (fs.length) {
            fs[0].uploading = false;
            fs[0].res = false;
            fs[0].visible = false;
          }
          this.$message.error("上传失败！");
          this.uploading = false;
        });
    },
    // 编辑保存图片
    handlePicSave(index, row) {
      if (postdatams.newuploadPhoto) {
        let postdata = postdatams.postdatams;
        postdata.atts[0].ms = row.describe;
        postdata.where[0].value = row.id0;
        API.postCommonOperateUpdate(postdata).then((res) => {
          this.$message.success("保存成功");
        });
      } else {
        let postData = {
          atts: [
            {
              description: row.describe,
            },
          ],
          where: [{ field: "id0", value: row.id0 }],
        };
        this.$ininFn.updateData(99, 2, postData).then((res) => {
          if (res.code == 200) {
            this.$message.success("保存成功！");
            this.imgs[index].visible = false;
          }
        });
      }
    },
    handleDownload(file) {
      console.log(file);
    },
    showDescribe(index, row) {
      this.imgs.forEach((item) => {
        item.visible = false;
      });
      if (!this.imgs[index].res) return;
      this.imgs[index].visible = true;
    },
    closeDescribe(index, item) {
      item.visible = false;
    },
    handleReupLoad(index, item){
      this.handlePreview(item.file,null,index)
    },
    showActions(index,it){
      this.imgs.forEach((item)=>{
        item.isShowActions=false
      })
      it.isShowActions=true
     },
     handlePreviewPic(index,item){
      this.showViewer=true
    },
    closeViewer() {
       this.showViewer = false
    }
   },
};
</script>
<style lang="scss">
.image-body {
  display: flex;
  flex-wrap: wrap;
  width: 560px;
  overflow-y: auto;
  .img-add {
    ul {
      width: 0;
      height: 0;
      display: none;
    }
  }
  .imgs {
    width: 18vw;
    height: 18vw;
    border-radius: 5px;
    margin-right: 0px;
    overflow: hidden;
    img {
      width: 100%;
   }
  .img-box {
    position: relative;
    border-radius: 5px;
    border: 1px solid #ccc;
    height: 99px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin:0 10px 10px 0;
    .imgLoading{
      background:rgba(0,4,4,.5);
      font-size:26px;
      width:100%;
      height:100%;
      position:absolute;
      color:#fff;
      text-align: center;
      line-height: 18vw;
      border-radius: 5px;
      line-height:18vw;
      i{

        line-height:18vw;
        &:hover {
          cursor: pointer;        
        }
      }
    }
    .img-content {
      width: 100px;
    }
    .actions{

      width:calc(100% - 10px);
      height:calc(100% - 10px);
      display:flex;
      justify-content:space-around;
      align-items:center;
      position:absolute;
      padding:5px;
      background:rgba(0, 4, 4, 0.5);
      color:#fff;
      border-radius:5px;
      i{
        &:hover {
          cursor: pointer;
        }
      }
 
    }
    .toolbox {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img-close {
        color: #fff;
        background: #909399;
        border-radius: 8px;
        opacity: 0.5;
      }
      .img-close:hover {
        cursor: pointer;
        opacity: 1;
      }
      .img-download {
        color: #fff;
        background: #909399;
        border-radius: 8px;
        opacity: 0.5;
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
    }
  }
}
.image-body .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.image-body .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.el-textarea {
  textarea {
    width: 200px !important;
  }
}
</style>

<template>
  <div class="image-body">
    <template v-if="imgs.length&&active==1&&!show">
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
            <!--<div class="imgLoading" v-if="item.uploading">
              <b style="height:100%;font-size:12px;position:absolute;left:0;right:0;margin:auto">{{item.jd}}%{{item.jd_num}}</b>
              <i style="font-size:50px;position:relative;" class="el-icon-loading"></i>           
            </div>-->
            <div class="imgLoading" v-if="item.uploading" style="display:flex;flex-direction: column;items-align:center;justify-content:center;">
              <i
                style="position:relative;font-size: 20px;top:-10px"
                class="el-icon-loading"
              ></i>
              <b
                style="
                  font-size: 12px;
                  position: absolute;
                  height: 90%;
                  width: 100%;
                  display: flex;
                  flex-wrap:wrap;
                  flex-direction: column;

                "
                ><span style="height:17%">{{ item.speed }}</span
                ><span style="height:17%">{{ item.jd }}%</span
                ><span style="height:17%;">{{ item.jd_num }}</span></b
              >
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
                <span @click="handleRemove(index, item)"><i class="el-icon-delete"></i></span>
             </div>
            </transition>
            <div v-show="showChecked" style="position:absolute;bottom:-1px;right:2px;">
              <el-checkbox style="opacity:.7" v-model="item.checked" v-show="showChecked" label=""  @change="(value)=>{handleCheckedChange(value,item)}"></el-checkbox>
            </div>
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
    <span v-if="show" style="width:100%;">
     <transition mode="out-in" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="">
     <template v-if="active==2">
      <List :imgs="imgs" :srcList="srcList" @handleCheckedChange="handleCheckedChange"/>
     </template>
     </transition>
    </span>
    <div class="img-add" v-if="showUpload">
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
    <transition name="el-fade-in-linear"><el-image-viewer style="z-index:999999" v-if="showViewer" :on-close="closeViewer" :url-list="srcList" :initial-index="imgViewIndex"/></transition>
  </div>
</template>
<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import List from "@/components/List";
export default {
  props: {
    show: {

      type: Boolean,
    },
    featureData: {
      type: Object,
    },
    active:{
      required:true
    },
    showUpload:{
      required:true
    }
  },
  components:{ElImageViewer,List},
  data() {
    return {
      imgs: [
        { encode_str: "static/img/star", type_tail: ".png",name:"star.png", res: true,
          isShowActions: false,},
      ],
      srcList: [], // 浏览数据  ['http:...jpg']
      disabled: false,
      uploading: false,
      showViewer: false,
      imgViewIndex:0,
      controllers:[]
    };
  },
  computed: {
    showChecked(){
      return this.$store.state.showChecked
    }
  },
  watch:{
    //监听显示方式的变化
    active(){
      this.imgs.forEach((item) => {
        item.visible = false;
        item.isShowActions=false
      })
    }
  },
  created() {
    this.getPic();
    //模拟获取数据
    //localStorage.removeItem("localFiles")
    let localFiles=localStorage.getItem("localFiles")
    if(localFiles){
      localFiles=JSON.parse(localFiles)
      this.imgs=[...this.imgs,...localFiles]
    }
    //关闭弹窗时关闭备注框
    this.$EventBus.$on("closeDialog", () => {
      this.imgs.forEach((item) => {
        item.visible = false;
      });
    });
    //点击全选时改变全部数据的选中状态
    this.$EventBus.$on("CheckAll",val=>{
        this.imgs.forEach(item=>{
          item.checked=val
        })
        this.handleCheckedChange(false, "")
    })
    this.$EventBus.$on("deletes", () => {
      this.handleDeletes();
    });
    //设置每一项的checked及预览url数组
    this.imgs.forEach(item=>{
      this.$set(item,"checked",false)
      this.srcList.push(this.getimgs(item))
    })
  },
  methods: {
    //请求获取数据
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

      if (this.imgs[index].uploading) {
        this.cancelUpload(row, index);
        return;
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: TextTrackCueList,
      })
        .then(() => {
          this.deleteItem(row, index);
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteItem(value, index) {
      let del = this.imgs.splice(index, 1);

      this.srcList.splice(index, 1);
      //模拟删除
      let localFiles = localStorage.getItem("localFiles");
      if (localFiles) {
        localFiles = JSON.parse(localFiles);
        let i = localFiles.findIndex((item) => item.uid == del[0].uid);
        localFiles.splice(i, 1);
        localStorage.setItem("localFiles", JSON.stringify(localFiles));
      }

      try {
        this.$httpRequest
          .deletePic(param)

          .then((res) => {
            this.$message.success("删除成功！");
          })
          .catch(() => {
            this.$message.erroe("接口异常！");
          });
      } catch (err) {}
    },

    //取消上传
    cancelUpload(value, index) {
      let c = this.controllers.filter((item) => item.uid == value.uid);
      c[0].controller.abort();
    },
    //下载
    handleDownload(index,row){

    },
    // 图片url获取
    getimgs(item) {
      if(!item.url){
        return window.imgUrl + "/" + item.encode_str + item.type_tail;
      }else{
        return item.url
      }
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
      /*上传文件重传判断*/
      let getfs = this.imgs.filter((item) => item.uid == file.uid);
      //取消上传控制器
      let controller=new AbortController()
      if (!getfs.length) {
        this.controllers.push({uid:file.uid,controller});
        setTimeout(()=>{
        this.imgs.push({
          url: URL.createObjectURL(file.raw),
          uploading: true,
          uid: file.uid,
          file: file,
          res: true,
          visible: false,
          checked:false,
          type: file.name.split(".")[file.name.split(".").length - 1],
          jd: 0,
          jd_num: 0,
          speed: 0,
          isShowActions: false,
        });
        },100)
        this.srcList.push(URL.createObjectURL(file.raw))
      }else{
        this.imgs[index].uploading = true;
        this.imgs[index].res = false;
        this.imgs[index].jd_num = 0;
        this.imgs[index].speed=0
        let fc=this.controllers.filter((item)=>item.uid==file.uid)
        fc[0].controller=controller
      }
      setTimeout(()=>{
        this.handleCheckedChange(false, "")
      },100)
      let params = {
        relPoint: this.featureData.encodeStr,
        command: "",
      };
      let newfile = new FormData();
      newfile.append("file", file.raw);
      for (let item in params) {
        newfile.append(item, params[item]);
      }
      //上传
      let lastTime = 0; // 上一次计算时间
      let lastSize = 0;
      this.$httpRequest
        .postPic(newfile,{signal: controller.signal,onUploadProgress:(e)=>{
          //上传进度，速率，百分比
          const { loaded, total } = e
          let fs = this.imgs.filter((item) => item.uid == file.uid);
          fs[0].jd = parseFloat((loaded / total*99.99).toFixed(2))
          let jd_num=loaded/1024
         if(jd_num<1024){
           fs[0].jd_num=jd_num.toFixed(2)+"KB"
         }else{
          fs[0].jd_num=(jd_num/1024).toFixed(2) +"MB"
         }
          /* 计算间隔 */
          const nowTime = new Date().getTime();
          const intervalTime = (nowTime - lastTime) / 1000; // 时间单位为毫秒，需转化为秒
          const intervalSize = loaded - lastSize;
          let speed = 0;
          /* 验证数据 */
          if (lastTime == 0) {
            lastTime = new Date().getTime();
            lastSize = loaded;
            speed = lastSize;
          } else {
            /* 重新赋值以便于下次计算 */
            lastTime = nowTime;
            lastSize = loaded;
            speed = intervalSize / intervalTime;
          }
          let units = "b/s"; // 单位名称
          speed = speed / 1024; //转为KB
          if (speed < 1024) {
            speed = parseFloat(speed.toFixed(2));
            units = "k/s";
          }
          if (speed > 1024) {
            speed = parseFloat((speed / 1024).toFixed(2));
            units = "m/s";
          }
          fs[0].speed = speed + units;        })
        .then((res) => {
          try{
          //模拟上传存储
          let localFiles=localStorage.getItem("localFiles")
          let fileData={
              uid:file.uid,
              url: URL.createObjectURL(file.raw),
              name:file.name,
              file:{size:file.size},
              res:true,
              visible:false,
              isShowActions:false,
            }
          //转base64
          let fr = new FileReader()
          fr.readAsDataURL(file.raw)
          if(localFiles){
            localFiles=JSON.parse(localFiles)
            fr.onload = function(e) {
              fileData.url=e.target.result
            	localFiles.push(fileData)
              localStorage.setItem("localFiles",JSON.stringify(localFiles))
            }
          }else{
            fr.onload = function(e) {
              fileData.url=e.target.result
              localStorage.setItem("localFiles",JSON.stringify([fileData]))
              }
          }
          this.$message.success("上传成功！");
          let fs = this.imgs.filter((item) => item.uid == file.uid);
          fs[0].jd = 100;
          setTimeout(()=>{
          fs[0].res = true;
          fs[0].uploading = false;},500)          if (res.code == 200) {
            this.getPic();
          }
        }
       }catch{}
       })
        .catch((err) => {
          let fs = this.imgs.filter((item) => item.uid == file.uid);
          if (fs.length) {
            fs[0].uploading = false;
            fs[0].res = false;
            fs[0].visible = false;
          }
          if(err.message=="canceled"){
            this.$message.warning("取消上传！");
          }else{
            this.$message.error("上传失败！");
          }
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
    //下载
    handleDownload(file) {
      console.log(file);
    },
   // 显示备注框
    showDescribe(index, row) {
      this.imgs.forEach((item) => {
        item.visible = false;
      });
      if (!this.imgs[index].res) return;
      this.imgs[index].visible = true;
    },
    //关闭备注框
    closeDescribe(index, item) {
      item.visible = false;
    },
    //重传
    handleReupLoad(index, item){
      this.handlePreview(item.file,null,index)
    },
    //显示操作按钮
    showActions(index,it){
      this.imgs.forEach((item)=>{
        item.isShowActions=false
      })
      it.isShowActions=true
     },
     //图片预览
     handlePreviewPic(index,item){
      this.imgViewIndex=index
      this.showViewer=true
    },
    //关闭预览
    closeViewer() {
       this.showViewer = false
    },
    //修改选中状态
    handleCheckedChange(value,uid){
      //改变选中的checked
      let fs=this.imgs.filter(item=>item.uid==uid)
      if(fs.length){
        fs.checked=value
      }
      //改变全选的状态
      let checkeds=this.imgs.filter(it=>it.checked)
      this.$EventBus.$emit("changeCheckAll",checkeds,this.imgs)
      //改变重传按钮的禁用状态
      let resTrue=checkeds.filter(it=>it.res)
      if(!resTrue.length){
        this.$store.commit("setReUploadDisabled",false)
        return
      }
      this.$store.commit("setReUploadDisabled",true) 
    },
    //批量删除
    handleDeletes() {
      let uploading=this.imgs.filter(item=>item.uploading)
      let checkeds=[]
      let indexs=[]
      this.imgs.forEach((item,index)=>{
        if(item.checked){
          checkeds.push(item)
          indexs.push(index)
        }
      })
      let text="此操作将永久删除已选文件"
      if(uploading.length){
        text="部分文件正在上传，继续操作将取消上传并删除"
      }
      this.$confirm(text+", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: TextTrackCueList,
      })
        .then(() => {
          checkeds.forEach((item,index)=>{
            if(item.uploading){
              this.cancelUpload(item,index)
            }
            this.deleteItem(item, indexs[index]);
          })
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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
      overflow:hidden;
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

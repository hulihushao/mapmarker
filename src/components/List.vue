<!--

 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:16:52
-->
<template>
  <div id="pic-list">
    <transition-group
      enter-active-class="animate__animated animate__fadeInDown"
    >
      <el-card
        style="margin-bottom: 5px"
        :body-style="{
          padding: '0px',
          display: 'flex',
          'align-items': 'center',
          margin: '5px',
        }"
        shadow="hover"
        v-for="(item,index) in imgs"
        :key="item.uid"
        ><div class="img-content" @click="onClickOpenPreview(item)">
          <video
            v-if="item.type == 'mp4'"
            width="100%"
            :src="item.url"
            autoplay
          />
          <el-image ref="preview" fit="contain" :src="getimgs(item)" ></el-image>
        </div>
        <div class="text">
          <div>
            <p>
              <el-tooltip
                class="item"
                effect="dark"
                :disabled="isShowTooltip"
                :content="item.name || item.file.name"
                placement="top"
              >
                <div style="max-width:55vw"
                  slot="content"
                >
                  {{ item.name||item.file.name }}
                </div>
                <span id="name" ref="refName" @mouseover="onMouseOver('refName',index)"
                  >名称：{{ item.name || item.file.name }}
                </span>
              </el-tooltip>
            </p>
            <p>
              <span style="width: 100px; display: inline-block"
                >大小：{{ getSize(item) }}</span
              ><span
                >状态：<span :style="{ color: getZT(item).color }">{{getZT(item).zt }}</span></span
              >
            </p>
            <p>
              <el-tooltip
                class="item"
                effect="dark"
                :disabled="item.command ? false : true"
                :content="item.command"
                placement="top"
              >
                <span> 备注：{{ item.command }} </span>
              </el-tooltip>
            </p>
          </div>
          <el-checkbox
            v-model="item.checked"
            v-show="showChecked"
            label=""
            @change="
              (value) => {
                handleCheckedChange(value, item);
              }
            "
          ></el-checkbox>
        </div>
      </el-card>
    </transition-group>
    <!-- 预览 -->
    <div class="preview" v-if="IsPreview">
      <file-preview
        :key="timers"
        :TragetPic="TragetPic"
        :FilePreAll="FilePreAll"
        @Close="onClickClosePreview"
      ></file-preview>
    </div>
  </div>
</template>

<script>
import filePreview from "@/mixins/filePreview.js";
export default {
  props: {
    imgs: {
      type: Array,
      required: true,
      default: [],
    },
    srcList: {
      type: Array,
    },
  },
  components: {},
  mixins: [filePreview],
  data() {
    return {
      isShowTooltip: false,

    };
  },
  computed: {
    showChecked() {
      return this.$store.state.showChecked;
    },
  },
  created() {},
  mounted() {},
  methods: {
    //获取url
    getimgs(item) {
      if (!item.url) {
        return this.$parent.getimgs(item);
      } else {
        return item.url;
      }
    },
    //获取文件大小的单位
    getSize(item) {
      let size = null;
      let units = "KB";
      if (item.file) {
        let s = item.file.size / 1024;
        if (s < 1024) {
          size = parseFloat(s.toFixed(2));
          units = "KB";
        } else {
          size = parseFloat((item.file.size / 1024 / 1024).toFixed(2));
          units = "MB";
        }
      } else {
        size = "未知";
        return size;
      }
      return size + units;
    },
    onMouseOver(str,index) {
      let span=document.querySelectorAll("#name")[index]
      let parentWidth = span.parentNode.offsetHeight;
      let contentWidth = span.offsetHeight;
       //alert(parentWidth+","+contentWidth)
      // 判断是否开启tooltip功能
      if (contentWidth >= parentWidth) {
        this.isShowTooltip = false;
      } else {
        this.isShowTooltip = true;
      }
    },
    //获取状态的内容的显示
    getZT(item) {
      let zt = "";
      let color=""
      if (item.res && !item.uploading) {
        zt = "-";
        color="green"
      } else if (item.uploading) {
        zt = "上传中...";
        color="#ccc"
      } else if (!item.res && !item.uploading) {
        zt = "上传失败";
        color="red"
      }
      return {zt,color};
    },
    handleCheckedChange(value, item) {
      //修改选中的状态
      this.$emit("handleCheckedChange", value, item.uid);
      //派发修改全选状态
      let checkeds = this.imgs.filter((it) => it.checked);
      this.$EventBus.$emit("changeCheckAll", checkeds, this.imgs);
      //改变重传按钮的禁用状态
      let resTrue=checkeds.filter(it=>it.res)
      if(!resTrue.length){
        this.$store.commit("setReUploadDisabled",false)
        return
      }
      this.$store.commit("setReUploadDisabled",true)    },
  },
};
</script>

<style lang="less" scoped>
#pic-list {
  width: 90%;
  .img-content {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-image {
      width: 100%;
    }
  }
  .text {
    div {
      margin-left: 10px;

      height: 15vw;
      border: 1px solid #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0px;
    }
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
    }
    p:nth-child(1),
    p:nth-child(3) {
      overflow: hidden;
      /* 多余的以省略号出现 */
      text-overflow: ellipsis;
      /* 将对象作为弹性伸缩盒子模型显示 */
      display: -webkit-box;
      /* 限制再一个块元素再文本显示的行数 */
      -webkit-line-clamp: 1;
      /* 设置或检索伸缩盒对象的子元素的排列方式 */
      -webkit-box-orient: vertical;
    }
    p:nth-child(2),
    p:nth-child(3) {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>

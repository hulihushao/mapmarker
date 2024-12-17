<!--

 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: TJP
 * @LastEditTime: 2024-02-05 16:05:40
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
        >
        <div class="img-content" @click="onClickOpenPreview(item,index)">
          <video
            v-if="item.type == 'mp4'"
            width="100%"
            :src="item.url"
            autoplay ref="preview"
          />
          <el-image v-else ref="preview" fit="contain" :src="getimgs(item)" ></el-image>
        </div>
        <div class="text">
          <div :style="{width:$store.state.showChecked?'90%':'100%'}">
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
                <!--class="command"-->
                <span :class="{command:!item.isMore, bz: item.isMore }"> 备注：{{ item.command }} </span>
              </el-tooltip>
              <span
                v-if="item.command&& item.isShowMore"
                :class="{ more_span2: item.isMore,more:!item.isMore }"
                @click="()=>{$emit('handleMore', item);}"
                >{{ item.isMore ? "收起" : "展开" }}</span
              >
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
  mounted() {
    this.showMore();
  },
  methods: {
    //获取url
    getimgs(item) {
        return this.$parent.getimgs(item);
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
    showMore() {
      let span = document.querySelectorAll(".command");
      span.forEach((item, index) => {
        let isShow = false;
        let parentWidth = item.scrollWidth;
        let contentWidth = item.offsetWidth;
        // alert(parentWidth + "," + contentWidth);
        if (contentWidth < parentWidth) {
          isShow = true;
        } else {
          isShow = false;
        }
        this.$emit("showMore", index, isShow);
      });
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

<style lang="scss" scoped>
#pic-list {
  width: 90%;
  .img-content {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border: 1px solid #ffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    .el-image {
      width: 100%;
    }
  }
  .text {
    border: 1px solid #fff;

    div {
      margin-left: 0px;
      border: 1px solid #fff;
      display: flex;
      flex-direction: column;
      padding: 0px;
      width: 100%;
      p {
        min-height: 18px;
        border: 1px solid #fff;
        width:100%;
      }
      p:nth-child(1),
      p:nth-child(3) {
        width: 100%;
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
        font-size: 0.75rem;
        color: #ccc;
      }
      p:nth-child(3) {
        display: flex;
        position: relative;
        span:nth-child(1) {
          width: 89%;
          border: 1px solid #fff;
        }
        .bz {
          -webkit-line-clamp: 999;
        }
        .command {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-child(2) {
          width: auto;
          padding: 0 2px;
          position: absolute;
          right: 0;
        }
        .more {
          top: 0;
        }
      }
    }
    .more_span2 {
      position: absolute;
      bottom: 0px;
    }
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
<!--
<style lang="sass" scoped>
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
      border: 1px solid #000;
      border: 1px solid #fff;
      display: flex;
      flex-direction: column;
      padding: 0px;
      width:100%;
      p {
        min-height: 18px;
      }
      p:nth-child(1),
      p:nth-child(3),
      .command {
        width: 100%;
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
        font-size: .75rem;
        color: #ccc;
      }
      p:nth-child(3) {
        display: flex;
        position: relative;
        span:nth-child(1) {
          max-width: 87%;
          width: auto;
        }      
        .bz{
           -webkit-line-clamp: 999;
        }
        span:nth-child(2) {
          width: auto;
          padding: 0 2px;
          position:absolute;
          right:0;
        }
        .more{
          top:0;  
        }
      }
    }
    .more_span2 {
        position: absolute;
        bottom: 0px;
    }
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
-->

<template>
  <!-- 预览组件 -->
  <div class="FilePreview">
    <div class="container">
      <!-- 渲染层 -->
      <div
        class="object"
        v-if="
          TragetObj.format == 'webp' ||
          TragetObj.format == 'jpg' ||
          TragetObj.format == 'png' ||
          TragetObj.format == 'JPG' ||
          TragetObj.format == 'PNG' ||
          TragetObj.format == 'jpeg' ||
          TragetObj.format == 'tiff' ||
          TragetObj.format == 'swf' ||
          TragetObj.format == 'gif' ||
          TragetObj.format == 'JPEG' ||
          TragetObj.format == 'GIF'
        "
        ref="imgWrap"
        @mousewheel.prevent="rollImg"
      >
        <img
          class="Target modal-img"
          ref="img"
          @mousedown="moveImg"
          :src="TragetObj.url"
          alt=""
        />
      </div>
      <!-- 视频 -->
      <div
        class="object"
        v-else-if="
          TragetObj.format == 'webm' ||
          TragetObj.format == 'mov' ||
          TragetObj.format == 'mp4'
        "
      >
        <video
          class="Target"
          controls="controls"
          width="1000"
          :src="TragetObj.url"
          autoplay
          ref="videoref"
          style="max-width: 100%; transition: all 0.2s"
        >
          您的浏览器不支持。
        </video>
      </div>
      <!-- 附件 -->
      <div class="object" v-else>
        <iframe
          class="Target"
          frameborder="1"
          index-render="1"
          scrolling="yes"
          height="890.15"
          width="1220.4"
          style="
            max-width: 100%;
            background: rgba(255, 255, 255, 1);
            border: 1px solid #ccc;
          "
          :src="TragetObj.url"
        ></iframe>
      </div>
      <!-- 操作按钮 -->
      <div class="viewer_btn">
        <ul>
          <li @click="onClickEnlarge">
            <i class="el-icon-zoom-in"></i>
          </li>
          <li @click="onClickNarrow">
            <i class="el-icon-zoom-out"></i>
          </li>
          <li v-if="!showFullScreen" @click="onClickReturnOriginal">
            <i class="el-icon-c-scale-to-original"></i>
          </li>
          <li v-if="showFullScreen" @click="onClickReturnOriginal">
            <i class="el-icon-full-screen"></i>
          </li>
          <li @click="onClickRotateLeft">
            <i class="el-icon-refresh-left"></i>
          </li>
          <li @click="onClickRotateRight">
            <i class="el-icon-refresh-right"></i>
          </li>
          <!-- 下载 -->
          <li v-if="TragetObj.downUrl">
            <a :href="TragetObj.downUrl">
              <i class="el-icon-download"></i>
            </a>
          </li>
        </ul>
      </div>
      <!--下一个 -->
      <div class="next" v-if="FilePresAll.length > 1" @click="onClickNext">
        <i class="el-icon-arrow-right"></i>
      </div>
      <!-- 上一个 -->
      <div
        class="previous"
        v-if="FilePresAll.length > 1"
        @click="onCLickPrevious"
      >
        <i class="el-icon-arrow-left"></i>
      </div>
      <!-- 关闭按钮 -->
      <div class="close" @click="onClickClose">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="viewer__mask" @click.stop="onClickClose">
      <div style="width: 50px; height: 0px">
        <div v-loading="loadingFlag"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["TragetPic", "FilePreAll"],
  data() {
    return {
      EleWidth: "",
      EleHeight: "",
      TragetObj: {}, // 目标对象
      FilePresAll: [], // 渲染数组
      NumIndex: 0, // 当前渲染目标的下标
      loadingFlag: false, // 加载
      showFullScreen: true,
    };
  },
  created() {
    this.TragetObj = this.TragetPic; // 目标对象
    this.FilePresAll = this.FilePreAll; // 渲染数组
  },
  mounted() {
    if (this.EleWidth == "") {
      if (
        this.TragetObj.format != "webp" &&
        this.TragetObj.format != "jpg" &&
        this.TragetObj.format != "png" &&
        this.TragetObj.format != "JPG" &&
        this.TragetObj.format != "PNG" &&
        this.TragetObj.format != "jpeg" &&
        this.TragetObj.format != "tiff" &&
        this.TragetObj.format != "swf" &&
        this.TragetObj.format != "gif" &&
        this.TragetObj.format != "JPEG" &&
        this.TragetObj.format != "GIF"
      ) {
        this.loadingFlag = true;
      } else {
        this.loadingFlag = false;
      }
    }
    // 获取目标元素值
    let Target = document.getElementsByClassName("Target")[0];
    this.EleWidth = Target.offsetWidth;
    this.EleHeight = Target.offsetHeight;
    if (this.EleWidth != "") {
      this.loadingFlag = false;
    }
    // console.log(this.EleWidth)

    // 获取当前目标的下标值
    this.FilePresAll.forEach((item, index) => {
      if (item.FileName == this.TragetObj.FileName) {
        this.NumIndex = index;
      }
    });
    this.setCurrentTime();
  },
  beforeUpdate() {
    if (
      this.TragetObj.format != "webp" &&
      this.TragetObj.format != "jpg" &&
      this.TragetObj.format != "png" &&
      this.TragetObj.format != "JPG" &&
      this.TragetObj.format != "PNG" &&
      this.TragetObj.format != "jpeg" &&
      this.TragetObj.format != "tiff" &&
      this.TragetObj.format != "swf" &&
      this.TragetObj.format != "gif" &&
      this.TragetObj.format != "JPEG" &&
      this.TragetObj.format != "GIF"
    ) {
      this.loadingFlag = true;
    } else {
      this.loadingFlag = false;
    }
    this.$nextTick(() => {
      let eleParent = document.querySelector(".object");
      // 获取目标元素值
      let Target = eleParent.children[0];
      this.EleWidth = Target.offsetWidth;
      this.EleHeight = Target.offsetHeight;
      // console.log(Target)
    });
  },
  methods: {
    // 放大功能
    onClickEnlarge() {
      this.Zooms("in");
    },
    // 缩小功能
    onClickNarrow() {
      this.Zooms("out");
    },
    Zooms(zoom) {
      let Target = document.getElementsByClassName("Target")[0];
      let transform = Target.style.transform;
      let scales = Target.style.transform.match(/(\-|\+)?\d+(\.\d+)?/g);
      let rotate = "";
      let scale;
      if (zoom == "in") {
        if (scales) {
          scale = scales[0] * 1 + 0.2;
        } else {
          scale = 1.2;
        }
      } else {
        if (scales) {
          scale = scales[0] * 1 - 0.2;
        } else {
          scale = 0.8;
        }
        if (scale <= 0.2) scale = 0.2;
      }
      if (transform) {
        if (transform.indexOf("rotate") > -1) {
          rotate = transform.split(" ")[1];
        }
      }
      Target.style.transform = `scale(${scale}) ${rotate}`;
    },
    // 返回原图大小
    onClickReturnOriginal() {
      let Target = document.getElementsByClassName("Target")[0];
      let getrotate = "";
      let transform = Target.style.transform;
      if (transform) {
        if (
          transform.indexOf("rotate") > -1 &&
          transform.indexOf("scale") < 0
        ) {
          getrotate = transform;
        } else if (
          transform.indexOf("rotate") > -1 &&
          transform.indexOf("scale") > -1
        ) {
          getrotate = transform.split(" ")[1];
        }
      }
      if (this.showFullScreen) {
        Target.style.transform = "scale(1.4)" + " " + getrotate;
      } else {
        Target.style.transform = "scale(1)" + " " + getrotate;
      }
      this.showFullScreen = !this.showFullScreen;
    },
    //向左旋转
    onClickRotateLeft() {
      this.Rotate("+");
    },
    //向右旋转
    onClickRotateRight() {
      this.Rotate("-");
    },
    Rotate(fu) {
      let Target = document.getElementsByClassName("Target")[0];
      let transform = Target.style.transform;
      if (transform) {
        let scale = Target.style.transform.match(/(\-|\+)?\d+(\.\d+)?/g);
        let rot;
        if (transform.indexOf("scale") > -1) {
          if (transform.indexOf("rotate") > -1) {
            if (fu == "+") {
              rot = scale[1] * 1 + 90;
            } else {
              rot = scale[1] * 1 - 90;
            }
            Target.style.transform = `scale(${scale[0]}) rotate(${rot}deg)`;
          } else {
            Target.style.transform = `scale(${scale}) rotate(${
              fu == "+" ? 90 : -90
            }deg)`;
          }
        } else {
          if (fu == "+") {
            rot = scale[0] * 1 + 90;
          } else {
            rot = scale[0] * 1 - 90;
          }
          Target.style.transform = `rotate(${rot}deg)`;
        }
      } else {
        Target.style.transform = `rotate(${fu == "+" ? 90 : -90}deg)`;
      }
    },
    // 点击下一个事件
    onClickNext() {
      this.getCurrentTime();
      this.setOriginal();
      if (this.NumIndex < this.FilePresAll.length - 1) {
        this.NumIndex++;
      } else {
        this.NumIndex = this.NumIndex - this.FilePresAll.length + 1;
      }
      this.TragetObj = this.FilePresAll[this.NumIndex];
      this.setCurrentTime();
    },
    //获取播放进度
    getCurrentTime() {
      let video = this.$refs.videoref;
      if (!video) return;
      let currentTime = this.$refs.videoref.currentTime;
      let localCurTime = localStorage.getItem("currentTime");
      if (localCurTime) {
        localStorage.setItem(
          "currentTime",
          localCurTime + "+" + video.src + "," + currentTime
        );
        return;
      }
      localStorage.setItem("currentTime", video.src + "," + currentTime);
    },

    //设置播放进度
    setCurrentTime() {
      if (this.TragetObj.format == "mp4") {
        let localCurTime = localStorage.getItem("currentTime");
        let currentTime = 0;
        if (localCurTime) {
          localCurTime = localCurTime.split("+");
          localCurTime.forEach((item) => {
            if (item.indexOf(this.TragetObj.url) > -1) {
              currentTime = item.split(",")[1];
            }
          });
        }
        setTimeout(() => {
          this.$refs.videoref.currentTime = parseFloat(currentTime || 0);
        });
      }
    },
    // 点击上一个事件
    onCLickPrevious() {
      this.getCurrentTime();
      this.setOriginal();
      if (this.NumIndex != 0) {
        this.NumIndex--;
      } else {
        this.NumIndex = this.FilePresAll.length - 1;
      }
      this.TragetObj = this.FilePresAll[this.NumIndex];
      this.setCurrentTime();
    },

    // 关闭按钮
    onClickClose() {
      // 关闭视频声音
      if (this.$refs.videoref != undefined) {
        this.$refs.videoref.pause();
        this.getCurrentTime();
      }
      this.$emit("Close", false);
    },
    setOriginal() {
      this.showFullScreen = true;
      let Target = document.getElementsByClassName("Target")[0];
      if (Target) {
        Target.style.transition = "all 0s";
        Target.style.transform = "scale(1)";
        setTimeout(() => {
          Target.style.transition = "all .2s";
        });
      }
    },
    // 拖拽图片事件
    moveImg(e) {
      e.preventDefault();
      // 获取元素
      let imgWrap = this.$refs.imgWrap;
      let img = this.$refs.img;
      let x = e.pageX - img.offsetLeft;
      let y = e.pageY - img.offsetTop;
      // 添加鼠标移动事件
      imgWrap.addEventListener("mousemove", move);
      function move(e) {
        img.style.left = e.pageX - x + "px";
        img.style.top = e.pageY - y + "px";
      }
      // 添加鼠标抬起事件，鼠标抬起，将事件移除
      img.addEventListener("mouseup", () => {
        imgWrap.removeEventListener("mousemove", move);
      });
      // 鼠标离开父级元素，把事件移除
      imgWrap.addEventListener("mouseout", () => {
        imgWrap.removeEventListener("mousemove", move);
      });
    },
    // 鼠标滚动缩放图片事件
    rollImg(event) {
      /* 获取当前页面的缩放比 若未设置zoom缩放比，则为默认100%，即1，原图大小 */
      let zoom = parseInt(this.$refs.img.style.zoom) || 100;
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动 */
      zoom += event.wheelDelta / 12;
      /* 最小范围 和 最大范围 的图片缩放尺度 */
      if (zoom >= 40 && zoom < 500) {
        this.$refs.img.style.zoom = zoom + "%";
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.FilePreview {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 8888;
  height: 100%;
  width: 100%;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    .object {
      z-index: 10001;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 25px;
      .modal-img {
        max-width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        cursor: move;
        transition: all 0.2s;
        &-wrap {
          position: relative;
          width: 960px;
          height: 560px;
          overflow: hidden;
        }
      }
    }
    .viewer_btn {
      position: absolute;
      left: 50%;
      bottom: 30px;
      z-index: 10020;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      // width: 250px;
      height: 2.8rem;
      padding: 0 10px;
      background-color: rgba(96, 98, 102, 0.6);
      border-color: #fff;
      border-radius: 1.7rem;
      ul {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          list-style: none;
          font-size: 1.8rem;
          color: #fff;
          padding: 6px 12px;
          cursor: pointer;
        }
      }
    }
    .next {
      position: absolute;
      top: 47%;
      right: 40px;
      z-index: 10020;
      font-size: 1.8rem;
      height: 2.8rem;
      width: 2.8rem;
      line-height: 2.8rem;
      text-align: center;
      background: rgba(96, 98, 102, 0.6);
      color: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
    .previous {
      position: absolute;
      top: 47%;
      left: 40px;
      z-index: 10020;
      font-size: 1.8rem;
      height: 2.8rem;
      width: 2.8rem;
      line-height: 2.8rem;
      text-align: center;
      background: rgba(96, 98, 102, 0.6);
      color: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
    .close {
      position: absolute;
      top: 40px;
      right: 40px;
      z-index: 10020;
      font-size: 1.8rem;
      cursor: pointer;
      background: rgba(96, 98, 102, 0.6);
      border-radius: 50%;
      width: 2.6rem;
      height: 2.6rem;
      line-height: 2.6rem;
      text-align: center;
    }
  }
  .viewer__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 8888;
    display: flex;

    align-items: center; /*由于flex-direction: column，因此align-items代表的是水平方向*/
    justify-content: center; /*由于flex-direction: column，因此justify-content代表的是垂直方向*/
  }
}
</style>
<style>
/* 关闭图标 */
.FilePreview .el-icon-close {
  color: #fff;
}
</style>

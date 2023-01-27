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
        v-for="item in imgs"
        :key="item.uid"
        ><div class="img-content">
          <video
            v-if="item.type == 'mp4'"
            width="100%"
            :src="item.url"
            autoplay
          />
          <el-image ref="preview" fit="contain" :src="getimgs(item)" :preview-src-list="[item.url||getimgs(item)]"></el-image>
        </div>
        <div class="text">
          <div>
            <p>
              <el-tooltip
                class="item"
                effect="dark"
                :disabled="
                  (item.name || item.file.name).length > 19 ? false : true
                "
                :content="item.name || item.file.name"
                placement="top"
              >
                <div
                  slot="content"
                  v-if="(item.name || item.file.name).length > 30"
                >
                  {{ (item.name || item.file.name).substring(0, 30) }}<br />{{
                    (item.name || item.file.name).substring(30, 63)
                  }}<br v-if="(item.name || item.file.name).length > 60" />{{
                    (item.name || item.file.name).substring(63)
                  }}
                </div>
                <span ref="refName" @mouseover="onMouseOver('refName')"
                  >名称：{{ item.name || item.file.name }}
                </span>
              </el-tooltip>
            </p>

            <p>大小：{{ getSize(item) }}</p>
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
          <el-checkbox v-show="showChecked" label=""></el-checkbox>
        </div>
      </el-card>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      required: true,
      default: [],
    },
  },
  components: {},
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
    getimgs(item) {
      if (!item.url) {
        return this.$parent.getimgs(item);
      } else {
        return item.url;
      }
    },
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
    onMouseOver(str) {
      let parentWidth = this.$refs[str].parentNode.offsetWidth;
      let contentWidth = this.$refs[str].offsetWidth;
      // 判断是否开启tooltip功能
      if (contentWidth > parentWidth) {
        this.isShowTooltip = false;
      } else {
        this.isShowTooltip = true;
      }
    },
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

<!-- 
  开发作者：piwenlong.64253@mapgis.com
	组件名称  工具条容器 
	组件描述：基础列表的表格提供支持（可拓展）
  传递参数：
		序号    属性名称						属性类型			是否必传	    说明
    01.     elPopover          Object          否         组件展示数据源，非必传，不传不展示
    02.     placement          String          否         气泡位置  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    03.     trigger            String          否         触发气泡方式
    04.     pop-class          String          否         样式类选项  
  回调事件：
  序号    事件名称						参数列表				说明
  01.    popParentClick        row          回调参数为当前点击项
  02.    popChildenClick       row          回调参数为当前点击项
-->

<template>
  <div
    v-drag
    :class="popClass"
    ref="popUl"
    :style="{ width: elWidth }"
    v-if="elPopover && elPopover.data"
  >
    <ul style="display: flex">
      <el-popover
        :ref="`popover-${index}`"
        v-for="(item, index) in elPopover.data"
        :key="index"
        :placement="placement"
        :disabled="disabled.indexOf(index) > -1"
        :trigger="trigger"
        width="100"
      >
        <p
          v-for="(citem, cindex) in item.children"
          :key="'c' + cindex"
          v-if="item.children"
          @click="$emit('popChildenClick', { row: citem, index })"
        >
          <i :class="citem.iconcls"></i> {{ citem.text }}
        </p>
        <slot name="content"></slot>
        <li slot="reference" @click="$emit('popParentClick', item)">
          <i :class="item.iconcls"></i> {{ item.text
          }}<i
            v-if="item.children"
            class="el-icon-arrow-down el-icon--right"
          ></i>
        </li>
      </el-popover>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Popscontainer",
  props: {
    elPopover: {
      // 数据源
      type: Object,
      required: false,
      default: () => {
        data: [];
      },
    },
    placement: {
      // 气泡位置  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
      type: String,
      default: "bottom",
    },
    trigger: {
      type: String, // 触发方式  click/focus/hover/manual
      default: "click",
    },
    "pop-class": {
      type: String, // 快捷样式
      default: "pop-default",
    },
    disabled: {
      type: Array, // 不显示气泡的索引集合
      default: () => [],
    },
  },
  data() {
    return {
      elWidth: "100px",
    };
  },
  mounted() {
    this.$nextTick(() => {
     
          if (!this.$refs.popUl) return;
          this.elWidth = this.$refs.popUl.clientWidth + 120 + "px";
       
      }
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
li {
  padding: 10px 12px;
  cursor: pointer;
  font-weight: bold;
  list-style: none;
}
li:hover {
  background-color: #eef1f6;
  color: #409eff;
}
p {
  padding: 10px 5px;
  // font-weight: bold;
  cursor: pointer;
  text-align: center;
}
p:hover {
  background-color: #eef1f6;
  color: #409eff;
}
.pop-default {
  position: absolute;
  top: 15%;
  right: 4%;
  z-index: 9;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  font-size: 12px;
  //   width: 382px;
}
</style>

<style>
.el-popover {
  min-width: 80px !important;
  padding: 0;
}

</style>

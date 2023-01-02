<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-06-02 14:20:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-06-02 16:16:52
-->
<template>
  <div id="user">
    <el-dropdown size="small" :hide-on-click="false" @command="handleCommand">
      <el-avatar
        style="border: 1px solid red"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :style="item.style"
          :command="item.command"
          v-for="item in dropdownMenu"
          :key="item.command" :disabled="item.disabled" :divided="item.divided"
          >{{ item.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownMenu: [
        {

          command: "",
          name: "用户名",
          disabled:true,
          style:{
            color:"red",
            'font-size':'15px'
          },

        },
        {

          command: "user",
          name: "个人中心",
          disabled:false,
          divided:true,
        },
        {
          command: "changePassword",
          name: "修改密码",
          disabled:false
        },
        {
          command: "singOut",
          name: "退出",
          disabled:false,
          divided:true,
        },
      ],
    };
  },
  created() {},
  methods: {
    handleCommand(command) {
      switch (command) {
        case "changePassword":
          break;
        case "singOut":
          this.singOut();
          break;
      }
    },
    singOut() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#user {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>

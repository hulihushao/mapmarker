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
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="item.command" v-for="item in dropdownMenu":key="item.command">{{item.name}}</el-dropdown-item>
                                          </el-dropdown-menu>
                                          </el-dropdown>
                                          
            
                </div>
</template>

<script>
export default {
  data() {
    return {
    dropdownMenu:[{
      command:"changePassword",
      name:"修改密码" 
    },{
       command:"singOut",
        name:"退出"
    }]
    };
  },
  created() {
    
  },
  methods: {
handleCommand(command){
  
  switch(command){
    case "changePassword":
      
      break
    case "singOut":
    this.singOut()
    break
  }},
  singOut(){
      this.$router.push("/login")
    },
}
};
</script>

<style>
#user{
    position:absolute;
    right:10px;
    top:10px;
}
</style>

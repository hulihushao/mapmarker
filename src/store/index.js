import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showFormDialog:false,//表单显示
    position:[],//点位坐标
    showChecked:false,//显示多选按钮
    reUploadDisabled:false,//重传按钮是否禁用
  },
  mutations: {
    setShowFormDialog(state,value){
      state.showFormDialog=value
    },
    setPosition(state,value){
      state.position=value
    },
    setShowChecked(state,value){
      state.showChecked=value
    },
    setReUploadDisabled(state,value){
      state.reUploadDisabled=value
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showFormDialog:false,
    position:[],
    showChecked:false,
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
    }
  },
  actions: {
  },
  modules: {
  }
})

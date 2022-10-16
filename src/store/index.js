import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showFormDialog:false,
    position:[],
  },
  mutations: {
    setShowFormDialog(state,value){
      state.showFormDialog=value
    },
    setPosition(state,value){
      state.position=value
    },
  },
  actions: {
  },
  modules: {
  }
})

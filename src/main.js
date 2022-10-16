import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import map from './utils/map/map'

import $httpRequest from './api/index'

// 导入自定义指令
import './directives';

Vue.config.productionTip = false

Vue.prototype.$tMap=map
Vue.prototype.$httpRequest=$httpRequest
Vue.prototype.$EventBus=new Vue()

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

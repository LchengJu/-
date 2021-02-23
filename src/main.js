import Vue from 'vue'
import App from './App.vue'

// el组件相关
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册elm
Vue.use(ElementUI);


// 导入css
import '@/assets/base.css'

// 导入全局过滤器
import '../src/filters/index'

// 导入Vuex
import store from '@/store'


// 导入router 模块
import router from '@/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

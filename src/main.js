import Vue from 'vue'
import App from './App.vue'
// 导入路由
import VueRouter from "vue-router"
// 链接组建
import Index from './components/01.index.vue'

import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';

// 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter)
Vue.use(ElementUI);

// 定义路由
let routes = [
  {
    path: '/',
    // component: Index
    redirect:'/index'
  },
  {
    path: '/index',
    component: Index 
  }
]

// 创建路由实例
const router = new VueRouter({
  routes
})

// Vue.config.productionTip = false

// 创建和挂载实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

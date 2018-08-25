import Vue from 'vue'
import App from './App.vue'
// 导入路由
import VueRouter from "vue-router"
// 链接组建
import Index from './components/01.index.vue'
import Detail from './components/02.productdetail.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import iView from 'iview'; 
import 'iview/dist/styles/iview.css';


// 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(iView);
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  loading: require('./assets/img/loading1.gif'),
  attempt: 1
})

// 注册全局过滤器 因为有多个页面需要重复使用
// 依赖于 moment.js
import moment from 'moment';
// 注册
Vue.filter('filterDate', function(val){
  return moment(val).format("YYYY年MM月DD日");
})

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
  },
  {
    path: '/detail/:id',
    component: Detail 
  }
]

// 创建路由实例
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

// 创建和挂载实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
// 导入路由
import VueRouter from "vue-router"
// 链接组建
import Index from './components/01.index.vue'
import Detail from './components/02.productdetail.vue'
import shoppingCart from './components/03.shoppingCart.vue'

// 插件连接
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import iView from 'iview'; 
import 'iview/dist/styles/iview.css';
// 放大镜
import ProductZoomer from 'vue-product-zoomer'

// 全局axios
import axios from 'axios';
axios.defaults.baseURL = 'http://47.106.148.205:8899';
Vue.prototype.$axios=axios

// 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter)
Vue.use(ProductZoomer)
Vue.use(iView);
Vue.use(ElementUI);
// 懒加载
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

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 实例化一个仓库 来储存兄弟组件的需要共同运用的数据
const store = new Vuex.Store({
  // 这里放是需要的数据
  state: {
    // count:50,
    // 先从本地储存拿  如果没有 就为空
    cartDate:JSON.parse(window.localStorage.getItem('goodKey'))||{}
  },
  mutations: {
    // increment (state, n) {
    //   state.count += n
    // }
    // 暴露修改数据的方法
    // 购物车需要的数据是id  还有数量  使用一个对象传递更好（goodInfo）
    addGoods(state,goodInfo){
      // 如果之前这个商品id没有放入过购物车
      if(state.cartDate[goodInfo.goodId]==undefined){
        // 原始的方法不能同步
        // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
        // 使用set让数据同步 并为这个对象添加一个num属性
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      }else{
        // 如果这个商品的id之前加入过
        state.cartDate[goodInfo.goodId] +=goodInfo.goodNum;
      }
    },
    // 同步修改商品数量的的方法 传入商品的id 还有数量 在购物车同步
    updateGoodsNum(state,goodInfo){
      // cartDate {id:num}
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    //增加一个删除商品id的方法
    deleteGoods(state,goodId){
      // 调用vuedelete方法 才可以同步删除更新
      Vue.delete(state.cartDate,goodId);
    },
  },
  // 计算 类似于computed
  getters: {
    // vuex 的计算属性
    goodsCount: state=> {
      let num =0;
      for (const key in state.cartDate) {
        num+= state.cartDate[key]
      }
      // 计算后返回需要的数据在界面
      return num;
    }
  }
})

// 数据常驻 刷新或者关闭浏览器事件
window.onbeforeunload=function(){
  window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartDate))
}

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
  },
  {
    path: '/cart',
    component: shoppingCart 
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
  router,
  store,
}).$mount('#app')

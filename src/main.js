import Vue from 'vue'
import App from './App.vue'
// 导入路由
import VueRouter from "vue-router"
// 链接组建
import Index from './components/01.index.vue'
import Detail from './components/02.productdetail.vue'
import shoppingCart from './components/03.shoppingCart.vue'
import Login from './components/04.login.vue'
import Order from './components/05.order.vue'
import payOrder from './components/06.payOrder.vue'
import paySuccess from './components/07.paySuccess.vue'
import Vip from './components/08.vip.vue'
import orderList from './components/09.orderList.vue'
import orderDetail from './components/10.orderDetail'

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
//让axios携带cookie
//跨域请求时 是否携带 凭证(cookie)
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios

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
// 过滤器 （日期格式）
Vue.filter('filterDate', function (val,formatStr) {
  // 如果有传参就按传参的格式去转换
  if(formatStr!=undefined){
    return moment(val).format(formatStr)
  }else{
    // 如果没有 就正常转换
     return moment(val).format("YYYY年MM月DD日");
  }
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
    // 设置一个cartDate 把这个数据共享在vue中 全局可以调用
    cartDate: JSON.parse(window.localStorage.getItem('goodKey')) || {},
    isLogin: false,
    fromPath:''
  },
  mutations: {
    // increment (state, n) {
    //   state.count += n
    // }
    // 暴露修改数据的方法
    // 购物车需要的数据是id  还有数量  使用一个对象传递更好（goodInfo）
    addGoods(state, goodInfo) {
      // 如果之前这个商品id没有放入过购物车
      if (state.cartDate[goodInfo.goodId] == undefined) {
        // 原始的方法不能同步
        // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
        // 使用set让数据同步 并为这个对象添加一个num属性
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 如果这个商品的id之前加入过
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    // 同步修改商品数量的的方法 传入商品的id 还有数量 在购物车同步
    updateGoodsNum(state, goodInfo) {
      // cartDate {id:num}
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    //增加一个删除商品id的方法
    deleteGoods(state, goodId) {
      // 调用vuedelete方法 才可以同步删除更新
      Vue.delete(state.cartDate, goodId);
    },
    // 利用登录状态判断是否显示登录按键
    changeLoginStatus(state, isLogin) {
      state.isLogin = isLogin
    },
    // 把上一个页面的路径保存到Vuex
    saveFromPath(state,fromPath){
      state.fromPath=fromPath
    }
  },
  //计算 类似于computed
  getters: {
    // vuex 的计算属性
    goodsCount: state => {
      let num = 0;
      for (const key in state.cartDate) {
        // 累加每一个商品数量
        num += state.cartDate[key]
      }
      // 计算后返回需要的数据在界面
      return num;
    }
  }
})

// 数据常驻 刷新或者关闭浏览器事件
window.onbeforeunload = function () {
  window.localStorage.setItem('goodKey', JSON.stringify(store.state.cartDate))
}

// 定义路由
let routes = [{
    path: '/',
    // component: Index
    redirect: '/index'
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
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/order/:ids',
    component: Order,
    meta: { checkLogin: true }
  },
  {
    path: '/payorder/:orderid',
    component: payOrder,
    meta: { checkLogin: true }
  },
  {
    path: '/paySuccess/:id',
    component: paySuccess,
    meta: { checkLogin: true }
  },
  {
    path: '/vip',
    component: Vip,
    meta: { checkLogin: true }
  },
  {
    path: '/orderList',
    component: orderList,
    meta: { checkLogin: true }
  },
  {
    path: '/orderDetail/:id',
    component: orderDetail,
    meta: { checkLogin: true }
  },
]

// 创建路由实例
const router = new VueRouter({
  routes
})

// 路由守卫(去的地址，来的地址，放行)
// 类似于中间件 只要页面跳转到另一个页面 就会经过这里
// 在这里判断登录状态更加合理
router.beforeEach((to, from, next) => {
  // 每次过来都保存一下来时的地址
  // 提交载荷 保存每一次从哪里来的地址
  store.commit('saveFromPath',from.path);

  // 先判断是否是订单页(order页面)
  //if (to.path.indexOf('/order/') != -1)
  if(to.meta.checkLogin==true) {
    axios.get('site/account/islogin').then(res => {
      // console.log(res);
      // 再判断是否已经登录
      // 已经登录
      if (res.data.code != "nologin") {
        next();
      } else { //未登录 
        next('/login');
      }
    })
  } else { //不是订单页则直接放走
    next();
  }
})

Vue.config.productionTip = false

// 创建和挂载实例
new Vue({
  render: h => h(App),
  router,
  store,
  //最高级别的Vue组件(最外层的那个盒子) 在这里判断是否在进入页面的时候有登录
  beforeCreate() {
    axios.get("/site/account/islogin").then(res => {
      // console.log(res);
      // 如果是登录的状态
      if (res.data.code == 'logined') {
        // 改变头部登录的显示（会员中心）
        store.state.isLogin = true;
      }
    })
  }
}).$mount('#app')
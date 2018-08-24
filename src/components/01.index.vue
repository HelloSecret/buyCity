<template>
 <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="itemSon in item.subcates" :key="itemSon.id">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel indicator-position="outside">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                            <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in productlist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="item in item.level2catelist" :key="item.subcateid">{{item.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="item in item.datas" :key="item.artID">
                            <a href="#/site/goodsinfo/87" class="">
                                <div class="img-box">
                                    <img :src="item.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{item.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{item.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>2499</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入axios
import axios from "axios";
// 导入moment
import moment from "moment";

export default {
  name: "index",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      productlist: []
    };
  },
  beforeCreate() {},
  created() {
    axios
      .get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
      .then(response => {
        //  console.log(response)
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
        // console.log(this.catelist)
        // console.log(this.sliderlist)
        // console.log(this.toplist)
      });
    axios
      .get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
      .then(response => {
        //   console.log(response.data.message);
        this.productlist = response.data.message;
      });
  },
  // 过滤器
  filters: {
    //   过滤日期
    filterDate(val) {
      return moment(val).format("YYYY年MM月DD日");
    }
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
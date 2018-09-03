<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="item in message" :key="item.id">
                                    <td>
                                        <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="item.selected">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="" width="70px">
                                    </td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number size="mini" v-model="item.buycount" :min="1" :max="item.max" @change="numChange($event,item.id)"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <tr v-if="message==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物</router-link>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp;
                                        商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                <button class="button">继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "cart",
        data: function () {
            return {
                message: []
            };
        },
        created() {
            // 取出共享的数组 拿到购物车商品的id及数量
            let cartDate = this.$store.state.cartDate;
            // console.log(cartDate)
            var ids = "";
            // 遍历这个对象 把对象的id对应的数量取出来 并用逗号拼接每一个id 得到一个id字符串
            for (const key in cartDate) {
                // console.log(key);
                ids += key;
                ids += ",";
                // console.log(ids);
            }
            // 去掉最后多余的逗号 第二个-1的意思是 最后一个 不要
            ids = ids.slice(0, -1);

            this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
                // console.log(res)
                // 因为服务器返回的数据 没有购买数量
                // 自行拼接个数
                res.data.message.forEach(v => {
                    // 获取 Vuex中的 id对应的值
                    // 例v.id=88 那么就是 cartDate.99 id对应的是商品数量   (商品id)：(商品数量)
                    // 把商品数量赋值给message.buycount
                    v.buycount = cartDate[v.id];
                    // console.log(v)
                    // 设置是否被选中
                    v.selected = true;

                    //数据不能大于库存  重新调用之前有库存的接口 获取之后保存
                    // 带着这个id 去调用接口 即可
                    this.$axios.get(`site/goods/getgoodsinfo/${v.id}`).then(resSon => {
                        // console.log(resSon);
                        // 把库存 保存到 当前循环的那个对象中即可
                        v.max = resSon.data.message.goodsinfo.stock_quantity
                    })
                });
                this.message = res.data.message;
            });
        },
        // 计算总价及总数量
        computed: {
            // 总价
            totalPrice() {
                let totalPrice = 0;
                this.message.forEach(v => {
                    // 只计算被选中的
                    if (v.selected == true) {
                        totalPrice += v.buycount * v.sell_price;
                    }
                });
                return totalPrice;
            },
            // 总数量
            totalCount() {
                let totalCount = 0;
                this.message.forEach(v => {
                    // 只计算被选中的
                    if (v.selected == true) {
                        // 变为了字符串拼接 转化为整数即可
                        totalCount += parseInt(v.buycount);
                    }
                });
                return totalCount;
            }
        },
        methods: {
            // 修改购物车商品之后同步顶部购物车的数据
            numChange(num, id) {
                // 判断如果大于库存 那么则等于库存
                this.message.forEach(v => {
                    if (v.id == id) {
                        if (num > v.max) {
                            num = v.max;
                        }
                    }
                })
                // 调用仓库的方法 (提交载荷) 传入商品id 和数量
                this.$store.commit("updateGoodsNum", {
                    goodId: id,
                    goodNum: num
                });
            },
            delOne(id) {
                //  console.log(id);
                // 传入要删除商品的id
                this.$store.commit("deleteGoods", id);
                // 数据虽然删除了 但是页面中的没有删除
                this.message.forEach((v, i) => {
                    if (v.id == id) {
                        this.message.splice(i, 1);
                    }
                });
            },
            checkAndSubmit() {
                // 判断是否有商品 
                if (this.totalCount == 0) {
                    // 没有则提示
                    this.$Message.error('现在还没有可结算的商品哦');
                    return;
                }
                // 到了这里就是有商品 带上商品id
                let ids = '';
                this.message.forEach(v => {
                    if (v.selected == true) {
                        ids += v.id;
                        ids += ","
                    }
                })
                // 去掉最后的逗号
                ids = ids.slice(0, -1);
                // 跳转到订单页面
                this.$router.push(`/order/${ids}`);

                // 这里使用全局守卫来判断
                //有商品再判断是否登录
                // this.$axios.get('site/account/islogin').then(res => {
                //     // console.log(res);
                //     // 如果没有登录 去登录页面
                //     if (res.data.code == "nologin") {
                //         this.$router.push('/login')
                //     } else { //已登录 去结算页面
                //         this.$router.push('/order')
                //     }
                // })
            }
        }
    };
</script>

<style>
</style>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form status-icon :model="orderForm" :rules="rules" ref="orderForm" label-width="100px"
                            class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                        <v-distpicker @selected="selected" :province="orderForm.area.province.value"
                                            :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系方式">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱地址" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:200px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio><span style="color:#666">手续费：0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(费用：20.00元)</el-radio>
                                        <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(费用：10.00元)</el-radio>
                                        <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(费用：8.00元)</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in message" :key="item.id">
                                            <td width="68">
                                                <router-link :to="'/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注(100字符以内)" prop="message">
                                                <el-input type="textarea" resize="none" :row="2" v-model="orderForm.message"
                                                    style="width:500px"></el-input>
                                            </el-form-item>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp;
                                            商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label>
                                            元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/cart">返回购物车</router-link>
                                            <a id="btnSubmit" class="btn submit" @click="sureOrder">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script>
    import VDistpicker from 'v-distpicker'
    export default {
        name: 'order',
        components: {
            VDistpicker
        },
        // 在生命周期函数中判断是否有登录 ，但是这个达不到要求 因为运行很快，效果是先加载出来 然后再去登录页面
        // beforeCreate() {
        //     this.$axios.get('/site/account/islogin').then(response => {
        //         // console.log(response);
        //         //   如果没有登陆 打回 登录页
        //         if (response.data.code == 'nologin') {
        //             // 编程式导航
        //             this.$router.push('/login');
        //         }
        //     })
        // }
        methods: {
            // 获取省市联动地址
            selected(val) {
                // console.log(val)
                this.orderForm.area = val;
            },
            // 获取单选框运费
            expressChange(price) {
                this.orderForm.expressMoment = price;
            },
            // 提交订单
            sureOrder(){
                this.$axios.post("site/validate/order/setorder",this.orderForm).then(res=>{
                    // console.log(res);
                    // this.$route.push('/order')
                    // 提交成功获取订单id
                    let orderid= res.data.message.orderid
                    // 跳转到支付页
                    this.$router.push('/payorder/'+orderid);
                    // 循坏message数组 删除之前保存在vuex里面的商品id的信息 也就是更新购物车数量 把购买了的商品清除
                    this.message.forEach(v=>{
                        this.$store.commit('deleteGoods',v.id);
                    })
                })
            }
        },
        // 计算商品总数
        computed: {
            totalCount() {
                let total = 0;
                this.message.forEach(v => {
                    total += v.buycount
                })
                return total
            }
        },
        // 请求得到购买商品数据 渲染
        created() {
            // 从vuex拿到购买商品id
            let id = this.$route.params.ids
            // console.log(id);
            // 获取商品id
            this.orderForm.goodsids = id
            this.$axios.get(`site/validate/order/getgoodslist/${id}`).then(res => {
                // console.log(res);
                // 商品总价
                let total = 0;
                // 商品id 及数量的对象
                let cargoodsobj = {};
                res.data.message.forEach(v => {
                    // 默认从购物车拿到的单个商品数量都为1 
                    // 所以直接去vuex里面 找到之前存储在对应id的数量 重新赋值
                    v.buycount = this.$store.state.cartDate[v.id];
                    // 单个商品总价计算
                    v.totalamount = v.sell_price * v.buycount
                    // 商品总价
                    total += v.totalamount
                    // 添加商品对象
                    cargoodsobj[v.id] = v.buycount;
                });
                this.message = res.data.message
                // 总金额
                this.orderForm.goodsAmount = total;
                // 商品对象
                this.orderForm.cargoodsobj = cargoodsobj;
            })
        },
        data: function () {
            // 自定义检查手机号码
            var checkMobile = (rule, value, callback) => {
                // if (!value) {
                //     return callback(new Error('年龄不能为空'));
                // }
                setTimeout(() => {
                    // if (!Number.isInteger(value)) {
                    //     callback(new Error('请输入数字值'));
                    // } else {
                    //     if (value < 18) {
                    //         callback(new Error('必须年满18岁'));
                    //     } else {
                    //         callback();
                    //     }
                    // }
                    let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                    if (exec.test(value) == true) {
                        callback();
                    } else {
                        callback(new Error('请输入正确的手机号码！'));
                    }
                }, 500);
            };
            // 检查邮箱
            var checkEmail = (rule, value, callback) => {
                setTimeout(() => {
                    // 验证邮箱是否为空 长度不等于0 不为空
                    if (value.trim().length != 0) {

                        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
                        if (exec.test(value) == true) {
                            callback();
                        } else {
                            callback(new Error('请输入正确的邮箱地址！'));
                        }
                    } else {
                        callback();
                    }

                }, 500);
            };
            // 检查邮编
            var checkPostCode = (rule, value, callback) => {
                setTimeout(() => {
                    // 验证邮编是否为空 长度不等于0 不为空
                    if (value.trim().length != 0) {

                        let exec = /^[1-9]\d{5}(?!\d)$/
                        if (exec.test(value) == true) {
                            callback();
                        } else {
                            callback(new Error('请输入正确的邮编！'));
                        }
                    } else {
                        callback();
                    }

                }, 500);
            };
            return {
                // 表单验证内容
                orderForm: {
                    goodsAmount: 0, //商品总价
                    expressMoment: 20, //运费
                    accept_name: '周先生', //姓名
                    address: '华尔街', //地址
                    mobile: '13612992764', //手机号
                    email: 'zhou@qq.com', //邮箱
                    post_code: '413000', //邮编
                    payment_id: '6', //支付方式 6 在线支付
                    express_id: '1', // 快递方式id 默认1 顺丰
                    message: '打包带走', //备注信息
                    goodsids: '', //购买商品id
                    cargoodsobj: {}, //购买商品对象
                    phone: '10086', //联系方式
                    area: { //地址
                        province: {
                            code: '430000',
                            value: '湖南省'
                        },
                        city: {
                            code: '430900',
                            value: '益阳市'
                        },
                        area: {
                            code: '430923',
                            value: '安化县'
                        }
                    },
                },
                // 表单验证规则
                rules: {
                    accept_name: [{
                            required: true,
                            message: '请输入收件人姓名',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 15,
                            message: '长度在 3 到 15 个字符',
                            trigger: 'change'
                        }
                    ],
                    address: [{
                        required: true,
                        message: '请输入地址',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: checkMobile,
                        trigger: "blur"
                    }],
                    email: [{
                        validator: checkEmail,
                        trigger: "blur"
                    }],
                    post_code: [{
                        validator: checkPostCode,
                        trigger: "blur"
                    }],
                },
                message: [],
            }
        }
    }
</script>
<style>

</style>
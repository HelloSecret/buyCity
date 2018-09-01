<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{message.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{message.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{message.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{message.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{message.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{message.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.orderid"
                                        :options="{ foreground: '#0275d8', size: 200 }"></qrcode>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入二维码
    import VueQrcode from '@xkeshi/vue-qrcode';
    // Vue.component(VueQrcode.name, VueQrcode);
    export default {
        name: 'payorder',
        // 引入局部组件
        components: {
            [VueQrcode.name]: VueQrcode
        },
        data: function () {
            return {
                message: []
            }
        },
        // 数据渲染
        created() {
            let id = this.$route.params.orderid
            // console.log(id);
            // 页面渲染请求
            this.$axios.get(`site/validate/order/getorder/${id}`).then(res => {
                // console.log(res);
                this.message = res.data.message[0]
            })
            // 支付请求 轮询方式 开启定时器 等到支付成功就停止
            let timeId = setInterval(() => {
                this.$axios.get(`site/validate/order/getorder/${id}`).then(res => {
                    if (res.data.message[0].status == 2) {
                        // 成功之后提示
                        this.$Message.success('支付成功！')
                        setTimeout(() => {
                            // this.$router.push('/paySuccess') 
                            // 带id跳转商品详情
                            this.$router.push("/paySuccess/"+this.$route.params.orderid);
                            // this.$router.push("/orderList");
                        },500)
                        clearInterval(timeId)
                    }
                })
            }, 1000)
        },
    }
</script>
<style>

</style>
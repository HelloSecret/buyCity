<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
                        <div class="section">
                            <div class="location">
                                <span>当前位置：</span>
                                <router-link to="/index">首页&gt;</router-link>
                                <a href="javascript:;">支付中心</a>
                            </div>
                        </div>
                        <div class="section">
                            <div class="wrapper">
                                <div class="bg-wrap">
                                    <div class="nav-tit pay">
                                        <a href="javascript:;" class="selected">支付中心</a>
                                    </div>
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！</strong><span><span style="color:red;font-size:20px;">{{num}}</span>秒后自动跳转至订单详情</span>
                                            <p>您可以点击这里进入
                                                <router-link to="/vip">会员中心</router-link>查看订单状态！</p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                    </div>
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
    export default {
        name: "paysuccess",
        data: function () {
            return {
                num: 5
            }
        },
        // 支付成功之后开启倒计时 计时完毕跳转订单支付详情页面 并清除定时器
        mounted() {
           let timeId=setInterval(() => {
                this.num--
                if (this.num == 0) {
                    // this.$router.push('/vip');
                    this.$router.push('/orderDetail/'+this.$route.params.id);
                    // this.$router.push('/orderList');
                    clearInterval(timeId);
                }
            }, 1000)
        }
    }
</script>
<style>

</style>
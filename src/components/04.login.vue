<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input v-model.trim="name" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱"
                                maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码"
                                maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" value="立即登录" @click="login">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data: function () {
            return {
                name: 'admin',
                password: '123'
            }
        },
        methods: {
            login() {
                // 加载动画
                this.$Loading.config({
                    color: '#5cb85c',
                    failedColor: '#f0ad4e',
                    height: 10
                });
                // 动画开始
                this.$Loading.start()
                // 非空判断
                if (this.name == '' || this.password == '') {
                    this.$Message.error("账号或密码不能为空")
                    return;
                }
                // 验证账号密码
                this.$axios.post('site/account/login', {
                    user_name: this.name,
                    password: this.password 
                }).then(res => {

                    // console.log(res);
                    // 账号密码无误
                    if (res.data.status == 0) {
                        // 登录成功修改Vuex的登录属性
                        this.$store.commit("changeLoginStatus", true);
                        this.$router.push(this.$store.state.fromPath);
                    }
                    // 结束加载动画
                    this.$Loading.finish();
                }).catch(response => {
                    // 错误动画
                    this.$Loading.error();
                })
            }
        }
    }
</script>
<style>

</style>
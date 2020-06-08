<template>
    <div class="yd-page-login-warp">
        <div class="login-content">
            <div class="header-warp">
                <h3>教务数据管理系统<span>/统一身份认证</span></h3>
            </div>
            <div class="content-warp">
                <div class="clearfix">
                    <div class="warp-left">
                        <img src="../page/layout/img/negative.png">
                    </div>
                    <div class="warp-right">
                        <h4>用户登录</h4>
                        <div class="form-list">
                            <div class="login-input">
                                <!--<div class="tip">错误提示</div>-->
                                <div class="label"><img :src="iconInfo[nameFocus ? 'uActive' :'uNoActive']"></div>
                                <input @blur="nameFocus = false" @focus="nameFocus = true"
                                       class="userName"
                                       placeholder="请输入用户名" type="text" v-model="loginForm.username"/>
                            </div>

                            <div class="login-input">
                                <!--<div class="tip">错误提示</div>-->
                                <div class="label"><img :src="iconInfo[passwordFocus ? 'pActive' :'pNoActive']"></div>
                                <input @blur="passwordFocus = false" @focus="passwordFocus = true"
                                       class="passWord"
                                       placeholder="请输入密码" type="password"
                                       v-model="loginForm.password"/>
                            </div>

                            <div class="login-tip clearfix">
                                <!--<div class="tip">错误提示</div>-->
                                <div class="code">
                                    <input placeholder="输入图形验证码"
                                           @keyup.enter="loginSubmit"
                                           type="text" v-model="loginForm.captcha">
                                </div>
                                <div class="send-code">
                                    <img :src="codeImg" @click="refreshImgCode"/>
                                </div>
                            </div>

                            <div class="login-tip clearfix">
                                <!--<label for="remember">
                                  <input id="remember" name="Fruit" type="checkbox"/>一周内免登入
                                </label>
                                <div class="help"><a href="javaScript:void(0)">忘记密码？</a></div>-->
                            </div>
                            <div class="login-input" style="margin-top: 13px">
                                <button @click="loginSubmit" type="submit">登录</button>
                            </div>
                        </div>
                        <!--快捷登录-->
                        <!--  <ul class="quick-login">
                              <li><a href="##"> <img src="./img/qq-icon.png"><span>QQ登录</span></a></li>
                              <li><a href="##"> <img src="./img/weixin-icon.png"><span>微信登录</span></a></li>
                              <li><a href="##"> <img src="./img/phone-icon.png"><span>手机登录</span></a></li>
                              <li><a href="##"> <img src="./img/email-icon.png"><span>邮箱登录</span></a></li>
                          </ul>-->
                    </div>
                </div>
                <div class="login-notice" style="display: none">
                    <div class="notice-icon"><img src="../page/layout/img/notice.png">公告:</div>
                    <p><a href="##">人在家中坐，锅从天上来,人在家中坐，锅从天上来,人在家中坐，锅从天上来,人在家中坐，锅从天上来，人在家中坐，锅从天上来，人在家中坐，锅从天上来，人在家中坐，锅从天上来人在家中坐，锅从天上来人在家中坐，锅从天上来人在家中坐，锅从天上来</a>
                    </p>
                    <p><a href="##">人在家中坐，锅从天上来</a></p>
                    <p><a href="##">人在家中坐，锅从天上来</a></p>
                </div>
            </div>
            <div class="footer-warp" v-show="isOriginHeight">
                <div class="copyright">
                    <a href="javaScript:void (0)"> Copyright {{copyright}}  All rights reserved.</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import './css/login.less'

    export default {
        name: 'login',
        data () {
            return {
                copyright:setting.copyright,
                loginForm: {
                    username: '',
                    password: '',
                    captcha: '',
                },
                codeImg: setting.remoteHost + '/captcha?num=1',
                nameFocus: false,
                passwordFocus: false,
                iconInfo: {
                    uNoActive: require('./img/user.png'),
                    uActive: require('./img/user-focus.png'),
                    pNoActive: require('./img/password.png'),
                    pActive: require('./img/password-focus.png')
                },
                loginType: null,
                isOriginHeight: false,
                screenHeight: document.documentElement.clientHeight,     // 当前高度
                originHeight: document.documentElement.clientHeight,     //默认高度，用作比较
            }
        },
        mounted () {
            window.onresize = () => {
                return (() => {
                    this.screenHeight = document.documentElement.clientHeight
                })()
            }
        },
        methods: {
            loginSubmit () {
                if (!this.verifyForm()) {
                    return
                }

                this.$POST('/auth', this.loginForm).then(res => {
                    if (res.code === 200) {
                        this.$router.push({name: 'connect', params: {token: res.data.token}})
                    } else {
                        if (this.is_page) {
                            this.$message.error(res.message)
                        } else {
                            alert(res.message)
                        }
                    }
                })

            },

            verifyForm () {
                let txtMap = {
                    username: '用户名',
                    password: '密码',
                    captcha: '验证码',
                }
                let form = this.loginForm
                for (let key in form) {
                    if (form[key].trim() == '') {
                        if (this.is_page) {
                            this.$message.error(`${txtMap[key]}不能为空`)
                        } else {
                            alert(`${txtMap[key]}不能为空`)
                        }
                        return false
                    }
                }
                return true
            },

            refreshImgCode () {
                let num = Math.random()
                this.codeImg = this.codeImg.substring(0, this.codeImg.indexOf('num'))
                this.codeImg += `num=${num}`
            }
        },
        watch: {
            screenHeight (val) {
                if (this.originHeight - val > 60) {    //这里以防万一改了下判断形式，当屏幕高度减少了60px以上时才隐藏footer
                    this.isOriginHeight = false
                } else {
                    this.isOriginHeight = true
                }
            }
        }
    }
</script>

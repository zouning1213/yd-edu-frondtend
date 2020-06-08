<!--废弃的文件 登录跟pc端的使用的是一个登录页面 做了适配功能 这个是手机端新设计的登录页面的 未使用-->
<template>
    <div class="yd-mobile-login-warp">
        <div class="login-content">
            <div class="header-warp">
                <h3>登录</h3>
                <p>教务数据管理系统</p>
            </div>
            <div class="content-warp">
                <div class="form-list">
                    <div class="login-input">
                        <!--<div class="tip">错误提示</div>-->
                        <input @blur="nameFocus = false" @focus="nameFocus = true"
                               class="userName"
                               placeholder="请输入用户名" type="text" v-model="loginForm.username"/>
                    </div>

                    <div class="login-input">
                        <!--<div class="tip">错误提示</div>-->
                        <input @blur="passwordFocus = false" @focus="passwordFocus = true"
                               class="passWord"
                               placeholder="请输入密码" type="password"
                               v-model="loginForm.password"/>
                    </div>

                    <div class="login-input">
                        <!--<div class="tip">错误提示</div>-->
                        <input placeholder="输入图形验证码"
                               @keyup.enter="loginSubmit"
                               type="text" v-model="loginForm.captcha">
                        <div class="send-code">
                            <img :src="codeImg" @click="refreshImgCode"/>
                        </div>
                    </div>

                    <div class="login-input" style="margin-top: 30px">
                        <button @click="loginSubmit" type="submit">登录</button>
                    </div>
                    <van-row class="login-tip">
                        <van-col span="12">
                            <van-checkbox icon-size="14px" v-model="checked"
                                          checked-color="#3262EC" shape="square">七天免登陆
                            </van-checkbox>
                        </van-col>
                        <van-col span="12">
                            <div class="help"><a href="##">忘记密码？</a></div>
                        </van-col>
                    </van-row>
                </div>
                <!--快捷登录-->
                <!--  <ul class="quick-login">
                      <li><a href="##"> <img src="./img/qq-icon.png"><span>QQ登录</span></a></li>
                      <li><a href="##"> <img src="./img/weixin-icon.png"><span>微信登录</span></a></li>
                      <li><a href="##"> <img src="./img/phone-icon.png"><span>手机登录</span></a></li>
                      <li><a href="##"> <img src="./img/email-icon.png"><span>邮箱登录</span></a></li>
                  </ul>-->
                <div class="login-notice" style="display: none">
                    <div class="notice-icon"><img src="./img/notice.png">公告:</div>
                    <p><a href="##">人在家中坐，锅从天上来,人在家中坐，锅从天上来,人在家中坐，锅从天上来,人在家中坐，锅从天上来，人在家中坐，锅从天上来，人在家中坐，锅从天上来，人在家中坐，锅从天上来人在家中坐，锅从天上来人在家中坐，锅从天上来人在家中坐，锅从天上来</a>
                    </p>
                    <p><a href="##">人在家中坐，锅从天上来</a></p>
                    <p><a href="##">人在家中坐，锅从天上来</a></p>
                </div>
            </div>
        </div>
        <div class="footer-warp">
            <div class="copyright">
                <a href="javaScript:void (0)">Copyright {{copyright}}  All rights reserved.</a>
            </div>
        </div>
    </div>
</template>


<script>
    import './css/login.less'

    export default {
        name:'login',
        data() {
            return {
                copyright:setting.copyright,
                loginForm:{
                    username:'',
                    password:'',
                    captcha:'',
                },
                codeImg:setting.remoteHost + '/captcha?num=1',
                nameFocus:false,
                passwordFocus:false,
                iconInfo:{
                    uNoActive:require('./img/user.png'),
                    uActive:require('./img/user-focus.png'),
                    pNoActive:require('./img/password.png'),
                    pActive:require('./img/password-focus.png')
                },
                checked:[]
            }
        },
        created(){
            // console.log(setting.projectName)
        },
        methods:{
            loginSubmit() {
                if (!this.verifyForm()) {
                    return;
                }

                this.$POST('/auth',this.loginForm).then(res => {
                    if (res.code === 200) {
                        // console.log(res.data.token)
                        this.$router.push({name:'connect',params:{token:res.data.token}})
                    } else {
                        this.$toast.fail(res.message);
                    }
                })
            },

            verifyForm() {
                let txtMap = {
                    username:'用户名',
                    password:'密码',
                    captcha:'验证码',
                }
                let form = this.loginForm;
                for (let key in form) {
                    if (form[key].trim() == "") {
                        this.$toast.fail(`${txtMap[key]}不能为空`);
                        return false;
                    }
                }
                return true;
            },

            refreshImgCode() {
                let num = Math.random()
                this.codeImg = this.codeImg.substring(0,this.codeImg.indexOf('num'))

                this.codeImg += `num=${num}`
                // console.log(this.codeImg)
            }
        }
    }
</script>

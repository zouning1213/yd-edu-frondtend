<template>
    <!--退出登录-->
    <div class="yd-common-tip text-center"
         :style="{'marginTop':marginTop +'px'}">
        <img src="./img/logout.png"/>
        <p>你已经成功退出教务系统： 为了保障您的安全退出之后，建议您关闭浏览器。
            <!--  <span @click="custom_close" style="cursor: pointer"></span>--></p>
        <div class="btn-group clearfix">
            <template v-if="is_page">
                <el-button type="primary" round @click="login">重新登录</el-button>
            </template>
            <template v-else>
                <van-button type="primary" size="normal" round @click="login">重新登录</van-button>
            </template>
        </div>
    </div>
</template>

<script>
    import './css/tip.less'

    export default {
        name:"logout",
        data() {
            return {
                marginTop:''
            }
        },
        mounted() {
            let documentHeight = document.documentElement.clientHeight || document.body.clientHeight
            let currentHeight = document.querySelector('.yd-common-tip').clientHeight
            this.marginTop = (documentHeight - currentHeight) / 3
        },
        methods:{
           async login() {
                await this.$JUDGE_LOGIN_TYPE();
                localStorage.setItem(setting.preHost,'/')
            },
            custom_close() {
                window.close();
            }
        }
    }
</script>

<style scoped>
</style>

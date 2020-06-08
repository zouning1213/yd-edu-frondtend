<template>
    <!--权限异常-->
    <div class="yd-common-tip text-center"
         :style="{'marginTop':marginTop +'px'}">
        <img src="./img/permissions-error.png"/>
        <p>当前账户发生权限异常,如果需要继续访问,<span @click="loginOut">请更换账户登录</span></p>
       <!-- <div class="btn-group clearfix">
            <el-button round @click="this.$router.go(-2)">返回上一页</el-button>
        </div>-->
    </div>
</template>

<script>
    import './css/tip.less'
    import auth from '@/services/auth.js'

    export default {
        name:"permissions-error",
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
            loginOut() {
                auth.logout()
                location.href = setting.remoteHost + '/logout'
            },
        }
    }
</script>

<style scoped>
</style>
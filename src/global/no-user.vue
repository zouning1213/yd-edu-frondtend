<template>
    <!--重新登录-->
    <div :style="{'marginTop':marginTop +'px'}"
         class="yd-common-tip text-center">
        <img src="./img/login.png"/>
        <p>当前暂无此用户,请更换账号登录</p>
        <div class="btn-group clearfix">
            <template v-if="is_page">
                <el-button @click="login" round type="primary">重新登录</el-button>
            </template>
            <template v-else>
                <van-button @click="login" round type="primary" size="normal">重新登录</van-button>
            </template>
        </div>
    </div>
</template>

<script>
    import './css/tip.less'

    export default {
        name:'login',
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
        created() {
            //权限异常 需要跳转到cas退出登录地址
            // this.$GET('/casLogout').then(res => {
            //     console.log(res)
            // })
        },
        methods:{
            async login() {
                location.href = setting.remoteHost + '/authc'
                // await this.$JUDGE_LOGIN_TYPE()
            }
        }
    }
</script>

<style scoped lang="less">

</style>

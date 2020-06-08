<template>
    <!--重新登录-->
    <div :style="{'marginTop':marginTop +'px'}"
         class="yd-common-tip text-center">
        <img src="./img/login.png"/>
        <p>当前用户信息失效 请点击下方按钮</p>
        <div class="btn-group clearfix">
            <template v-if="is_page">
                <el-button @click="login" type="primary" round>重新登录</el-button>
            </template>
            <template v-else>
                <van-button @click="login" type="primary" size="normal" round>重新登录</van-button>
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
        methods:{
            async login() {
                await this.$JUDGE_LOGIN_TYPE()
            }
        }
    }
</script>

<style scoped lang="less">

</style>

<template>
    <!--404页面-->
    <div class="yd-common-tip text-center" :style="{'height':'593px','marginTop':marginTop +'px'}">
        <img src="./img/404.png"/>
        <p>对不起,您访问的页面不存在,您可以点击下方的<span>返回上一页</span>或者<span>返回首页</span></p>
        <div class="btn-group clearfix">
            <template v-if="is_page">
                <el-button @click="this.$router.go(-1)" round>返回上一页</el-button>
                <el-button type="primary" round>返回首页</el-button>
            </template>
            <template v-else>
                <van-button @click="this.$router.go(-1)" type="default" size="normal" round>返回上一页</van-button>
                <van-button type="primary" size="normal" round>返回首页</van-button>
            </template>
        </div>
    </div>
</template>

<script>
    import './css/tip.less'

    export default {
        name:"no-find",
        data() {
            return {
                marginTop:''
            }
        },
        mounted() {
            let documentHeight = document.documentElement.clientHeight || document.body.clientHeight
            let currentHeight = document.querySelector('.yd-common-tip').clientHeight
            this.marginTop = (documentHeight - currentHeight) / 4
        },
    }
</script>

<style scoped>

</style>
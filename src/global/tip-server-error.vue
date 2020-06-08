<template>
    <!--服务器异常-->
    <div class="yd-common-tip text-center"
         :style="{'marginTop':marginTop +'px'}">
        <img src="./img/server-error.png"/>
        <p>服务器出现异常,<span>请联系管理员反馈</span></p>
    </div>
</template>

<script>
    import './css/tip.less'

    export default {
        name:"server-error",
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
    }
</script>

<style scoped>
</style>
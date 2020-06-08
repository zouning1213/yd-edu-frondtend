<template>
    <div class="yd-main yd-main-blank" style="top: 0;">
        <div class="width-1200">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    import '../css/common.less'

    export default {
        name:"layout",
        data() {
            return {

            }
        },
        mounted() {
            let userSkin = localStorage.getItem('userSkin') //用户类型皮肤
            if (userSkin) { //有存储的皮肤
                document.getElementById('yd_skin').href = '/static/css/skin/skin-' + userSkin + '.css'
            } else { //默认皮肤
                document.getElementById('yd_skin').href = '/static/css/skin/skin-3262EC.css'
            }
        },
        methods:{}
    }
</script>

<style scoped lang="less">
    .yd-main-blank {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #f2f3f4;
        overflow: auto;
        padding-bottom: 20px;
        .width-1200 {
            width: 1200px;
            margin: 0px auto;
        }
    }
</style>

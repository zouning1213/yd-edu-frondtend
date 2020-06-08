<template>
    <div id="app">
        <router-view class="view"
                     keep-alive
                     transition
                     transition-mode="out-in"
                     v-wechat-title="pageTitle"></router-view>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'
    export default {
        name:'App',
        data() {
            return {}
        },
        mounted() {
            //获取屏幕的高度
            let height = document.documentElement.clientHeight || document.body.clientHeight
            this.$store.commit('setClientHeight',height)
        },
        computed:{
            pageTitle() {
                return this.$route.meta.title + '-' + setting.projectName;
            }
        },
    }
</script>

<style>

</style>

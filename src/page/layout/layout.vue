<template>
    <div>
        <web-head @changeLayout="changeLayout" @changeUserMenu="changeUserMenu"></web-head>
        <div class="yd-main">
            <web-menu v-if="refreshMenu" ref="menu"></web-menu>
            <div :class="{'yd-right-router':true,'main-pl':flag}">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

    import './css/layout.less'
    import '../css/common.less'
    import webHead from './head'
    import webMenu from './menu'
    import auth from '../../services/auth'

    export default {
        name:"layout",
        components:{
            webHead,
            webMenu
        },
        data() {
            return {
                flag:false, //布局结构
                refreshMenu:true
            }
        },
        created(){
        },
        methods:{
            //点击图标收起菜单
            changeLayout() {
                this.flag = !this.flag
                this.$refs.menu.changeFlag()
            },
            changeUserMenu(){
                //刷新组件
                this.refreshMenu = false
                this.$nextTick(()=>{
                    this.refreshMenu = true
                })

                this.$router.push({
                    name: welcome,
                })
            }
        }
    }
</script>

<style scoped>

</style>

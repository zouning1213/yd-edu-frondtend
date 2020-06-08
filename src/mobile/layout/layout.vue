<template>
    <!--手机端布局-->
    <div class="yd-mobile-warp">
        <router-view></router-view>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import '../../page/css/common.less'
    import '../css/layout.less'
    import '../css/common-mbile.less'

    export default {
        name: 'layout',
        components: {
            draggable
        },
        data () {
            return {
                type: this.$store.state.role_id, //用户类型
            }
        },
        created () {

        },
        mounted () {
            let userSkin = localStorage.getItem('userSkin') //用户类型皮肤
            if (userSkin) {
                this.getUserSkin(userSkin)
            } else { //设置默认皮肤
                this.getUserSkin('3262EC')
            }
        },
        methods: {
            getUserSkin (skin) {
                document.getElementById('yd_skin').href = '/static/css/skin/skin-' + skin + '.css'
            },
            setUserSkin (skin) { //设置皮肤
                localStorage.setItem('userSkin', skin)
            },
            changeUserSkin (skin) { //改变皮肤manager-article.
                this.getUserSkin(skin)
                this.setUserSkin(skin)
            },
        }
    }
</script>

<style scoped>

</style>

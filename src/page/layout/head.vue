<template>
    <div class="yd-header clearfix">
        <div class="left-logo">
<!--            <img class="logo bg-skin" src="./img/logo.png"/>-->
            <img class="logo bg-skin" :src="logo"/>
            <!--<h3>教务数据管理系统</h3>-->
        </div>
        <div class="layout-icon header-skin"><i class="yd icon-layout" @click="changeLayout"></i></div>
        <ul class="right-login">
           <!-- <li class="login-notice header-skin">
                <div class="login-icon">
                    <i class="yd icon-notice"></i>
                    <span class="num">2</span>
                </div>
            </li>-->
            <li class="login-user">
                <div class="header-skin">
                    <yd-author :name="this.$store.state.userInfo.name || '教务'" width="30"></yd-author>
                    <p>{{this.$store.state.userInfo.name ||  '教务'}}</p>
                </div>
            </li>
            <!--当有多个角色的时候 可以选择切换角色-->
            <li v-if="userMenu.length > 1" class="login-type">
                <el-dropdown @command="changeUserType">
                    <div class="el-dropdown-link">
                        <div class="login-icon"><i class="yd icon-information"></i></div>
                        <p>角色切換</p>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown" class="login-skin-dropdown">
                        <el-dropdown-item v-for="(item,index) in userMenu" :key="index"
                                          :command="item.role_id">{{item.name}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="login-skin">
                <el-dropdown @command="changeUserSkin">
                    <div class="header-skin">
                        <div class="login-icon"><i class="yd icon-clothes"></i></div>
                        <p>换肤</p>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown" class="login-skin-dropdown">
                        <el-dropdown-item command="3262EC">
                            <label style="background-color:#3262EC"></label>商务蓝
                        </el-dropdown-item>
                        <el-dropdown-item command="0083B5">
                            <label style="background-color:#0083B5"></label>水墨青
                        </el-dropdown-item>
                        <el-dropdown-item command="3E7857">
                            <label style="background-color:#3E7857"></label>大地绿
                        </el-dropdown-item>
                        <el-dropdown-item command="F3652F">
                            <label style="background-color:#F3652F"></label>活力橙
                        </el-dropdown-item>
                        <el-dropdown-item command="8B67FF">
                            <label style="background-color:#8B67FF"></label>妖艳紫
                        </el-dropdown-item>
                        <el-dropdown-item command="FFFFFF">
                            <label style="background-color:#F3F5F9"></label>简洁白
                        </el-dropdown-item>
                        <el-dropdown-item command="0E1319">
                            <label style="background-color:#0E1319"></label>神秘黑
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="login-out header-skin" @click="loginOut">
                <div class="login-icon"><i class="yd icon-out"></i></div>
                <p>退出</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'

    export default {
        name: 'topHeader',
        data () {
            return {
                timer: '',
                role_id: this.$store.state.role_id, //用户类型
                userMenu: [],
                userMenuObject: {},
                logo:''
            }
        },
        created () {
            this.logo= setting.logo
            this.getUserMenu()
            console.log(this.$store.state.role_id)
        },
        mounted () {
            let userSkin = localStorage.getItem('userSkin') //用户类型皮肤
            if (userSkin) {
                this.getUserSkin(userSkin)
            } else { //设置默认皮肤
                this.getUserSkin('3262EC')
            }
        },
        beforeDestroy () {
            clearTimeout(this.timer)
        },
        methods: {
            getUserMenu () {
                this.$GET('/menus').then(res => {
                    if (res.code == 200) {
                        this.userMenu = res.data
                        //转换值类型
                        this.userMenu.forEach(item => {
                            this.userMenuObject[item.role_id] = item.menu
                        })
                    }
                })
            },
            changeUserType (role_id) {
                auth.setItemUserMenu(this.userMenuObject[role_id])
                auth.setItemRole_id(role_id)
                this.$store.commit('setUserMenu', this.userMenuObject[role_id])
                this.$store.commit('setUserRoleId', role_id)

                this.$emit('changeUserMenu')

                localStorage.removeItem('currentMenu') //菜单高亮
            },
            //改变菜单
            changeLayout () {
                this.$emit('changeLayout')
            },
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
            loginOut () {
                auth.logout()
                //跳转到后台退出页面，后台退出之后 跳转到我们 /logout 本地的退出登录页面
                location.href = setting.remoteHost + '/logout'
            },
        },
    }
</script>

<style lang="less">

</style>

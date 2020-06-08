<template>
    <div class="zn-menu">
        <!--原本菜单-->
        <transition name="menu-wrap" mode="out-in" key="1">
            <div class="yd-left-menu" v-show="flag">
                <div class="menu-scroll">
                    <!-- 切换的 -->
                    <ul class="yd-menu-ul">
                        <!-- item.url =='#' ? oneActive == index :oneActive == item.url-->
                        <li v-for="(item,index) in userMenu" :key="index"
                            :class="{'yd-nav-item':true,'yd-this':oneActive == item.code}">
                            <router-link class="yd-nav-bar"
                                         :to="{name : item.url == '#' ? '' : item.url}"
                                         @click.native="openNavChild(item.code,item.pidCode)">
                                <i v-if="item.icon != '' && item.icon != '#'"
                                   :class="['yd-icon','yd', item.icon]"></i>
                                {{item.name}}
                                <i v-if="item.children" class="yd-up el-icon-arrow-down"></i>
                            </router-link>
                            <template v-if="item.children">
                                <el-collapse-transition>
                                    <!-- 二级菜单 -->
                                    <!--twoActive == item2.url-->
                                    <ol class="yd-nav-child" v-show="oneActive== item.code">
                                        <li v-for="(item2,index2) in item.children" :key="index2"
                                            :class="{active: twoActive == item2.code }">
                                            <router-link class="yd-two-bar"
                                                         :to="{name:item2.url == '#' ? '' : item2.url}"
                                                         @click.native="openTwoNavChild(item2.code,item2.pidCode)">
                                                {{item2.name}}
                                                <i v-if="item2.children" class="yd-up el-icon-arrow-down"></i>
                                            </router-link>
                                            <template v-if="item2.children">
                                                <el-collapse-transition>
                                                    <!-- 三级菜单 -->
                                                    <ol class="yd-nav-child"
                                                        v-show="(twoActive == item2.code)">
                                                        <li v-for="(item3,index3) in item2.children" :key="index3"
                                                            @click="threeActive = item3.code"
                                                            :class="{active: threeActive == item3.code}">
                                                            <router-link :to="{name:item3.url}">{{item3.name}}
                                                            </router-link>
                                                        </li>
                                                    </ol>
                                                </el-collapse-transition>
                                            </template>
                                        </li>
                                    </ol>
                                </el-collapse-transition>
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <!-- small菜单 -->
        <transition name="menu-wrap" mode="out-in" key='2'>
            <div class="yd-left-menu small-wrap" v-show="!flag">
                <div class="small-menu-scroll">
                    <ul class="yd-menu-ul">
                        <li v-for="(item,index) in userMenu" :key="index" @mouseenter="openNavChild(item.code)"
                            :class="{'yd-nav-item':true,'yd-this':oneActive == item.code}"
                            style="position: relative;">
                            <!--{{item.url}}{{item.name}}{{item.children}}-->
                            <router-link class="yd-nav-bar"
                                         :to="{name : item.url == '#' ? '' : item.url}"
                                         @click.native="openNavChild(item.code,item.pidCode)">
                                <i v-if="item.icon != '' && item.icon != '#'"
                                   :class="['yd-icon','yd', item.icon]"></i>
                            </router-link>
                            <template v-if="item.children">
                                <div class="menu-box-two bg-skin">
                                    <!-- 二级菜单 -->
                                    <transition name="el-zoom-in-left">
                                        <ol class="yd-nav-child" v-show="oneActive == item.code">
                                            <li v-for="(item2,index2) in item.children" :key="index2"
                                                @mouseenter="openTwoNavChild(item2.code,item2.pidCode)"
                                                :class="{active: twoActive == item2.code,
                                                'yd-nav-bar' : twoActive == item2.code}"
                                                style="position: relative;height:42px">
                                                <router-link class="yd-two-bar"
                                                             :to="{name:item2.url == '#' ? '' : item2.url}"
                                                             @click.native="openTwoNavChild(item2.code,item2.pidCode)">
                                                    {{item2.name}}
                                                    <i v-if="item2.children"
                                                       class="yd-up el-icon-arrow-right"></i>
                                                </router-link>
                                                <template v-if="item2.children">
                                                    <div class="menu-box-two menu-box-three bg-skin">
                                                        <!-- 三级菜单 -->
                                                        <transition name="el-zoom-in-left">
                                                            <ol class="yd-nav-child"
                                                                v-show=" twoActive == item2.code">
                                                                <li v-for="(item3,index3) in item2.children"
                                                                    :key="index3"
                                                                    @click="threeActive = item3.code"
                                                                    @mouseenter="threeActive = item3.code"
                                                                    :class="{active: threeActive == item3.code,
                                                                     'yd-nav-bar' :threeActive == item3.code}"
                                                                    style="height:42px">
                                                                    <router-link :to="{name:item3.url}">
                                                                        {{item3.name}}
                                                                    </router-link>
                                                                </li>
                                                            </ol>
                                                        </transition>
                                                    </div>
                                                </template>
                                            </li>
                                        </ol>
                                    </transition>
                                </div>

                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'
    export default {
        name:"leftMenu",
        data() {
            return {
                userMenu:auth.getItemUserMenu(),
                flag:true,
                isCollapse:false,
                oneActive:0,
                twoActive:'',
                threeActive:null,
            };
        },
        created() {
            //菜单添加字段
            if (this.userMenu){
                this.userMenu.forEach((item,index) => {
                    //给一级菜单添加code
                    item['code'] = 'one' + index
                    if (item.children != '' || item.children.length > 0) {
                        item.children.forEach((item2,index2) => {
                            //给二级菜单添加code
                            item2['pidCode'] = 'one' + index
                            item2['code'] = 'two' + index2
                            if (item2.children != '' || item2.children.length > 0) {
                                //给三级菜单添加code
                                item2.children.forEach((item3,index3) => {
                                    item3['pidCode'] = 'two' + index2
                                    item3['code'] = 'three' + index3
                                })
                            }
                        })
                    }
                })
            } else {
                this.$router.push({
                    name:'server_error'
                })
            }
            //菜单高亮
            if (localStorage.getItem('currentMenu')) {
                let currentMenu = JSON.parse(localStorage.getItem('currentMenu'))
                if (currentMenu) {
                    this.oneActive = currentMenu.oneCode || null
                    this.twoActive = currentMenu.twoCode || null
                    this.threeActive = currentMenu.threeCode || null
                }
            } else {
                this.oneActive = null
            }
        },
        methods:{
            openNavChild(code,pidCode) {
                if (this.oneActive == code) {
                    this.oneActive = null
                } else {
                    this.oneActive = code
                }
                this.twoActive = null
                this.threeActive = null
                this.setMenuCode()
            },
            openTwoNavChild(code,pidCode) { //当当前有路由名称的时候 根据路由名称判断显示下级，如果地址是# 按照索引显示下级
                if (this.twoActive == code) {
                    this.twoActive = null
                } else {
                    this.twoActive = code
                }
                this.threeActive = null
                this.setMenuCode()
            },
            setMenuCode() {
                let menu = {
                    oneCode:this.oneActive,
                    twoCode:this.twoActive,
                    threeCode:this.threeActive
                }
                localStorage.setItem('currentMenu',JSON.stringify(menu))
            },
            changeFlag() {
                this.flag = !this.flag
            },
        }
    }
</script>

<style lang="less">


</style>

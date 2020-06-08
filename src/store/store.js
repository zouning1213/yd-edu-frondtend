/**
 * 使用vuex插件进行全局变量的存储和处理
 * state数组中保存全局变量
 * mutations中保存所有对变量进行处理的方法
 */

import Vuex from 'vuex'
import Vue from 'vue'
import Auth from '../services/auth'

Vue.use(Vuex)

const state = {
    title: '',
    userInfo: Auth.getItemUserInfo(),    // 用户信息
    role_id: Auth.getItemRoleid(), // 菜单类型
    userMenu: Auth.getItemUserMenu(), // 菜单数据
    minClientHeight: 600, //可视区最小高度
}

const mutations = {
    setTitle (state, str) {
        state.title = str// 设置标题
    },
    setUserInfo (state, info) {
        state.userInfo = info
    },
    setUserRoleId (state, id) { //更改角色类型
        state.role_id = id
    },
    setUserMenu (state, data) { //菜单数据
        // console.log(data)
        state.userMenu = data
    },
    setClientHeight (state, height) { //中间内容为白色部分的最小高度
        state.minClientHeight = height
    },
}

export default new Vuex.Store({
    state,
    mutations
})

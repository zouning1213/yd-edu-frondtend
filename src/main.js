// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //js加载顺序是 先router/index.js文件  再main.js文件   再过渡页面connect

import Print from '../src/plugs/print'

Vue.use(Print) // 注册打印
Vue.use(require('vue-wechat-title')) //标题组件
Vue.config.productionTip = false

//图片转pdf下载页面
import htmlToPdf from './plugs/htmlToPdf'

Vue.use(htmlToPdf)
//全局工具类
import utils from './utils/index.js'

Vue.prototype.utils = utils

//封装请求
import {POST_API, GET_API, ALL_API, JUDGE_LOGIN_TYPE} from './services/api.js'

Vue.prototype.$POST = POST_API
Vue.prototype.$GET = GET_API
Vue.prototype.$ALL_API = ALL_API
Vue.prototype.$JUDGE_LOGIN_TYPE = JUDGE_LOGIN_TYPE

//vux存储全局变量
import store from './store/store'

//注册全局自定义指令
import {focus, mobileDrag} from './directive/directive'
//注册全局组件
import GL_Component from './components-global/globalComponents.js'

Vue.use(GL_Component)
//注册全局过滤器
import filters from './filters/index.js'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
//全局图片前缀
Vue.prototype.imageAddress = setting.remoteHost + '/storage/fetch/'
Vue.prototype.remoteHost = setting.remoteHost

import 'babel-polyfill' //解决ie报错

//pc端框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//手机端框架
import Vant from 'vant'
import 'vant/lib/index.css'
import auth from './services/auth'

if (Vue.prototype.is_page) {
    Vue.use(ElementUI, {size: 'medium', zIndex: 20}) //pc端框架
    router.beforeEach(async (to, from, next) => {
        //判断是否为登录
        if (!auth.getItemToken() && !to.meta.roleHost) {
            await JUDGE_LOGIN_TYPE()
        }
        //登录回显  roleHost 标识不回显
        if (to.meta.roleHost) {
            auth.setItemPreHost('/')
            localStorage.removeItem('currentMenu') //菜单高亮
        } else {
            auth.setItemPreHost(to.path)
        }
        next()
    })
} else {
    Vue.use(Vant) //手机端端框架
    router.beforeEach(async (to, from, next) => {
        //判断是否为登录
        if (!localStorage.getItem(setting.userToken) && !to.meta.roleHost) {
            await JUDGE_LOGIN_TYPE()
        }

        //判断进入的是否为教务路由,是就跳转至说明页面
        if (to.path.includes('educational')) {
            next({name: 'no_explanation'})
        }

        // 登录回显  roleHost 标识不回显
        if (to.meta.roleHost) {
            auth.setItemPreHost('/')
            localStorage.removeItem('currentMenu') //菜单高亮
        } else {
            auth.setItemPreHost(to.path)
        }
        next()
    })
}

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})

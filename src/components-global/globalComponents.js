//全局组件
import Vue from 'vue'
//全局
import ydAuthor from './yd-author'  //传递一个名称生成一背景色的头像
//pc
import ydPage from './yd-pagination' //分页
//mobile
import mobilePage from './yd-mobile-pagination'

function plugin() {
    Vue.component('ydAuthor',ydAuthor)

    if (Vue.prototype.is_page) {//pc端
        Vue.component('ydPage',ydPage)
    } else {//手机端
        Vue.component('mobilePage',mobilePage)
    }
}

export default plugin
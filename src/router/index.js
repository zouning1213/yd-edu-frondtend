import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//判断当前的设备 并且赋值给全局
function ISPage() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        Vue.prototype.is_page = false
    } else {
        Vue.prototype.is_page = true
    }
}

ISPage();


let routers = []
import router_mobile from "./routers-mobile"  //手机端路由
import router_pc from "./routers-page" //pc端路由

//判断当前是哪个设备
if (Vue.prototype.is_page) {
    routers = router_pc
} else {
    routers = router_mobile
}
export default new Router({
    mode:'hash',
    routes:routers
})

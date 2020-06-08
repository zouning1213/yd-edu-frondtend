/**
 * http请求预处理，包括request和response拦截器
 * 在登录的情况下，对所有的request请求添加用户认证token
 * 对所有的返回信息进行拦截，发现401错误（未登录或登录验证异常），跳转到登录页面
 */

import axios from 'axios'
import Qs from 'qs'
import Auth from './auth.js'

// axios 配置
axios.defaults.timeout = 60000
//设置跨域请求带上Cookie
axios.defaults.withCredentials = true

axios.defaults.baseURL = setting.remoteHost

// http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = Auth.getItemToken()
        // config.headers.common["Authorization"] = token;

        if (Auth.authenticated()) {
            config.headers.common['Authorization'] = token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        switch (response.status) {
            /* case 404:
                 // 页面未找到
                 router.replace({
                     path:'/404'
                 });
                 break;
             case 500:
                 // 服务器内部错误
                 router.replace({
                     path:'/500'
                 });
                 break;
             case 403:
                 // 权限
                 router.replace({
                     path:'/403'
                 });
                 break; */
        }

        return response
    }
)

axios.defaults.transformRequest = function (data) {
    data = Qs.stringify(data)
    return data
}

export default axios

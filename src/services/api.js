import http from './http.js'
import router from '../router'
import auth from './auth'

const POST_API = function (api,obj,configuration) {
    let promise = new Promise(function (resolve,reject) {
        http.post(api,obj,configuration).then(res => {
            judgeCode(res)
            resolve(res.data)
        })
    })
    return promise
}

const GET_API = function (api,obj,configuration) {
    let promise = new Promise(function (resolve,reject) {
        http.get(api,{params:obj},configuration).then(function (res) {
            judgeCode(res)
            resolve(res.data)
        })
    })
    return promise
}

//多请求
//参数：[{type:"post",api:请求地址,params:请求参数},{type:"get",api:请求地址,params:请求参数,config:{请求头配置}}]
const ALL_API = function (requestArray) {
    let promise = new Promise(function (resolve,reject) {
        let requestArr = httpArr(requestArray)

        http.all(requestArr).then(
            http.spread((...resultArray) => {
                // 多个请求现在都执行完成
                // let result = Array.from(arguments);
                judgeResponse(resultArray)
                resolve(resultArray)
            })
        )
    })
    return promise
}

//多请求数据判断请求失败
function judgeResponse(DataArr) {
    DataArr.forEach(res => {
        judgeCode(res)
    })
}

//判断登录方式   1系统端登录  ---  其他本地登录
function JUDGE_LOGIN_TYPE() {
    // location.href = setting.remoteHost + '/authc'
    return http.get('/loginType').then(res => {
        if (!localStorage.getItem(setting.userToken)) {
            if (res.data.data == 1) {
                location.href = setting.remoteHost + '/authc'
            } else {
                router.push({name:'login'})
            }
        }
    })
}

//判断是否code
async function judgeCode(res) {
    if (res.data.code == 700) {
        auth.logout();
        await JUDGE_LOGIN_TYPE()
        return false
    }
    /* else if (res.data.code == 405) {
            location.href = ''
            this.$route.push({
                    name:'permissions_error'
                }
            )
        } else if (res.data.code == 500) {
            this.$route.push({
                    name:'server_error'
                }
            )
        }*/
}

//多请求api转化为请求
function httpArr(requestArray) {
    let requestArr = []
    requestArray.forEach(item => {
        let params = {params:item.params}
        let request = http[item.type](item.api,params,item.config)
        requestArr.push(request)
    })
    return requestArr
}

export {POST_API,GET_API,ALL_API,JUDGE_LOGIN_TYPE}

// 用户登录验证信息

export default {
  setItemToken (token) {
    localStorage.setItem(setting.userToken, token)
  },
  getItemToken () {
    return localStorage.getItem(setting.userToken)
  },
  setItemUserInfo (UserInfo) {
    localStorage.setItem(setting.userInfo, JSON.stringify(UserInfo))
  },
  getItemUserInfo () {
    if (localStorage.getItem(setting.userInfo)) {
      return JSON.parse(localStorage.getItem(setting.userInfo))
    }
  },
  setItemRole_id (roleId) {
    localStorage.setItem(setting.roleId, roleId)
  },
  getItemRoleid () {
    return localStorage.getItem(setting.roleId)
  },
  setItemUserMenu(userMenu){
    localStorage.setItem(setting.userMenu, JSON.stringify(userMenu))
  },
  getItemUserMenu(){
    return JSON.parse(localStorage.getItem(setting.userMenu)) || []
  },
  setItemPreHost(preHost){
    localStorage.setItem(setting.preHost,preHost)
  },
  getItemPreHost(){
    return localStorage.getItem(setting.preHost)
  },
  authenticated () {
    var t = localStorage.getItem(setting.userToken)
    return t && t.length > 0
  },
  logout () {
    localStorage.removeItem(setting.userToken)
    localStorage.removeItem(setting.userInfo)
    localStorage.removeItem(setting.roleId)
    localStorage.removeItem(setting.preHost)
  }
}

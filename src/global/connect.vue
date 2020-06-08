<template>
  <div>
    <div>
      <!--page端过渡页面-->
      <div
        v-if="is_page"
        class="yd-connect text-center"
        :style="{'marginTop':marginTop +'px'}"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
      >
        <img src="./img/connect.png"/>
        <p>页面正在努力加载中，请稍后</p>
      </div>
      <!--手机端过渡页面-->
      <div v-else class="yd-connect text-center" :style="{'marginTop':marginTop +'px'}">
        <van-loading size="24px">加载中...</van-loading>
      </div>
    </div>
    <!-- 用户选择角色登录 -->
    <div v-if="userMenu.length > 1 && is_page" class="yd-connect-type">
      <div class="type-content">
        <h1>您选择登录的角色是？</h1>
        <P>我们会根据您的选择为您提供精准的服务</P>
        <ul class="type-list clearfix">
          <li
            v-for="(item,index) in userMenu"
            :key="index"
            :class="{'active': role_id == item.role_id}"
          >
            <div v-show="role_id == item.role_id" class="active-icon">
              <i class="el-icon-success"></i>
            </div>
            <el-radio v-model="role_id" :label="item.role_id">备选项</el-radio>
            <div class="clearfix">
              <div class="text fl">
                <h3>{{item.name}}</h3>
                <p>提高教育教学质量</p>
                <!--                                <p >师者,传道、授业、解惑 也</p>-->
                <!--                                <p >自我管理、自我教育</p>-->
                <!--                                <p >教育学生完成学习任务</p>-->
              </div>
              <div class="icon fr">
                <!--<img src="./img/type-edution.png" alt="教务"/>-->
                <img src="./img/type-teacher.png" alt="老师"/>
                <!--<img  src="./img/type-student.png" alt="学生"/>
                <img  src="./img/type-student.png" alt="班主任"/>-->
              </div>
            </div>
          </li>
        </ul>
        <el-button type="primary" @click="submitUser">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '@/services/auth.js'

  export function getUrlKey(name) {
    return (
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
          location.href
        ) || [, ''])[1].replace(/\+/g, '%20')
      ) || null
    )
  }

  export default {
    name: 'connect',
    data() {
      return {
        loading: true,
        marginTop: '',
        role_id: '', //选择的用户类型
        userMenu: [], // 菜单数据
        userMenuObject: {},
      }
    },
    created() {
      let token = getUrlKey('token') || this.$route.params.token
      auth.setItemToken(token) // token 保存到本地存儲

      this.getUserMenu() //获取用户菜单以及用户类型
      this.getUserInfo() //获取用户基本信息
    },
    mounted() {
      let documentHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      let currentHeight = document.querySelector('.yd-connect').clientHeight
      this.marginTop = (documentHeight - currentHeight) / 3
    },
    methods: {
      getUserMenu() {
        this.$GET('/menus').then(res => {
          if (res.code == 200) {
            //菜单数据
            this.userMenu = res.data
            //如果是pc端
            if (this.is_page) {
              this.pcLogin()
            }
            //如果是手机端
            else {
              this.mobileLogin()
            }
          }
        })
      },
      pcLogin() {
        if (this.userMenu.length > 1) { //有角色可供选择
          this.role_id = this.userMenu[0].role_id
        } else { //只有一个角色
          this.role_id = this.userMenu[0].role_id
          //自动选择存储
          this.submitUser()
        }
      },
      mobileLogin() {
        //所有角色放入数组
        let userType = []
        //检查是否有教师角色
        this.userMenu.forEach((menu) => {
          userType.push(menu.userType)
        })
        console.log(userType);
        //判断数组中有些什么角色
        if (userType.includes('teacher')) {
          this.$router.push({name: 'teacher_home'})
          // auth.setItemRole_id('T') //用户选择类型
        } else if (userType.includes('student')) {
          this.$router.push({name: 'students_home'})
          // auth.setItemRole_id('S')
        } else {
          this.$router.push({name: 'no_explanation'})
        }
      },
      getUserInfo() {
        this.$POST('/system/user_info')
          .then(res => {
            if (res.code == 200) {
              auth.setItemUserInfo(res.data)
              this.$store.commit('setUserInfo', res.data) //用户信息存储到vux 里面
            }
          })
      },
      setRouterPath() {
        if (auth.getItemPreHost()) { //有存储
          this.$router.push({
            path: auth.getItemPreHost(),
          })
        } else { //没有存储
          this.$router.push({
            path: '/',
          })
          localStorage.removeItem('currentMenu') //移出本地缓存的菜单
        }
      },
      submitUser() {
        //转换值类型
        this.userMenu.forEach(item => {
          this.userMenuObject[item.role_id] = item.menu
        })
        //存储
        this.$store.commit('setUserRoleId', this.role_id) //用户选择类型
        this.$store.commit('setUserMenu', this.userMenu) //菜单数据存储到vux

        auth.setItemRole_id(this.role_id)
        auth.setItemUserMenu(this.userMenuObject[this.role_id]) //选中的菜单

        this.setRouterPath()
      },
    }
  }
</script>

<style lang="less">
  .el-loading-spinner,
  .el-loading-spinner {
    font-size: 42px;
  }

  .yd-connect {
    text-align: center;
    height: 295px;

    img {
      max-width: 580px;
      margin-bottom: 30px;
    }

    p {
      font-size: 16px;
      color: #ccc;

      span {
        margin: 0 8px;
      }
    }

    .btn-group {
      margin-top: 30px;
      text-align: center;
    }
  }

  .yd-connect-type {
    background-color: #f5f5f5;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 98999;

    .type-content {
      width: 880px;
      height: 340px;
      background-color: #fff;
      border-radius: 16px;
      position: absolute;
      left: 50%;
      top: 30%;
      margin-left: -440px;
      margin-top: -170px;
      padding: 30px;
      box-sizing: border-box;

      h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 14px;
      }

      p {
        font-size: 14px;
        color: #666;
      }

      .type-list {
        margin-right: -20px;
        margin-top: 48px;
        margin-bottom: 40px;

        li {
          width: 31%;
          margin-right: 2%;
          float: left;
          -webkit-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
          -moz-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
          box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
          border-radius: 4px;
          position: relative;
          height: 98px;
          padding: 14px;
          border: 1px solid #fff;

          &.active {
            border: 1px solid #3262ec;

            .active-icon {
              position: absolute;
              top: -8px;
              right: -8px;
              background-color: #ffffff;
              z-index: 99;

              i {
                font-size: 18px;
                color: #3262ec;
              }
            }
          }

          .el-radio {
            cursor: pointer;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin-right: 0;

            .el-radio__input,
            .el-radio__label {
              opacity: 0;
            }
          }

          h3 {
            font-size: 22px;
            color: #333;
            margin-bottom: 8px;
          }

          input[type="radio"] {
            position: absolute;
          }

          img {
            max-width: 66px;
            height: 66px;
          }

          .text,
          .icon {
            vertical-align: top;
          }

          .text {
            float: left;
          }

          .icon {
            float: right;
          }
        }
      }
    }
  }
</style>

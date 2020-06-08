<template>
  <div class="mobile-student-home">
    <div class="home-header-wrap">
      <van-row class="top-fixed">
        <div class="header-left fl">第18教学周</div>
        <div class="header-right fr">
          <!-- <span class="isicon isicon-lingdang">
            <img src="./img/tztb.png" alt="">
          </span> -->
          <span class="isicon isicon-home">
            <img @click="clickhome" src="./img/geren.png" alt="">
          </span>
        </div>
      </van-row>
      <span class="djckbox isicon-home">
        <img src="./img/djck.png" alt="">
      </span>
    </div>
    <div class="home-center-wrap">
      <router-link tag="span" :to="{name:'students_schedule'}" class="center-item bg-one bd-r bd-b">
        <img src="./img/kbcx2x.png" alt="">
        <h4>课表查询</h4>
        <p>查询我的课表</p>
      </router-link>
      <router-link tag="span" :to="{name:'course_elect'}" class="center-item bg-two bd-b">
        <img src="./img/kbcx2x.png" alt="">
        <h4>成绩查询</h4>
        <p>查询考试成绩</p>
      </router-link>
      <router-link tag="span" :to="{name:'evaluation_of_teaching'}" class="center-item bg-three bd-r">
        <img src="./img/kbcx2x.png" alt="">
        <h4>自助评教</h4>
        <p>查看我的评教任务</p>
      </router-link>
      <router-link tag="span" :to="{name:'article_list'}" class="center-item bg-four bd-l-t">
        <img src="./img/kbcx2x.png" alt="">
        <h4>通知公告</h4>
        <p>查看最新通知公告</p>
      </router-link>
    </div>
    <router-link class="home-footer-wrap" tag="div" :to="{name:'students_message_board'}">
      <img src="./img/lyb2x.png" alt="">
    </router-link>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%' }"
      get-container=".mobile-student-home">
      <div class="personal-center">
        <div class="personal-touxiang">
          <img :src="ruleForm.zp" alt="">
        </div>
        <h2>{{ruleForm.name}}</h2>
        <p>学号：{{ruleForm.xh}}</p>
        <div class="message-btn-wrap">
          <router-link :to="{name:'students_info'}">
            <van-button icon="manager-o" class="message-btn" plain hairline round size="large">基本信息</van-button>
          </router-link>
          <router-link  :to="{name:'update_password'}">
            <van-button icon="setting-o" class="edit-btn" plain hairline round size="large">修改密码</van-button>
          </router-link>
          <van-button @click="loginOut" icon="close" class="edit-btn" plain hairline round size="large">退出登录
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import auth from '@/services/auth.js'

  export default {
    name: "pageHome",
    data() {
      return {
        show: false,
        ruleForm: {},
        oneImg: require('./img/kbcx2x.png'),
      }
    },
    created() {
      //请求后台拿到该学生的数据
      this.getUserInfo()
    },
    methods: {
      //请求后台拿到该学生的数据
      getUserInfo() {
        this.$GET("/system/user_info").then((res) => {
          this.ruleForm = res.data;
        })
      },
      loginOut() {
        auth.logout()
        //跳转到后台退出页面，后台退出之后 跳转到我们 /logout 本地的退出登录页面
        location.href = setting.remoteHost + '/logout'
      },
      clickhome() {
        console.log("点击")
        this.show = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .mobile-student-home {
    .home-header-wrap {
      position: relative;
      color: #fff;
      font-size: 17px;
      padding-top: 42px;
      width: 100%;
      height: 296px;
      background-image: url("./img/tbbgt2x.png");
      background-size: cover;

      .top-fixed {
        position: fixed;
        top: 42px;
        width: 100%;
      }

      .isicon {
        display: inline-block;
        width: 23px;
        height: 23px;
        margin-right: 20px;
        cursor: pointer;

        img {
          width: 100%;
        }
      }
    }

    .djckbox {
      position: absolute;
      bottom: 55px;
      left: 19px;
      width: 110px;
      height: 40px;

      img {
        width: 100px;
      }
    }

    .header-left {
      padding-left: 20px;
    }

    .fl {
      float: left;
    }

    .fr {
      float: right;
    }

    .home-center-wrap {
      padding: 20px;

      .center-item {
        box-sizing: border-box;
        background-color: #ccc;
        display: inline-block;
        float: left;
        width: 50%;
        text-align: center;
        padding-top: 10px;

        h4 {
          margin-top: 5px;
          font-size: 15px;
        }

        p {
          font-size: 11px;
          padding: 10px 0;
          color: rgba(191, 191, 191, 1);
        }
      }

      .bg-one {
        background: rgba(249, 253, 255, 1);
      }

      .bg-two {
        background: rgba(252, 250, 255, 1);
      }

      .bg-three {
        background: rgba(253, 250, 238, 1);
      }

      .bg-four {
        background: rgba(241, 252, 239, 1);
      }

      .bd-b {
        border-bottom: 1px solid #fff;
      }

      .bd-r {
        border-right: 1px solid #fff;
      }

      img {
        width: 58px;
        height: 45px;
      }

      .mr-5 {
        margin-right: 5px;
      }

      .mr-5 {
        margin-bottom: 5px;
      }
    }

    .home-footer-wrap {
      clear: both;
      padding: 20px;

      img {
        width: 100%;
      }
    }

    .personal-center {
      width: 250px;
      height: 100%;
      background-color: #2A3561;
      text-align: center;

      .personal-touxiang {
        display: inline-block;
        margin-top: 80px;
        margin-bottom: 50px;
        width: 100px;
        height: 100px;
        border-radius: 50%;

        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-size: cover;
        }
      }

      .message-btn-wrap {
        padding: 0 20px;

        .message-btn {

          color: #fff;
          background-color: #2A3561;
        }

        .edit-btn {
          margin-top: 20px;
          color: #fff;
          background-color: #2A3561;
        }
      }

      h2 {
        color: #fff;
        font-size: 17px;
        line-height: 40px;
      }

      p {
        color: #fff;
        font-size: 14px;
        margin-bottom: 83px;
      }
    }
  }
</style>

<template>
  <!--404页面-->
  <div class="no-explanation-wrapper yd-common-tip text-center" :style="{'height':'593px','marginTop':marginTop +'px'}">
    <img src="./img/404.png"/>
    <p>对不起,教务的手机端并未开发,您可以点击下方的</p>
    <div class="btn-group clearfix">
        <van-button @click="loginOut" block  round color="linear-gradient(to right, #4bb0ff, #6149f6)">更换账号登录</van-button>
    </div>
  </div>
</template>

<script>
  import './css/tip.less'
  import auth from '@/services/auth.js'

  export default {
    name: "no-find",
    data() {
      return {
        marginTop: ''
      }
    },
    mounted() {
      let documentHeight = document.documentElement.clientHeight || document.body.clientHeight
      let currentHeight = document.querySelector('.yd-common-tip').clientHeight
      this.marginTop = (documentHeight - currentHeight) / 4
    },
    methods: {
      loginOut() {
        auth.logout()
        //跳转到后台退出页面，后台退出之后 跳转到我们 /logout 本地的退出登录页面
        location.href = setting.remoteHost + '/logout'
      },
    }
  }
</script>

<style lang="less" scoped>
  .no-explanation-wrapper {
    img {
      width: 250px;
      margin-top: 70px;
    }

    p{
      padding: 0 50px;
    }

    .btn-group{
      padding: 0 50px;
    }
  }
</style>

<template>
  <div class="update-password-box">
    <teacher-head title-name="修改密碼"></teacher-head>
    <van-field v-model="ruleForm.age" placeholder="请输入原始密码"
               name="原始密码" type="password" class="value-item"/>
    <van-field v-model="ruleForm.pass" type="password"
               name="新密码" placeholder="请输入新密码" class="value-item"/>
    <van-field v-model="ruleForm.checkPass" type="password"
               name="再次新密码" placeholder="再次输入新密码" class="value-item"/>
    <div style="margin: 16px;">
      <van-button @click="onSubmit" round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'

  export default {
    name: "updatePassword",
    components: {
      teacherHead
    },
    data() {
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
      };
    },
    methods: {
      checkValue() {
        let {pass, checkPass, age} = this.ruleForm;
        if (!age) {
          return "请填写原始密码";
        }
        if (!pass) {
          return "请填写密码";
        }
        if (!checkPass) {
          return "请再次填写密码"
        }
        if (pass !== checkPass) {
          return "两次密码不一致"
        }
        return false;
      },
      onSubmit(values) {
        let message = this.checkValue();
        if (message) {
          alert(message);
        } else {
          let a = {
            oldPassword: this.ruleForm.age,
            newPassword: this.ruleForm.pass,
          }
          this.$GET("/system/changePwd", a).then((res) => {
            if(res.code == 200){
              alert("修改密码成功")
              setTimeout(() => {
                this.$router.go(-1);//返回上一层
              },1000)
            }else{
              alert(res.message)
            }
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .update-password-box {
    .value-item {
      margin-top: 30px;
      line-height: 30px;

      &::placeholder {
        font-size: 16px;
      }
    }
  }
</style>

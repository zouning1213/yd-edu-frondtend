<template>
  <!--留言板-->
  <div class="edit-message-board">
    <teacher-head title-name="发布留言" menuText="提交" @menuClick="submitMessage"></teacher-head>
    <div class="message-info">
      <textarea class="message-text" v-model="messageContent"></textarea>
    </div>
    <div class="bottom-check">
      <van-checkbox icon-size="14px" checked-color="#3262EC" shape="square"  v-model="isAnonymity" >是否匿名</van-checkbox>
      <span class="tips">您最多可输入100字</span>
    </div>

    <!-- 在页面内添加对应的节点 -->
    <van-toast id="van-toast" />
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'
  export default {
    name: "editMessageBoard",
    components: {
      teacherHead,
    },
    data() {
      return {
        isAnonymity: false,
        messageContent:""
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$emit("tabChanges", this.activeName);
      },
      submitMessage() {
        let nm = this.isAnonymity ? '1' : '';
        let user = JSON.parse(localStorage.getItem("user"))
        let zh = user.account
        // console.log(user)
        let messages = {
          createTime: '',
          createUser: '',
          //关联留言号
          gllyh: 0,
          //留言号
          lyh: '',
          lyxx: this.messageContent,
          //是否匿名
          nm: nm,
          //更改时间
          updateTime: '',
          //更改用户
          updateUser: '',
          //用户类型
          yhlx: '',
          //账号
          zh: zh
        }

        if (messages.lyxx) {
          this.$POST("/message/add", messages).then((res) => {
            // 主要通知
            this.$router.go(-1);
          })
        } else {
          alert('请输入留言信息');
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .edit-message-board {
    .message-info {
      .message-text{
        outline: none;
        border: none;
        width: 100%;
        height: 300px;
        padding: 30px 20px 10px;
      }
    }
    .bottom-check{
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .tips{
        font-size:14px;
        font-weight:400;
        color:#BFBFBF;
        align-self: flex-end;
      }
    }
  }
</style>

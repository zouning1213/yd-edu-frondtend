<template>
  <div class="notification-detail-wrapper">
    <teacher-head title-name="公告详情"/>
    <div class="head-title">
      <p class="title-name">{{detail.title}}</p>
      <div class="bottom-item">
        <label class="people-info">
          <yd-author  :name="detail.createUser" />
          <label class="name-info">
            <span class="name">{{detail.createUser}}</span>
            <span class="time">
              {{detail.createTime}}
            </span>
          </label>
        </label>
        <!--<label class="read-num">阅读量：123</label>-->
      </div>
    </div>
    <div class="notification-detail">
      <p v-html="detail.content"></p>
    </div>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'

  export default {
    name: "notificationDetail",
    components: {teacherHead},
    data() {
      return {
        detail:{}
      }
    },
    created() {
      this.$GET('/notice/detail/' + this.$route.params.id).then((res) => {
        this.detail = res.data
      })
    }
  }
</script>

<style lang="less">
  .notification-detail-wrapper {
    padding: 24px 18px 0;
    .head-title {
      .title-name {
        font-size: 18px;
        font-weight: 500;
        color: rgba(14, 17, 37, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .bottom-item {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        margin-bottom: 20px;
        .people-info {
          display: flex;
          img{
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 6px;
          }
          .name {
            display: block;
            font-size:14px;
            color: #2c2c2c;
            height: 14px;
            font-weight:400;
            line-height: 16px;
            margin-bottom: 5px;
          }
          .time{
            display: flex;
            justify-content: space-between;
            height: 10px;
            font-size:12px;
            font-weight:400;
            color: #BFBFBF;
            line-height:12px;
          }
        }
        .read-num{
          align-self: flex-end;
          font-size:12px;
          font-weight:400;
          color:rgba(191,191,191,1);
        }
      }
    }
  }
</style>

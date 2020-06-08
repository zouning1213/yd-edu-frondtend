<template>
  <div class="notification-detail-wrapper">
    <teacher-head title-name="公告详情"/>
    <div class="head-title">
      <p class="title-name">美国金融犯罪执法网络网络络金融犯罪执法</p>
      <div class="bottom-item">
        <label class="people-info">
          <img src="../../mobile/teacher/img/1.png" alt="">
          <label class="name-info">
            <span class="name">高教授</span>
            <span class="time">
              2020年1月22日
            </span>
          </label>
        </label>
        <label class="read-num">阅读量：123</label>
      </div>
    </div>
    <div class="notification-detail">
      <p v-html="">
        央视网消息（新闻联播）：粤港澳大湾区建设是习近平总书记亲自谋划、亲自部署、亲自推动的重大国家战略，是新时代推动形成我国全面开放
        央视网消息（新闻联播）：粤港澳大湾区建设是习近平总书记亲自谋划、亲自部署、亲自推动的重大国家战略，是新时代推动形成我国全面开放
      </p>
    </div>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'

  export default {
    name: "notificationDetail",
    components: {teacherHead}
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

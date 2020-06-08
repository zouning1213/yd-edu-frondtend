<template>
  <div class="notification-announcement-wrapper">
    <teacher-head title-name="通知公告"/>

    <div class="notification-announcement-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
        <router-link tag="div" :to="{path: '/article/list/detail/'+item.noticeId}" class="notification-item" v-for="(item,index) in tableData"
                     :key="index">
          <div class="head-title">
            <p class="info-des">{{item.title}}</p>
            <div class="bottom-item">
              <label class="name">{{item.createrName}}·{{item.createTime | cutDate}}</label>
              <!--<label class="read-num">230人阅读</label>-->
            </div>
          </div>
          <div class="info-img" v-if="item.imgUrl">
            <img :src="setImgUrl(item.imgUrl)"/>
          </div>
        </router-link>
      </van-list>
    </div>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'

  export default {
    name: "notificationAnnouncement",
    components: {teacherHead},
    data() {
      return {
        tableData: [],
        loading: false,
        finished: false,
        limit:10,
        page:1
      }
    },
    created() {
      this.getData();
    },
    methods: {
      setImgUrl(img){
        return this.remoteHost + '/' + img;
      },
      getData() {
        this.$GET('/notice/list', {limit: this.limit, page: this.page++, px: 'desc', isOpen: "N"}).then((res) => {
          this.tableData.push(...res.data);

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (res.data.length < this.limit) {
            this.finished = true;
          }
        })
      },
      //菜单点击
      menuClick() {
        alert("5555");
      }
    },
    filters:{
      cutDate(time) {
        let date = new Date(time)
        return (date.getMonth() + 1) + "月" + date.getDate() + "日"
      }
    }
  }
</script>

<style lang="less">
  .notification-announcement-wrapper {
    .notification-announcement-list {
      min-height: calc(100% - 44px);
      background: #F6F6F6;
      padding: 16px 0 30px;

      .notification-item {
        display: flex;
        justify-content: space-between;
        background: #fff;
        padding: 20px;
        height: 115px;
        box-sizing: border-box;
        margin-bottom: 7px;

        .head-title {
          width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .info-des {
            color: #0E1125;
            line-height: 20px;
            height: 40px;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .bottom-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 12px;
            color: #BFBFBF;
            font-weight: 400;
          }

        }

        .info-img {
          margin-left: 20px;
          width: 110px;
          height: 75px;
          overflow: hidden;
          border-radius: 5px;
          border: 1px solid #ddd;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>

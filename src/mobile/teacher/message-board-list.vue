<template>
  <div class="message-board-wrapper">
    <teacher-head title-name="留言板"></teacher-head>
    <div class="state-box">
      <ul class="state-list">
        <li class="state-item" @click="activeNameChange('all')" :class="{'active' : activeName == 'all'}">全部</li>
        <li class="state-item" @click="activeNameChange('reply')" :class="{'active' : activeName == 'reply'}">已回复</li>
        <li class="state-item" @click="activeNameChange('unReply')" :class="{'active' : activeName == 'unReply'}">未回复
        </li>
        <li class="state-item" @click="activeNameChange('my')" :class="{'active' : activeName == 'my'}">与我相关</li>
      </ul>
    </div>
    <!--
        <div class="message-list">
          <div class="head-info">

            <div class="message-state">
              <span class="state-item hot active">热门</span>
              <span class="state-item time">按时间</span>
            </div>

        <div class="message-num">
          共{{dataList[activeName].count}}条
        </div>
      </div>
    </div>
 -->
    <div class="message-body" v-for="(dataItem,key) in dataList" :key="key" v-show="key == activeName">
      <van-list v-model="dataItem.loading" :finished="dataItem.finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in dataItem.list" :key="index" class="message-item">
          <div class="head-icon">
            <yd-author :name="item.createrName"></yd-author>
          </div>

          <div class="message-people">
            <div class="people-info">
              <div class="name">{{item.createrName}}</div>
              <div class="time">{{item.createTime}}</div>
            </div>
            <div class="people-text">
              {{item.lyxx}}
            </div>

            <div class="first-reset" v-if="item.hf">
              <label class="name">{{item.hfxm}}：</label>{{item.hf}}
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <router-link tag="div" :to="{name:'edit_message'}" class="send-message">
      <img src="./img/send-message.png" alt="">
    </router-link>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'
  import ydAuthor from "@/components-global/yd-author.vue"
  export default {
    name: "messageBoardList",
    components: {
      teacherHead,ydAuthor
    },
    data() {
      return {
        limit: 10,
        dataList: {
          all: {
            url: "/message/list",
            page: 1,
            loading: false,
            finished: false,
            list: [],
            count: 0
          },
          reply: {
            url: "/message/replyList",
            page: 1,
            loading: false,
            finished: false,
            list: [],
            count: 0
          },
          unReply: {
            url: "/message/unReplyList",
            page: 1,
            loading: false,
            finished: false,
            list: [],
            count: 0
          },
          my: {
            url: "/message/myList",
            page: 1,
            loading: false,
            finished: false,
            list: [],
            count: 0
          }
        },
        activeName: 'all',


      }
    },
    methods: {
      activeNameChange(activeName) {
        this.activeName = activeName;
        if (this.dataList[activeName].page == 1) {
          this.onLoad();
        }
      },
      onLoad() {
        let newDataObj = this.dataList[this.activeName];
        this.$GET(newDataObj.url, {limit: this.limit, page: newDataObj.page++}).then((res) => {
          let data = res.data || [];
          newDataObj.count = res.count;
          newDataObj.list.push(...data);
          // 加载状态结束
          newDataObj.loading = false;

          // 数据全部加载完成
          if (data.length < this.limit) {
            newDataObj.finished = true;
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .message-board-wrapper {
    .state-box {
      height: 48px;

      .state-list {
        position: fixed;
        top: 43px;
        left: 0;
        z-index: 1000;
        width: 100%;
        display: flex;
        background: #fff;
        padding-left: 10px;
        box-shadow: 0px 2px 3px 0px rgba(240, 239, 239, 0.35);

        .state-item {
          padding: 14px 5px;
          margin-right: 16px;
          font-size: 15px;
          font-weight: 400;

          &:first-child {
            padding-left: 10px;
          }

          &.active {
            color: #3262EC;
          }
        }
      }
    }


    .message-list {
      padding: 20px;

      .head-info {
        display: flex;
        justify-content: space-between;

        .message-state {
          font-size: 16px;
          font-weight: 400;

          .state-item {
            position: relative;
            height: 18px;
            font-size: 16px;
            font-weight: 400;
            color: #BFBFBF;
            padding-right: 10px;

            &:last-child {
              padding-left: 10px;

              &:before {
                position: absolute;
                content: "";
                display: inline-block;
                width: 1px;
                height: 18px;
                background: #BFBFBF;
                top: 0;
                left: 0;
              }
            }

            &.active {
              color: #2c2c2c;
            }
          }
        }
      }

      .message-num {
        align-self: flex-end;
        font-size: 12px;
        font-weight: 400;
        color: #CDCDCD;
      }
    }

    .message-body {
      padding: 0 20px;

      .message-item {
        border-bottom: 1px solid #F5F5F5;
        display: flex;
        padding: 20px 20px 20px 0;
        justify-content: space-between;

        .head-icon {
          align-self: flex-start;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;

          img {
            width: 100%;
          }
        }

        .message-people {
          flex: 1;
          width: 0;

          .people-info {
            font-weight: 400;
            margin-bottom: 12px;

            .name {
              font-size: 15px;
              color: #2c2c2c;
              height: 14px;
            }

            .time {
              height: 12px;
              margin-top: 5px;
              font-size: 12px;
              color: #BFBFBF;
            }
          }

          .people-text {
            color: #8A8A8A;
            font-size: 14px;
          }

          .first-reset {
            padding: 14px 10px;
            background: rgba(250, 250, 250, 1);
            border-radius: 5px;
            margin-top: 15px;

            .name {
              color: #3262EC;
            }
          }
        }
      }
    }

    .send-message {
      position: fixed;
      bottom: 38px;
      right: 16px;
      width: 58px;
      height: 58px;

      img {
        width: 100%;
      }
    }
  }
</style>

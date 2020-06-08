<template>
  <div class="select-score-wrapper">
    <teacher-head title-name="成绩查询"></teacher-head>
    <div class="head-filtrate-box">
      <ul class="head-filtrate">
        <li class="item-menu" :class="{'active' : index==0}" v-for="(item,index) in listData">
          {{item}}
        </li>
      </ul>
      <ul class="head-filtrate" style="top: 87px">
        <li class="item-menu" :class="{'active' : index==0}" v-for="(item,index) in testData">
          {{item}}
        </li>
      </ul>
    </div>


    <div class="info-list-box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <router-link tag="div" :to="{name:'select_score_detail'}"  class="info-item" v-for="item in list" :key="item">
          <div class="item-head">
            <span class="icon" :class="['yellow',{'green':item % 3 == 0},{'red':item % 2 == 0}]"><label
              class="class-name">2019级</label></span>
            <label class="class-num">班级人数：20人</label>
          </div>
          <h3 class="item-name">计算机一班</h3>
          <div class="item-des">
            课程名称：计算机基础
          </div>
          <div class="item-des">
            考试名称：计算机学院第一次考试
          </div>
          <div class="item-des">
            <div>所在学期：2018-2019年学期</div>
            <span class="detail-btn">详情</span>
          </div>
        </router-link>
      </van-list>
    </div>
  </div>
</template>

<script>
  import teacherHead from "@/components-mobile/teacher-head.vue";

  export default {
    name: "selectScore",
    components: {
      teacherHead
    },
    data() {
      return {
        listData: ["2018-2019学年上半年", "2018-2019学年下半年", "2019-2020学年上半年", "2019-2020学年下半年", "2020-2021学年上半年"],
        testData: ["第一次考试", "第二次考试", "第三次考试", "第四次考试", "第五次考试", "第六次考试", "第七次考试"],
        list: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }

          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);
      }
    }
  }
</script>

<style scoped lang="less">
  .select-score-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%;

    .head-filtrate-box {
      .head-filtrate {
        padding: 10px 12px;
        overflow-y: hidden;
        overflow-x: auto;
        height: 46px;
        background: #fff;
        z-index: 100;
        white-space: nowrap;
        word-break: keep-all;
        box-shadow: 0px 1px 1px 0px rgba(229, 228, 228, 0.3);

        .item-menu {
          display: inline-block;
          padding: 6px 10px;
          height: 26px;
          line-height: 16px;
          font-size: 13px;

          &.active {
            font-weight: 500;
            background: rgba(50, 98, 236, 0.1);
            border-radius: 13px;
            color: #3262EC;
          }
        }
      }
    }


    .info-list-box {
      height: calc(100% - 136px);
      background: #F6F6F6;
      overflow-x: hidden;
      padding: 10px 20px;
      overflow-y: auto;

      .info-item {
        width: 100%;
        height: 164px;
        margin-bottom: 6px;
        border-radius: 5px;
        background: #fff;
        padding: 20px 16px 20px 13px;

        .item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 16px;

          .icon {
            position: relative;
            width: 56px;
            color: #fff;
            font-size: 12px;
            border-radius: 3px 0 0 3px;

            &.yellow {
              background: #F8C120;
            }

            &.red {
              background: #FE6461;
            }

            &.green {
              background: #46D066;
            }

            &::after {
              content: "";
              position: absolute;
              top: -2px;
              right: -2px;
              width: 0;
              height: 0;
              border-width: 10px;
              border-style: solid;
              border-color: #fff transparent transparent transparent;
              -webkit-transform: rotate(90deg);
              transform: rotate(90deg);
            }

            .class-name {
              display: inline-block;
              padding-left: 4px;
            }
          }

          .class-num {
            font-size: 12px;
            color: #BFBFBF;
          }
        }

        .item-name {
          padding: 14px 0 18px;
          font-size: 16px;
          color: #2C2C2C;
          font-weight: 500;
          height: 48px;
          box-sizing: border-box;
        }

        .item-des {
          position: relative;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #BFBFBF;
          font-weight: 400;
          height: 12px;
          margin-bottom: 12px;

          .detail-btn {
            position: absolute;
            right: 0;
            bottom: -4px;
            display: inline-block;
            width: 64px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            color: #fff;
            background: rgba(50, 98, 236, 1);
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>

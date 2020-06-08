<template>
  <div class="teaching-list-wrapper">
    <teacher-head title-name="评教查看"></teacher-head>
    <div class="teaching-list-box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <router-link :to="{name:'teaching_detail'}" tag="div" class="teaching-item" v-for="item in list" :key="item">
          <div class="item-head">
            <label class="class-num">共3人评教</label>
            <span class="icon" :class="['gray',{'blue':item % 3 == 0},{'red':item % 2 == 0}]">
                <span  v-if="item % 3 == 0 || item % 2 == 0">
                  <label  class="score-num">20</label>分
                </span>
                <label style="font-size: 16px" v-else>暂无</label>
                <span class="text">平均分</span>
            </span>
          </div>
          <h3 class="item-name">2019年12月31日年底评教</h3>
          <div class="item-des">
            <label>该评教全校平均分：80.0分</label>
            <span class="more-detail">查看明细<i class="more-icon"></i></span>
          </div>
        </router-link>
      </van-list>
    </div>
  </div>
</template>

<script>
  import teacherHead from "@/components-mobile/teacher-head.vue";

  export default {
    name: "teachingList",
    components: {
      teacherHead
    },
    data() {
      return {
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

<style lang="less" scoped>
  .teaching-list-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%;

    .teaching-list-box {
      height: calc(100% - 44px);
      background: #F6F6F6;
      overflow-x: hidden;
      padding: 16px 20px;
      overflow-y: auto;

      .teaching-item {
        width: 100%;
        height: 118px;
        margin-bottom: 10px;
        border-radius: 5px;
        background: #fff;
        padding: 22px 16px 20px 14px;

        .item-head {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 10px;
          line-height: 10px;

          .icon {
            position: absolute;
            top: -22px;
            right: 8px;
            width: 48px;
            height: 42px;
            line-height: 42px;
            color: #fff;
            font-size: 12px;
            border-radius: 0 0 2px 2px;
            text-align: center;

            &.gray {
              background: #C1C1C3;
            }

            &.blue {
              background: #3062EE;
            }

            &.red {
              background: #FE6267;
            }


            &::after {
              content: "";
              position: absolute;
              bottom: -1px;
              left: 4%;
              background-color: #fff;
              width: 92%;
              height: 4px;
              border-radius: 2px;
            }

            .score-num {
              display: inline-block;
              padding-left: 4px;
              font-size: 20px;
            }

            .text {
              position: absolute;
              z-index: 55;
              bottom: -26px;
              right: 8px;
              font-size: 10px;
              color: #BFBFBF;
            }
          }


          .class-num {
            font-size: 12px;
            color: #2C2C2C;
          }
        }

        .item-name {
          margin-top: 22px;
          font-size: 16px;
          color: #2C2C2C;
          font-weight: 500;
          height: 16px;
        }

        .item-des {
          position: relative;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #BFBFBF;
          font-weight: 400;
          height: 12px;
          margin-top: 12px;

          .more-detail {
            display: flex;
            align-items: center;

            .more-icon {
              margin-left: 6px;
              display: inline-block;
              width: 6px;
              height: 6px;
              transform: rotate(-135deg);
              border-bottom: 1px solid #C5C5C5;
              border-left: 1px solid #C5C5C5;
            }
          }
        }
      }
    }
  }
</style>

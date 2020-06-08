<template>
  <div class="teaching-detail-wrapper">
    <div class="head-teaching-box">
      <div class="head-bg-detail">
        <div class="teacher-head-box">
          <img class="back-icon" @click="goBack" src="./img/withe-icon.png"/>
          <div class="title-name" style="color:#fff">
            评教详情
          </div>
          <div class="left-menu"></div>
        </div>
      </div>
      <div class="total-statistics">
        <div class="all-average">
          <label class="title">全校平均分</label>
          <label class="score">80.0</label>
        </div>
        <span class="line-center"></span>
        <div class="my-average">
          <label class="title">我的平均分</label>
          <label class="score">60.0</label>
        </div>
      </div>

    </div>
    <ul class="appraise-list-box">
      <li class="appraise-item">
        <h3 class="info-detail">备课充分，讲解认真熟练、准确、认真布置和 批改作业</h3>
        <div class="info-des">
          <label class="all-score">全校平均分：9分</label>
          <label class="my-score">我的平均分：8分</label>
        </div>
      </li>
      <li class="appraise-item">
        <h3 class="info-detail">备课充分，讲解认真熟练、准确、认真布置和 批改作业</h3>
        <div class="info-des">
          <label class="all-score">全校平均分：9分</label>
          <label class="my-score">我的平均分：8分</label>
        </div>
      </li>
      <li class="appraise-item">
        <h3 class="info-detail">备课充分，讲解认真熟练、准确、认真布置和 批改作业</h3>
        <div class="info-des">
          <label class="all-score">全校平均分：9分</label>
          <label class="my-score red">我的平均分：8分</label>
        </div>
      </li>
      <li class="appraise-item">
        <h3 class="info-detail">备课充分，讲解认真熟练、准确、认真布置和 批改作业</h3>
        <div class="info-des">
          <label class="all-score">全校平均分：9分</label>
          <label class="my-score red">我的平均分：8分</label>
        </div>
      </li>
      <li class="opinion-box">
        <h3 class="title">评教意见</h3>
        <ul class="opinion-list">
          <li class="opinion-item opinion">
            <h3 class="info-detail">备课充分，讲解认真熟练、准确、认真布置和 批改作业</h3>
            <div class="info-des">
              <label class="all-score">2020年01月04日</label>
            </div>
          </li>
          <li class="opinion-item opinion">
            <h3 class="info-detail">备课充分，讲解认真熟练、准确、认真布置和 批改作业</h3>
            <div class="info-des">
              <label class="all-score">2020年01月04日</label>
            </div>
          </li>
          <li class="opinion-item opinion">
            <h3 class="info-detail">备课充分，讲解认真熟练、准确、认真布置和 批改作业</h3>
            <div class="info-des">
              <label class="all-score">2020年01月04日</label>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "teachingDetail",
    data(){
      return {

      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
    }
  }
</script>

<style lang="less" scoped>
  .teaching-detail-wrapper {
    .head-teaching-box {
      height: 160px;
      background: #F7F4F8;

      .head-bg-detail {
        position: fixed;
        top: 0px;
        left: 0;
        height: 95px;
        width: 100%;
        background-image: url("./img/teaching-bg.png");
        background-size: cover;

        .teacher-head-box {
          padding: 0 20px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 44px;
          z-index: 99999;

          .back-icon {
            width: 24px;
            height: 24px;
          }

          .title-name {
            flex: 1;
            text-align: center;
            font-size: 18px;
            font-weight: 400;
            color: #fff;
          }

          .left-menu {
            width: 24px;
          }
        }
      }


      .total-statistics {
        position: fixed;
        top: 60px;
        left: 5%;
        background: #fff;
        height: 100px;
        width: 90%;
        box-shadow: 0px 1px 7px 0px rgba(212, 210, 210, 0.3);
        border-radius: 5px;
        z-index: 999991;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .line-center {
          height: 40px;
          width: 1px;
          background: #F2F3FC;
        }

        .all-average, .my-average {
          width: 49%;
          text-align: center;

          .title {
            display: block;
            font-size: 14px;
            height: 14px;
            margin-bottom: 20px;
            font-weight: 400;
            color: #2C2C2C;
          }

          .score {
            font-size: 22px;
            font-weight: 500;
            color: #2C2C2C;
          }
        }
      }
    }

    .appraise-list-box {
      padding: 10px 20px;
      background: #F7F4F8;

      .appraise-item, .opinion-item {
        background: #fff;
        border-radius: 6px;
        padding: 24px 20px 20px 14px;
        margin-bottom: 10px;

        .info-detail {
          line-height: 20px;
          font-size: 15px;
          font-weight: 400;
          color: #2C2C2C;
        }

        .info-des {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;

          .all-score {
            font-size: 14px;
            font-weight: 400;
            color: #CDCDCD;
          }

          .my-score {
            font-size: 14px;
            font-weight: 400;
            color: #3262EC;

            &.red {
              color: #FF6366;
            }
          }
        }

        &.opinion {
          padding: 14px 0px;
          border-bottom: 1px solid #F5F5F5;
          border-radius: 0;
          margin-bottom: 0;

          .info-des {
            margin-top: 8px;
          }
        }
      }

      .opinion-box {
        padding: 20px 0px;
        background: #fff;
        border-radius:6px;

        .title {
          position: relative;
          padding-left: 24px;
          font-size: 15px;
          font-weight: 500;
          color: #2c2c2c;
          margin-bottom: 6px;

          &::before {
            position: absolute;
            left: 15px;
            top: 50%;
            margin-top: -7px;
            content: "";
            display: inline-block;
            width: 4px;
            height: 14px;
            background: #3262EC;
          }

        }

        .opinion-list {
          padding: 0px 14px;
        }
      }
    }
  }
</style>

<template>
  <div class="score-detail-wrapper">
    <div class="head-score-box">
      <div class="head-bg-detail">
        <div class="teacher-head-box">
          <img  @click="goBack" class="back-icon" src="../../mobile/teacher/img/withe-icon.png"/>
          <div class="title-name" style="color:#fff">
            成绩详情
          </div>
          <div></div>
        </div>
        <div class="class-info">
          <label class="class-name">计算机一班</label>
          <label class="test-name">计算机学员院第一次考试</label>
        </div>
        <div class="test-num">共20人</div>
      </div>
    </div>


    <ul class="score-detail-body">
      <li v-for="(item,index) in 20" :key="index" class="detail-item">

        <div class="head-box">
          <!--排名-->
          <div class="title-img" v-if="index < 3">
            <img :src="ranking[index]"/>
          </div>
          <div class="title-num" v-else>
            {{item}}
          </div>
          <!--头像-->
          <img class="head-icon" src="../../mobile/teacher/img/1.png"/>
          <!--学号名称-->
          <div class="student-num">
            <label class="name">王建国</label>
            <label class="num">学号:4200222541454152</label>
          </div>
        </div>

        <!--分数-->
        <div class="score-detail">
          <label class="num">100</label>分
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import teacherHead from "@/components-mobile/teacher-head.vue";

  export default {
    name: "scoreDetails",
    components: {
      teacherHead
    },
    data() {
      return {
        ranking: [require("../../mobile/teacher/img/first.png"), require("../../mobile/teacher/img/second.png"), require("../../mobile/teacher/img/three.png")]
      }
    },
    methods:{
      goBack () {
        this.$router.go(-1);//返回上一层
      }
    }
  }
</script>

<style lang="less" scoped>
  .score-detail-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;

    .head-score-box {
      height: 190px;

      .head-bg-detail {
        position: fixed;
        top: 0px;
        left: 0;
        height: 190px;
        width: 100%;
        background-image: url("../../mobile/teacher/img/score-detail-bg.png");
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
            width: 23px;
            height: 23px;
          }

          .title-name {
            font-size: 18px;
            font-weight: 400;
            color: #fff;
          }
        }

        .class-info {
          margin-top: 40px;
          padding-left: 20px;
          color: #fff;

          .class-name {
            display: block;
            font-weight: 600;
            font-size: 16px;
          }

          .test-name {
            display: block;
            font-size: 14px;
            font-weight: 500;
            margin-top: 10px;
          }
        }

        .test-num {
          position: absolute;
          bottom: 4px;
          color: #fff;
          right: 20px;
        }
      }
    }

    .score-detail-body {
      padding: 15px 20px 20px;
      height: calc(100% - 190px);
      overflow-x: hidden;
      overflow-y: auto;

      .detail-item {
        height: 65px;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .head-box{
          flex: 1;
          display: flex;
          align-items: center;
          .title-img {
            width: 22px;
            height: 22px;

            img {
              width: 100%;
            }
          }

          .title-num {
            display: inline-block;
            width: 22px;
            text-align: center;
            color: #8A8A8A;
            font-size: 14px;
          }

          .head-icon {
            margin:0 20px;
            width: 40px;
            height: 40px;
            overflow: hidden;
            border-radius: 50%;
          }

          .student-num {
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
            .name {
              height: 14px;
              display: block;
              font-weight: 500;
              font-size: 14px;
              color: #2C2C2C;
              margin-bottom: 8px;
            }

            .num {
              height: 10px;
              font-weight: 500;
              font-size: 12px;
              color: #BFBFBF;
            }
          }
        }


        .score-detail{
          width: 56px;
          font-size:14px;
          color: #F8BD09;
          font-weight:400;
          .num{
            font-size: 18px;
          }
        }
      }
    }

  }
</style>

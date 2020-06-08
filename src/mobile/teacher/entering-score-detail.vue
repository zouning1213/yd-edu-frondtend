<template>
  <div class="entering-score-detail-wrapper">
    <div class="head-teaching-box">
      <div class="head-bg-detail">
        <div class="teacher-head-box">
          <img @click="goBack" class="back-icon" src="./img/withe-icon.png"/>
          <div class="title-name" style="color:#fff"> 
            {{wherefrom=='lishi'?'成绩审核结果详情':'录入详情'}}
          </div>
          <div class="left-menu"></div>
        </div>
      </div>
      <div class="total-statistics">
        <div class="test-num">
          <label class="title">考试人数(人)</label>
          <label class="score">{{isxsrs}}</label>
        </div>
        <span class="line-center"></span>
        <div class="post-num">
          <label class="title">及格人数(人)</label>
          <label class="score">{{getJgrs()}}</label>
        </div>
        <span class="line-center"></span>
        <div class="post-num">
          <label class="title">平均成绩(分)</label>
          <label class="score">{{getPjfs()}}</label>
        </div>
      </div>
      <div class="total-statistics total-statistics-zn">
        <van-field :disabled="wherefrom=='kscjlr'" v-model="isksapmc" label="考试名称" placeholder="请输入考试名称"/>
      </div>
    </div>
    <ul class="student-list-box">
      <li v-for="(item,index) in motaiData" :key="index" class="detail-item">

        <div class="head-box">
          <!--头像-->
          <img class="head-icon" src="./img/1.png"/>
          <!--学号名称-->
          <div class="student-num">
            <label class="name">{{item.xm}}</label>
            <label class="num">学号:{{item.xh}}</label>
          </div>
        </div>

        <!--分数-->
        <div class="score-detail">
          <van-field class="score-num"   v-model="item.zhcj"/> 
          <!-- <van-field class="score-num"  extra-key="." clickable v-model="item.zhcj"
                     @touchstart.native.stop="show = true"/>  -->
          <label class="unit">分</label>
          <!-- <van-number-keyboard extra-key="." close-button-text="关闭" v-model="item.zhcj" :show="show" :maxlength="4"
                               @blur="show = false"/> -->

                               
        </div>
      </li>
      <li v-if="wherefrom=='lishi'"  class="detail-item">
          {{isshrz}}
      </li>
    </ul>

    <div class="footer-btn-box" v-show="wherefrom!='lishi'">
      <div class="footer-btn">
        <span v-show="wherefrom!='pscjlr'" class="btn save" @click="submitOneMotaiData('0')">保存草稿</span>
        <span class="btn submit" @click="submitOneMotaiData('1')">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "teachingDetail",
    data() {
      return {
        show: false,
        value: '',
        ranking: [require("./img/first.png"), require("./img/second.png"), require("./img/three.png")],

        motaiOneAlldata:[],
        motaiData:[],
        isxsrs:0,
        wherefrom:'',
        isksapmc:'',
        isshrz:''
      }
    },
    created(){  
      this.wherefrom = this.$route.query.fromwhere
      if(this.$route.query.cjlrh){
        this.$GET('/studentExamScore/listBylr',{cjlrh:this.$route.query.cjlrh}).then((res) => {
            this.motaiOneAlldata = res.data 
            this.motaiData = res.data.examScoreList||[] 
            this.isxsrs = this.motaiOneAlldata.scoreInputInfo.xsrs
            this.isksapmc = this.motaiOneAlldata.scoreInputInfo.ksapmc
            this.isshrz = this.motaiOneAlldata.scoreInputInfo.shrz
        }) 
      }else{
        this.$GET('/scoreInputInfo/teacherCreateInputInfo',{bjid:this.$route.query.bjid,kcid:this.$route.query.kcid,jsid:this.$store.state.userInfo.jsid}).then((res) => {
            this.motaiOneAlldata = res.data 
            this.motaiData = res.data.studentExamScoreList||[] 
            this.isxsrs = this.motaiData.length
            this.isksapmc = this.motaiOneAlldata.scoreInputInfo.ksapmc
        }) 
      }
      
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      }, 
      //第一个模态提交
      submitOneMotaiData(ztm){ 
        if(this.wherefrom=='kscjlr'){
          let isdata = {
              studentExamScoreList:this.motaiData,
              scoreInputInfo:this.motaiOneAlldata.scoreInputInfo
          }  
          if(ztm=='1'){
              isdata.scoreInputInfo.lrztm = '1'
          }
          if(ztm=='0'){
              isdata.scoreInputInfo.lrztm = '0'
          } 
          //请求
          this.$POST("/studentExamScore/updateList",
                      isdata,
                      {
                          transformRequest : function (data) {
                            return JSON.stringify(data);
                          },
                          headers: {'Content-Type': 'application/json'}
                      }
                      ).then((res) => {  
                  this.$router.go(-1) 
          }) 
        }
        if(this.wherefrom=='pscjlr'){  
                let isdata = {
                    ksapmc:this.isksapmc,
                    scoreInputInfo: this.motaiOneAlldata.scoreInputInfo,
                    studentExamScores:this.motaiData
                }
                if(this.isksapmc){
                    //请求
                    this.$POST("/scoreInputInfo/createTeacherInput",
                                isdata,
                                {
                                    transformRequest : function (data) {
                                    return JSON.stringify(data);
                                },
                                    headers: {'Content-Type': 'application/json'}
                                }
                                ).then((res) => {
                              this.$router.go(-1)  
                    }) 
                }else{ 
                  this.$toast('请输入考试名称');
                }
        }
          
      },
      getJgrs(){
        let people = 0;
        this.motaiData.forEach((item,index)=>{
          if(item.zhcj>=60){
            people++
          }
        })
        return people
      },
      getPjfs(){
        let pjf = 0
        let sum = 0
        if(this.motaiData){
          this.motaiData.forEach((item,index)=>{
            sum+=Number(item.zhcj)
          }) 
          pjf = (sum/this.isxsrs).toFixed(1)
        }  
        return pjf
      }
    }
  }
</script>

<style lang="less">
  .entering-score-detail-wrapper {
    background: #F7F4F8;

    .head-teaching-box {
      height: 205px;
      background: #F7F4F8;

      .head-bg-detail {
        position: fixed;
        top: 0px;
        left: 0;
        z-index: 1;
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
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .line-center {
          height: 40px;
          width: 2px;
          background: #F2F3FC;
        }

        .test-num, .post-num {
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
      .total-statistics-zn{
        top: 165px;
        height: 50px;
      }
    }

    .student-list-box {
      background: #fff;
      margin: 15px 20px 20px;
      padding: 0 20px;
      height: calc(100% - 170px);
      box-shadow: 0px 1px 7px 0px rgba(195, 194, 194, 0.35);
      border-radius: 8px;
      overflow-x: hidden;
      overflow-y: auto;

      .detail-item {
        height: 78px;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .head-box {
          flex: 1;
          display: flex;
          align-items: center;

          .head-icon {
            margin-right: 20px;
            width: 54px;
            height: 54px;
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
              margin-bottom: 18px;
            }

            .num {
              height: 10px;
              font-weight: 500;
              font-size: 12px;
              color: #BFBFBF;
            }
          }
        }


        .score-detail {
          display: flex;
          width: 80px;
          font-size: 14px;
          height: 30px;
          color: #2c2c2c;
          margin-top: 16px;
          font-weight: 400;

          .score-num {
            padding: 8px;
            background: #F0F3F8;
            width: 56px;
            border-radius: 3px;

            .van-cell__value {
              overflow: initial;

              input {
                text-align: center;
                font-size: 16px;
                font-weight: 400;
              }
            }

          }

          .unit {
            align-self: flex-end;
            padding-left: 8px;
            color: #BFBFBF;
          }
        }
      }

    }
    .footer-btn-box{
      marrgin-top:14px;
      height: 60px;
      .footer-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 60px;
        background: #fff;
        box-shadow:0px 1px 7px 0px rgba(212,210,210,0.3);
        .btn{
          display: inline-block;
          width: 42%;
          text-align: center;
          line-height: 40px;
          height:40px;
          color: #fff;
          background:rgba(50,98,236,1);
          border-radius:5px;
          margin-left: 15px;

          &.save{
            color: #3262EC;
            margin-left: 0;
            background:#F5F5F7;
          }
        }
      }
    }
  }
</style>

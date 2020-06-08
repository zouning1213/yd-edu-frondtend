<template>
  <div class="entering-score-list-wrapper">
    <teacher-head title-name="历史录入"></teacher-head>
    <!-- <div class="head-filtrate-box">
      <ul class="head-filtrate">
        <li class="item-menu" :class="{'active' : index==0}" v-for="(item,index) in listData">
          {{item}}
        </li>
      </ul> -->
    <!-- </div> --> 
    <div class="selectItems">
        <div class="pd-20">
            <van-tabs type="card" :ellipsis="false" color="#2C2C2C" margin  @click="clickcheckednf">
                <van-tab v-for="(item,index) in xlidOptions" :key="index" :title="item.xlxq" style="border:none">   
                </van-tab>
            </van-tabs>
        </div> 
    </div>


    <div class="entering-score-list-box">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="entering-score-item" v-for="(item,index) in tableData" :key="index">
          <div class="item-head">
            <span class="icon"><label
              class="tag-type">审核完成</label></span>
            <label class="class-num">班级人数：{{item.xsrs}}人</label>
          </div>
          <h3 class="item-name">计算机一班</h3>
          <div class="item-des">
            课程名称：{{item.kcmc}}
          </div>
          <div class="item-des">
            考试名称：{{item.ksapmc}}
          </div>
          <div class="item-des">
            选择学期：{{item.xqmc}}
            <router-link  :to="{name:'entering_score_detail',query:{cjlrh:item.cjlrh,fromwhere:'lishi'}}"> 
              <span class="detail-btn red">
                查看
              </span>
            </router-link>
          </div>
          <div class="item-des">
            <!-- <div>完成时间：2020-01-02 06:00</div> -->
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script> 
  import teacherHead from '@/components-mobile/teacher-head.vue'
    let jsid = JSON.parse(localStorage.getItem("user")).jsid

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
        menuIcon: require("./img/menu-enter-score.png"),
        loading: false,
        finished: false,

        
        tableData:[],
        xlidOptions:[],
        xlid:''
      }
    },
    created(){ 
        //学期下拉框
        this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
            this.xlidOptions = res.data
            this.xlid = this.xlidOptions[0].xlid 
            this.getData() 
        })
    },
    methods: {
      getData(){  
          this.$POST('/scoreInputInfo/historyScoreInput',{jsid:jsid,xlid:this.xlid}).then((res) => {  
            if(res.code==500){ 
              this.tableData = []  
            }else{ 
              this.tableData = res.data||[] 
            }
            this.finished = true;
            this.loading = false;
          })
      },
      clickcheckednf(index,item){ 
          this.xlid = this.xlidOptions[index].xlid 
          // console.log(this.xlid) 
          this.getData()
      },
      onLoad() { 
          
      },
      //菜单点击
      menuClick() {
        alert("5555");
      }
    }
  }
</script>

<style scoped lang="less">
  .entering-score-list-wrapper {
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


    .entering-score-list-box {
      height: calc(100% - 90px);
      background: #F6F6F6;
      overflow-x: hidden;
      padding: 10px 20px;
      overflow-y: auto;

      .entering-score-item {
        width: 100%;
        height: 188px;
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
            width: 60px;
            height: 18px;
            line-height: 18px;
            border-radius: 9px;
            text-align: center;
            color: #fff;
            background: #6173FA;
            font-size: 12px;


            .tag-type {
              display: inline-block;
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
            background: #3262EC;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
<style lang="less">
.entering-score-list-wrapper{ 
    .selectItems{
        .pd-20{
            padding: 10px 0;
        }
        color: #000;
        .van-tabs__line{
            // display: none;
        }
        .van-tab--active{
            background-color: #EAEEFD !important;
            color: #3262EC;
        }
        .van-tab{
            border: none;
            border-radius: 13px;
            padding: 0 10px;
        }
        .van-tabs__nav{
            border: none;
        }
    }
}
</style>

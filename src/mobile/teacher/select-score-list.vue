<template>
  <div class="select-score-wrapper">
    <teacher-head title-name="成绩查询"></teacher-head>
    <div class="head-filtrate-box">
      <ul class="head-filtrate">
        <li class="item-menu" v-for="(item,index) in semesterList" @click="getExamList(item.xlid,item.xlxq)"
            :key="index" :class="{'active' : selectXlid == item.xlid}">
          {{item.xlxq}}
        </li>
      </ul>
    </div>


    <div class="info-list-box" v-if="examList.length > 0">
      <router-link class="info-item" v-for="(item,index) in examList" :key="index"
                   tag="div" :to="{name:'select_score_detail',
                        query:{kcid:dataInfo.kcid,ksapmc:item.ksapmc,bjmc:dataInfo.bjmc,bjid:dataInfo.bjid,ksapid:item.ksapid,xsrs:dataInfo.xsrs}}">
        <div class="item-head">
            <span class="icon red" >
              <label class="class-name">{{dataInfo.bjjs}}级</label>
            </span>
          <label class="class-num">班级人数：{{dataInfo.xsrs}}人</label>
        </div>
        <h3 class="item-name">{{item.ksapmc}}</h3>
        <div class="item-des">
          课程名称：{{dataInfo.kcmc}}
        </div>
        <div class="item-des">
          班级名称：{{dataInfo.bjmc}}
        </div>
        <div class="item-des">
          <div>{{selectXlxq}}</div>
          <span class="detail-btn">详情</span>
        </div>
      </router-link>
    </div>
    <div class="img-box" v-else>
      <img src="./img/no-content.png"/>
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
        selectExamId: 0,
        selectXlid: 0,
        selectXlxq: "",
        semesterList: [],
        examList: [],
        list: [],
        bjid: 0,
        kcid: 0,
        dataInfo: {
          bjid: 0,
          kcid: 0,
          kcmc: "",
          bjmc: "",
          xsrs: 0,
          bjjs: 0
        },
        loading: false,
        finished: false,

      }
    },
    created() {
      Object.assign(this.dataInfo, this.$route.query);
      this.initData();
    },
    methods: {
      initData() {
        this.getSemesterList();
      },
      getSemesterList() {
        //学期查询考试
        this.$GET("/schoolCalendar/decadeCalandar").then(({data}) => {
          this.semesterList = data;
          this.selectXlid = (data[0] || {}).xlid;
          this.getExamList(this.selectXlid);
        })
      },
      getExamList(xlid, xlxq) {
        this.selectXlid = xlid;
        this.selectXlxq = xlxq;
        //学期查询考试
        this.$GET("/examArrange/selectlist/teachersearch",
          {xlid: this.selectXlid, bjid: this.dataInfo.bjid, kcid: this.dataInfo.kcid}).then(({data}) => {
          this.examList = data;
          if (data.length > 0) {
            this.selectExamId = data[0].ksapid;
          }
          //console.log(this.examList);
        })
      },
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
      height: calc(100% - 90px);
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

    .img-box {
      width: 100%;
      text-align: center;

      img {
        margin-top: 100px;
      }
    }
  }
</style>

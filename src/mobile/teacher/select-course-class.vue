<template>
  <div class="select-score-wrapper">
    <teacher-head title-name="成绩查询"></teacher-head>
    <div class="info-list-box" v-if="list.length > 0">
      <div v-for="(item,index) in list" :key="'info' + index" class="info-item">
        <router-link
          :to="{name:'select_score_list',query:{'bjid':item.bjid,'kcid':item.kcid,'kcmc':item.kcmc,'bjmc':item.bjmc,'bjjs':item.bjjs,'xsrs':item.xsrs}}">
          <div class="item-head">
            <!--      :class="getClass(item, (list[index - 1]))"      -->
            <span class="icon red">
              <label class="class-name">{{item.bjjs}}级</label>
            </span>
            <label class="class-num">班级人数：{{item.xsrs}}人</label>
          </div>
          <h3 class="item-name">{{item.bjmc}}</h3>
          <div class="item-des">
            课程名称：{{item.kcmc}}
          </div>
          <div class="item-des">
            课程类别：{{item.kclb}}
          </div>
          <div class="item-des">
            <span class="detail-btn">考试列表</span>
          </div>
        </router-link>
      </div>
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
        list: [],
        loading: false,
        finished: false,
        classMap: ['yellow', 'red', 'green'],
        classIndex: 0
      }
    },
    created() {
      let jsid = JSON.parse(localStorage.getItem("user")).jsid;
      this.getData(jsid);
    },
    methods: {
      //暂时不启用  ， 有bug
      getClass(current, before) {
        if (current.bjjs !== before.bjjs) {
          this.classIndex++;
        }
        if (this.classIndex > 2) {
          this.classIndex = 0;
        }
        return this.classMap[this.classIndex];
      },
      getData(jsid) {
        //学期查询考试
        this.$GET("/teacherLesson/noPagelistByTeacherId", {jsid}).then(({data}) => {
          this.list = data;
        })
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

    .info-list-box {
      height: calc(100% - 44px);
      background: #F6F6F6;
      overflow-x: hidden;
      padding: 10px 20px;
      overflow-y: auto;

      .info-item {
        width: 100%;
        height: 156px;
        margin-bottom: 12px;
        border-radius: 5px;
        background: #fff;
        padding: 14px 16px 20px 13px;

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

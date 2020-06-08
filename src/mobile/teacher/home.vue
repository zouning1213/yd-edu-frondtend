<template>
  <div class="mobile-teacher-home">
    <div class="page-head-box">
      <div class="page-head">
        <label class="left-name">第18教学周</label>

        <div class="right-icon">
          <!-- <router-link :to="{name:'message_notice'}">
            <img src="./img/message.png"/>
          </router-link> -->
          <img style="float:right" @click="clickhome" src="./img/phone.png"/>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="banner-box">
        <img src="./img/banner.png"/>
      </div>
      <div class="about-me">
        <div class="head-title">关于我的</div>
        <ul class="more-module">
          <router-link tag="li" :to="{name:'teacher_schedule'}" class="course-module">
            <div class="course-box">
              <div class="left-text">
                <label class="title blue">课表查询</label>
                <label class="description">查询我的课表</label>
              </div>
              <img src="./img/course.png" class="right-img course">
            </div>
          </router-link>
          <router-link tag="li" :to="{name:'select_score'}" class="score-module">
            <div class="score-box">
              <div class="left-text">
                <label class="title purple">成绩查询</label>
                <label class="description">查询考试成绩</label>
              </div>
              <img src="./img/score.png" class="right-img score">
            </div>
          </router-link>
          <!--<router-link class="teaching-module" tag="li" :to="{name:'teaching_list'}">
            <div class="teaching-box" teaching_list>
              <div class="left-text">
                <label class="title orange">评教查看</label>
                <label class="description">查看我的评价</label>
              </div>
              <img src="./img/teacher.png" class="right-img teaching">
            </div>
          </router-link>-->
          <router-link tag="li" :to="{name:'entering_score_list'}" class="in-score-module">
            <div class="in-score-box">
              <div class="left-text">
                <label class="title green">成绩录入</label>
                <label class="description">录入学生成绩</label>
              </div>
              <img src="./img/in-score.png" class="right-img">
            </div>
          </router-link>
        </ul>
      </div>
      <div class="select-me">
        <div class="head-title">我的查询</div>
        <ul class="more-module">
          <router-link class="notice-module" tag="li" :to="{name:'article_list'}">
            <div class="notice-box">
              <img src="./img/notice.png" class="left-img">
              <div class="right-text">
                <label class="title red">通知公告</label>
                <label class="description">查看系统公告</label>
              </div>
            </div>
          </router-link>
          <router-link class="message-module" tag="li" :to="{name:'message_board_list'}">
            <div class="message-box">
              <img src="./img/message-icon.png" class="left-img">
              <div class="right-text">
                <label class="title blue">留言板</label>
                <label class="description">发布查看留言</label>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%' }"
      get-container=".mobile-teacher-home">
      <div class="personal-center">
        <div class="personal-touxiang">
          <img :src="ruleForm.zp" alt="">
        </div>
        <h2>{{ruleForm.name}}</h2>
        <p>职工号：{{ruleForm.zgh}}</p>
        <div class="message-btn-wrap">
          <router-link :to="{name:'teacher_info'}">
            <van-button icon="manager-o" class="message-btn" plain hairline round size="large">基本信息</van-button>
          </router-link>
          <router-link :to="{name:'update_password'}">
            <van-button icon="setting-o" class="edit-btn" plain hairline round size="large">修改密码</van-button>
          </router-link>
          <van-button @click="loginOut" icon="close" class="edit-btn" plain hairline round size="large">退出登录
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import auth from '@/services/auth.js'

  export default {
    name: "pageHome",
    data() {
      return {
        show: false,
        ruleForm: {}
      }
    },
    created() {

      //请求后台拿到该学生的数据
      this.getUserInfo()
    },
    methods: {
      //请求后台拿到该学生的数据
      getUserInfo() {
        this.$GET("/system/user_info").then((res) => {
          this.ruleForm = res.data;
        })
      },
      loginOut() {
        auth.logout()
        //跳转到后台退出页面，后台退出之后 跳转到我们 /logout 本地的退出登录页面
        location.href = setting.remoteHost + '/logout'
      },
      clickhome() {
        // console.log("点击")
        this.show = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .mobile-teacher-home {

    .page-head-box {
      width: 100%;
      height: 44px;

      .page-head {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        padding: 0px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;

        .left-name {
          flex: 1;
          font-size: 18px;
          color: #2C2C2C;
          font-weight: 400;
        }

        .right-icon {
          width: 25px;
          display: flex;
          justify-content: space-between;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }

    .page-body {
      padding: 16px 20px 0;

      .banner-box {
        border-radius: 2px;
        height: 150px;
        width: 100%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .about-me, .select-me {
        .head-title {
          font-size: 14px;
          font-weight: 400;
          margin-top: 26px;
          margin-bottom: 16px;
        }

        .more-module {
          font-size: 0;

          .course-module, .score-module, .teaching-module, .in-score-module {
            display: inline-block;
            width: 50%;
            height: 98px;
            text-align: center;

            .course-box, .score-box, .teaching-box, .in-score-box {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 30px 12px 24px 5px;

              .left-text {
                font-size: 18px;

                .title {
                  display: block;
                  margin-top: -4px;

                  &.blue {
                    color: #3262EC;
                  }

                  &.purple {
                    color: #5C3FA6;
                  }

                  &.orange {
                    color: #FA7E2C;
                  }

                  &.green {
                    color: #429542;
                  }
                }

                .description {
                  font-size: 12px;
                  color: #BFBFBF;
                }
              }

              .right-img {
                width: 58px;
                height: 45px;

                &.score {
                  width: 54px;
                  height: 51px;
                }

                &.teaching {
                  width: 56px;
                  height: 49px;
                }

                &.in-score {
                  width: 52px;
                  height: 48px;
                }
              }
            }

            .course-box {
              background: #F9FDFF;
            }

            .score-box {
              background: #FCFAFF;
            }

            .teaching-box {
              background: #FDFAEE;
            }

            .in-score-box {
              background: #F1FCEF;
            }
          }

          .notice-module, .message-module {
            display: inline-block;
            width: 50%;
            height: 70px;
            text-align: center;

            .message-box, .notice-box {
              display: flex;
              justify-content: space-between;
              padding: 12px 22px 12px 18px;
            }


            .left-img {
              width: 45px;
              height: 45px;
            }

            .right-text {

              .title {
                display: block;
                font-size: 16px;

                &.red {
                  color: #FF6366;
                }

                &.blue {
                  color: #1F9CFC;
                }
              }

              .description {
                font-size: 12px;
                color: #BFBFBF;
              }
            }
          }
        }
      }
    }

    .personal-center {
      width: 250px;
      height: 100%;
      background-color: #2A3561;
      text-align: center;

      .personal-touxiang {
        display: inline-block;
        margin-top: 80px;
        margin-bottom: 50px;
        width: 100px;
        height: 100px;
        border-radius: 50%;

        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-size: cover;
        }
      }

      .message-btn-wrap {
        padding: 0 20px;

        .message-btn {
          color: #fff;
          background-color: #2A3561;
        }

        .edit-btn {
          margin-top: 20px;
          color: #fff;
          background-color: #2A3561;
        }
      }

      h2 {
        color: #fff;
        font-size: 17px;
        line-height: 40px;
      }

      p {
        color: #fff;
        font-size: 14px;
        margin-bottom: 83px;
      }
    }
  }
</style>

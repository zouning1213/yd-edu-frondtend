<template>
  <div class="teacher-head-wrapper">
    <div class="teacher-head-box" :style="{'background-color':bgColor}">
      <div class="left-back">
        <img @click="goBack" class="back-icon" :src="themeMap[titleTheme].icon"/>
      </div>

      <div class="title-name" :style="{'color':themeMap[titleTheme].color}">
        {{titleName}}
      </div>
      <div class="left-menu" @click="menuClick">
        <img :src="menuIcon" v-if="menuIcon"/>
        <span v-if="menuText">{{menuText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'teacherHead',
    props: {
      menuText: {
        default: ""
      },
      menuIcon: {
        default: ""
      },
      titleTheme: {
        default: 'black'
      },
      titleName: {
        default: '',
        type: String
      },
      bgColor: {
        default: '#FFF'
      }
    },
    data() {
      return {
        themeMap: {
          black: {
            color: '#2c2c2c',
            icon: require('./img/back-icon.png')
          },
          withe: {
            color: '#fff',
            icon: require('./img/withe-icon.png'),

          }
        }
      }
    },
    methods: {
      menuClick() {
        this.$emit('menuClick')
      },
      goBack() {
        this.$router.go(-1);//返回上一层
      }
    }
  }
</script>

<style lang="less" scoped>
  .teacher-head-wrapper {
    height: 44px;

    .teacher-head-box {
      position: fixed;
      top: 0;
      left: 0;
      padding: 0 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      z-index: 99999;
      box-shadow: 0px 1px 7px 0px rgba(229, 228, 228, 0.3);

      .left-back {
        text-align: left;
        width: 40px;

        .back-icon {
          width: 24px;
          height: 24px;
        }
      }

      .title-name {
        font-size: 18px;
        font-weight: 400;
      }

      .left-menu {
        width: 40px;
        text-align: right;

        img {
          width: 22px;
          height: 22px;
        }

        span {
          font-size: 18px;
          font-weight: 400;
        }
      }
    }
  }
</style>

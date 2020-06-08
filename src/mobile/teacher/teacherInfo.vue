<template>
  <div class="teacher-info-wrapper">
    <teacher-head title-name="基本信息"></teacher-head>
    <div class="bg-box"></div>
    <div class="teacher-info-content">
        <h2>基本信息</h2>
        <p><span class="item-list">职工号</span>{{ruleForm.zgh}}</p>
        <p><span class="item-list">姓名</span>{{ruleForm.name}}</p>
        <p><span class="item-list">姓名拼音</span>{{ruleForm.xmpy}}</p>
        <p><span class="item-list">曾用名</span>{{ruleForm.cym}}</p>
        <p><span class="item-list">民族</span>{{ruleForm.mz}}</p>
        <p><span class="item-list">籍贯</span>{{ruleForm.jgm}}</p>
        <p><span class="item-list">出生日期</span>{{ruleForm.csrq}}</p>
        <p><span class="item-list">身份证号</span>{{ruleForm.sfzh}}</p>
        <p><span class="item-list">政治面貌</span>{{ruleForm.zzmm}}</p>
        <p><span class="item-list">婚姻状态</span>{{ruleForm.hyzk}}</p>
        <p><span class="item-list">健康状态</span>{{ruleForm.jkzk}}</p>
        <p><span class="item-list">血型</span>{{ruleForm.xx}}</p>
        <p><span class="item-list">专业</span>{{ruleForm.zymc}}</p>
        <p><span class="item-list">教研组</span>{{ruleForm.ksmc}}</p> 
        
        <router-link :to="{name:'teacher_info_edit',params:{jsid:ruleForm.jsid}}">
          <van-button style="margin-top:30px;" type="primary" size="large" :round='true'>修改</van-button>
        </router-link>
    </div>
  </div>
</template>

<script>
  import {regionData,CodeToText,provinceAndCityData} from 'element-china-area-data'
  import teacherHead from '@/components-mobile/teacher-head.vue'

  export default {
    name: "teacherInfo",
    components: {
      teacherHead
    },
    data() {
      return { 
          ruleForm:{},
      }
    },
    created() {
        //资料完成度
        this.getUserInfo();
    },
    methods: { 
      //请求后台拿到该学生的数据
      getUserInfo() {
          this.$GET("/system/user_info").then((res) => { 
              this.ruleForm = res.data;
              this.ruleForm.znjgm = this.ruleForm.jgm?(JSON.parse(this.ruleForm.jgm || "")) : ''  
              this.ruleForm.jgm =this.ruleForm.znjgm? (CodeToText[this.ruleForm.znjgm[0]] + CodeToText[this.ruleForm.znjgm[1]]) : ''  
          })
      },
    }
  }
</script>

<style scoped lang="less">
  .teacher-info-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%; 
    .bg-box{
        height: 20px;
        background-color: #F6F6F6;
    }
    .teacher-info-content{
        overflow-x: hidden; 
        overflow-y: auto;
        height: calc(100% - 90px);  
        padding: 20px;
        h2{
            display: inline-block;
            padding-left: 10px;
            border-left: 3px solid #3262EC;
            font-size: 15px;
            font-weight: 700;
        }
        .item-list{
            display: inline-block;
            width: 65px;
            line-height: 35px;
            text-align: right;
            margin-right: 15px;
            color: #BFBFBF;
        }
    }
  }
</style>

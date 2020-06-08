<template>
  <div class="teacher-info-edit-wrapper">
    <teacher-head title-name="基本信息"></teacher-head>
    <div class="bg-box"></div>
    <div class="teacher-info-content">
      <div class="touxiang-wrap">
        <van-field v-model="form.text" label="头像" />
        <van-image class="touxiang-content" width="25" height="25" round :src="ruleForm.zp" />
      </div>

        <van-field v-model="ruleForm.zgh" label="职工号"  placeholder='请输入职工号' disabled/>
        <van-field v-model="ruleForm.name" label="姓名" placeholder='请输入姓名' />
        <van-field v-model="ruleForm.xmpy" label="姓名拼音" placeholder='请输入姓名拼音' />
        <van-field v-model="ruleForm.cym" label="曾用名" placeholder='请输入曾用名'/>
        <!-- <van-field v-model="form.text" label="性别" placeholder='请选择性别' />   -->
        <van-field-select-picker
              v-if="xbflag"
              label="性别"
              placeholder="请选择"
              v-model="ruleForm.xb"
              :columns="xbOption"
              :selectValue="ruleForm.xb"
              @SelectdChange ="SelectdChangexb"
            />
        <!-- <van-field v-model="ruleForm.mz" label="民族" placeholder='请选择民族' />  -->
        <van-field-select-picker
              v-if="mzflag"
              label="民族"
              placeholder="请选择"
              v-model="ruleForm.mz"
              :columns="mzmOptions"
              :selectValue="ruleForm.mz"
              @SelectdChange ="SelectdChangemz"
            />
        <!-- <van-field v-model="ruleForm.jgm" label="籍贯" placeholder='请选择籍贯' disabled /> -->
        <!-- <van-field v-model="ruleForm.zymc" label="专业" placeholder='请选择专业' /> zyOptions -->
        <van-field-select-picker
              v-if="zyflag"
              label="专业"
              placeholder="请选择"
              v-model="ruleForm.zymc"
              :columns="zyOptions"
              :selectValue="ruleForm.zymc"
              @SelectdChange ="SelectdChangezymc"
            />
        <van-field v-model="ruleForm.csrq" label="出生日期" placeholder='请选择出生日期' @click="srshow = !srshow" />
        <van-popup v-model="srshow" position="bottom">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              @confirm="confirmCsrq"
              @cancel='cancelCsrq'
              :formatter="formatter"
            />
        </van-popup>
        <van-field v-model="ruleForm.sfzh" label="身份证号码" placeholder='请输入身份证号码' />
        <!-- <van-field v-model="ruleForm.hyzk" label="婚姻状态" placeholder='请选择婚姻状态' /> hyzkmOptions -->
        <van-field-select-picker
              v-if="hyzkflag"
              label="婚姻状态"
              placeholder="请选择"
              v-model="ruleForm.hyzk"
              :columns="hyzkmOptions"
              :selectValue="ruleForm.hyzk"
              @SelectdChange ="SelectdChangehyzk"
            />
        <!-- <van-field v-model="ruleForm.jkzk" label="健康状态" placeholder='请选择健康状态' />  -->
        <van-field-select-picker
              v-if="jkztflag"
              label="健康状态"
              placeholder="请选择"
              v-model="ruleForm.jkzk"
              :columns="jkzkOptions"
              :selectValue="ruleForm.jkzk"
              @SelectdChange ="SelectdChangejkzk"
            />
        <!-- <van-field v-model="ruleForm.ksmc" label="所在教研组" placeholder='请选择所在教研组' />  -->
        <div class="pd-20">
          <van-button style="margin-top:30px;" type="primary" size="large" :round='true' @click="subitEditInfo">提交</van-button>
        </div>

    </div>
  </div>
</template>

<script>
  import auth from '@/services/auth.js'
  import teacherHead from '@/components-mobile/teacher-head.vue'
  import VanFieldSelectPicker from './components/VanFieldSelectPicker'
  import {regionData,CodeToText,provinceAndCityData} from 'element-china-area-data'
  export default {
    name: "teacherInfoEdit",
    components: {
      teacherHead,
      VanFieldSelectPicker
    },
    data() {
      return {
        ruleForm:{},
        form:{
          text:''
        },
        srshow:false,
        value1: '男',
        xbOption: [
          { text: '男', value: '1' },
          { text: '女', value: '2' }
        ],
        mzmOptions:[],
        jkzkOptions:[],
        zyOptions:[],
        hyzkmOptions:[],
        ksOptions:[],

        currentDate: new Date(),
        xbflag:true,
        mzflag:true,
        zyflag:true,
        hyzkflag:true,
        jkztflag:true,
      }
    },
    created(){
      this.getUserInfo()
      //民族
      this.$POST("/system/dictList/MZM").then(res => {
          let a = []
          res.forEach((item,index)=>{
            a.push({
              text:item.name,
              value:item.code
            })
          })
          // console.log(a)
          this.mzmOptions = a
      })
      //初始化婚姻状况下拉框
      this.$GET("/system/dictList/hyzkm").then((res) => {
          let a = []
            res.forEach((item,index)=>{
              a.push({
                text:item.name,
                value:item.code
              })
            })
            // console.log(a)
          this.hyzkmOptions = a
      })
      //初始健康状态吗下拉框
      this.$GET("/system/dictList/JKZKM").then((res) => {
          let a = []
            res.forEach((item,index)=>{
              a.push({
                text:item.name,
                value:item.code
              })
            })
            // console.log(a)
            this.jkzkOptions = a
      })
      //专业下拉框
      this.$GET("/majorInfo/selectList").then((res) => {
        let a = []
            res.data.forEach((item,index)=>{
              a.push({
                text:item.zymc,
                value:item.zyid
              })
            })
            // console.log(a)
        this.zyOptions = a
      })
    },
    methods: {
      //所在教研组有点问题
      getKsOptions() {
          let params = {
              limit:999999,
              page:1,
              yxid:this.ruleForm.yxid || ''
          }
          this.$GET('/departmentInfo/queryDepartmentInfoByYXBM',params).then(res => {
              if (res.code == 200) {
                  let a = []
                      res.data.forEach((item,index)=>{
                        a.push({
                          text:item.ksmc,
                          value:item.ksid
                        })
                      })
                      // console.log(a)
                  this.ksOptions = a
              }
          })
      },
      //性别改变
      SelectdChangexb(value){
        this.ruleForm.xb = value.text
        this.ruleForm.xbm = value.value 
        this.xbflag = false
        this.$nextTick(()=>{
          this.xbflag = true
        }) 

      },
      //民族改变
      SelectdChangemz(value){
        this.ruleForm.mz = value.text
        this.ruleForm.mzm = value.value
        this.mzflag = false
        this.$nextTick(()=>{
          this.mzflag = true
        }) 
      },
      //健康状态改变
      SelectdChangejkzk(value){
        this.ruleForm.jkzk = value.text
        this.ruleForm.jkzkm = value.value
        this.jkztflag = false
        this.$nextTick(()=>{
          this.jkztflag = true
        }) 
      },
      //专业改变
      SelectdChangezymc(value){ 
        this.ruleForm.zymc = value.text
        this.ruleForm.zyid = value.value
        this.zyflag = false
        this.$nextTick(()=>{
          this.zyflag = true
        }) 
      },
      //婚姻状态改变
      SelectdChangehyzk(value){
        this.ruleForm.hyzk = value.text
        this.ruleForm.hyzkm = value.value
        this.hyzkflag = false
        this.$nextTick(()=>{
          this.hyzkflag = true
        }) 
      },
      //请求后台拿到该学生的数据
      getUserInfo() {
          this.$GET("/system/user_info").then((res) => {
              this.ruleForm = res.data; 
              // this.ruleForm.znjgm = (JSON.parse(this.ruleForm.jgm || "")) || ''
              this.ruleForm.znjgm = this.ruleForm.jgm?(JSON.parse(this.ruleForm.jgm || "")) : ''
              // this.ruleForm.jgm = (CodeToText[this.ruleForm.znjgm[0]] + CodeToText[this.ruleForm.znjgm[1]]) || ''
              this.ruleForm.jgm =this.ruleForm.znjgm? (CodeToText[this.ruleForm.znjgm[0]] + CodeToText[this.ruleForm.znjgm[1]]) : '' 
          })
      },
      //格式化日期
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        } else if(type === 'day'){
          return `${val}日`;
        }
        return val;
      },
      //日期确定按钮
      confirmCsrq(value){
        value = this.cutOutDate(value)
        this.ruleForm.csrq = value
        this.srshow = false
      },
      //日期取消
      cancelCsrq(value){
        this.srshow = false
      },
      //返回年月日格式
      cutOutDate(time){
          let date = new Date(time)
          return date.getFullYear() + "年" + fill(date.getMonth() + 1) + "月" + fill(date.getDate()) + "日"
          //填补0
          function fill(num) {
              if (num < 10) {
                  return "0" + num;
              } else {
                  return num;
              }
          }
      },
      //提交修改
      subitEditInfo(){
        this.ruleForm.jgm = this.ruleForm.znjgm? JSON.stringify((this.ruleForm.znjgm)):''
        console.log(this.ruleForm)
        this.$POST('/teacherInfo/update',this.ruleForm).then((res) => {
            if (res.code == 200) {
                 console.log("修改成功")
                 this.getUserInfo()
                 this.$router.go(-1)
                //更新vuex 里面的用户信息
                this.$POST('/system/user_info').then((res) => {
                    if (res.code == 200) {
                        auth.setItemUserInfo(res.data);
                        this.$store.commit("setUserInfo",res.data);
                    }
                })
            } else {
                 console.log("修改失败,请重新修改")
            }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .teacher-info-edit-wrapper {
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
    }
    .pd-20{
      padding: 20px;
    }
    .touxiang-wrap{
      position: relative;
      .touxiang-content{
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
</style>
<style lang="less">
  .teacher-info-edit-wrapper {
    .van-field__control{
      line-height: 24px;
      text-align: right;
    }
    .van-field__label{
      color: #BFBFBF;
    }
  }
</style>

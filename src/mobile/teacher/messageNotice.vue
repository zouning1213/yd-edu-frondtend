<template>
<div>
  
  <div class="message-notice-wrapper">
    <teacher-head title-name="消息通知" :menuIcon='icom' @menuClick="menuClick"></teacher-head>
    <div class="bg-box"></div>
    <div class="teacher-info-content">  
        <div class="content-item"> 
            <div>
                <div class="touxiang">
                    <div class="dian"></div>
                    <img src="./img/1.png" alt="">
                </div>
                <div class="content">
                    <h1>系统消息 <span>12:04</span></h1>
                    <p class="line-1">2020年计算机学院计算机专业关于元旦的放假通知</p>
                </div>
            </div> 
        </div>   
        <div class="content-item"> 
            <div>
                <div class="touxiang">
                    <div class="dian"></div>
                    <img src="./img/1.png" alt="">
                </div>
                <div class="content">
                    <h1>系统消息 <span>12:04</span></h1>
                    <p class="line-1">2020年计算机学院计算机专业关于元旦的放假通知</p>
                </div>
            </div> 
        </div>   
        <div class="content-item"> 
            <div>
                <div class="touxiang">
                    <div class="dian"></div>
                    <img src="./img/1.png" alt="">
                </div>
                <div class="content">
                    <h1>系统消息 <span>12:04</span></h1>
                    <p class="line-1">2020年计算机学院计算机专业关于元旦的放假通知</p>
                </div>
            </div> 
        </div>   
        <div class="content-item"> 
            <div>
                <div class="touxiang">
                    <div class="dian"></div>
                    <img src="./img/1.png" alt="">
                </div>
                <div class="content">
                    <h1>系统消息 <span>12:04</span></h1>
                    <p class="line-1">2020年计算机学院计算机专业关于元旦的放假通知</p>
                </div>
            </div> 
        </div>             
    </div> 
  </div>
  <div class="isDialog" v-show="show">
    <div class="biaojibox">
        <div class="jianjian"></div>
        <div @click="motaiClose">
            <img :src="readAll" alt="">
            <span>全部已读</span> 
        </div>
        <div class="bd-1"></div>
        <div @click="motaiClose">
            <img :src="clearAll" alt="">
            <span>清空消息</span> 
        </div>
    </div>
  </div>
</div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'

  export default {
    name: "messageNotice",
    components: {
      teacherHead
    },
    data() {
      return { 
        form:{
          text:''
        },
        icom:require("./img/xiaoxiguanli.png"),
        readAll:require("./img/readAllMessage.png"),
        clearAll:require("./img/clearMessage.png"),
        show: false
      }
    },
    methods: { 
      menuClick(){ 
        this.show = true
      },
      motaiClose(){
        this.show = false 
      }
    }
  }
</script>

<style scoped lang="less">
  .isDialog{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%; 
    background-color: rgba(0,0,0,.4);;
    z-index: 5; 
    .biaojibox{
      position: absolute;
      right: 10px;
      top: 45px;
      width: 137px;
      height: 112px;
      background-color: #fff;
      border-radius:6px;
      padding: 20px;
      .jianjian{
        position: absolute;
        right: 10px;
        top: -18px;
        width: 0;
        height: 0;
        border-top: 9px solid rgba(0,0,0,0);;
        border-left: 9px solid rgba(0,0,0,0);;
        border-right: 9px solid rgba(0,0,0,0);;
        border-bottom: 9px solid #fff;
      }
      span{
        // line-height: 17px;
      }
      img{
        width: 17px; 
        vertical-align: text-top;
      }  
      .bd-1{
        margin: 18px 0;
        border-bottom: 1px solid rgba(219,219,219,1);;
      }
    }
  }
  .message-notice-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%; 
    .bg-box{
        height: 3px;
        opacity: .1;
        background-color: #F6F6F6;
    }
    .teacher-info-content{
        overflow-x: hidden; 
        overflow-y: auto;
        height: calc(100% - 90px);    
        padding: 10px;
        
        .content-item{
            position: relative;
            margin-top: 10px;  
            padding: 14px 0; 
            border-bottom: 1px solid #FAFAFA;
            .touxiang{
                position: relative;
                float: left;
                width: 40px;
                height: 40px;
                margin-right: 10px;
                .dian{
                  position: absolute;
                  right: -2px;
                  top: -0;
                  width: 3px;
                  height: 3px;
                  border-radius: 50%;
                  background-color:red;
                }
                img{
                    float: left;
                    width: 40px;
                    height: 40px;
                }
            }
            .content{
                display: block;
                p{
                    padding-top: 5px;
                    color: #8A8A8A;
                }
                h1{ 
                    span{
                        float: right;
                        color: #CDCDCD;
                    }
                }
            }
            .evaluationBegin{
                display: inline-block;
                margin-top: 30px;
                padding: 0px 10px; 
                text-align: center;
                line-height: 25px;
                background-color: #3262EC;
                color: #fff;
                border-radius: 5px;
                font-size: 11px;
            }
            h4{
                padding: 12px 0;
                font-size: 11px;
                color: #2C2C2C;
            }
            h1{
                font-size: 15px;
                color: #2C2C2C; 
                font-weight: 700;
            }
            p{
                font-size: 12px;
                color: #BFBFBF;
            }  
        }
    } 

    .line-1{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style> 

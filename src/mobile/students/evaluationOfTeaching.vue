<template>
  <div class="evaluation-of-teaching">  
    <teacher-head title-name="自助评教"  :menu-icon="menuIcon" @menuClick="menuClick"></teacher-head>
    
    <div class="course-content">
        
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getData">
        <div class="content-item" v-for="(item,index) in list" :key="index">
            <van-row>
                <van-col span="18"> 
                    <h1>{{item.rwmc}}</h1>
                    <p>评教时间：{{item.pjkssj.substring(0,10)}}至{{item.pjjssj.substring(0,10)}}</p>
                </van-col> 
                <van-col span="6">  
                    <router-link tag="span" :to="{name:'begin_evaluation',params:{rwid:item.rwid}}" class="evaluationBegin" > 
                        开始评教
                    </router-link>
                </van-col>
            </van-row>
        </div>  
      </van-list>  
    </div>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'
  export default {
    name: "evaluationOfTeaching",
    components: {
      teacherHead
    },
    data(){
      return {  
        is_design:false,
        list:[],
        loading: true,
        menuIcon:require("./img/lishi.png"),
        finished: false
      }
    },
    created() {
        this.getData()
    },
    methods: { 
        getData(){
            this.$GET('/evaluationTask/listByXs').then((res) => {
                if (res.code == 200) {
                    this.list = res.data
                    this.is_design = true
                } 
                // 加载状态结束
                this.loading = false;
                this.finished = true;
            })
        },
      onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }


          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 1000);
      },
      //菜单点击
      menuClick(){
        this.$router.push({name:"history_evaluation"});
      }
    }
  }
</script>

<style lang="less" > 
.evaluation-of-teaching{  
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%; 
    .course-content{
        overflow-x: hidden; 
        overflow-y: auto;
        height: calc(100% - 40px);  
        background-color: #F6F5F8;
        padding: 10px 20px;
        .content-item{
            margin-top: 10px; 
            background-color: #fff;
            padding: 14px;
            // border-radius: 6px;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            border-left: 4px solid #3262EC;
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
                font-size: 11px;
                color: #2C2C2C;
            }
            h1{
                font-size: 15px;
                color: #2C2C2C;
                margin: 13px 0;
                font-weight: 700;
            }
            p{
                font-size: 12px;
                color: #BFBFBF;
            } 
        }
    }
}

</style>

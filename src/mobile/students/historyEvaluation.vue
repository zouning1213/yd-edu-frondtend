<template>
  <div class="history-evaluation"> 
      
    <teacher-head title-name="历史评教"></teacher-head>
    <div class="selectItems">
        <div class="pd-20">
            <van-tabs type="card" :ellipsis="false" color="#2C2C2C" margin  @click="clickcheckednf">
                <van-tab v-for="(item,index) in nfList" :key="index" :title="item.nf" style="border:none">   
                </van-tab>
            </van-tabs>
        </div> 
    </div>
    
    <div class="course-content">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getHistory">  
            <div class="content-item" v-for="(item,index) in historyList" :key="index">
                <van-row>
                    <van-col span="24">  
                        <h4>评教时间：{{item.PJSJ}}</h4>
                    </van-col>  
                </van-row>
                <div>
                    <div class="touxiang">
                        <div class="isnoimg" v-show="!item.zp">
                            {{item.XM}}
                        </div>
                        <img v-show="item.zp" :src="item.zp" alt="">
                    </div>
                    <div class="content">
                        <h1>{{item.XM}}</h1>
                        <p>职业生涯与规划 
                            <router-link tag="span" :to="{name:'detail_evaluation',params:{pfid:item.PFID}}"> 
                            查看明细 >
                            </router-link>
                        </p>
                    </div>
                </div>
                <div :class="{fenshu:true,'img-red':item.ZF>=60,'img-blue':item.ZF<60}" >
                    <!-- <img src="./img/yuanjiao2x.png" alt=""> -->
                    <p>{{item.ZF}} <span class="fen">分</span></p>
                    <span>综合评分</span>
                </div>
            </div>   
      </van-list>  
    </div>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'
  export default {
    name: "historyEvaluation",
    components: {
      teacherHead
    },
    data(){
      return {  
        loading: true, 
        finished: false,

        nf:'',
        nfList:[],
        historyList:[],
        xsid:JSON.parse(localStorage.getItem("user")).xsid, //学生id
        //查看明细
        dialogVisible:false,
        tableData:[],
        tableJybz:''
      }
    },
    created() {
        //历史评教年份
        this.$GET('/evaluationTask/queryNfByPj',{xsid:this.xsid}).then(res => {
            this.nfList = res.data
            if (this.nfList.length > 0) {
                this.nf = this.nfList[0].nf
            }
                this.getHistory()
        })
    },
    methods: { 
        getHistory() {
            this.$GET('/evaluationTask/queryScoreInfoByNf',{nf:this.nf,xsid:this.xsid}).then(res => {
                if (res.code == 200) {
                    this.historyList = res.data
                     
                    // 加载状态结束 
                    this.loading = false;
                    this.finished = true;
                }
            })
        },
        clickcheckednf(index,item){
            // console.log(item)
            this.nf = item
            this.getHistory()
        }, 
    }
  }
</script>

<style lang="less" > 
.history-evaluation{  
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    height: 100%; 
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
    .course-content{
        overflow-x: hidden; 
        overflow-y: auto;
        height: calc(100% - 40px);  
        background-color: #F6F5F8;
        padding: 10px 20px;
        .content-item{
            position: relative;
            margin-top: 10px; 
            background-color: #fff;
            padding: 14px; 
            border-radius: 6px;
            .img-blue{ 
                background-image: url('./img/blue-yuanjiao.png');
                background-size: contain;
            }
            .img-red{ 
                background-image: url('./img/yuanjiao2x.png');
                background-size: contain;
            }
            .fenshu{
                position: absolute;
                right: 10px;
                top: 0;
                width: 47px;
                height: 42px;
                text-align: center;
                .fen{
                    position: relative;
                    left: -3px;
                    color: #fff;
                }
                p{
                    margin-top: 10px;
                    margin-bottom: 5px;
                    color: #fff;
                    font-size: 15px;
                }
                img{
                    width: 47px;
                    height: 42px;
                }
                span{
                    color:rgba(191,191,191,1);
                    font-size: 11px;
                }
            }
            .touxiang{
                float: left;
                width: 40px;
                height: 40px;
                margin-right: 5px;
                border-radius: 50%;
                overflow: auto;
                img{
                    float: left;
                    width: 40px;
                    height: 40px;
                }
                .isnoimg{
                    width: 100%;
                    height: 100%;
                    background-color: #3262EC;
                    text-align: center;
                    line-height: 40px;
                    color: #fff;
                }
            }
            .content{
                display: block;
                p{
                    padding-top: 5px;
                    span{
                        float: right;
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
}

</style>

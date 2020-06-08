<template>
  <div class="course-select"> 
    <teacher-head title-name="评教详情"></teacher-head>
    <div class="course-content">
        
      <van-list v-model="loading" :finished="finished" finished-text="" @load="getData">
            <div class="content-item" v-for="(item,index) in dataList" :key="index" >
                <van-row> 
                        <h1> {{item.XMMC}} </h1>
                        <p>参考分数：{{item.FS}}分 <span class="color-blue">我的评分：{{item.PJF}}分</span></p>  
                </van-row>
            </div>  
            <div class="content-item">
                <van-row> 
                        <h2>评教意见</h2>
                        <h1>{{jybz}}</h1>
                        <!-- <p>2020年01月04日</p>   -->
                </van-row>
            </div> 
      </van-list> 
    </div>
  </div>
</template>

<script>
  import teacherHead from '@/components-mobile/teacher-head.vue'
  export default {
    name: "courseSelect",
    components: {
      teacherHead
    },
    data(){
      return { 
        pfid:this.$route.params.pfid, 
        dataList:[],
        loading: true, 
        finished: false
      }
    },
    created() { 
        this.getData()
    },
    methods: { 
        getData(){
            this.$GET('teacherscoreInfo/detail',{pfid:this.pfid}).then(res => {
                this.dataList = res.data.teacherscoreDetailsList
                this.jybz = res.data.jybz
                this.loading = false;
                this.finished = true;
            }) 
        }
    }
  }
</script>

<style lang="less" > 
.course-select{ 
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
        padding:  10px 20px;
        .content-item{
            margin-bottom: 10px;
            background-color: #fff;
            padding: 14px; 
            border-radius: 6px;
            .color-blue{
                color: #3262EC;
                float: right;
            }
            h2{
                padding-left: 5px;
                border-left: 4px solid #3262EC;
                font-size: 14px;
                font-weight: 700;
            }
            h4{
                font-size: 11px;
                color: #2C2C2C;
            }
            h1{
                font-size: 15px;
                color: #2C2C2C;
                margin: 10px 0;
                font-weight: 700;
            }
            p{
                font-size: 12px;
                padding-bottom: 13px;
                color: #BFBFBF;
            }
            .fraction{
                display: inline-block;
                padding-top: 20px;
                font-size: 19px;
                color: #FF6366;

            }
        }
    }
    .pd-20{
        padding: 10px 0;
    }
    .bb-1{
        border-bottom: 1px solid #F9F9FB;
    }
}

</style>

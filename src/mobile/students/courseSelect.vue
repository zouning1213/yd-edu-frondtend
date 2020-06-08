<template>
  <div class="course-select">
    <teacher-head title-name="成绩查询"></teacher-head>
    <div class="selectItems">
        <div class="pd-20 bb-1">
            <van-tabs type="card" :ellipsis="false" color="#2C2C2C" margin @click="xlxqChange">
                <van-tab v-for="(item,index) in xqOption" :key="index" :title="item.xlxq" style="border:none">
                </van-tab>
            </van-tabs>
        </div>
        <div class="pd-20">
            <van-tabs  type="card" :ellipsis="false" color="#2C2C2C" @click="ksapChange">
                <van-tab v-for="(item,index) in ksOptions" :key="index" :title="item.ksapmc">
                </van-tab>
            </van-tabs>
        </div>
    </div>
    <div class="course-content">
      <van-list v-model="loading" :finished="finished" finished-text="" @load="getGrade">
        <div class="content-item" v-for="(item,index) in tableData" :key="index">
            <van-row>
                <van-col span="20">
                    <h4>{{item.xqmc}}</h4>
                    <h1>{{item.kcmc}}</h1>zhcj
                    <p>课程教师：{{item.skls}} {{item.ksapmc}}</p>
                </van-col>
                <van-col span="4">
                    <span :class="{fraction:true,'color-red':item.zhcj>=60,'color-blue':item.zhcj<60 }">
                        {{item.zhcj}}
                        <span class="fraction-img"></span>
                    </span>
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
    name: "courseSelect",
    components: {
      teacherHead
    },
    data(){
      return {
        params:{
            xq:null,
            xsid:this.$store.state.userInfo.xsid,
            ksapids:''
        },
        xqOption:[],
        ksOptions:[],
        tableData:[],
        loading: true,
        finished: false
      }
    },
    created() {
        //获取当前考期
        this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
            this.xqOption = res.data || []
            this.params.xq = this.xqOption[0].xlid
            this.$GET("/examArrange/selectlist/teachersearch",{xlid:this.xqOption[0].xlid}).then((res) => {
                this.ksOptions = res.data
            })
            this.getGrade()
            // this.getXq()
        })
    },
    methods: {
        //学期变化
        xlxqChange(index,item){
            this.$GET("/examArrange/selectlist/teachersearch",{xlid:this.xqOption[index].xlid}).then((res) => {
                this.ksOptions = res.data
                this.params.xq = this.xqOption[index].xlid
                if(res.data.length){
                    this.params.ksapids = this.ksOptions[0].ksapid
                    this.getGrade()
                }else{
                    this.params.ksapids = ''
                    this.getGrade()
                }
            })
        },
        //考试名称变化
        ksapChange(index,item){
            this.params.ksapids = this.ksOptions[index].ksapid
            // console.log(this.ksOptions[index].ksapid)
            this.getGrade()
        },
        xqChange() {
            this.$GET("/examArrange/selectlist/teachersearch",{xlid:this.params.xq}).then((res) => {
                this.ksOptions = res.data
            })
        },
        getXq() {
            this.$GET('/schoolCalendar/currentCalandar').then((res) => {
                if (res.code == 200) {
                    this.params.xq = parseInt(res.data.xlid)
                }
            })
        },
        getGrade() {
            this.$POST("/studentExamScore/scoreInfo",this.params).then((res) => {
                this.tableData = res.data || []
                this.loading = false;
                this.finished = true;
            })
        },
        onSubmit() {
            this.getGrade()
        },
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
    .selectItems{
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
        height: calc(100% - 140px);
        background-color: #F6F5F8;
        padding: 10px 20px;
        .content-item{
            margin-top: 10px;
            background-color: #fff;
            padding: 14px;
            border-radius: 6px;
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
            .fraction{
                position: relative;
                display: inline-block;
                padding-top: 20px;
                font-size: 19px;
                .fraction-img{
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    display: inline-block;
                    width: 23px;
                    height: 6px;
                    background-size: cover;
                }
            }
            .color-red{
                color: #FF6366;
                .fraction-img{
                    background-image: url('./img/fenshu-red.png');
                }
            }
            .color-blue{
                color: #3262EC;
                .fraction-img{
                    background-image: url('./img/fenshu-blue.png');
                }
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

<template>
  <div class="course-select began-pj">
    <teacher-head title-name="开始评教"></teacher-head>
    <div class="selectItems">
        <div class="pd-20">
            <van-tabs type="card" :ellipsis="false" color="#2C2C2C" margin  @click="clickcheckedJsid">
                <van-tab v-for="(item,index) in jsList" :key="index" :title="item.jsmc" style="border:none">
                </van-tab>
            </van-tabs>
        </div>
    </div>
    <div v-if="checkedPjzt" class="no-design-tip">
                    <!-- <img src="./img/evaluation-design.png"/> -->
                    <p>该教师已评教完毕</p>
                </div>
    <div v-else class="course-content">
        <div class="content-item" v-for="(item,index) in tableList" :key="index" >
            <van-row>
                    <h1> {{item.xmmc}} </h1>
                    <p>参考分数：{{item.xmfz}}分</p>
                    <p>
                        <!-- <span class="grade color-red">优秀</span>
                        <span class="grade color-yellow">良好</span>
                        <span class="grade color-green">一般</span>
                        <span class="grade color-blue">较差</span> -->
                        <van-row>
                            <van-col span="4"> 选择项：
                            </van-col>
                            <van-col span="20">
                                <van-radio-group v-model="item.fs">
                                    <van-row>
                                        <van-col span="6" v-for="(item1,index) in item.fzfb.split(',')" :key="index">
                                            <van-radio style="margin-bottom:5px" :name="item1">{{item1}}分</van-radio>
                                        </van-col>
                                    </van-row>
                                </van-radio-group>
                            </van-col>
                        </van-row>

                    </p>
            </van-row>
        </div>
        <div class="content-item">
            <van-row>
                <h1 class="opinion">评教意见</h1>
                <van-field
                v-model="jybz"
                rows="3"
                autosize
                type="textarea"
                placeholder="请输入您对这位老师的建议"
                />
            </van-row>
        </div>
          <van-button @click="onSubmit" style="margin-top:10px;" type="primary" size="large" :round='true'>提交</van-button>
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
        jybz:'', //教师建议
        jsList:[],
        checkedJsid:[], //教师id
        checkedJsmc:'', //教师姓名
        checkedPjzt:'', //评教状态
        tableList:[],
        rwid:this.$route.params.rwid, //任务id
        xsid:JSON.parse(localStorage.getItem("user")).xsid, //学生id
        is_validation:false,
      }
    },
    async created() {
        await this.getData();
        await this.setJsid() //设置教师默认值
        await this.getJsxm() //获取教师姓名
    },
    methods: {
        getData() {
            return this.$GET('./evaluationTask/listByEvaluation',{rwid:this.rwid,xsid:this.xsid}).then((res) => {
                if (res.code == 200) {
                    if (res.data.js.length > 0) {
                        this.tableList = res.data.evaluationProjectList
                        //教师列表
                        this.jsList = res.data.js
                        console.log(res.data)
                    }
                } else {
                }
            })
        },
        setJsid() {
            this.checkedJsid = this.jsList.length ? this.jsList[0].jsid : ''
        },
        getJsxm() {
            //zn改
            var index = this.jsList.map((item)=>{
                if(item.jsid == this.checkedJsid){
                    this.checkedJsmc = item.jsmc
                    this.checkedPjzt = item.pjzt
                }
            });
        },
        onSubmit() {
            this.is_validation = true

            //创建后台需要的数据格式
            let teacherscoreDetailsJson = {
                jybz:this.jybz,
                teacherscoreDetailsList:[],
                teacherscoreInfo:{
                    rwid:this.rwid,
                    jsid:this.checkedJsid,
                    xsid:this.xsid,
                }
            }
            //添加分数
            this.tableList.forEach(item => {
                teacherscoreDetailsJson.teacherscoreDetailsList.push({
                    fs:item.fs,
                    xmid:item.xmid
                })
            })
            // console.log(teacherscoreDetailsJson)
            this.$POST('/teacherscoreDetails/generateTeacherScore',teacherscoreDetailsJson,{
                transformRequest:function (data) {
                    return JSON.stringify(data);
                },
                headers:{'Content-Type':'application/json'}
            }).then((res) => {
                if (res.code == 200) {
                    this.$toast.success('评教成功');
                    this.checkedPjzt = true
                } else {
                    this.$toast.fail(res.message);
                }
            })
        },
        clickcheckedJsid(index,jsmc){
            //console.log(this.jsList[index].jsid)
            this.checkedJsid = this.jsList[index].jsid

            this.getData()
            this.getJsxm()
            this.jybz = ''
        }
    }
  }
</script>

<style lang="less" >
.began-pj{
    .course-content{
        height: calc(100% - 90px) !important ;
    }
}
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
    .no-design-tip{
        text-align: center;
        margin-top: 50px ;
    }
    .course-content{
        overflow-x: hidden;
        overflow-y: auto;
        height: calc(100% - 90px);
        background-color: #F6F5F8;
        padding:  10px 20px;
        .content-item{
            margin-bottom: 10px;
            background-color: #fff;
            padding: 14px;
            border-radius: 6px;
            .grade{
                border: 1px solid #000;
                border-radius: 20px;
                display: inline-block;
                padding: 2px 10px;
                margin-right: 5px;
            }
            .color-red{
                border-color: #FF6464;
                color: #FF6464;
            }
            .color-yellow{
                border-color: #F7C122;
                color: #F7C122;
            }
            .color-green{
                border-color: #4FC76C;
                color: #4FC76C;
            }
            .color-blue{
                border-color: #3D63E4;
                color: #3D63E4;
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
            .opinion{
                border-left: 3px solid #3262EC;
                padding-left: 4px;
            }
            .van-cell{
                border:1px solid rgba(245,245,245,1);
                border-radius:5px;
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

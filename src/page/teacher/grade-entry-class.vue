<template>
<!-- 录入操作页面 -->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-entry"></i></div>
                <h3>开始录入</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="common-pd yd-bg yd-common-table"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-row class="grade-entry-title mb-30" :gutter="60">
                <el-col :span="4"  ><h3 class="text-black">考试人数:{{this.tableData.length}}</h3></el-col>
                <el-col :span="4"><h3 class="text-red">及格人数:{{this.passingNumber}}</h3></el-col>
                <el-col :span="4"><h3 class="text-blue">平均成绩:{{parseFloat(this.averageNumber).toFixed(2)=='NaN'?'':parseFloat(this.averageNumber).toFixed(2)}}</h3></el-col>
                
                <el-col :span="12" class="text-right">
                    <div class="  zidingyi">
                        <span>成绩规则: </span>
                        <!-- <span>自定义成绩规则: </span> -->
                        <b>平时成绩占比：40%</b>   
                            <!-- <el-input style="width:40px"></el-input> -->
                        考试成绩占比：60%
                            <!-- <el-input style="width:40px"></el-input> -->
                    </div>
                </el-col>
            </el-row>
            <el-form>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                            prop="zymc"
                            align="center"
                            label="专业">
                    </el-table-column>
                    <el-table-column
                            prop="xh"
                            align="center"
                            label="学号">
                    </el-table-column>
                    <el-table-column
                            prop="xm"
                            align="center"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="bjmc"
                            align="center"
                            label="班级">
                    </el-table-column>
                    <el-table-column
                            prop="pscj"
                            align="center"
                            label="平时成绩">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.pscj" :controls="false" :min="0" :max="100" :disabled="disabled"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="kscj1"
                            align="center"
                            label="考试成绩">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.kscj1" :controls="false" :min="0" :max="100" :disabled="disabled"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="zhcj"
                            align="center"
                            label="综合成绩">
                        <template slot-scope="scope">
                            <span>{{scope.row.zhcj=parseFloat(scope.row.pscj*pscjzb+scope.row.kscj1*kscjzb).toFixed(0)}}</span>
                            <!-- {{parseFloat(scope.row.pscj*pscjzb+scope.row.kscj1*kscjzb).toFixed(1)}} -->
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="bz"
                            align="center"
                            label="备注">
                        <template slot-scope="scope">
                            <!-- <p>这是一段备注</p> -->
                            <el-input v-model="scope.row.bz" placeholder="请输入内容" :disabled="disabled"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>

            <div class="entrySubmit-Box" v-show="!disabled">
                 <el-button type="primary" @click="draftSave">草稿保存</el-button>
                 <el-button type="info" plain @click="draftSubmit(1)">提交</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name:"teacher-grade-entry-open",
        data() {
            return {
                search:'',
                passingNumber:'',
                averageNumber:'',
                disabled:false,
                tableData:[],
                pscjzb:'0.4',
                kscjzb:'0.6',
            }
        },
        methods:{
            draftSave(){
                //草稿保存
                this.passingNumber = this.tableData.filter(item=>item.kscj1>=60).length
                var average = 0
                this.tableData.forEach(function(item){
                    average+=item.kscj1
                })
                this.averageNumber = average/this.tableData.length
                //后面 发送成绩录入请
                this.draftSubmit()
            },
            draftSubmit(ztm){
                //提交  
                let that = this
                let studentExamScoreList = {
                    cjlrh:this.$route.params.id,
                    pjcj:this.averageNumber,
                    ksh:this.$route.params.id,
                    ksrs:this.passingNumber,
                    ztm : 0
                }
                if(ztm){
                    studentExamScoreList.ztm = ztm
                }
                // console.log(studentExamScoreList)
                let examArrange = []
                this.tableData.forEach(function(item,i){
                    examArrange[i]={}
                    examArrange[i].kscj1 = item.kscj1 
                    examArrange[i].cjh = item.cjh 
                    examArrange[i].bz = item.bz 
                    examArrange[i].pscj = item.pscj; 
                    examArrange[i].zhcj = item.zhcj=parseFloat(item.pscj*that.pscjzb+item.kscj1*that.kscjzb).toFixed(0)
                  
                })
                // console.log(examArrange)
                //请求
                this.$POST("/studentExamScore/updateList",
                            {scoreInputInfo:studentExamScoreList,studentExamScoreList:examArrange},
                            {
                                transformRequest : function (data) {
                                 return JSON.stringify(data);
                               },
                                headers: {'Content-Type': 'application/json'}
                            }
                            ).then((res) => {
                            // console.log("成绩录入完成")
                            if(ztm){
                                this.$notify({
                                title: '成功',
                                message: '提交成功',
                                type: 'success'
                                });
                            }else{ 
                                this.$notify({
                                    title: '成功',
                                    message: '草稿保存成功',
                                    type: 'success'
                                });
                            }
                })
                    
                if(ztm){
                    this.disabled = true
                }
            }
        },
        created() { 
            // console.log(this.$route.params.id)
            this.$GET('/studentExamScore/listBylr',{cjlrh:this.$route.params.id}).then((res) => {
                this.tableData = res.data.examScoreList||[]
                this.disabled = res.data.scoreInputInfo.ztm==1?true:false
                this.passingNumber = res.data.scoreInputInfo.jgrs
                this.averageNumber = res.data.scoreInputInfo.pjcj
            }).then(()=>{
                this.passingNumber = this.tableData.filter(item=>item.kscj1>=60).length||''
                var average = 0
                this.tableData.forEach(function(item){
                    average+=item.kscj1
                })
                this.averageNumber = average/this.tableData.length ||''
            })
            
        } 
    }
</script>

<style scoped lang="less">
    .grade-entry-title {
        text-align: left;
        h3 {
            font-size: 20px;
        }
    }

    .yd-common-table {
        td {
            .el-input-number {
                width: 80px;
            }
        }
        .zidingyi{
            margin-right: 10px;
            >span{
                font-size: 20px;
                border: 700
            }
            >b{
                margin: 0 10px;
                font-weight: 400
            }
        }
    }
    .entrySubmit-Box{
        padding: 30px 0;
    }
</style>
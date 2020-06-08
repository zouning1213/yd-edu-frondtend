<template>
    <!--成绩审核结果-->
    <div class="grade-findings-of-audit">
        <el-row class="yd-router-title yd-bg">
            <div > 
                <div class="title-icon icon-skin"><i class="yd icon-entry"></i></div>
                <h3>成绩审核结果</h3> 
                <el-form class="fr" :inline="true" :model="form" label-width="80px" >
                    <el-form-item label="选择学期 :">
                        <el-select  v-model="xlid" placeholder="请选择" style="width:260px" >
                            <el-option
                                    v-for="(item,index) in xlidOptions"
                                    :key="index"
                                    :label="item.xlxq"
                                    :value="item.xlid">
                            </el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="">
                        <el-button type="primary" @click="getData">确定</el-button>
                    </el-form-item> 
                </el-form>
            </div> 
            <!-- <el-col :span="20" class="text-right">
                <el-input placeholder="请输入考试名称" v-model="params.condition"
                          @keyup.enter.native="searchTable('search')"
                          class="input-with-select1">
                    <el-select v-model="xlid" slot="prepend" placeholder="请选择"> 
                        <el-option v-for="(item,index) in xlidOptions"
                                   :key="index"
                                   :label="item.xlxq"
                                   :value="item.xlid">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchTable('search')">搜索</el-button>
                </el-input>
            </el-col> -->
        </el-row>  
        
        <div class="common-pd yd-bg yd-common-table"
            :style="{'minHeight':(this.$store.state.minClientHeight-264)+'px'}">
            <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column prop="ksapmc" label="考试名称" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.ksapmc||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="kcmc" label="课程" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.kcmc||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="bjmc" label="班级" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.bjmc||'-'}}</p>
                    </template>
                </el-table-column> 
                <el-table-column prop="lrztm" label="状态" align="center">
                    <template slot-scope="scope">
                        <!-- 1"通过" , 2"待审核 , 3"不通过"-->
                        <p v-if="scope.row.lrztm == 1" class="text-green"> {{scope.row.lrzt||'-'}}</p>
                        <p v-if="scope.row.lrztm == 2" class="text-blue"> {{scope.row.lrzt||'-'}}</p>
                        <p v-if="scope.row.lrztm == 3" class="text-red"> {{scope.row.lrzt||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button class="edit-btn" @click="editExam(scope.row)" type="text" size="small">
                            <i class="el-icon-edit"></i>查看
                        </el-button> 
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <!--弹窗-->
        <el-dialog :visible.sync="dialogFormVisible"
                   :close-on-click-modal='false'
                   width="680px"
                   class="manage-student-scourse" @close="closeDialog">
            <el-table
                    max-height="400px"
                    border
                    :data="motaiData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column prop="xh" label="学号" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.xh||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="xm" label="姓名" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.xm||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="zhcj" label="成绩" align="center">
                    <template slot-scope="scope">
                        <!-- <p>{{scope.row.zhcj||'-'}}</p> -->
                        <el-input v-model="scope.row.zhcj" placeholder="请输入内容" value="0"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <el-form :model="motaiShzt" style="margin-top:20px">
                <el-form-item label="审核状态" label-width="100">
                    <el-select v-model="motaiShzt.shzt" placeholder="请选择审核状态" disabled>
                        <el-option v-for="(item,index) in shztOptions" :key="index" :label="item.name"  
                                   :value="item.code"></el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label="审核理由" label-width="100">
                    <el-input style="width:80%" type="textarea" v-model="motaiShzt.reason" disabled></el-input>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="submitExam">重新提交</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>

<script>  
    let jsid = JSON.parse(localStorage.getItem("user")).jsid
    export default {
        name:"grade-findings-of-audit", 
        data() {
            return {
                params:{
                    condition:'',
                    xjztm:'',
                },
                xjztmOptions:[],
                dialogFormVisible:false,
                tableData:[],
                motaiData:[{}],
                motaiShzt:{
                    shzt:'1',
                    reason:''
                },
                shztOptions:[],
                currentData:{},
                xlidOptions:[],
                xlid:'',
                form:{}
            }
        },
        methods:{},
        created() { 
            //审核状态
            this.$POST('/system/dictList/SPZTM',).then((res) => {
                this.shztOptions = res
            })
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.xlidOptions = res.data
            })
            this.getData()

        },
        methods:{  
            getData(){ 
                //tableData
                this.$POST('/scoreInputInfo/historyScoreInput',{jsid:jsid,xlid:this.xlid}).then((res) => { 
                    if(res.code==500){
                        this.$message.error({message:res.message})
                    } 
                    this.tableData = res.data||[]
                })
            },
            //编辑
            editExam(row) {
                this.currentData = row
                this.$GET("/studentExamScore/listBylr",{cjlrh:row.cjlrh}).then((res) => {
                    if (res.code == 200) {
                        this.motaiData = res.data.examScoreList
                        this.motaiShzt.shzt = res.data.scoreInputInfo.lrztm
                        this.motaiShzt.reason = res.data.scoreInputInfo.shrz
                    }
                })
                // console.log(row)
                this.dialogFormVisible = true
            }, 
            closeDialog() { 
                this.currentData = []
            },
            //模态提交
            submitExam() {
                this.currentData.lrztm = this.motaiShzt.shzt
                this.currentData.shrz = this.motaiShzt.reason
                // console.log(this.currentData)
                // this.$POST('/scoreInputInfo/update',this.currentData).then((res) => {
                //     if (res.code == 200) {
                //         this.$message({
                //             message:'提交成功',
                //             type:'success'
                //         });   
                //         this.dialogFormVisible = false
                //     } else {
                //         this.$message.error(res.message)
                //     }
                // })
            }, 
        }
    }
</script>

<style  lang="less">
.grade-findings-of-audit{
    .grade-entry-title {
        text-align: center;
        h3 {
            font-size: 20px;
            color: #333;
            a {
                margin-left: 40px;
                font-size: 16px;
                color: #3262EC;
                text-decoration: underline;
            }
        }
    }
    .el-tabs__nav-wrap{
            margin-bottom: 1px !important;
    }
    .row-item{
        margin: 10px 0
    }
}
    
</style>

<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-history"></i></div>
                <h3>历史成绩</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" @keyup.enter.native="selectBy" class="input-with-select">
                    <el-button slot="append" @click="selectBy">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="common-pd yd-bg yd-common-table"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-form :inline="true" class="yd-common-search">
                <el-form-item>
                    <el-select v-model="select" placeholder="选择学期查询" class="width-380">
                        <!-- 动态区域选择 -->
                        <!-- <el-option label="所有学期" value=""></el-option> -->
                        <el-option
                                v-for="(item,index) in semester"
                                :key="index"
                                :label="item.xlxq"
                                :value="item.xlid">
                            <span style="float: left">{{ item.xlxq }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="selectHistory">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                        prop="nj"
                        align="center"
                        label="年级">
                </el-table-column>
                <el-table-column
                        prop="kcmc"
                        align="center"
                        label="课程名称">
                </el-table-column>
                <el-table-column
                        prop="kclb"
                        align="center"
                        label="课程类别">
                </el-table-column>
                <el-table-column
                        prop="bjmc"
                        align="center"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="ksrs"
                        align="center"
                        label="人数">
                </el-table-column>
                <el-table-column
                        prop="address"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="6" :offset="6" class="edit-details edit-btn">
                                <i @click="lookHistoryGrade(scope.row.cjlrh)" class="yd icon-details"></i>
                            </el-col>
                            <el-col :span="6" class="edit-print">
                                <i class="yd icon-print manager-btn" @click="printData(scope.row.cjlrh)"></i>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--详情弹窗-->
        <el-dialog title=""
                   :visible.sync="dialogVisible" width="80%"
                   :close-on-click-modal='false'>
            <history-dialog ref="ydPage" :ksh="this.ksh" ></history-dialog>
        </el-dialog>
    </div>
</template>

<script>
    import historyDialog from '../../components-page/teacher/grade-history-dialog'

    export default {
        name:"grade-history",
        components:{
            historyDialog
        },
        data() {
            return {
                dialogVisible:false,
                search:'',
                select:'',
                ksh:[],
                semester:[],
                tableData:[]
            }
        },
        methods:{//打印
            printData(cjlrh) {
                this.dialogVisible = true 
                this.$nextTick(()=>{
                    this.$GET('/studentExamScore/listBylr',{cjlrh:cjlrh}).then((res) => {
                        this.ksh = res.data.examScoreList || [] 
                    }).then(()=>{
                        this.$refs.ydPage.childPrint()
                        this.dialogVisible = false
                    })
                }) 
            }, 
            lookHistoryGrade(cjlrh) { 
                this.$GET('/studentExamScore/listBylr',{cjlrh:cjlrh}).then((res) => {
                    this.ksh = res.data.examScoreList || []
                }) 
                this.dialogVisible = true 
            },
            //历史成绩查询
            selectHistory() {
                this.$GET('/scoreInputInfo/historyScoreInput',{jsid:this.$store.state.userInfo.jsid,xlid:this.select,condition:this.search}).then((res) => {
                    this.tableData = res.data||[]
                })
            },
            selectBy(){
                this.selectHistory() 
            }
        },
        created() { 
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => { 
                this.semester = res.data||[]
            })
            this.selectHistory()

        }
    }
</script>

<style scoped lang="less">
    .yd-common-table {
        tbody {
            td {
                .yd {
                    font-size: 20px;
                }
                .edit-details, .edit-print {
                    cursor: pointer;
                }
                .edit-details {
                    position: relative;
                    &::after {
                        content: '';
                        width: 1px;
                        height: 20px;
                        background-color: #F3F5F7;
                        position: absolute;
                        right: 0px;
                        top: 3px;
                    }
                }

            }
        }
    }
</style>
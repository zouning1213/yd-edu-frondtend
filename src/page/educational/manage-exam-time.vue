<template>
    <!--考期管理-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-examination"></i></div>
                <h3>考期管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入考期名称" v-model="params.condition" @keyup.enter.native="searchTable"
                          class="input-with-select">
                    <el-button slot="append" @click="searchTable">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="yd-bg common-pd yd-common-table pr"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <div class="yd-add-btn" style="right:10px;top:10px;" @click="addExam"></div>
            <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column prop="kqmc" label="考期名称" align="center">
                </el-table-column>
                <el-table-column prop="xqmc" label="针对学期" align="center">
                </el-table-column>
                <el-table-column prop="zymc" label="针对专业" align="center">
                </el-table-column>
                <el-table-column prop="lrkssj" label="成绩录入开始时间" align="center">
                    <template slot-scope="scope"><p>{{scope.row.lrkssj | filtersTime}}</p></template>
                </el-table-column>
                <el-table-column prop="lrzjsh" label="成绩录入截止时间" align="center">
                    <template slot-scope="scope"><p>{{scope.row.lrzjsh | filtersTime}}</p></template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <el-button class="edit-btn" @click="editExam(scope.row)" type="text" size="small">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button class="del-btn" @click="deleteExam(scope.row.kq)" type="text" size="small">
                            <i class="el-icon-delete"></i>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <yd-page ref="ydPage" url="/examInfo/list" :params="params"
                     @changePage="changePage"></yd-page>
        </div>
        <!--添加弹窗-->
        <el-dialog :visible.sync="dialogFormVisible"
                   :close-on-click-modal='false'
                   @close="closeDialog" width="600px">
            <el-form :model="examForm" :rules="rules" ref="ruleForm" label-width="140px">
                <el-row v-if="dialogFormVisible">
                    <el-col :span="20" :offset="1">
                        <el-form-item label="考期名称:" prop="kqmc">
                            <el-input v-model="examForm.kqmc" placeholder="请输入考期名称"></el-input>
                        </el-form-item>
                        <el-form-item label="针对学期:" prop="xlid">
                            <el-select v-model="examForm.xlid" placeholder="请选择学期">
                                <el-option
                                        v-for="item in xqOptions"
                                        :key="item.xlid"
                                        :label="item.xlxq"
                                        :value="item.xlid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="针对专业:" prop="zyid">
                            <el-select v-model="examForm.zyid" placeholder="请选择专业">
                                <el-option
                                        v-for="item in zyhOptions"
                                        :key="item.zyid"
                                        :label="item.zymc"
                                        :value="item.zyid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="成绩录入开始时间:" prop="lrkssj">
                            <el-date-picker
                                    v-model="examForm.lrkssj"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="成绩录入截止时间:" prop="lrzjsh">
                            <el-date-picker
                                    v-model="examForm.lrzjsh"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="text-center clearfix mb-20">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitExam">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name:"manage-exam-time",
        data() {
            return {
                params:{
                    condition:'',
                    limit:10
                },
                search:'',
                search1:'',
                tableData:[],
                dialogFormVisible:false,
                // kqOptions:[],
                xqOptions:[],
                zyhOptions:[],
                examForm:{
                    kq:'',
                    kqmc:'',
                    xlid:"",
                    zyid:"",
                    lrkssj:'',
                    lrzjsh:''
                },
                rules:{
                    kqmc:[
                        {required:true,message:'请输入考期名称',trigger:'blur'},
                        {min:3,message:'名称长度在最少3个字',trigger:'blur'}
                    ],
                    xlid:[
                        {required:true,message:'请选择针对考期',trigger:'blur'},
                    ],
                    zyid:[
                        {required:true,message:'请选择针对专业',trigger:'blur'},
                    ],
                    lrkssj:[
                        {required:true,message:'请选择开始录入时间',trigger:'blur'},
                    ],
                    lrzjsh:[
                        {required:true,message:'请选择结束录入时间',trigger:'blur'},
                    ],
                }
            }
        },
        created() {
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.xqOptions = res.data
            })
            //专业下拉框
            this.$GET('/majorInfo/selectList',).then((res) => {
                this.zyhOptions = res.data
            })
            /*  //考期名称下拉框
              this.$GET('/examInfo/examInfoSelect',).then((res) => {
                  this.kqOptions = res.data
              })*/
        },
        methods:{
            changePage(data) {
                this.tableData = data
            },
            //模态提交
            submitExam() {
                var startTime = new Date(this.examForm.lrkssj).getTime();
                var endTime = new Date(this.examForm.lrzjsh).getTime();
             /*   console.log(this.examForm)
                console.log(startTime < endTime)*/
                if (this.examForm.kq) {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            if (startTime < endTime) {
                                this.$POST('/examInfo/update',this.examForm).then((res) => {
                                    this.$message({
                                        message:'编辑成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogFormVisible = false
                                })
                            } else {
                                this.$message.error('成绩录入开始时间不能大于成绩录入截止时间')
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
                else {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            if (startTime < endTime) {
                                this.$POST('/examInfo/add',this.examForm).then((res) => {
                                    this.$message({
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogFormVisible = false
                                })
                            } else {
                                this.$message.error('成绩录入开始时间不能大于成绩录入截止时间')
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            },
            addExam() {
                this.examForm = {
                    kq:'',
                    kqmc:'',
                    xlid:"",
                    zyid:"",
                    lrkssj:'',
                    lrzjsh:''
                }
                this.dialogFormVisible = true
            },
            //编辑
            editExam(row) {
                this.examForm = row
                this.dialogFormVisible = true
            },
            deleteExam(kq) {
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/examInfo/delete',{examInfoId:kq}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            })
                            this.$refs.ydPage.getData()
                        } else {
                            this.$message.error('删除失败')
                        }
                    });
                })
            },
            //模态关闭
            closeDialog() {
                this.examForm = {
                    kq:'',
                    kqmc:'',
                    xlid:"",
                    zyid:"",
                    lrkssj:'',
                    lrzjsh:''
                }
            },
            searchTable() {
                this.$refs.ydPage.getData('search')
            },
        },
    }
</script>

<style lang="less">

</style>

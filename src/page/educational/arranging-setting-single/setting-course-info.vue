<template>
    <!--设置任何信息-->
    <div>
        <el-row>
            <el-col :span="12">
                <el-radio-group v-model="active" style="margin-bottom: 20px;" @change="changeTab">
                    <el-radio-button label="1">任课基本信息</el-radio-button>
                    <el-radio-button label="2">合并教学信息</el-radio-button>
                </el-radio-group>
            </el-col>
            <el-col :span="12" class="text-right">
                <el-button type="success" @click="resetTeacher" size="small">推荐老师</el-button>
                <el-button type="warning" @click="resetCourse" size="small">重置</el-button>
            </el-col>
        </el-row>
        <el-row class="text-right">
            <el-form ref="ruleForm" :model="params" :inline="true" size="small" label-width="75px">
                <el-form-item label="选择学年:">
                    <el-select style="width: 115px" v-model="params.year" placeholder="选择学年"
                               @change="changeParams('year')">
                        <el-option v-for="(item,index) in xqOption"
                                   :key="index"
                                   :label="item.year + '级'"
                                   :value="item.year">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择专业:">
                    <el-select style="width: 180px" v-model="params.zyid" placeholder="选择专业"
                               @change="changeParams('zyid')">
                        <el-option
                                v-for="item in zyOptions"
                                :key="item.zyid"
                                :label="item.zymc"
                                :value="item.zyid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择班级:">
                    <el-select style="width: 180px" v-model="params.bjid" placeholder="选择班级"
                               @change="changeParams('bjid')">
                        <el-option
                                v-for="item in bjOptions"
                                :key="item.bjid"
                                :label="item.bjmc"
                                :value="item.bjid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择课程:">
                    <el-select style="width: 180px" v-model="params.kcid" placeholder="选择课程"
                               @change="changeParams('kcid')">
                        <el-option
                                v-for="item in kcOptions"
                                :key="item.kcid"
                                :label="item.kcmc"
                                :value="item.kcid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-right: 0">
                    <el-button type="primary" @click="searchCourse()">查询</el-button>
                    <el-button @click="removeCourse()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <div class="yd-common-table setting-course-table1">
            <el-table
                    :data="tableData"
                    :span-method="arraySpanMethod"
                    border>
                <el-table-column
                        prop="bjmc"
                        label="班级名称"
                        align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.bjmc}}</p>
                        <el-button type="text" class="edit-btn"
                                   @click="addCourse(scope.row)">添加课程
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="kcmc"
                        label="科目"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="kss"
                        label="周学时"
                        align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.kss" :min="0"
                                         @change="changeKss(scope.row)"
                                         size="small" label="请输入周学时">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="zgxm"
                        label="教师"
                        align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.zgxm == ''">
                            <el-button style="color:#C0C4CC" size="small"
                                       @click="dialogOpen(scope.row,'teacherInfo')">
                                选择教师
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button size="small" @click="dialogOpen(scope.row,'teacherInfo')">
                                {{scope.row.zgxm}}
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="jsmc"
                        label="教室"
                        align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.jsmc == ''">
                            <el-button style="color:#C0C4CC" size="small"
                                       @click="dialogOpen(scope.row,'classRoom')">
                                选择教室
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button size="small" @click="dialogOpen(scope.row,'classRoom')">
                                {{scope.row.jsmc}}
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="amount3"
                        label="合班教学"
                        align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="dialogOpen(scope.row,'classInfo')">
                            {{params.mark =='dbjx' ? '选择班级' : '更改班级'}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="amount3"
                        label="操作"
                        width="100"
                        align="center">
                    <template slot-scope="scope">
                        <template v-if="params.mark =='dbjx'">
                            <el-button type="text" class="del-btn" size="small"
                                       @click="delCourse(scope.row.rwh)">删除
                            </el-button>
                        </template>
                        <template v-if="params.mark =='hbjx'">
                            <el-button type="text" class="del-btn" size="small"
                                       @click="undoCourse(scope.row)">删除
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--选择弹窗-->
        <el-dialog
                :title="dialogTitle"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="860px"
                center
                v-if="dialogVisible"
                custom-class="dialog-body-auto">
            <teacher-dialog v-if="dialogType =='teacherInfo'" ref="teacherInfo"
                            min="1"
                            :row="dialogRow"
                            v-on:getData="dialogReceive"></teacher-dialog>
            <classroom-dialog v-if="dialogType=='classRoom'" ref="classRoom"
                              min="1"
                              :row="dialogRow"
                              is_recommend="false"
                              v-on:getData="dialogReceive"></classroom-dialog>
            <classinfo-dialog v-if="dialogType=='classInfo'" ref="classInfo"
                              :row="dialogRow"
                              min="1"
                              v-on:getData="dialogReceive"></classinfo-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!--添加课程-->
        <el-dialog
                title="添加课程"
                :visible.sync="addDialog"
                v-if="addDialog"
                center
                width="480px">
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                <el-form-item label="选择科室:" prop="ksid">
                    <el-select v-model="form.ksid" placeholder="选择课程" @change="getAddKcOption">
                        <el-option
                                v-for="item in addKsOption"
                                :key="'ks'+item.ksid"
                                :label="item.ksmc"
                                :value="item.ksid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择课程:" prop="kch">
                    <el-select v-model="form.kch" placeholder="选择课程">
                        <el-option
                                v-for="item in addKcOption"
                                :key="'kc'+item.kcid"
                                :label="item.kcmc"
                                :value="item.kcid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设置课时数" prop="kss">
                    <el-input-number v-model="form.kss" :min="0"
                                     size="small" label="请输入周学时">
                    </el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitCourse">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import teacherDialog from './check-teacher-dialog'
    import classroomDialog from './check-classRoom-dialog'
    import classinfoDialog from './check-classInfo-dialog'

    export default {
        name:"setting-course",
        props:['pkjhid'],
        components:{
            teacherDialog,
            classroomDialog,
            classinfoDialog
        },
        data() {
            return {
                active:'1',
                dialogVisible:false,
                dialogTitle:'',
                dialogType:'',
                dialogRow:'',
                params:{
                    year:'',
                    zyid:'',
                    bjid:'',
                    kcid:'',
                    mark:'',
                    pkjhid:this.$route.params.planid,
                },
                xqOption:[],
                zyOptions:[],
                bjOptions:[],
                kcOptions:[],
                tableData:[],
                planid:this.$route.params.planid,
                //添加课程
                addDialog:false,
                addKcOption:[],
                addKsOption:[],
                rowSpanList:[],
                form:{
                    ksid:'',
                    kch:'',
                    kss:''
                },
                rules:{
                    ksid:[
                        {required:true,message:'请选择科室',trigger:'change'},
                    ],
                    kch:[
                        {required:true,message:'请选择课程',trigger:'change'},
                    ],
                }
            }
        },
        created() {
            this.$GET('/departmentInfo/list',{limit:999,page:1}).then(res => {
                if (res.code == 200) {
                    this.addKsOption = res.data
                }
            })

            //选择级别
            this.$GET('/timesheetTask/yearsTerm').then((res) => {
                if (res.code == 200) {
                    this.xqOption = res.data
                }
            })
            this.getZyOption()
            this.getBjOption()
            this.getKcOption()
            this.getTable()
        },
        methods:{
            getTable() {
                if (this.active == '1') {
                    this.params.mark = 'dbjx'
                } else {
                    this.params.mark = 'hbjx'
                }

                this.tableData = []
                this.$GET('/timesheetTask/listBySelectGroupbyBj',this.params).then(res => {
                    if (res.code == 200) {
                        // this.tableData = res.data
                        let rowSpanList = [];
                        res.data.forEach(item => {
                            if (item.kclb) {
                                item.kclb.forEach((item2,index) => {
                                    rowSpanList.push(index == 0? item.kclb.length :0);
                                    this.tableData.push(item2)
                                })
                            }
                        })
                        this.rowSpanList = rowSpanList;
                    }
                })
            },
            arraySpanMethod({row,column,rowIndex,columnIndex}) {
                if (columnIndex === 0) {
                    // console.log(row.bh)
                    return [this.rowSpanList[rowIndex],1]; //合并单元格
                }
            },
            getAddKcOption() {//选择课程
                this.$GET('/lessonInfo/lessonInfoByksid',{ksid:this.form.ksid}).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.addKcOption = res.data
                    }
                })
            },
            //选择班级  选择老师 选择教师开始
            dialogOpen(row,type) {
                this.dialogVisible = true
                this.dialogType = type
                this.dialogRow = row
                if (this.dialogType == 'teacherInfo') {
                    this.dialogTitle = '选择教师'
                } else if (this.dialogType == 'classInfo') {
                    this.dialogTitle = '选择班级'
                } else if (this.dialogType == 'classRoom') {
                    this.dialogTitle = '选择教室'
                }
            },
            dialogSubmit() {
                if (this.dialogType == 'teacherInfo') {
                    this.$refs.teacherInfo.sendData()
                } else if (this.dialogType == 'classInfo') {
                    this.$refs.classInfo.sendData()
                } else if (this.dialogType == 'classRoom') {
                    this.$refs.classRoom.sendData()
                }
            },
            dialogReceive(row) {
                console.log(row)
                this.$POST('/timesheetTask/validAndSaveTask/' + this.dialogType,row,
                    {
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }
                ).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'保存成功',
                            type:'success'
                        });
                        this.getTable()
                        this.dialogVisible = false
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            dialogCancel() {
                this.dialogVisible = false
            },
            changeKss(row) {
                this.$POST('/timesheetTask/update',row).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'更改成功'
                        })
                    } else {
                        this.$message.error(res.message)
                        this.getTable()
                    }
                })
            },
            //选择班级  选择老师 选择教师结束
            changeTab(label) {
                this.getTable()
            },
            changeParams(type) {
                if (type == 'year') {
                    this.getZyOption()
                    this.getBjOption()
                    this.getKcOption()
                    this.params.zyid = ''
                    this.params.bjid = ''
                    this.params.kcid = ''
                } else if (type == 'zyid') {
                    this.getBjOption()
                    this.getKcOption()
                    this.params.bjid = ''
                    this.params.kcid = ''
                } else if (type == 'bjid') {
                    this.getKcOption()
                    this.params.kcid = ''
                } else if (type == 'kcid') {

                }
            },
            getZyOption() {  //选择专业
                this.$GET('/timesheetTask/getTaskZyids',{
                    year:this.params.year,
                    pkjhid:this.planid
                }).then((res) => {
                        this.zyOptions = res.data
                        // console.log(res.data)
                    }
                )
            },
            getBjOption() { //选择班级
                this.$GET('/timesheetTask/getTaskBjids',{
                    year:this.params.year,
                    pkjhid:this.planid,
                    zyid:this.params.zyid
                }).then((res) => {
                        this.bjOptions = res.data
                        // console.log(res.data)
                    }
                )
            },
            getKcOption() {
                this.$GET('/timesheetTask/getTaskKcids',
                    {
                        year:this.params.year,
                        pkjhid:this.planid,
                        zyid:this.params.zyid,
                        bjid:this.params.bjid
                    }).then((res) => {
                        this.kcOptions = res.data
                        // console.log(res.data)
                    }
                )
            },
            searchCourse() {
                this.getTable()
            },
            removeCourse() {
                this.params = {
                    year:'',
                    zyid:'',
                    bjid:'',
                    kcid:'',
                    mark:''
                }
                this.getTable()
            },
            resetTeacher() {
                this.$POST('/timesheetTask/autoRecommendTeacherInfoByPlanid/' + this.planid).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'推荐成功'
                        })
                        this.getTable()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            resetCourse() {
                this.$confirm('重置将会清空任课信息的所有设置,删除之后不可恢复','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/timesheetTask/resetPlanTimesheetTask/' + this.planid).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'重置成功'
                            })
                            //初始化数据
                            this.$GET('/timesheetTask/planedListTeachingTask/' + this.planid).then(res => {
                                if (res.code == 200) {
                                    // this.tableData = res.data.dbjx

                                    let rowSpanList = [];
                                    res.data.forEach(item => {
                                        if (item.kclb) {
                                            item.kclb.forEach((item2,index) => {
                                                rowSpanList.push(index == 0? item.kclb.length :0);
                                                this.tableData.push(item2)
                                            })
                                        }
                                    })
                                    this.rowSpanList = rowSpanList;
                                }
                            })
                        }
                    })
                })
            },
            addCourse(row) {
                //清空
                this.form.ksid = ''
                this.form.kch = ''
                this.form.kss = ''
                //赋值
                this.addDialog = true
                this.form.pkjhid = this.planid
                this.form.bh = row.bh
                this.form.bjmc = row.bjmc
                this.form.zymc = ''
                this.form.kcmc = ''
            },
            submitCourse() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$POST('/timesheetTask/add',this.form).then(res => {
                            console.log(res)
                            if (res.code == 200) {
                                this.$message({
                                    type:'success',
                                    message:'添加成功'
                                })
                                this.getTable()
                                setTimeout(() => {
                                    this.addDialog = false
                                },300)
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    }
                });
            },
            delCourse(rwh) {
                this.$GET('/timesheetTask/delete',{rwh:rwh}).then(res => {
                    if (res.code == 200) {
                        this.$confirm('此操作将删除该科目,删除之后不可恢复, 是否继续?','提示',{
                            confirmButtonText:'确定',
                            cancelButtonText:'取消',
                            type:'warning'
                        }).then(() => {
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            })
                            this.getTable()
                        })
                    }
                })
            },
            undoCourse(row) { //取消合并教学
                row.jxfs = 1
                row.yxj = 99
                this.$POST('/timesheetTask/validAndSaveTask/classInfo',row,
                    {
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }
                ).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'取消合并教学成功',
                            type:'success'
                        });
                        this.getTable()
                    } else {
                        this.$message.error(res.message);
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>
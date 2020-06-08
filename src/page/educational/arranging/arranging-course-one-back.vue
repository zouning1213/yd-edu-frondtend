<template>
    <div class="arranging-course-one pr">
        <!--添加任务约束-->
        <div class="text-right mb-20" @click="addConstraint">
            <el-button type="primary">添加约束</el-button>
        </div>
        <el-table
                :data="list"
                border
                style="width: 100%">
            <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="ysmc"
                    label="约束名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="xn"
                    label="约束学年"
                    align="center">
                <template slot-scope="scope">{{scope.row.xn}}级</template>
            </el-table-column>
            <el-table-column
                    prop="sydx"
                    label="约束对象"
                    align="center">
                <template slot-scope="scope">{{scope.row.sydx == '0000' ? '自习课' : '正常课'}}</template>
            </el-table-column>
            <el-table-column
                    prop="syfw"
                    label="适用范围"
                    align="center">
                <template slot-scope="scope">{{scope.row.syfw == '1' ? '全校' : ''}}</template>
            </el-table-column>
            <el-table-column
                    prop="ksxq"
                    label="课时详情"
                    align="center">
            </el-table-column>
            <el-table-column
                    width="200"
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" class="edit-btn" @click="openCheck(scope.row)">选择课时</el-button>
                    <el-button type="text" class="edit-btn" @click="editConstraint(scope.row)">编辑</el-button>
                    <el-button type="text" class="del-btn" @click="deleteConstraint(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--添加约束类型-->
        <el-dialog title="增加约束类型"
                   :close-on-click-moda="false"
                   :show-close="false"
                   v-if="dialogType"
                   :visible.sync="dialogType"
                   width="680px"
                   center
                   custom-class="dialog-body-auto">
            <el-form :model="form" :rules="rules" ref="ruleForm" class="el-col-22" label-width="120px">
                <el-form-item label="约束名称" prop="ysmc">
                    <el-input v-model="form.ysmc" placeholder="请输入约束名称"></el-input>
                </el-form-item>
                <el-form-item label="适用对象:">
                    <el-radio-group v-model="form.sydx">
                        <el-radio label="1">正常课</el-radio>
                        <!--<el-radio label="0000">自习课</el-radio>-->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="适用范围:">
                    <el-radio-group v-model="form.syfw">
                        <el-radio label="1">全校</el-radio>
                        <!--  <el-radio label="1">班级</el-radio>
                          <el-radio label="2">课程</el-radio>-->
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogType = false">取 消</el-button>
                <el-button type="primary" @click="submitConstraint">确 定</el-button>
            </div>
        </el-dialog>
        <!--选择约束-->
        <el-dialog title=""
                   center
                   :close-on-click-moda="false"
                   :show-close="false"
                   v-if="dialogClassHour"
                   :visible.sync="dialogClassHour"
                   :width="isNoWeek != 1 ? '1080px' : '860px'"
                   custom-class="dialog-body-auto dialog-course-header">
            <check-task-dialog ref="checkTask" :row="dialogRow" v-on:getTask="getTask"></check-task-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClassHour = false">取 消</el-button>
                <el-button type="primary" @click="submitCheck">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import checkTaskDialog from '../arranging/check-task-dialog'

    export default {
        name:"arranging-course-one",
        components:{
            checkTaskDialog
        },
        data() {
            return {
                dialogType:false, //约束类型
                dialogClassHour:false,
                year:this.$route.params.year,
                isNoWeek:this.$route.params.isNoWeek,
                //头部
                xq_num:5, //一个星期五天
                jc_num:null, //一天3节课
                isSeries:null,
                weekHours:this.$route.params.weekHours,
                weekName:['一','二','三','四','五','六','七'],
                //头部结束
                checked:[],
                checkedList:[], //已选
                dialogRow:{},
                list:[],
                tableData:[],
                form:{
                    ysmc:'', //名称
                    sydx:'1', //约束对象
                    syfw:'1', //约束范围
                    ksxq:'', //课时详情
                    xn:this.$route.params.year
                },
                rules:{
                    ysmc:[
                        {required:true,message:'请输入约束名称',trigger:'blur'}
                    ]
                },
                type:'1', //1 新增  2编辑
            }
        },
        created() {
            this.getList()
        },
        methods:{
            getList() {
                this.$GET('/timesheetRestrict/list/' + this.year).then((res) => {
                    // console.log(res)
                    this.list = res.data
                })
            },
            //添加约束类型
            addConstraint() {
                this.form = {
                    ysmc:'', //名称
                    sydx:'1', //约束对象
                    syfw:'1', //约束范围
                    ksxq:'', //课时详情
                    xn:this.year
                }
                this.dialogType = true
                this.type = '1'
            },
            //确定约束
            submitConstraint() {
                this.$refs.ruleForm.validate((valid) => {
                    //console.log(valid)
                    if (valid) {
                        if (this.type == '1') {  //新增
                            this.$POST('/timesheetRestrict/add',this.form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'添加成功'
                                    })
                                    this.dialogType = false
                                    this.getList()
                                    this.form = {
                                        ysmc:'', //名称
                                        sydx:'1', //约束对象
                                        syfw:'1', //约束范围
                                        ksxq:'', //课时详情
                                        xn:this.year
                                    }
                                }
                            })
                        }
                        else {
                            this.$POST('/timesheetRestrict/update',this.form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'编辑成功'
                                    })
                                    this.dialogType = false
                                    this.getList()
                                    this.form = {
                                        ysmc:'', //名称
                                        sydx:'1', //约束对象
                                        syfw:'1', //约束范围
                                        ksxq:'', //课时详情
                                        xn:this.year
                                    }
                                }
                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            //删除约束
            deleteConstraint(id) {
                this.$GET('/timesheetRestrict/delete',{timesheetRestrictId:id}).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        })
                        this.getList()
                    }
                })
            },
            editConstraint(row) {
                //console.log(row.ksxq)
                this.form = row
                this.type = '2'
                this.dialogType = true
            },
            //选择约束时间
            openCheck(row) {
                this.dialogClassHour = true
                this.dialogRow = row
                this.form = row
            },
            getTask(row) {
                this.$POST('/timesheetRestrict/update',row).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'选择成功'
                        })
                        this.dialogClassHour = false
                        this.getList()
                        this.form = {
                            ysmc:'', //名称
                            sydx:'1', //约束对象
                            syfw:'1', //约束范围
                            ksxq:'', //课时详情
                            xn:this.year
                        }
                    }
                })
            },
            //提交选中的
            submitCheck() {
                this.$refs.checkTask.sendData()
            },
            //发送给父组件
            sendFrom() {
                this.$emit('receivecourseOne',this.list)
            },
        },
    }
</script>

<style>

</style>

<template>
    <!--考试管理-->
    <div class="yd-educational-manage-exam">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-examination"></i></div>
                <h3>考试管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入考期名称" v-model="params.condition" class="input-with-select"
                          @keyup.enter.native="searchTitle">
                    <el-button slot="append" @click="searchTitle">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd yd-common-table pr"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <div class="yd-add-btn" style="right:14px;top:11px" @click="addExam"></div>
            <el-row class="yd-common-search">
                <el-form :inline="true" class="demo-form-inline my-demo-form" :model="params">
                    <el-form-item label="针对学期:">
                        <el-select class="cSelected" v-model="params.xq" placeholder="请选择">
                            <el-option label="所有学期" value=""></el-option>
                            <el-option
                                    v-for="item in xqOptions"
                                    :key="item.xlid"
                                    :label="item.xlxq"
                                    :value="item.xlid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="针对专业:">
                        <el-select class="cSelected" v-model="params.zyh" placeholder="请选择" @change="changeSearchZyh">
                            <el-option label="所有专业" value=""></el-option>
                            <el-option
                                    v-for="item in zyhOptions"
                                    :key="item.zyh"
                                    :label="item.zymc"
                                    :value="item.zyh">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="针对班级:">
                        <el-select class="cSelected" v-model="params.bh" placeholder="请选择">
                            <el-option label="所有班级" value=""></el-option>
                            <el-option
                                    v-for="item in classOptions"
                                    :key="item.bh"
                                    :label="item.bjmc"
                                    :value="item.bh">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchTable">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-table
                    ref="multipleTable"
                    border
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column prop="kqmc" label="考期名称" align="center"></el-table-column>
                <el-table-column prop="xqmc" label="针对学期" align="center"></el-table-column>
                <el-table-column prop="kcmc" label="针对课程" align="center"></el-table-column>
                <el-table-column prop="zymc" label="针对专业" align="center"></el-table-column>
                <el-table-column prop="bjmc" label="针对班级" align="center"></el-table-column>
                <el-table-column prop="jklsxm" label="监考教师" width="120" align="center"></el-table-column>
                <el-table-column prop="jksj" label="考试时间" align="center" width="180">
                    <template slot-scope="scope">
                        <p>{{scope.row.kskssj.substring(0,11)}}</p>
                        <p>
                            {{scope.row.kskssj.substring(12)}}-{{scope.row.ksjssj.substring(12)}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="jkdd" label="考试地点" align="center"></el-table-column>
                <el-table-column prop="kslb" label="考试类型" align="center" width="120"></el-table-column>
                <el-table-column label="操作" align="center" width="140">
                    <template slot-scope="scope">
                        <el-button class="edit-btn" @click="editExam(scope.row)" type="text" size="small"><i
                                class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button class="del-btn" @click="deleteExam(scope.$index,scope.row.ksh)" type="text"
                                   size="small"><i class="el-icon-delete"></i>删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <yd-page ref="ydPage" :url="'/examArrange/list'"
                     :params="params"
                     @changePage="changePage"></yd-page>
            <!-- 全选按钮
             <el-checkbox class="mt-20" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
        </div>
        <!--弹窗-->
        <el-dialog :visible.sync="dialogFormVisible"
                   :close-on-click-modal='false'
                   width="680px"
                   class="manage-student-scourse" @close="closeDialog">
            <el-form v-if="dialogFormVisible" ref="rulesForm" :model="examForm" :inline="true" :rules="rules"
                     label-width="83px">
                <el-form-item label="选择考期:" prop="kq">
                    <el-select v-model="examForm.kq" placeholder="请选择考试名称">
                        <el-option
                                v-for="item in kqOptions"
                                :key="item.kq"
                                :label="item.kqmc"
                                :value="item.kq">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="针对专业:" prop="zyh">
                    <el-select v-model="examForm.zyid" placeholder="请选择专业" @change="changeFormZyh">
                        <el-option
                                v-for="item in zyhOptions"
                                :key="item.zyid"
                                :label="item.zymc"
                                :value="item.zyid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="针对课程:" prop="kch">
                    <el-select v-model="examForm.kch" placeholder="请选择课程名称">
                        <el-option
                                v-for="item in kcmcOptions"
                                :key="item.kch"
                                :label="item.kcmc"
                                :value="item.kch">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="针对班级:" prop="bh">
                    <el-select v-model="examForm.bh" placeholder="请选择班级名称">
                        <el-option
                                v-for="item in bjmcOptions"
                                :key="item.bh"
                                :label="item.bjmc"
                                :value="item.bh">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试类型:" prop="kslbm">
                    <el-select v-model="examForm.kslbm" placeholder="请选择考试类型">
                        <!-- <el-option label="网考" value="1"></el-option>
                        <el-option label="实考" value="0"></el-option> -->
                        <el-option
                                v-for="item in kslxOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="监考教师:" prop="">
                    <div style="width: 218px">
                        <yd-select-zgh :zgh="examForm.jkls" :zyh="examForm.jklszyh || examForm.zyh"
                                       v-on:changeZgh="function(data) {
                                       examForm.jkls = data
                                       }"></yd-select-zgh>
                        <!--<el-input v-model="examForm.jkls" autocomplete="off"></el-input>-->
                    </div>
                </el-form-item>
                <el-form-item label="考试时间:" prop="data">
                    <el-date-picker
                            style="width: 182px"
                            v-model="examForm.data"
                            type="date"
                            format="yyyy年MM月dd日"
                            value-format="yyyy年MM月dd日"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="" label-width="0px" prop="startTime">
                    <el-time-select
                            style="width: 160px"
                            placeholder="起始时间"
                            v-model="examForm.startTime"
                            :picker-options="{
                              start: '08:30',
                              step: '00:10',
                              end: '21:30'
                            }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="" label-width="0px" prop="endTime">
                    <el-time-select
                            style="width: 160px"
                            placeholder="结束时间"
                            v-model="examForm.endTime"
                            :picker-options="{
                              start: '08:30',
                              step: '00:10',
                              end: '21:30',
                              minTime:examForm.startTime
                            }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="考试地点:" prop="jkdd">
                    <el-input v-model="examForm.jkdd" placeholder="请输入考试地点"
                              style="width:530px"></el-input>
                </el-form-item>
            </el-form>
            <div class="text-center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitExam">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ydSelectZgh from '../../components-page/select/yd-jsid-dialog-copy'

    export default {
        name:"manage-exam",
        components:{
            ydSelectZgh
        },
        data() {
            return {
                dialogFormVisible:false,
                params:{
                    xq:'',
                    zyh:'',
                    bh:'',
                    condition:'',
                    limit:12,
                },
                tableData:[],
                xqOptions:[],
                kqOptions:[],
                zyhOptions:[],
                kcmcOptions:[],
                bjmcOptions:[],
                kslxOptions:[],
                classOptions:[],
                examForm:{
                    kq:'',
                    bh:'',
                    ksh:'',
                    zyid:'',
                    kch:'',
                    bjmc:'',
                    jkls:'',
                    jkdd:'',
                    kslbm:'',
                    kskssj:'',
                    ksjssj:'',
                    jklszyh:'', //监考教师专业号
                    data:'', // 考期选择的年月日
                    startTime:'',//开始时间
                    endTime:'',//开始时间
                },
                rules:{
                    kq:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    bh:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    zyid:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    kch:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    jkls:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    jkdd:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    kslbm:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    data:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    startTime:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    endTime:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ]
                },
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
            //考试名称
            this.$GET('/examInfo/examInfoSelect',).then((res) => {
                this.kqOptions = res.data
            })
            //考试类型
            this.$GET('/system/dictList/kslbm',).then((res) => {
                this.kslxOptions = res
            })
        },
        methods:{
            changePage(data) {
                this.tableData = data
                // console.log(data)
            },
            //中间内容搜索
            searchTable() {
                this.$refs.ydPage.getData()
            },
            searchTitle() {
                this.$refs.ydPage.getData("search")
            },
            //模态提交
            submitExam() {
                this.$refs.rulesForm.validate((valid) => {
                    if (valid) {
                        this.examForm.kskssj = this.examForm.data + ' ' + this.examForm.startTime
                        this.examForm.ksjssj = this.examForm.data + ' ' + this.examForm.endTime
                        let form = {
                            kq:this.examForm.kq,
                            bh:this.examForm.bh,
                            ksh:this.examForm.ksh,
                            zyid:this.examForm.zyid,
                            kch:this.examForm.kch,
                            bjmc:this.examForm.bjmc,
                            jkls:this.examForm.jkls,
                            jkdd:this.examForm.jkdd,
                            kslbm:this.examForm.kslbm,
                            kskssj:this.examForm.kskssj,
                            ksjssj:this.examForm.ksjssj,
                        }
                        if (this.examForm.ksh) {
                            this.$POST('/examArrange/update',form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        message:'编辑成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogFormVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                        else {
                            this.$POST('/examArrange/add',form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogFormVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addExam() {
                this.closeDialog()
                this.dialogFormVisible = true
            },
            //编辑
            editExam(row) {
                console.log(row)
                this.changeOptions(row.zyh)
                this.examForm = row
                //给时间对象赋值
                this.examForm.data = row.kskssj.substring(0,11)
                this.examForm.startTime = row.kskssj.substring(12)
                this.examForm.endTime = row.ksjssj.substring(12)
                this.dialogFormVisible = true
            },
            //
            closeDialog() {
                this.examForm = {
                    kq:'',
                    kch:'',
                    bh:'',
                    ksh:'',
                    zyid:'',
                    kch:'',
                    bjmc:'',
                    jkls:'',
                    jkdd:'',
                    kslbm:'',
                    kskssj:'',
                    ksjssj:'',
                    data:'', // 考期选择的年月日
                    startTime:'',//开始时间
                    endTime:'',//开始时间
                }
            },
            //删除
            deleteExam(index,ksh) {
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/examArrange/delete',{examArrangeId:ksh}).then((res) => {
                        this.tableData.splice(index,1);
                    })
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    });
                })
            },
            //专业改变根据zyh查询班级
            changeSearchZyh() {
                this.$GET('/classInfo/classInfoSelect',{zyh:this.params.zyh}).then((res) => {
                    this.classOptions = res.data
                    this.params.bh = ''
                })
            },
            //专业改变根据zyh查询班级
            changeFormZyh() {
                this.$GET('/classInfo/classInfoSelect',{zyid:this.examForm.zyid}).then((res) => {
                    this.examForm.bjmc = ''
                    this.bjmcOptions = res.data
                })
                //初始化课程
                this.$GET('/lessonInfo/lessonInfoByZyh',{zyid:this.examForm.zyid}).then((res) => {
                    this.examForm.kch = ''
                    this.kcmcOptions = res.data
                })
            },
            //专业改变根据zyh查询班级
            changeOptions(zyid) {
                this.$GET('/classInfo/classInfoSelect',{zyid:zyid}).then((res) => {
                    this.bjmcOptions = res.data
                })
                this.$GET('/lessonInfo/lessonInfoByZyh',{zyid:zyid}).then((res) => {
                    this.kcmcOptions = res.data
                })
            },
        },
    }
</script>

<style lang="less">


</style>

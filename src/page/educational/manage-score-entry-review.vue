<template>
    <!--考试管理-->
    <div class="yd-educational-manage-exam">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-examination"></i></div>
                <h3>成绩录入审核</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <!-- <el-input placeholder="请输入考期名称" v-model="params.condition" class="input-with-select"
                          @keyup.enter.native="searchTitle">
                    <el-button slot="append" @click="searchTitle">搜索</el-button>
                </el-input> -->
                <!-- <el-input placeholder="请输入录入老师搜索" v-model="form.condition"
                          class="input-with-select1"
                          @keyup.enter.native="searchTable"> -->
                    <!-- <el-select v-model="params.xlid" slot="prepend" placeholder="请选择学期">
                        <el-option label="所有学期" value=""></el-option>
                        <el-option
                                v-for="item in xqOptions"
                                :key="item.xlid"
                                :label="item.xlxq"
                                :value="item.xlid">
                        </el-option>
                    </el-select> -->
                    <!-- <el-button slot="append" @click="searchTable">查询</el-button>
                </el-input> -->
            </el-col>
            <el-col>  
                <div style="margin-top: 20px">
                    <el-form :inline="true" :model="form">
                        <el-form-item label="学期:">
                            <el-select class="" v-model="form.xlid" placeholder="请选择"  
                                    @change="xqChange(form.xlid)">
                                <el-option label="所有学期" value=""></el-option>
                                <el-option
                                        v-for="item in xqOptions"
                                        :key="item.xlid"
                                        :label="item.xlxq"
                                        :value="item.xlid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="考试:">
                            <el-select class="" v-model="form.ksapid" placeholder="请选择">
                                <el-option label="所有考试" value=""></el-option>
                                <el-option
                                        v-for="item in ksmcOptions"
                                        :key="item.ksapid"
                                        :label="item.ksapmc"
                                        :value="item.ksapid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="专业:">
                            <el-select v-model="form.zyid" placeholder="请选择" @change="courseList">
                                <el-option label="所有专业" value=""></el-option>
                                <el-option
                                        v-for="item in majorOptions"
                                        :key="item.zyid"
                                        :label="item.zymc"
                                        :value="item.zyid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级:">
                            <el-select class="" v-model="form.bjid" placeholder="请选择">
                                <el-option label="所有班级" value=""></el-option>
                                <el-option
                                        v-for="item in classOptions"
                                        :key="item.bjid"
                                        :label="item.bjmc"
                                        :value="item.bjid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="教研组:">
                            <yd-select-dialog-tree
                                    v-if="isclearjyz"
                                    @changeKsId="changeKsId">
                            </yd-select-dialog-tree>
                        </el-form-item>
                        <el-form-item label="课程:">
                            <el-select class="" v-model="form.kcid" placeholder="请选择">
                                <el-option label="所有课程" value=""></el-option>
                                <el-option
                                        v-for="item in courseOptions"
                                        :key="item.kcid"
                                        :label="item.kcmc"
                                        :value="item.kcid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="录入教师:">
                            <el-input placeholder="请输入录入教师" v-model="form.condition"></el-input>
                        </el-form-item> 
                        <el-form-item label=" ">
                            <el-button type="info" @click="reset">重置</el-button>
                            <el-button type="primary" @click="searchTable">确定</el-button> 
                        </el-form-item> 
                    </el-form>
                </div>
            </el-col>
            
        </el-row>
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd yd-common-table pr"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
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
                <!--   <el-table-column prop="skls" label="任课教师" align="center">
                       <template slot-scope="scope">
                           <p>{{scope.row.skls||'-'}}</p>
                       </template>
                   </el-table-column>-->
                <el-table-column prop="lrr" label="录入教师" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.lrr||'-'}}</p>
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
                        <el-button class="edit-btn" @click="editExam(scope.row)" type="text">
                            <i class="el-icon-edit"></i>审核成绩
                        </el-button>
                        <el-button class="text-green" type="text">
                            <i class="el-icon-tickets icon-skin"></i>
                            <a class="icon-skin" :href="remoteHost + '/studentExamScore/exportListScoreBycjlrh?cjlrh='+scope.row.cjlrh"> 导出成绩</a> 
                        </el-button>
                        
                        <!-- <yd-export-data
                                :url="remoteHost + '/studentExamScore/exportListScoreBycjlrh?cjlrh='+scope.row.cjlrh"
                                name="成绩审核录入">
                        </yd-export-data>  -->
                    </template>
                </el-table-column>

            </el-table>
            <yd-page ref="ydPage" :url="'/scoreInputInfo/eduverifylist'"
                     :params="form"
                     @changePage="changePage"></yd-page>
            <!-- 全选按钮
             <el-checkbox class="mt-20" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
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
                        <p>{{scope.row.zhcj||'0'}}</p>
                    </template>
                </el-table-column>
            </el-table>
            <el-form :model="motaiShzt" style="margin-top:20px">
                <el-form-item label="审核状态" label-width="100">
                    <el-select v-model="motaiShzt.shzt" placeholder="请选择审核状态">
                        <el-option v-for="(item,index) in shztOptions" :key="index" :label="item.name"
                                   :value="item.code"></el-option>
                        <!-- <el-option label="通过" value="1"></el-option>
                        <el-option label="不通过" value="3"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="审核理由" label-width="100">
                    <el-input style="width:80%" type="textarea" v-model="motaiShzt.reason"></el-input>
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
    // 导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydSelectZgh from '../../components-page/select/yd-jsid-dialog-copy'
    
    import ydSelectDialogTree from "../../components-page/select/yd-tree-ksid-dialog"

    export default {
        name:"manage-score-entry-review",
        components:{
            ydSelectZgh,
            ydExportData,
            ydSelectDialogTree
        },
        data() {
            return {
                remoteHost:setting.remoteHost,
                dialogFormVisible:false,
                params:{
                    // xq:'',
                    // zyid:'',
                    // bjid:'',
                    // condition:'',
                    limit:12,
                },
                tableData:[],
                motaiData:[],
                motaiShzt:{
                    shzt:'1',
                    reason:''
                },
                currentData:{},

                xqOptions:[],
                kqOptions:[],
                zyhOptions:[],
                kcmcOptions:[],
                bjmcOptions:[],
                kslxOptions:[],
                classOptions:[],
                shztOptions:[],

                //
                form:{
                    //
                    xlid:'',
                    ksapid:'',
                    xj:'',
                    cjqj:'',
                    zyid:'',
                    bjid:'',
                    kcid:'',
                    xm:'', 
                    limit:10,
                    condition:''
                }, 
                SemesterOptions:[],
                majorOptions:[],
                courseOptions:[],
                classOptions:[],
                cjqjOptions:[],
                ksmcOptions:[],
                isclearjyz:true
            }
        },
        created() { 
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.xqOptions = res.data
            })
            //专业下拉框
            this.$GET('/majorInfo/selectList',).then((res) => {
                this.majorOptions = res.data
            })
            //考试名称
            this.$GET('/examInfo/examInfoSelect',).then((res) => {
                this.kqOptions = res.data
            })
            //考试类型
            this.$GET('/system/dictList/kslbm',).then((res) => {
                this.kslxOptions = res
            })
            //审核状态
            this.$POST('/system/dictList/SPZTM',).then((res) => {
                this.shztOptions = res
            })
        },
        methods:{
            //学期查询考试
            xqChange(xlid) {
                this.$GET("/examArrange/selectlist/teachersearch",{xlid:xlid}).then((res) => {
                    this.ksmcOptions = res.data
                })
            },
            //根据ksid查询课程下拉框
            changeKsId(ksid) {
                this.$GET("/lessonInfo/lessonInfoByksid",{ksid:ksid}).then((res) => {
                    this.courseOptions = res.data
                })
            },
            //重置
            reset() {
                this.form.xlid = ''
                this.form.ksapid = ''
                this.form.xj = ''
                this.form.cjqj = ''
                this.form.zyid = ''
                this.form.bjid = ''
                this.form.kcid = ''
                this.form.xm = ''
                this.form.xsid = ''
                this.form.condition = '' 
                this.isclearjyz = false
                this.$nextTick(()=>{
                    this.isclearjyz = true
                }) 
            },
            //专业查班级下拉框
            courseList(a) {
                this.$GET('/classInfo/classInfoSelect',{zyid:a}).then((res) => {
                    this.classOptions = res.data
                })
            },




            changePage(data) {
                this.tableData = data    
                // console.log(data)
            },
            //中间内容搜索
            searchTable() {
                this.$refs.ydPage.getData("search")
            },
            searchTitle() {
                this.$refs.ydPage.getData("search")
            },
            //模态提交
            submitExam() {
                this.currentData.lrztm = this.motaiShzt.shzt
                this.currentData.shrz = this.motaiShzt.reason
                // console.log(this.currentData)
                this.$POST('/scoreInputInfo/update',this.currentData).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        });
 
                        this.$refs.ydPage.getData()
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.message)
                    }
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
                this.dialogFormVisible = true
            },
            //
            closeDialog() {
                this.examForm = {
                    kq:'',
                    kch:'',
                    bjid:'',
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
                this.currentData = []
            },
            //专业改变根据zyh查询班级
            changeSearchZyh() {
                this.$GET('/classInfo/classInfoSelect',{zyid:this.params.zyid}).then((res) => {
                    this.classOptions = res.data
                    this.params.bjid = ''
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

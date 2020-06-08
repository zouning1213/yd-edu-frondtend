<template>
    <!--考试管理-->
    <div class="yd-educational-manage-exam">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-examination"></i></div>
                <h3>考试管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入考试名称搜索" v-model="params.condition"
                          class="input-with-select1"
                          @keyup.enter.native="searchTable">
                    <el-select v-model="params.xlid" slot="prepend" placeholder="请选择学期">
                        <el-option label="所有学期" value=""></el-option>
                        <el-option
                                v-for="item in xqOptions"
                                :key="item.xlid"
                                :label="item.xlxq"
                                :value="item.xlid">
                        </el-option>
                    </el-select>
                    <el-button slot="append" @click="searchTable">查询</el-button>
                </el-input>
                <el-button type="primary" @click="addExam">添加考试</el-button>
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
                <el-table-column prop="xqmc" label="学期" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.xqmc||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="考试名称/时间" width="200" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.ksapmc||'-'}}</p>
                        <p style="color: #999">( {{scope.row.ksjssj||'-'}} )</p>
                    </template>
                </el-table-column>
                <!--  <el-table-column prop="ksjssj" label="考试时间" align="center">
                      <template slot-scope="scope">
                          <p>{{scope.row.ksjssj||'-'}}</p>
                      </template>
                  </el-table-column>-->
                <el-table-column prop="ksrs" label="考试人数" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.ksrs||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="bjs" label="班级数" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.bjs||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="kcs" label="课程数" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.kcs||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="cjlrr" label="录入人" align="center">
                    <template slot-scope="scope">
                        <p v-if="scope.row.cjlrfl == 0">{{scope.row.cjlrr}}</p>
                        <p v-else class="text-blue">{{scope.row.cjlrr||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="cjshr" label="审核人" align="center">
                    <template slot-scope="scope">
                        <p v-if="scope.row.cjshfl == 1">{{scope.row.cjshr}}</p>
                        <p v-if="scope.row.cjshfl == 0" class="text-blue">{{scope.row.cjshr||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="lrqk" label="录入统计" align="center" width="210">
                    <template slot-scope="scope">
                        <div @click="showLrqk(scope.row.ksapid)" style="cursor:pointer">
                            <span class="text-green" style="margin-right: 6px">
                                已完成(<label class="num-label">
                                {{scope.row.commit}}</label>)
                            </span>
                            <span class="text-red">
                                待完成(<label class="num-label">
                                {{scope.row.nocommit}}</label>)
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <el-button class="edit-btn" @click="editExam(scope.row)" type="text" size="small"><i
                                class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button class="del-btn" @click="deleteExam(scope.row.ksapid)" type="text"
                                   size="small"><i class="el-icon-delete"></i>删除
                        </el-button>

                        <el-button class="text-green" type="text" size="small">
                            <i class="el-icon-tickets icon-skin"></i>
                            <a class="icon-skin" :href="remoteHost + '/scoreInputInfo/exportData?ksapid='+scope.row.ksapid"> 导出</a>
                        </el-button>

                        <!-- <yd-export-data
                                :url="remoteHost + '/scoreInputInfo/exportData?ksapid='+scope.row.ksapid"
                                name="考试管理">
                        </yd-export-data>  -->
                    </template>
                </el-table-column>

            </el-table>
            <yd-page ref="ydPage" :url="'/examArrange/eduManager'"
                     :params="params"
                     @changePage="changePage"></yd-page>
        </div>
        <!--弹窗-->
        <el-dialog :visible.sync="dialogFormVisible"
                   :close-on-click-modal='false'
                   width="680px"
                   class="manage-student-scourse" @close="closeDialog">
            <el-form v-if="dialogFormVisible" ref="rulesForm" :model="examForm" :inline="true" :rules="rules"
                     label-width="83px">

                <el-form-item label="考试名称:" prop="ksapmc">
                    <el-input v-model="examForm.ksapmc" placeholder="请输入考试名称" style="width:217px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="选择学期:" prop="xlid">
                    <el-select v-model="examForm.xlid" placeholder="请选择考试名称">
                        <el-option
                                v-for="item in xqOptions"
                                :key="item.xlid"
                                :label="item.xlxq"
                                :value="item.xlid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="针对课程:" prop="kch">
                    <el-input v-model="allKcmc" placeholder="请选择课程名称" style="width:217px"
                              @focus="kcMoTaiShow"></el-input>
                </el-form-item>
                <el-form-item label="针对班级:" prop="bh">
                    <el-input v-model="allBjmc" placeholder="请选择班级名称" style="width:217px"
                              @focus="bjMoTaiShow"></el-input>
                </el-form-item>
                <el-form-item label="录入人:" prop="kslbm">
                    <el-select v-model="examForm.kslbm" placeholder="请选择录入人类型">
                        <el-option
                                v-for="item in lrrlxOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人:" prop="cjshfl">
                    <el-select v-model="examForm.cjshfl" placeholder="请选择录入人类型">
                        <el-option
                                v-for="item in shrOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试时间:" prop="data" label-width="86px">
                    <el-date-picker
                            style="width: 160px"
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
                <div>
                    <el-form-item label="成绩录入开始时间:" prop="data" label-width="142px">
                        <el-date-picker
                                style="width: 100%"
                                v-model="examForm.cjlrsjs"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="成绩录入结束时间:" prop="data" label-width="142px">
                        <el-date-picker
                                style="width: 100%"
                                v-model="examForm.cjlrsje"
                                type="date"
                                format="yyyy年MM月dd日"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
            <div class="text-center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitExam">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 所有课程 -->
        <el-dialog :visible.sync="kcdialogFormVisible"
                   :close-on-click-modal='false'
                   width="680px"
                   class="manage-student-scourse" @close="kccloseDialog">
            <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                </el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedMotaikc" @change="handleCheckedCitiesChange">
                    <el-checkbox style="margin:5px" v-for="(item,index) in kcmcOptions" :label="item.kcid" :key="index">
                        {{item.kcmc}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <el-button type="primary" @click="submitMotaiKc">确 定</el-button>
        </el-dialog>
        <!-- 所有班级 -->
        <el-dialog :visible.sync="bjdialogFormVisible"
                   :close-on-click-modal='false'
                   width="680px"
                   class="manage-student-scourse" @close="kccloseDialog">
            <div>
                <el-checkbox :indeterminate="isIndeterminatebj" v-model="checkAllbj" @change="bjhandleCheckAllChange">
                    全选
                </el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedMotaibj" @change="bjhandleCheckedCitiesChange">
                    <el-checkbox style="margin:5px" v-for="(item,index) in bjmcOptions" :label="item.bjid" :key="index">
                        {{item.bjmc}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <el-button type="primary" @click="bjsubmitMotaiKc">确 定</el-button>
        </el-dialog>
        <!-- 录入情况查看的弹框 -->
        <el-dialog :visible.sync="lrqkdialogFormVisible"
                   :close-on-click-modal='false'
                   width="960px"
                   class="manage-student-scourse">
            <div class="yd-common-table">
                <el-table
                        ref="multipleTable"
                        border
                        :max-height="(this.$store.state.minClientHeight*0.6) + 'px'"
                        :data="cjrlXqData"
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column prop="bjmc" label="班级" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kcmc" label="课程" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.kcmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="skls" label="录入教师" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.skls||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="zgh" label="职工号" width="100" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.zgh||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lrzt" label="录入状态" align="center">
                        <template slot-scope="scope">
                            <p :class="scope.row.lrztm==1?'text-green':'text-red'">{{scope.row.lrzt||'-'}}</p>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // 导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydSelectZgh from '../../components-page/select/yd-jsid-dialog-copy'
    import {error} from 'util'

    export default {
        name:"manage-examination",
        components:{
            ydSelectZgh,
            ydExportData
        },
        data() {
            return {
                cjrlXqData:[],
                dialogFormVisible:false,
                kcdialogFormVisible:false,
                bjdialogFormVisible:false,
                lrqkdialogFormVisible:false,
                params:{
                    condition:'',
                    xlid:'',
                    limit:12,
                },
                tableData:[],
                xqOptions:[],
                zyhOptions:[],
                kcmcOptions:[],
                bjmcOptions:[],
                lrrlxOptions:[],
                classOptions:[],
                shrOptions:[],
                examForm:{
                    xlid:'',
                    bh:'',
                    ksh:'',
                    zyh:'',
                    kch:'',
                    ksapmc:'',
                    kslbm:'',
                    kskssj:'',
                    ksjssj:'',
                    jklszyh:'', //监考教师专业号
                    data:'', // 考期选择的年月日
                    startTime:'',//开始时间
                    endTime:'',//开始时间
                    cjlrsjs:'',//成绩录入开始时间
                    cjlrsje:'',//录入结束
                    cjshfl:''//成绩审核分类
                },
                rules:{
                    xlid:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    bh:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    kch:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    ksapmc:[
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
                    ],
                    cjlrsjs:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ],
                    cjlrsje:[
                        {required:true,message:'请输入必填项',trigger:'change'}
                    ]
                },

                //课程多选
                checkAll:false,
                checkedMotaikc:[],
                isIndeterminate:true,
                //班级多选
                checkAllbj:false,
                checkedMotaibj:[],
                isIndeterminatebj:true,

                //
                allKcmc:'',
                allBjmc:'',

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
            //录入人类型
            this.$GET('/system/dictList/CJLRR',).then((res) => {
                this.lrrlxOptions = res
            })
            //审核人类型
            this.$GET('/system/dictList/cjshr',).then((res) => {
                this.shrOptions = res
            })
            //课程所有
            this.$GET('/timesheetTask/getTaskKcids',).then((res) => {
                this.kcmcOptions = res.data
            })
            //班级所有
            this.$GET('/timesheetTask/getTaskBjids',).then((res) => {
                this.bjmcOptions = res.data
            })
        },
        methods:{
            //录入详情的
            showLrqk(ksapid) {
                //console.log(ksapid)
                this.$POST("/scoreInputInfo/edulrcheck",{ksapid:ksapid}).then((res) => {
                    if (res.code == 200) {
                        this.cjrlXqData = res.data || []
                        this.lrqkdialogFormVisible = true
                    } else {
                        this.$message({
                            type:'error',
                            message:res.message
                        })
                    }
                })
            },
            changePage(data) {
                this.tableData = data
            },
            //中间内容搜索
            searchTable() {
                this.$refs.ydPage.getData("search")
            },
            //模态提交
            submitExam() {
                this.$refs.rulesForm.validate((valid) => {
                    if (valid) {
                        this.examForm.kskssj = this.examForm.data + ' ' + this.examForm.startTime
                        this.examForm.ksjssj = this.examForm.data + ' ' + this.examForm.endTime

                        let form = {
                            xlid:this.examForm.xlid,
                            bjid:this.examForm.bh,
                            ksh:this.examForm.ksh,
                            kcid:this.examForm.kch,
                            ksapmc:this.examForm.ksapmc,
                            cjlrfl:this.examForm.kslbm,
                            kskssj:this.examForm.kskssj,
                            ksjssj:this.examForm.ksjssj,
                            cjlrsjs:this.examForm.cjlrsjs,
                            cjlrsje:this.examForm.cjlrsje,
                            cjshfl:this.examForm.cjshfl
                        }
                        // console.log(form)
                        if (this.examForm.ksapid) {
                            form.ksapid = this.examForm.ksapid
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
                this.examForm = row
                this.checkedMotaikc = row.kcid?[row.kcid]:row.kcids.split(',')||''
                this.checkedMotaibj = row.bjid?[row.bjid]:row.bjids.split(',')||''
                this.examForm.kslbm = row.cjlrfl
                // this.examForm.data = row.kskssj.split(' ')[0]
                // this.examForm.startTime = row.kskssj.split(' ')[1]
                // this.examForm.endTime = row.ksjssj.split(' ')[1]
                this.$set(this.examForm,'data',row.kskssj.split(' ')[0])
                this.$set(this.examForm,'startTime',row.kskssj.split(' ')[1])
                this.$set(this.examForm,'endTime',row.ksjssj.split(' ')[1])
                this.submitMotaiKc()
                this.bjsubmitMotaiKc()
                this.dialogFormVisible = true
            },
            //
            closeDialog() {
                this.examForm = {
                    xlid:'',
                    kch:'',
                    bh:'',
                    ksh:'',
                    zyh:'',
                    kch:'',
                    ksapmc:'',
                    kslbm:'',
                    kskssj:'',
                    ksjssj:'',
                    cjlrsjs:'',
                    cjlrsje:'',
                    data:'', // 考期选择的年月日
                    startTime:'',//开始时间
                    endTime:'',//开始时间
                }
                this.checkedMotaikc = []
                this.checkedMotaibj = []
                this.allKcmc = ''
                this.allBjmc = ''
            },
            //删除
            deleteExam(ksapid) {
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/examArrange/delete',{examArrangeId:ksapid}).then((res) => {
                        this.$message({
                            type:'success',
                            message:'删除成功!'
                        });
                        this.$refs.ydPage.getData("search")
                    })

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
            changeOptions(zyh) {
                this.$GET('/classInfo/classInfoSelect',{zyh:zyh}).then((res) => {
                    this.bjmcOptions = res.data
                })
                this.$GET('/lessonInfo/lessonInfoByZyh',{zyh:zyh}).then((res) => {
                    this.kcmcOptions = res.data
                })
            },
            //选课程的多选
            kccloseDialog() {
            },
            kcMoTaiShow() {
                this.kcdialogFormVisible = true
            },
            handleCheckAllChange(val) {
                // console.log(val)
                let a = []
                this.kcmcOptions.forEach((item,index) => {
                    a.push(item.kcid)
                })
                this.checkedMotaikc = val? a :[];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.kcmcOptions.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.kcmcOptions.length;
            },
            submitMotaiKc() {
                // console.log(this.checkedMotaikc)
                this.examForm.kch = this.checkedMotaikc.join(',')

                let a = ''
                this.kcmcOptions.forEach((item,index) => {
                    this.checkedMotaikc.forEach((item2,index2) => {
                        if (item.kcid == item2) {
                            a += item.kcmc + ','
                        }
                    })
                })
                // console.log(a)
                this.allKcmc = a
                // console.log(this.examForm.kch)
                this.kcdialogFormVisible = false;
            },
            //班级的多选
            bjMoTaiShow() {
                this.bjdialogFormVisible = true
            },
            bjhandleCheckAllChange(val) {

                let a = []
                this.bjmcOptions.forEach((item,index) => {
                    a.push(item.bjid)
                })
                this.checkedMotaibj = val? a :[];
                this.isIndeterminatebj = false;
            },
            bjhandleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAllbj = checkedCount === this.bjmcOptions.length;
                this.isIndeterminatebj = checkedCount > 0 && checkedCount < this.bjmcOptions.length;
            },
            bjsubmitMotaiKc() {
                // console.log(this.checkedMotaibj)
                this.examForm.bh = this.checkedMotaibj.join(',')
                // console.log(this.examForm.bh)

                let a = ''
                this.bjmcOptions.forEach((item,index) => {
                    this.checkedMotaibj.forEach((item2,index2) => {
                        if (item.bjid == item2) {
                            a += item.bjmc + ','
                        }
                    })
                })
                this.allBjmc = a

                this.bjdialogFormVisible = false;
            },

        },
    }
</script>

<style lang="less" scoped>
    .num-label {
        display: inline-block;
        min-width: 25px;
        text-align: center;
        cursor: pointer;
    }
</style>

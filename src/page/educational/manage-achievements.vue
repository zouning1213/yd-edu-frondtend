<template>
    <!--所有成绩-->
    <div class="yd-educational-grade">
        <el-row class="yd-router-title yd-bg">
            <div>
                <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
                <h3>成绩查询</h3>
            </div>
            <div style="margin-top: 20px">
                <el-form :inline="true" :model="form">
                    <el-form-item label="学期:">
                        <el-select class="" v-model="form.xlid" placeholder="请选择" style="width:260px"
                                   @change="xqChange(form.xlid)">
                            <el-option label="所有学期" value=""></el-option>
                            <el-option
                                    v-for="item in SemesterOptions"
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
                    <el-form-item label="姓名:">
                        <el-input placeholder="请输入姓名" v-model="form.xm"></el-input>
                    </el-form-item>
                    <el-form-item label="学号:">
                        <el-input placeholder="请输入学号" v-model="form.xh"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button @click="reset">清空</el-button>
                        <el-button type="primary" @click="selectby">查询</el-button>
                    </el-form-item>
                    <yd-export-data
                            :url="remoteHost + '/studentExamScore/exportEduSocreListData?xlid='+form.xlid+'&ksapid='+form.ksapid+'&zyid='+form.zyid+'&bjid='+form.bjid+'&kcid='+form.kcid+'&xm='+form.xm+'&xh='+form.xh+'&order='+form.order+'&xj='+form.xj+'&cjqj='+form.cjqj"
                            name="成绩查询">
                    </yd-export-data>
                </el-form>
            </div>
        </el-row>

        <!--表格-->
        <div class="yd-bg common-pd pr">
            <div ref="print" class="yd-common-table">
                <el-table
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :default-sort="{prop: 'outlay', order: 'descending'}"
                        @sort-change="changeSort">
                    <el-table-column prop="xqmc" label="学期" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xqmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ksapmc" label="考试名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.ksapmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kcmc" label="课程/教师" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.kcmc||'-'}}({{scope.row.skls}})</p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="skls" label="任课教师" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.skls||'-'}}</p>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="bjmc" label="班级/班主任" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc||'-'}}({{scope.row.bzr || '-'}})</p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="bzr" label="班主任" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bzr||'-'}}</p>
                        </template>
                    </el-table-column> -->
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
                    <el-table-column prop="zhcj" label="成绩" sortable="custom" align="center">
                        <template slot-scope="scope">
                            <p v-if="scope.row.zhcj">{{scope.row.zhcj}}</p>
                            <p v-else>-</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" class-name="no-print">
                        <template slot-scope="scope">
                            <el-button class="edit-btn" @click="handleClick(scope.row)" type="text" size="small">
                                <i class="el-icon-edit"></i>修改成绩
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <yd-page ref="ydPage" url="/studentExamScore/eduScoreList" :params="form"
                     @changePage="changePage"></yd-page>
        </div>
        <!--详情弹窗-->
        <el-dialog title="" v-if='dialogVisible'
                   :visible.sync="dialogVisible" width="400px"
                   :close-on-click-modal='false'
                   @close="motaiClose">
            <el-form :model="motaiform">
                <el-form-item label="成绩:" label-width="80">
                    <el-input style="width:auto" v-model="motaiform.cj" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editScore">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // 导出
    import ydExportData from '../../components-page/common/yd-export-data'

    import ydSelectDialogTree from "../../components-page/select/yd-tree-ksid-dialog"
    import gradeChild from "../../components-page/common/score-management"
    import "../css/manageGrade.less"

    export default {
        components:{
            ydExportData,
            gradeChild,
            ydSelectDialogTree
        },
        name:"manage-achievements",
        data() {
            return {
                radio:'1',
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
                    xh:'',
                    order:'desc'
                },
                SemesterOptions:[],
                majorOptions:[],
                courseOptions:[],
                classOptions:[],
                cjqjOptions:[],
                ksmcOptions:[],
                //
                show:false,
                tableData:[],
                dialogVisible:false,
                motaiform:{
                    cj:''
                },
                motaiSubmitData:{},
                isclearjyz:true
            }
        },
        methods:{
            changeSort(column) {
                if (column.order == 'ascending') {
                    this.form.order = 'asc'
                    this.$refs.ydPage.getData()
                } else {
                    this.form.order = 'desc'
                    this.$refs.ydPage.getData()
                }
            },
            //打印
            printContent() {
                this.$print(this.$refs.print) // 使用
            },
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
                this.form.xh = ''
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
            ///
            //打印
            printData() {
                this.$print(this.$refs.multipleTable) // 使用
            },
            printDataAll() {
                let allCs = {}
                allCs.url = '/studentExamScore/eduScoreList'
                allCs.radio = this.radio
                allCs.limit = 9999
                let routeData = this.$router.resolve({
                    path:"/manage/educational/manage-grade/pointAll",
                    query:allCs
                });
                window.open(routeData.href,'_blank');
            },
            //分页调用
            changePage(data) {
                this.tableData = data
            },
            //模态框出详情
            handleClick(row) {
                this.motaiform.cj = row.zhcj
                this.motaiSubmitData = row
                this.dialogVisible = true
            },
            //
            changeDialog() {
                this.dialogVisible = false
            },
            //通过条件查询
            selectby(form) {
                this.$refs.ydPage.getData("search")
            },
            //修改分数提交
            editScore() {
                this.motaiSubmitData.zhcj = this.motaiform.cj

                this.$POST('/studentExamScore/update',this.motaiSubmitData).then((res) => {
                    this.$refs.ydPage.getData("search")
                })
                this.dialogVisible = false
            },
            motaiClose() {
                this.motaiSubmitData = []
                this.motaiform.cj = ''
            }
        },
        created() {
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.SemesterOptions = res.data
            })
            //专业下拉框
            this.$GET('/majorInfo/selectList').then((res) => {
                this.majorOptions = res.data
            })
        }
    }
</script>

<style lang='less' scoped></style>
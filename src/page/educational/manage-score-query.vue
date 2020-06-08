<template>
    <!--所有成绩管理-->
    <div class="yd-educational-grade">
        <el-row class="yd-router-title yd-bg">
            <div style="margin-bottom: 20px">
                <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
                <h3>成绩统计</h3>
            </div>
            <el-form :inline="true" :model="form" label-width="50px">
                <el-form-item label="学期:">
                    <el-select class="" v-model="form.xlid" placeholder="请选择" style="width:260px"
                               @change="xqChange(form.xlid)">
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
                        <el-option
                                v-for="item in ksOptions"
                                :key="item.ksapid"
                                :label="item.ksapmc"
                                :value="item.ksapid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业:">
                    <el-select v-model="form.zyid" placeholder="请选择" @change="courseList">
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
                <el-form-item label="">
                    <el-button type="primary" @click="selectby">确定</el-button>
                </el-form-item>
                <yd-export-data
                        :url="remoteHost + '/studentExamScore/exportData?xlid='+form.xlid+'&ksnbfl='+form.ksnbfl+'&ksapid='+form.ksapid+'&zyid='+form.zyid+'&bjid='+form.bjid+'&order='+form.order+'&orderby='+form.orderby"
                        name="成绩统计">
                </yd-export-data>
            </el-form>
        </el-row>
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd pr" :style="{'minHeight':(this.$store.state.minClientHeight-258)+'px'}">
            <div class="yd-common-table">
                <el-table
                        @sort-change="searchByOrderby"
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;">
                    <el-table-column prop="bjmc" label="班级名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xh" label="学生学号" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xh||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xm" label="姓名" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xm||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(item,index) in tableHeader" :key="index" :prop="item.id" :label="item.name"
                                     align="center" sortable>
                        <template slot="label" slot-scope="scope">
                            <p class='paixu' @click.native="searchByOrderby(scope.row.id)"> {{scope.row.name||'-'}}</p>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <yd-page v-if="this.form.ksapid" ref="ydPage" -->
                <yd-page v-if="this.form.ksapid" ref="ydPage"
                         :url="'/studentExamScore/examSearch'" :params="this.form"
                         @changePage="changePage"></yd-page>
            </div>
        </div>

        <!--详情弹窗-->
        <el-dialog title="" v-if='dialogVisible'
                   :visible.sync="dialogVisible" width="400px"
                   :close-on-click-modal='false'>
            <el-form :model="motaiform">
                <el-form-item label="成绩:" label-width="80">
                    <el-input style="width:auto" v-model="motaiform.cj" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
                    ksnbfl:0,
                    xlid:'',
                    ksapid:'',
                    zyid:'',
                    bjid:'',
                    order:true,
                    orderby:''
                },
                SemesterOptions:[],
                majorOptions:[],
                courseOptions:[],
                classOptions:[],
                ksOptions:[],
                //
                show:false,
                tableData:[],
                dialogVisible:false,
                motaiform:[],
                //表头
                tableHeader:[]

            }
        },
        methods:{
            changeKsId(ksid) {
                //根据ksid查询课程下拉框
                this.$GET("/lessonInfo/lessonInfoByksid",{ksid:ksid}).then((res) => {
                    this.courseOptions = res.data
                })
            },
            //重置
            reset() {
                this.form.xlid = ''
                this.form.ksapid = ''
                this.form.zyid = ''
                this.form.bjid = ''
            },
            //专业查班级下拉框
            courseList(a) {
                //初始化班级
                this.$GET('/classInfo/classInfoSelect',{zyid:a}).then((res) => {
                    this.classOptions = res.data
                    this.form.bjid = ''
                })
            },
            ///
            //打印
            printData() {
                this.$print(this.$refs.multipleTable) // 使用
            },
            printDataAll() {
                let allCs = this.$props.form
                allCs.url = this.url
                allCs.radio = this.$props.radio
                allCs.limit = 9999
                let routeData = this.$router.resolve({
                    path:"/manage/educational/manage-grade/pointAll",
                    query:allCs
                });
                window.open(routeData.href,'_blank');
            },
            //模态框出详情
            handleClick(xh) {
                this.dialogVisible = true
            },
            //
            changeDialog() {
                this.dialogVisible = false
            },
            //通过条件查询
            selectby() {

                // this.$POST("/studentExamScore/examSearch",this.form).then((res)=>{
                //     this.tableHeader = res.data.tableHeader
                //     this.tableData = res.data.tableBody
                // })
                if(this.form.ksapid){
                    this.$refs.ydPage.getData()
                }
                
            },
            changePage(data) { 
                console.log("到这了吗")
                this.tableHeader = data? data.tableHeader:[]
                this.tableData = data? data.tableBody:[] 
                console.log(this.tableHeader)
                console.log(this.tableData)
            },
            //点击头部排序
            searchByOrderby(column,prop,order) {
                this.form.orderby = column.prop
                this.form.order = !this.form.order
                this.$refs.ydPage.getData()
            },

            //学期查询考试
            xqChange(xlid) {
                //学期查询考试
                this.$GET("/examArrange/selectlist/teachersearch",{xlid:xlid}).then((res) => {
                    this.ksOptions = res.data
                    this.form.ksapid = res.data[0]? res.data[0].ksapid:''
                    this.selectby()
                })
            },
            xqChange1(xlid) {
                //学期查询考试 
                this.$GET("/examArrange/selectlist/teachersearch",{xlid:xlid}).then((res) => {
                    this.ksOptions = res.data
                    this.form.ksapid = res.data[0]? res.data[0].ksapid:''
                    // this.$refs.ydPage.getData()
                })
            },
            //学期下拉框
            getXqOptions() {
                this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                    this.SemesterOptions = res.data
                    this.form.xlid = res.data[0].xlid

                    this.xqChange1(this.form.xlid)
                })
            },
            //专业下拉框
            getZyOptions() {
                this.$GET('/majorInfo/selectList').then((res) => {
                    this.majorOptions = res.data
                    this.form.zyid = res.data[0].zyid
                })
            },
        },
        created() {
            this.getXqOptions()
            this.getZyOptions()
        },
    }
</script>

<style lang='less' scoped>
</style>
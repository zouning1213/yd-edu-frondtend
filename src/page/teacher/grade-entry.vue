<template>
    <!--成绩录入班级-->
    <div class="teacher-grade-entry">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-entry"></i></div>
                <h3>开始录入</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <!-- <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input> -->
            </el-col>
        </el-row>
        <!-- <no-content-tip v-if="tableList == ''"
                        :title="noticeTiele"
                        :src="noContentSrc"
                        toName="teacher_grade_history"
                        button="查看历史成绩">
        </no-content-tip> -->
        <!-- <div v-else class="common-pd yd-bg yd-common-table"> -->
        <!-- <div class="common-pd yd-bg yd-common-table"> -->
            <!-- <div class="grade-entry-title mb-30">
                <h3>成绩录入时间为 {{startTime}} 至 {{overTime}} 截止
                    <router-link :to="{name:'teacher_grade_history'}">历史成绩查询</router-link>
                </h3>
            </div> -->

            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="">
                <el-tab-pane label="考试成绩录入" name="first">
                     <div class="common-pd yd-bg yd-common-table"
                          :style="{'minHeight':(this.$store.state.minClientHeight-232)+'px'}">
                        <el-table :data="tableList" border style="width: 100%">
                            <el-table-column
                                    type="index"
                                    align="center"
                                    width="80"
                                    label="序号"> 
                            </el-table-column>
                            <el-table-column
                                    prop="kcmc"
                                    align="center"
                                    label="课程">
                        <template slot-scope="scope">
                            <p>{{scope.row.kcmc||'-'}}</p>
                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="bjmc"
                                    align="center"
                                    label="班级">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc||'-'}}</p>
                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="xsrs"
                                    align="center"
                                    label="人数">
                        <template slot-scope="scope"> 
                            {{scope.row.xsrs=='0'?0:scope.row.xsrs?scope.row.xsrs:'-'}}
                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="lrzt"
                                    align="center"
                                    label="状态">
                        <template slot-scope="scope">
                            <p>{{scope.row.lrzt||'-'}}</p>
                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    align="center"
                                    label="操作">
                                <template slot-scope="scope"> 
                                        <el-button type="text"  @click="entryCourse(scope.row.cjlrh,scope.row.unchange)"><i class="el-icon-edit"></i>录入</el-button>  
                                        <!-- <el-button type="text"  @click="dialogTableVisible = true">查看</el-button>  -->
                                        <!-- <el-button class="text-green" type="text" size="">
                                            <i class="el-icon-tickets icon-skin"></i>
                                            <a class="icon-skin" :href="remoteHost + '/studentExamScore/exportListScoreBycjlrh?cjlrh='+scope.row.cjlrh"> 导出</a> 
                                        </el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="平时成绩录入" name="second">
                     <div class="common-pd yd-bg yd-common-table"
                          :style="{'minHeight':(this.$store.state.minClientHeight-232)+'px'}">
                    <!-- <div class="yd-add-btn" style="right:14px;top:11px" @click="addExam"></div> -->
                        <el-table :data="tableListTwo" border style="width: 100%">
                            <el-table-column
                                    type="index"
                                    align="center"
                                    width="80"
                                    label="序号"> 
                            </el-table-column>
                            <el-table-column
                                    prop="kcmc"
                                    align="center"
                                    label="课程">
                        <template slot-scope="scope">
                            <p>{{scope.row.kcmc||'-'}}</p>
                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="bjmc"
                                    align="center"
                                    label="班级">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc||'-'}}</p>
                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="xsrs"
                                    align="center"
                                    label="人数">
                        <template slot-scope="scope"> 
                            {{scope.row.xsrs=='0'?0:scope.row.xsrs?scope.row.xsrs:'-'}} 
                        </template>
                            </el-table-column> 
                            <el-table-column
                                    prop="address"
                                    align="center"
                                    label="操作">
                                <template slot-scope="scope"> 
                                        <el-button type="text"  @click="entryCourseTwo(scope.row)">录入</el-button>  
                                        <el-button type="text"  @click="editCourseTwo(scope.row)">修改</el-button> 
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane> 
            </el-tabs>

          
        <!-- </div> -->
        <!-- 1考试成绩录入 -->
        <el-dialog  :visible.sync="dialogTableVisible"  title="考试成绩录入" center>
            <el-table :data="motaiData" height="570px">
                <el-table-column align="center" type="index" label="序号"></el-table-column>
                <el-table-column align="center" prop="xh" label="学号"></el-table-column>
                <el-table-column align="center" prop="xm" label="姓名"></el-table-column>
                <el-table-column align="center" prop="zhcj" label="考试成绩">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.zhcj" :controls="false" :min="0" :max="100" :disabled="disabled"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
            
            <span slot="footer" class="dialog-footer" v-show="!unchange">  
                <el-button type="primary"    @click="submitOneMotaiData('0')">保存草稿</el-button>
                <el-button type="primary" @click="submitOneMotaiData('1')">提交</el-button>
                <yd-import-data
                        name="学生成绩"
                        @importSuccess="importSuccessKs"
                        :isupdata="isupdata"
                        importUrl="/scoreInputInfo/exportExcel"
                        :templateUrl="'/studentExamScore/exportListScoreBycjlrh?cjlrh='+motaicjlrh">
                </yd-import-data>
            </span>
        </el-dialog>

        <!-- 平时考试成绩录入 -->
        <el-dialog  :visible.sync="pscjdialogTableVisible" title="平时考试成绩录入" center @close='entryTwoClose'>
            <div> 
                <el-row class="row-item"> 
                    <el-form ref="form"   label-width="80px">
                        <el-form-item label="考试名称">
                            <el-input v-model="addKsName" style="width:400px"></el-input>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
            <el-table :data="motaiData3" max-height="460px">
                <el-table-column align="center" type="index" label="序号"></el-table-column>
                <el-table-column align="center" prop="xh" label="学号"></el-table-column>
                <el-table-column align="center" prop="xm" label="姓名"></el-table-column>
                <el-table-column align="center" prop="zhcj" label="考试成绩">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.zhcj" :controls="false" :min="0" :max="100" :disabled="disabled"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
            
            <span slot="footer" class="dialog-footer">
                <!-- <el-button type="primary"    @click="delTwoMotaiData">删除本次考试</el-button> -->
                <el-button type="primary" @click="submitTwoMotaiData">保存</el-button>

                <yd-import-data
                        name="学生成绩"
                        @importSuccess="importSuccess"
                        importUrl="/scoreInputInfo/exportExcel"
                        :templateUrl="'/scoreInputInfo/exportTemplate?bjid=' + pskscj.bjid + '&jsid=' + pskscj.jsid+ '&kcid=' + pskscj.kcid">
                </yd-import-data>
                <!-- <yd-export-data
                        :url="remoteHost + '/scoreInputInfo/exportExcel?bjid=' + pskscj.bjid + '&jsid=' + pskscj.jsid+ '&kcid=' + pskscj.kcid"
                        name="模板">
                </yd-export-data> -->

            </span>
        </el-dialog>
        
        <!-- 修改平时考试的 -->
        <el-dialog  :visible.sync="editdialogTableVisible"  title="修改平时考试成绩" center @close="editPsksClose"> 
            <div>
                <el-row class="row-item">
                    <el-col :span="4">
                        <span>选择学期：</span> 
                    </el-col>
                    <el-col :span="20">  
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(item,index) in xqOptions" :label="item.xlid" :key="index">{{item.xlxq}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row class="row-item">
                    <el-col :span="4">
                        <span>选择考试：</span> 
                    </el-col>
                    <el-col :span="20">  
                        <el-checkbox-group v-model="kscheckedCities" @change="kshandleCheckedCitiesChange">
                            <el-checkbox v-for="(item,index) in ksOptions" :label="item.ksapid" :key="index">{{item.ksapmc}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="editotaiData3" max-height="460px">
                <el-table-column align="center" type="index" label="序号"></el-table-column>
                <el-table-column align="center" prop="xh" label="学号"></el-table-column>
                <el-table-column align="center" prop="xm" label="姓名"></el-table-column>
                <el-table-column align="center" prop="zhcj" label="考试成绩">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.zhcj" :controls="false" :min="0" :max="100" :disabled="disabled"></el-input-number>
                    </template>
                </el-table-column>
            </el-table>
            
            <span slot="footer" class="dialog-footer">
                <el-button   @click="delThisScore">删除本次考试</el-button>
                <el-button type="primary" @click="editSubmit">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import noContentTip from '../../components-page/common/no-content-tip'
    //导入导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'

    let jsid = JSON.parse(localStorage.getItem("user")).jsid
    export default {
        name:"grade-entry",
        components:{
            ydExportData,
            ydImportData,
            noContentTip,
        },
        data() {
            return {
                unchange:false,
                motaicjlrh:'',
                remoteHost:setting.remoteHost,
                loading:true,
                search:'',
                noContentSrc:require('@/assets/no-tip-img/no-grade.png'),
                tableList:[],
                tableListTwo:[],
                startTime:null,
                overTime:null,
                noticeTiele:'',

                dialogTableVisible: false,
                activeName: 'first',
                motaiOneAlldata:{},
                motaiData:[
                    {
                        xh:'123123',
                        xm:'张三1',
                        ksfs:'66'
                    }
                ],
                motaiData3:[],
                editotaiData3:[],
                disabled:false,

                //
                pscjdialogTableVisible:false,
                //多选框添加 
                checkedCities: [],  
                xqOptions:[],

                ksOptions:[],
                kscheckedCities:[],

                //添加平时考试
                editdialogTableVisible:false,

                //所有课程名称，班级名称
                kcmcOptions:[],
                bjmcOptions:[],

                //
                motaiTwoAlldata:[],
                //
                addKsName:'',
                //正在修改的班级课程
                nowEditbjkc:[],
                pskscj:[],

                isupdata:{
                    cjlrh:''
                }
            }
        }, 
        created() {
            // console.log(jsid)
            this.$POST('/scoreInputInfo/currentScoreInput',{jsid:jsid}).then((res) => {
                // this.startTime = res.data.kqInfo.lrkssj.substring(0,11)
                // this.overTime = res.data.kqInfo.lrzjsh.substring(0,11)
                if(res.code==200){
                    this.tableList = res.data||[] 
                }else{
                    this.noticeTiele = res.message
                }
                
            })
            //拿第二个数据
            this.$GET('/teacherLesson/noPagelistByTeacherId',{jsid:jsid}).then((res) => { 
                // console.log(res)
                if(res.code==200){
                    this.tableListTwo = res.data||[] 
                }else{
                    this.noticeTiele = res.message
                }
                
            })


            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.xqOptions = res.data
            }) 
        },
        methods:{
            //导入成功回调
            //平时成绩录入
            importSuccess(data) {
                // console.log("老师自定义导入返回来的")
                // console.log(data)
                this.motaiData3 = data.data
                // this.$refs.pagination.getData()
            },
            //考试成绩录入
            importSuccessKs(data) {
                // console.log("老师自定义导入返回来的2222") 
                this.motaiData = data.data
                // this.$refs.pagination.getData()
            },
            //学期的单选
            handleClick(){}, 
            handleCheckedCitiesChange(value) { 
                if(this.checkedCities.length>1){
                    this.checkedCities.shift(this.checkedCities[0])
                }
                // console.log(this.checkedCities.join(','))
                //学期查询考试
                this.$GET("/examArrange/selectlist/teacherupdate",{xlid:this.checkedCities.join(','),bjid:this.nowEditbjkc.bjid,kcid:this.nowEditbjkc.kcid}).then((res)=>{
                    // console.log(res)
                    this.ksOptions = res.data
                })
            }, 
            kshandleCheckedCitiesChange(value){
                if(this.kscheckedCities.length>1){
                    this.kscheckedCities.shift(this.kscheckedCities[0])
                }
                // console.log(this.kscheckedCities.join(','))
                //考试查询下面学生列表
                this.$GET("/studentExamScore/listByksapid",{ksapid:this.kscheckedCities.join(',')}).then((res)=>{
                    // console.log(res)
                    this.editotaiData3 = res.data
                })
            },
            //考试的单选

            addExam(){
                this.editdialogTableVisible = true
            },
            //第一个
            entryCourse(cjlrh,unchange){
                if(unchange==1){
                    this.unchange = true
                }else{
                    this.unchange = false
                }
                
                this.motaicjlrh = cjlrh
                this.isupdata.cjlrh = cjlrh
                // this.$POST('/scoreInputInfo/detail/'+cjlrh).then((res) => {
                //      console.log(res)
                // })
                this.$GET('/studentExamScore/listBylr',{cjlrh:cjlrh}).then((res) => {
                    this.motaiOneAlldata = res.data
                    // console.log(res)
                    this.motaiData = res.data.examScoreList||[]
                    // this.disabled = res.data.scoreInputInfo.ztm==1?true:false
                    // this.passingNumber = res.data.scoreInputInfo.jgrs
                    // this.averageNumber = res.data.scoreInputInfo.pjcj
                }) 
                this.dialogTableVisible = true
            },
            //第一个模态提交
            submitOneMotaiData(ztm){ 
                let a = {
                    studentExamScoreList:this.motaiData,
                    scoreInputInfo:this.motaiOneAlldata.scoreInputInfo
                } 
                if(ztm=='1'){
                    a.scoreInputInfo.lrztm = '1'
                }
                if(ztm=='0'){
                    a.scoreInputInfo.lrztm = '0'
                } 
                //请求
                this.$POST("/studentExamScore/updateList",
                            a,
                            {
                                transformRequest : function (data) {
                                 return JSON.stringify(data);
                               },
                                headers: {'Content-Type': 'application/json'}
                            }
                            ).then((res) => { 
                            if(ztm=='1'){
                                this.$message({
                                title: '成功',
                                message: '提交成功',
                                type: 'success'
                                });
                            }else{ 
                                this.$message({
                                    title: '成功',
                                    message: '草稿保存成功',
                                    type: 'success'
                                });
                            }
                })
                this.dialogTableVisible = false
            },

            //第二个录入
            entryCourseTwo(row){
                this.pskscj = row
                this.$POST('/scoreInputInfo/teacherCreateInputInfo',{jsid:jsid,bjid:row.bjid,kcid:row.kcid}).then((res) => {
                    this.motaiTwoAlldata = res.data
                    // console.log(res)
                    this.motaiData3 = res.data.studentExamScoreList||[] 
                }) 
                this.pscjdialogTableVisible = true
            },
            //第二个模态提交
            submitTwoMotaiData(){ 

                this.motaiTwoAlldata.studentExamScores = this.motaiData3 
                let a = {
                    ksapmc:this.addKsName,
                    scoreInputInfo: this.motaiTwoAlldata.scoreInputInfo,
                    studentExamScores:this.motaiTwoAlldata.studentExamScores
                }
                if(this.addKsName){
                    //请求
                    this.$POST("/scoreInputInfo/createTeacherInput",
                                a,
                                {
                                    transformRequest : function (data) {
                                    return JSON.stringify(data);
                                },
                                    headers: {'Content-Type': 'application/json'}
                                }
                                ).then((res) => {
                                    this.$message({
                                    title: '成功',
                                    message: '提交成功',
                                    type: 'success'
                                    });
                    })
                    this.pscjdialogTableVisible = false
                }else{
                    this.$message({
                        title: '失败',
                        message: '请输入考试名称',
                        type: 'error'
                        });
                }
                
            },
            delTwoMotaiData(){
                //删除
            },//第二个模态关闭
            entryTwoClose(){
                this.addKsName = ''
                this.motaiData3 = []
            },


            //第三个修改
            editCourseTwo(row){ 
                this.nowEditbjkc = row
                this.editdialogTableVisible = true
            },//第三个修改提交
            editSubmit(){
                 let a = {
                    studentExamScoreList:this.editotaiData3,
                    scoreInputInfo:{}
                }  
                //请求
                this.$POST("/studentExamScore/updateList",
                    a,
                    {
                        transformRequest : function (data) {
                            return JSON.stringify(data);
                        },
                        headers: {'Content-Type': 'application/json'}
                    }
                    ).then((res) => {  
                        this.$message({
                        title: '成功',
                        message: '修改成功',
                        type: 'success'
                        });
                })
                this.editdialogTableVisible = false
            },//删除第三个
            delThisScore(){ 
                if(this.kscheckedCities.join(',')){
                    this.$confirm('此操作将永久删除本次考试, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$GET("/examArrange/delete",{examArrangeId:this.kscheckedCities.join(',')}).then((res)=>{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.editdialogTableVisible = false
                        })
                        
                    })
                }else{
                    this.$message({
                        type: 'error',
                        message: '请选择要删除考试!'
                    });
                }
                
            },//第三个关闭
            editPsksClose(){ 
                this.checkedCities = []
                this.kscheckedCities=[]
                this.ksOptions = []
                this.editotaiData3 = []
            }
        }
    }
</script>

<style  lang="less">
.teacher-grade-entry{
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

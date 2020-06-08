<template>
    <!--教学计划管理-->
    <div class="educational-teaching-talent">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-teaching-plan"></i></div>
                <h3>教学计划管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请根据教师姓名关键字搜索" v-model="search"
                          @keyup.enter.native="selectby" class="input-with-select">
                    <el-button slot="append" @click="selectby">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>

        <!-- 中间主体 -->
        <div class="yd-bg common-pd">
            <el-row class="yd-common-search">
                <el-col>
                    <el-form :inline="true" :model="form">
                        <el-form-item label="学期:">
                            <el-select v-model="form.Semester" placeholder="请选择">
                                <el-option label="所有学期" value=""></el-option>
                                <el-option
                                        v-for="item in form.SemesterOptions"
                                        :key="item.xlid"
                                        :label="item.xlxq"
                                        :value="item.xlid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="专业:">
                            <el-select v-model="form.major" placeholder="请选择" @change="classList">
                                <el-option label="所有专业" value=""></el-option>
                                <el-option
                                        v-for="item in form.majorOptions"
                                        :key="item.zyh"
                                        :label="item.zymc"
                                        :value="item.zyh">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年级:">
                            <el-select v-model="form.class" placeholder="请选择">
                                <el-option label="所有年级" value=""></el-option>
                                <el-option label="一年级" value="1"></el-option>
                                <el-option label="二年级" value="2"></el-option>
                                <el-option label="三年级" value="3"></el-option>
                            </el-select>
                            <!-- <el-input v-model="form.class" placeholder="请输入年级"></el-input> -->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="selectby">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="yd-common-table">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column prop="xm" label="教师名称" align="center">
                    </el-table-column>
                    <el-table-column prop="xqmc" label="学期" align="center">
                    </el-table-column>

                    <el-table-column prop="zymc" label="专业" align="center">
                    </el-table-column>

                    <el-table-column prop="nj" label="年级" align="center">
                        <template slot-scope="scope">
                            {{scope.row.nj=='1'?"一年级":scope.row.nj=='2'?"二年级":"三年级"}}
                        </template>
                    </el-table-column>

                    <!-- <el-table-column prop="zks" label="总课时" align="center">
                    </el-table-column> -->

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button class="detail-btn" @click="handleClick(scope.row)" type="text" size="small">
                                <i class="el-icon-edit"></i>详情
                            </el-button>
                            <el-button class="del-btn" @click="delClick(scope.$index,scope.row.jxjhh)"
                                       type="text"
                                       size="small"><i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>

        </div>
        <!-- 模态 -->
        <el-dialog :visible.sync="dialogTableVisible" width="600px" :close-on-click-modal='false'>
            <div class="pd-20">
                <p>教师: <span>{{motaiform.xm}}</span></p>
                <p>学期: <span>{{motaiform.xqmc}}</span></p>
                <p>专业: <span>{{motaiform.zyh}}</span></p>
                <p>年级: <span>{{motaiform.nj=='1'?"一年级":motaiform.nj=='2'?"二年级":"三年级"}}</span></p>
            </div>
            <el-table :data="motaiform.kcxx">
                <el-table-column property="kch" label="课程" align="center"></el-table-column>
                <el-table-column property="ks" label="课时" align="center"></el-table-column>
            </el-table>
            <h2>计划详情</h2>
            <div class="motai-plan-detial" v-show="showfileList">
                <p><i class="yd icon-enclosure"></i> 附件 (1个)</p>
                <div class="w-50 fl">
                    <i class="yd icon-word word"></i>
                </div>
                <div class="fl mt-10">
                    <span>课程计划详情  </span><br>
                    <el-button class="text-green" type="text" size="small"><a :href="motaiform.wordDz">下载</a>
                    </el-button>
                    <!-- <el-button class="text-green"  type="text" size="small">查看</el-button> -->
                    <el-button class="text-green" type="text" size="small"><a
                            :href="`/static/pdfjs/web/viewer.html?file=`+`${encodeURIComponent(motaiform.pdfDz)}`">查看</a>
                    </el-button>
                </div>
            </div>
            <div class="motai-plan-detial" v-show="!showfileList">无</div>
        </el-dialog>

        <yd-page  ref="ydPage" :url="'/teachingPlan/list'"
                :params="{xlid:form.Semester,zyh:form.major,nj:form.class,condition:search}"
                @changePage="changePageAll"></yd-page>

    </div>
</template>

<script>
    import "../../page/educational/css/manage-teaching-plan.less"

    export default {
        name:"manage-teaching-plan",
        data() {
            return { 
                search:"",
                token1:localStorage.getItem('token'),
                showfileList:false,
                dialogTableVisible:false,
                form:{
                    Semester:"",
                    SemesterOptions:[],
                    major:"",
                    majorOptions:[],
                    class:"",
                    classOptions:[],
                },
                motaiform:{
                    xm:"",
                    xqmc:"",
                    zyh:'',
                    nj:"",
                    kcxx:[],
                    wordDz:'',
                    pdfDz:'',
                },
                tableData:[],
            }
        },
        methods:{
            //详情
            handleClick(row) {
                var json = eval('(' + row.kcxx + ')');
                this.motaiform.xm = row.xm
                this.motaiform.xqmc = row.xqmc
                this.motaiform.zyh = row.zymc
                this.motaiform.nj = row.nj
                this.motaiform.kcxx = json
                this.motaiform.wordDz = setting.remoteHost + '/storage/fetch/' + row.xxjh || ''
                this.motaiform.pdfDz = setting.remoteHost + '/storage/fetch/' + row.xxjhpdf || ''
                // this.motaiform.xlid = row.xlid
                this.motaiform.jxjhh = row.jxjhh
                this.showfileList = row.xxjh == ''? false :true
                this.dialogTableVisible = true
            },
            //模态关闭
            motaiClose() {
                this.motaiform.xm = ''
                this.motaiform.xq = ''
                this.motaiform.zyh = ''
                this.motaiform.nj = ''
                this.motaiform.kcxx = []
                // this.motaiform.xlid = ''
                this.motaiform.wordDz = ''
                this.motaiform.jxjhh = ''
                this.showfileList = false
            },
            //删除
            delClick(index,kch) {
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/lessonInfo/delete',{lessonInfoId:kch}).then((res) => {
                        this.tableData.splice(index,1);
                    })
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    });
                })

            },
            //根据专业号查班级
            classList(a) {

            },
            searchTableData(){
                this.$GET('/teachingPlan/list',{limit:10,page:1,xlid:this.form.Semester,zyh:this.form.major,nj:this.form.class,condition:this.search}).then((res)=>{
                    this.tableData = res.data
                })
            },
            //搜索框的查询
            selectby() {
                this.$refs.ydPage.getData("search")
            },
            //顶部查询
            selectTitle() {

            },
            //表格变化
            handleSelectionChange(val) {

            },
            //分页tableData数据初始化
            changePageAll(res) {
                this.tableData = res
            }
        },
        created() {
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                // console.log("初始化学期下拉框") 
                this.form.SemesterOptions = res.data
            })
            //专业下拉框
            this.$GET('/majorInfo/selectList',).then((res) => {
                this.form.majorOptions = res.data
            })
        }
    }
</script>

<style>


</style>
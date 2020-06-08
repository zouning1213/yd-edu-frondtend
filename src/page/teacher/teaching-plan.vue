<template>
    <!--个人教学计划-->
    <div class="educational-teaching-talent">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-teaching-plan"></i></div>
                <h3>个人教学计划</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select"  @keyup.enter.native="searchBy">
                    <el-button slot="append" @click="searchBy">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>

        <!-- 中间主体 -->
        <div class="yd-bg common-pd" :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-row class="yd-common-search">
                <el-col style="position:relative">
                    <div class="yd-add-btn" style="right:-10px;top:-10px" @click="dialogTableVisible = true"></div>
                    <el-form :inline="true" :model="form">
                        <el-form-item label="学期:">
                            <el-select v-model="form.Semester1" placeholder="请选择">
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
                            <!-- <el-input v-model="form.class" placeholder="请输入内容" ></el-input> -->

                            <el-select v-model="form.class" placeholder="请选择">
                                <el-option label="所有年级" value=""></el-option>
                                <el-option label="一年级" value="一年级"></el-option>
                                <el-option label="二年级" value="二年级"></el-option>
                                <el-option label="三年级" value="三年级"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchBy">查询</el-button>
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
                    <el-table-column prop="xqmc" label="学期" align="center">
                    </el-table-column>

                    <el-table-column prop="zymc" label="专业" align="center">
                    </el-table-column>

                    <el-table-column prop="nj" label="年级" align="center">
                    </el-table-column>

                    <!-- <el-table-column prop="zks" label="总课时" align="center">
                    </el-table-column> -->

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button class="edit-btn" @click="handleClick(scope.row)" type="text" size="small"><i
                                    class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button class="del-btn" @click="delClick(scope.$index,scope.row.jxjhh)" type="text"
                                       size="small"><i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>

        <!-- 模态 -->
        <el-dialog :visible.sync="dialogTableVisible"
                   width="600px" @close="motaiClose" class="rcmotaiwrap"
                   :close-on-click-modal='false'>
            <div class="pd-20 text-center">
                <el-form :inline="true" :model="motaiform">
                    <el-form-item label="学期:">
                        <el-select v-model="motaiform.xq" placeholder="请选择">
                            <el-option
                                    v-for="item in motaiform.xqOptions"
                                    :key="item.xlid"
                                    :label="item.xlxq"
                                    :value="item.xlid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业:">
                        <el-select v-model="motaiform.zyh" placeholder="请选择" @change="classList">
                            <el-option
                                    v-for="item in motaiform.zyhOptions"
                                    :key="item.zyh"
                                    :label="item.zymc"
                                    :value="item.zyh">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级:">
                        <el-select v-model="motaiform.nj" placeholder="请选择">
                            <el-option
                                    v-for="item in motaiform.njOptions"
                                    :key="item.nj"
                                    :label="item.nj"
                                    :value="item.nj">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="motaiform.kcxx" class="motai-table" :header-cell-style="{background:'#f3f5f7'}">
                <el-table-column property="kch" label="课程" align="center">
                    <template slot-scope="scope">
                        <!-- <p>这是一段备注</p> -->
                        <el-input v-model="scope.row.kch" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column property="ks" label="课时" align="center">
                    <template slot-scope="scope">
                        <!-- <p>这是一段备注</p> -->
                        <el-input v-model="scope.row.ks" placeholder="请输入内容" type="number" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                    </template>
                </el-table-column>
                <div slot="append" style="text-align: center" class="slotAddData" @click="motaislotAdd">
                    <!--在此处添加你想要插入在表格最后一行的内容-->
                    <span>+新增</span>
                </div>
            </el-table>
            <div class="motai-plan-detial">
                <h2>计划详情</h2>
                <div v-show="showfileList">
                    <p><i class="yd icon-enclosure"></i> 附件 (1个)</p>
                    <div class="w-50 fl">
                        <i class="yd icon-word word"></i>
                    </div>
                    <div class="fl mt-10">
                        <span>{{this.wordname||'课程计划详情'}}</span><br>
                        <!-- <a :href="motaiform.wordDz+'?token='+token1" >下载</a> -->
                        <el-button class="text-green" type="text" size="small"><a :href="motaiform.wordDz">下载</a>
                        </el-button>
                        <el-button class="text-green" type="text" size="small"><a
                                :href="`/static/pdfjs/web/viewer.html?file=`+`${encodeURIComponent(motaiform.pdfDz)}`">查看</a>
                        </el-button>
                        <el-button class="text-green" type="text" size="small" @click="removeUp"><a
                                href="javascript:void(0)">删除</a></el-button>
                    </div>
                </div>
                <div v-show="!showfileList">无</div>
                <div class="upfujian" style="clear:both">
                    <!-- <el-button plain @click="upFujian">上传附件</el-button> -->
                    <el-upload
                            class="upload-demo"
                            ref="upkongjian"
                            :action="uploadaction"
                            :headers="myHeaders"
                            :on-preview="handlePreview"
                            :before-upload="beforeUpload"
                            :on-remove="handleRemove"
                            :on-success="upSuccess"
                            :before-remove="beforeRemove"
                            :multiple="false"
                            :limit=1
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
                <el-button type="primary" @click="motaiSubmit" plain>提交</el-button>
            </div>
        </el-dialog>
        <yd-page ref="ydPage" :url="'/teachingPlan/listByUser'"
                :params="{zyh:this.form.major,nj:this.form.class,xlid:this.form.Semester1,condition:this.search}"
                @changePage="changePage"></yd-page>
    </div>
</template>

<script>
    import "./css/teachingPlan.less"

    var token = localStorage.getItem('token')
    var uploadaction = setting.remoteHost + '/teachingPlan/upload'
    export default {
        name:"manage-teaching-plan",
        components:{
        },
        data() {
            return { 
                search:"",
                wordname:'',
                token1:localStorage.getItem('token'),
                showfileList:false,
                uploadaction:uploadaction,
                myHeaders:{Authorization:token},
                dialogTableVisible:false,
                fileList:[],
                yldz:'',
                form:{
                    Semester:"",
                    Semester1:"",
                    SemesterOptions:[],
                    major:"",
                    majorOptions:[],
                    class:"",
                    classOptions:[],
                },
                motaiform:{
                    xq:"",
                    xqOptions:[],
                    zyh:'',
                    zyhOptions:[],
                    nj:'',
                    njOptions:[{nj:'一年级'},{nj:'二年级'},{nj:'三年级'}],
                    kcxx:[{}],
                    wordDz:'',
                    pdfDz:'',
                    xlid:'',
                    jxjhh:""
                },
                tableData:[],
            }
        },
        methods:{
            //详情
            handleClick(row) { 
                var json = eval('(' + row.kcxx + ')');
                this.motaiform.xq = row.xlid
                this.motaiform.zyh = row.zyh
                this.motaiform.nj = row.nj
                this.motaiform.kcxx = json
                this.motaiform.wordDz = setting.remoteHost + '/storage/fetch/' + row.xxjh || ''
                this.yldz = this.motaiform.pdfDz
                this.motaiform.pdfDz = setting.remoteHost + '/storage/fetch/' + row.xxjhpdf || ''

                // this.motaiform.xlid = row.xlid
                this.motaiform.jxjhh = row.jxjhh
                this.showfileList = row.xxjh == ''? false :true
                //  console.log(this.motaiform.wordDz)
 
                this.dialogTableVisible = true
            },
            //模态关闭
            motaiClose() {
                this.wordname = ''
                this.motaiform.xq = ''
                this.motaiform.zyh = ''
                this.motaiform.nj = ''
                this.motaiform.kcxx = [{}]
                // this.motaiform.xlid = ''
                this.motaiform.wordDz = ''
                this.motaiform.jxjhh = ''
                this.showfileList = false
            },
            //模态提交
            motaiSubmit() {
                // console.log("模态提交")
                let a = {
                    xlid:this.motaiform.xq,
                    zyh:this.motaiform.zyh,
                    nj:this.motaiform.nj,
                    kcxx:JSON.stringify(this.motaiform.kcxx),
                    xxjh:this.motaiform.wordDz,
                    xxjhpdf:this.motaiform.pdfDz,
                    zgh:JSON.parse(localStorage.getItem("user")).account
                }
                if (this.motaiform.jxjhh) {
                    a.jxjhh = this.motaiform.jxjhh
                    // console.log("编辑提交") 

                    this.$POST('/teachingPlan/update',a).then((res) => {
                        this.$message({
                            title:'成功',
                            message:'编辑成功',
                            type:'success'
                        });
                        this.$refs.ydPage.getData()
                    })
                } else {
                    // console.log("添加提交") 
                    this.$POST('/teachingPlan/add',a).then((res) => {
                        this.$message({
                            title:'成功',
                            message:'添加成功',
                            type:'success'
                        });
                        this.$refs.ydPage.getData()
                    })
                }

                this.dialogTableVisible = false
            },
            //删除
            delClick(index,ksh) {
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/teachingPlan/delete',{teachingPlanId:ksh}).then((res) => {
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
            //搜索框的查询
            selectby() { 
                this.form.Semester = this.form.Semester1
            },
            //表格变化
            handleSelectionChange(val) {

            },
            //模态添加
            motaislotAdd() {
                let a = {kc:'',ks:''}
                this.motaiform.kcxx.push(a)
            },
            //上传前钩子
            beforeUpload(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'docx'
                if (!extension) {
                    this.$message({
                        message:'上传文件只能是docx格式!',
                        type:'warning'
                    });
                }
                return extension
            },
            //上传成功
            upSuccess(response,file,fileList) {
                // console.log("上传成功回调")
                // console.log(file)
                this.wordname = file.name

                this.showfileList = true
                //下载地址
                this.motaiform.wordDz = setting.remoteHost + '/storage/fetch/' + response.data.org
                this.motaiform.pdfDz = setting.remoteHost + '/storage/fetch/' + response.data.pdf

                // console.log(this.motaiform.pdfDz)
                // console.log(fileList)
            },
            handleRemove(file,fileList) {

                this.showfileList = false
                // console.log(file,fileList);
            },//点中上传文件的钩子
            handlePreview(file) {
                // console.log(file);
            },
            handleExceed(files,fileList) {
                this.$message.warning(`只能上传一个文件 `);
            },
            beforeRemove(file,fileList) {
                return this.$confirm(`确定移除 ${ file.name }?`);
            },
            //删除上传文件时候
            removeUp() {
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$refs.upkongjian.clearFiles()
                    this.showfileList = false
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    });
                })
            },
            //点击下载的钩子
            getTableData() {
                this.$GET('/teachingPlan/listByUser',{limit:10,page:1}).then((res) => {
                    // console.log("初始tableData") 
                    this.tableData = res.data 
                })
            },
            //分页tableData数据初始化
            changePage(res) {
                // console.log("分页床过来的") 
                this.tableData = res
            },
            searchBy() { 
                this.$refs.ydPage.getData('search')
            }
        },
        created() {
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                // console.log("初始化学期下拉框") 
                this.form.SemesterOptions = res.data
                this.motaiform.xqOptions = res.data
                // console.log(this.form.SemesterOptions)
            })
            //专业下拉框
            this.$GET('/majorInfo/selectList',).then((res) => {
                // console.log("初始化专业下拉框") 
                this.form.majorOptions = res.data
                this.motaiform.zyhOptions = res.data
            })
        },
        computed:{
            isxq() {
                this.getTableData()
                return this.form.Semester
            }
        }
    }
</script>

<style lang="less">
.rcmotaiwrap{
    .el-dialog{
        height: 600px;
        overflow: inherit;
    }
}

</style>
<template>
    <!--学生选课管理-->
    <div class="yd-meducational-students-selectCourse">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-task"></i></div>
                <h3>学生选课管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入课程名称" v-model="params.condition" class="input-with-select"
                          @keyup.enter.native="searchForm">
                    <el-button slot="append" @click="searchForm">搜索</el-button>
                </el-input>
                <el-button @click="addCourse" type="primary" class="ml-30">
                    <i class="el-icon-circle-plus-outline"></i> 新增选课
                </el-button>
            </el-col>
        </el-row>

        <!-- 学生选课 管理 -->
        <!-- 中间主体 -->
        <div class="yd-bg common-pd manage-student-scourse"
             :style="{'minHeight':(this.$store.state.minClientHeight-146)+'px'}">
            <!-- 选课的表格 -->
            <div class="yd-common-table yd-students-course">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            prop="nj"
                            label="年级"
                            width="100">
                        <template slot-scope="scope">
                            <p>{{scope.row.nj==1?'一年级':scope.row.nj==2?'二年级':scope.row.nj==3?'三年级':'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="zymc"
                            label="专业名称">
                        <template slot-scope="scope">
                            <p>{{scope.row.zymc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="kc"
                            label="课程名称">
                        <template slot-scope="scope">
                            <p>{{scope.row.kc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="kcnr"
                            label="课程内容">
                        <template slot-scope="scope">
                            <p class="line-2-my">{{scope.row.kcnr||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sklsmc"
                            label="授课教师">
                        <template slot-scope="scope">
                            <p>{{scope.row.sklsmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="lsjj"
                            width=""
                            label="教师简介">
                        <template slot-scope="scope">
                            <p class="line-2-my">{{scope.row.lsjj||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="xkid"
                            width="100"
                            label="课程序号">
                        <template slot-scope="scope">
                            <p>{{scope.row.xkid||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="ks"
                            width="100"
                            label="总课时数">
                        <template slot-scope="scope">
                            <p>{{scope.row.ks||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="kxrs"
                            width="100"
                            label="可选人数">
                        <template slot-scope="scope"> 
                            {{scope.row.kxrs=='0'?0:scope.row.kxrs?scope.row.kxrs:'-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            width="180">
                        <template slot-scope="scope">
                            <el-button class="edit-btn" @click="editCourse(scope.row)" type="text" size="small">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button class="del-btn" @click="deleteCourse(scope.row)" type="text" size="small">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <yd-page url="/studentLessonSelect/list" ref="ydPage" :params="params" @changePage="changePage"></yd-page>
        </div>
        <!--成绩管理详情编辑 查看弹窗-->
        <el-dialog title="学生选课管理" center width="820px"
                    z-index="1000"
                   custom-class="select-course-dialog"
                   :close-on-click-modal='false'
                   :visible.sync="dialogFormVisible"
                   @close="closeModal">
            <el-form :rules="rules" ref="ruleForm" v-if="dialogFormVisible"
                     :model="courseForm" class="el-row" label-width="90px">
                <el-col :span="22" :offset="1">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="入学年级:" prop="nj">
                                <el-select v-model="courseForm.nj" placeholder="请选择年级">
                                    <el-option label="一年级" value="1"></el-option>
                                    <el-option label="二年级" value="2"></el-option>
                                    <el-option label="三年级" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="可选人数:" prop="kxrs">
                                <input type="number" v-model="courseForm.kxrs" placeholder="请输入可选人数"
                                       onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="课程名称:" prop="kc">
                                <el-input v-model="courseForm.kc" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="总课时数:" prop="ks">
                                <input type="number" v-model="courseForm.ks" placeholder="请输入课时数"
                                       onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))">
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="选择专业:" prop="zyid">
                                <el-select v-model="courseForm.zyid" placeholder="请选择专业">
                                    <el-option
                                            v-for="item in zyhOptions"
                                            :key="item.code"
                                            :label="item.zymc"
                                            :value="item.zyid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <el-form-item label="授课教师:" prop="skls">
                                <el-input v-model="courseForm.sklsmc" placeholder="请输入教师名称"  @focus="openBzrDialog"></el-input> 
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="教师简介:" prop="lsjj">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 4}"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="courseForm.lsjj">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="课程内容:" prop="kcnr">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 4}"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="courseForm.kcnr">
                            </el-input>
                        </el-form-item>
                    </el-row>
                    <div class="text-center">
                        <el-button @click="closeModal">取消</el-button>
                        <el-button type="primary" @click="submitModal">提 交</el-button>
                    </div>
                </el-col>
            </el-form>
        </el-dialog>
 
        <!--选择班主任弹窗-->
        <el-dialog
                v-if="bzrDialogVisible"
                :close-on-click-modal='false'
                z-index="1001"
                :modal="true"
                :show-close="false"
                :visible.sync="bzrDialogVisible"
                width="600px"
                :before-close="closeDialog">  
                <yd-select-jsid-tree ref="selectJsidTree"
                        :jsid="courseForm.skls"
                        v-on:checkedJsId="checkedJsId"></yd-select-jsid-tree> 
            <div style="margin: 10px auto 20px" class="text-center">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitBzr">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import ydSelectJsidTree from '../../components-page/select/yd-tree-jsid-jsmc-dialog'
    import "./css/manageStudentSelectCourse.less"  

    export default {
        name:"manage-students-selectCourse",
        components:{
            ydSelectJsidTree, 
        },
        data() {
            return {
                bzrDialogVisible:false, //选择班主任弹窗
                search:'',
                search1:'',
                params:{
                    condition:'',
                    limit:10
                },
                dialogFormVisible:false,
                courseForm:{
                    xkid:'',
                    kc:'',
                    zyid:'',
                    kxrs:'',
                    nj:'',
                    skls:'',
                    ks:'',
                    lsjj:'',
                    kcnr:''
                },
                rules:{
                    kc:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    zyid:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    kxrs:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    nj:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    skls:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    ks:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    /*  lsjj:[
                          {required:true,message:'请输入必填项',trigger:'blur'}
                      ],
                      kcnr:[
                          {required:true,message:'请输入必填项',trigger:'blur'}
                      ],*/
                },
                //专业下拉框
                zyhOptions:[],
                tableData:[]
            }
        },
        created() {
            //专业下拉框
            this.$GET('/majorInfo/selectList',).then((res) => {
                this.zyhOptions = res.data
            })
        },
        methods:{
            checkedJsId(data) { 
                this.courseForm.skls = data[0].value 
                this.courseForm.sklsmc = data[0].label
                this.bzrDialogVisible = false 
            },
            submitBzr() { //确定班主任
                this.$refs.selectJsidTree.submitTree()
            },
            closeDialog() {//专业号弹窗关闭   
                this.bzrDialogVisible = false
                this.$refs.ydPage.getData()
            },
            //打开班主任模态
            openBzrDialog() { 
                this.bzrDialogVisible = true
            }, 

            changePage(data) {
                this.tableData = data
            },
            addCourse() {
                this.emptyCourseForm()
                this.dialogFormVisible = true
            },
            editCourse(row) { 
                this.courseForm = row;
                this.dialogFormVisible = true
            },
            deleteCourse(row) {
                let title = row.kc
                this.$confirm('当前选择删除' + title + '课程' + '删除之后不可恢复','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/studentLessonSelect/delete',{studentLessonSelectId:row.xkid}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            })
                            this.$refs.ydPage.getData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            //模态关闭清空数据
            closeModal() {
                this.dialogFormVisible = false
                this.emptyCourseForm()
                this.$refs.ydPage.getData()
            },
            //模态提交
            submitModal() {
                // console.log(this.courseForm)
                if (this.courseForm.xkid) {
                    this.$POST('/studentLessonSelect/update',this.courseForm).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message:'编辑成功',
                                type:'success'
                            });
                            this.dialogFormVisible = false
                            this.$refs.ydPage.getData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            this.$POST('/studentLessonSelect/add',this.courseForm).then((res) => {
                                if (res.code = 200) {
                                    this.$message({
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    this.dialogFormVisible = false
                                    this.$refs.ydPage.getData()
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }
            },
            searchForm() {
                this.$refs.ydPage.getData('search')
                this.params.condition = ''
            },
            emptyCourseForm() {
                let form = {
                    kc:'',
                    xkid:'',
                    zyid:'',
                    kxrs:'',
                    nj:'',
                    skls:'',
                    lsjj:'',
                    ks:'',
                    kcnr:''
                }
                this.courseForm = form
            }
        }
    }
</script>

<style>
    .yd-meducational-students-selectCourse .line-2-my {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
    }
</style>
<template>
    <!--课程管理-->
    <div class="yd-educational-course">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-course"></i></div>
                <h3>课程管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入课程名称搜索" v-model="params.condition" class="input-with-select"
                          @keyup.enter.native="searchCourse">
                    <el-button slot="append" @click="searchCourse">搜索</el-button>
                </el-input>
                <el-button @click="addCourse" type="primary" style="margin-left: 10px">添加课程</el-button>
                <yd-import-data
                        toPathName='教研组'
                        ruleUrl='/departmentInfo/list'
                        toPathUrl='educational_department'
                        name="课程"
                        @importSuccess="importSuccess"
                        importUrl="/lessonInfo/exportExcel"
                        templateUrl="/lessonInfo/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/lessonInfo/exportData?ksids='+params.ksids"
                        name="课程">
                </yd-export-data>
            </el-col>
        </el-row>

        <!--中间主体-->
        <div class="yd-bg common-pd yd-common-flex">
            <div class="common-left-tree">
                <yd-select-tree ref="selectTree" :ksid="this.$route.query.ksid||''" v-on:checkedKsId="checkedKsId"></yd-select-tree>
            </div>
            <div class="common-right-table">
                <!-- <el-row class="yd-tabs-header pr">
                    <div class="yd-add-btn" style="right:-10px;top:-10px" @click="addCourse"></div>
                </el-row> -->
                <!-- 课程 -->
                <div class="yd-common-table">
                    <el-table border :data="tableData"
                              style="width: 100%"
                              :max-height="this.$store.state.minClientHeight-277">
                        <el-table-column prop="ksmc" label="教研组名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.ksmc||'-'}}</p>
                        </template>
                        </el-table-column>
                        <el-table-column prop="kcmc" label="课程名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.kcmc||'-'}}</p>
                        </template>
                        </el-table-column>
                        <el-table-column prop="kch" label="课程号" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.kch||'-'}}</p>
                        </template>
                        </el-table-column>
                        <!-- <el-table-column prop="zkss" label="总课时" width="120" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.zkss||'-'}}</p>
                        </template>
                        </el-table-column> -->
                        <el-table-column prop="wsjxzk" label="考试类型" align="center">
                            <template slot-scope="scope">
                                <!-- {{scope.row.wsjxzk=='1'?"网考":scope.row.wsjxzk=='0'?"实考":'-'}} -->
                                {{scope.row.wsjxzkmc}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="kcsx" label="课程属性" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.kcsx||'-'}}</p>
                        </template>
                        </el-table-column>
                        <el-table-column prop="kclb" label="课程类别" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.kclb||'-'}}</p>
                        </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="160px">
                            <template slot-scope="scope">
                                <el-button class="edit-btn" @click="editCourse(scope.row)" type="text" size="small">
                                    <i
                                            class="el-icon-edit"></i>编辑
                                </el-button>
                                <el-button class="del-btn" @click="deleteCourse(scope.$index,scope.row.kcid)"
                                           type="text"
                                           size="small"><i class="el-icon-delete"></i>删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--v-if="params.ksid"-->
                <yd-page ref="ydPage" url="/lessonInfo/list" :params="params" :ispageSize='20'
                         @changePage="changePage"></yd-page>
            </div>
        </div>
        <!-- 模态 -->
        <el-dialog :visible.sync="dialogTableVisible" width="680px"
                   :close-on-click-modal='false'
                   :close-on-press-escape="false"
                   :title="diaglogTitle"
                   @close="modalClose">
            <el-form :model="courseForm" :rules="rules" ref="ruleForm"
                     v-if="dialogTableVisible"
                     class="el-row" label-width="100px">
                <el-col :span="12">
                    <el-form-item label="课程名称:" prop="kcmc">
                        <el-input v-model="courseForm.kcmc" placeholder="请输入课程名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="课程简称:">
                        <el-input v-model="courseForm.kcjc" placeholder="请输入课程简称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="课程号:" prop="kch">
                        <el-input v-model="courseForm.kch" placeholder="请输入课程号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="总课时:" prop="zkss">
                        <el-input v-model.number="courseForm.zkss" autocomplete="off" placeholder="请输入总课时数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="考试类型:" prop="wsjxzk">
                        <el-select v-model="courseForm.wsjxzk" style="width: 100%"
                                   placeholder="请选择考试类型">
                            <el-option v-for="(item,index) in ksxzmOptions" :key="index" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属教研组:" prop="ksid">
                        <yd-select-dialog-tree :ksid="courseForm.ksid"
                                               @changeKsId="changeKsId">
                        </yd-select-dialog-tree>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="课程属性:" prop="kcnbfl">
                        <el-select v-model="courseForm.kcnbfl" style="width: 100%"
                                   placeholder="请选择课程属性">
                            <el-option v-for="(item,index) in kcnbflOptions" :key="index"  :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="课程类别:" prop="kclbm">
                        <el-select v-model="courseForm.kclbm" style="width: 100%"
                                   placeholder="请选择课程类别">
                            <el-option v-for="(item,index) in kclbmOptions" :key="index"  :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24" class="text-center">
                    <el-button @click="modalClose">取消</el-button>
                    <el-button type="primary" @click="submitCourse">保存</el-button>
                </el-col>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import ydSelectDialogTree from '../../components-page/select/yd-tree-ksid-dialog'
    import ydSelectTree from '../../components-page/select/yd-tree-ksid-array'

    //导入导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'
    export default {
        name:"manage-courses",
        components:{
            ydSelectDialogTree,
            ydSelectTree,
            ydExportData,
            ydImportData,
        },
        data() {
            return {
                diaglogTitle:"添加课程",
                params:{
                    condition:'',
                    ksids:'',
                    limit:20
                },
                dialogTableVisible:false,
                courseForm:{
                    kcid:'',
                    kch:'',
                    kcmc:'',
                    zkss:'',
                    wsjxzk:'',
                    ksid:'',
                    ksmc:'',
                    kcjc:'',
                    kcnbfl:'',
                    kclbm:''
                },
                rules:{
                    kcmc:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    kcjc:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    kch:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    ksid:[
                        {required:true,message:'请选择教研组',trigger:'change'}
                    ],
                    zkss:[
                        {required:true,message:'请输入必填项',trigger:'blur'},
                        {type:'number',message:'课时数必需为数字'}
                    ],
                    wsjxzk:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    kcnbfl:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                },
                tableData:[],
                zyhOptions:[],
                kcnbflOptions:[],
                kclbmOptions:[],
                ksxzmOptions:[]
            }
        },
        created() {
            //专业下拉框
            this.$GET('/majorInfo/selectList',).then((res) => {
                this.zyhOptions = res.data
            })

            //课程属性下拉框
            this.$POST('/system/dictList/kcsxm').then((res) => {
                this.kcnbflOptions = res
            })
            //课程类别下拉框
            this.$POST('/system/dictList/kclbm').then((res) => {
                this.kclbmOptions = res
            })
            //考试性质码下拉框
            this.$POST('/system/dictList/KSXZM').then((res) => {
                this.ksxzmOptions = res
            })

            this.checkedKsId(this.$route.query.ksid||'')
        },
        methods:{
            //导入成功回调
            importSuccess(){
                this.$refs.ydPage.getData()
            },
            checkedKsId(ksids) {
                // console.log(ksids)
                this.params.condition = ''
                this.params.ksids = ksids
                this.$nextTick(() => {
                    this.$refs.ydPage.getData()
                })
            },
            changeKsId(data) {
                // console.log(data)
                this.$set(this.courseForm,'ksid',data)
            },
            //分页tableData数据初始化
            changePage(res) {
                this.tableData = res
            },
            addCourse() {
                this.removeForm()
                this.diaglogTitle = '添加课程'
                this.dialogTableVisible = true
            },
            //编辑
            editCourse(row) {
                this.diaglogTitle = '编辑课程'
                // console.log(row)
                this.removeForm()
                this.courseForm = row
                this.dialogTableVisible = true
            },
            //删除
            deleteCourse(index,kcid) {
                this.$confirm('是否删除该课程','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/lessonInfo/delete',{lessonInfoId:kcid}).then((res) => {
                        if (res.code == 200) {
                            this.tableData.splice(index,1);
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.$refs.ydPage.getData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            //搜索框的查询
            searchCourse() {
                this.params.ksids = ''
                this.$refs.selectTree.removeNode()
                this.$refs.ydPage.getData('search')
            },
            //提交最后保存提交数据
            submitCourse() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.courseForm.kcid) {
                            this.$POST('/lessonInfo/update',this.courseForm).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        message:'修改成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogTableVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                        else {
                            this.$POST('/lessonInfo/add',this.courseForm).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogTableVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            //模态关闭
            modalClose() {
                this.dialogTableVisible = false
                this.removeForm()
            },
            removeForm() {
                this.courseForm = {
                    kcid:'',
                    kch:'',
                    kcmc:'',
                    zkss:'',
                    wsjxzk:'',
                    ksid:'',
                    ksmc:''
                }
            }
        },
    }
</script>

<style lang="less">

</style>

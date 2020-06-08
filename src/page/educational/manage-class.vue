<template>
    <!--班级管理-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-class-management"></i></div>
                <h3>班级管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="按班级名称关键字搜索" v-model="params.condition" @keyup.enter.native="searchTitle"
                          class="input-with-select">
                    <el-button slot="append" @click="searchTitle">搜索</el-button>
                </el-input>
                <el-button type="success" @click="addClass">添加班级</el-button>
                <yd-import-data 
                        toPathName='专业'
                        ruleUrl='/majorInfo/list'
                        toPathUrl='educational_professional'
                        name="班级"
                        @importSuccess="importSuccess"
                        importUrl="/classInfo/exportExcel"
                        templateUrl="/classInfo/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/classInfo/exportData?zyids=' + params.zyids"
                        name="专业班级"></yd-export-data>
            </el-col>
        </el-row>

        <div class="yd-bg yd-common-flex common-pd">
            <div class="common-left-tree">
                <yd-select-zy-tree ref="selectTree" v-on:checkedZyId="checkedZyId"></yd-select-zy-tree>
            </div>
            <!-- 班级列表-->
            <div class="common-right-table yd-common-table">
                <el-table border ref="multipleTable" :data="tableList"
                          empty-text="暂无班级"
                          :max-height="this.$store.state.minClientHeight-277">
                    <el-table-column prop="zymc" label="专业名称" align="center">
                    </el-table-column>
                    <el-table-column prop="bjmc" label="班级名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级类型" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjlxm==0?"普通班":scope.row.bjlxm==1?"重点班":'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xsrs" label="班级人数" align="center">
                        <template slot-scope="scope">
                            {{scope.row.xsrs=='0'?0:scope.row.xsrs?scope.row.xsrs:'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="班主任" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.jsid == ''">
                                <el-button class="edit-btn" type="text" size="small"
                                           @click="openBzrDialog(scope.row)">
                                    点击选择班主任
                                </el-button>
                            </template>
                            <template v-else>
                                <el-button class="edit-btn" type="text" size="small"
                                           @click="openBzrDialog(scope.row)">
                                    {{scope.row.xm}}
                                </el-button>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级操作" align="center" width="250">
                        <template slot-scope="scope">
                            <el-button @click="openBjDialog(scope.row)" class="edit-btn" type="text" size="small"><i
                                    class="el-icon-edit"></i>学生管理
                            </el-button>
                            <el-button @click="editClass(scope.row)" class="edit-btn" type="text" size="small"><i
                                    class="el-icon-edit"></i>编辑班级
                            </el-button>
                            <el-button @click="deleteClass(scope.row)" class="del-btn" type="text" size="small"><i
                                    class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <yd-page ref="ydPage" :url="'/classInfo/list'" @changePage="changePage"
                         :params="params"></yd-page>
            </div>
        </div>
        <!--选择班主任弹窗-->
        <el-dialog
                v-if="bzrDialogVisible"
                :close-on-click-modal='false'
                z-index="1000"
                :modal="true"
                :show-close="false"
                :visible.sync="bzrDialogVisible"
                width="600px"
                :before-close="closeDialog">
            <yd-select-jsid-tree ref="selectJsidTree"
                                 :jsid="rowData.jsid"
                                 v-on:checkedJsId="checkedJsId"></yd-select-jsid-tree>
            <div style="margin: 10px 0 0 28px " >
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitBzr">确 定</el-button>
            </div>
        </el-dialog>
        <!--更改学生班级-->
        <el-dialog v-if="bjDialogFormVisible" center
                   :close-on-click-modal='false'
                   width="860px"
                   :visible.sync="bjDialogFormVisible">
            <class-student-edit @deitMotaibjClose='deitMotaibjClose' :bjid="rowData.bjid"
                                :zyid="rowData.zyid"></class-student-edit>
        </el-dialog>
        <!--添加班级弹窗-->
        <el-dialog
                v-if="dialogVisible"
                :title="!form.bjid?'添加班级':'编辑班级'"
                :visible.sync="dialogVisible"
                center
                width="480px">
            <el-row>
                <el-col :span="22">
                    <el-form ref="ruleForm" :model="form" label-width="100px" :rules="rules">
                        <el-form-item label="班级名称:" prop="bjmc">
                            <el-input v-model="form.bjmc" placeholder="请输入班级名称"></el-input>
                        </el-form-item>
                        <el-form-item label="班级班号:" prop="bh">
                            <el-input v-model="form.bh" placeholder="请输入班号"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="班级类型:">
                            <el-select v-model="form.bjlxm" placeholder="请选择班级类型">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>-->
                        
                        <el-form-item  label="班级类型:"  prop="bjlxm">
                            <el-select v-model="form.bjlxm" placeholder="请选择班级类型" style="width: 100%">
                                <el-option v-for="(item,index) in bjlxOptions" :key="index"
                                           :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="!form.bjid" label="班级级数:"  prop="bjjs">
                            <el-select v-model="form.bjjs" placeholder="请选择班级级数" style="width: 100%">
                                <el-option v-for="(item,index) in bjjsOptions" :key="index"
                                           :label="item.year+'级'"
                                           :value="item.year"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="!form.bjid" label="班级专业:"  prop="zyid">
                            <el-select v-model="form.zyid" placeholder="请选择专业" style="width: 100%">
                                <el-option v-for="(item,index) in zyidOptions" :key="index"
                                           :label="item.zymc"
                                           :value="item.zyid"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
                <div class="dialog-footer text-center">
                    <el-button @click="removeForm">取 消</el-button>
                    <el-button type="primary" @click="submitClass">确 定</el-button>
                </div>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    // import ydSelectJsidTree from '../../components-page/select/yd-tree-jsid-dialog-new'//新的又不要了的班主任弹框版本
    import ydSelectJsidTree from '../../components-page/select/yd-tree-jsid-dialog'
    import ydSelectZyTree from '../../components-page/select/yd-tree-zyid-array'
    import classStudentEdit from '../../components-page/educational/class-student-edit'

    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'

    export default {
        components:{
            ydSelectJsidTree,
            ydSelectZyTree,
            classStudentEdit,
            ydExportData,
            ydImportData
        },
        name:"manage-class",
        data() {
            return {
                form:{
                    bh:'',
                    bjmc:'',
                    bjlxm:'',
                    bjjs:'',
                    zyid:'',
                    xsrs:'0'
                },
                rules:{
                    bjmc:[
                        {required:true,message:'请输入班级名称',trigger:'change'}
                    ],
                    bh:[
                        {required:true,message:'请输入班号',trigger:'change'}
                    ],
                    bjjs:[
                        {required:true,message:'请选择班级级数',trigger:'change'}
                    ],
                    zyid:[
                        {required:true,message:'请选择专业',trigger:'change'}
                    ],
                    bjlxm:[
                        {required:true,message:'请选择班级类型',trigger:'change'}
                    ],
                },
                bjjsOptions:[],
                zyidOptions:[],
                bzrDialogVisible:false, //选择班主任弹窗
                bjDialogFormVisible:false, //更改学生班级弹窗
                dialogVisible:false, //添加班级弹窗
                params:{
                    zyids:'',
                    condition:''
                },
                rowData:{},
                tableList:[],
                checkedZgh:[], //传递给子组件
                checkedZyid:'',//传递给子组件
                bjlxOptions:[]
            }
        },
        created() {     
            this.$GET('/timesheetTask/yearsTerm').then((res) => {
                if (res.code == 200) {
                    this.bjjsOptions = res.data
                }
            })

            this.$GET('/majorInfo/selectGeniusList').then((res) => {
                if (res.code == 200) {
                    this.zyidOptions = res.data
                }
            })
            //班级类型下拉框
            this.$POST("/system/dictList/BJLXM").then((res) => { 
                    this.bjlxOptions = res 
            })
        },

        methods:{
            removeForm() {
                this.dialogVisible = false
                this.form = {
                    bh:'',
                    bjmc:'',
                    bjlxm:'',
                    bjjs:'',
                    zyid:'',
                    xsrs:'0',
                    bjlxm:''
                }
                this.$refs.ydPage.getData()
            },
            editClass(row) { 
                this.form = row
                this.dialogVisible = true
            },
            addClass() {
                this.dialogVisible = true
                this.form = {
                    bh:'',
                    bjmc:'',
                    bjlxm:'',
                    bjjs:'',
                    zyid:'',
                    xsrs:'0'
                }
            },
            submitClass() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (this.form.bjid) {
                            this.$POST('/classInfo/update',this.form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'编辑成功'
                                    })
                                    this.dialogVisible = false
                                    this.$refs.ydPage.getData()
                                }else{ 
                                    this.$message({
                                        type:'error',
                                        message:res.message
                                    })
                                }
                            })
                        } else {
                            this.$POST('/classInfo/add',this.form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'新增成功'
                                    })
                                    this.dialogVisible = false
                                    this.$refs.ydPage.getData()
                                }else{ 
                                    this.$message({
                                        type:'error',
                                        message:res.message
                                    })
                                }
                            })
                        }
                    }
                });
            },
            //导入成功回调
            importSuccess(){ 
                this.$refs.ydPage.getData()
            },
            //分页数据
            changePage(res) {
                this.tableList = res
            },
            //
            deitMotaibjClose() {
                this.$refs.ydPage.getData()
            },
            checkedZyId(zyid) {
                // console.log(zyid)
                this.params.zyids = zyid
                this.params.condition = ''
                this.$nextTick(() => {
                    this.$refs.ydPage.getData()
                })
            },
            checkedJsId(data) {
                this.rowData.jsid = data
                this.$GET('/classInfo/update',this.rowData).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'选择班主任成功',
                            type:'success'
                        });
                        this.$refs.ydPage.getData()
                        this.bzrDialogVisible = false
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            submitBzr() { //确定班主任
                this.$refs.selectJsidTree.submitTree()
            },
            //打开班主任模态
            openBzrDialog(row) {
                this.rowData = {}
                this.rowData = row
                this.bzrDialogVisible = true
            },
            //编辑
            openBjDialog(row) {
                this.rowData = {}
                this.rowData = row
                // console.log(row)
                this.bjDialogFormVisible = true
            },

            closeDialog() {//专业号弹窗关闭
                this.rowData = {}
                this.checkedZyid = ''
                this.checkedZgh = []
                this.bzrDialogVisible = false
                this.$refs.ydPage.getData()
            },
            //删除
            deleteClass(row) {
                this.$confirm('此操作将永久删除, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/classInfo/delete',{'classInfoId':row.bjid}).then((res) => {
                        if (res.code == 500) {
                            this.$message.error(res.message);
                        } else {
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.$refs.ydPage.getData()
                        }
                    })
                })
            },
            searchTitle() {
                this.params.zyids = ''
                this.$refs.selectTree.removeNode()
                this.$refs.ydPage.getData('search')
            },
        }
    }
</script>

<style scoped lang="less">
    //选班主任的样式
    .check-subject-zyh {
        position: relative;
        p {
            font-size: 14px;
            line-height: 18px;
            color: #606266;
            min-height: 18px;
        }
        i {
            position: absolute;
            right: 4px;
            top: 9px;
            color: #c0c4cc;
            z-index: 9;
            font-size: 18px;
            display: none;
        }
        &:hover {
            i {
                display: block;
            }
        }
    }

    .import-stu-wrap {
        padding: 10px;
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #faebcc;
        margin-bottom: 10px;
    }
</style>

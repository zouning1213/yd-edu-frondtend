<template>
    <!--学生信息管理-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-basic-info"></i></div>
                <h3>学生信息管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入学生姓名或学号" v-model="params.condition"
                          @keyup.enter.native="searchTable('search')"
                          class="input-with-select1">
                    <el-select v-model="params.xjztm" slot="prepend" placeholder="请选择">
                        <el-option label="所有学籍状态" value=""></el-option>
                        <el-option v-for="(item,index) in xjztmOptions"
                                   :key="index"
                                   :label="item.name"
                                   :value="item.code">
                        </el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="searchTable('search')">搜索</el-button>
                </el-input>
                <el-button type="primary" @click="dialogAddStudent = true">
                    <i class="el-icon-circle-plus-outline"></i>增加学生
                </el-button>
                <yd-import-data
                        toPathName='班级'
                        ruleUrl='/classInfo/list'
                        toPathUrl='educational_class'
                        name="学生信息"
                        @importSuccess="importSuccess"
                        importUrl="/studentInfo/exportExcel"
                        templateUrl="/studentInfo/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/studentInfo/exportData?bjids=' + params.bjids + '&xjztm=' + params.xjztm"
                        name="班级">
                </yd-export-data>
            </el-col>
        </el-row>
        <div class="yd-bg common-pd manage-student-info yd-common-flex">
            <div class="common-left-tree">
                <yd-select-bjid-tree ref="selectTree" v-on:checkedBjId="checkedBjId"></yd-select-bjid-tree>
            </div>
            <div class="common-right-table yd-common-table">
                <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark"
                          empty-text="当前班级下暂无学生"
                          :max-height="this.$store.state.minClientHeight-280">
                    <el-table-column label="序号" align="center" width="50">
                        <template slot-scope="scope">
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="xm" label="姓名" align="center">
                        <template slot-scope="scope">
                            {{scope.row.xm||'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="xb" label="性别" align="center">
                        <template slot-scope="scope">
                            {{scope.row.xb||'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="xh" label="学号" align="center">
                        <template slot-scope="scope">
                            {{scope.row.xh||'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="bjmc" label="班级" align="center">
                        <template slot-scope="scope">
                            {{scope.row.bjmc||'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="xjzt" label="学籍状态" align="center">
                        <template slot-scope="scope">
                            {{scope.row.xjzt||'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button @click="openDetials(scope.row.xsid)" class="edit-btn" type="text">
                                <i class="el-icon-document"></i>详情
                            </el-button>
                            <!--@click="receiveStudentInfoList(scope.row.xsid)"-->
                            <router-link tag="a" target="_blank"
                                         :to="{name:'edit_student_info',params:{xsid:scope.row.xsid}}">
                                <el-button class="edit-btn"
                                           type="text">
                                    <i class="el-icon-edit"></i>编辑
                                </el-button>
                            </router-link>
                            <el-button @click="deleteStudents(scope.row.xsid)" class="del-btn"
                                       type="text"><i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <ydPage ref="pagination" url="/studentInfo/list" @changePage="changePage"
                        :params="params"></ydPage>
            </div>
        </div>
        <!--添加学生弹窗-->
        <el-dialog
                z-index='20'
                :destroy-on-close='true'
                :close-on-click-modal='false'
                custom-class="dialog-add-student"
                title="添加学生"
                :visible.sync="dialogAddStudent"
                width="1000px">
            <dialog-add-student v-if="dialogAddStudent" ref="refAddStudent"
                                v-on:receiveAddStudent="receiveAddStudent">
            </dialog-add-student>
            <div slot="footer" class="dialog-footer text-left" style="padding-left: 120px">
                <el-button type="primary" @click="submitStudentForm">确 定</el-button>
                <el-button @click="dialogAddStudent = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import '../../page/educational/css/manage-student-info.less'
    import studentInfoList from '../../components-page/educational/student-info/student-info-list'

    import dialogAddStudent from '../../components-page/students/dialog-add-student'

    //选择树
    import ydSelectBjidTree from '../../components-page/select/yd-tree-bjid-array'

    //导入导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'

    export default {
        name:"manage-student-information",
        components:{
            ydExportData,
            dialogAddStudent,
            ydImportData,
            studentInfoList,
            dialogAddStudent,
            //班级id  tree
            ydSelectBjidTree
        },
        data() {
            return {
                params:{
                    limit:10,
                    bjids:'',
                    extendMark:'',
                    condition:'',
                    extend:'',
                    xjztm:''
                },
                xjztmOptions:[],
                tableList:[],
                dialogAddStudent:false,
            }
        },
        created() {
            this.$POST("/system/dictList/XJZTM").then((res) => {
                this.xjztmOptions = res
            })
        },
        methods:{
            openDetials(xsid) {
                window.open('/manage/student/details/' + xsid,'_blank')
            },
            //导入成功回调
            importSuccess() {
                this.$refs.pagination.getData()
            },
            checkedBjId(bjids) {
                this.params.bjids = bjids
                this.$refs.pagination.getData()
            },
            //分页
            changePage(data) {
                this.tableList = data
            },
            //查询
            searchTable() {
                this.params.bjids = ''
                this.$refs.selectTree.removeNode()
                this.$refs.pagination.getData('search')
            },
            //删除学生
            deleteStudents(xsid) {
                this.$confirm('此操作将永久删除该学生, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/studentInfo/delete',{
                        'studentInfoId':xsid
                    }).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.$refs.pagination.getData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            //新增学生
            submitStudentForm() {
                this.$refs.refAddStudent.submitAddStudent()
            },
            receiveAddStudent(data) {
                this.$POST('/studentInfo/add',data).then((res) => {
                    if (res.code == '200') {
                        this.$message({
                            message:'新增成功',
                            type:'success'
                        })
                        this.$refs.pagination.getData()
                        this.dialogAddStudent = false;
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
        }
    }
</script>

<style>
</style>

<template>
    <!--教师管理-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-teacher"></i></div>
                <h3>教师信息管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请按职工号或姓名关键字进行搜索"
                          v-model="params.condition" class="input-with-select"
                          @keyup.enter.native="searchTable()">
                    <el-button slot="append" @click="searchTable()">搜索</el-button>
                </el-input>
                <el-button type="primary" @click="addTeacher">
                    <i class="el-icon-circle-plus-outline"></i>增加教师
                </el-button>
                <!-- toPathName='专业'
                ruleUrl='/majorInfo/list'
                toPathUrl='educational_professional'

                toPathName='教研组'
                ruleUrl='/departmentInfo/list'
                toPathUrl='educational_department' -->
                <yd-import-data
                        toPathName='专业,教研组'
                        ruleUrl='/majorInfo/list,/departmentInfo/list'
                        toPathUrl='educational_professional,educational_department'

                        name="教师信息"
                        @importSuccess="importSuccess"
                        importUrl="/teacherInfo/exportExcel"
                        templateUrl="/teacherInfo/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/teacherInfo/exportData?ksids=' + params.ksids"
                        name="教师信息"></yd-export-data>
            </el-col>
        </el-row>

        <div class="yd-bg common-pd manage-student-info yd-common-flex">
            <div class="common-left-tree">
                <yd-select-tree ref="selectTree" :ksid="this.$route.query.ksid||''" v-on:checkedKsId="checkedKsId"></yd-select-tree>
            </div>
            <div class="common-right-table yd-common-table">
                <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark"
                          :max-height="this.$store.state.minClientHeight-280"
                          empty-text="当前教研组下暂无教师">
                    <el-table-column label="序号" align="center" width="50">
                        <template slot-scope="scope">
                            <!--<el-checkbox v-model="checkedHandle" :label="scope.row.xh"></el-checkbox>-->
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="zgh" label="职工号" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.zgh||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="姓名" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xm||'-'}}</p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="曾用名" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.cym}}</p>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="" label="性别" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xbm == '1'?'男':scope.row.xbm == '2'?'女':'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="出生年月" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.csrq||'-'}}</p>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="xufen" label="身份证号码" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.sfzh}}</p>
                        </template>
                    </el-table-column> -->
                    <!--   <el-table-column prop="zymc" label="现从事专业" align="center">
                           <template slot-scope="scope">
                               <p>{{scope.row.zymc||'-'}}</p>
                           </template>
                       </el-table-column>-->
                    <el-table-column prop="yxmc" label="院系" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.yxmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ksmc" label="教研组名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.ksmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="180">
                        <template slot-scope="scope">
                            <el-button @click="openDetials(scope.row.jsid)" class="edit-btn" type="text"
                                       size="small"><i class="el-icon-document"></i>详情
                            </el-button>
                            <router-link tag="a" target="_blank"
                                         :to="{name:'edit_teacher_info',params:{jsid:scope.row.jsid}}">
                                <el-button class="edit-btn"
                                           type="text" size="small">
                                    <i class="el-icon-edit"></i>编辑
                                </el-button>
                            </router-link>
                            <el-button @click="deleteTeacher(scope.row.jsid)" class="del-btn"
                                       type="text" size="small">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <ydPage ref="ydPage" :ispageSize="20"
                        url="/teacherInfo/list"
                        @changePage="changePage"
                        :params="params">
                </ydPage>
            </div>
        </div>
        <!--添加教师弹窗-->
        <el-dialog
                :close-on-click-modal='false'
                custom-class="dialog-add-student"
                title="添加教师"
                :visible.sync="dialogAddTeacher"
                width="1000px">
            <dialog-add-teacher
                    v-if="dialogAddTeacher"
                    ref="refAddTeacher"
                    v-on:receiveAddTeacher="receiveAddTeacher">
            </dialog-add-teacher>
            <div slot="footer" class="dialog-footer text-left" style="padding-left: 120px">
                <el-button type="primary" @click="submitTeacherForm">确 定</el-button>
                <el-button @click="dialogAddTeacher = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import '../../page/educational/css/manage-student-info.less'
    import dialogAddTeacher from '../../components-page/teacher/dialog-add-teacher'
    //选择树
    import ydSelectTree from '../../components-page/select/yd-tree-ksid-array'
    //导入导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'

    export default {
        name:"teach-manage",
        components:{
            dialogAddTeacher,
            //树
            ydSelectTree,
            ydExportData,
            ydImportData
        },
        data() {
            return {
                params:{//传递给分页组件的参数
                    ksids:'',
                    limit:20,
                    condition:'',
                },
                dialogAddTeacher:false,
                tableList:[],
            }
        },
        created() { 
            this.checkedKsId(this.$route.query.ksid||'')
        },
        methods:{
            addTeacher() {
                this.dialogAddTeacher = true;
            },
            deleteTeacher(jsid) {
                this.$confirm('此操作将永久删除该学生, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/teacherInfo/delete',{'teacherInfoId':jsid}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.$refs.ydPage.getData()
                        }
                    })
                })
            },
            //打开新窗口
            openDetials(jsid) {
                window.open('/manage/teacher/details/' + jsid,'_blank')
            },
            checkedKsId(ksid) {
                this.params.ksids = ksid 
                this.$nextTick(() => {
                    this.$refs.ydPage.getData()
                }) 
            },
            changePage(data) {
                this.tableList = data
            },
            searchTable() {
                this.params.ksids = ''
                this.$refs.selectTree.removeNode()
                this.$refs.ydPage.getData('search')
            },
            //添加教师
            submitTeacherForm() {
                this.$refs.refAddTeacher.submitAddStudent()
            },
            receiveAddTeacher(data) {
                this.$POST('/teacherInfo/add',data).then((res) => {
                    if (res.code == '200') {
                        this.$message({
                            message:'新增成功',
                            type:'success'
                        })
                        this.$refs.ydPage.getData()
                        this.dialogAddTeacher = false;
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //导入成功回调
            importSuccess() {
                this.$refs.ydPage.getData()
            }
        }
    }
</script>

<style>

</style>

<template>
    <!--教研组管理-->
    <div class="yd-educational-college">
        <el-row class="yd-router-title yd-bg manage-student-scourse">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-classroom"></i></div>
                <h3>教研组管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入教研组名称搜索" v-model="params.condition" class="input-with-select text-right"
                          @keyup.enter.native="searchTale">
                    <el-button slot="append" @click="searchTale">搜索</el-button>
                </el-input>
                <el-button @click="addCollege" type="primary" style="margin-left: 10px">添加教研组</el-button>
                <!-- <el-button @click="addCollege" type="success" style="margin-left: 10px">导入</el-button>
                <el-button @click="addCollege" type="success" style="margin-left: 10px">导出</el-button> -->
                <yd-import-data
                        toPathName='院系'
                        ruleUrl='/collegeInfo/list'
                        toPathUrl='educational_college'
                        name="教研组"
                        @importSuccess="importSuccess"
                        importUrl="/departmentInfo/exportExcel"
                        templateUrl="/departmentInfo/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/departmentInfo/exportData?yxids=' + params.yxid "
                        name="教研组">
                </yd-export-data>
            </el-col>
        </el-row>
        <div class="yd-bg common-pd yd-common-flex"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <div class="common-left-tree">
                <yd-select-yxid ref="selectTree" v-on:checkedyxid="checkedyxid"></yd-select-yxid>
            </div>
            <div class="common-right-table yd-common-table">
                <el-table
                        border
                        :data="tableData"
                        empty-text="暂无教研组管理数据"
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            align="center"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            prop="yxmc"
                            label="所属院系"
                            align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.yxmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <!--<el-table-column
                            prop="yxbm"
                            label="所属院系编码"
                            align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.yxbm||'-'}}</p>
                        </template>
                    </el-table-column>-->
                    <el-table-column
                            prop="ksmc"
                            label="教研组(教研组号)"
                            align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.ksmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <!--   <el-table-column
                               prop="ksh"
                               label="教研组号"
                               align="center">
                           <template slot-scope="scope">
                               <p>{{scope.row.ksh||'-'}}</p>
                           </template>
                       </el-table-column>-->
                    <el-table-column
                            prop="jss"
                            label="教师数"
                            align="center">
                        <template slot-scope="scope">
                            <router-link :to="{name:'educational_teacher_info',query:{ksid:scope.row.ksid}}">
                                <el-button class="edit-btn" type="text">{{scope.row.jss||'0'}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="kcs"
                            label="课程数"
                            align="center">
                        <template slot-scope="scope">
                            <router-link :to="{name:'educational_courses',query:{ksid:scope.row.ksid}}">
                                <el-button class="edit-btn" type="text">{{scope.row.kcs||'0'}}</el-button>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="kszz"
                            label="教研组长"
                            align="center">
                        <!-- <template slot-scope="scope">
                            <el-button @click="" class="edit-btn" type="text">{{scope.row.kszz||'选择老师'}}</el-button>
                        </template> -->
                        <template slot-scope="scope">
                            <template v-if="scope.row.jsid == ''">
                                <el-button class="edit-btn" type="text" size="small"
                                           @click="openjyzDialog(scope.row)">
                                    选择教研组组长
                                </el-button>
                            </template>
                            <template v-else>
                                <el-button class="edit-btn" type="text"
                                           @click="openjyzDialog(scope.row)">
                                    {{scope.row.xm}}
                                </el-button>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作"
                            width="160"
                            align="center">
                        <template slot-scope="scope">
                            <el-button type="text" class="edit-btn" @click="editCollege(scope.row)" size="small">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button type="text" class="del-btn" @click="deleteCollege(scope.row.ksid)"
                                       size="small">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <yd-page ref="ydPage" url="/departmentInfo/list" :params="params"  
                         @changePage="changePage"></yd-page>
            </div>
        </div>
        <!--弹窗-->
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                :close-on-click-modal='false'
                v-if="dialogVisible"
                width="480px">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="98px">
                <el-row>
                    <el-col :span="20" :offset="1">
                        <el-form-item label="教研组名称" prop="ksmc">
                            <el-input v-model="form.ksmc" placeholder="请输入教研组名称"></el-input>
                        </el-form-item>
                        <el-form-item label="教研组号" prop="ksh">
                            <el-input v-model.number="form.ksh" placeholder="请输入教研组号"></el-input>
                        </el-form-item>
                        <el-form-item label="所属院系名称" prop="yxbm">
                            <yd-select-yx :yxid="form.yxid"
                                          @changeYxid="function(data)
                                          {form.yxid=data}">
                            </yd-select-yx>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCollege">确 定</el-button>
            </div>
        </el-dialog>

        <!--选择教研组长弹窗-->
        <el-dialog
                v-if="jyzDialogVisible"
                :close-on-click-modal='false'
                z-index="1000"
                :modal="true"
                :show-close="false"
                :visible.sync="jyzDialogVisible"
                width="600px"
                :before-close="closeDialog">
            <yd-select-jsid-tree ref="selectJsidTree"
                                 :jsid="rowData.jsid"
                                 v-on:checkedJsId="checkedJsId"></yd-select-jsid-tree>
            <div style="margin: 10px auto 20px" class="text-center">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitjyz">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ydSelectJsidTree from '../../components-page/select/yd-tree-jsid-dialog'
    import ydSelectYx from '../../components-page/select/yd-yxid-dialog'
    import ydSelectYxid from '../../components-page/select/yd-tree-yxid'
    //导入导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'

    export default {
        name:"manage-college",
        components:{
            ydExportData,
            ydImportData,
            ydSelectJsidTree,
            ydSelectYx,
            ydSelectYxid
        },
        data() {
            return {
                params:{
                    limit:10,
                    condition:'',
                    yxid:''
                },
                title:'新增教研组',
                jyzDialogVisible:false,
                dialogVisible:false,
                tableData:[],
                form:{
                    ksid:'',
                    ksmc:'',
                    ksh:'',
                    yxid:''
                },
                rules:{
                    ksmc:[
                        {required:true,message:'请输入院系名称',trigger:'blur'}
                    ],
                    ksh:[
                        {required:true,message:'请输入院系编码',trigger:'blur'},
                        {type:'number',message:'院系编码必需为数字'}
                    ],
                    yxid:[
                        {required:true,message:'请选择院系',trigger:'blur'}
                    ]
                },
                rowData:{
                    jsid:''
                }
            }
        },
        created() {

        },
        methods:{
            //导入成功回调
            importSuccess() {
                this.$refs.ydPage.getData()
            },
            closeDialog() {
                this.jyzDialogVisible = false
            },
            checkedJsId(data) {
                this.rowData.jsid = data
                this.$POST('/departmentInfo/updateDepJsid',this.rowData).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'选择教研组长',
                            type:'success'
                        });
                        this.$refs.ydPage.getData()
                        this.jyzDialogVisible = false
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            submitjyz() { //确定教研组长
                this.$refs.selectJsidTree.submitTree()
            },
            //打开教研组长模态
            openjyzDialog(row) {
                this.rowData = {}
                this.rowData = row
                this.jyzDialogVisible = true
            },


            checkedyxid(data) {
                // console.log(data)
                this.params.yxid = data
                this.params.condition = ''
                this.$nextTick(() => {
                    this.$refs.ydPage.getData()
                })
            },
            changePage(data) {
                // console.log(data)
                this.tableData = data
            },
            addCollege() {
                this.title = '新增教研组'
                this.form = {
                    ksid:'',
                    ksmc:'',
                    ksh:'',
                    yxid:''
                }
                this.dialogVisible = true
            },
            editCollege(row) {
                this.title = '编辑教研组'
                this.form = row
                this.form.ksh = parseInt(this.form.ksh) || ''
                this.dialogVisible = true
            },
            deleteCollege(id) {
                this.$confirm('此操作将删除该院系,删除之后不可恢复, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/departmentInfo/delete',{departmentInfoId:id}).then((res) => {
                        if (res.code == 200) {
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
            submitCollege() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //新增
                        if (this.form.ksid == '') {
                            this.$POST('/departmentInfo/add',this.form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'新增成功'
                                    })
                                    this.$refs.ydPage.getData()
                                    this.dialogVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                        //编辑
                        else {
                            console.log('编辑')
                            this.$POST('/departmentInfo/update',this.form).then((res) => {
                                if (res.code == 200) {
                                    // console.log(res)
                                    this.$message({
                                        type:'success',
                                        message:'编辑成功'
                                    })
                                    this.$refs.ydPage.getData()
                                    this.dialogVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            searchTale() {
                this.$refs.selectTree.removeNode()
                this.$refs.ydPage.getData('search')
            },

            toTeacherList() {
                this.$router.push({name:'educational_teacher_info'})
            },
        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>
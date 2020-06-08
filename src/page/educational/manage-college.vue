<template>
    <!--院系管理-->
    <div class="yd-educational-college">
        <el-row class="yd-router-title yd-bg manage-student-scourse">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-classroom"></i></div>
                <h3>院系管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入院系名称搜索" v-model="params.condition" class="input-with-select text-right"
                          @keyup.enter.native="searchTale">
                    <el-button slot="append" @click="searchTale">搜索</el-button>
                </el-input>
                <el-button @click="addCollege" type="primary" style="margin-left: 10px">添加院系</el-button>
                <yd-import-data
                        name="院系"
                        @importSuccess="importSuccess"
                        importUrl="/collegeInfo/exportExcel"
                        templateUrl="/collegeInfo/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/collegeInfo/exportData'"
                        name="院系">
                </yd-export-data>
            </el-col>
        </el-row>
        <div class="yd-bg common-pd yd-common-table pr"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <!-- <div class="yd-add-btn" style="right:13px;top:13px;" @click="addCollege"></div> -->
            <el-table
                    border
                    :data="tableData"
                    empty-text="暂无院系管理数据"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="yxmc"
                        label="院系名称"
                        align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.yxmc||'-'}}</p>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="yxbm"
                        label="院系编码"
                        align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.yxbm||'-'}}</p>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class="edit-btn" @click="editCollege(scope.row)">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button type="text" class="del-btn" @click="deleteCollege(scope.row.yxid)">
                            <i class="el-icon-delete"></i>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <yd-page ref="ydPage" url="/collegeInfo/list" :params="params" @changePage="changePage" :ispageSize='20'></yd-page>
        </div>
        <!--弹窗-->
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                :close-on-click-modal='false'
                v-if="dialogVisible"
                @close="motaiClose"
                width="480px">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
                <el-row>
                    <el-col :span="20" :offset="1">
                        <el-form-item label="院系名称" prop="yxmc">
                            <el-input v-model="form.yxmc" placeholder="请输入院系名称"></el-input>
                        </el-form-item>
                        <el-form-item label="院系编码" prop="yxbm">
                            <el-input v-model="form.yxbm" placeholder="请输入院系编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="motaiClose">取 消</el-button>
                <el-button type="primary" @click="submitCollege">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    //导入导出
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'
    export default {
        name:"manage-college",
        components:{
            ydExportData,
            ydImportData,
        },
        data() {
            return {
                params:{
                    limit:20,
                    condition:''
                },
                title:'新增院系',
                dialogVisible:false,
                tableData:[],
                form:{
                    yxmc:'',
                    yxbm:''
                },
                rules:{
                    yxmc:[
                        {required:true,message:'请输入院系名称',trigger:'blur'}
                    ],
                    yxbm:[
                        {required:true,message:'请输入院系编码',trigger:'blur'},
                        // {type:'number',message:'院系编码必需为数字'}
                    ],
                }
            }
        },
        created() {

        },
        methods:{
            //导入成功回调
            importSuccess(){
                this.$refs.ydPage.getData()
            },
            motaiClose() {
                this.$refs.ydPage.getData()
                this.dialogVisible = false
            },
            changePage(data) {
                this.tableData = data
            },
            addCollege() {
                this.title = '新增院系'
                this.form = {
                    yxmc:'',
                    yxbm:''
                }
                this.dialogVisible = true
            },
            editCollege(row) {
                this.title = '修改院系'
                this.form = row
                this.dialogVisible = true
            },
            deleteCollege(id) {
                this.$confirm('此操作将删除该院系,删除之后不可恢复, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/collegeInfo/delete',{collegeInfoId:id}).then((res) => {
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
                    console.log(this.form)
                    if (valid) {
                        //新增
                        if (!this.form.yxid) {
                            this.$POST('/collegeInfo/add',this.form).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'新增成功'
                                    })
                                    // console.log(res)
                                    this.$refs.ydPage.getData()
                                    this.dialogVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                        //编辑
                        else {
                            this.$POST('',this.form).then((res) => {
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
                this.$refs.ydPage.getData('search')
            }
        }
    }
</script>

<style scoped>

</style>

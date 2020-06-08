<template>
    <!--教学楼管理-->
    <div class="yd-meducational-professional">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-major2"></i></div>
                <h3>教学楼管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入教学楼名称关键字搜索" v-model="search" class="input-with-select"
                          @keyup.enter.native="searchForm">
                    <el-button slot="append" @click="searchForm">搜索</el-button>
                </el-input>
                <el-button type="primary" @click="idAdd">添加</el-button>
                <yd-import-data
                        name="教学楼"
                        @importSuccess="importSuccess"
                        importUrl="/teachingBuilding/exportExcel"
                        templateUrl="/teachingBuilding/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/teachingBuilding/exportData ' "
                        name="教学楼 "></yd-export-data>
            </el-col>
        </el-row>

        <!-- 中间 主体  -->
        <div class="clearfix article-wrap">
            <div class="article-list" v-for="(item,index) in tableData" :key="index">
                <div class="article-list-item">
                    <div class="article-list-item-top">
                        <div class="item-icon bg-skin">
                            <i class="yd icon-mingcheng1"></i>
                        </div>
                        <div class="item-title">
                            <h4>教学楼名称:</h4>
                            <span>{{item.jxlmc}}</span>
                        </div>
                    </div>
                    <div class="article-list-item-top">
                        <div class="item-icon active-bg-skin">
                            <i class="yd icon-major "></i>
                        </div>
                        <div class="item-title">
                            <h4>教学楼代号:</h4>
                            <span>{{item.jxlbh}}</span>
                        </div>
                    </div>
                    <div class="article-list-item-bottom">
                        <el-button class="edit-btn" @click="editForm(item)" type="text" size="small">
                            <i class="el-icon-edit"></i> 编辑
                        </el-button>
                        <el-button class="del-btn fr" @click="deleteForm(index,item.jxlid)" type="text" size="small">
                            <i class="el-icon-delete"></i> 删除
                        </el-button>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="dialogTableVisible" @close="closeForm"
                   :close-on-click-modal='false'
                   width="600px" :show-close="false">
            <el-form :model="form" ref="ruleForm" :rules="rules"
                     class="el-row" label-width="120px"
                     v-if="dialogTableVisible">
                <el-col :span="21">
                    <el-form-item label="教学楼名称:" prop="jxlmc">
                        <el-input v-model="form.jxlmc" placeholder="请输入教学楼名称"></el-input>
                    </el-form-item>
                    <el-form-item label="教学楼代号:" prop="jxlbh">
                        <el-input v-model="form.jxlbh" placeholder="请输入教学楼代码"></el-input>
                    </el-form-item> 
                    <el-form-item>
                        <div style="padding-left: 66px">
                            <el-button @click="closeForm"> 取 消</el-button>
                            <el-button type="primary" @click="submitForm"> 保 存</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-dialog>
        <yd-page ref="ydPage" :url="'/teachingBuilding/list'" :ispageSize='16'
                :params="{limit:16,condition:search}"
                @changePage="changeData"></yd-page>
    </div>
</template>

<script>
    import "./css/manage-professional.less"
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'
    export default {
        name:"manage-teaching-building",
        components:{ 
            ydExportData,
            ydImportData
        },
        data() {
            return {
                search:'',
                search1:'',
                dialogTableVisible:false,
                tableData:[],
                flag:true,
                form:{
                    jxlmc:'',
                    jxlbh:'', 
                },
                rules:{
                    jxlmc:[
                        {required:true,message:'请输入教学楼名称',trigger:'change'}
                    ],
                    jxlbh:[
                        {required:true,message:'请输入教学楼号',trigger:'change'}
                    ] 
                }
            }
        },
        methods:{
            //导入成功回调
            importSuccess(){ 
                this.$refs.ydPage.getData()
            },
            submitForm() {
                // let params = {
                //     zymc:this.form.zymc,
                //     zyh:this.form.zyh,
                //     zyid:this.form.zyid,
                //     yxid:this.form.yxid,
                // } 
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        if (!this.flag) {
                            // console.log("修改提交")
                            this.$POST('/teachingBuilding/update',this.form).then((res) => {
                                if (res.code == 500) {
                                    this.$message({
                                        message:res.message,
                                        type:'error'
                                    });
                                } else {
                                    this.$message({
                                        message:'编辑成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogTableVisible = false
                                }
                            })
                        }
                        else {
                            this.$POST('/teachingBuilding/add',this.form).then((res) => {
                                if (res.code == 500) {
                                    this.$message({
                                        message:res.message,
                                        type:'error'
                                    });
                                } else {
                                    this.$message({
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogTableVisible = false
                                }

                            })
                        }
                    } else {
                        return false;
                    }
                });
            },
            changeZZJG() {
            },
            idAdd() {
                this.dialogTableVisible = true
            },
            editForm(item) {
                // this.form.zymc = item.zymc
                // this.form.zyh = item.zyh
                // this.form.zyid = item.zyid
                // this.form.yxid = item.yxid
                this.form = item
                this.flag = false
                this.dialogTableVisible = true
                // console.log(item)
            },
            deleteForm(index,jxlid) {
                this.$confirm('当前选择删除该教学楼,删除之后不能恢复?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/teachingBuilding/delete',{teachingBuildingId:jxlid}).then((res) => {
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
            closeForm() {
                this.form = {}
                this.$refs.ydPage.getData()
                this.flag = true
                this.dialogTableVisible = false
            },
            changeData(data) {
                this.tableData = data || []
            },
            searchForm() {
                this.$refs.ydPage.getData("search")
            }
        },
    }
</script>

<style lang='less'>
    .motai2 {
        .motai2-bd {
            padding: 5px;
            .motai2-bd-item {
                position: relative;
                padding-left: 10px;
                border: 1px solid rgba(233, 233, 233, 1);
                border-radius: 4px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                span {
                    font-weight: 700;
                    color: rgba(51, 51, 51, 1);
                }
                i {
                    display: inline-block;
                    font-size: 39px;
                    position: absolute;
                    right: -3px;
                    bottom: -1px;
                }
            }
        }
    }

</style>
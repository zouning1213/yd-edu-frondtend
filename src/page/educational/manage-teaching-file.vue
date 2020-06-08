<template>
    <!--教材列表-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin">
                    <i class="yd icon-material"></i>
                </div>
                <h3>教材库</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入教材名称" v-model="search" class="input-with-select"
                          @keyup.enter.native="searchFile">
                    <el-button slot="append" @click="searchFile">搜索</el-button>
                </el-input>
                <el-button @click="editFile(1)" type="primary" style="margin-left: 10px">添加教材库</el-button>
            </el-col>
        </el-row>

        <div class="yd-margin-right clearfix yd-manage-teaching-file">
            <!-- <div class="yd-add-btn" style="right:13px;top:13px;" @click="editFile(1)"></div> -->
            <no-tip v-if="fileList.length <= 0 || fileList == undefined"
                    button="暂无教材" title="当前暂无教材" :src="src"></no-tip>
            <el-row v-else :gutter="20">
                <el-col v-for="(item,index) in fileList" class="file-list" :key="index" :sm="24" :md="12" :lg="6">
                    <div class="yd-bg talent-list">
                        <div class="talent-content line-1"><span>教材名称:</span>{{item.jcmc}}</div>
                        <div class="talent-content line-1"><span>数量:</span>{{item.jcsl}}</div>
                        <el-row class="btn-group">
                            <el-button class="edit-btn fl" @click="editFile(2,item)" type="text" size="small">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button class="del-btn fr" @click="deleteFile(item.jcid)" type="text" size="small">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <yd-page ref="page"
                     :url="'/textbookInfo/list'"
                     :params="{limit:12,condition:search}"
                     @changePage="changePage"></yd-page>
        </div>
        <!--弹窗-->
        <el-dialog @close="cancelFile" width="500px"
                    v-if="dialogFormVisible"
                   :visible.sync="dialogFormVisible"
                   :close-on-click-modal='false'>
            <el-form :model="form" ref="ruleForm" :rules="rules" class="clearfix" label-width="100px">
                <el-col :span="20">
                    <el-form-item label="教材名称:" prop="jcmc">
                        <el-input v-model="form.jcmc" placeholder="请输入教材名称"></el-input>
                    </el-form-item>
                    <el-form-item label="数量:" prop="jcsl">
                        <el-input v-model="form.jcsl" placeholder="请输入教材数量" type="number" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="cancelFile">取消</el-button>
                <el-button type="primary" @click="submitFile">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import "../../page/educational/css/manage-teaching-file.less";
    import noTip from "../../components-page/common/no-content-tip";

    export default {
        name:"manage-teaching-file",
        components:{
            noTip
        },
        data() {
            return {
                src:require('../../assets/no-tip-img/no-diploma.png'),
                search:"",
                fileList:[],
                dialogFormVisible:false,
                type:'1', //1代表新增 2代表编辑
                form:{
                    jcid:"",
                    jcmc:"",
                    jcsl:""
                },
                rules:{
                    jcmc:[
                        {required:true,message:'请输入必填',trigger:'change'}
                    ],
                    jcsl:[
                        {required:true,message:'请输入必填',trigger:'change'}
                    ],
                }
            };
        },
        methods:{
            //删除
            deleteFile(id) {
                this.$confirm('此操作将删除此教材, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/textbookInfo/delete',{'textbookInfoId':id}).then(
                        (res) => {
                            if (res.code == 500) {
                                this.$message({
                                    type:'success',
                                    message:'无法删除已经进行分发的教材！'
                                });
                            } else if (res.code == 200) {
                                this.$message({
                                    type:'success',
                                    message:'删除成功！'
                                });
                                this.$refs.page.getData();
                            }
                        }
                    )
                })
            },
            //教材提交
            submitFile() {
                if (this.type == '1') {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            this.$POST("/textbookInfo/add",this.form).then(res => {
                                this.$message({
                                    message:"添加成功",
                                    type:"success"
                                });
                                this.dialogFormVisible = false;
                                this.$refs.page.getData();
                            });
                        } else {
                            // console.log('error submit!!');
                            return false;
                        }
                    })
                } else {
                    
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            this.$POST("/textbookInfo/update",this.form).then(res => {
                                this.$message({
                                    message:"修改成功",
                                    type:"success"
                                });
                                this.$refs.page.getData();
                                this.dialogFormVisible = false;
                            });
                        } else {
                            // console.log('error submit!!');
                            return false;
                        }
                    })
                }
            },
            cancelFile() {
                this.form = {
                    jcid:"",
                    jcmc:"",
                    jcsl:""
                }
                this.dialogFormVisible = false;
                this.$refs.page.getData();
            },
            //查询
            searchFile() {
                this.$refs.page.getData("search")
            },
            //教材分页数据
            changePage(res) {
                this.fileList = res;
            },
            //编辑新增
            editFile(type,val) {
                this.dialogFormVisible = true;
                this.type = type
                if (type == '1') {
                    this.form = {
                        jcid:"",
                        jcmc:"",
                        jcsl:""
                    }
                } else {
                    this.form = val
                }
            },
        }
    };
</script>

<style scoped>
</style>

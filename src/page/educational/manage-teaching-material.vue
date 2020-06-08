<template>
    <!--教材管理 废弃-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-wenzhang"></i></div>
                <h3>教材管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入教材名称" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="yd-margin-right clearfix manage-seniority">
            <div class="yd-add-btn" style="right:13px;top:13px;" @click="seeleClick"></div>
            <el-dialog v-if="dialogFormVisible"
                       center width="600px"
                       :close-on-click-modal='false'
                       :visible.sync="dialogFormVisible">
                <el-form :model="form" label-width="80px" :inline="true">
                    <el-row>
                        <el-col class="info-item-block" :span="20">
                            <el-form-item label="专业:" prop="">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="info-item-block" :span="20">
                            <el-form-item label="名字:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="info-item-block" :span="20">
                            <el-form-item label="数量:">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer text-center">
                    <el-button class="text-left" type="primary" @click="teachingSubmit">提交</el-button>
                </div>
            </el-dialog>
        </div>
        <ydPage @changePage="changePage" :params="params"></ydPage>
    </div>
</template>

<script>
    import "../../page/educational/css/manageSeniority.less"

    export default {
        name:"manage-teaching-material",
        data() {
            return {
                search:'',
                teachinglist:[],
                params:{
                    limit:10,
                    page:1
                },
                dialogFormVisible:false,
                form:{}
            }
        },
        methods:{
            //教材分页数据
            changePage(res) {
                this.teachinglist = res
            },
            //新增教材 打开编辑框
            seeleClick() {
                this.dialogFormVisible = true
            },

            //教材提交
            teachingSubmit() {

            },
        }
    }
</script>

<style scoped>

</style>

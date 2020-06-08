<template>
    <!--岗位证书列表-->
    <div class="yd-common-table">
        <el-table :data="certificateInfo" border style="width: 100%">
            <el-table-column
                    prop="gwzfmc"
                    label="岗位证书名称"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="bfdw"
                    label="颁发单位"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="bfrq"
                    label="颁发日期"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="editInform(scope.row)" class="edit-btn"
                               type="text" size="small">
                        <i class="el-icon-document"></i>编辑
                    </el-button>
                    <el-button @click="deleteInform(scope.row.xjydh)" class="del-btn"
                               type="text" size="small">
                        <i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"teacher-certificate-list",
        props:['certificateInfo'],
        data() {
            return {

            }
        },
        methods:{
            editInform(data) {
                this.$emit('editTeacherCertificate',data)
            },
            deleteInform(data) {
                this.$emit('deleteTeacherCertificate',data)
            }
        }
    }
</script>

<style scoped>

</style>
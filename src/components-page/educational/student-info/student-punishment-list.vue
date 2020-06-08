<template>
    <!--查询学生惩罚信息-->
    <div class="yd-common-table">
        <el-table
                :data="studentPunishment"
                border
                style="width: 100%">
            <el-table-column
                    prop="xh"
                    align="center"
                    label="学号">
            </el-table-column>
            <el-table-column
                    prop="xm"
                    align="center"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="zymc"
                    label="专业">
            </el-table-column>
            <el-table-column
                    prop="ccmc"
                    label="惩罚名称">
            </el-table-column>
            <el-table-column
                    prop="ccyybm"
                    label="惩罚原因">
            </el-table-column>
            <el-table-column
                    prop="ccnr"
                    label="惩罚内容">
            </el-table-column>
            <el-table-column
                    prop="ccrq"
                    label="惩处日期">
            </el-table-column>
            <el-table-column
                    prop="cccxrq"
                    label="惩处撤销日期">
            </el-table-column>
            <el-table-column
                    prop="cccxwh"
                    label="惩处撤销文号">
            </el-table-column>
            <el-table-column
                    width="160"
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="editInform(scope.row)" class="edit-btn" type="text"
                               size="small">
                        <i class="el-icon-document"></i>编辑
                    </el-button>
                    <el-button @click=" deleteInform(scope.row.xscfh)" class="del-btn"
                               type="text"
                               size="small"><i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"student-listByUser-list",
        props:['studentPunishment'],
        methods:{
            editInform(data) {
                this.$emit('editPunishmentList',data)
            },
            deleteInform(data) {
                this.$emit('deletePunishmentList',data)
            }
        }
    }
</script>

<style scoped>

</style>
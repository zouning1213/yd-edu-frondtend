<template>
    <!--学生异动列表-->
    <div class="yd-common-table">
        <el-table
                :data="schoolRoll"
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
                    label="专业名称">
            </el-table-column>
            <el-table-column
                    prop="ydrq"
                    label="异动日期"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ydyy"
                    label="异动原因"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="sprq"
                    label="审批日期"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="spwh"
                    label="审批公文"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ydly"
                    label="异动来源"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ydqx"
                    label="异动去向"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="ydsm"
                    label="异动说明"
                    align="center">
            </el-table-column>
            <el-table-column
                    width="140"
                    align="center"
                    label="操作">
                <template slot-scope="scope">
                    <el-button @click="editInform(scope.row)" class="edit-btn" type="text"
                               size="small">
                        <i class="el-icon-document"></i>编辑
                    </el-button>
                    <el-button @click="deleteInform(scope.row.xjydh)" class="del-btn" type="text"
                               size="small"><i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"student-schoolRoll-list",
        props:['schoolRoll'],
        methods:{
            editInform(data) {
                this.$emit('editSchoolRollList',data)
            },
            deleteInform(data) {
                this.$emit('deleteSchoolRollList',data)
            }
        }
    }
</script>

<style scoped>

</style>
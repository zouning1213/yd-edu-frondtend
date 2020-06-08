<template>
    <!--学生奖励信息列表-->
    <div class="yd-common-table">
        <el-table
                :data="studentReward"
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
                    prop="hjxm"
                    label="获奖项目">
            </el-table-column>
            <el-table-column
                    prop="hjfsbm"
                    label="获奖方式">
            </el-table-column>
            <el-table-column
                    prop="hjmc"
                    label="获奖名称">
            </el-table-column>
            <el-table-column
                    prop="bjrq"
                    label="颁奖日期">
            </el-table-column>
            <el-table-column
                    prop="bjdw"
                    label="颁发单位">
            </el-table-column>
            <el-table-column
                    prop="hjjbm"
                    label="获奖级别码">
            </el-table-column>
            <el-table-column
                    prop="hjfsbm"
                    label="获奖方式码">
            </el-table-column>
            <el-table-column
                    prop="hryrq"
                    label="获荣誉日期">
            </el-table-column>
            <el-table-column
                    prop="rychm"
                    label="荣誉称号码">
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
                    <el-button @click=" deleteInform(scope.row.xsjlh)" class="del-btn" type="text"
                               size="small"><i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"student-studentReward-lit",
        props:['studentReward'],
        data() {
            return {}
        },
        methods:{
            editInform(data) {
                this.$emit('editRewardList',data,2)
            },
            deleteInform(data) {
                this.$emit('deleteRewardList',data)
            }
        }
    }
</script>

<style scoped>

</style>
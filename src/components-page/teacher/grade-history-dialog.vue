<template>
    <!--历史成绩查看弹窗-->
    <div class="yd-common-table common-pd" ref="print">
        <el-table :data="ksh" border style="width: 100%">
            <el-table-column
                    prop="nj"
                    align="center"
                    label="年级">
            </el-table-column>
            <el-table-column
                    prop="xm"
                    align="center"
                    label="姓名">
            </el-table-column>
            <!-- <el-table-column
                    prop="xf"
                    align="center"
                    label="学分">
            </el-table-column>
            <el-table-column
                    prop=""
                    align="center"
                    label="周数">
            </el-table-column>
            <el-table-column
                    prop=""
                    align="center"
                    label="周课时">
            </el-table-column> -->
            <el-table-column
                    prop="bjmc"
                    align="center"
                    label="班级">
            </el-table-column>
            <!-- <el-table-column
                    prop="kers"
                    align="center"
                    label="人数">
            </el-table-column> -->
            <el-table-column
                    prop="pscj"
                    align="center"
                    label="平时成绩">
            </el-table-column>
            <el-table-column
                    prop="kscj1"
                    align="center"
                    label="考试成绩">
            </el-table-column>
            <el-table-column
                    prop="zhcj"
                    align="center"
                    label="综合成绩">
            </el-table-column>
            <el-table-column
                    prop="bz"
                    align="center"
                    label="备注">
            </el-table-column>
        </el-table>
        <!-- <el-button @click="childPrint">daying</el-button> -->
    </div>
</template>

<script>
    export default {
        name:"history-dialog",
        props:["ksh"],
        data() {
            return {
                tableData:[]
            }
        },
        methods:{
            childPrint() {
                this.$print(this.$refs.print); // 使用 
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
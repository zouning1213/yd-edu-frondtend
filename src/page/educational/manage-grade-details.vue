<template>
    <!--成绩管理详情编辑 查看弹窗-->
    <div class="yd-common-table common-pd manageDetails">
         <el-row class="grade-entry-title mb-30" :gutter="60"> 
             <div class="text-center fz-20">
                 详情
             </div>
        </el-row>
        <el-table :data="tableDataList" border style="width: 100%">
            <el-table-column
                    prop="kcmc"
                    align="center"
                    label="课程">
            </el-table-column>
            <el-table-column
                    prop="skls"
                    align="center"
                    label="任课教师">
            </el-table-column>
            <el-table-column
                    prop="pscj"
                    align="center"
                    label="平时成绩">
            </el-table-column>
            <el-table-column
                    prop="kscj"
                    align="center"
                    label="考试成绩">
            </el-table-column>
            <el-table-column
                    prop="zhcj"
                    align="center"
                    label="综合成绩"> 
            </el-table-column> 
        </el-table> 
    </div>
</template>

<script>
    export default {
        name:"manageGradeDetail",
        props:["tableDataList"],
        data(){
            return{ 
            }
        },
        methods:{ 
        }
    }
</script>

<style>
.fz-20{
    font-size: 20px;
}
</style>

<template>
    <!--班级设置-->
    <div class="arranging-course-two">
        <el-table
                :header-cell-style="{background:'rgba(243,245,247,1)'}"
                :data="tableData" border
                :max-height="(this.$store.state.minClientHeight-205) + 'px'"
                style="width: 100%">
            <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="nj"
                    label="年级">
                <template slot-scope="scope">
                    <p v-if="scope.row.nj ==1">一年级</p>
                    <p v-if="scope.row.nj ==2">一年级</p>
                    <p v-if="scope.row.nj ==3">一年级</p>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="zymc"
                    label="专业名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="bjmc"
                    label="班级名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="xsrs"
                    label="学生总人数">
                <template slot-scope="scope">
                    <p>{{scope.row.xsrs}}<span style="margin-left: 4px">(人)</span></p>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"arranging-course-two",
        props:['year'],
        data() {
            return {
                tableData:[]
            }
        },
        mounted() {
            //班级列表
            this.$GET('/timesheetTask/listClassInfo/' + this.year).then((res) => {
                if (res.code == 200) {
                    this.tableData = res.data
                }
            })
        },
        methods:{
            //发送给父组件
            sendFrom() {
                this.$emit('receiveCourseTwo',this.tableData)
            }
        }
    }
</script>

<style>

</style>

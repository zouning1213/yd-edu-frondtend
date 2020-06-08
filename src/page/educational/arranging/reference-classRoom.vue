<template>
    <!--教室信息-->
    <div class="arranging-course-four pr">
        <el-table
                :data="tableData"
                :header-cell-style="{background:'rgba(243,245,247,1)'}"
                border
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
                    prop="jxlmc"
                    label="教学楼">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="jsmc"
                    label="教室名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="jsh"
                    label="教室号">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="rnrs"
                    label="教室容纳人数">
                <template slot-scope="scope">{{scope.row.rnrs}}
                    <span style="margin-left: 4px">(人)</span></template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="jsxz"
                    width="180"
                    label="教室类型">
                <template slot-scope="scope">
                    <div v-if="scope.row.jsxz =='1'" class="text-red status1">理论</div>
                    <div v-if="scope.row.jsxz =='2'" class="text-blue status2">实训</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        name:"arranging-course-four",
        props:['year'],
        data() {
            return {
                tableData:[],
            }
        },
        created() {
            this.$GET('/timesheetTask/listClassRoom/' + this.year).then((res) => {
                this.tableData = res.data || []
            })
        },
        methods:{
            //发送给父组件
            sendFrom() {
                this.$emit('receiveCourseFour',this.tableData)
            }
        }
    }
</script>

<style>

</style>

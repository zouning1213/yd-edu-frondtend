<template>
    <!--课程信息-->
    <div class="arranging-course-three">
        <el-table
                :header-cell-style="{background:'rgba(243,245,247,1)'}"
                :data="tableData"
                :max-height="(this.$store.state.minClientHeight-205) + 'px'"
                border
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
                    label="级">
                <template slot-scope="scope">
                    <p>{{scope.row.nj}}级</p>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="zymc"
                    label="专业名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="kcmc"
                    label="课程名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="kch"
                    label="课程号">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="zkss"
                    label="总课时数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="nj"
                    label="详情">
                <template slot-scope="scope">
                    <el-button type="text" class="edit-btn" @click="courseDetail(scope.row.jhxqh)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--计划详情-->
        <el-dialog
                title="课程计划详情"
                :visible.sync="dialogVisible"
                width="760px">
            <div class="el-row">
                <div class="motai-header-wrap">
                    <el-form label-width="90px" :model="propData">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="课程分类:">
                                    <p>{{propData.ksmc}}</p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="考核方式:">
                                    <p>{{propData.khfs}}</p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="课程编号:">
                                    <p>{{propData.kcid}}</p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="课程名称:">
                                    <p>{{propData.kcmc}}</p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="motai-body-from">
                    <el-table
                            border
                            :data="motaitableData"
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="学期"
                                align="center"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                align="center"
                                label="1">
                            <template slot-scope="scope">
                                <p v-if="scope.row.hang==1">{{propData.xf1}}</p>
                                <p v-if="scope.row.hang==2">{{propData.kss1}}</p>
                                <p v-if="scope.row.hang==3">{{propData.syks1}}</p>
                                <p v-if="scope.row.hang==4">{{propData.sjks1}}</p>
                                <p v-if="scope.row.hang==5">{{propData.sxks1}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                align="center"
                                label="2">
                            <template slot-scope="scope">
                                <p v-if="scope.row.hang==1">{{propData.xf2}}</p>
                                <p v-if="scope.row.hang==2">{{propData.kss2}}</p>
                                <p v-if="scope.row.hang==3">{{propData.syks2}}</p>
                                <p v-if="scope.row.hang==4">{{propData.sjks2}}</p>
                                <p v-if="scope.row.hang==5">{{propData.sxks2}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                align="center"
                                label="3">
                            <template slot-scope="scope">
                                <p v-if="scope.row.hang==1">{{propData.xf3}}</p>
                                <p v-if="scope.row.hang==2">{{propData.kss3}}</p>
                                <p v-if="scope.row.hang==3">{{propData.syks3}}</p>
                                <p v-if="scope.row.hang==4">{{propData.sjks3}}</p>
                                <p v-if="scope.row.hang==5">{{propData.sxks3}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                align="center"
                                label="4">
                            <template slot-scope="scope">
                                <p v-if="scope.row.hang==1">{{propData.xf4}}</p>
                                <p v-if="scope.row.hang==2">{{propData.kss4}}</p>
                                <p v-if="scope.row.hang==3">{{propData.syks4}}</p>
                                <p v-if="scope.row.hang==4">{{propData.sjks4}}</p>
                                <p v-if="scope.row.hang==5">{{propData.sxks4}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                align="center"
                                label="5">
                            <template slot-scope="scope">
                                <p v-if="scope.row.hang==1">{{propData.xf5}}</p>
                                <p v-if="scope.row.hang==2">{{propData.kss5}}</p>
                                <p v-if="scope.row.hang==3">{{propData.syks5}}</p>
                                <p v-if="scope.row.hang==4">{{propData.sjks5}}</p>
                                <p v-if="scope.row.hang==5">{{propData.sxks5}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop=""
                                align="center"
                                label="6">
                            <template slot-scope="scope">
                                <p v-if="scope.row.hang==1">{{propData.xf6}}</p>
                                <p v-if="scope.row.hang==2">{{propData.kss6}}</p>
                                <p v-if="scope.row.hang==3">{{propData.syks6}}</p>
                                <p v-if="scope.row.hang==4">{{propData.sjks6}}</p>
                                <p v-if="scope.row.hang==5">{{propData.sxks6}}</p>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
           <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>-->
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:"arranging-course-three",
        props:['year'],
        data() {
            return {
                dialogVisible:false,
                propData:{},
                motaitableData:[
                    {
                        name:'学分',
                        hang:1,
                    },
                    {
                        name:'理论学时',
                        hang:2,
                    },
                    {
                        name:'实验学时',
                        hang:3,
                    },
                    {
                        name:'上机学时',
                        hang:4,
                    },
                    {
                        name:'实践学时',
                        hang:5,
                    }
                ],
                tableData:[]
            }
        },
        created() {
            this.$GET('/timesheetTask/listLessonInfo/' + this.year).then((res) => {
                if (res.code == 200) {
                    // console.log(res.data)
                    this.tableData = res.data
                }
            })
        },
        methods:{
            //发送给父组件
            sendFrom() {
                // console.log(this.tableData)
                this.$emit('receiveCourseThree',this.tableData)
            },
            courseDetail(jhxqh) {
                // console.log(jhxqh)
                this.dialogVisible = true
                this.$GET('/talentSchemeInfo/detail/' + jhxqh).then((res) => {
                    // console.log(res)
                    this.propData = res.data
                })
            }
        }
    }
</script>

<style>

</style>

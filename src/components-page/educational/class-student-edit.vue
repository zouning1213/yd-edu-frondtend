<template>
    <!--班级管理更改班级-->
    <div class="yd-common-table">
        <div class="yd-router-title text-right box-shadow-none" style="padding: 0;margin: 0 0 20px;">
            <el-input placeholder="根据学生姓名搜索" v-model="params.condition" @keyup.enter.native="searchTable"
                      class="input-with-select">
                <el-button slot="append" @click="searchTable">搜索</el-button>
            </el-input>
        </div>
        <el-table border ref="multipleTable" :data="tableClassList" tooltip-effect="dark"
                  empty-text="当前班级下面暂无学生"
                  :max-height="this.$store.state.minClientHeight-400">
            <el-table-column
                    type="index"
                    align="center"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column prop="zymc" label="专业名称" align="center">
                <template slot-scope="scope">
                    {{scope.row.zymc||'-'}}
                </template>
            </el-table-column>
            <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                    {{scope.row.xm||'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="xh" label="学号" align="center">
                <template slot-scope="scope">
                    {{scope.row.xh||'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bjmc" label="当前班级" align="center">
                <template slot-scope="scope">
                    {{scope.row.bjmc||'-'}}
                </template>
            </el-table-column>
            <el-table-column label="更改班级" align="center">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.bjid" placeholder="修改班级"
                               @change="changeBJ(scope.row)">
                        <el-option
                                v-for="item in bjOptions"
                                :key="item.bh"
                                :label="item.bjmc"
                                :value="item.bjid">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <yd-page ref="ydPageMotai" :url="'/studentInfo/list'" @changePage="changePage"
                 :params="{bjid:bjid,condition:params.condition}"></yd-page>
    </div>
</template>

<script>

    export default {
        name:"class-student-edit",
        props:['bjid','zyid'],
        data() {
            return {
                params:{
                    condition:''
                },
                tableClassList:[],
                bjOptions:[]
            }
        },
        methods:{
            changePage(res) {
                this.tableClassList = res
                this.getBjOptions()
            },
            changeBJ(row) {
                this.$POST('/studentInfo/eduUpdate',row).then((res) => {
                        if (res.code == '200') {
                            this.$message({
                                message:'修改成功',
                                type:'success'
                            });
                            this.$emit("deitMotaibjClose")
                        } else {
                            this.$message.error(res.message)
                        }
                    }
                )
            },
            //查询班级
            getBjOptions() {
                this.$GET('/classInfo/classInfoSelect',{zyid:this.zyid}).then((res) => {
                    this.bjOptions = res.data
                })
            },
            searchTable() {
                this.$refs.ydPageMotai.getData('search')
            },
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="yd-common-table">
        <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark"
                  empty-text="当前班级下暂无学生"
                  :max-height="this.$store.state.minClientHeight-280"
                  :row-class-name="tableRowClassName">
            <el-table-column label="序号" align="center" width="50">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column prop="xm" label="姓名" align="center">
                <template slot-scope="scope">
                    {{scope.row.xm||'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="xb" label="性别" align="center">
                <template slot-scope="scope">
                    {{scope.row.xb||'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="xh" label="学号" align="center">
                <template slot-scope="scope">
                    {{scope.row.xh||'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bjmc" label="班级" align="center">
                <template slot-scope="scope">
                    {{scope.row.bjmc||'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="xjzt" label="学籍状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.xjzt||'-'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button @click="openDetials(scope.row.xsid)" class="edit-btn" type="text"
                               size="small">
                        <i class="el-icon-document"></i>详情
                    </el-button>
                    <!--@click="receiveStudentInfoList(scope.row.xsid)"-->
                    <router-link tag="a" target="_blank" :to="{name:'edit_student_info',params:{xsid:scope.row.xsid}}">
                        <el-button class="edit-btn"
                                   type="text"
                                   size="small">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                    </router-link>
                    <el-button @click="receiveDeleteStudent(scope.row.xsid)" class="del-btn"
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
        name:"student-info-list",
        props:['edit-text',"tableList"],
        data() {
            return {
                // tableList:[],
                checkedHandle:[], //删除数据
            }
        },
        methods:{
            tableRowClassName(row,index) {
                row.index = index
            },
            refreshChangePage(data) {
                // this.$refs.pagination.getData()
            },
            //发送编辑学生
            receiveStudentInfoList(xsid) {
                this.$emit('receiveStudentInfoXh',xsid)
            },
            receiveDeleteStudent(xsid) {
                this.$emit('receiveDeleteStudentXh',xsid)
            },
            //
            openDetials(xsid) {
                window.open('/manage/student/details/' + xsid,'_blank')
            }
        }
    }
</script>

<style scoped>

</style>
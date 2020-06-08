<template>
    <!--教师列表-->
    <div class="yd-common-table">
        <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark"
                  :max-height="this.$store.state.minClientHeight-280"
                  empty-text="当前教研组下暂无教师">
            <el-table-column label="序号" align="center" width="50">
                <template slot-scope="scope">
                    <!--<el-checkbox v-model="checkedHandle" :label="scope.row.xh"></el-checkbox>-->
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column prop="zgh" label="职工号" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.zgh||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="" label="姓名" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.xm||'-'}}</p>
                </template>
            </el-table-column>
            <!-- <el-table-column label="曾用名" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.cym}}</p>
                </template>
            </el-table-column> -->
            <el-table-column prop="" label="性别" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.xbm == '1'?'男':scope.row.xbm == '2'?'女':'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="" label="出生年月" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.csrq||'-'}}</p>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="xufen" label="身份证号码" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.sfzh}}</p> 
                </template>
            </el-table-column> -->
            <!--   <el-table-column prop="zymc" label="现从事专业" align="center">
                   <template slot-scope="scope">
                       <p>{{scope.row.zymc||'-'}}</p>
                   </template>
               </el-table-column>-->
            <el-table-column prop="xufen" label="院系" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.yxmc||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button @click="openDetials(scope.row.jsid)" class="edit-btn" type="text"
                               size="small"><i class="el-icon-document"></i>详情
                    </el-button>
                    <router-link tag="a" target="_blank" :to="{name:'edit_teacher_info',params:{jsid:scope.row.jsid}}">
                        <el-button @click="editTeacher(scope.row.jsid)" class="edit-btn"
                                   type="text" size="small">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                    </router-link>
                    <el-button @click="deleteTeacher(scope.row.jsid)" class="del-btn"
                               type="text" size="small">
                        <i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"teacher-info-list",
        props:["tableList"],
        data() {
            return {
                checkedHandle:[], //删除数据
            }
        },
        methods:{
            tableRowClassName(row,index) {
                row.index = index
            },
            //发送编辑教师
            editTeacher(jsid) {
                this.$emit('editjsid',jsid)
            },
            //发送编辑教师职工号
            deleteTeacher(jsid) {
                this.$emit('deletejsid',jsid)
            },

        }
    }
</script>

<style scoped>

</style>
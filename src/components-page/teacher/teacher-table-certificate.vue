<template>
    <!--教师岗位证书-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不能编辑 -->
        <el-table v-if="!is_edit" :data="certificateInfo" border style="width: 100%">
            <el-table-column
                    prop="gwzfmc"
                    label="岗位证书名称"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.gwzfmc||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="bfdw"
                    label="颁发单位"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.bfdw||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="bfrq"
                    label="颁发日期"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.bfrq||'-'}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 可编辑 -->
        <el-table v-if="is_edit" :data="tableData" border style="width: 100%">
            <el-table-column
                    prop="gwzfmc"
                    label="岗位证书名称"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.gwzfmc" placeholder="岗位证书名称"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="bfdw"
                    label="颁发单位"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.bfdw" placeholder="颁发单位"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="bfrq"
                    label="颁发日期"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.bfrq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, tableData)"
                            type="text"
                            size="small">移除
                    </el-button>
                </template>
            </el-table-column>
            <div slot="append" @click="addExtendList" class="add-extend">
                <span>+新增</span>
            </div>
            <div slot="append" class="submit-btn">
                <el-button type="primary" @click="submitEdit">提交</el-button>
            </div>
        </el-table>
    </div>
</template>

<script>
    import '../students/css/common-extend.less'

    export default {
        name:"teacher-certificate-info",
        props:['certificateInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.certificateInfo
            }
        },
        methods:{
            //学籍异动提交
            submitEdit() {
                let teacherCertificates = {
                    'info':this.tableData,
                    'jsid':this.$props.teacherZgh
                }
                this.$POST("/teacherCertificate/batchSaveOrUpdate",teacherCertificates,{
                    transformRequest:function (data) {
                        return JSON.stringify(data);
                    },
                    headers:{"Content-Type":"application/json"}
                }).then(res => {
                    this.$message({
                        type:"success",
                        message:"修改成功!"
                    });
                });
            },
            handleClick(row) {
                // console.log(row);
            },
            addExtendList() {
                this.tableData.push({
                    jsid:this.$props.teacherZgh,
                    gwzfmc:'',
                    bfdw:'',
                    bfrq:''
                })
            },
            //删除扩展信息一条
            deleteRow(index,rows) {
                this.$confirm('此操作将删除该条信息, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    });
                    rows.splice(index,1);
                })
            }
        },
        watch:{
            certificateInfo:function (newVal,oldVal) {
                this.tableData = newVal
            },
        }
    }
</script>

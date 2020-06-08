<template>
    <!--教师工作亮信息-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不能编辑 -->
        <el-table v-if="!is_edit" :data="workloadInfo" border style="width: 100%">
            <el-table-column
                    prop="jxlx"
                    label="教学类型码"
                    align="center"
                    width="150">
                <template slot-scope="scope">
                    <p>{{scope.row.jxlx||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jxnr"
                    label="教学内容"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.jxnr||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jxgzl"
                    label="教学工作量"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.jxgzl||'-'}}</p>
                </template>
            </el-table-column>
            <!-- <el-table-column
                    prop="jxpy"
                    label="教学评语"
                    width="">
            </el-table-column> -->
            <el-table-column
                    prop="jxpy"
                    label="教学评语"
                    align="center"
                    popper-class="kuangzi"
                    width="">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" placement="bottom">
                        <div slot="content" class="kuangzi">{{scope.row.jxpy||'-'}}</div>
                        <p class="text-blue" effect="light">详情</p>
                    </el-tooltip>
                </template>

            </el-table-column>


            <el-table-column
                    prop="jxqsny"
                    align="center"
                    label="教学起始年月"
                    width="300">
                <template slot-scope="scope">
                    <p>{{scope.row.jxqsny||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jxzzny"
                    align="center"
                    label="教学终止年月"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.jxzzny||'-'}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 可编辑 -->
        <el-table v-if="is_edit" :data="tableData" border style="width: 100%">
            <el-table-column
                    prop="jxlxm"
                    label="教学类型码"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.jxlxm" placeholder="教学类型码"></el-input> -->
                    <el-select v-model="scope.row.jxlxm" placeholder="请选择教学类型码"> 
                        <el-option
                                v-for="item in jxlxmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jxnr"
                    label="教学内容"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.jxnr" placeholder="教学内容"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jxgzl"
                    label="教学工作量"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.jxgzl" placeholder="教学工作量"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jxpy"
                    label="教学评语"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.jxpy" placeholder="教学评语"></el-input>
                </template>
            </el-table-column>
            <!-- <el-table-column
                    prop="jxpy"
                    label="教学评语"
                    align="center"
                    popper-class="kuangzi"
                    width=""> 
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light"  placement="bottom" >
                        <div slot="content" class="kuangzi" >{{scope.row.jxpy}}</div>
                        <p class="text-blue" effect="light">详情</p>
                    </el-tooltip>
                </template> 
            </el-table-column> -->
            <el-table-column
                    prop="jxqsny"
                    align="center"
                    label="教学起始年月"
                    width="180">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.jxqsny"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jxzzny"
                    align="center"
                    label="教学终止年月"
                    width="180">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.jxzzny"
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
                            size="small">
                        移除
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
        name:"teacher-workload-info",
        props:['workloadInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.workloadInfo,
                jxlxmOptions:[]
            }
        },
        created(){ 
            //教学类型码下拉
            this.$POST("/system/dictList/JXLXM").then((res)=>{
                this.jxlxmOptions = res
            })
        },
        methods:{
            //教师专业 信息提交
            submitEdit() {
                let teacherWorkloads = {
                    'info':this.tableData,
                    'jsid':this.$props.teacherZgh
                }
                this.$POST("/teacherWorkload/batchSaveOrUpdate",teacherWorkloads,{
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
                    jxlxm:'',
                    jxnr:'',
                    jxgzl:'',
                    jxpy:'',
                    jxqsny:'',
                    jxzzny:'',
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
            workloadInfo:function (newVal,oldVal) {
                this.tableData = newVal
            },
        }
    }
</script>

<template>
    <!--学籍信息改动-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不能编辑 -->
        <el-table v-if="!is_edit" :data="schoolChanges" border style="width: 100%">
            <el-table-column
                    prop="ydrq"
                    label="异动日期"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ydrq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydyy"
                    label="异动原因"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ydyy||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydlb"
                    label="异动类别"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ydlb||'-'}}</p>
                </template>
            </el-table-column>
            <!-- <el-table-column
                    prop="sprq"
                    label="审批日期"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.sprq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="spwh"
                    label="审批公文"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.spwh||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydly"
                    label="异动来源"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ydly||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydqx"
                    label="异动去向"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ydqx||'-'}}</p>
                </template>
            </el-table-column> -->
            <el-table-column
                    prop="ydsm"
                    label="异动说明"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ydsm||'-'}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 可编辑 -->
        <el-table v-if="is_edit" :data="tableData" tooltip-effect="dark" border style="width: 100%">
            <el-table-column
                    prop="ydrq"
                    label="异动日期"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.ydrq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            width="100%"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydyy"
                    label="异动原因"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ydyy" placeholder="异动原因">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydlbm"
                    label="异动类别码"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.ydlbm" placeholder="异动原因">
                    </el-input> --> 
                    <el-select v-model="scope.row.ydlbm" placeholder="请选择异动类别"> 
                        <el-option
                                v-for="item in ydlbmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <!-- <el-table-column
                    prop="sprq"
                    label="审批日期"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.sprq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="spwh"
                    label="审批公文"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.spwh" placeholder="审批公文">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydly"
                    label="异动来源"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ydly" placeholder="异动来源">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ydqx"
                    label="异动去向"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ydqx" placeholder="异动去向">
                    </el-input>
                </template>
            </el-table-column> -->
            <el-table-column
                    prop="ydsm"
                    label="异动说明"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ydsm" placeholder="异动说明">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180"
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
    import './css/common-extend.less'

    export default {
        name:"school-changes",
        // props:["schoolChanges",'is_edit','studentXh'],
        props:{
            schoolChanges:{
                default:[]
            },
            is_edit:{
                default:false
            },
            studentXh:{
                default:''
            }
        },
        data() {
            return {
                tableData:this.schoolChanges,
                studentXh1:this.studentXh,
                ydlbmOptions:[]
            }
        },
        created() {
            this.$POST("/system/dictList/YDLBM").then((res)=>{
                this.ydlbmOptions = res
            })
        },
        methods:{
            //学籍异动提交
            submitEdit() {
                let schoolRolls = {
                    'info':this.tableData,
                    'xsid':this.$props.studentXh
                }
                this.$POST("/schoolRoll/updateBatch",schoolRolls,{
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
            addExtendList() {
                this.tableData.push({
                    xsid:this.$props.studentXh,
                    ydrq:'',
                    ydyy:'',
                    sprq:'',
                    spgw:'',
                    ydly:'',
                    ydqx:'',
                    ydsm:''
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
            schoolChanges:function (newVal,oldVal) {
                this.tableData = newVal
            },
        }
    }
</script>

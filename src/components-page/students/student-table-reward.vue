<template>
    <!--学校惩罚-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不可 编辑 -->
        <el-table v-if="!is_edit" :data="tableData" border style="width: 100%">
            <el-table-column
                    prop="ccyyb"
                    label="惩处名称"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ccyyb||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccmc"
                    label="惩处原因"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ccmc||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccnr"
                    label="惩处内容"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ccnr||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccwh"
                    label="惩处文号"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ccwh||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccrq"
                    label="惩处日期"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.ccrq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cccxrq"
                    label="惩处撤销日期"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.cccxrq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cccxyybm"
                    label="惩处撤销原因"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.cccxyybm||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cccxwh"
                    label="惩处撤销文号"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.cccxwh||'-'}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 可编辑 ccyybmOptions-->
        <el-table v-if="is_edit" :data="tableData" border style="width: 100%">
            <el-table-column
                    width="150"
                    prop="ccyybm"
                    label="惩处名称"
                    align="center">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.ccmc" placeholder="惩处名称"></el-input> -->
                    
                    <el-select v-model="scope.row.ccyybm" placeholder="惩处名称"> 
                        <el-option
                                v-for="item in ccyybmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccmc"
                    label="惩处原因"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ccmc" placeholder="惩处原因"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccnr"
                    label="惩处内容"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ccnr" placeholder="惩处内容"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccwh"
                    label="惩处文号"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.ccwh" placeholder="惩处文号"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ccrq"
                    label="惩处日期"
                    align="center"
                    width="160">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.ccrq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cccxrq"
                    label="惩处撤销日期"
                    align="center"
                    width="160">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.cccxrq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cccxyybm"
                    label="惩处撤销原因"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.cccxyybm" placeholder="惩处撤销原因"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cccxwh"
                    label="惩处撤销文号"
                    align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.cccxwh" placeholder="惩处撤销文号"></el-input>
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
    import './css/common-extend.less'

    export default {
        name:"school-reward",
        // props:["schoolReward",'is_edit','studentXh'],
        props:{
            schoolReward:{
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
                tableData:this.schoolReward,
                ccyybmOptions:[]
            }
        },
        created(){ 
            //获奖级别码下拉
            this.$POST("/system/dictList/CCYYBM").then((res)=>{
                this.ccyybmOptions = res
            })
        },
        methods:{
            //提交
            submitEdit() {
                let studentPunishments = {
                    'info':this.tableData,
                    'xsid':this.$props.studentXh
                }
                this.$POST("/studentPunishment/updateBatch",studentPunishments,{
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
            //添加一条信息
            addExtendList() {
                this.tableData.push({
                    xsid:this.$props.studentXh,
                    ccmc:'',
                    ccyybm:'',
                    ccnr:'',
                    ccwh:'',
                    ccrq:'',
                    cccxrq:'',
                    cccxyybm:'',
                    cccxwh:''
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
            schoolReward:function (newVal,oldVal) {
                this.tableData = newVal
            },
        }
    }
</script>

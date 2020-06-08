<template>
    <!--获奖的的-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不能编辑 -->
        <el-table v-if="!is_edit" :data="schoolPunish" border style="width: 100%">
            <el-table-column prop="hjxm" label="获奖项目">
                <template slot-scope="scope">
                    <p>{{scope.row.hjxm||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="hjfsbm" label="获奖方式" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.hjfsb||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="hjmc" label="获奖名称" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.hjmc||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="bjrq" label="颁奖日期" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.bjrq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="hjjbm" label="获奖级别码" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.hjjb||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="hryrq" label="获荣誉日期" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.hryrq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="bjdw" label="颁奖单位" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.bjdw||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="rychm" label="荣耀称号码" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.rych||'-'}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 可编辑 -->
        <el-table v-if="is_edit" :data="tableData" border style="width: 100%">
            <el-table-column prop="hjxm" label="获奖项目">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.hjxm" placeholder="获奖项目"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="hjfsbm" label="获奖方式" align="center" width="150">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.hjfsbm" placeholder="获奖方式"></el-input> -->
                    <el-select v-model="scope.row.hjfsbm" placeholder="请选择获奖方式"> 
                        <el-option
                                v-for="item in hjfsbmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="hjmc" label="获奖名称" align="center" >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.hjmc" placeholder="获奖名称"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="bjrq" label="颁奖日期" align="center" width="150">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.bjrq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期"
                    ></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="hjjbm" label="获奖级别码" align="center" width="150">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.hjjbm" placeholder="获奖级别码"></el-input> --> 
                    <el-select v-model="scope.row.hjjbm" placeholder="请选择获奖级别"> 
                        <el-option
                                v-for="item in hjjbmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="hryrq" label="获荣誉日期" align="center" width="150">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.hryrq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期"
                    ></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column prop="bjdw" label="颁奖单位" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.bjdw" placeholder="颁奖单位"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="rychm" label="荣耀称号码" align="center" width="150">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.rychm" placeholder="荣耀称号码"></el-input> -->
                    <el-select v-model="scope.row.rychm" placeholder="请选择荣耀称号"> 
                        <el-option
                                v-for="item in rychmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
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
        name:"school-punish",
        // props:["schoolPunish","is_edit","studentXh"],
        props:{
            schoolPunish:{
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
                tableData:this.schoolPunish,
                rychmOptions:[],
                hjfsbmOptions:[],
                hjjbmOptions:[],
            };
        },
        created(){
            //荣耀称号码下拉
            this.$POST("/system/dictList/RYCHM").then((res)=>{
                this.rychmOptions = res
            })
            //获奖方式编码下拉
            this.$POST("/system/dictList/HJFSBM").then((res)=>{
                this.hjfsbmOptions = res
            })
            //获奖级别码下拉
            this.$POST("/system/dictList/HJJBM").then((res)=>{
                this.hjjbmOptions = res
            })
        },
        methods:{
            //提交
            submitEdit() {
                let studentRewards = {
                    info:this.tableData,
                    xsid:this.$props.studentXh
                };
                this.$POST("/studentReward/updateBatch",studentRewards,{
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
                    hjxm:"",
                    hjfsbm:"",
                    hjmc:"",
                    bjrq:"",
                    hjjbm:"",
                    hryrq:"",
                    bjdw:"",
                    rychm:""
                });
            },
            //删除扩展信息一条
            deleteRow(index,rows) {
                this.$confirm("此操作将删除该条信息, 是否继续?","提示",{
                    confirmButtonText:"确定",
                    cancelButtonText:"取消",
                    type:"warning"
                }).then(() => {
                    this.$message({
                        type:"success",
                        message:"删除成功!"
                    });
                    rows.splice(index,1);
                })
            }
        },
        watch:{
            schoolPunish:function (newVal,oldVal) {
                this.tableData = newVal;
            }
        }
    };
</script>

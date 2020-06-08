<template>
    <!--教师专业技术-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不能编辑 -->
        <el-table v-if="!is_edit" :data="professionalInfo" border style="width: 100%">
            <!-- <el-table-column
                    prop="rzzgmc"
                    label="任职资格名称"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.rzzgmc||'-'}}</p>
                </template>
            </el-table-column> -->
            <el-table-column
                    prop="przw"
                    label="聘任职务码"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.przw||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="qdzgtj"
                    label="获取资格途径"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.qdzgtj||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="psdw"
                    label="评审单位"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.psdw||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pdrq"
                    label="评定日期"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.pdrq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="prdw"
                    label="聘任单位"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.prdw||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="prqk"
                    label="聘任情况码"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.prqk||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jprq"
                    label="解聘日期"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.jprq||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jpyy"
                    label="解聘原因"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" placement="left-end" popper-class="kuangzi">
                        <div slot="content">{{scope.row.jpyy||'-'}}</div>
                        <p class="text-blue" effect="light">详情</p>
                    </el-tooltip>
                </template>

            </el-table-column>
        </el-table>
        <!-- 可编辑 -->
        <el-table v-if="is_edit" :data="tableData" border style="width: 100%">
            <!-- <el-table-column
                    prop="rzzgmc"
                    label="任职资格名称"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.rzzgmc" placeholder="任职资格名称"></el-input>
                </template>
            </el-table-column> -->
            <el-table-column
                    prop="przwm"
                    label="聘任职务码"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.przwm" placeholder="聘任职务码"></el-input> -->
                    <el-select v-model="scope.row.przwm" placeholder="请选择聘任职务码"> 
                        <el-option
                                v-for="item in przwmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="qdzgtjm"
                    label="获取资格途径"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.qdzgtj" placeholder="获取资格途径"></el-input> -->
                    <el-select v-model="scope.row.qdzgtjm" placeholder="请选择获取资格途径"> 
                        <el-option
                                v-for="item in qdzgtjOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="psdw"
                    label="评审单位"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.psdw" placeholder="评审单位"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pdrq"
                    label="评定日期"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.pdrq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="prdw"
                    label="聘任单位"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.prdw" placeholder="聘任单位"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="prqkm"
                    label="聘任情况码"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.prqkm" placeholder="聘任情况码"></el-input> -->
                    <el-select v-model="scope.row.prqkm" placeholder="请选择获取聘任情况码"> 
                        <el-option
                                v-for="item in prqkmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jprq"
                    label="解聘日期"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <el-date-picker
                            v-model="scope.row.jprq"
                            value-format="yyyy年MM月dd日"
                            format="yyyy年MM月dd日"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="jpyy"
                    label="解聘原因"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.jpyy" placeholder="解聘原因"></el-input>
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
        name:"teacher-professional-info",
        props:['professionalInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.professionalInfo,
                qdzgtjOptions:[],
                przwmOptions:[],
                prqkmOptions:[],
            }
        },
        created(){  
            //取得资格途径码下拉
            this.$POST("/system/dictList/QDZGTJM").then((res)=>{
                this.qdzgtjOptions = res
            })
            //聘任职务码下拉
            this.$POST("/system/dictList/PRZWM").then((res)=>{
                this.przwmOptions = res
            })
            //聘任情况码下拉
            this.$POST("/system/dictList/PRQKM").then((res)=>{
                this.prqkmOptions = res
            })
        },
        methods:{
            //教师专业 信息提交
            submitEdit() {
                let teacherSkills = {
                    'info':this.tableData,
                    'jsid':this.$props.teacherZgh
                }
                this.$POST("/teacherSkill/batchSaveOrUpdate",teacherSkills,{
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
                    rzzgmc:'',
                    qdzgtj:'',
                    psdw:'',
                    pdrq:'',
                    przwm:'',
                    prdw:'',
                    prqkm:'',
                    jprq:'',
                    jpyy:'',
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
            professionalInfo:function (newVal,oldVal) {
                this.tableData = newVal
            },
        }
    }
</script>

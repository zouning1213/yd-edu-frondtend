<template>
    <!--教师语言能力信息-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不能编辑 -->
        <el-table v-if="!is_edit" :data="languageInfo" border style="width: 100%">
            <el-table-column
                    prop="wgyz"
                    label="外国语种码"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.wgyz||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="wgyzsl"
                    label="外国语种熟练"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.wgyzsl||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zgyz"
                    align="center"
                    label="中国语种码">
                <template slot-scope="scope">
                    <p>{{scope.row.zgyz||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zgyzsl"
                    label="中国语种熟练"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.zgyzsl||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pthspd"
                    label="普通话水平等"
                    align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.pthspd||'-'}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 能编辑 -->
        <el-table v-if="is_edit" :data="tableData" border style="width: 100%">
            <el-table-column
                    prop="wgyzm"
                    label="外国语种码"
                    align="center">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.wgyzm" placeholder="外国语种码"></el-input> -->
                    <el-select v-model="scope.row.wgyzm" placeholder="请选择外国语种码"> 
                        <el-option
                                v-for="item in wgyzmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="wgyzslm"
                    label="外国语种熟练"
                    align="center">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.wgyzslm" placeholder="外国语种熟练"></el-input> -->
                    <el-select v-model="scope.row.wgyzslm" placeholder="请选择外国语种熟练"> 
                        <el-option
                                v-for="item in wgyzslmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zgyzm"
                    align="center"
                    label="中国语种码">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.zgyzm" placeholder="中国语种码"></el-input> -->
                    <el-select v-model="scope.row.zgyzm" placeholder="请选择中国语种码"> 
                        <el-option
                                v-for="item in zgyzmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="zgyzslm"
                    label="中国语种熟练"
                    align="center">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.zgyzslm" placeholder="中国语种熟练"></el-input> -->
                    <el-select v-model="scope.row.zgyzslm" placeholder="请选择中国语种熟练"> 
                        <el-option
                                v-for="item in zgyzslmOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    prop="pthspd"
                    label="普通话水平等"
                    align="center">
                <template slot-scope="scope">
                    <!-- <el-input v-model="scope.row.pthspd" placeholder="普通话水平等"></el-input> -->
                    <el-select v-model="scope.row.pthspd" placeholder="请选择普通话水平等"> 
                        <el-option  label="一级甲等" value="一级甲等"></el-option>
                        <el-option  label="一级乙等" value="一级乙等"></el-option>
                        <el-option  label="二级甲等" value="二级甲等"></el-option>
                        <el-option  label="二级乙等" value="二级乙等"></el-option>
                        <el-option  label="三级甲等" value="三级甲等"></el-option>
                        <el-option  label="三级乙等" value="三级乙等"></el-option>
                    </el-select>
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
        name:"teacher-language-info",
        props:['languageInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.languageInfo,
                zgyzmOptions:[],
                wgyzmOptions:[],
                zgyzslmOptions:[],
                wgyzslmOptions:[],
                pthspdOptions:[]
            }
        },
        created(){ 
            //中国语种码下拉
            this.$POST("/system/dictList/ZGYZM").then((res)=>{
                this.zgyzmOptions = res
            })
            //外国语种码下拉
            this.$POST("/system/dictList/WGYZM").then((res)=>{
                this.wgyzmOptions = res
            })
            //中国语种熟练码下拉
            this.$POST("/system/dictList/ZGYZSLM").then((res)=>{
                this.zgyzslmOptions = res
            })
            //外国语种熟练码下拉
            this.$POST("/system/dictList/WGYZSLM").then((res)=>{
                this.wgyzslmOptions = res
            })
            //普通话水平等级下拉
            this.$POST("/system/dictList/PTHSPDJM").then((res)=>{
                this.pthspdOptions = res
            })
        },
        methods:{
            //教师专业 信息提交
            submitEdit() {
                let teacherLanguages = {
                    'info':this.tableData,
                    'jsid':this.$props.teacherZgh
                }
                this.$POST("/teacherLanguage/batchSaveOrUpdate",teacherLanguages,{
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
                    wgyzm:'',
                    wgyzsl:'',
                    zgyzm:'',
                    zgyzsl:'',
                    pthspd:''
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
            languageInfo:function (newVal,oldVal) {
                this.tableData = newVal
            },
        }
    }
</script>

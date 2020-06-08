<template>
    <div class="setting-common-pd setting-grade"
         :style='{"minHeight":this.$store.state.minClientHeight-230+"px"}'>
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" size="small">
            <ul class="setting-ul">
                <li>
                    <h3>成绩录入时间：</h3>
                    <div>
                        <el-form-item label="开始录入时间">
                            <el-date-picker
                                    v-model="kssj"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束录入时间">
                            <el-date-picker
                                    v-model="jssj"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期"
                                    :start-placeholder="jssj">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="mt-10 mb-20" style="margin-left: 95px">
                        <!-- <el-button size="small" type="info">取消</el-button> -->
                        <el-button size="small" type="primary"  @click="submit()">确定</el-button>
                    </div>
                    <p class="tip">
                        <i class="el-icon-warning-outline"></i>这是一段解释跟说明</p>
                </li>
            </ul>
        </el-form>
    </div>
</template>

<script>
import { join } from 'path'
    export default {
        name:"setting-grade",
        data() {
            return {
                ruleForm:{},
                tableData:[],
                kssj:'',
                jssj:''
            }
        },
        created(){ 
            this.$GET("/systemVariable/queryByGn/CJLR",).then((res)=>{
                this.tableData = res[0] 
                this.kssj = res[0].blsj.split(',')[0]
                this.jssj = res[0].blsj.split(',')[1] 
                // console.log(this.kssj)
                // console.log(this.jssj)
                // console.log(this.tableData)
            })
        },
        methods:{
            submit(){
                // console.log(this.tableData)  
                this.tableData.blsj = this.kssj+','+this.jssj
                // console.log(this.tableData)
                this.$POST("/systemVariable/updateList",[this.tableData],{
                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res)=>{
                    if(res.code==200){
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
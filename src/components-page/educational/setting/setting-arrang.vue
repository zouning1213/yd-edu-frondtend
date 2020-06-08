<template>
    <div class="setting-common-pd setting-arrang"
         :style='{"minHeight":this.$store.state.minClientHeight-230+"px"}'>
        <el-form :model="ruleForm" ref="ruleForm">
            <ul class="setting-ul">
                <li v-for="(item,index) in tableData" :key="index">
                    <h3>{{item.blms}}：</h3>
                    <div v-if="item.bllx=='onoff'">
                        <!-- <el-switch v-model="item.blsj"></el-switch> -->
                        <el-switch
                            v-model="item.blsj"
                            active-color="#13ce66"
                            inactive-color="#EFECEC"
                            active-value="1"
                            inactive-value="0"
                            :width="72"
                        ></el-switch>

                        <span class="tip" style="margin-left: 14px">
                                        <i class="el-icon-warning-outline"></i>{{item.bz}}</span>
                    </div>
                    <div v-if="item.bllx=='keyvalue'"> 
                        <el-input v-model="item.blsj" style="width:80px" size="small" type="number"></el-input>

                        <span class="tip" style="margin-left: 14px">
                                        <i class="el-icon-warning-outline"></i>{{item.bz}}</span>
                    </div>
                </li>
                <!-- <li>
                    <h3>专业课连堂课设置：</h3>
                    <div>
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                        <span class="tip" style="margin-left: 14px">
                                        <i class="el-icon-warning-outline"></i>这是一段解释跟说明</span>
                    </div>
                </li>
                <li>
                    <h3>教师默认堂课设置量：</h3>
                    <div>
                        <el-switch v-model="ruleForm.delivery"></el-switch>
                        <span class="tip" style="margin-left: 14px">
                                        <i class="el-icon-warning-outline"></i>这是一段解释跟说明</span>
                    </div>
                </li> -->
            </ul>
            <el-button style="margin-top:10px" type="primary" @click="submit()">确定</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name:"setting-arranging",
        data() {
            return {
                ruleForm:{},
                tableData:[]
            }
        },
        created(){ 
            this.$GET("/systemVariable/queryByGn/PKCS",).then((res)=>{
                this.tableData = res
                // console.log(this.tableData)
            })
        },
        methods:{
            submit(){
                // console.log(this.tableData)
                this.$POST("/systemVariable/updateList",this.tableData,{
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

<style lang='less'>
.setting-arrang{
    .el-switch.is-checked .el-switch__core::after {
        left: 100%;
        margin-left: -37px;
    }
}

</style>
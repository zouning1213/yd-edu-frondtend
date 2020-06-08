<template>
    <div class="setting-common-pd setting-named"
         :style='{"minHeight":this.$store.state.minClientHeight-230+"px"}'>
        <el-form :inline="true" :model="ruleForm" ref="ruleForm" size="small"  >
            <ul class="setting-ul">
                <li v-for="(item,index) in systemName" :key="index">
                    <h3>{{item.blms}}:</h3>
                    <div>
                        <el-form-item  >
                            <el-input v-model="item.blsj"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span style="margin-left: 14px">默认规则</span>
                        </el-form-item>
                    </div>
                    <p class="tip">
                        <span v-if='index==0'>
                            <i class="el-icon-warning-outline"></i>
                            班号参数列表：{NJJC}=年级简称,{NJ}=年级,{ZY}=专业号,{LS}=流水号。
                            例如：{NJJC}{ZY}{LS}分别对应'19''28156''01'，该规则命名下数据：192815601
                        </span>
                        <span v-if='index==1'>
                            <i class="el-icon-warning-outline"></i>
                            班级参数列表：{NJJC}=年级简称,{NJ}=年级,{ZYMC}=专业号,{LS}=流水号。
                            例如：{NJJC}{ZYMC}{LS}分别对应'19''28156''01'，该规则命名下数据：192815601
                        </span>
                        <span v-if='index==2'>
                            <i class="el-icon-warning-outline"></i>
                            学号参数列表：{NJJC}=年级简称,{NJ}=年级,{ZY}=专业号,{BJLSH,4}={班级流水号,流水号位数}{ZYLSH,4}={专业流水号,流水号位数}{QXLSH,4}={全校流水号,流水号位数}。
                            例如：{NJ}{ZY}{ZYLSH,4}分别对应'19''28156''0001'，该规则命名下数据：19281560001
                        </span> 
                    </p>
                </li>
                <!-- <li>
                    <h3>班级命名规则：</h3>
                    <div>
                        <el-form-item>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span style="margin-left: 14px">该名字为默认命名</span>
                        </el-form-item>
                    </div>
                    <p class="tip">
                        <i class="el-icon-warning-outline"></i>这是一段解释跟说明</p>
                </li>
                <li>
                    <h3>学号命名规则：</h3>
                    <div>
                        <el-form-item>
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span style="margin-left: 14px">该名字为默认命名</span>
                        </el-form-item>
                    </div>
                    <p class="tip">
                        <i class="el-icon-warning-outline"></i>这是一段解释跟说明</p>
                </li> -->
            </ul>
            <el-button style="margin-top:10px" type="primary" @click="submit('ruleForm')">确定</el-button>
        </el-form>
    </div>
</template>

<script>
    let a = /(\{([0-9A-Za-z])+\})+/g
    export default {
        name:"setting-named",
        data() {
            return {
                ruleForm:{},
                systemName:[],
                // rules:{
                //     systemName:[
                //          { required: true, validator: validatePass,trigger: 'blur' },
                //     ]
                // }
            }
        },
        created(){
            this.$GET("/systemVariable/list",{limit:10,page:1,condition:'MMGZ'}).then((res)=>{
                this.systemName = res.data
            })


        
            // var validatePass = (rule, value, callback) => {
            //     console.log(rule,value)
            //     if (!a.test(value)) {
            //     callback(new Error('请输入正确的格式'));
            //     } else { 
            //     callback();
            //     }
            // };
            // let a  = /(\{([0-9A-Za-z])+\})+/g
            // console.log(a.test('{}'))
        },
        methods:{
            submit(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                if (valid) { 
                    // console.log(this.systemName)  
                    this.$POST("/systemVariable/updateList",this.systemName,{
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            }, 
        }
    }
</script>

<style scoped>

</style>
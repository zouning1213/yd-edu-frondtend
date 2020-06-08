<template>
    <!--添加学生惩罚-->
    <el-row>
        <el-col :md="22" :xl="22">
            <el-form ref="studentReward" :model="form" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :md="12" :xl="12">
                        <el-form-item label="学号:" prop="xh">
                            <el-input v-model="form.xh" :disabled="is_edit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12" :xl="12">
                        <el-form-item label="姓名:" prop="xm">
                            <el-input v-model="form.xm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="专业:">
                            <el-input v-model="form.zymc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="获奖项目:">
                            <el-input v-model="form.hjxm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="获奖方式:">
                            <el-input v-model="form.hjfsbm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="获奖名称:">
                            <el-input v-model="form.hjmc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="颁发日期:">
                            <el-date-picker
                                    v-model="form.bjrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="14" :xl="14">
                        <el-form-item label="颁发单位:">
                            <el-input v-model="form.bjdw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="获奖级别码:">
                            <el-input v-model="form.hjjbm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="获奖方式码:">
                            <el-input v-model="form.hjfsbm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="14" :xl="14">
                        <el-form-item label="获荣誉日期:">
                            <el-date-picker
                                    v-model="form.hryrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="14" :xl="14">
                        <el-form-item label="荣誉称号码:">
                            <el-input v-model="form.rychm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name:"student-reward-add",
        props:{
            is_edit:{
                default:false
            },
            form:{
                default:{}
            }
        },
        data() {
            return {
                rules:{
                    xh:[
                        {
                            required:true,
                            message:'请输入学号',
                            trigger:'blur'
                        }
                    ],
                    xm:[
                        {
                            min:2,
                            max:5,
                            message:'长度在 3 到 5 个字符',
                            trigger:'blur'
                        }
                    ]
                },
            }
        },
        methods:{
            submitInfoForm() { //需要提交的地址
                this.$refs.studentReward.validate((valid) => {
                    //验证成功
                    if (valid) {
                        if (!this.is_edit) {
                            this.$emit('receivesReward',this.form)
                        } else {
                            this.$emit('editReward',this.form)
                        }
                    } else {
                        this.$message.error('请输入必填项');
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
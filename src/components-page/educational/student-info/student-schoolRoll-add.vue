<template>
    <el-row>
        <el-col :md="22" :xl="22">
            <el-form ref="studentSchoolRoll" :rules="rules" :model="form" label-width="120px">
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
                        <el-form-item label="异动日期:">
                            <el-date-picker
                                    v-model="form.ydrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="异动原因:">
                            <el-input v-model="form.ydyy"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="异动来源:">
                            <el-input v-model="form.ydly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="异动去向:">
                            <el-input v-model="form.ydqx"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="异动说明:">
                            <el-input type="textarea" v-model="form.ydsm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="审批日期:">
                            <el-date-picker
                                    v-model="form.sprq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="审批公文:">
                            <el-input v-model="form.spwh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name:"student-schoolRoll-add",
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
                // console.log(2)
                this.$refs.studentSchoolRoll.validate((valid) => {
                    //验证成功
                    if (valid) {
                        if (!this.is_edit) {
                            this.$emit('receivesSchoolRoll',this.form)
                        } else {
                            this.$emit('editSchoolRoll',this.form)
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
<template>
    <!--添加惩罚-->
    <el-row>
        <el-col :md="22" :xl="22">
            <el-form ref="studentPunishment" :model="form" :rules="rules" label-width="120px">
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
                            <!-- <el-input v-model="form.zymc"></el-input> -->
                            <el-select v-model="form.zyid" placeholder="请选择专业" @change="zychange">
                                <el-option
                                            v-for="item in zyOptions"
                                            :key="item.zyid"
                                            :label="item.zymc"
                                            :value="item.zyid">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="惩罚名称:">
                            <el-input v-model="form.ccmc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="惩罚原因:">
                            <el-input v-model="form.ccyybm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="惩罚内容:">
                            <el-input type="textarea" v-model="form.ccnr"></el-input>
                        </el-form-item>
                    </el-col> 
                    <el-col :md="24" :xl="24">
                        <el-form-item label="惩处日期:">
                            <el-date-picker
                                    v-model="form.ccrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label="惩处撤销日期:">
                            <el-date-picker
                                    v-model="form.cccxrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="14" :xl="14">
                        <el-form-item label="惩处撤销文号:">
                            <el-input v-model="form.cccxwh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name:"student-punishment-add",
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
                zyOptions:[],
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
                this.$refs.studentPunishment.validate((valid) => {
                    //验证成功
                    if (valid) {
                        if (!this.is_edit) {
                            this.$emit('receivesPunishment',this.form)
                        } else {
                            this.$emit('editPunishment',this.form)
                        }
                    } else {
                        this.$message.error('请输入必填项');
                    }
                })
            },
            zychange(){
                // console.log("专业改变")
                // this.form.zymc = ''
                // console.log(this.form)
            }
        },
        created(){
            //专业下拉框
            this.$GET('/majorInfo/selectList',).then((res) => { 
                this.zyOptions = res.data 
            })
        }
    }
</script>

<style scoped>

</style>
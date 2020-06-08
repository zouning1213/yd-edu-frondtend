<template>
    <!--入学信息表单-->
    <div class="yd-common-info">
        <!--可编辑-->
        <div v-if="is_edit" class="common-info-edit">
            <el-form label-position="right"
                     :rules="rules"
                     ref="studentSchoolForm"
                     :model="schoolForm"
                     label-width="120px">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="rxkslbm" label="考生类别:">
                            <el-select v-model="schoolForm.rxkslbm" placeholder="请选择">
                                <el-option
                                        v-for="item in kslbOptions"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="入学学年:" prop="rxxn">
                            <el-date-picker
                                    v-model="schoolForm.rxxn"
                                    type="year"
                                    format="yyyy年"
                                    value-format="yyyy年"
                                    placeholder="选择年">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="byxx" label="毕业学校:">
                            <el-input v-model="schoolForm.byxx" placeholder="请输入毕业学校"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item prop="" label=" ">
                            <el-button type="primary" @click="submitInfoForm">保存</el-button>
                            <el-button @click="emptyForm">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--不可编辑-->
        <div v-else class="common-info-look">
            <el-form label-position="right"
                     :rules="rules"
                     :inline="true"
                     :model="schoolForm"
                     label-width="120px">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8" :span="8">
                        <el-form-item prop="rxkslb" label="考生类别:">
                            <span>{{schoolForm.rxkslb}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8" :span="8">
                        <el-form-item label="入学学年:" prop="rxxn">
                            <span>{{schoolForm.rxxn}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8" :span="8">
                        <el-form-item prop="byxx" label="毕业学校:">
                            <span>{{schoolForm.byxx}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'

    import './css/common-info.less'

    export default {
        name:"info-school-form",
        // props:['is_edit','schoolForm'],
        props:{
            is_edit:{
                default:false
            },
            schoolForm:{
                default:{}
            },
            postUrl:{
                default:'/studentInfo/eduUpdate' //默认教务的上传地址
            }
        },
        data() {
            return {
                kslb:'',
                kslbOptions:[],
                rules:{
                    // byxx:[{
                    //     required:true,
                    //     message:'请输入毕业学校',
                    //     trigger:'blur'
                    // }],
                    rxkslbm:[{
                        required:true,
                        message:'请选择考生类别',
                        trigger:'blur'
                    }],
                    rxxn:[{
                        required:true,
                        message:'请选择入学学年',
                        trigger:'change'
                    }],
                }
            }
        },
        created() {
            console.log(this.schoolForm)
            this.$POST("/system/dictList/RXKSLBM").then((res) => {
                // console.log(res)
                this.kslbOptions = res
                // console.log(this.$props.schoolForm)
            })
        },
        methods:{
            submitInfoForm() { //需要提交的地址
                this.$refs.studentSchoolForm.validate((valid) => {
                    //验证成功
                    if (valid) {
                        this.$POST(this.postUrl,this.schoolForm).then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message:'编辑成功',
                                    type:'success'
                                });
                                //更新vuex 里面的用户信息
                                this.$POST('/system/user_info').then((res) => {
                                    if (res.code == 200){
                                        auth.setItemUserInfo(res.data);
                                        this.$store.commit("setUserInfo",res.data);
                                    }
                                })

                                //向父组件发送成功事件
                                this.$emit('success')

                            } else {
                                this.$message.error('编辑失败，请重新编辑')
                            }
                        })
                    } else {
                        this.$message.error('请输入必填项');
                    }
                })
            },
            emptyForm(){
                this.$refs.studentSchoolForm.clearValidate();
                //向父组件发送成功事件
                this.$emit('success')
            },
        }
    }
</script>

<style scoped lang="less">

</style>

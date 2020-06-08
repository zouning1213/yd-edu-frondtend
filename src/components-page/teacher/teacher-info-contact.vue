<template>
    <!--教师联系方式-->
    <div class="yd-common-info">
        <!--可编辑-->
        <div v-if="is_edit" class="common-info-edit">
            <el-form :model="infoContact"
                     ref="studentContact"
                     label-width="120px">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="手机号:">
                            <el-input v-model="infoContact.lxdh" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="电子邮箱:" prop="dzxx">
                            <el-input v-model="infoContact.dzxx" placeholder="请输入电子邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="qq:" prop="qq">
                            <el-input v-model="infoContact.qq" placeholder="请输入qq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">

                        <el-form-item label="微信号:" prop="wxh">
                            <el-input v-model="infoContact.wxh" placeholder="请输入微信号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="通信地址:" prop="txdz">
                            <el-input v-model="infoContact.txdz" placeholder="请输入通信地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="主页地址:" prop="zydz">
                            <el-input v-model="infoContact.zydz" placeholder="请输入主页地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="24" :xl="24">
                        <el-form-item label=" " prop="">
                            <el-button type="primary" @click="submitInfoForm">保存</el-button>
                            <!-- <el-button>取消</el-button> -->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--不可编辑-->
        <div v-else class="common-info-look">
            <el-form :model="infoContact"
                     ref="studentContact"
                     label-width="120px">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="手机号:">
                            <span>{{infoContact.lxdh}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="电子邮箱:" prop="dzxx">
                            <span>{{infoContact.dzxx}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="qq:" prop="qq">
                            <span>{{infoContact.qq}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="微信号:" prop="wxh">
                            <span>{{infoContact.wxh}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="通信地址:" prop="txdz">
                            <span>{{infoContact.txdz}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="主页地址:" prop="zydz">
                            <span>{{infoContact.zydz}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'

    import '../students/css/common-info.less'

    export default {
        name:"info-contact-form",
        props:{
            is_edit:{
                default:false
            },
            infoContact:{
                default:{}
            },
            // postUrl:{
            //     default:''
            // }
        },
        data() {
            return {}
        },
        methods:{
            submitInfoForm() {
                this.$refs.studentContact.validate((valid) => {
                    if (valid) {
                        this.$POST('/teacherInfo/update',this.infoContact).then((res) => {
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
                                this.$message.error('修改失败,请重新修改');
                            }
                        })
                    } else {
                        this.$message.error('请先填写必填项');
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
</style>

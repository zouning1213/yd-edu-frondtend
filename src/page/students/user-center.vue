<template>
    <!--个人中心-->
    <div class="yd-personal-center">
        <el-row class="yd-router-title yd-bg">
            <div class="title-icon icon-skin"><i class="yd icon-home"></i></div>
            <h3>个人中心</h3>
        </el-row>

        <div class="yd-bg common-pd" :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <!-- <h2>账号绑定</h2>
            <el-row>
                <el-col :span="12" class="email-wrap">
                    <div class="email-cener fl">
                        <i class="yd icon-youxiang1 fl"></i>
                        <div class="fl">
                            <p><span>邮箱</span> <span class="bangding">未绑定</span></p>
                            <p class="notice">可用邮箱直接登录账号，找回密码</p>
                        </div>
                    </div>
                    <el-button plain class="fr border-skin font-skin  ">绑定</el-button>
                </el-col>
            </el-row> -->

            <h2>修改密码</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" width='320px' class="demo-ruleForm">
                <el-form-item label="" prop="age" style="width:320px">
                    <el-input type="password" v-model.number="ruleForm.age" placeholder="请输入原始密码"><i slot="prefix"
                                                                                                     class="el-input__icon el-icon-lock"></i>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="pass" style="width:320px">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"><i
                            slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPass" style="width:320px">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="再次确定密码"><i
                            slot="prefix" class="el-input__icon el-icon-lock"></i></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width:320px">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name:"teacher-user-center",
        data() {
            var checkAge = (rule,value,callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule,value,callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule,value,callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                search:'',
                ruleForm:{
                    pass:'',
                    checkPass:'',
                    age:''
                },
                rules:{
                    pass:[
                        {validator:validatePass,trigger:'blur'}
                    ],
                    checkPass:[
                        {validator:validatePass2,trigger:'blur'}
                    ],
                    age:[
                        {validator:checkAge,trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let account = JSON.parse(localStorage.getItem("user")).xsid
                        let a = {
                            oldPassword:this.ruleForm.age,
                            newPassword:this.ruleForm.pass,
                            account:account
                        }
                        // console.log(account)
                        // console.log(a)
                        this.$GET("/system/changePwd",a).then((res) => {
                            // console.log(res)
                            if (res.code == 200) {
                                this.$message({
                                    message:res.message,
                                    type:'success'
                                });
                            } else {
                                this.$message({
                                    message:res.message,
                                    type:'error'
                                });
                            }
                        })
                    } else {
                        this.$message.error('失败');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .yd-personal-center {
        .common-pd {
            padding: 50px;
            > h2 {
                font-size: 20px;
                margin-bottom: 30px;
            }
            .email-wrap {
                padding: 20px 0;
                border-bottom: 2px solid rgba(244, 244, 244, 1);
                margin-bottom: 80px;
                .email-cener {
                    color: #666;
                    i {
                        font-size: 18px;
                        line-height: 40px;
                        margin-right: 20px;
                    }
                    .bangding {
                        margin-left: 10px;
                        cursor: pointer;
                        color: #EB5870;
                    }
                    .notice {
                        font-size: 14px;
                        margin-top: 8px;
                    }
                }
            }
        }

    }
</style>
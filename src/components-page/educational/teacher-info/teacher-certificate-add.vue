<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="教师职工号:">
                <el-input v-model="form.zgh"></el-input>
            </el-form-item>
            <el-form-item label="教师姓名:">
                <el-input v-model="form.xm"></el-input>
            </el-form-item>
            <el-form-item label="岗位证书名称:">
                <el-input v-model="form.gwzfmc"></el-input>
            </el-form-item>
            <el-form-item label="颁发单位:">
                <el-input v-model="form.bfdw"></el-input>
            </el-form-item>
            <el-form-item label="颁发日期:">
                <el-input v-model="form.bfrq"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name:"teacher-certificate-add",
        props:{
            is_edit:{
                default:false
            },
            form:{
                default:{}
            }
        },
        methods:{
            submitInfoForm() { //需要提交的地址
                // console.log(2)
                this.$refs.form.validate((valid) => {
                    //验证成功
                    if (valid) {
                        if (!this.is_edit) {
                            this.$emit('receivesCertificate',this.form)
                        } else {
                            this.$emit('editCertificate',this.form)
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
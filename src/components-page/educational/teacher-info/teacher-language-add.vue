<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="教师职工号:">
                <el-input v-model="form.zgh"></el-input>
            </el-form-item>
            <el-form-item label="教师姓名:">
                <el-input v-model="form.xm"></el-input>
            </el-form-item>
            <el-form-item label="外国语种码:">
                <el-input v-model="form.wgwzm"></el-input>
            </el-form-item>
            <el-form-item label="外国语种熟练:">
                <el-input v-model="form.wgyzsl"></el-input>
            </el-form-item>
            <el-form-item label="中国语种码:">
                <el-input v-model="form.zgyzm"></el-input>
            </el-form-item>
            <el-form-item label="中国语种熟练:">
                <el-input v-model="form.zgyzsl"></el-input>
            </el-form-item>
            <el-form-item label="普通话水平等:">
                <el-input v-model="form.pthspd"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name:"teacher-language-add",
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
                this.$refs.form.validate((valid) => {
                    //验证成功
                    if (valid) {
                        if (!this.is_edit) {
                            this.$emit('receivesLanguage',this.form)
                        } else {
                            this.$emit('editLanguage',this.form)
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
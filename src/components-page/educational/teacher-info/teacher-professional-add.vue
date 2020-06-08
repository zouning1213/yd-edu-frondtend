<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="教师职工号:">
                <el-input v-model="form.zgh"></el-input>
            </el-form-item>
            <el-form-item label="教师姓名:">
                <el-input v-model="form.xm"></el-input>
            </el-form-item>
            <el-form-item label="任职资格名称:">
                <el-input v-model="form.rzzgmc"></el-input>
            </el-form-item>
            <el-form-item label="获取资格途径:">
                <el-input v-model="form.qdzgtj"></el-input>
            </el-form-item>
            <el-form-item label="评审单位:">
                <el-input v-model="form.psdw"></el-input>
            </el-form-item>
            <el-form-item label="评定日期:">
                <el-input v-model="form.pdrq"></el-input>
            </el-form-item>
            <el-form-item label="聘任职务码:">
                <el-input v-model="form.przwm"></el-input>
            </el-form-item>
            <el-form-item label="聘任单位:">
                <el-input v-model="form.prdw"></el-input>
            </el-form-item>
            <el-form-item label="聘任情况码:">
                <el-input v-model="form.prqkm"></el-input>
            </el-form-item>
            <el-form-item label="解聘日期:">
                <el-input v-model="form.jprq"></el-input>
            </el-form-item>
            <el-form-item label="解聘原因:">
                <el-input v-model="form.jpyy"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name:"teacher-professional-add",
        props:{
            is_edit:{
                default:false
            },
            form:{
                default:{}
            }
        },
        data() {
            return {}
        },
        methods:{
            submitInfoForm() { //需要提交的地址
                this.$refs.form.validate((valid) => {
                    //验证成功
                    if (valid) {
                        if (!this.is_edit) {
                            this.$emit('receivesProfessional',this.form)
                        } else {
                            this.$emit('editProfessional',this.form)
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
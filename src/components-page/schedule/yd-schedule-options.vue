<template>
    <!--日程表设置-->
    <el-form :inline="true" :model="form" size="small" label-width="70px">
        <el-form-item label="课程简称">
            <el-switch
                    v-model="form.showJC"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6">
            </el-switch>
        </el-form-item>
        <el-form-item label="显示教师" v-show="mark != 'teacherInfo'">
            <el-switch
                    v-model="form.showJS"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6">
            </el-switch>
        </el-form-item>
        <el-form-item label="显示教室" v-show="mark != 'classRoom'">
            <el-switch
                    v-model="form.showJSH"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6">
            </el-switch>
        </el-form-item>
        <el-form-item label="显示周次" v-show="mark != 'classRoom'">
            <el-switch
                    v-model="form.showZC"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6">
            </el-switch>
        </el-form-item>
        <el-form-item label="显示班级" v-show="mark != 'classInfo'">
            <el-switch
                    v-model="form.showBJ"
                    active-color="#13ce66"
                    inactive-color="#dcdfe6">
            </el-switch>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name:"yd-schedule-options",
        props:{
            mark:{
                required:true
            },
        },
        data() {
            return {
                form:{
                    showJC:false, //显示简称
                    showJS:false, //显示教师
                    showJSH:false, //显示教室
                    showZC:false, //显示周次
                    showBJ:false, //显示班级
                }
            }
        },
        methods:{},
        watch:{
            form:{
                handler(val,oldVal) {
                    this.$emit('changeOptions',this.form)
                },
                deep:true
            }
        }
    }
</script>

<style scoped>

</style>
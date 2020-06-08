<template>
    <!--学生学籍信息-->
    <van-cell-group>
        <van-field
                v-model="form.yxbm"
                type="text"
                label="院系"
                :disabled="is_edit"
                placeholder=""/>
        <van-field
                v-model="form.zymc"
                type="text"
                label="专业"
                :disabled="is_edit"
                placeholder=""/>
        <van-field
                v-model="form.bjmc"
                type="text"
                label="班级"
                :disabled="is_edit"
                placeholder=""/>
        <van-field
                v-model="form.xjzt"
                type="text"
                label="学籍状态"
                :disabled="is_edit"
                placeholder=""/>
        <van-field
                v-model="form.byss"
                type="text"
                label="毕业时间"
                :disabled="is_edit"
                placeholder=""/>
        <van-field
                v-model="form.xz"
                type="text"
                label="学制"
                :disabled="is_edit"
                placeholder=""/>
        <van-field
                v-model="form.xslbm"
                type="text"
                label="学生类别"
                :disabled="is_edit"
                placeholder=""/>
    </van-cell-group>
</template>

<script>
    export default {
        name:"info-schoolRoll",
        props:{
            form:{
                default:{},
                required:true
            },
            is_edit:{
                default:false,
            }
        },
        mounted() {
            this.$nextTick(() => {
                console.log(this.form)
            })
        },

    }
</script>

<style scoped>

</style>
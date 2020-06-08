<template>
    <!--学生入学信息-->
    <van-cell-group>
        <van-field
                v-model="form.byxx"
                type="text"
                label="毕业学校"
                :disabled="is_edit"
                placeholder=" "/>
        <van-field
                v-model="form.rxny"
                type="text"
                label="入学学年"
                :disabled="is_edit"
                placeholder=" "/>
        <van-field
                v-model="form.rxkslb"
                type="text"
                label="考生类别"
                :disabled="is_edit"
                placeholder=" "/>
    </van-cell-group>
</template>

<script>
    export default {
        name:"info",
        props:{
            form:{
                default:{},
                required:true
            },
            is_edit:{
                default:false,
            }
        },
    }
</script>

<style scoped>

</style>
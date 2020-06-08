<template>
    <!--使用方法
    <yd-export-data
            :url="remoteHost + '/classInfo/exportData?zyids='"
            name="专业班级">
    </yd-export-data>
    -->
    <!--导出数据-->
    <el-button type="success" @click="exportClass" style="margin-left: 10px">导出</el-button>
</template>

<script>
    export default {
        name:"yd-export-data",
        props:{
            url:{
                required:true
            },
            name:{
                default:'导出'
            }
        },
        data() {
            return {}
        },
        mounted() {
            // console.log(this.url)
        },
        methods:{
            exportClass() {
                location.href = this.url
            }
        }
    }
</script>

<style scoped>

</style>
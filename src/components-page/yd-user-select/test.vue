<template>
    <!--测试页面-->
    <div style="margin: 200px 0">
        <el-form label-width="120px">
            <el-form-item label="选择用户:">
                <user-select></user-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import userSelect from './yd-user-select'

    export default {
        name:"test",
        components:{
            userSelect
        }
    }
</script>

<style scoped>

</style>
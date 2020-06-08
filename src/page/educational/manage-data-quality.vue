<template>
    <!--数据质量核查-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-home"></i></div>
                <h3>数据质量核查</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append" >搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:"manage-data-quality",
        data(){
            return{
                search:''
            }
        }
    }
</script>

<style scoped>

</style>
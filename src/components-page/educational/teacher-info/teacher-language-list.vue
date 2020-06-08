<template>
    <!--语言能力-->
    <div class="yd-common-table">
        <el-table :data="languageInfo" border style="width: 100%">
            <el-table-column
                    prop="wgwzm"
                    label="外国语种码"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="wgyzsl"
                    label="外国语种熟练"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="zgyzm"
                    align="center"
                    label="中国语种码">
            </el-table-column>
            <el-table-column
                    prop="zgyzsl"
                    label="中国语种熟练"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="pthspd"
                    label="普通话水平等"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
                <template slot-scope="scope">
                    <el-button @click="editInform(scope.row)" class="edit-btn" type="text"
                               size="small">
                        <i class="el-icon-document"></i>编辑
                    </el-button>
                    <el-button @click=" deleteInform(scope.row.xsjlh)" class="del-btn" type="text"
                               size="small"><i class="el-icon-delete"></i>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"teacher-language-list",
        props:['languageInfo'],
        methods:{
            editInform(data) {
                this.$emit('editLanguageList',data)
            },
            deleteInform(data) {
                this.$emit('deleteLanguageList',data)
            }
        }
    }
</script>

<style scoped>

</style>
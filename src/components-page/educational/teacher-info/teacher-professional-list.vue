<template>
    <!--专业技术信息-->
    <div class="yd-common-table">
        <el-table :data="professionalInfo" border style="width: 100%">
            <el-table-column
                    prop="rzzgmc"
                    label="任职资格名称"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="qdzgtj"
                    label="获取资格途径"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="psdw"
                    label="评审单位"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="pdrq"
                    label="评定日期"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="przwm"
                    label="聘任职务码"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="prdw"
                    label="聘任单位"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="prqkm"
                    label="聘任情况码"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="jprq"
                    label="解聘日期"
                    align="center"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="jpyy"
                    label="解聘原因"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" placement="left-end" popper-class="kuangzi">
                        <div slot="content">{{scope.row.jpyy}}</div>
                        <p class="text-blue" effect="light">详情</p>
                    </el-tooltip>
                </template>
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
        name:"teacher-professional-list",
        props:['professionalInfo'],
        data() {
            return {}
        },
        methods:{
            editInform(data) {
                this.$emit('editProfessionalList',data)
            },
            deleteInform(data) {
                this.$emit('deleteProfessionalList',data)
            }
        }
    }
</script>

<style scoped>

</style>
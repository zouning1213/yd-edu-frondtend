<template>
    <!--教材分发历史-->
    <div class="table-item">
        <el-table border ref="multipleTable" :data="tableListHistory" tooltip-effect="dark">
            <el-table-column prop="" label="教材名称" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.jcmc||'-'}}</p>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="分发年级" align="center">
                <template slot-scope="scope">
                    <p v-if="scope.row.nj == 1">一年级</p>
                    <p v-if="scope.row.nj == 2">二年级</p>
                    <p v-if="scope.row.nj == 3">三年级</p>
                </template>
            </el-table-column> -->
            <el-table-column label="分发专业" align="center">
                <template slot-scope="scope">
                    {{scope.row.zymc||'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="" label="分发班级" align="center">
                <template slot-scope="scope">
                    <p>{{scope.row.bjmc||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column label="班级人数" align="center" width="100">
                <template slot-scope="scope">
                    <p>{{scope.row.rs||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="" label="分发数量" align="center" width="100">
                <template slot-scope="scope">
                    <p>{{scope.row.ffsl||'-'}}</p>
                </template>
            </el-table-column>

        </el-table>
        <yd-page url="/textbookInfo/distrbuteList" @changePage="changePage"></yd-page>
    </div>
</template>

<script>
    export default {
        name:'teaching-sendFile-history',
        data() {
            return {
                tableListHistory:[]
            }
        },
        methods:{
            changePage(res) {
                this.tableListHistory = res
            },
        }
    }
</script>

<style>
</style>
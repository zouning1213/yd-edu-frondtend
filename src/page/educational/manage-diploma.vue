<template>
    <!--毕业证管理-->
    <div class="yd-manage-diploma">
        <!--筛选条件-->
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-to-examine"></i></div>
                <h3>毕业管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <!-- <el-input placeholder="请输入学生姓名"
                          @keyup.enter.native="searchForm" v-model="params.condition" class="input-with-select">
                    <el-button slot="append" @click="searchForm">搜索</el-button>
                </el-input> -->
                <!-- <el-button @click="" type="success">导出</el-button>  -->
            </el-col>
        </el-row>
        <template>
            <!--table数据结构-->
            <div class="yd-common-table common-pd yd-bg"
                 :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
                <el-checkbox-group v-model="checkedList" ref="print">
                    <el-table
                            border
                            ref="multipleTable"
                            :data="tableList"
                            tooltip-effect="dark">
                        <el-table-column label="级数" align="center">
                            <template slot-scope="scope">
                                <p v-if="scope.row.xj == 0">-</p>
                                <p v-else>{{scope.row.xj}}级</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop label="班级个数" align="center">
                            <template slot-scope="scope">
                                {{scope.row.classCount=='0'?0:scope.row.classCount?scope.row.classCount:'-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop label="在校人数" align="center">
                            <template slot-scope="scope">
                                {{scope.row.zxrs=='0'?0:scope.row.zxrs?scope.row.zxrs:'-'}}
                                <el-button class="ml-10  fr" type="primary" round size="mini"
                                           @click="editCheckDiploma(scope.row.xj)">点击毕业
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="毕业人数" align="center">
                            <template slot-scope="scope">
                                {{scope.row.byrs=='0'?0:scope.row.byrs?scope.row.byrs:'-'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="其他人数" align="center">
                            <template slot-scope="scope">
                                <el-button type="text"
                                           class="text-red"
                                           @click="shouOthers(scope.row)">{{scope.row.qtrs}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="按级数导出" align="center">
                            <template slot-scope="scope">
                                <a :href="remoteHost +'/graduationInfo/exportStudent?xj='+scope.row.xj">
                                    <el-button size="mini" type="success">导出</el-button>
                                </a>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-checkbox-group>
            </div>
        </template>

        <!--所有学籍状态-->
        <el-dialog
                v-if="dialogAddStudent"
                :close-on-click-modal='false'
                title="其他人数"
                center
                :visible.sync="dialogAddStudent"
                width="860px">
            <div class="yd-manage-diploma-dialogWrap">
                <!-- <el-table
                        border
                        ref="multipleTable"
                        :data="tableBody"
                        tooltip-effect="dark">
                    <el-table-column v-for="(item,index) in tableHeader"
                                     :key="index" :prop="item.id"
                                     :label="item.name"
                                     align="center"
                                     :width="index == tableHeader.length-1 ? '140' : ''">
                    </el-table-column>
                </el-table> -->
                <ul class="clearfix">
                    <li v-for="(item,index) in tableHeader" :key="index">{{item.name}} ：{{tableBody[0][item.id]}}</li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/manage-diploma.less'

    export default {
        name:"manage-diploma",
        data() {
            return {
                dialogAddStudent:false,
                tableList:[],
                params:{
                    // bdcs:'6',
                    limit:10,
                    xjztm:'',
                    condition:'',
                    zyid:''
                },
                checkedList:[],
                checkedType:'4', //修改选中的状态
                remoteHost:setting.remoteHost,
                tableHeader:[],
                tableBody:[],
            }
        },
        created() {
            this.getTableData()
        },
        methods:{
            getTableData() {
                this.$GET('/graduationInfo/list').then((res) => {
                    this.tableList = res.data
                })
            },

            searchForm() {
            },
            //打印
            printData() {
                this.$print(this.$refs.print); // 使用
            },
            //编辑单个
            editCheckDiploma(xj) {
                this.$POST("/graduationInfo/graduation",{xj:xj}).then(res => {
                    this.$confirm('当前操作将在校学生的状态设置为毕业, 是否继续?','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'warning'
                    }).then(() => {
                        if (res.code == 200) {
                            this.$message({
                                type:"success",
                                message:"毕业成功!"
                            });
                            this.getTableData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                });
            },
            //点击其他弹出所有学籍状态
            shouOthers(row) {
                this.tableBody = []
                this.tableHeader = []
                this.tableHeader = row.ztbt.slice(2)
                this.tableBody[0] = row.ztrs
                this.dialogAddStudent = true
            }
        }
    }
</script>

<style scoped lang='less'>
    .ml-10 {
        margin-left: 10px;
    }

    .yd-manage-diploma-dialogWrap {
        overflow: hidden;
        ul {
            border: 1px solid #F3F5F7;
            width: 100%;
            text-align: center;
            transform: translate(1px, 1px);
            -ms-transform: translate(1px, 1px);
            -moz-transform: translate(1px, 1px);
            -webkit-transform: translate(1px, 1px);
            -o-transform: translate(1px, 1px);
            li {
                width: 25%;
                float: left;
                height: 50px;
                line-height: 50px;
                border-right: 1px solid #F3F5F7;
                border-bottom: 1px solid #F3F5F7;
            }
        }
    }
</style>
<template>
    <!--评教记录-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
                <h3>评教记录</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-select v-model="params.rwid" placeholder="请选择评教任务"
                           class="input-with-select"
                           @change="searchTable">
                    <el-option label="所有评教任务" value=""></el-option>
                    <el-option v-for="(item,index) in rwOptions" :key="index"
                               :label="item.rwmc" :value="item.rwid"></el-option>
                </el-select>
                <el-input placeholder="输入学生或教师姓名" v-model="params.condition"
                          @keyup.enter.native="searchTable"
                          style="width: 320px">
                    <el-button @click="searchTable" slot="append">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd yd-common-flex">
            <div class="common-left-tree">
                <yd-select-bjid ref="selectTree" v-on:checkedBjId="checkedBjId"></yd-select-bjid>
            </div>
            <div class="common-right-table yd-common-table">
                <div class="tip">
                    <span class="text-red">*</span>(平均成绩大于平均分为
                    <span class="text-green">绿色</span>, 小于平均分为
                    <span class="text-red">红色</span>，等于平均分或者暂无平均分为
                    <span>黑色</span>)
                </div>
                <el-table
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        :max-height="this.$store.state.minClientHeight-317">
                    <el-table-column prop="rwmc" label="评教任务" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.rwmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xm" label="教师" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xm||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xsxm" label="学生" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xsxm||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jszf" label="总分" align="center"
                                     sortable
                                     :sort-method="changeSort">
                        <template slot-scope="scope">
                            <p v-if="scope.row.jszf > scope.row.pjf" class="text-green"> {{scope.row.jszf||'-'}}</p>
                            <p v-else-if="scope.row.jszf < scope.row.pjf" class="text-red">{{scope.row.jszf||'-'}}</p>
                            <p v-else>{{scope.row.jszf||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" class-name="no-print">
                        <template slot-scope="scope">
                            <el-button class="edit-btn" @click="lookScore(scope.row)" type="text">
                                <i class="el-icon-document"></i>查看明细
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <yd-page ref="ydPage" url="/teacherscoreInfo/list" :params="params" @changePage="changePage"></yd-page>
            </div>
        </div>
        <!--详情弹窗-->
        <el-dialog :visible.sync="dialogVisible" width="680px"
                   :close-on-click-modal='false'>
            <el-table
                    border
                    :data="scoreTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :max-height="(this.$store.state.minClientHeight*0.5) + 'px'">
                <el-table-column prop="XMMC" label="项目名称" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.XMMC||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="XMFZ" label="参考分" align="center" width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.XMFZ||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="FS" label="得分" align="center" width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.FS||'-'}}</p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-20" style="padding: 0 6px">
                <p>意见: {{scoreJybz || '无'}}</p>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ydSelectBjid from '../../components-page/select/yd-tree-bjid'

    export default {
        name:"manage-achievements",
        components:{
            ydSelectBjid
        },
        data() {
            return {
                params:{
                    rwid:'',
                    limit:20,
                    condition:'',
                    bjid:''
                },
                rwOptions:[],
                dialogVisible:false,
                tableData:[],
                scoreTable:[],
                scoreJybz:''
            }
        },
        created() {
            this.$GET('/evaluationTask/list',{page:1,limit:99999}).then((res) => {
                this.rwOptions = res.data
            })
        },
        methods:{
            changeSort(a,b) {
                if (a.jszf < b.jszf) return -1
                else if (a.jszf > b.jszf) return 1
                else return 0
            },
            checkedBjId(bjid) {
                this.params.bjid = bjid
                this.$refs.ydPage.getData()
            },
            searchTable() {
                this.params.bjid = ''
                this.$refs.selectTree.removeNode()
                this.$refs.ydPage.getData('search')
            },
            changePage(data) {
                this.tableData = data
            },
            lookScore(row) {
                this.scoreTable = []
                this.scoreJybz = ''
                this.$GET('/teacherscoreInfo/detail',{pfid:row.pfid}).then((res) => {
                    if (res.code == 200) {
                        this.dialogVisible = true
                        this.scoreTable = res.data.teacherscoreDetailsList
                        this.scoreJybz = res.data.jybz
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>

<style lang='less' scoped>
    .tip {
        font-size: 13px;
        margin-bottom: 20px;
        span {
            margin: 0 2px;
        }
    }
</style>
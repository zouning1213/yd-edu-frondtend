<template>
    <!--评教记录-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
                <h3>评教统计</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-select v-model="params.rwid" placeholder="请选择评教任务"
                           class="input-with-select"
                           @change="searchTable">
                    <el-option v-for="(item,index) in rwOptions" :key="index"
                               :label="item.rwmc" :value="item.rwid"></el-option>
                </el-select>
                <el-input placeholder="请输入教师姓名" v-model="params.condition"
                          @keyup.enter.native="searchTable"
                          style="width: 320px">
                    <el-button @click="searchTable" slot="append">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>

        <!-- 中间 主体  -->
        <div class="yd-bg common-pd yd-common-flex">
            <div class="common-left-tree">
                <yd-select-tree ref="selectTree" @checkedJsId="checkedJsId"></yd-select-tree>
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
                        empty-text="该教师暂无评教"
                        :max-height="this.$store.state.minClientHeight-317"
                        style="width: 100%">
                    <el-table-column prop="rwmc" label="评教任务" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.rwmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xm" label="教师姓名" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xm||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dqrs" label="评教人数" align="center">
                        <template slot-scope="scope">
                            {{scope.row.dqrs=='0'?0:scope.row.dqrs?scope.row.dqrs:'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="平均成绩" align="center"
                                     sortable
                                     :sort-method="changeSort">
                        <template slot-scope="scope">
                            <p v-if="scope.row.jszf > scope.row.pjf" class="text-green"> {{scope.row.jszf||'-'}}</p>
                            <p v-else-if="scope.row.jszf < scope.row.pjf" class="text-red">{{scope.row.jszf||'-'}}</p>
                            <p v-else>{{scope.row.jszf||'-'}}</p>
                        </template>
                    </el-table-column>
                </el-table>
                <yd-page ref="ydPage"
                         url="/teacherscoreInfo/statisticByTeacher"
                         :params="params" @changePage="changePage"></yd-page>
            </div>
        </div>

    </div>
</template>

<script>
    // import ydSelectTree from '../../components-page/select/yd-tree-jsid'
    import ydSelectTree from '../../components-page/select/yd-tree-jsid-array'

    export default {
        name:"manage-achievements",
        components:{
            ydSelectTree
        },
        data() {
            return {
                params:{
                    rwid:'',
                    limit:20,
                    condition:'',
                    jsids:''
                },
                rwOptions:[],
                dialogVisible:false,
                tableData:[],
                scoreTable:[],
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
            checkedJsId(jsid) {
                this.params.jsids = jsid
                this.$refs.ydPage.getData()
            },
            changePage(data) {
                this.tableData = data
            },
            searchTable() {
                this.params.jsids = []
                this.$refs.selectTree.removeNode()
                this.$refs.ydPage.getData('search')
            },
        },
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
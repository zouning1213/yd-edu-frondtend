<template>
    <!--毕业历史信息查看-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-to-examine"></i></div>
                <h3>历史毕业信息</h3>
            </el-col>
            <!-- <el-col :span="20" class="text-right">
                 <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                     <el-button slot="append" @click="searchBy">搜索</el-button>
                 </el-input>
             </el-col>-->
        </el-row>

        <div class="yd-margin-right clearfix yd-manage-diploma-history yd-common-table">
            <el-row :gutter="20">
                <el-col :md="12" :lg="8" :xl="6"
                        v-for="(item ,index) in historyList" :key="index">
                    <div class="yd-bg talent-list" @click="lookDiploma(item.bynf)">
                        <el-row class="talent-title ">
                            <div class="fl"><h3>{{item.bynf}}级学生毕业情况</h3></div>
                            <div class="fr"><i class="el-icon-arrow-right"></i></div>
                        </el-row>
                        <el-row class="talent-content">
                            <el-col class="progress-content" :span="10">
                                <el-progress type="circle"
                                             :width="86"
                                             :format="format"
                                             :color="customColor"
                                             :percentage="item.percentage">
                                </el-progress>
                            </el-col>
                            <el-col :span="12">
                                <p><span>总人数:</span>{{item.zrs}}</p>
                                <p><span>已毕业:</span>{{item.yby}}</p>
                                <p><span>未毕业:</span>{{item.wby}}</p>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <!--查看毕业详情弹窗-->
            <el-dialog v-if="dialogFormVisible" width="1000px"
                       :close-on-click-modal='false'
                       :visible.sync="dialogFormVisible">
                <div class="yd-common-search history-delog-wrap">
                    <el-form ref="form" :inline="true" :model="params" label-width="70px">

                        <el-form-item label="专业名称" label-width="70px">
                            <el-select v-model="motaizy" placeholder="请选择专业" @change="zyChanged">
                                <el-option v-for="(item,index) in zyOptions" :key="index"
                                           :label="item.zymc"
                                           :value="item.zyid"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级名称">
                            <el-select v-model="motaibj" placeholder="请选择班级">
                                <el-option v-for="(item,index) in bjOptions" :key="index" :label="item.bjmc" :value="item.bh"></el-option> 
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitWithBj">查询</el-button>
                        </el-form-item>

                        <el-form-item class="fr">
                            <el-button type="primary" @click="searchTable">查询</el-button>
                        </el-form-item>
                        <el-form-item class="fr">
                            <el-input placeholder="请输入学生姓名进行搜索" v-model="params.condition"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <el-table border ref="multipleTable" :data="tableList"
                          :max-height="this.$store.state.minClientHeight*0.6"
                          tooltip-effect="dark">
                    <el-table-column label="批次" align="center">
                        <template slot-scope="scope">
                            {{scope.row.bynf}}级
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="专业名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.zymc}}</p>
                        </template>
                    </el-table-column>
                    <!--  <el-table-column prop="" label="班号" align="center">
                          <template slot-scope="scope">
                              <p>{{scope.row.bj}}</p>
                          </template>
                      </el-table-column>-->
                    <el-table-column prop="" label="班级名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="姓名" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xm}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="学号" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.xh}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="毕业状态" align="center">
                        <template slot-scope="scope">
                            <p v-if="scope.row.xjztm =='1'" class="text-red">{{scope.row.xjzt}}</p>
                            <p v-if="scope.row.xjztm =='2'">{{scope.row.xjzt}}</p>
                            <p v-if="scope.row.xjztm =='3'" class="text-red">{{scope.row.xjzt}}</p>
                            <p v-if="scope.row.xjztm =='4'" class="text-blue">{{scope.row.xjzt}}</p>
                            <p v-if="scope.row.xjztm =='5'" class="text-red">{{scope.row.xjzt}}</p>
                        </template>
                    </el-table-column>
                </el-table>
                <ydPage ref="ydPage" url="/graduationInfo/list" :params="params" @changePage="changePage"></ydPage>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import '../../page/educational/css/manage-diploma-history.less'

    export default {
        name:'manage-diploma-history',
        name:"manage-diploma-history",
        data() {
            return {
                dialogFormVisible:false,
                search:'',
                historyList:[],
                tableList:[],
                params:{
                    limit:20,
                    bynf:'',
                    condition:''
                },
                motaizy:'',
                zyOptions:[],
                motaibj:'',
                bjOptions:[]
            }
        },
        created() {
            this.getDate()
            this.$GET("/majorInfo/selectList").then((res)=>{
                this.zyOptions = res.data
            })
        },
        methods:{
            getDate() {
                this.$GET('/graduationInfo/yearList').then((res) => {
                        this.historyList = res
                        this.historyList.forEach(function (data) {
                            let val = 0
                            val = Math.round(data.yby / data.zrs * 100)
                            data['percentage'] = val
                        })
                    }
                )
            },
            format(percentage) {
                return `${percentage}%` + "(毕业率)";
            },
            customColor(percentage) {
                if (percentage < 30) {
                    return '#f56c6c';
                } else if (percentage < 70) {
                    return '#e6a23c';
                } else {
                    return '#67c23a';
                }
            },
            changePage(res) {
                this.tableList = res
            },
            //查看毕业情况
            lookDiploma(bynf) {
                this.tableList = []
                this.params.bynf = bynf
                this.dialogFormVisible = true;
            },
            searchTable(){
                this.$refs.ydPage.getData('search');
            },
            //根据班级查询
            onSubmitWithBj(){

            },
            //
            zyChanged(){

            }
        }

    }
</script>

<style lang='less'>
    .history-delog-wrap{
        .el-input.el-input--medium.el-input--suffix{
            width: 150px;
        }
    }
    
</style>
<template>
    <!--学生报到-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-plan"></i></div>
                <h3>学生报到</h3>
            </el-col>
            <!-- <el-col :span="20" class="text-right">
                <el-input placeholder="请输入学生姓名" v-model="search" @keyup.enter.native="searchForm"
                          class="input-with-select">
                    <el-button slot="append" @click="searchForm">搜索</el-button>
                </el-input>
            </el-col> -->
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入学生姓名" v-model="search"
                          class="input-with-select1"
                          @keyup.enter.native="searchForm">
                    <el-select v-model="params.bjid" slot="prepend" placeholder="请选择班级" @change="searchForm">
                        <el-option
                                v-for="item in bjOptions"
                                :key="item.bjid"
                                :label="item.bjmc"
                                :value="item.bjid">
                        </el-option>
                    </el-select>
                    <el-button slot="append" @click="searchForm">查询</el-button>
                </el-input>
            </el-col>

        </el-row>
        <div class="common-pd yd-bg yd-common-table"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
                <!-- <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="班级 :" >
                        <el-select v-model="isbjid" placeholder="请选择班级" @change="bjChange">
                            <el-option
                            v-for="item in bjOptions"
                            :key="item.bjid"
                            :label="item.bjmc"
                            :value="item.bjid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form> -->
            <div class="text-right mb-20">
                <span class="fl" style="line-height:40px">当前学期 已报到：{{bdrs}} 未报到：{{wdrs}}</span>
                <el-button type="warning" @click="regCheckStudent">选中报到</el-button>
                <el-button type="success" @click="regAllStudent">全部报到</el-button>
            </div>
            <!--数据表-->
            <el-checkbox-group v-model="checkedList">
                <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark" :max-height="this.$store.state.minClientHeight-300"
                          empty-text="暂无学生需要报到">
                    <el-table-column label="姓名" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :label="scope.row">{{scope.row.xm}}</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop=""   align="center">
                         <template slot="header" slot-scope="scope">
                            <p>{{xj}}上学期 <span v-if="xj+'01'==dqxq" class="text-red">(当前)</span> </p>
                        </template>
                        <template slot-scope="scope">
                            <p :class="{'text-red':scope.row.xq1==1}">{{scope.row.xq1==1?"已报到":'未报到'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop=""   align="center">
                         <template slot="header" slot-scope="scope">
                            <p>{{xj}}下学期 <span v-if="xj+'02'==dqxq" class="text-red">(当前)</span> </p>
                        </template>
                        <template slot-scope="scope">
                            <p :class="{'text-red':scope.row.xq2==1}">{{scope.row.xq2==1?"已报到":'未报到'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" :label="xj+1+'上学期'" align="center">
                         <template slot="header" slot-scope="scope">
                            <p>{{xj+1}}上学期 <span v-if="xj+1+'01'==dqxq" class="text-red">(当前)</span> </p>
                        </template>
                        <template slot-scope="scope">
                            <p :class="{'text-red':scope.row.xq3==1}">{{scope.row.xq3==1?"已报到":'未报到'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop=""   align="center">
                         <template slot="header" slot-scope="scope">
                            <p>{{xj+1}}下学期 <span v-if="xj+1+'02'==dqxq" class="text-red">(当前)</span> </p>
                        </template>
                        <template slot-scope="scope">
                            <p :class="{'text-red':scope.row.xq4==1}">{{scope.row.xq4==1?"已报到":'未报到'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop=""   align="center">
                         <template slot="header" slot-scope="scope">
                            <p>{{xj+2}}上学期 <span v-if="xj+2+'01'==dqxq" class="text-red">(当前)</span> </p>
                        </template>
                        <template slot-scope="scope">
                            <p :class="{'text-red':scope.row.xq5==1}">{{scope.row.xq5==1?"已报到":'未报到'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop=""   align="center">
                         <template slot="header" slot-scope="scope">
                            <p>{{xj+2}}下学期 <span v-if="xj+2+'02'==dqxq" class="text-red">(当前)</span> </p>
                        </template>
                        <template slot-scope="scope">
                            <p :class="{'text-red':scope.row.xq6==1}">{{scope.row.xq6==1?"已报到":'未报到'}}</p>
                        </template>
                    </el-table-column>

                </el-table>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>

    export default {
        name:"students-report",
        data() {
            return {
                search:'',
                checkedList:[],
                tableList:[],
                params:{
                    bdzt:'0', // 0 是为报到 1 是已报到
                    condition:this.search,
                    nj:'',
                    zyh:'',
                    bjid:'',
                },
                xj:'',
                dqxq:'',
                bdrs:'',
                wdrs:"",
                bjOptions:[],
                isbjid:''
            }
        },
        created() {

            let zgh = this.$store.state.userInfo.zgh

            let jsid = this.$store.state.userInfo.jsid

            //获取班主任班级id下拉框
            this.$GET('/reportInfo/queryBjByJsid',{jsid:jsid}).then((res) => {
                console.log(res.data)
                this.bjOptions = res.data
                this.params.bjid = res.data[0].bjid
            }).then(()=>{
                this.getTableList()
            })
        },
        methods:{
            //获取报到数据
            getTableList(){
                this.$GET("/reportInfo/list",{bjid:this.params.bjid,condition:this.search}).then((res)=>{
                        this.tableList = res.data.reportInfoList
                        this.xj = res.data.xj
                        this.dqxq = res.data.dqxq
                        this.bdrs = res.data.bdrs
                        this.wdrs = res.data.wdrs
                })
            },
            //查询
            searchForm() {
                this.getTableList()

            },
            //单个报到
            regCheckStudent() {
                // console.log(this.checkedList)
                if (this.checkedList.length > 0) {
                    this.$confirm('当前选择给选中的学生报到?','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'success',
                    }).then(() => {
                        // this.checkedList.forEach(item => {
                        //     item.bdzt = 1
                        // });
                        this.$POST('/studentTemporary/report',this.checkedList,{
                            transformRequest:function (data) {
                                return JSON.stringify(data);
                            },
                            headers:{'Content-Type':'application/json'}
                        }).then((res) => {
                            if (res.code == '200') {
                                this.$message({
                                    message:'报到成功',
                                    type:'success'
                                });
                                this.getTableList()
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    })
                } else {
                    this.$message.error('暂无有选中的学生!');
                }
            },
            //全部报到
            regAllStudent() {
                if (this.tableList.length > 0) {
                    this.$confirm('当前选择给所有学生报到?','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'success',
                    }).then(() => {
                        this.$POST("/studentTemporary/allReport",{bjid:this.params.bjid}).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message:'全部报到成功',
                                    type:'success'
                                });
                                this.getTableList()
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    })
                } else {
                    this.$message.error('当前暂无需要报到的学生!');
                }
            },
            //班级下拉改变
            bjChange(){

            }
        }
    }
</script>

<style scoped>

</style>

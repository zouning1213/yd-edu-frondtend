<template>
    <!--学生报到-->
    <div class="common-pd yd-bg">
        <el-row class="yd-common-search">
            <div class="fl">
                <el-form :inline="true" v-model="params"
                         class="demo-form-inline">
                    <!-- <el-form-item label="年级:">
                        <el-select v-model="params.nj" placeholder="请选择年级">
                            <el-option label="所有年级" value=""></el-option>
                            <el-option label="一年级" value="1"></el-option>
                            <el-option label="二年级" value="2"></el-option>
                            <el-option label="三年级" value="3"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="院系:">
                        <el-select v-model="yx" placeholder="请选择院系" @change="yxSelectzy">
                            <el-option label="所有院系" value=""></el-option>
                            <el-option
                                    v-for="item in yxOptions"
                                    :key="item.yxid"
                                    :label="item.yxmc"
                                    :value="item.yxid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业:">
                        <el-select v-model="params.zyh" @change="changeZyh">
                            <el-option label="所有专业" value=""></el-option>
                            <el-option
                                    v-for="item in zyOptions"
                                    :key="item.code"
                                    :label="item.zymc"
                                    :value="item.zyh"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级:">
                        <el-select v-model="params.bjid">
                            <el-option label="所有班级" value=""></el-option>
                            <el-option
                                    v-for="item in bhOptions"
                                    :key="item.bh"
                                    :label="item.bjmc"
                                    :value="item.bh"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="item-button">
                        <el-button @click="searchForm" type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="fr" align="right">
                <el-button type="warning" @click="regCheckStudent">选中报到</el-button>
                <el-button type="success" @click="regAllStudent">全部报到</el-button>
            </div>
        </el-row>
        <!--数据表-->
        <el-checkbox-group v-model="checkedList">
            <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark"
                      empty-text="暂无学生需要报到">
                <el-table-column label="入学学年" align="center">
                    <template slot-scope="scope">
                        <el-checkbox :label="scope.row">{{scope.row.rxny.substring(0,4)}}年</el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="年级" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.nj==1?'一年级':scope.row.nj==2?'二年级':scope.row.nj==3?'三年级':''}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="专业名称" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.zymc}}</p>
                    </template>
                </el-table-column>
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
                <el-table-column prop="" label="学籍状态" align="center">
                    <template slot-scope="scope">
                        <p v-if="scope.row.xjztm =='1'" class="text-red">{{scope.row.xjzt}}</p>
                        <p v-if="scope.row.xjztm =='2'">{{scope.row.xjzt}}</p>
                        <p v-if="scope.row.xjztm =='3'" class="text-red">{{scope.row.xjzt}}</p>
                        <p v-if="scope.row.xjztm =='4'" class="text-blue">{{scope.row.xjzt}}</p>
                        <p v-if="scope.row.xjztm =='5'" class="text-red">{{scope.row.xjzt}}</p>
                    </template>
                </el-table-column>
            </el-table>
        </el-checkbox-group>
        <yd-page url="/studentInfo/list" ref="ydPage" :params="params" @changePage="changePage"></yd-page>
    </div>
</template>

<script>
    export default {
        name:'manage-school-rollbd',
        data() {
            return {
                yx:'',
                yxOptions:'',
                form:{
                    nj:'',
                    bh:'',
                    zyh:''
                },
                bhOptions:[],
                zyOptions:[],
                checkedList:[],
                tableList:[],
                params:{ //传递给分页组件需要的参数 
                    limit:10,
                    bdzt:'0', // 0 是为报到 1 是已报到
                    condition:this.search,
                    // nj:'',
                    // zyh:'',
                    bjid:''
                },
            }
        },
        created() {
            //院系数据 
            this.$GET('/collegeInfo/queryCollegInfo').then((res) => {
                this.yxOptions = res.data
            })

            // this.$GET('/majorInfo/selectList').then((res) => {
            //     this.zyOptions = res.data
            // })
        },
        methods:{
            changePage(data) {
                this.tableList = data
            },
            searchTable(search) {
                this.params.condition = search
                this.$refs.ydPage.getData('search');
                this.params.condition = ''
            },
            //查询
            searchForm() {
                // console.log(this.params)
                this.$refs.ydPage.getData();
            },
            //单个报到
            regCheckStudent() {
                if (this.checkedList.length > 0) {
                    this.$confirm('当前选择给选中的学生报到?','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'success'
                    }).then(() => {
                        this.checkedList.forEach(item => {
                            item.bdzt = 1
                        });
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
                                this.$refs.ydPage.getData();
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    })
                } else {
                    this.$message('暂无有选中的学生!');
                }
            },
            //全部报到
            regAllStudent() {
                if (this.tableList.length > 0) {
                    this.$confirm('当前选择给所有学生报到?','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:'success',
                        top:'15vh'
                    }).then(() => {
                        this.$POST("/studentTemporary/allReport",this.params).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message:'全部报到成功',
                                    type:'success'
                                });
                                this.$refs.ydPage.getData();
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    })
                } else {
                    this.$message('当前暂无需要报到的学生!');
                }
            },
            //专业查班级
            changeZyh() {
                this.params.bjid = ''
                this.$GET('/collegeInfo/queryClassInfoByZyh',{zyid:this.params.zyh}).then((res) => {
                        // console.log(res.data)
                        this.bhOptions = res.data
                    }
                )
            },
            // 院系查专业
            yxSelectzy() {
                this.$GET('/collegeInfo/queryMajorByYXBM',{yxid:this.yx}).then((res) => {
                    // console.log(res.data)
                    this.zyOptions = res.data
                })
            }
        }
    }
</script>

<style>
</style>
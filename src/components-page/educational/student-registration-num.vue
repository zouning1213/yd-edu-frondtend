<template>
    <!--学生报到统计-->
    <div>
        <div class="common-pd yd-bg">
            <el-row class="yd-common-search">
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
                        <el-select v-model="params.bh">
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
            </el-row>
            <!--数据表-->
            <el-table border ref="multipleTable" :data="dutyList" tooltip-effect="dark"
                      empty-text="暂无报到数据统计">
                <!-- <el-table-column label="入学学年" align="center">
                     <template slot-scope="scope">
                         <el-checkbox :label="scope.row">{{scope.row.rxny}}年</el-checkbox>
                     </template>
                 </el-table-column>-->
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
                <el-table-column label="总人数" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.zrs}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="已报到人数" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.bdrs}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="未报到人数" align="center">
                    <template slot-scope="scope">
                        <p :class="{'text-red':scope.row.wdrs != 0}">{{scope.row.wdrs}}</p>
                    </template>
                </el-table-column>
            </el-table>
            <yd-page url="/studentTemporary/reportList" ref="ydPage" :params="params"
                     @changePage="changePage"></yd-page>
        </div>
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
                dutyList:[],
                params:{ //传递给分页组件需要的参数 
                    limit:10,
                    bdzt:'0', // 0 是为报到 1 是已报到
                    bjmc:this.search,
                    bh:''
                },
            }
        },
        created() {
            //院系数据 
            this.$GET('/collegeInfo/queryCollegInfo').then((res) => {
                this.yxOptions = res.data
            })
            // this.$GET('/majorInfo/selectList').then(
            //     (res) => {
            //         this.zyOptions = res.data
            //     }
            // )
        },
        methods:{
            changePage(data) {
                // console.log(data)
                this.dutyList = data
            },
            searchTable(search) {
                this.params.bjmc = search
                this.$refs.ydPage.getData('search');
                this.params.bjmc = ''
            },
            //查询
            searchForm() {
                // console.log(this.params)
                this.$refs.ydPage.getData();
            },
            //专业查班级
            changeZyh() {
                this.params.bh = ''
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
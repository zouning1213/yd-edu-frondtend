<template>
    <!-- 手机成绩查询  -->
    <div class="mobile-common-warp bg-F3F5F7">
        <!-- 头部搜索框 -->
        <div class="mobile-common-header">
            <van-nav-bar title="成绩查询" @click-left="$router.go(-1)" left-arrow></van-nav-bar>
        </div>
        <div class="mobile-common-main mobile-grade-main">
            <!--选择学期-->
            <van-dropdown-menu>
                <van-dropdown-item v-model="xq" title="选择学期" :options="examOption" @change="searchGrade"/>
            </van-dropdown-menu>
            <!--成绩列表-->
            <div class="mobile-common-List clearfix" v-for="(item,index) in tableData" :key="index">
                <div class="common-list">
                    <div class="list-content">
                        <h2>{{item.kcmc}} </h2>
                        <h4><span>学年学期:</span> {{item.xqmc}}</h4>
                        <h4><span>考试名称:</span> {{item.ksapmc}}</h4>
                        <h4><span>课程成绩:</span> {{item.zhcj}}</h4>
                        <h4><span>课程教师:</span> {{item.skls}}</h4>
                        <h4><span>课程类别:</span> {{item.kclb}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"grade",
        data() {
            return {
                xq:null,
                examOption:[],
                tableData:[],
                title:'选择学期',
            }
        },
        created() {
            //获取当前考期
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                if (res.code == 200) {
                    res.data.forEach(item => {
                        this.examOption.push({
                            text:item.xlxq,
                            value:item.xlid
                        })
                    })
                    this.xq = this.$store.state.userInfo.xlid
                }
            })
            this.$POST("/studentExamScore/scoreInfo",{xsid:this.$store.state.userInfo.xsid}).then((res) => {
                if (res.code == 200) {
                    this.tableData = res.data || []
                }
            })
        },
        methods:{
            searchGrade() {
                const params = {xq:this.xq,xsid:this.$store.state.userInfo.xsid}
                this.$POST("/studentExamScore/scoreInfo",params).then((res) => {
                    this.tableData = res.data || []
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .mobile-grade-main {
        h2 {
            font-weight: 550;
        }
        h4 {
            span {
                width: 68px;
                display: inline-block;
                text-align: right;
                margin-right: 10px;
            }
        }
    }
</style>
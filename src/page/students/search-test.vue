<template>
    <div>
        <div class="yd-search-head yd-bg clearfix">
            <div class="user-img">
                <router-link :to="{name:''}">
                    <img :src="this.$store.state.userInfo.zp ||require('@/assets/no-tip-img/no-avatar.png')">
                </router-link>
            </div>
            <ul class="head-info">
                <li>
                    <p><span>姓名:</span>{{this.$store.state.userInfo.name}}</p>
                    <p><span>专业:</span>{{this.$store.state.userInfo.zymc}}</p>
                </li>
                <li>
                    <p><span>学号:</span>{{this.$store.state.userInfo.xh}}</p>
                    <p><span>班级:</span>{{this.$store.state.userInfo.bjmc}}</p>
                </li>
            </ul>
        </div>
        <el-row class="yd-router-title yd-bg">
            <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
            <h3>考试查询</h3>
        </el-row>
        <div class="common-pd yd-bg yd-common-table"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                        prop="kcmc"
                        align="center"
                        label="课程名称">
                </el-table-column>
                <el-table-column
                        prop="kskssj"
                        align="center"
                        label="考试时间">
                </el-table-column>
                <el-table-column
                        prop="ksdd"
                        align="center"
                        label="考试地点">
                </el-table-column>
                <el-table-column
                        prop="xqmc"
                        align="center"
                        label="学期名称">
                </el-table-column>
                <el-table-column
                        prop="kclb"
                        align="center"
                        label="考试类别">
                    <template slot-scope="scope">
                        <p>{{scope.row.kslbm==0?"实考":scope.row.kslbm==1?"网考":scope.row.kslbm}}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="bz"
                        align="center"
                        label="备注">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name:"test",
        data() {
            return {
                xsid:this.$store.state.userInfo.xsid,
                tableData:[],
            }
        },
        created() {
            this.$GET("/examArrange/examInfoStu",{xsid:this.xsid}).then((res) => {
                this.tableData = res.data
            })
        }
    }
</script>

<style scoped lang="less">
    //考试查询
    .yd-search-head {
        padding: 14px 26px;
        margin-top: 20px;
        position: relative;
        .user-img {
            width: 80px;
            height: 112px;
            float: left;
            img {
                width: 100%;
            }
        }
        .head-info {
            width: calc(100% - 120px);
            float: right;
            li {
                display: inline-block;
                padding: 20px 0;
                margin-right: 117px;
                p {
                    font-size: 14px;
                    color: #333;
                    &:first-child {
                        margin-bottom: 16px;
                    }
                    span {
                        margin-right: 6px;
                    }
                }
            }
        }
    }
</style>
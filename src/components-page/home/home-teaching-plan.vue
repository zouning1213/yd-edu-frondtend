<template>
    <!-- 教学计划管理 -->
    <div class="home-teaching-plan">
        <div class="home-header clearfix">
            <div class="title-icon">
                <i class="yd icon-teaching-plan fl icon-skin"></i>
                <h3 class="fl">教学计划管理</h3>
                <router-link :to="{path:'/educational/manage/teaching-plan'}">
                    <i class="el-icon-more fr"></i>
                </router-link>
            </div>
        </div>
        <div class="home-content">
            <el-row class=" teaching-plan-row" v-for="(item,index) in tableData" :key="index">
                <el-col :span="8">
                    <h4>教师: {{item.xm}}</h4>
                    <h4>学期: {{item.xq}}</h4>
                </el-col>
                <el-col :span="8">
                    <h4>专业: {{item.zymc}}</h4>
                    <h4>年级: {{item.nj}}</h4>
                </el-col>
                <el-col :span="8" v-show="item.xxjh">
                    <i class="yd icon-word fl"></i>
                    <h4>课程计划详情（1.69M）</h4>
                    <h4>
                        <!-- <span class="mr-20">下载</span>
                        <span>查看</span> -->
                        <el-button type="text" size="small">
                            <a class="text-green" :href="dizi+item.xxjh">下载</a>
                        </el-button>
                        <el-button type="text" size="small">
                            <a class="text-green"
                               :href="`/static/pdfjs/web/viewer.html?file=`+`${encodeURIComponent(dizi+item.xxjhpdf)}`">查看</a>
                        </el-button>
                    </h4>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name:'home-Teachingplan',
        props:["who"],
        data() {
            return {
                wordDz:'',
                pdfDz:"",
                dizi:setting.remoteHost + '/storage/fetch/',
                tableData:[]
            }
        },
        created() {
            this.$GET('/teachingPlan/list',{limit:2,page:1}).then((res) => {
                // console.log("教学计划管理")
                // console.log(res)
                this.tableData = res.data

            })
        }
    }
</script>

<style lang="less">
    .home-teaching-plan {
        .home-content {
            .teaching-plan-row.el-row {
                border-bottom: 1px solid rgba(233, 237, 247, 1);
                padding: 20px 0;
                h4 {
                    line-height: 30px;
                }
                i {
                    color: rgb(93, 172, 255);
                    font-size: 42px;
                    margin-right: 10px;
                }
                span {
                    color: rgba(62, 120, 87, 1);
                }
                .text-green {
                    color: rgba(62, 120, 87, 1);
                }
                .mr-20 {
                    margin-right: 20px;
                }
            }
        }
    }
</style>
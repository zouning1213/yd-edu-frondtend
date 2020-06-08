<template>
    <!--成绩录入班级-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-entry"></i></div>
                <h3>开始录入</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- <no-content-tip v-if="tableList == ''"
                        :title="noticeTiele"
                        :src="noContentSrc"
                        toName="teacher_grade_history"
                        button="查看历史成绩">
        </no-content-tip> -->
        <!-- <div v-else class="common-pd yd-bg yd-common-table"> -->
        <div class="common-pd yd-bg yd-common-table">
            <div class="grade-entry-title mb-30">
                <h3>成绩录入时间为 {{startTime}} 至 {{overTime}} 截止
                    <router-link :to="{name:'teacher_grade_history'}">历史成绩查询</router-link>
                </h3>
            </div>
            <el-table :data="tableList" border style="width: 100%">
                <el-table-column
                        prop="nj"
                        align="center"
                        label="年级">
                </el-table-column>
                <el-table-column
                        prop="kcmc"
                        align="center"
                        label="课程名称">
                </el-table-column>
                <el-table-column
                        prop="kclb"
                        align="center"
                        label="考试类别">
                </el-table-column>
                <el-table-column
                        prop="bjmc"
                        align="center"
                        label="班级">
                </el-table-column>
                <el-table-column
                        prop="xsrs"
                        align="center"
                        label="人数">
                </el-table-column>
                <el-table-column
                        prop="address"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name:'teacher_grade_entry_open',params:{id:scope.row.cjlrh}}">
                            <el-button type="text">成绩录入</el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import noContentTip from '../../components-page/common/no-content-tip'

    export default {
        name:"grade-entry",
        components:{
            noContentTip,
        },
        data() {
            return {
                loading:true,
                search:'',
                noContentSrc:require('@/assets/no-tip-img/no-grade.png'),
                tableList:[],
                startTime:null,
                overTime:null,
                noticeTiele:''
            }
        },
        methods:{},
        created() {
            let jsid = JSON.parse(localStorage.getItem("user")).jsid
            // console.log(jsid)
            this.$POST('/scoreInputInfo/currentScoreInput',{jsid:jsid}).then((res) => {
                // this.startTime = res.data.kqInfo.lrkssj.substring(0,11)
                // this.overTime = res.data.kqInfo.lrzjsh.substring(0,11)
                if(res.code==200){
                    this.tableList = res.data||[] 
                }else{
                    this.noticeTiele = res.message
                }
                
            })
        }
    }
</script>

<style scoped lang="less">
    .grade-entry-title {
        text-align: center;
        h3 {
            font-size: 20px;
            color: #333;
            a {
                margin-left: 40px;
                font-size: 16px;
                color: #3262EC;
                text-decoration: underline;
            }
        }
    }
</style>

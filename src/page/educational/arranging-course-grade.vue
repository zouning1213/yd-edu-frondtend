<template>
    <el-row class="yd-bg mt-20 common-pd" :style="{'minHeight':this.$store.state.minClientHeight - 100+'px'}">
        <el-row class="yd-router-title1">
            <div class="title-icon icon-skin"><i class="yd icon-schedule"></i></div>
            <h3>辅助排课</h3>
        </el-row>
        <div class="yd-common-table mt-20">
            <el-col :offset="4" :span="20" justify="center">
                <el-row class="arranging-course-nj" :gutter="60">
                    <el-col :lg="6" :md="6" class="arranging-b" v-for="(item,index) in list" :key="index">
                        <div class="arranging-list">
                            <h4>{{item.year}}级辅助排课</h4>
                            <h1>第{{item.term}}学期</h1>
                            <router-link :to="{name:'educational_arranging',
                        params:{year:item.year,xq:item.term,xlid:item.xlid,isNoWeek:item.isNoWeek}}">开始排课
                            </router-link>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </div>
    </el-row>
</template>

<script>
    export default {
        name:"arranging-course-steps",
        data() {
            return {
                search:'',
                list:[],
            }
        },
        created() {
            this.$GET('/timesheetTask/yearsTerm').then((res) => {
                // console.log(res)
                if (res.code == 200) {
                    this.list = res.data
                    console.log(res.data)
                    this.list.forEach(item => {
                        item['weekHours'] = 30
                    })
                }
            })
        },
        methods:{
        }
    }
</script>

<style lang="less">
    .arranging-course-nj {
        text-align: center;
        .arranging-list {
            min-width: 280px;
            max-width: 320px;
            /*height: 420px;*/
            background-repeat: no-repeat;
            background-size: 100%;
            text-align: center;
            background-image: url('../../page/educational/img/grade-2.png');
            display: inline-block;
            /*padding-top: 112px;*/
            padding: 112px 0;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            border-radius: 8px;
            overflow: hidden;
            h4 {
                font-size: 28px;
                color: #333;
                margin-bottom: 4px;
            }
            h1 {
                font-size: 45px;
                color: #333;
                margin-bottom: 20px;
            }
            a {
                display: inline-block;
                width: 174px;
                height: 40px;
                line-height: 40px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                border-radius: 8px;
                background-color: #4FBBEA;
                color: #fff;
                font-size: 18px;
            }
        }
        .arranging-b {
            &:first-child {
                .arranging-list {
                    background-image: url('../../page/educational/img/grade-1.png');
                    a {
                        background-color: #ea4e4f;
                    }
                }
            }
            &:last-child {
                .arranging-list {
                    background-image: url('../../page/educational/img/grade-3.png');
                    a {
                        background-color: #ff9916;
                    }
                }
            }
        }
    }
</style>
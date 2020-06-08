<template>
    <!--监考查询-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-article"></i></div>
                <h3>监考查询</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <!-- <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input> -->
            </el-col>
        </el-row>

        <div class="yd-margin-right yd-teacher-invigilate clearfix">
            <div class="invigilate-list" v-for="(item,i) in tableData" :key="i">
                <router-link :to="{name:''}" class="yd-bg">
                    <div class="invigilate-status status-skin">我参与</div>
                    <div class="invigilate-title"><h3>{{item.kcmc}}</h3></div>
                    <div class="invigilate-content">
                        <p><span><i class="yd icon-address"></i>监考时间:</span>{{item.kskssj}}~{{item.ksjssj.slice(-5)}}</p>
                        <p><span><i class="yd icon-time"></i>监考地点:</span>{{item.jkdd}}</p>
                    </div>
                    <div class="invigilate-time">
                        <!-- <img src="../common/img/user.png"/> -->
                        <img :src="userimages"/>
                        <span>{{item.jklsxm}}</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"grade",
        data() {
            return {
                search:'',
                tableData:[],
                userimages:''
            }
        },
        methods:{
            onSubmit() {

            }
        },
        created(){  
            this.userimages = JSON.parse(localStorage.getItem("user")).zp
            this.$GET('/examArrange/teacherExamSearch',{jsid:this.$store.state.userInfo.jsid}).then((res) => {
                // console.log("监考查询的数据")
                // console.log(res.data)
                this.tableData = res.data
            })
        }
    }
</script>

<style scoped lang="less">
    .yd-teacher-invigilate {
        .invigilate-list {
            width: 25%;
            padding-right: 20px;
            margin-bottom: 20px;
            float: left;
            a {
                display: block;
                height: 100%;
                border: 1px solid #fff;
                -webkit-transition: all 0.4s;
                -moz-transition: all 0.4s;
                -ms-transition: all 0.4s;
                -o-transition: all 0.4s;
                transition: all 0.4s;
                position: relative;
                &:hover {
                    border: 1px solid rgba(255, 255, 255, 1);
                    -webkit-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                    -moz-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                    box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                    -webkit-transform: translateY(-5px) scale(1.1);
                    -moz-transform: translateY(-5px) scale(1.1);
                    -ms-transform: translateY(-5px) scale(1.1);
                    -o-transform: translateY(-5px) scale(1.1);
                    transform: translateY(-5px) scale(1.1);
                }
            }
            .invigilate-status {
                height: 22px;
                line-height: 22px;
                font-size: 12px;
                color: #fff;
                padding: 0 6px;
                position: absolute;
                right: 0;
                top: -11px;
                z-index: 9;
                -webkit-border-radius: 11px;
                -moz-border-radius: 11px;
                border-radius: 11px;
            }
            .invigilate-title, .invigilate-time {
                padding: 20px 24px;
            }
            .invigilate-title {
                border-bottom: 1px solid #EDF0F6;
                h3 {
                    font-size: 16px;
                    color: #333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    i {
                        font-size: 18px;
                    }
                }
            }
            .invigilate-content, .invigilate-time {
                p {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    span {
                        margin-right: 10px;
                        i {
                            margin-right: 8px;
                            vertical-align: bottom;
                        }
                    }
                }
            }
            .invigilate-content {
                padding: 14px 24px 2px;
                p {
                    font-size: 14px;
                    color: #999;
                    line-height: 24px;
                }
            }
            .invigilate-time {
                img {
                    width: 18px;
                    height: 18px;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                span {
                    font-size: 14px;
                    color: #333;
                }
            }
        }
    }
</style>
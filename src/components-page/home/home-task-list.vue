<template>
    <div>
        <div class="home-header clearfix ">
            <div class="title-icon">
                <!-- <i class="yd icon-sign fl icon-skin"></i>  -->
                <h3 class="fl">{{who=='jw'?'快捷入口':'我的待办'}}</h3>
                <!-- <router-link :to="{path:'/teacher/search/article'}"> -->
                <!-- <router-link :to="{path:$props.who=='ls'?'/teacher/search/article':'/students/search/article'}"> -->
                <!-- <i class="yd icon-19 fr"></i> -->
                <!-- </router-link> -->
            </div>
        </div>
        <div class="home-content task-list-content">
<!--            :gutter="76"-->
            <el-row >
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='xs'">
                    <router-link :to="{name:'student_design_open'}">
                        <div class="task-icon">
                            <!-- <i class="yd icon-bianji"></i> -->
                            <img src="./img/home-cjlr@2x.png" alt="">
                        </div>
                        <p>评教任务</p>
                    </router-link>
                </el-col>
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='js'">
                    <router-link :to="{name:'teacher_grade_entry'}" >
                        <div class="task-icon">
                            <!-- <i class="yd icon-self-fill"></i> -->
                            <img src="./img/home-cjlr@2x.png" alt="">
                        </div>
                        <p>成绩录入</p>
                    </router-link>
                </el-col>
                <!-- 教务 -->
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='jw'">
                    <router-link :to="{name:'educational_student_info'}" >
                        <div class="task-icon">
                            <!-- <i class="yd icon-test-search"></i> -->
                            <img src="./img/home-xuesheng@2x.png" alt="">
                        </div>
                        <p>学生管理</p>
                    </router-link>
                </el-col>
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='jw'">
                    <router-link :to="{name:'educational_teacher_info'}" >
                        <div class="task-icon">
                            <!-- <i class="yd icon-teacher"></i> -->
                            <img src="./img/home-stu@2x.png" alt="">
                        </div>
                        <p>教师管理</p>
                    </router-link>
                </el-col>
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='jw'">
                    <router-link :to="{name:'educational_seniority'}">
                        <div class="task-icon">
                            <!-- <i class="yd icon-calendar"></i> -->
                            <img src="./img/home-rili@2x.png" alt="">
                        </div>
                        <p>校历管理</p>
                    </router-link>
                </el-col>
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='jw'">
                    <router-link :to="{name:'educational_article'}">
                        <div class="task-icon">
                            <!-- <i class="yd icon-wenzhang-copy"></i> -->
                            <img src="./img/home-wenzhang@2x.png" alt="">
                        </div>
                        <p>通知公告</p>
                    </router-link>
                </el-col>
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='jw'">
                    <router-link :to="{name:'educational_message'}">
                        <div class="task-icon">
                            <!-- <i class="yd icon-liuyan"></i> -->
                            <img src="./img/home-liuyan@2x.png" alt="">
                        </div>
                        <p>留言管理</p>
                    </router-link>
                </el-col>
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='jw'">
                    <router-link :to="{name:'educational_schedule'}">
                        <div class="task-icon">
                            <!-- <i class="yd icon-schedule"></i> -->
                            <img src="./img/home-kebiao@2x.png" alt="">
                        </div>
                        <p>当周课表</p>
                    </router-link>
                </el-col>
                <el-col  :md="4" :lg="3" :xl="2"  v-if="who=='jw'">
                    <router-link :to="{name:'educational_schedule_total'}">
                        <div class="task-icon">
                            <!-- <i class="yd icon-kebiaoxinxi"></i> -->
                            <img src="./img/home-kbxx@2x.png" alt="">
                        </div>
                        <p>总课表</p>
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home-Notice',
        props: ['who'],
        data () {
            return {
                tableData: []
            }
        },
        created () {
            // this.$GET('/notice/list',{limit:5,page:1,px:'desc',isOpen:"N"}).then((res) => {
            //     this.tableData = res.data
            // })
        },
        filters: {
            cutDate (time) {
                function fill (num) {
                    if (num < 10) {
                        return '0' + num
                    } else {
                        return num
                    }
                }

                let date = new Date(time)
                return date.getFullYear() + '/' + fill((date.getMonth() + 1)) + '/' + fill(date.getDate()) + ' ' + fill(date.getHours()) + ':' + fill(date.getSeconds())
            }
        }
    }
</script>

<style lang="less" scope>
    .task-list-content {
        .el-row{
            padding-top: 30px;
            padding-bottom: 10px;
            margin-left: -24px;
            .el-col{
                text-align: center;
                margin-bottom: 20px;
                .task-icon {
                    margin-bottom: 12px;
                    padding:0 24px;
                    img {
                        width: 100%;
                        border-radius: 16px;
                    }
                }
                p {
                    font-size: 16px;
                    font-weight: 550;
                    color: #000;
                }
            }
        }
    }
</style>
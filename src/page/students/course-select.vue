<template>
    <!-- 学生已选课 -->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-fill"></i></div>
                <h3>已选课程</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请按课程或课程内容关键字搜索" v-model="search1"
                          class="input-with-select" @keyup.enter.native="titleSearch">
                    <el-button slot="append" @click="titleSearch">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="yd-margin-right yd-students-course"
                :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-col :xs="10" :sm="10" :md="8" :lg="6" class="course-list" v-for="(item,i) in courseList" :key="i">
                <div class="course-list-item yd-bg">
                    <!-- <div :class="['status',item.isFlag ? 'text-gray' :'text-blue']">{{item.isFlag?'已取消':"已选"}}</div> -->
                    <div class="title">
                        <h2>{{item.kc}}</h2>
                        <h4 class="bz">
                            <span class="color-999">由 </span> {{item.sklsmc}}<span class="color-999"> 教师教学</span>
                            <span class="fr color-999"> <i class="el-icon-success color-blue"></i> 已选课程</span>
                        </h4>
                    </div>
                </div>
            </el-col>
        </el-row>

        <yd-page ref="ydPage" :url="`/studentLessonSelect/selectedLesson`"
                       :params="{xsid:xsid,condition:searchJS}" @changePage="changePage"></yd-page>
    </div>
</template>

<script>
    export default {
        name:"CourseSelection",
        data() {
            return {  
                xsid:this.$store.state.userInfo.xsid,
                search:"",
                search1:"",
                cki:{i:''},
                isselected:true,
                courseList:[]
            };
        },
        methods:{
            changePage(data) {
                this.courseList = data
            },
            cgkbox(i,item) {
                this.cki.i = i
            },
            //提交按钮
            selectSubmit(item) {
                // console.log(item)
            },
            getTableData() {
                //tableData数据初始化
                this.$GET('/studentLessonSelect/selectedLesson',{xsid:this.xsid,limit:10,page:1,condition:this.search}).then((res) => {
                    // console.log("已选选课初始化")
                    // console.log(res)
                    this.courseList = res.data || []
                })
            },
            titleSearch() { 
                this.search = this.search1
                this.$refs.ydPage.getData('search')
            }

        },
        created() { 
            //tableData数据初始化
            //  this.$GET('/studentLessonSelect/selectedLesson',{limit:10,page:1}).then((res) => {
            //     console.log("已选选课初始化")
            //     console.log(res)
            //     this.courseList = res.data || []
            // })
        },
        computed:{
            searchJS() {
                this.getTableData()
                return this.search
            }
        }
    }
</script>

<style lang="less" scoped>
    .yd-students-course {
        //已选课程
        .course-list {
            /*height: 110px;*/
            padding-right: 20px;
            margin-bottom: 20px;
            position: relative;
            .course-list-item {
                /*position: absolute;
                top: 0;
                left: 0;
                right: 20px;
                bottom: 0;*/
                -webkit-transition: all 0.4s;
                -moz-transition: all 0.4s;
                -ms-transition: all 0.4s;
                -o-transition: all 0.4s;
                transition: all 0.4s;
                cursor: pointer;
                &:hover{
                    -webkit-transform: scale(1.1);
                    -moz-transform: scale(1.1);
                    -ms-transform: scale(1.1);
                    -o-transform: scale(1.1);
                    transform: scale(1.1);
                }
                .status {
                    height: 22px;
                    line-height: 22px;
                    position: absolute;
                    right: 0;
                    top: -11px;
                    border-radius: 11px;
                    padding: 0 8px;
                    color: #fff;
                    font-size: 12px;
                }
                .text-blue {
                    background: rgba(50, 98, 236, 1);
                }
                .text-gray {
                    background-color: #ccc;
                }
                .title {
                    border-bottom: 1px solid #F3F5F7;
                    padding: 26px 26px 20px 26px;
                    h2 {
                        font-size: 16px;
                        margin-bottom: 10px;
                        color: #333;
                    }
                    h4 {
                        font-size: 14px;
                        img {
                            width: 26px;
                            height: 26px;
                            margin-right: 5px;
                        }
                    }
                }
                .content {
                    padding: 16px 26px 0;
                }
                .select {
                    padding: 10px 26px 0 26px;
                    display: none;
                }
                .bz {
                    /*margin-top: 10px;*/
                    padding-top: 20px;
                    border-top: 1px solid #ccc;
                    .color-blue {
                        color: #3F6EF2;
                    }
                }

            }
        }
    }
</style>

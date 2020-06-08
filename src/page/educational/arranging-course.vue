<template>
    <!--辅助排课系统-->
    <div v-loading="loading"
         element-loading-text="生成课表中,请稍等"
         class="yd-educational-arranging yd-bg common-pd" :style="{'minHeight':minHeight+'px'}">
        <!--{{this.$route.params.nj}}-->
        <div class="arranging-steps el-row">
            <div class="el-col-12">
                <div @click="steps_click(0)" :class="['el-col-7','step-list',active>=0?'active':'']">
                    <div class="left"></div>
                    <h3>排课约束</h3>
                    <div class="right"></div>
                </div>
                <div @click="steps_click(1)" :class="['el-col-7','step-list',active>=1?'active':'']">
                    <div class="left"></div>
                    <h3>排课调度</h3>
                    <div class="right"></div>
                </div>
                <div @click="steps_click(2)" :class="['el-col-7','step-list',active>=2?'active':'']">
                    <div class="left"></div>
                    <h3>手工调课</h3>
                    <div class="right"></div>
                </div>
                <!--    <div @click="steps_click(2)" :class="['el-col-7','step-list',active>=2?'active':'']">
                        <div class="left"></div>
                        <h3>课表查询</h3>
                        <div class="right"></div>
                    </div>-->
            </div>
            <div class="el-col-12 text-right hover-skin">
                <button @click="showMenu">参考数据</button>
            </div>
        </div>
        <!--参考数据-->
        <ul v-show="is_show" :class="['arranging-menu-ul',is_show == true ? 'show' : 'hide']">
            <li class="bg-skin" @click="steps_click(3)">班级信息</li>
            <li class="bg-skin" @click="steps_click(4)">教师信息</li>
            <li class="bg-skin" @click="steps_click(5)">教室信息</li>
            <li class="bg-skin" @click="steps_click(6)">课程信息</li>
        </ul>
        <div class="arranging-steps-content yd-common-table">
            <el-row v-show="active == 0">
                <course-one ref="courseOne"
                            v-on:receivecourseOne="function(data){restrictList=data}"></course-one>
            </el-row>
            <el-row v-show="active == 1">
                <course-two ref="courseTwo"
                            v-on:receivecourseTwo="function(data){taskList=data}"></course-two>
            </el-row>
            <el-row v-show="active == 2">
                <course-three :year="year"></course-three>
            </el-row>
            <!--参考数据-->
            <el-row v-show="active == 3">
                <reference-class-info :year="year" ref="classInfo"></reference-class-info>
            </el-row>
            <el-row v-show="active == 4">
                <reference-teacher-info :year="year" ref="teacherInfo"></reference-teacher-info>
            </el-row>
            <el-row v-show="active == 5">
                <reference-class-room :year="year" ref="classRoom"></reference-class-room>
            </el-row>
            <el-row v-show="active == 6">
                <reference-course-info :year="year" ref="courseInfo"></reference-course-info>
            </el-row>
            <!--按钮-->
            <el-row class="arranging-bth">
                <el-button @click="prev" round
                           v-if="active> 0 && active < 2">上一步
                </el-button>
                <el-button @click="next" round
                           v-if="active < 1">下一步
                </el-button>
                <el-button @click="createSchedule" round type="primary"
                           v-if="active < 2">生成课表
                </el-button>
            </el-row>
        </div>
        <!--错误提示-->
        <el-dialog
                title="提示"
                :close-on-click-modal='false'
                :visible.sync="dialogVisible"
                width="480px">
            <p class="text-red">{{error_message}}</p>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
                <el-button type="primary" @click="dialogVisible = false">好的</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import "../../page/educational/css/arrangingCourse.less"

    import courseOne from "./arranging/arranging-course-one"
    import courseTwo from "./arranging/arranging-course-two"
    import courseThree from './arranging/arranging-course-three'
    //参考数据
    import referenceClassInfo from "./arranging/reference-classInfo"
    import referenceClassRoom from "./arranging/reference-classRoom"
    import referenceCourseInfo from "./arranging/reference-courseInfo"
    import referenceTeacherInfo from "./arranging/reference-teacherInfo"

    export default {
        name:"arranging-course",
        components:{
            courseOne,
            courseTwo,
            courseThree,
            //参考数据
            referenceClassInfo,
            referenceCourseInfo,
            referenceClassRoom,
            referenceTeacherInfo,
        },
        data() {
            return {
                dialogVisible:false,
                error_message:'', //错误提示
                active:0, // 控制步骤条及填写条目的显示
                minHeight:this.$store.state.minClientHeight - 100,
                year:this.$route.params.year,
                restrictList:[],
                taskList:[],
                is_show:false,
                loading:false
            }
        },
        created() {

        },
        methods:{
            showMenu() {
                this.is_show = !this.is_show
            },
            getData() {
                this.$refs.courseOne.sendFrom()
                this.$refs.courseTwo.sendFrom()
            },
            returnData() {
                let params = {
                    year:this.year,
                    restrictList:this.restrictList,
                    taskList:this.taskList
                }
                return params
            },
            //生成课表
            createSchedule() {
                this.getData()
                let params = this.returnData()
                this.loading = true
                this.$POST('/timesheetTask/autoArrangement/' + this.year,params,
                    {
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }).then((res) => {
                    if (res.code == 200) {
                        this.loading = false
                        this.$message({
                            type:'success',
                            message:'生成成功'
                        })
                        this.$refs.courseTwo.getDate() //更新数据
                    } else {
                        this.loading = false
                        this.error_message = res.message
                        this.dialogVisible = true
                    }
                })
            },
            //步骤条上下步
            next() {
                if (this.active++ > 2) this.active = 2;
            },
            prev() {
                if (this.active-- < 1) this.active = 0;
            },
            steps_click(step) {
                this.active = step
                if (this.active <= 2) {
                    this.is_show = false
                }
            },
        }
    }
</script>

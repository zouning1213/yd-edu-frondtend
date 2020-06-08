<template>
    <!--单个排课设置-->
    <div class="arranging-setting-single">
        <div class="navigation-title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ name: 'educational_arranging_list' }">辅助排课系统</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <span class="font-skin">{{this.$route.params.planName}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基本数据" name="first">
                <div class="yd-bg common-pd" :style="{'minHeight':(this.$store.state.minClientHeight-78)+'px'}">
                    <ul class="yd-common-steps mb-20 clearfix">
                        <li :class="['step-list', first_steps==1 ? 'active' : '']" @click="first_steps = 1">
                            <div class="step-bg">
                                <div class="round">01</div>
                                <h3>教学时间设置</h3>
                            </div>
                        </li>
                        <li :class="['step-list', first_steps==2 ? 'active' : '']" @click="first_steps = 2">
                            <div class="step-bg">
                                <div class="round">02</div>
                                <h3>任课信息</h3>
                            </div>
                        </li>
                    </ul>
                    <setting-time @success="reload" v-if="first_steps == 1"></setting-time>
                    <setting-course-info v-if="first_steps == 2"></setting-course-info>
                </div>
            </el-tab-pane>
            <el-tab-pane label="排课条件设置" name="second">
                <div class="yd-bg common-pd"
                     :style="{'minHeight':(this.$store.state.minClientHeight-78)+'px'}">
                    <ul class="yd-common-steps mb-20 clearfix">
                        <li :class="['step-list', steps_second==1 ? 'active' : '']" @click="steps_second = 1">
                            <div class="step-bg">
                                <div class="round bg-skin">01</div>
                                <h3>禁排设置</h3>
                            </div>
                        </li>
                        <li :class="['step-list', steps_second==2 ? 'active' : '']" @click="steps_second = 2">
                            <div class="step-bg">
                                <div class="round">02</div>
                                <h3>固排设置</h3>
                            </div>
                        </li>
                        <li :class="['step-list', steps_second==3 ? 'active' : '']" @click="steps_second = 3">
                            <div class="step-bg">
                                <div class="round">03</div>
                                <h3>连堂设置</h3>
                            </div>
                        </li>
                        <!-- <li :class="['step-list', steps_second ==4 ? 'active' : '']" @click="steps_second = 4">
                             <div class="step-bg">
                                 <div class="round">04</div>
                                 <h3>任课分布</h3>
                             </div>
                         </li>-->
                        <!--     <li :class="['step-list', steps_second == 5 ? 'active' : '']" @click="steps_second = 5">
                                 <div class="step-bg">
                                     <div class="round">05</div>
                                     <h3>时段分布</h3>
                                 </div>
                             </li>-->
                        <!--  <li :class="['step-list', steps_second == 6 ? 'active' : '']" @click="steps_second = 6">
                              <div class="step-bg">
                                  <div class="round">06</div>
                                  <h3>合班设置</h3>
                              </div>
                          </li>-->
                    </ul>
                    <setting-constraint v-show="steps_second == 1" :pkjhid='planid'
                                        :weekindex='weekindex'
                                        :days='days'
                                        :times='times'>
                    </setting-constraint>
                    <setting-solid-row v-show="steps_second == 2"
                                        :weekindex='weekindex'
                                        :days='days'
                                        :times='times'>
                    </setting-solid-row>
                    <setting-course v-if="steps_second == 3"></setting-course>
                    <setting-teach v-if="steps_second == 4"></setting-teach>
                    <setting-hours v-if="steps_second == 5"></setting-hours>
                </div>
            </el-tab-pane>
            <el-tab-pane label="自动排课" name="three">
                <div class="yd-bg common-pd" :style="{'minHeight':(this.$store.state.minClientHeight-78)+'px'}">
                    <setting-start @success="activeName = 'four'"></setting-start>
                </div>
            </el-tab-pane>
            <el-tab-pane label="查看课表（手动调课）" name="four">
                <div class="yd-bg common-pd" :style="{'minHeight':(this.$store.state.minClientHeight-78)+'px'}">
                    <setting-class
                            v-if="activeName == 'four'"
                            :weekindex="weekindex"
                            :weekName="weekName"
                            :days="days"
                            :rowSpan="rowSpan"
                            :rowName="rowName">
                    </setting-class>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--循环table的第二种方法-->
        <div v-show="false" class="arranging-common-table">
            <table>
                <thead>
                <tr class="bg-skin border-skin">
                    <th></th>
                    <th></th>
                    <th v-for="xq in days" :key="xq">{{weekName[xq-1]}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in weekindex" :key="index">
                    <td v-if="rowSpan[index] != 0" :rowSpan="rowSpan[index]">
                        {{rowName[index]}}
                    </td>
                    <td>{{index+1}}</td>
                    <td v-for="id in item" :key="id">
                        {{id}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import './css/arranging-setting.less'
    import settingTime from './arranging-setting-single/setting-time'
    import settingCourseInfo from './arranging-setting-single/setting-course-info'
    import settingConstraint from './arranging-setting-single/setting-constraint'
    import settingClass from './arranging-setting-single/setting-class'
    import settingSolidRow from './arranging-setting-single/setting-solid-row'
    //任课分布
    import settingTeach from './arranging-setting-single/setting-teach'
    //连堂设置
    import settingCourse from './arranging-setting-single/setting-course'
    //时段分布
    import settingHours from './arranging-setting-single/setting-hours'
    //开始排课
    import settingStart from './arranging-setting-single/setting-start'

    export default {
        name:"arranging-course-two",
        components:{
            settingTime,
            settingCourseInfo,
            settingConstraint,
            settingClass,
            settingSolidRow,
            settingCourse,
            settingTeach,
            settingHours,
            settingStart
        },
        data() {
            return {
                activeName:'first',
                first_steps:1,
                steps_second:1,
                planid:this.$route.params.planid,//排课计划id
                //生成课表第一种方法
                days:[1,2,3,4,5], //选中的星期
                times:[], // 选中的节数
                dayOption:[], //节次的数组
                weekName:['星期一','星期二','星期三','星期四','星期五','星期六','星期日',], // 星期名转换
                //生成课表的第二种方法
                rowSpan:[], //跨列数
                rowName:[],
                weekindex:[],
            }
        },
        async created() {
            //tab切换步骤
            if (localStorage.getItem('singleActive')) {
                this.activeName = localStorage.getItem('singleActive')
            } else {
                this.activeName = 'first'
            }
            //基本信息的步骤
            if (localStorage.getItem('single_first_steps')) {
                this.first_steps = localStorage.getItem('single_first_steps')
            } else {
                this.first_steps = 1
            }
            //排课条件步骤
            if (localStorage.getItem('single_steps_second')) {
                this.steps_second = localStorage.getItem('single_steps_second')
            } else {
                this.steps_second = 1
            }

            await this.getTableOption()
            await this.getTableData()
            this.getTableRow()
            this.resetCourse()
        },
        methods:{
            //存取table缓存到页面
            handleClick(tab,event) {
                localStorage.setItem('singleActive',this.activeName)
            },
            getTableOption() {
                return this.$POST('/system/dictList/PKSJQJ').then(res => {
                    this.dayOption = res
                })
            },
            getTableData() {
                return this.$POST('/timesheetPlan/timeSheetTable',{planid:this.planid}).then(res => {
                    if (res.code == 200) {
                        this.weekindex = res.data.weekindex
                        this.days = res.data.days
                        this.times = res.data.time
                        if (this.times.length <= 0) { //如果没有 设置默认值
                            this.dayOption.forEach(item => {
                                this.times.push(4) //往默认值添加数据
                            })
                        }
                    }
                })
            },
            getTableRow() {
                let rowSpan = []
                let rowName = []
                //根据节次 补跨行0  补名称空
                this.times.forEach((item,num) => {
                    for (let index = 0; index < item; index++) {
                        rowSpan.push(index == 0? item :0)
                        rowName.push(index == 0? this.dayOption[num].name :'')
                    }
                })
                this.rowSpan = rowSpan
                this.rowName = rowName
            },
            //初始化课程数据
            resetCourse() {
                //初始化数据
                this.$GET('/timesheetTask/planedListTeachingTask/' + this.planid).then(res => {
                    if (res.code == 200) {
                        /*this.tableData = res.data.dbjx*/
                        //调用即可 初始化任课信息数据
                    }
                })
            },
            //刷新组件
            reload() {
                this.refreshTable()
            },
            async refreshTable() {
                await this.getTableOption()
                await this.getTableData()
                this.getTableRow()
            }
        },
        watch:{
            first_steps(value) {
                localStorage.setItem('single_first_steps',value)
            },
            steps_second(value) {
                localStorage.setItem('single_steps_second',value)
            }
        }
    }
</script>

<style lang="less">

</style>
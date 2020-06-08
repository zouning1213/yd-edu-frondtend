<template>
    <!--排课全局设置-->
    <div class="arranging-setting-multiple" style="padding-top: 20px">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全校设置" name="first">
                <div class="common-pd yd-bg"
                     :style="{'minHeight':(this.$store.state.minClientHeight-78)+'px'}">
                    <ul class="yd-common-steps mb-20 clearfix">
                        <li :class="['step-list', first_steps==1 ? 'active' : '']" @click="first_steps = 1">
                            <div class="step-bg">
                                <div class="round bg-skin">01</div>
                                <h3>教学时间设置</h3>
                            </div>
                        </li>
                        <li :class="['step-list', first_steps==2 ? 'active' : '']" @click="first_steps = 2">
                            <div class="step-bg">
                                <div class="round">02</div>
                                <h3>禁排设置</h3>
                            </div>
                        </li>
                        <li :class="['step-list', first_steps==3 ? 'active' : '']" @click="first_steps = 3">
                            <div class="step-bg">
                                <div class="round">03</div>
                                <h3>连堂设置</h3>
                            </div>
                        </li>
                        <!-- <li :class="['step-list', first_steps == 4 ? 'active' : '']" @click="first_steps = 4">
                             <div class="step-bg">
                                 <div class="round">04</div>
                                 <h3>预警设置</h3>
                             </div>
                         </li>-->
                        <!--  <li :class="['step-list', first_steps == 5 ? 'active' : '']" @click="first_steps = 5">
                              <div class="step-bg">
                                  <div class="round">05</div>
                                  <h3>任课分布</h3>
                              </div>
                          </li>-->
                    </ul>
                    <setting-time @success="reload" v-if="first_steps == 1"></setting-time>
                    <setting-constraint v-show="first_steps == 2"
                                        :tableWrap="{'weekindex':weekindex,'days':days,'times':times}"
                                        :weekindex='weekindex'
                                        :days='days'
                                        :times='times'>
                    </setting-constraint>
                    <setting-course v-if="first_steps == 3"></setting-course>
                    <setting-warning v-if="first_steps == 4"></setting-warning>
                    <setting-teach v-if="first_steps == 5"></setting-teach>
                </div>
            </el-tab-pane>
            <el-tab-pane label="合班教学" name="second">
                <div class="common-pd yd-bg"
                     :style="{'minHeight':(this.$store.state.minClientHeight-78)+'px'}">
                    <el-radio-group v-model="steps_second" style="margin-top: 10px;">
                        <el-radio-button label="1">先合班后教学</el-radio-button>
                        <!--<el-radio-button label="2">根据课程合班</el-radio-button>-->
                    </el-radio-group>
                    <setting-merge-first v-if="steps_second == 1"></setting-merge-first>
                    <!--<setting-merge-second v-if="steps_second == 2"></setting-merge-second>-->
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import './css/arranging-setting.less'
    import ydSteps from '../../components-page/common/yd-steps'
    import ydStep from '../../components-page/common/yd-step'
    //全校设置
    import settingTime from './arranging-setting-single/setting-time'
    import settingWarning from './arranging-setting-multiple/setting-warning'
    import settingConstraint from './arranging-setting-multiple/setting-constraint'
    import settingCourse from './arranging-setting-multiple/setting-course'
    import settingTeach from './arranging-setting-multiple/setting-teach'
    //合班教学
    import settingMergeFirst from './arranging-setting-multiple/setting-merge-first'
    import settingMergeSecond from './arranging-setting-multiple/setting-merge-second'

    export default {
        name:"arranging-setting",
        components:{
            ydSteps,
            ydStep,
            settingTime,
            settingWarning,
            settingConstraint,
            settingCourse,
            settingTeach,
            settingMergeFirst,
            settingMergeSecond
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
            if (localStorage.getItem('multipleActive')) {
                this.activeName = localStorage.getItem('multipleActive')
            } else {
                this.activeName = 'first'
            }
            
            //基本信息的步骤
            if (localStorage.getItem('multiple_first_steps')) {
                this.first_steps = localStorage.getItem('multiple_first_steps')
            } else {
                this.first_steps = 1
            }

            //排课条件步骤
            if (localStorage.getItem('multiple_steps_second')) {
                this.steps_second = localStorage.getItem('multiple_steps_second')
            } else {
                this.steps_second = 1
            }
            
            await this.getTableOption()
            await this.getTableData()
            this.getTableRow()
        },
        methods:{
            //存取table缓存到页面
            handleClick(tab,event) {
                localStorage.setItem('multipleActive',this.activeName)
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
                localStorage.setItem('multiple_first_steps',value)
            },
            steps_second(value) {
                localStorage.setItem('multiple_steps_second',value)
            }
        }
    }
</script>

<style scoped>

</style>
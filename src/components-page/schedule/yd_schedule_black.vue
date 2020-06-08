<template>
    <!--适用于 教务 单课表查询 可筛选展示课表的字段-->
    <!--说明 year 年 params 对象 必传参数 包含有2个参数,
     mark 类型 有 teacherInfo classRoom classInfo
     keys  为这几种类型选中的值 jsh zgh bh-->
    <div class="pr">
        <div class="print-schedule no-print" style="z-index:66">
            <a href="javascript:void(0)" @click="printContent">
                <i class="yd icon-print"></i>
            </a>
        </div>
        <el-form ref="form" label-width="100px">
            <el-form-item label="选择排课计划:">
                <el-select style="width: 300px" v-model="planid" @change="changePk"
                           placeholder="选择排课计划">
                    <el-option v-for="item in pkOption"
                               :key="item.pkjhid"
                               :label="item.pkjhmc"
                               :value="item.pkjhid"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div v-if="Object.keys(tableData).length <= 0 && loading == true" class="no-schedule-tip no-print">
            <img src="@/assets/no-tip-img/no-schedule-tip.png"/>
            <p>暂无课表</p>
        </div>
        <div ref="print" class="yd-schedule-black" v-if="Object.keys(tableData).length > 0 && loading == true">
            <div class="schedule-title el-row">
                <el-col :span="6">
                    <h3>{{params.name}}</h3>
                    <span class="text">(课表)</span>
                    <!--<span>({{params.year}}级第{{params.xq}}学期)</span>-->
                </el-col>
                <el-col :span="18" class="text-right">
                    <div class="no-print">
                        <yd-schedule-options :mark="params.mark"
                                             v-on:changeOptions="changeOptions">
                        </yd-schedule-options>
                    </div>
                </el-col>
            </div>
            <table class="schedule-table">
                <thead class="table-head">
                <tr>
                    <th width="8%"></th>
                    <th class="arrow" width="8%"><img src="./img/arrow-black.png"/></th>
                    <th :width="(100-16)/days.length + '%'" v-for="xq in days">{{weekName[xq-1]}}</th>
                </tr>
                </thead>
                <tbody class="table-body">
                <tr v-for="(item,index) in weekindex">
                    <td v-if="rowSpan[index] != 0" :rowSpan="rowSpan[index]">
                        {{rowName[index]}}
                    </td>
                    <td>{{index+1}}</td>
                    <td v-for="tdId in item">
                        <div v-if="params.mark == 'classInfo'" class="schedule-block">
                            <ul v-if="tableData[tdId] != undefined">
                                <li class="info-list"
                                    v-for="(item,index) in tableData[tdId]"
                                    :key="index" @click="showDetailInfo($event,item)">
                                    <p v-show="!options.showJC" class="line-2">{{item.kcmc}}</p>
                                    <p v-show="options.showJC" class="line-2">{{item.kcjc || item.kcmc}}</p>
                                    <p v-show="options.showZC">第{{item.ksap}}周</p>
                                    <p v-show="options.showJS">{{item.zgxm}}</p>
                                    <p v-show="options.showJSH">{{item.jsmc}}</p>
                                </li>
                            </ul>
                        </div>
                        <div v-if="params.mark == 'classRoom'" class="schedule-block">
                            <ul v-if="tableData[tdId] != undefined">
                                <li class="info-list"
                                    v-for="(item,index) in tableData[tdId]"
                                    :key="index" @click="showDetailInfo($event,item)">
                                    <p v-show="!options.showJC" class="line-2">{{item.kcmc}}</p>
                                    <p v-show="options.showJC" class="line-2">{{item.kcjc || item.kcmc}}</p>
                                    <p v-show="options.showBJ" class="line-2">{{item.bjmc}}</p>
                                    <p v-show="options.showZC">第{{item.ksap}}周</p>
                                    <p v-show="options.showJS">{{item.zgxm}}</p>
                                </li>
                            </ul>
                        </div>
                        <div v-if="params.mark == 'teacherInfo'" class="schedule-block">
                            <ul v-if="tableData[tdId] != undefined">
                                <li class="info-list"
                                    v-for="(item,index) in tableData[tdId]"
                                    :key="index" @click="showDetailInfo($event,item)">
                                    <p v-show="!options.showJC" class="line-2">{{item.kcmc}}</p>
                                    <p v-show="options.showJC" class="line-2">{{item.kcjc || item.kcmc}}</p>
                                    <p v-show="options.showBJ">{{item.bjmc}}</p>
                                    <p v-show="options.showZC">第{{item.ksap}}周</p>
                                    <p v-show="options.showJSH">{{item.jsmc}}</p>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 课程详情-->
        <div v-if="showDetail" @mouseenter="clearTimeOut" @mouseleave="hideDetail"
             class="schedule-black-info"
             :style="{left:dialogPosition.left+'px',top:dialogPosition.top +'px'}">
            <div class="title el-row">
                <div class="el-col-12">{{weekInfoData.kcmc}}</div>
                <div class="el-col-12 text-right"><span @click="closeAllDialog"><i class="el-icon-close"></i></span>
                </div>
            </div>
            <ul class="info-list-ul">
                <li class="info-list el-row">
                    <div class="el-col-2"><i class="yd icon-banji"></i></div>
                    <div class="el-col-22"><p>{{weekInfoData.bjmc}}<span>({{weekInfoData.zymc}})</span></p></div>
                </li>
                <li class="info-list el-row">
                    <div class="el-col-2"><i class="yd icon-time"></i></div>
                    <div class="el-col-22"><p>第{{weekInfoData.ksap}}周</p></div>
                </li>
                <li class="info-list el-row">
                    <div class="el-col-2"><i class="yd icon-teacher"></i></div>
                    <div class="el-col-22"><p>{{weekInfoData.zgxm}}</p></div>
                </li>
                <li class="info-list el-row">
                    <div class="el-col-2"><i class="yd icon-didian"></i></div>
                    <div class="el-col-22"><p>{{weekInfoData.jsmc}}</p></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import ydScheduleOptions from './yd-schedule-options'
    import './css/yd_schedule_black.less'

    export default {
        name: 'yd_schedule',
        components: {
            ydScheduleOptions
        },
        props: {
            params: {
                required: true
            },
        },
        data () {
            return {
                pkOption: [],
                planid: '',
                loading: false,
                is_close: true, //能否关闭详情框
                showDetail: false,
                weekInfoData: {},  //课程详情数据
                tableData: [], //转换课程表数据
                dialogPosition: {
                    top: 0,
                    left: 0
                },
                options: {
                    showJC: false, //显示简称
                    showJS: false, //显示教师
                    showJSH: false, //显示教室
                    showZC: false, //显示周次
                    showBJ: false, //显示班级
                }, //显示设置
                //渲染table数据
                days: [1, 2, 3, 4, 5], //选中的星期
                times: [], // 选中的节数
                dayOption: [], //节次的数组
                weekName: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日',], // 星期名转换
                rowSpan: [], //跨列数
                rowName: [],
                weekindex: [],
            }
        },
        async created () {
            //获取排课计划
            await this.getXqOption()
            //获取table渲染数据
            await this.getTableOption()
            await this.getTableData()
            this.getTableRow()
            //获取日程
            this.getSchedule()
        },
        methods: {
            getTableOption () {
                return this.$POST('/system/dictList/PKSJQJ').then(res => {
                    this.dayOption = res
                })
            },
            getTableData () {
                return this.$POST('/timesheetPlan/timeSheetTable', {planid: this.planid}).then(res => {
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
            getTableRow () {
                let rowSpan = []
                let rowName = []
                //根据节次 补跨行0  补名称空
                this.times.forEach((item, num) => {
                    for (let index = 0; index < item; index++) {
                        rowSpan.push(index == 0 ? item : 0)
                        rowName.push(index == 0 ? this.dayOption[num].name : '')
                    }
                })
                this.rowSpan = rowSpan
                this.rowName = rowName
            },
            //刷新table
            async refreshTable () {
                await this.getTableOption()
                await this.getTableData()
                this.getTableRow()
                this.getSchedule()
            },
            changePk () {
                this.refreshTable()
            },
            changeOptions (data) {
                this.options = data
            },
            getXqOption () {
                return this.$GET('/timesheetPlan/selectlist').then(res => {
                    if (res.code == 200) {
                        this.pkOption = res.data
                        this.pkOption.forEach(item => {
                            if (item.checked) {
                                this.planid = item.pkjhid
                            }
                        })

                        if (this.planid == '') {
                            this.planid = this.pkOption[0].pkjhid
                        }
                    }
                })
            },
            getSchedule () {
                this.params.pkjhid = this.planid
                if (this.params.mark != '' && this.params.keys != '') {
                    this.$POST('/timesheetTask/timeSheetView/', this.params).then((res) => {
                        this.isSeries = res.data.isSeries  //是否连堂
                        this.weekHours = res.data.zks //周课时
                        this.jc_num = Math.ceil(this.weekHours / this.xq_num) //节次
                        this.tableData = res.data.sheet
                        this.loading = true
                    })
                } else {
                    this.tableData = []
                }
            },
            //开启定时器
            openTimeOut () {
                this.timer = setTimeout(() => {
                    this.showDetail = false
                }, 2000)
            },
            //清除定时器
            clearTimeOut () {
                clearTimeout(this.timer)
            },
            closeAllDialog () {
                this.showDetail = false
            },
            hideDetail () {
                if (this.is_close) {
                    this.openTimeOut()
                }
            },
            //获取当前课程
            showDetailInfo (event, item) {
                this.clearTimeOut()
                this.showDetail = false
                let allWidth = document.documentElement.clientWidth || document.body.clientWidth
                let allHeight = document.documentElement.clientHeight || document.body.clientHeight
                if (allHeight - event.pageY <= 200) {
                    this.dialogPosition.top = event.pageY - 185 - 20
                } else {
                    this.dialogPosition.top = event.pageY + 20
                }
                if (allWidth - event.pageX <= 175) {
                    this.dialogPosition.left = allWidth - 350 - 45
                } else {
                    this.dialogPosition.left = event.pageX - 175
                }
                this.weekInfoData = item
                this.showDetail = true
                this.openTimeOut()
            },
            printContent () {
                this.$print(this.$refs.print) // 使用
            }
        }
    }
</script>

<style scoped>

</style>
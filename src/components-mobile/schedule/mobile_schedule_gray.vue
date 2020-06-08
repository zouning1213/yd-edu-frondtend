<template>
    <!--说明 year 年 params 对象 必传参数 包含有2个参数,
     mark 类型 有 teacherInfo classRoom classInfo
     keys  为这几种类型选中的值 jsh zgh bh-->
    <div>
        <!--选择排课计划-->
        <van-dropdown-menu>
            <van-dropdown-item v-model="planid" :options="pkOption" @change="changePk"/>
        </van-dropdown-menu>
        <div v-if="Object.keys(tableData).length <= 0 && loading == true" class="mobile-schedule-tip no-print">
            <img src="@/assets/no-tip-img/no-schedule-tip.png"/>
            <p>暂无课表</p>
        </div>
        <div v-if="Object.keys(tableData).length > 0 && loading == true" ref="print" class="mobile-schedule-grade">
            <table class="schedule-table">
                <thead class="table-head">
                <tr>
                    <th width="6%"></th>
                    <th class="arrow" width="6%"><!--<img src="./img/arrow-black.png"/>--></th>
                    <th :width="(100-12)/days.length + '%'" v-for="xq in days">{{weekName[xq-1]}}</th>
                </tr>
                </thead>
                <tbody class="table-body">
                <tr v-for="(item,index) in weekindex">
                    <td class="other-td" v-if="rowSpan[index] != 0" :rowSpan="rowSpan[index]">
                        {{rowName[index]}}
                    </td>
                    <td class="other-td">{{index+1}}</td>
                    <template v-for="tdId in item">
                        <!--classInfo 班级-->
                        <td v-if="params.mark == 'classInfo'" :style="setBgColor(tableData[tdId],'kch')">
                            <div class="schedule-block">
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
                        </td>
                        <!--classRoom 教室-->
                        <td v-if="params.mark == 'classRoom'" :style="setBgColor(tableData[tdId],'kch')">
                            <div class="schedule-block">
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
                        </td>
                        <!--teacherInfo 教师-->
                        <td v-if="params.mark == 'teacherInfo'" :style="setBgColor(tableData[tdId],'bh')">
                            <div class="schedule-block">
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
                    </template>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 课程详情-->
        <div class="mobile-grade-info">
            <van-dialog
                    v-model="showDetail"
                    closeOnClickOverlay
                    :showCancelButton="false"
                    :showConfirmButton="false">
                <h3>{{weekInfoData.kcmc}}</h3>
                <p><span>班级</span>{{weekInfoData.bjmc}}<!--<label>({{weekInfoData.zymc}})</label>--></p>
                <p><span>时间</span>第{{weekInfoData.ksap}}周</p>
                <p><span>教师</span>{{weekInfoData.zgxm}}</p>
                <p><span>地点</span>{{weekInfoData.jsmc}}</p>
            </van-dialog>
        </div>
    </div>
</template>

<script>
    import './css/mobile_schedule_gray.less'

    export default {
        name: 'yd_schedule',
        props: {
            params: {
                required: true
            },
        },
        data () {
            return {
                /*选择排课计划开始*/

                /*选择排课计划结束*/
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
                    showZC: false, //显示周次
                    showJS: true, //显示教师
                    showJSH: true, //显示教室
                    showBJ: true, //显示班级
                }, //显示设置
                //渲染table数据
                days: [1, 2, 3, 4, 5], //选中的星期
                times: [], // 选中的节数
                dayOption: [], //节次的数组
                weekName: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',], // 星期名转换
                rowSpan: [], //跨列数
                rowName: [],
                weekindex: [],
                //设置背景颜色
                bgColor: {},
                bgColorArray: ['#CDCDCD', '#3262EC', '#63D6DE', '#FF6366', '#F8BD09', '#CDCDCD']
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
            setBgColor (array, id) {
                // console.log(id)
                if (array != undefined) { //设置背景颜色
                    if (id == 'bh') {
                        if (this.bgColor[array[0].bh] == undefined) {
                            this.bgColor[array[0].bh] = this.bgColorArray[Math.floor(Math.random() * (5)) + 1]
                        }
                        return 'background-color:' + this.bgColor[array[0].bh]
                    }
                    if (id == 'kch') {
                        if (this.bgColor[array[0].kch] == undefined) {
                            this.bgColor[array[0].kch] = this.bgColorArray[Math.floor(Math.random() * (5)) + 1]
                        }
                        return 'background-color:' + this.bgColor[array[0].kch]
                    }

                }
            },
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
                console.log(this.pkjhid)
            },
            changeOptions (data) {
                this.options = data
            },
            getXqOption () {
                return this.$GET('/timesheetPlan/selectlist').then(res => {
                    if (res.code == 200) {
                        // console.log(res.data)
                        res.data.forEach(item => {
                            this.pkOption.push({
                                text: item.pkjhmc,
                                value: item.pkjhid
                            })
                            //如果有设置默认值的话
                            if (item.checked) {
                                this.planid = item.pkjhid
                            }
                        })
                        //如果没有默认值的话先给一个默认值
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
                        console.log(this.tableData)
                    })
                } else {
                    this.tableData = []
                }
            },
            showDetailInfo (event, item) {
                this.weekInfoData = item
                this.showDetail = true
            },
        }
    }
</script>

<style scoped>

</style>
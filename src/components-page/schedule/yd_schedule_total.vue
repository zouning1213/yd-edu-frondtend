<template>
    <!--适用于教务多课表查询-->
    <div class="yd-schedule-all" ref="print" :style="{minHeight:this.$store.state.minClientHeight - 186 + 'px'}">
        <el-row class="no-print">
            <el-col :span="12">
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
            </el-col>
            <el-col :span="12" class="text-right">
                <yd-schedule-options :mark="params.mark"
                                     v-on:changeOptions="changeOptions">
                </yd-schedule-options>
            </el-col>
        </el-row>
        <div class="download-schedule">
            <div class="download no-print" @click="exportToExcel"><i class="yd icon-download"></i></div>
            <div class="print no-print" @click="printContent"><i class="yd icon-print"></i></div>
        </div>
        <div v-show="false" class="schedule-title el-row">
            <el-col :span="4" style="padding-top: 10px">
                <h3 v-if="params.mark =='classInfo'">班级课表</h3>
                <h3 v-if="params.mark =='classRoom'">教室课表</h3>
                <h3 v-if="params.mark =='teacherInfo'">教师课表</h3>
                <!--<span>({{text}})</span>-->
            </el-col>
            <el-col :span="12">

            </el-col>
            <el-col :span="8" class="text-right"><img src="../../page/layout/img/logo.png"/></el-col>
        </div>
        <!--内容部分-->
        <div id="table-content" :style="{'maxHeight':this.$store.state.minClientHeight - 246 +'px'}">
            <table class="schedule-table">
                <thead>
                <tr>
                    <!--<th rowspan="2" width="40"><p style="font-weight: bold">序号</p></th>-->
                    <th v-if="params.mark == 'classInfo'" rowspan="2"><p style="font-weight: bold">班级</p></th>
                    <th v-if="params.mark == 'teacherInfo'" rowspan="2"><p style="font-weight: bold">教师</p></th>
                    <th v-if="params.mark == 'classRoom'" rowspan="2"><p style="font-weight: bold">教室</p></th>
                    <template v-for="(item,index) in tableHead">
                        <th :colspan="item.cells">
                            <p style="font-weight: bold">星期{{weekName[item.weekly-1]}}</p>
                        </th>
                    </template>
                </tr>
                <tr>
                    <th v-for="(item,index) in tableHead1" :key="index">
                        <p>{{item.name}}</p>
                        <span>{{item.time}}</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index ) in tableBody" :key="index">
                    <!--<td align="center" width="80px"><p>{{index+1}}</p></td>-->
                    <template v-for="(item2,index2) in item">
                        <td v-if="index2 == 0 " align="center" class="schedule-item">
                            <div>
                                <p v-if="params.mark == 'classInfo'">{{item2.bjmc}}</p>
                                <p v-if="params.mark == 'teacherInfo'">{{item2.zgxm}}</p>
                                <p v-if="params.mark == 'classRoom'">{{item2.jsmc}}</p>
                            </div>
                        </td>
                        <td v-else class="schedule-item" width="80px">
                            <template v-if="params.mark == 'classInfo'">
                                <template v-if="item2.length > 0">
                                    <div v-for="(item3,index3) in item2" :key="index3">
                                        <p v-show="!options.showJC" class="line-2">{{item3.kcmc}}</p>
                                        <p v-show="options.showJC" class="line-2">{{item3.kcjc || item3.kcmc}}</p>
                                        <p v-show="options.showZC">第{{item3.ksap}}周</p>
                                        <p v-show="options.showJS">{{item3.zgxm}}</p>
                                        <p v-show="options.showJSH">{{item3.jsmc}}</p>
                                    </div>
                                </template>
                            </template>
                            <template v-if="params.mark == 'teacherInfo'">
                                <template v-if="item2.length > 0">
                                    <div v-for="(item3,index3) in item2" :key="index3">
                                        <p v-show="!options.showJC" class="line-2">{{item3.kcmc}}</p>
                                        <p v-show="options.showJC" class="line-2">{{item3.kcjc || item3.kcmc}}</p>
                                        <p v-show="options.showBJ">{{item3.bjmc}}</p>
                                        <p v-show="options.showZC">第{{item3.ksap}}周</p>
                                        <p v-show="options.showJSH">{{item3.jsmc}}</p>
                                    </div>
                                </template>
                            </template>
                            <template v-if="params.mark == 'classRoom'">
                                <template v-if="item2.length > 0">
                                    <div v-for="(item3,index3) in item2" :key="index3">
                                        <p v-show="!options.showJC" class="line-2">{{item3.kcmc}}</p>
                                        <p v-show="options.showJC" class="line-2">{{item3.kcjc || item3.kcmc}}</p>
                                        <p v-show="options.showBJ">{{item3.bjmc}}</p>
                                        <p v-show="options.showZC">第{{item3.ksap}}周</p>
                                        <p v-show="options.showJS">{{item3.zgxm}}</p>
                                    </div>
                                </template>
                            </template>
                        </td>
                    </template>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import ydScheduleOptions from './yd-schedule-options'
    import '../../../static/css/global.css'
    import '../../page/css/common.less'
    import './css/yd_schedule-all.less'

    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    export default {
        name: 'yd_schedule-all',
        components: {
            ydScheduleOptions
        },
        props: {
            params: {
                required: true
            }
        },
        data () {
            return {
                pkOption: [],
                planid: '',
                weekName: ['一', '二', '三', '四', '五', '六', '七'],
                tableHead: [],
                tableHead1: [],
                tableBody: [],
                title: '',
                text: '',
                options: {
                    showJC: false,
                    showJS: false, //显示教师
                    showJSH: false, //显示教室
                    showZC: false, //显示周次
                    showBJ: false, //显示班级
                } //显示设置
            }
        },
        async created () {
            await this.getXqOption()
            this.getSchedule()
        },
        methods: {
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
            changePk () {
                this.getSchedule()
            },
            changeOptions (data) {
                // console.log(data)
                this.options = data
                // this.getData()
            },
            getSchedule () {
                this.params.pkjhid = this.planid
                this.$POST('/timesheetTask/timeSheetSumup', this.params).then((res) => {
                    this.tableHead = res.data.header1
                    this.tableHead1 = res.data.header2
                    this.tableBody = res.data.body
                    // console.log(this.tableBody)
                })
            },
            //导出
            exportToExcel () {
                if (this.params.mark == 'classInfo') {
                    location.href = setting.remoteHost + '/timesheetTask/exportClassInfo?' +
                        '' + 'mark=' + this.params.mark + '&keys=' + this.params.keys
                        + '&week=' + this.options.showZC + '&teacher=' + this.options.showJS + '&pkjhid=' + this.planid

                } else if (this.params.mark == 'teacherInfo') {
                    location.href = setting.remoteHost + '/timesheetTask/exportTeacherInfo?' +
                        '' + 'mark=' + this.params.mark + '&keys=' + this.params.keys +
                        '&week=' + this.options.showZC + '&classInfo=' + this.options.showBJ + '&pkjhid=' + this.planid

                }
            },
            //打印
            printContent () {
                this.$print(this.$refs.print) // 使用
            }
        }
    }
</script>

<style scoped>

</style>
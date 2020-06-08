<template>
    <div>
        <!--下拉选项-->
        <el-row class="arranging-common-select">
            <el-col :span="24">
                <el-form :inline="true" size="small">
                    <el-form-item label="选择课程:" required>
                        <el-select v-model="checked_kcid" @change="changeKcid" filterable placeholder="选择课程">
                            <el-option
                                    v-for="item in kcOptions"
                                    :key="item.kcid"
                                    :label="item.kcmc"
                                    :value="item.kcid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择教师:" required>
                        <el-select v-model="checked_jsid" @change="changeJsid" filterable placeholder="选择教师">
                            <el-option
                                    v-for="item in jsOptions"
                                    :key="item.jsid"
                                    :label="item.zgxm"
                                    :value="item.jsid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
            <!--  <el-col :span="12" class="text-right">
                  <el-button size="small">撤销</el-button>
                  <el-button size="small" type="primary">保存</el-button>
              </el-col>-->
        </el-row>
        <!--表格-->
        <el-row class="arranging-common-table">
            <el-col :span="14">
                <h3 class="table-title">{{checked_kcmc}} {{checked_zgxm}} 课表</h3>
                <el-checkbox-group v-model="checked" @change="changeChecked">
                    <table class="large-table">
                        <thead>
                        <tr class="bg-skin border-skin">
                            <th width="5%"><p>节次</p></th>
                            <th :width="(100-5)/weekDay + '%'" v-for="week in weekDay">
                                <p>星期{{weekName[week-1]}}</p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="day in dayNum">
                            <td>{{day}}</td>
                            <td v-for="week in weekDay"
                                :class="{'bg-ABFFCF':checked.includes(''+week+day),
                                'bg-C7F2FF':change_keys.includes(''+week+day),
                                'bg-EAEAEA':exchangetime == ''+week+day}">
                                <!--要改变的-->
                                <template v-if="table[''+week+day]">
                                    <div class="check-bg">
                                        <el-checkbox :label="''+week+day" name="type"></el-checkbox>
                                    </div>
                                    <template v-for="(item) in table[''+week+day]">
                                        <p>{{item.kcmc}}</p>
                                        <p>{{item.bjmc}}</p>
                                    </template>
                                </template>
                                <!--被改变的-->
                                <template v-if="change_table[''+week+day]">
                                    <!-- @mouseover.self native="moveChecked(''+week+day)"-->
                                    <div class="check-bg" @mouseenter="moveChecked(''+week+day)">
                                        <el-checkbox :label="''+week+day" name="type"></el-checkbox>
                                    </div>
                                    <template v-for="(item) in change_table[''+week+day]">
                                        <p>{{item.kcmc}}</p>
                                        <p>{{item.bjmc}}</p>
                                    </template>
                                </template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-checkbox-group>
                <ul class="arranging-common-tip">
                    <li><span></span>当前选中课程</li>
                    <li><span></span>可对调课程</li>
                    <li><span></span>已对调课程</li>
                </ul>
            </el-col>
            <el-col :span="9" :offset="1">
                <div class="mb-10">
                    <h3 class="table-title">可对调 {{teacherName}} 教师课表</h3>
                    <el-checkbox-group v-model="checked_vice1">
                        <table>
                            <thead>
                            <tr class="bg-skin border-skin">
                                <th width="10%"><p>节次</p></th>
                                <th :width="(100-10)/weekDay + '%'" v-for="week in weekDay">
                                    <p>星期{{weekName[week-1]}}</p>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="day in dayNum">
                                <td>{{day}}</td>
                                <td v-for="week in weekDay" :class="{'bg-ABFFCF':checked.includes(''+week+day)}">
                                    <template v-for="(item) in teacherTable[''+week+day]">
                                        <p>{{item.kcmc}}</p>
                                        <p>{{item.bjmc}}</p>
                                    </template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </el-checkbox-group>
                </div>
                <div>
                    <h3 class="table-title">可对调 {{className}} 班级课表</h3>
                    <el-checkbox-group v-model="checked_vice2">
                        <table>
                            <thead>
                            <tr class="bg-skin border-skin">
                                <th width="10%"><p>节次</p></th>
                                <th :width="(100-10)/weekDay + '%'" v-for="week in weekDay">
                                    <p>星期{{weekName[week-1]}}</p>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="day in dayNum">
                                <td>{{day}}</td>
                                <td v-for="week in weekDay" :class="{'bg-ABFFCF':checked.includes(''+week+day)}">
                                    <template v-for="(item) in classTable[''+week+day]">
                                        <p>{{item.kcmc}}</p>
                                        <p>{{item.zgxm}}</p>
                                    </template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </el-checkbox-group>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:"arranging-course-three",
        props:['year'],
        data() {
            return {
                weekName:['一','二','三','四','五','六','七',],
                weekDay:null, //一星期的天数
                dayNum:null, //一天节课数
                checked_kcid:'', //课程id
                checked_kcmc:'',
                kcOptions:[],
                checked_jsid:'', //教师id
                checked_zgxm:'',
                jsOptions:[],
                checked:[],
                checked_vice1:[],
                checked_vice2:[],
                table:{},
                table_keys:[],
                change_keys:[],//可置换的key值
                change_table:{},
                is_change:false,
                //保存置换前的一个数据
                originTime:'',
                originData:[],
                exchangetime:'',
                exchangedata:[],
                teacherName:'', //参考教师名称
                className:'', //参考班级名称
                teacherTable:{}, //参考教师课表
                classTable:{}, //参考班级课表
            }
        },
        created() {
            this.$POST('/timesheetTask/timeSheetTable').then((res) => {
                if (res.code == 200) {
                    this.weekDay = res.data.day
                    this.dayNum = res.data.timeAll
                }
            })

            this.$GET('/timesheetTask/getTaskKcids',{year:this.year}).then((res) => {
                if (res.code == 200) {
                    this.kcOptions = res.data
                    if (this.kcOptions.length > 0) {
                        this.checked_kcid = this.kcOptions[0].kcid
                        this.changeKcid()
                    }
                }
            })
        },
        methods:{
            emptyTable() {
                this.checked = []
                this.change_keys = []
                this.change_table = {}
                this.exchangetime = ''
                this.exchangedata = []
                this.originTime = ''
                this.originData = []
            },
            changeJsid() {
                this.getZgxm()
                this.getTable()
                this.emptyTable()
            },
            moveChecked(id) {
                //蓝色块
                let data = this.change_table[id]
                let jsid = [] //教师id
                let zgxm = []
                let bjid = [] //班级id
                let bjmc = []
                data.forEach((item,index) => {
                    jsid.push(item.zgh)
                    bjid.push(item.bh)
                    zgxm.push(item.zgxm)
                    bjmc.push(item.bjmc)
                })

                this.teacherName = zgxm.join(',')
                this.className = bjmc.join(',')

                let params1 = {
                    mark:'teacherInfo',
                    keys:jsid.join(',')
                }
                let params2 = {
                    mark:'classInfo',
                    keys:bjid.join(',')
                }
                //教师参考课表
                this.$POST('/timesheetTask/timeSheetView/',params1).then((res) => {
                    if (res.code == 200) {
                        this.teacherTable = res.data.sheet
                    }
                })
                //班级参考课表
                this.$POST('/timesheetTask/timeSheetView/',params2).then((res) => {
                    if (res.code == 200) {
                        this.classTable = res.data.sheet
                    }
                })
            },
            changeChecked() {
                if (this.checked.length > 1) {
                    this.checked.shift();
                }

                if (this.checked.length > 0) {
                    //选中需要置换的
                    if (this.table_keys.includes(this.checked[0])) {
                        let params = {
                            time:this.checked[0],
                            data:this.table[this.checked[0]]
                        }

                        this.originTime = this.checked[0]
                        this.originData = this.table[this.checked[0]]

                        this.$POST('/timesheetTask/ableExchangeLesson',params,{
                            transformRequest:function (data) {
                                return JSON.stringify(data);
                            },
                            headers:{'Content-Type':'application/json'}
                        }).then((res) => {
                            this.change_keys = []
                            this.change_table = res
                            Object.keys(res).forEach(item => {
                                this.change_keys.push(item)
                                // console.log(this.change_keys)
                            })
                            this.is_change = true
                        })
                    }
                    //确定要置换的
                    if (this.change_keys.includes(this.checked[0])) {

                        this.exchangetime = this.checked[0]
                        this.exchangedata = this.change_table[this.checked[0]]

                        let params = {
                            origintime:this.originTime,
                            origindata:this.originData,
                            exchangetime:this.exchangetime,
                            exchangedata:this.exchangedata
                        }

                        this.$POST('/timesheetTask/doExchangeLesson',params,{
                            transformRequest:function (data) {
                                return JSON.stringify(data);
                            },
                            headers:{'Content-Type':'application/json'}
                        }).then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message:'更换成功',
                                    type:'success'
                                });
                                this.getTable()
                                this.change_keys = []
                                this.change_table = {}
                                this.checked = []

                                setTimeout(() => {
                                    this.exchangetime = ''
                                    this.exchangedata = []
                                },500)
                            }
                        })
                    }
                } else {
                    this.emptyTable()
                }
            },
            getKcmc() {
                //获取课程名称
                var index = this.kcOptions.map(function (item) {
                    return item.kcid;
                }).indexOf(this.checked_kcid);

                this.checked_kcmc = this.kcOptions[index].kcmc
            },
            getZgxm() {
                //获取教师姓名
                var index = this.jsOptions.map(function (item) {
                    return item.jsid;
                }).indexOf(this.checked_jsid);

                this.checked_zgxm = this.jsOptions[index].zgxm
            },
            getKcOptions() {
                this.$GET('/timesheetTask/getTaskTeacherids',{year:this.year,kcid:this.checked_kcid}).then((res) => {
                    if (res.code == 200) {
                        this.jsOptions = res.data
                        if (this.jsOptions.length > 0) {
                            this.checked_jsid = this.jsOptions[0].jsid
                            this.getZgxm()
                            this.getTable()
                        }
                    }
                })
            },
            getTable() {
                let params = {
                    mark:'teacherInfo',
                    keys:this.checked_jsid
                }
                this.$POST('/timesheetTask/timeSheetView/',params).then((res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.table_keys = []
                        this.table = res.data.sheet
                        Object.keys(this.table).forEach(item => {
                            this.table_keys.push(item)
                        })
                    }
                })
            },
            changeKcid() {
                this.getKcOptions()
                this.getKcmc()
                this.emptyTable()
            },
        }
    }
</script>

<style scoped lang="less">

</style>
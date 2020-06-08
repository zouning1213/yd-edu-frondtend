<template>
    <div>
        <!--下拉选项-->
        <el-row class="arranging-common-select">
            <el-col :span="24">
                <el-form :inline="true" size="small">
                    <el-form-item label="当前年级:" required>
                        <el-input disabled v-model="checked_nj"></el-input>
                    </el-form-item>
                    <el-form-item label="选择班级:" required>
                        <el-select style="width: 320px"
                                   v-model="checked_bjid" @change="changeBjid" filterable placeholder="选择班级">
                            <el-option
                                    v-for="item in bjOptions"
                                    :key="item.bjid"
                                    :label="item.bjmc"
                                    :value="item.bjid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <!--   <el-select v-model="checked_nj" @change="changeNj" filterable placeholder="选择年级" size="mini">
                       <el-option
                               v-for="item in njOptions"
                               :key="item.kcid"
                               :label="item.kcmc"
                               :value="item.kcid">
                       </el-option>
                   </el-select>-->

            </el-col>
            <!--  <el-col :span="12" class="text-right">
                  <el-button size="small">撤销</el-button>
                  <el-button size="small" type="primary">保存</el-button>
              </el-col>-->
        </el-row>
        <!--表格-->
        <el-row class="arranging-common-table">
            <el-col :span="14">
                <h3 class="table-title">{{checked_njmc}} {{checked_bjmc}} 课表</h3>
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
                                <!--{{table[''+week+day] == undefined && change_keys.includes(''+week+day)}}-->
                                <!-- {{change_keys.includes(''+week+day)}}-->
                                <template v-if="table[''+week+day] && !change_keys.includes(''+week+day)">
                                    <div class="check-bg" @mouseenter="is_change= false">
                                        <el-checkbox :label="''+week+day" name="type"></el-checkbox>
                                    </div>
                                    <template v-for="(item) in table[''+week+day]">
                                        <p>{{item.kcmc}}</p>
                                        <p>{{item.zgxm}}</p>
                                    </template>
                                </template>
                                <template v-if="table[''+week+day] && change_keys.includes(''+week+day)">
                                    <div class="check-bg" @mouseenter="moveChecked(''+week+day)">
                                        <el-checkbox :label="''+week+day" name="type"></el-checkbox>
                                    </div>
                                    <template v-for="(item) in table[''+week+day]">
                                        <p>{{item.kcmc}}</p>
                                        <p>{{item.zgxm}}</p>
                                    </template>
                                </template>
                                <!--蓝色里面有 但是白色里面没有, 空的也要传递给后台-->
                                <template v-if="table[''+week+day] == undefined && change_keys.includes(''+week+day)">
                                    <div class="check-bg" @mouseenter="is_change= true">
                                        <el-checkbox :label="''+week+day" name="type"></el-checkbox>
                                    </div>
                                    <template v-for="(item) in change_table[''+week+day]">
                                        <p>{{item.kcmc}}</p>
                                        <p>{{item.zgxm}}</p>
                                        <!--<p>{{item.bh}}</p>-->
                                    </template>
                                </template>
                                <!--    <template v-if="table[''+week+day] && is_change && checked.includes(''+week+day)">
                                        <div class="check-bg">
                                            <el-checkbox :label="''+week+day" name="type"></el-checkbox>
                                        </div>
                                        <template v-for="(item) in table[''+week+day]">
                                            <p>{{item.kcmc}}</p>
                                            <p>{{item.zgxm}}</p>
                                        </template>
                                    </template>-->
                                <!--被改变的-->
                                <!--    <template v-if="change_table[''+week+day]">
                                        &lt;!&ndash; @mouseover.self native="moveChecked(''+week+day)"&ndash;&gt;
                                        <div class="check-bg" @mouseenter="moveChecked(''+week+day)">
                                            <el-checkbox :label="''+week+day" name="type"></el-checkbox>
                                        </div>
                                        <template v-for="(item) in change_table[''+week+day]">
                                            <p>ff{{item.kcmc}}</p>
                                            <p>ff{{item.zgxm}}</p>
                                        </template>
                                    </template>-->
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
                    <h3 class="table-title">当前选中 {{teacherName}} 教师课表</h3>
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
                                        <p>{{item.bjmc}}</p>
                                        <!--<p>{{item.zgxm}}</p>-->
                                    </template>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </el-checkbox-group>
                </div>
                <div>
                    <h3 class="table-title">可对调 {{className}} 教师课表</h3>
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
                                        <p>{{item.bjmc}}</p>
                                        <!--<p>{{item.zgxm}}</p>-->
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
                checked_nj:this.year + '级', //课程id
                checked_njmc:'',
                njOptions:[],
                checked_bjid:'', //教师id
                checked_bjmc:'',
                bjOptions:[],
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
            this.getBjOptions()
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
                this.is_change = false
            },
            changeBjid() {
                this.getBjmc()
                this.getTable()
                this.emptyTable()
            },
            moveChecked(id) { //蓝色块教师参考课表
                let data = this.table[id]
                // console.log(data)
                let jsid = [] //班级id
                let zgxm = []
                data.forEach((item,index) => {
                    jsid.push(item.zgh)
                    zgxm.push(item.zgxm)
                })

                let params = {
                    mark:'teacherInfo',
                    keys:jsid.join(',')
                }
                this.$POST('/timesheetTask/timeSheetView/',params).then((res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.classTable = res.data.sheet
                    }
                })
                this.className = zgxm.join(',')
                this.is_change = true
            },
            getTeacherTable(id) { //白色块教师参考课表
                let data = this.table[id]
                // console.log(data)
                let jsid = [] //班级id
                let zgxm = []
                data.forEach((item,index) => {
                    jsid.push(item.zgh)
                    zgxm.push(item.zgxm)
                })

                let params = {
                    mark:'teacherInfo',
                    keys:jsid.join(',')
                }

                this.$POST('/timesheetTask/timeSheetView/',params).then((res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.teacherTable = res.data.sheet
                    }
                })
                this.teacherName = zgxm.join(',')
            },
            changeChecked() {
                if (this.checked.length > 1) {
                    this.checked.shift();
                }

                if (this.checked.length > 0) {
                    //选中需要置换的
                    if (this.table_keys.includes(this.checked[0]) && !this.is_change) {
                        // console.log('选中的')
                        let params = {
                            time:this.checked[0],
                            data:this.table[this.checked[0]]
                        }

                        //调取教师选中的课表
                        this.getTeacherTable(this.checked[0])

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
                            // console.log(res)
                            Object.keys(res).forEach(item => {
                                this.change_keys.push(item)
                                // console.log(this.change_keys)
                            })

                            this.is_change = true
                        })
                    }
                    //确定要置换的
                    if (this.change_keys.includes(this.checked[0]) && this.is_change) {
                        // console.log('被选中的')
                        this.exchangetime = this.checked[0]
                        this.exchangedata = this.change_table[this.checked[0]]

                        let params = {
                            origintime:this.originTime,
                            origindata:this.originData,
                            exchangetime:this.exchangetime,
                            exchangedata:this.exchangedata
                        }
                        console.log(params)
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
                                this.is_change = false
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
            getNjmc() {
                //获取课程名称
                var index = this.njOptions.map(function (item) {
                    return item.kcid;
                }).indexOf(this.checked_nj);

                this.checked_njmc = this.njOptions[index].kcmc
            },
            getBjmc() {
                //获取教师姓名
                var index = this.bjOptions.map(function (item) {
                    return item.bjid;
                }).indexOf(this.checked_bjid);

                this.checked_bjmc = this.bjOptions[index].bjmc
            },
            getBjOptions() {
                this.$GET('/timesheetTask/getTaskBjids',{year:this.year}).then((res) => {
                    if (res.code == 200) {
                        this.bjOptions = res.data
                        if (this.bjOptions.length > 0) {
                            this.checked_bjid = this.bjOptions[0].bjid
                            this.getBjmc()
                            this.getTable()
                        }
                    }
                })
            },
            getTable() {
                let params = {
                    mark:'classInfo',
                    keys:this.checked_bjid
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
            changeNj() {
                this.getBjOptions()
                this.getNjmc()
                this.emptyTable()
            },
        }
    }
</script>

<style scoped lang="less">

</style>
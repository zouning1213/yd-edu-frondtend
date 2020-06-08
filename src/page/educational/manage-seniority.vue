<template>
    <!--校历管理  -->
    <div class="yd-educational-manage-seniority">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-school-calendar"></i></div>
                <h3>校历管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入学期名称" v-model="search"
                          @keyup.enter.native="searchForm"
                          class="input-with-select">
                    <el-button @click="searchForm" slot="append">搜索</el-button>
                </el-input>
                <el-button @click="addSeniority" type="primary" style="margin-left: 10px">添加校历</el-button>
            </el-col>
        </el-row>
        <div class="yd-bg common-pd yd-common-table yd-manage-seniority"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <!-- <div class="yd-add-btn" style="right:13px;top:5px" @click="addSeniority"></div> -->
            <el-table ref="multipleTable" :data="tableList" tooltip-effect="dark">
                <el-table-column prop="xlxq" label="学期名称" align="left">
                    <template slot-scope="scope">
                        <p>
                            <!--3 已完成的 之前的 , 2 代表当前校历的可编辑 , 1 未生效 以后的 , -->
                            <!--如果不需要颜色  不添加icon-skin 类名即可-->
                            <!--{{scope.row.xlzt}}-->
                            <i :class="['yd','icon-semester-o',scope.row.xlzt==2?'icon-skin':'']"></i>{{scope.row.xlxq}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="学期时间" align="center">
                    <template slot-scope="scope">
                        <p class="line-2" effect="light">
                            {{scope.row.qssj | filtersTime}}—{{scope.row.jssj | filtersTime}}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="editSeniority(scope.row)" class="edit-btn" type="text" size="small">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                        <!-- <el-button @click="editHour(scope.row)" class="manager-btn" type="text" size="small">
                            <i class="el-icon-edit"></i>设置课时
                        </el-button> -->
                        <el-button @click="setSeniority(scope.row.xlid)" class="edit-btn" type="text" size="small">
                            <i class="el-icon-edit"></i>设为当前校历
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--编辑校历-->
            <el-dialog v-if="dialogFormVisible" center width="800px"
                       :visible.sync="dialogFormVisible"
                       :close-on-click-modal='false'>
                <el-form :model="form.schoolCalendar" :rules="rules" ref="ruleForm" label-width="85px" :inline="true">
                    <el-row>
                        <el-col class="info-item-block" :span="20">
                            <el-form-item label="学期时间:" prop="value">
                                <el-date-picker
                                        unlink-panels
                                        v-model="form.schoolCalendar.value"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        format="yyyy年MM月dd日"
                                        @change='changeTerm(form.schoolCalendar.value)'
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row v-for="(val,index) in form.schoolTermEventsList" :key="index">
                        <el-col class="info-item-block" :span="8">
                            <el-form-item label="学期事件:">
                                <el-input v-model="val.sjmc" placeholder="请输入事件名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col class="info-item-block" :span="12">
                            <el-form-item label="事件日期:">
                                <el-date-picker
                                        v-model="val.value1"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        unlink-panels
                                        @change='changeTermTime(val.eventsId,val.value1)'
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="opera-btn" :span="4">
                            <span><i class="el-icon-delete" @click="deleteTerm(index)"></i></span>
                            <span><i class="el-icon-plus" @click="addTerm"></i></span>
                        </el-col>
                    </el-row> -->
                    <el-row>
                        <el-col class="info-item-block" :span="20">
                            <el-form-item label="学期备注:">
                                <el-input v-model="form.schoolCalendar.xqbz"
                                          type="textarea" rows="4"
                                          placeholder="请输入学期备注"
                                          class="texta"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer text-center">
                    <el-button @click="reactForm">取消</el-button>
                    <el-button type="primary" @click="submitForm">保存</el-button>
                </div>
            </el-dialog>
            <!--设置课时-->
            <el-dialog v-if="dialogHourVisible" center width="800px"
                       :visible.sync="dialogHourVisible"
                       :close-on-click-modal='false'>
                <el-form :model="hourForm" label-width="100px" class="el-col-23">
                    <el-form-item label="周课时">
                        <el-input-number v-model="hourForm.zks" @change="changeHour()" :min="0" :max="100"
                                         label="请输入周课时">
                        </el-input-number>
                    </el-form-item>
                    <el-form-item label="上课时间">
                        <el-row v-for="(item,index) in hourForm.commonWeeklyHours" :key="index"
                                :class="{'mb-20':hourForm.commonWeeklyHours.length > 1 && (index+1)
                                 < hourForm.commonWeeklyHours.length}">
                            <el-col :span="8">
                                <el-time-select
                                        v-model="item.kssj"
                                        :picker-options="{
                                    start: '06:30',
                                    step: '00:10',
                                    end: '21:30'}"
                                        :placeholder="'第'+(index+1)+'节课开始时间'">
                                </el-time-select>
                            </el-col>
                            <el-col :span="2" class="text-center">
                                <span>至</span>
                            </el-col>
                            <el-col :span="8">
                                <el-time-select
                                        v-model="item.jssj"
                                        :picker-options="{
                                    start: '06:30',
                                    step: '00:10',
                                    end: '21:30',
                                    minTime:item.kssj}"
                                        :placeholder="'第'+(index+1)+'节课结束时间'">
                                </el-time-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="自习课时间">
                        <el-row v-for="(item,index) in hourForm.selfStudyHours" :key="index"
                                :class="{'mb-20':hourForm.selfStudyHours.length > 1  && (index+1) <
                                hourForm.selfStudyHours.length}">
                            <el-col :span="8">
                                <el-time-select
                                        v-model="item.kssj"
                                        :picker-options="{
                                    start: '06:30',
                                    step: '00:10',
                                    end: '21:30'}"
                                        :placeholder="'第'+(index+1)+'节自习课开始时间'">
                                </el-time-select>
                            </el-col>
                            <el-col :span="2" class="text-center">
                                <span>至</span>
                            </el-col>
                            <el-col :span="8">
                                <el-time-select
                                        v-model="item.jssj"
                                        :picker-options="{
                                    start: '06:30',
                                    step: '00:10',
                                    end: '21:30',
                                    minTime:item.kssj}"
                                        :placeholder="'第'+(index+1)+'节自习课结束时间'">
                                </el-time-select>
                            </el-col>
                            <el-col :span="4" class="opera-btn">
                                <span v-show="hourForm.selfStudyHours.length >= 2" @click="deleteJC(index)">
                                    <i class="el-icon-delete"></i>
                                 </span>
                                <span @click="pushJC"> <i class="el-icon-plus"></i></span>
                            </el-col>
                            <el-col :span="2" class="text-center">第{{weeks[index]}}节</el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer text-center">
                    <el-button @click="reactHourForm">取消</el-button>
                    <el-button type="primary" @click="submitHourForm">保存</el-button>
                </div>
            </el-dialog>
            <ydPage ref="ydPage" :url="'/schoolCalendar/list'" :params="{condition:this.search}"
                    @changePage="changePage"></ydPage>
        </div>
    </div>
</template>

<script>
    import "../../page/educational/css/manageSeniority.less"

    export default {
        name:"manage-seniority",
        data() {
            return {
                search:'',
                tableList:[],
                dialogFormVisible:false,
                form:{
                    schoolCalendar:{
                        value:'',
                        jssj:'',
                        qssj:'',
                        xlxq:'',
                        xqbz:'',
                        xlid:''
                    },
                    schoolTermEventsList:[
                        {
                            value1:'',
                            eventsId:'',
                            xlid:'',
                            sjjssj:"",
                            sjmc:"",
                            sjqssj:""
                        }
                    ]
                },
                rules:{
                    value:[
                        {required:true,message:'请选择学期时间',trigger:'change'}
                    ],
                },
                newForm:{
                    schoolCalendar:{
                        value:'',
                        jssj:'',
                        qssj:'',
                        xlxq:'',
                        xqbz:'',
                        value:"",
                        xlid:''
                    },
                    schoolTermEventsList:[
                        {
                            eventsId:'',
                            xlid:'',
                            value1:'',
                            sjjssj:"",
                            sjmc:"",
                            sjqssj:""
                        }
                    ]
                },
                //课时设置
                dialogHourVisible:false,
                hourForm:{
                    zks:null,
                    schoolCalendar:{},
                    commonWeeklyHours:[
                        // {kssj:'',jssj:'',xlid:this.xlid}
                    ],
                    selfStudyHours:[
                        {kssj:'',jssj:'',xlid:this.xlid}
                    ]
                },
                jc_num:null,
                xq_num:5,
                xlid:null,
                weeks:['一','二','三','四','五','六','七','八','九','十'],
            }
        },
        methods:{
            /*----------------设置课时开始---------------*/
            editHour(row) {
                // console.log(row)
                this.xlid = row.xlid
                this.$GET('/schoolWeeklyHours/list/' + row.xlid).then((res) => {
                    console.log(res)
                    //当课时数等于0
                    if (res.data.schoolCalendar.zks == 0) {
                        this.hourForm.zks = 30
                        for (let i = 0; i < 3; i++) {
                            this.hourForm.commonWeeklyHours.push({
                                kssj:'',
                                jssj:'',
                                xlid:row.xlid,
                                kclx:1
                            })
                        }
                        this.jc_num = Math.ceil(this.hourForm.zks / this.xq_num);
                    }
                    else {
                        this.hourForm.zks = res.data.schoolCalendar.zks
                        this.hourForm.commonWeeklyHours = res.data.commonWeeklyHours
                        this.hourForm.selfStudyHours = res.data.selfStudyHours
                        this.jc_num = res.data.commonWeeklyHours.length;
                    }

                    //当自习课时为空
                    if (this.hourForm.selfStudyHours.length <= 0 || this.hourForm.selfStudyHours == undefined) {
                        this.hourForm.selfStudyHours = [{kssj:'',jssj:'',xlid:this.xlid}]
                    }
                    this.dialogHourVisible = true
                })
            },
            changeHour() {
                let new_jc_mum = Math.ceil(this.hourForm.zks / this.xq_num)
                if (new_jc_mum > this.jc_num) {  //新设置的大于当前的新增
                    for (let i = 0; i < new_jc_mum; i++) {
                        if (this.hourForm.commonWeeklyHours[i] == undefined) {
                            this.hourForm.commonWeeklyHours.push({
                                kssj:'',
                                jssj:'',
                                xlid:this.xlid,
                                kclx:1
                            })
                        }
                    }
                    this.jc_num = new_jc_mum;
                }
                else { //新设置的小雨当前的 删除.
                    let index = new_jc_mum;
                    let spLen = this.hourForm.commonWeeklyHours.length - index;
                    this.hourForm.commonWeeklyHours.splice(index,spLen);
                    this.jc_num = new_jc_mum;
                }
            },
            submitHourForm() {
                this.hourForm.schoolCalendar.zks = this.hourForm.zks
                this.$POST('/schoolWeeklyHours/save/' + this.xlid,this.hourForm,{
                    transformRequest:function (data) {
                        return JSON.stringify(data);
                    },
                    headers:{'Content-Type':'application/json'}
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'设置成功',
                            type:'success'
                        });
                        this.dialogHourVisible = false
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            reactHourForm() {
                this.dialogHourVisible = false
            },
            pushJC() {
                if (this.hourForm.selfStudyHours.length <= this.weeks.length) {
                    this.hourForm.selfStudyHours.push({
                        kssj:'',
                        jssj:'',
                        xlid:this.xlid,
                        kclx:2
                    })
                }
            },
            deleteJC(index) {
                this.$delete(this.hourForm.selfStudyHours,index,1)
            },
            /*----------------设置课时结束---------------*/
            //设为当前校历
            setSeniority(id) {
                this.$POST('/schoolCalendar/settingStatus',{xlid:id}).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'设置成功',
                            type:'success'
                        });
                        this.$refs.ydPage.getData();
                    }
                })
            },
            //分页数据
            changePage(res) {
                this.tableList = res
            },
            //提交
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //新增 
                        console.log(1)
                        if (this.form.schoolCalendar.xlid == '') { 
                            //没有id的时候添加校历
                            //循环拿到日期组件的值并赋值给 起始时间和截至时间
                            // this.form.schoolTermEventsList.forEach(function (val) {
                            //     val.sjjssj = val.value1[1];
                            //     val.sjqssj = val.value1[0];
                            //     delete val.value1        //删除json中的value
                            // }) 
                        console.log(2)
                            this.form.schoolCalendar.jssj = this.form.schoolCalendar.value[1]
                            this.form.schoolCalendar.qssj = this.form.schoolCalendar.value[0]
                            // delete this.form.schoolCalendar.value
                            let schoolCalendarJson = {};
                            schoolCalendarJson = this.form 
                        console.log(3)
                            this.$POST('/schoolCalendar/add',schoolCalendarJson,{
                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res) => {
                                    if (res.code == 500) {
                                        this.$message({
                                            message:res.message,
                                            type:'error'
                                        });
                                    } else {
                                        this.dialogFormVisible = false;
                                        this.$refs.ydPage.getData();
                                        this.$message({
                                            message:'添加成功',
                                            type:'success'
                                        });
                                    }
                                }
                            )
                        }
                        //编辑
                        else {
                            let sid = this.form.schoolCalendar.xlid

                            //循环数组将每个数组下的中的value赋值给同json下的起始时间和截至时间
                            // this.form.schoolTermEventsList.forEach(function (val) {
                            //     val.xlid = sid
                            //     val.sjjssj = val.value1[1];
                            //     val.sjqssj = val.value1[0];
                            //     delete val.value1
                            // })
                            delete this.form.schoolCalendar.value
                            delete this.form.schoolCalendar.createTime
                            delete this.form.schoolCalendar.createUser
                            delete this.form.schoolCalendar.updateTime
                            delete this.form.schoolCalendar.updateUser

                            //有id的时候修改校历
                            this.$POST('/schoolCalendar/update',this.form,{

                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res) => {
                                    this.dialogFormVisible = false;
                                    this.$refs.ydPage.getData();
                                    this.$message({
                                        message:'修改成功',
                                        type:'success'
                                    });
                                }
                            );
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //打开新增校历编辑框
            addSeniority() {
                this.dialogFormVisible = true;
                this.form = JSON.parse(JSON.stringify(this.newForm))
            },
            //点击编辑
            editSeniority(row) {
                if (row.xlzt == 3) {
                    this.$message.error('当前校历已使用,不能进行编辑');
                } else {
                    let startDate = new Date(row.qssj.replace(/-/g,"/"))
                    let nowDate = new Date()
                    let dateDiff = nowDate.getTime() - startDate.getTime();//时间差的毫秒数
                    let seven = 1209600000
                    if (dateDiff > seven) {
                        this.$message.error('当前校历开始时间已超过两周不能进行编辑');
                    } else {
                        this.dialogFormVisible = true;
                        this.form.schoolCalendar.xlid = row.xlid
                        let cid = row.xlid
                        this.$GET('/schoolCalendar/detail/' + cid).then((res) => {

                                let newtdate = [];   //创建一个临时存放时间的数组
                                this.form = res.data

                                newtdate.push(res.data.schoolCalendar.qssj)  //将起始时间添加进数组
                                newtdate.push(res.data.schoolCalendar.jssj)  //将截至时间添加进数组
                                //this.form.schoolCalendar.value = newtdate;   //将数组的值赋给时间插件的参数
                                this.$set(this.form.schoolCalendar,'value',newtdate)

                                //循环拿去学期事件里的时间，同理赋值并给每个json里添加一个新的属性
                                let that = this
                                // res.data.schoolTermEventsList.forEach(function (val) {
                                //     let datetime = [];
                                //     datetime.push(val.sjqssj)
                                //     datetime.push(val.sjjssj)
                                //     //val.value1 = datetime;
                                //     that.$set(val,'value1',datetime)
                                // })
                            }
                        )
                    }
                }

            },
            //搜索
            searchForm() {
                this.$GET('/schoolCalendar/list',{condition:this.search}).then(
                    (res) => {
                        this.tableList = res.data
                    }
                )
            },
            //添加学期事件
            addTerm() {
                let EventsList = {
                    eventsId:'',
                    xlid:'',
                    sjjssj:"",
                    sjmc:"",
                    sjqssj:""
                }
                this.form.schoolTermEventsList.push(EventsList)
            },
            //删除学期事件
            deleteTerm(index) {
                // console.log(index)
                this.form.schoolTermEventsList.splice(index,1);
            },
            //学期时间
            changeTerm(res) {
                this.form.schoolCalendar.jssj = res[1]
                this.form.schoolCalendar.qssj = res[0]
            },
            //学期事件时间
            changeTermTime(res,obj) {
                this.form.schoolTermEventsList.forEach(function (val) {
                    if (val.eventsId == 1) {
                        val.sjjssj = val[0]
                        val.sjqssj = val[1]
                    }

                })
            },
            //取消
            reactForm() {
                this.dialogFormVisible = false;
            },
        }
    }
</script>

<style lang="less">
    .yd-educational-manage-seniority {
        .el-range-editor--medium .el-range-separator {
            padding: 0 16px;
        }
    }

</style>

<template>
    <!--假日调课-->
    <div class="yd-educational-adjustment">
        <el-row class="yd-router-title yd-bg manage-student-scourse">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-classroom"></i></div>
                <h3>假日调课</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入调课名称搜索" v-model="condition" class="input-with-select text-right"
                          @keyup.enter.native="searchTale">
                    <el-button slot="append" @click="searchTale">搜索</el-button>
                </el-input>
                <el-button @click="addCollege" type="primary" style="margin-left: 10px">添加调课</el-button> 
            </el-col>
        </el-row>
        <div class="yd-bg common-pd yd-common-table pr"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <!-- <div class="yd-add-btn" style="right:13px;top:13px;" @click="addCollege"></div> -->
            
            <el-row class="yd-common-search">
                <!-- <div class="yd-add-btn" style="right:-10px;top:-10px" @click="dialogFormVisible = true"></div> -->
                <div class="fl">
                    <el-form :inline="true" :model="params">
                        <el-form-item label="请选择年份:">
                            <el-select v-model="xlid" placeholder="请选择年份" @change="nfChange"> 
                                <el-option v-for="(item,index) in xqOption"
                                           :key="index"
                                           :label="item.xlxq"
                                           :value="item.xlid"></el-option>
                            </el-select>
                        </el-form-item> 
                    </el-form>
                </div>
            </el-row>
            <el-table 
                    :data="tableData"
                    empty-text="暂无院系管理数据"
                    style="width: 100%"> 
                <el-table-column
                        prop="yxmc"
                        label="调课名称"
                        align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.holidayName||'-'}}</p>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="fjsj"
                        label="放假时间"
                        align="center"
                         >
                        <template slot-scope="scope">
                            <p>{{scope.row.startDate|cutOutDate}}~{{scope.row.endDate|cutOutDate}}</p>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="txsksj"
                        label="调休上课时间"
                        align="center"
                        width="370">
                        <template slot-scope="scope">
                            <p>
                                <!-- {{scope.row.exchangeLessonTime||'-'}} -->
                                {{getTkData(scope.row.timesheetTaskExchangeList)}}
                            </p>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="fjts"
                        label="放假天数"
                        align="center"
                        width="150">
                        <template slot-scope="scope">
                            <p>{{scope.row.days+'天'||'-'}}</p>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作"
                        width="200"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class="edit-btn" @click="editCollege(scope.row.holidayId)">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button type="text" class="del-btn" @click="deleteCollege(scope.row.holidayId)">
                            <i class="el-icon-delete"></i>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <yd-page ref="ydPage" url="/collegeInfo/list" :params="params" @changePage="changePage" :ispageSize='20'></yd-page> -->
        </div>
        <!--弹窗-->
        <el-dialog 
                :visible.sync="dialogVisible"
                :close-on-click-modal='false'
                v-if="dialogVisible"
                @close="motaiClose"
                width="630px">
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
                <el-row>
                    <el-col :span="20" >
                        <el-form-item label="假日名称：" prop="holidayName">
                            <el-input v-model="form.holidayName" placeholder="请输入假日名称"></el-input>
                        </el-form-item>
                        <el-form-item label="放假日期：" prop="fjrq"> 
                                <el-date-picker
                                    style="width:100%"
                                    v-model="form.fjrq"
                                    type="daterange"
                                    format="yyyy年MM月dd日"
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                        </el-form-item>
                    </el-col> 
                </el-row>
                <!-- <el-row> -->
                <el-row v-for="(item,index) in bklist" :key="index">
                        <el-col :span="11"> 
                            <el-form-item label="补课日期：" prop="bkrq"> 
                                    <el-date-picker
                                        style="width:100%"
                                        v-model="item.lessonSwitchDate"
                                        format="yyyy年MM月dd日"
                                        value-format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="选择补课日期">
                                    </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9"> 
                            <el-form-item label="补课课程：" prop="bkkc">
                                <!-- <el-input v-model="item.week" placeholder="请输入假日名称"></el-input> -->
                                <el-select v-model="item.week" placeholder="请选择周几"> 
                                    <el-option v-for="(item,index) in weekData"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col class="opera-btn" :span="4">
                            <span><i class="el-icon-delete" @click="deleteTerm(index)"></i></span>
                            <span><i class="el-icon-plus" @click="addTerm"></i></span>
                        </el-col>
                </el-row>
            </el-form>
            <div  class="clearfix">
                <div slot="footer" class="dialog-footer">
                    <el-button @click="motaiClose">取 消</el-button>
                    <el-button type="primary" @click="submitCollege">确 定</el-button>
                </div>
            </div>
            
        </el-dialog>
    </div>
</template>

<script> 
    export default {
        name:"arranging-holiday-adjustment", 
        data() {
            return { 
                params:{},
                condition:'',
                title:'新增院系',
                dialogVisible:false,
                tableData:[],
                form:{ 
                    holidayName:'',
                    fjrq:''
                },
                bklist:[
                    {
                        lessonSwitchDate:'',
                        week:''
                    }, 
                ],
                rules:{
                    holidayName:[
                        {required:true,message:'请输入假日名称',trigger:'change'}
                    ],
                    fjrq:[
                        {required:true,message:'请输入放假日期',trigger:'change'},
                        // {type:'number',message:'院系编码必需为数字'}
                    ],
                },
                xqOption:[],
                xlid:'',
                isholidayId:'',
                weekData:[
                    {
                        code:'1',
                        name:'周一' 
                    },
                    {
                        code:'2',
                        name:'周二' 
                    },
                    {
                        code:'3',
                        name:'周三' 
                    },
                    {
                        code:'4',
                        name:'周四' 
                    },
                    {
                        code:'5',
                        name:'周五' 
                    },
                ]
            }
        },
        created() {
            //获取当前考期
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.xqOption = res.data || [] 
                // console.log(this.xqOption)
                this.xqOption.forEach((item,index)=>{
                    if(item.xlzt == 2){
                        this.xlid = item.xlid
                    }
                })
                //获取当前考期下的data数据
                this.getTableData()
            })

        },
        methods:{
            //年份更改刷新数据
            nfChange(){
                this.getTableData()
            },
            //格式化调休调休上课时间
            getTkData(data){ let a = ''
                if(data){
                    data.forEach((item,index)=>{
                        a+=this.cutOutDate(item.lessonSwitchDate)+'('+this.getWeek(new Date(item.lessonSwitchDate))+')'+this.getDayByweek(item.week)+'课表、'
                    })
                } 
                return a
            },
            //获取tabledata
            getTableData(){
               this.$GET('/exchangeTask/list/'+this.xlid,{holidayName:this.condition}).then((res) => {
                    // console.log(res)
                    this.tableData = res.data
                }) 
            },
            //模态添加补课日期
            addTerm(){
                this.bklist.push({ 
                    lessonSwitchDate:'',
                    week:'' 
                })
            },
            //删除本条
            deleteTerm(index){
                this.bklist.splice(index,1)
            }, 
            //模态关闭
            motaiClose() {
               this.bklist = [
                    {
                        lessonSwitchDate:'',
                        week:''
                    }, 
                ]
                this.form.holidayName = ''
                this.form.fjrq = '' 
                this.isholidayId = '' 
                this.dialogVisible = false
            },
            changePage(data) {
                this.tableData = data
            },
            addCollege() {
                // this.title = '新增院系'
                this.form = { 
                    holidayName:'',
                    fjrq:''
                }
                this.dialogVisible = true
            },
            //点击编辑按钮
            editCollege(id) { 
                // this.title = '修改院系'
                this.$POST('/exchangeTask/info/'+id).then((res) => {
                    if (res.code == 200) { 
                        this.bklist = res.data.timesheetTaskExchangeList
                        this.form.holidayName = res.data.holidayName
                        this.form.fjrq = [res.data.startDate,res.data.endDate]
                        this.isholidayId = res.data.holidayId 
                    } else {
                        this.$message.error(res.message)
                    }
                })
                this.dialogVisible = true
            },
            //删除tabledata一条
            deleteCollege(id) {
                this.$confirm('此操作将删除该条调课名称,删除之后不可恢复, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$POST('/exchangeTask/del/'+id).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            // this.$refs.ydPage.getData()
                            this.getTableData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            //提交模态数据
            submitCollege() {
                // console.log(this.form)
                // console.log(this.bklist)
                let a = {
                    holidayName:this.form.holidayName,
                    termId:this.xlid,
                    startDate:this.form.fjrq[0],
                    endDate:this.form.fjrq[1],
                    timesheetTaskExchangeList:this.bklist
                } 
                this.$refs.ruleForm.validate((valid) => { 
                    if (valid) {
                        //新增
                        if (!this.isholidayId) { 
                            this.$POST('/exchangeTask/add',a,{
                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'新增成功'
                                    })
                                    // console.log(res)
                                    // this.$refs.ydPage.getData()
                                    
                                    this.getTableData()
                                    this.dialogVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            }) 
                        }
                        //编辑
                        else {
                            a.holidayId = this.isholidayId
                            this.$POST('/exchangeTask/edit',a,{
                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res) => {
                                if (res.code == 200) {
                                    // console.log(res)
                                    this.$message({
                                        type:'success',
                                        message:'编辑成功'
                                    })
                                    this.getTableData() 
                                    this.dialogVisible = false
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            //调课名称搜索
            searchTale() {
                this.condition
                this.getTableData()
            },
            //返回年月日格式
            cutOutDate(time){ 
                let date = new Date(time) 
                // return date.getFullYear() + "年" + fill(date.getMonth() + 1) + "月" + fill(date.getDate()) + "日" 
                return  date.getMonth() + 1 + "月" + date.getDate() + "日" 
                //填补0
                // function fill(num) {
                //     if (num < 10) {
                //         return "0" + num;
                //     } else {
                //         return num;
                //     }
                // }
            },
            //判断星期几
            getWeek(date) { 
                var week;
                if(date){
                    if(date.getDay() == 0) week = "星期日"
                    if(date.getDay() == 1) week = "星期一"
                    if(date.getDay() == 2) week = "星期二"
                    if(date.getDay() == 3) week = "星期三"
                    if(date.getDay() == 4) week = "星期四"
                    if(date.getDay() == 5) week = "星期五"
                    if(date.getDay() == 6) week = "星期六"
                }
                
                return week;
            },
            getDayByweek(isweek){
                var week;
                if(isweek){
                    if(isweek == '1') week = "周一"
                    if(isweek == '2') week = "周二"
                    if(isweek == '3') week = "周三"
                    if(isweek == '4') week = "周四"
                    if(isweek == '5') week = "周五"
                    if(isweek == '6') week = "周六"
                    if(isweek == '7') week = "周日"
                } 
                return week;
            }
        }
    }
</script>

<style scoped lang='less'>
.yd-educational-adjustment{
    .opera-btn {
        text-align: center;
        span {
            display: inline-block;
            width: 36px;
            height: 35px;
            border: 1px solid #DCDFE6;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            position: relative;
            top: 2px;
            &:first-child{
                margin-right:8px;
            }
            i {
                font-size: 18px;
                cursor: pointer;
                color: #C0C4CC; 
                line-height: 35px;
            }
        }
    }
}
    
</style>
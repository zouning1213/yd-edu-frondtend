<template>
    <div class="arranging-course-two">
        <div class="mb-20 arranging-tab-ul el-row">
            <el-col :span="16" class="text-center">
                <h3 style="font-size: 18px;font-weight: 550;line-height: 36px">
                    {{year}}级 第{{currentXq}}学期
                </h3>
            </el-col>
            <!--  <ul class="el-col-20">
                 &lt;!&ndash; <li v-for="item in 6" :key="item" @click="changeXQ(item)"
                      :class="{'active':currentXq == item}">第{{item}}学期
                  </li>&ndash;&gt;
              </ul>-->
            <el-col :span="8" class="text-right">
                <el-button type="warning" @click="setDefaultTeacher">一键设置默认教师</el-button>
                <el-button type="info" @click="removeTask">一键重置</el-button>
            </el-col>
        </div>
        <el-table
                :data="tableData"
                border
                :max-height="(this.$store.state.minClientHeight-320) + 'px'"
                :header-cell-style="{background:'rgba(243,245,247,1)'}"
                style="width: 100%">
            <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="60">
            </el-table-column>
            <!--    <el-table-column
                        label="学期"
                        prop="xq"
                        align="center"
                        width="60">
                </el-table-column>-->
            <el-table-column
                    label="任务号"
                    prop="rwh"
                    align="center">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="zymc"
                    label="专业名称"
                    :filters="zyOptions"
                    :filter-method="filterTag">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="kcmc"
                    label="课程名称"
                    :filters="kcOptions"
                    :filter-method="filterTagkc">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="kss"
                    width="70"
                    label="课时数">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="kcxz"
                    label="课程性质">
                <template slot-scope="scope">
                    <div v-if="scope.row.kcxz =='1'" class="text-red status1">理论</div>
                    <div v-if="scope.row.kcxz =='2'" class="text-blue status2">实训</div>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="bjmc"
                    label="班级名称">
                <template slot-scope="scope">
                    <p @click="openCommonDialog(scope.row,'classInfo')"
                       v-if="scope.row.bjmc == ''" class="text-red text-edit">点击选择</p>
                    <p @click="openCommonDialog(scope.row,'classInfo')" v-else class="text-edit">
                        {{scope.row.bjmc}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="zgxm"
                    label="教师名称">
                <template slot-scope="scope">
                    <p @click="openCommonDialog(scope.row,'teacherInfo')"
                       v-if="scope.row.zgxm == ''" class="text-red text-edit">点击选择</p>
                    <p @click="openCommonDialog(scope.row,'teacherInfo')"
                       v-else class="text-edit">{{scope.row.zgxm}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="jsmc"
                    label="教室名称">
                <template slot-scope="scope">
                    <p @click="openCommonDialog(scope.row,'classRoom')"
                       v-if="scope.row.jsmc == ''" class="text-blue text-edit">点击选择</p>
                    <p @click="openCommonDialog(scope.row,'classRoom')" v-else class="text-edit">
                        {{scope.row.jsmc}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="ksap"
                    label="手工固课">
                <template slot-scope="scope">
                    <el-button class="text-blue text-edit"
                               type="text"
                               :disabled="scope.row.kss == 0"
                               @click="openClassHour(scope.row,scope.$index)">
                        <span :class="['tip',scope.row.yxj == 1 ?'red':'']">操作提示</span>
                        点击选择
                    </el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column
                     align="center"
                     prop="ksz"
                     width="100"
                     label="开始周">
                 <template slot-scope="scope">
                     <input type="number" :disabled="scope.row.kss == 0" v-model="scope.row.ksz" placeholder="开始周"/>
                 </template>
             </el-table-column>-->
            <el-table-column
                    v-if="isNoWeek != 1"
                    align="center"
                    prop="zlsd"
                    label="教学周设定">
                <template slot-scope="scope">
                    <el-button class="text-blue text-edit"
                               type="text"
                               :disabled="scope.row.kss == 0"
                               @click="openCommonDialog(scope.row,'other')">
                         <span :class="['tip',scope.row.yxj == 2 ? 'green' : scope.row.yxj== 3 ?'yellow' :'']">
                            操作提示
                     </span>
                        点击选择
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    align="left"
                    prop="jxfs"
                    width="146"
                    label="教学方式">
                <template slot-scope="scope">
                    <!--理论课选择-->
                    <div v-if="scope.row.kcxz=='1'" class="radio-mb">
                        <el-radio-group v-model="scope.row.jxfs"
                                        @change="changeJxfs(scope.row,'classInfo')">
                            <el-radio v-for="(item,index) in l_jxfsOption"
                                      :key="index"
                                      :label="item.code">{{item.name}}
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <!--实践课选择-->
                    <div v-else>
                        <el-radio-group v-model="scope.row.jxfs"
                                        @change="changeJxfs(scope.row,'classRoom')">
                            <el-radio v-for="(item,index) in S_jxfsOption"
                                      :key="index"
                                      :label="item.code">{{item.name}}
                            </el-radio>
                        </el-radio-group>
                    </div>
                </template>
            </el-table-column>
            <!--   <el-table-column
                       align="center"
                       prop="yxj"
                       width="70"
                       label="优先级">
               </el-table-column>-->
        </el-table>
        <!--选择教师 选择教室 选择班级 教学周设定-->
        <el-dialog
                :title="dialogTitle"
                center
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
                :visible.sync="dialogVisible"
                width="860px"
                v-if="dialogVisible"
                custom-class="dialog-body-auto">
            <teacher-dialog v-if="dialogType =='teacherInfo'" ref="teacherInfo"
                            :min="teacher_min"
                            :row="dialogRow"
                            v-on:getTeacherData="getCommonDialog"></teacher-dialog>
            <class-room-dialog v-if="dialogType=='classRoom'" ref="classRoom"
                               :min="classRoom_min"
                               :row="dialogRow"
                               :is_recommend="is_recommend"
                               v-on:getClassRoomData="getCommonDialog"></class-room-dialog>
            <class-info-dialog v-if="dialogType=='classInfo'" ref="classInfo"
                               :row="dialogRow"
                               :min="classInfo_min"
                               v-on:getClassInfoData="getCommonDialog"></class-info-dialog>
            <week-dialog v-if="dialogType == 'other'" ref="orderWeek"
                         :row="dialogRow"
                         v-on:getWeekData="getCommonDialog"></week-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelData">取 消</el-button>
                <el-button type="primary" @click="submitData">确 定</el-button>
            </div>
        </el-dialog>
        <!--选择课时-->
        <el-dialog title=""
                   center
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :show-close="false"
                   :visible.sync="dialogClassHour"
                   :width="isNoWeek != 1 ? '1080px' : '860px'"
                   custom-class="dialog-body-auto dialog-course-header">
            <class-hour-dialog v-if="dialogClassHour" :row="classHourRow" ref="classHour"
                               v-on:getClassHour="getClassHour"></class-hour-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogClassHour = false">取 消</el-button>
                <el-button type="primary" @click="submitClassHour">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import teacherDialog from '../arranging/check-teacher-dialog'
    import classRoomDialog from './check-classRoom-dialog'
    import classInfoDialog from '../arranging/check-classInfo-dialog'
    import weekDialog from '../arranging/check-week-dialog'
    import classHourDialog from '../arranging/check-classHour-dialog'

    export default {
        name:"arranging-course-fourth",
        components:{
            teacherDialog,
            classRoomDialog,
            classInfoDialog,
            weekDialog,
            classHourDialog
        },
        //设置优先级 手工固课  优先级为1  连续周2  区间周3  三班合并9  其余 99
        data() {
            return {
                currentXq:this.$route.params.xq,
                year:this.$route.params.year,
                isNoWeek:this.$route.params.isNoWeek,
                dialogVisible:false,
                dialogType:'teacherInfo', //打开弹窗的类型
                dialogTitle:'选择教师',
                dialogData:{}, //传递给弹窗的数据
                dialogRow:{}, //行数据
                teacher_min:null, //考试需要的最小数量
                classRoom_min:null, //教室最小的数量
                classInfo_min:null, //班级的最小数量
                tableData:[],
                l_jxfsOption:[],
                S_jxfsOption:[],
                dialogClassHour:false,//课时
                classHourRow:{},
                is_recommend:false, //是否走推荐
                zyOptions:[],
                kcOptions:[]
            }
        },
        created() {
            this.$GET('/system/dictList/LLFZJX').then((res) => {
                this.l_jxfsOption = res
            })
            this.$GET('/system/dictList/SXFZJX').then((res) => {
                this.S_jxfsOption = res
            })
            this.getDate()
        },
        methods:{
            filterTag(value,row) {
                return row.zymc === value;
            },
            filterTagkc(value,row) {
                return row.kcmc === value;
            },
            //深度去重
            unique(a) {
                var arr = [];
                for (var i = 0; i < a.length; i++) {
                    if (i == 0) arr.push(a[i]);
                    var b = false;
                    if (arr.length > 0 && i > 0) {
                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j].value == a[i].value) {
                                b = true;
                                //break;
                            }
                        }
                        if (!b) {
                            arr.push(a[i]);
                        }
                    }
                }
                return arr
            },
            changeXQ(xq) {
                this.currentXq = xq
                this.getDate()
            },
            //选定课时开始
            openClassHour(row) {
                this.classHourRow = row
                // console.log(row)
                this.dialogClassHour = true
            },
            submitClassHour() {
                this.$refs.classHour.sendData()
            },
            getClassHour(row) {
                this.$POST('/timesheetTask/validAndSaveTask/other',row,
                    {
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }
                ).then((res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.$message({
                            message:'保存成功',
                            type:'success'
                        });
                        this.getDate()
                        this.dialogClassHour = false
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            //选定课时结束
            getDate() {
                this.$GET('/timesheetTask/listTeachingTask/' + this.year + '/' + this.currentXq).then((res) => {
                    res.data.forEach((item,index) => {
                        if (typeof(item.jxfs) == "number") { //数字转字符串格式
                            item.jxfs = item.jxfs.toString()
                        }
                    })
                    this.tableData = res.data
                    let zymc = []
                    let kcmc = []
                    res.data.forEach((item,index) => {
                        zymc.push({
                            text:item.zymc,
                            value:item.zymc
                        })
                        kcmc.push({
                            text:item.kcmc,
                            value:item.kcmc
                        })
                    })
                    // console.log("qwerqr")
                    // console.log(zymc)  
                    this.zyOptions = this.unique(zymc)
                    this.kcOptions = this.unique(kcmc)

                })
            },
            //计算最小
            setMinimum(kcxz,jxfs) { //课程性质跟 教学方式 必传
                if (kcxz == '1') {//理论 //1 正常 2 2班合并教学 3 3班合并
                    this.classInfo_min = jxfs == '1'? 1 :jxfs == '2'? 2 :3
                    this.teacher_min = 1
                    this.classRoom_min = 1
                }
                else if (kcxz == '2') {
                    this.classRoom_min = jxfs == '1'? 1 :2 //1 正常 //2分组
                    this.teacher_min = 1
                    this.classInfo_min = 1
                }
            },
            submitData() {
                if (this.dialogType == 'teacherInfo') {
                    this.$refs.teacherInfo.sendData()
                } else if (this.dialogType == 'classInfo') {
                    this.$refs.classInfo.sendData()
                } else if (this.dialogType == 'classRoom') {
                    this.$refs.classRoom.sendData()
                } else if (this.dialogType == 'other') {
                    this.$refs.orderWeek.sendData()
                }
            },
            cancelData() {
                this.getDate()
                this.dialogVisible = false
            },
            //打开弹窗
            openCommonDialog(row,type) {
                this.setCommonDialog(row,type)
            },
            //接收弹窗传递参数
            getCommonDialog(row) {
                this.saveCommonData(this.dialogType,row)
            },
            //保存弹窗参数到数据库
            saveCommonData(type,row) {
                this.$POST('/timesheetTask/validAndSaveTask/' + type,row,
                    {
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }
                ).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'保存成功',
                            type:'success'
                        });
                        this.getDate()
                        this.dialogVisible = false
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            //设置弹窗参数
            setCommonDialog(row,type) {
                // console.log(row)
                this.setMinimum(row.kcxz,row.jxfs)
                this.dialogType = type
                this.dialogRow = row
                this.is_recommend = false //是否推荐
                if (type == 'other') { //等于指定调节
                    this.dialogTitle = row.kcmc + '(' + row.kss + '课时)'
                } else {
                    this.dialogTitle = type == 'teacherInfo'? '选择教师' :type == 'classInfo'? '选择班级' :'选择教室'
                }
                this.dialogVisible = true
            },
            //改变教学方式
            changeJxfs(row,type) {
                //实训课 理论课 等于1 的时候把当前优先级设置为99
                if (row.jxfs == '1') {
                    row.yxj = 99
                }
                //单独走
                if (type == 'classInfo' && row.jxfs != '1') {  //理论课  非正常
                    this.setCommonDialog(row,type)
                } else if (type == 'classInfo' && row.jxfs == '1') {
                    this.saveCommonData(type,row)
                } else if (type == 'classRoom') { //实训课 非正常
                    this.setCommonDialog(row,type)
                    this.is_recommend = true //是否推荐
                }
            },
            //教室 教师 班级 end
            setDefaultTeacher() {
                this.$POST('/timesheetTask/autoRecommendTeacherInfo',this.tableData,
                    {
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{"Content-Type":"application/json"}
                    }).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'设置成功',
                            type:'success'
                        });
                        this.getDate()
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            removeTask() {
                this.$confirm('重置之后教学调度将会清空，清空之后不可恢复,是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/timesheetTask/resetTimesheetTask/' + this.year + '/' + this.currentXq).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'重置成功'
                            })
                            this.getDate()
                        }
                    })
                })

            },
            //发送给父组件
            sendFrom() {
                this.$emit('receivecourseTwo',this.tableData)
            }
        },
    }
</script>

<style>

</style>

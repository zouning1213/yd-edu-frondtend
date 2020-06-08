<template>
    <!--所有成绩管理--> 
    <div class="yd-educational-grade">
        <el-row class="yd-router-title yd-bg manage-student-scourse   bd-1">
            <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
            <h3>成绩查询</h3>
        </el-row>  
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd yd-common-table yd-students-course"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-table
                    border
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%" >
                <el-table-column
                        align="center"
                        label="序号"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column  prop="kcmc" label="课程" align="center"  >
                    <template slot-scope="scope">
                        <p>{{scope.row.kcmc||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="bjmc" label="班级" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.bjmc||'-'}}</p>
                    </template>
                </el-table-column>
                <el-table-column  prop="xsrs" label="人数" align="center">
                    <template slot-scope="scope">
                        {{scope.row.xsrs=='0'?0:scope.row.xsrs?scope.row.xsrs:'-'}}
                    </template>
                </el-table-column>
                <el-table-column   label="操作" align="center"   class-name="no-print" >
                    <template slot-scope="scope">
                        <el-button class="edit-btn" @click="handleClick(scope.row)" type="text" size="small">
                            <i class="el-icon-document"></i>查询
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
           
        <!--详情弹窗-->
        <el-dialog title="" v-if='dialogVisible'
                   :visible.sync="dialogVisible" width="65%"
                   :close-on-click-modal='false'
                   @close= motaiClose>
            <div>
                <el-row class="motai-search-wrap">
                    <el-col :span="4">
                        <span>选择学期：</span> 
                    </el-col>
                    <el-col :span="20">  
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox class="ckecked-item" v-for="(item,index) in xqOptions" :label="item.xlid" :key="index">{{item.xlxq}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row class="motai-search-wrap">
                    <el-col :span="4">
                        <span>选择考试：</span> 
                    </el-col>
                    <el-col :span="20">  
                        <el-checkbox-group v-model="kscheckedCities" @change="kshandleCheckedCitiesChange">
                            <el-checkbox class="ckecked-item" v-for="(item,index) in ksOptions" :label="item.ksapid" :key="index">{{item.ksapmc}}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
            </div>   
                 <el-table 
                        max-height="500px"
                        border 
                        :data="motaitableData"
                        tooltip-effect="dark"
                        style="width: 100%" > 
                    <el-table-column  type="index" label="序号" align="center" width="50" > 
                    </el-table-column>
                    <el-table-column  prop="xh" label="学号" align="center"  >
                        <template slot-scope="scope">
                            <p>{{scope.row.xh||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="xm" label="姓名" align="center" >
                        <template slot-scope="scope">
                            <p>{{scope.row.xm||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(item,index) in tableHeader" :key="index" :prop="item.id" :label="item.name" align="center">
                        <template slot-scope="scope"> 
                            <p> {{scope.row[item.id]=='0'?scope.row[item.id]:scope.row[item.id]==''?'-':scope.row[item.id]}}</p>
                        </template>
                    </el-table-column>    
                </el-table>
        </el-dialog>
    </div> 
</template>

<script>
    import ydSelectDialogTree from "../../components-page/select/yd-tree-ksid-dialog"
    import gradeChild from "../../components-page/common/score-management"
    import "../css/manageGrade.less"

    let jsid = JSON.parse(localStorage.getItem("user")).jsid 
    export default {
        components:{
            gradeChild,
            ydSelectDialogTree
        },
        name:"grade-achievements",
        data() {
            return {
                radio:'1',
                form:{
                    //
                    xlid:'',   
                    zyid:'',
                    bjid:'',
                    kcid:'',  
                },   
                classOptions:[],  
                motaitableData:[],

                //  
                tableData:[], 
                tableHeader:[],
                dialogVisible:false, 
                motaiform:[],

                // 
                //多选框添加 
                checkedCities: [],  
                xqOptions:[],

                ksOptions:[],
                kscheckedCities:[],

                isDetailData:{}
            }
        },
        methods:{   


            //专业查课程下拉框
            courseList(a) { 
                //初始化班级
                this.$GET('/classInfo/classInfoSelect',{zyid:a}).then((res) => { 
                    this.classOptions = res.data
                })
            },  
            //专业查课程下拉框
            courseList(a) { 
                //初始化班级
                this.$GET('/classInfo/classInfoSelect',{zyid:a}).then((res) => { 
                    this.classOptions = res.data
                })
            },

 
            //打印
            printData() {
                this.$print(this.$refs.multipleTable) // 使用
            },   
            printDataAll(){
                let allCs = this.$props.form
                allCs.url = this.url
                allCs.radio = this. $props.radio
                allCs.limit = 9999 
                let routeData = this.$router.resolve({
                    path:"/manage/educational/manage-grade/pointAll",
                    query:allCs
                });
                window.open(routeData.href,'_blank'); 
            }, 
            //模态框出详情
            handleClick(row) { 
                //考试查询下面学生列表
                this.isDetailData = row 
                this.dialogVisible = true
                
            }, 
            //学期的单选 
            handleCheckedCitiesChange(value) { 
                if(this.checkedCities.length>1){
                    this.checkedCities.shift(this.checkedCities[0])
                } 
                
                this.motaitableData = []
                this.tableHeader = []
                //学期查询考试 
                this.$GET("/examArrange/selectlist/teachersearch",{xlid:this.checkedCities.join(','),bjid:this.isDetailData.bjid,kcid:this.isDetailData.kcid}).then((res)=>{ 
                    this.ksOptions = res.data
                })
            }, 
            kshandleCheckedCitiesChange(value){
                if(this.kscheckedCities.length>1){ 
                } 
                let a = {
                    kcid:this.isDetailData.kcid,
                    bjid:this.isDetailData.bjid,
                    ksapids:this.kscheckedCities.join(','), 
                } 
                this.$POST("/studentExamScore/lessonSearch",a).then((res)=>{ 
                    this.motaitableData = res.data.tableBody
                    this.tableHeader = res.data.tableHeader 
                })  
            },
            motaiClose(){
                 this.motaitableData = []
                 this.tableHeader =[]
                 this.checkedCities = []
                 this.kscheckedCities = []
            }
        },
        created() {
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => { 
                this.xqOptions = res.data 
            }) 
            
            //查询table数据
            this.$GET('/teacherLesson/noPagelistByTeacherId',{jsid:jsid}).then((res) => {   
                this.tableData = res.data||[]  
                
            })

        }
    }
</script>

<style lang='less' scoped>
.motai-search-wrap{
    border:1px solid #ccc;
    padding: 10px 20px;
}
.ckecked-item{
    margin-bottom: 5px;
}
</style>
<template>
    <!--成绩管理-->
    <div class="yd-educational-grade">
        <el-row class="yd-router-title yd-bg manage-student-scourse mb-0 bd-1">
            <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
            <h3>成绩查询</h3>
        </el-row>
        
        <slot name="searchwrap"></slot>

        <!-- 中间 主体  -->
        <div class="yd-bg common-pd">
            
            <!-- 选课的表格 -->
            <div class="yd-common-table yd-students-course">
                <el-table 
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%" >
                    <el-table-column key='1' label="学期" align="center">
                        <template slot-scope="scope"> 
                            {{ scope.row.xqmc }}
                        </template>
                    </el-table-column> 
                    <el-table-column key='2' prop="kcmc" label="课程" align="center"  v-if="radio!='2'">
                    </el-table-column>
                    <el-table-column key='3' prop="skls" label="任课教师" align="center" v-if="radio!='2'">
                    </el-table-column>
                    <el-table-column key='4' prop="bjmc" label="班级" align="center">
                    </el-table-column>
                    <el-table-column key='5' prop="bzr" label="班主任" align="center">
                    </el-table-column>
                    <el-table-column key='6' prop="xm" label="学生" align="center">
                    </el-table-column>
                    <el-table-column key='7' prop="xh" label="学号" align="center">
                    </el-table-column> 
                    <!-- <el-table-column key='8' prop="kslb" label="考试类型--考期" align="center">
                    </el-table-column> -->
                    <el-table-column key='9' prop="pscj" label="平时成绩" align="center" v-if="radio!='2'">
                    </el-table-column>
                    <el-table-column key='10' prop="kscj" label="考试成绩" align="center" v-if="radio!='2'">
                    </el-table-column>
                    <el-table-column key='11' prop="zhcj" label="综合成绩" align="center" v-if="radio!='2'">
                    </el-table-column> 
                    <el-table-column key='12' prop="zhcj" label="总分" align="center" v-if="radio=='2'">
                    </el-table-column>
                    <el-table-column key='13' prop="zhpm" label="排名" align="center">
                    </el-table-column>
                    <!-- v-if="radio=='2'" -->
                    <el-table-column key='14' label="操作" align="center"   class-name="no-print" v-if="radio=='2'">
                        <template slot-scope="scope">
                            <el-button class="edit-btn" @click="handleClick(scope.row.xh)" type="text" size="small">
                                <i class="el-icon-document"></i>详情
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="download-wrap">
                    <div class="download"  @click="show = !show">
                        <i class="yd icon-download"></i>
                    </div>
                    <div style=" margin-top: 20px; height: 100px;">
                        <el-collapse-transition>
                            <div v-show="show">
                                <div  class="transition-box" @click="printData">下载当前</div> 
                                <div  class="transition-box" @click="printDataAll">下载全部</div>
                            </div>
                            
                         </el-collapse-transition>
                    </div>
                </div>
                
            </div>
        </div>
        
        <yd-page v-if="isShowPage" ref="ydPage"  :url="url" :params="form"  @changePage="changePage"></yd-page>
            

        <!--详情弹窗-->
        <el-dialog title="" v-if='dialogVisible'
                   :visible.sync="dialogVisible" width="720px"
                   :close-on-click-modal='false'>
            <isdetails :tableDataList="this.tableDataList" :form="this.form" @changeDialog="changeDialog"></isdetails>
        </el-dialog>
    </div>
</template>

<script>
    import isdetails from "../../page/educational/manage-grade-details"

    export default {
        components:{
            isdetails,
        },
        props:{
            radio:{
                default:'1'
            },
            form:{
                default:{}
            }
        },
        name:"manage-grade-course",
        data() {
            return {
                show: false,
                isShowPage:true,
                //新加的搜索条件
                kq:'',  
                bh:'',
                kch:'', 
                zyh:'',
                dialogVisible:false,
                ksh:[],
                form1:'', 
                url:'/studentExamScore/eduScoreList',
                // form:{
                //     xlid:'',
                //     kq:'',
                //     xj:'',
                //     cjqj:'',
                //     zyh:'',
                //     bh:'',
                //     kch:'',
                //     xm:'',
                //     xh:'',  
                // },  
                search:'',  
                tableData:[], 
                tableDataList:[]
            }
        },
        methods:{
            //打印
            printData() {
                this.$print(this.$refs.multipleTable) // 使用
            },   
            printDataAll(){
                let allCs = this.$props.form
                allCs.url = this.url
                allCs.radio = this. $props.radio
                allCs.limit = 9999
                // console.log(allCs)
                let routeData = this.$router.resolve({
                    path:"/manage/educational/manage-grade/pointAll",
                    query:allCs
                });
                window.open(routeData.href,'_blank');

                // window.open( '/manage/educational/manage-grade/pointAll?allCs='+allCs,'_blank') 
            },
            //分页调用
            changePage(data) {
                this.tableData = data
            },
            //模态框出详情
            handleClick(xh) { 
                this.form1 = this.form
                this.form1.xh = xh
                this.form1.limit=10
                this.form1.page=1
                 if(this.form.xlid==''){
                    this.$message.error('查询个人详情成绩时学期为必选内容');
                }else if(this.form1.xlid==''||this.form.xlid==''){
                    this.$message.error('查询总分时学期为必选内容');
                }else{
                    // console.log("chu模态")
                    // console.log(this.form1)
                    this.$GET('/studentExamScore/eduScoreList', this.form1).then((res) => { 
                        this.tableDataList = res.data || []
                    })
                    this.dialogVisible = true
                }
                
            },
            //
            changeDialog(){
                this.dialogVisible =false
            },
            //通过条件查询
            selectby(form) {
                this.$refs.ydPage.getData("search")
            },  
        },
        created() {  
        }, 
        beforeUpdate(){
            this.$nextTick(()=>{ this.$refs.multipleTable.doLayout()})
        },
        watch:{
            radio(newV,oldV){
                this.isShowPage =false
                // console.log(newV)
                if(newV=='1'){
                    this.url = '/studentExamScore/eduScoreList'
                }else if(newV=='2'){
                    this.url = '/studentExamScore/eduFullScoreList'
                }else{
                    this.url = '/studentExamScore/eduScoreList'
                }
                // console.log(this.url)
                // this.$refs.ydPage.getData("search")
                this.$nextTick(()=>{
                    this.isShowPage = true
                })
            }
        }
    }
</script>

<style lang='less'>

</style>
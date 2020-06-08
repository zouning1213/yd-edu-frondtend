<template>
    <!--成绩管理--> 
    <div class="yd-educational-grade">
        <div class="yd-bg common-pd yd-common-table"
            :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <div class="yd-common-table yd-students-course">
                <el-table 
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%" >
                    <el-table-column key='1' label="考试名称" align="center">
                        <template slot-scope="scope"> 
                            {{ scope.row.ksapmc }}
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
                    <el-table-column key='7' prop="xh" label="学号" align="center">
                    </el-table-column> 
                    <el-table-column key='6' prop="xm" label="姓名" align="center">
                    </el-table-column>
                    <!-- <el-table-column key='8' prop="kslb" label="考试类型--考期" align="center">
                    </el-table-column> -->
                    <!-- <el-table-column key='9' prop="pscj" label="平时成绩" align="center" v-if="radio!='2'">
                    </el-table-column>
                    <el-table-column key='10' prop="kscj" label="考试成绩" align="center" v-if="radio!='2'">
                    </el-table-column> -->
                    <el-table-column key='11' prop="zhcj" label="成绩" align="center" v-if="radio!='2'">
                    </el-table-column> 
                    <el-table-column key='12' prop="zhcj" label="总分" align="center" v-if="radio=='2'">
                    </el-table-column>
                    <!-- <el-table-column key='13' prop="zhpm" label="排名" align="center">
                    </el-table-column> -->
                    <!-- v-if="radio=='2'" --> 

                </el-table>
                <div class="download-wrap">
                    <div class="download"  @click="printData">
                        <i class="yd icon-download"></i> 
                    </div> 
                </div>
            </div>
            </div> 
        
        <yd-page ref="ydPage"  :url="url" :params="form" :ispageSize='9999'  @changePage="changePage"></yd-page>
            
 
    </div>
</template>

<script> 

    import "../../page/css/manageGrade.less"
    export default {  
        name:"manage-grade-course-pointAll",
        data() {
            return {
                radio:1,  
                //新加的搜索条件
                kq:'',  
                bh:'',
                kch:'', 
                zyh:'',
                dialogVisible:false,  
                url:'/studentExamScore/eduScoreList',   
                form:{
                    limit:9999
                },

                tableData:[],  
                allCs:[]
            }
        },
        methods:{
            //打印
            printData() {
                this.$print(this.$refs.multipleTable) // 使用
            },   
            //分页调用
            changePage(data) {
                this.tableData = data
            },  
        }, 
        created(){
            let  a = this.$route.query
            this.url = a.url
            this.radio = a.radio 

            delete a.url
            delete a.radio
            // console.log(a)

            this.form = a
            // console.log(this.url)
            // console.log(this.radio)

        },
    }
</script>

<style lang='less'>

</style>
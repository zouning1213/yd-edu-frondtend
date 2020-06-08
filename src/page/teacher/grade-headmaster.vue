<template>
<!-- 辅导员成绩查询 -->
    <div>
        <gradeChild :radio='radio' ref="isgradechild" :form="form">
            <!-- 父亲组件 -->
            <el-row slot="searchwrap" class="yd-router-title yd-bg manage-student-scourse mt-0">
                <el-row class="yd-common-search display_flex">
                    <div class="fl  flex_1">
                        <el-form :inline="true" :model="form">
                            <el-form-item label="学期:">
                                <el-select class="" v-model="form.xlid" placeholder="请选择">
                                    <el-option label="所有学期" value=""></el-option> 
                                        <el-option
                                                v-for="item in SemesterOptions"
                                                :key="item.xlid"
                                                :label="item.xlxq"
                                                :value="item.xlid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="考期:">
                                    <el-select class="" v-model="form.kq" placeholder="请选择" @change="courseList">
                                        <el-option label="所有考期" value=""></el-option>
                                        <el-option
                                                v-for="item in kqOptions"
                                                :key="item.kq"
                                                :label="item.kqmc"
                                                :value="item.kq">
                                        </el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item label="届数:">
                                    <el-select class="" v-model="form.xj" placeholder="请选择">
                                        <el-option label="所有届数" value=""></el-option>
                                        <el-option
                                                v-for="item in cjqjOptions"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="分数段:">
                                    <el-select class="" v-model="form.cjqj" placeholder="请选择">
                                        <el-option label="分数段" value=""></el-option>
                                        <!-- <el-option
                                                v-for="item in classOptions"
                                                :key="item.bjid"
                                                :label="item.bjmc"
                                                :value="item.bjid">
                                        </el-option> --> 
                                        <el-option label="0分-60分" value="0"></el-option>
                                        <el-option label="60分-80分" value="1"></el-option>
                                        <el-option label="80分-100分" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="查询:"> 
                                    <div class="isradio">
                                        <!-- <el-radio  v-model="radio" label="0">什么都不选</el-radio> -->
                                        <el-radio  v-model="radio" label="1">单科-班级</el-radio>
                                        <el-radio  v-model="radio" label="2">总分-课程</el-radio>
                                    </div>
                                </el-form-item>
                                <el-form-item label="专业:"  >
                                    <el-select  v-model="form.zyid" placeholder="请选择" @change="courseList">
                                        <el-option label="所有专业" value=""></el-option>
                                        <el-option
                                                v-for="item in majorOptions"
                                                :key="item.zyid"
                                                :label="item.zymc"
                                                :value="item.zyid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="班级:"  >
                                    <el-select class="" v-model="form.bjid" placeholder="请选择">
                                        <el-option label="所有班级" value=""></el-option>
                                        <el-option
                                                v-for="item in classOptions"
                                                :key="item.bjid"
                                                :label="item.bjmc"
                                                :value="item.bjid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="教研组:"  >
                                    <yd-select-dialog-tree 
                                            @changeKsId="changeKsId">
                                    </yd-select-dialog-tree>
                                </el-form-item> 
                                <el-form-item label="课程:" >
                                    <el-select class="" v-model="form.kch" placeholder="请选择">
                                        <el-option label="所有课程" value=""></el-option>
                                        <el-option
                                                v-for="item in courseOptions"
                                                :key="item.kch"
                                                :label="item.kcmc"
                                                :value="item.kch">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="姓名:"> 
                                    <el-input placeholder="请输入姓名" v-model="form.xm"></el-input>
                                </el-form-item>
                                <el-form-item label="学号:"> 
                                    <el-input placeholder="请输入学号" v-model="form.xsid"></el-input> 
                                </el-form-item>
                            </el-form>
                            <div class="ml-44">
                                <el-button type="info" @click="reset">重置</el-button>
                                <el-button type="primary" @click="selectby">确定</el-button> 
                            </div>    
                    </div>
                </el-row>
            </el-row>
        </gradeChild>   
    </div>
</template>

<script>
    import ydSelectDialogTree from "../../components-page/select/yd-tree-ksid-dialog"
    import gradeChild from "../../components-page/common/score-management"

    export default {
        name:"grade-headmaster",
        components:{
            gradeChild,
            ydSelectDialogTree
        },
        data() {
            return {
                radio:'1',
                form:{
                    //
                        // jsid:this.$store.state.userInfo.jsid,
                        xlid:'',
                        // kq:'',
                        xj:'',
                        cjqj:'',
                        zyid:'',
                        bjid:'',
                        kch:'',
                        xm:'',
                        xsid:'', 
                },
                SemesterOptions:[],
                majorOptions:[],
                courseOptions:[],
                classOptions:[],
                cjqjOptions:[],
                kqOptions:[]
            }
        },
        methods:{
            changeKsId(ksid){
                // console.log(ksid)
                //根据ksid查询课程下拉框
                this.$GET("/lessonInfo/lessonInfoByksid",{ksid:ksid}).then((res)=>{
                    this.courseOptions = res.data
                })
            },
            //重置
            reset() {
                this.form.xlid = ''
                // this.form.kq = ''
                this.form.xj = ''
                this.form.cjqj = ''
                this.form.zyid = ''
                this.form.bjid = ''
                this.form.kch = ''
                this.form.xm = ''
                this.form.xsid = ''
            },
            //通过条件查询
            selectby() {
                // console.log(this.form)
                // if(this.form.xlid==''||this.form.kq==''){
                if(this.form.xlid==''){
                    this.$message.error('学期为必选内容');
                }else{
                    this.$refs.isgradechild.selectby(this.form)
                } 
            },
            //专业查课程下拉框
            courseList(a) {
                //初始化课程
                // this.$GET('/lessonInfo/lessonInfoByZyh',{zyid:a}).then((res) => {
                //     // console.log("初始化课程下拉框")
                //     // console.log(res)
                //     this.courseOptions = res.data
                // })
                //初始化班级
                this.$GET('/classInfo/classInfoSelect',{zyid:a}).then((res) => {
                    // console.log("初始化班级下拉框")
                    // console.log(res)
                    this.classOptions = res.data
                })
            },

            
            //专业查课程下拉框
            courseList(a){
                //初始化课程
                // this.$GET('/lessonInfo/lessonInfoByZyh',{zyid:a}).then((res) => {
                //     // console.log("初始化课程下拉框")
                //     // console.log(res)
                //     this.courseOptions = res.data
                // })
                //初始化班级
                this.$GET('/classInfo/classInfoSelect',{zyid:a}).then((res) => {
                    // console.log("初始化班级下拉框")
                    // console.log(res)
                    this.classOptions = res.data
                })
            }

        },
        created() {
            //学期下拉框
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                // console.log("初始化学期下拉框")
                // console.log(res.data)
                this.SemesterOptions = res.data
                // console.log(this.SemesterOptions)
            })
            //专业下拉框
            this.$GET('/majorInfo/selectList').then((res) => {
                // console.log("初始化专业下拉框")
                this.majorOptions = res.data
            })
            //考期下拉框
            this.$GET('/examInfo/currentExamTime').then((res) => {
                // console.log("初始化专业下拉框")
                this.kqOptions = res.data
            })
            //届数下拉框
            this.$POST("/classInfo/queryNfByJbny").then((res) => {
                this.cjqjOptions = res.data
                console.log(res)
            })

        }
    }
</script>

<style scoped lang="less">
    .yd-common-table {
        tbody {
            td {
                .yd {
                    font-size: 20px;
                }
                .edit-details, .edit-print {
                    cursor: pointer;
                }
                .edit-details {
                    position: relative;
                    &::after {
                        content: '';
                        width: 1px;
                        height: 20px;
                        background-color: #F3F5F7;
                        position: absolute;
                        right: 0px;
                        top: 3px;
                    }
                }

            }
        }
    }
</style>
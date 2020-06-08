<template>
    <!--学生基本信息-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-info"></i></div>
                <h3>学生基本信息</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <!--<p>更新时间: 2019年6月12日</p>-->
            </el-col>
        </el-row>

        <div class="yd-bg common-pd yd-students-info">
            <!--个人基本信息-->
            <el-tabs v-model="activeName">
                <el-tab-pane label="个人基本信息" name="first">
                    <!--右侧编辑-->
                    <div class="info-edit-right">
                        <span>资料完整度</span>
                        <span style="width: 362px">
                             <el-progress :percentage="percentage"></el-progress>
                        </span>
                        <el-button type="text" class="font-skin"
                                   @click="editInfoDialog(1)"><i class="el-icon-edit"></i>编辑
                        </el-button>
                    </div>
                    <student-info v-if="ruleForm.xh" :infoForm="ruleForm"></student-info>
                </el-tab-pane>
            </el-tabs>
            <!--学籍信息-->
            <el-tabs v-model="activeName">
                <el-tab-pane label="学籍信息" name="first">
                    <student-school-roll :schoolRollForm="ruleForm"></student-school-roll>
                </el-tab-pane>
            </el-tabs>
            <!--入学信息-->
            <el-tabs v-model="activeName">
                <el-tab-pane label="入学信息" name="first">
                    <student-school :schoolForm="ruleForm"></student-school>
                </el-tab-pane>
            </el-tabs>
            <!--联系信息-->
            <el-tabs v-model="activeName">
                <el-tab-pane label="联系信息" name="first">
                    <!--右侧编辑-->
                    <div class="info-edit-right">
                        <el-button type="text" class="font-skin"
                                   @click="editInfoDialog(2)"><i class="el-icon-edit"></i>编辑
                        </el-button>
                    </div>
                    <student-contact :infoContact="ruleForm" :is_edit="false"></student-contact>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--个人基本信息-->
        <el-dialog width="1100px"
                   custom-class="yd-students-info-dialog dialog-body-auto"
                   :close-on-click-modal='false'
                   :visible.sync="dialogFormVisible">
            <div v-if="dialogType ==1">
                <student-info :infoForm="ruleForm"
                              postUrl="/studentInfo/update"
                              @success="success"
                              is_edit="true">
                </student-info>
            </div>

            <div v-if="dialogType ==2">
                <student-contact postUrl="/studentInfo/update"
                                 :infoContact="ruleForm"
                                 @success="success"
                                 is_edit="true">
                </student-contact>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/info.less'
    import auth from '@/services/auth.js'
    import studentInfo from '../../components-page/students/student-info-form'
    import studentSchoolRoll from '../../components-page/students/student-info-school-roll'
    import studentSchool from '../../components-page/students/student-info-school'
    import studentContact from '../../components-page/students/student-info-contact'

    export default {
        components:{
            studentInfo,
            studentSchoolRoll,
            studentSchool,
            studentContact,
        },
        name:"info",

        data() {
            return {
                activeName:'first',
                labelPosition:'right',
                dialogFormVisible:false,
                value:'',
                ruleForm:{},
                dialogType:'',
            }
        },
        computed:{
            percentage() { //资料完整度
                let allForm = Object.keys(this.ruleForm)
                let totalNumber = allForm.length //总数
                let number = 0 //不为空的数量

                allForm.forEach((item,index) => {
                    if (this.ruleForm[item]) {
                        number += 1
                    }
                })
                if (isNaN(Math.round(number / totalNumber * 100))) {
                    return 0
                } else {
                    return Math.round(number / totalNumber * 100)
                }
            }
        },
        created() {
            //资料完成度
            this.getUserInfo();
        },

        methods:{
            //请求后台拿到该学生的数据
            getUserInfo() {
                this.$GET("/system/user_info").then((res) => { 
                    this.ruleForm = res.data;
                    this.ruleForm.znjgm = (JSON.parse(this.ruleForm.jgm || "")) || ''
                    this.ruleForm.zncsdm = (JSON.parse(this.ruleForm.csdm || "")) || ''
                    this.ruleForm.znhkszd = (JSON.parse(this.ruleForm.hkszd || "")) || ''
                })
            },
            //打开个人基本信息编辑框
            editInfoDialog(type) {
                this.dialogType = type
                this.dialogFormVisible = true;
            },
            success(){
                this.ruleForm = {}
                this.getUserInfo(); 
                this.dialogFormVisible = false
            }
        }
    }
</script>

<style lang="less">
</style>
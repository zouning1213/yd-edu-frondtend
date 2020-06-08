<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-info"></i></div>
                <h3>基本信息</h3>
            </el-col>
            <!-- <el-col :span="20" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col> -->
        </el-row>

        <el-main class="yd-bg common-pd yd-teacher-info" :span="12">
            <!--个人基本信息-->
            <el-tabs v-model="activeName">
                <el-tab-pane label="个人基本信息" name="first">
                    <!--右侧编辑-->
                    <div class="info-edit-right">
                        <span>资料完整度</span>
                        <span style="width: 362px">
                             <el-progress :percentage="percentage"></el-progress>
                        </span>
                        <el-button v-show="!this.$route.query.zgh"
                                   class="font-skin"
                                   type="text" @click="editInfoDialog(1)"><i
                                class="el-icon-edit"></i>编辑
                        </el-button>
                    </div>
                    <teacher-info v-if="ruleForm.zgh" :infoForm="ruleForm"></teacher-info>
                </el-tab-pane>
            </el-tabs>
            <el-tabs v-model="activeName">
                <el-tab-pane label="师资信息" name="first">
                    <!--右侧编辑-->
                    <div class="info-edit-right">
                        <el-button v-show="!this.$route.query.zgh"
                                   class="font-skin"
                                   type="text" @click="editInfoDialog(2)"><i
                                class="el-icon-edit"></i>编辑
                        </el-button>
                    </div>
                    <teacher-school :schoolForm="ruleForm"></teacher-school>
                </el-tab-pane>
            </el-tabs>
            <el-tabs v-model="activeName">
                <el-tab-pane label="联系信息" name="first">
                    <!--右侧编辑-->
                    <div class="info-edit-right">
                        <el-button v-show="!this.$route.query.zgh"
                                   class="font-skin" type="text" @click="editInfoDialog(3)"><i
                                class="el-icon-edit"></i>编辑
                        </el-button>
                    </div>
                    <teacher-contact
                            :infoContact="ruleForm"
                    >
                    </teacher-contact>
                </el-tab-pane>
            </el-tabs>
        </el-main>
        <!--弹窗-->
        <el-dialog width="1000px"
                   :close-on-click-modal='false'
                   custom-class="yd-teacher-info-dialog dialog-body-auto"
                   :lock-scroll="false"
                   :visible.sync="dialogFormVisible">
            <div>
                <template v-if="dialogType == 1">
                    <teacher-info ref="teacherInfoForm"
                                  v-if="ruleForm.zgh"
                                  :infoForm="ruleForm"
                                  @success="success"
                                  :is_edit="true">
                    </teacher-info>
                </template>
                <template v-if="dialogType == 2">
                    <teacher-school
                            ref="teacherSchoolForm"
                            :schoolForm="ruleForm"
                            @success="dialogFormVisible = false"
                            :is_edit="true">
                    </teacher-school>
                </template>
                <template v-if="dialogType == 3">
                    <teacher-contact
                            ref="teacherContact"
                            :infoContact="ruleForm"
                            @success="dialogFormVisible = false"
                            :is_edit="true">
                    </teacher-contact>
                </template>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/info.less'
    import auth from '@/services/auth.js'
    import teacherInfo from '../../components-page/teacher/teacher-info-form'
    import teacherSchool from '../../components-page/teacher/teacher-info-school'
    import teacherContact from '../../components-page/teacher/teacher-info-contact'

    export default {
        name:"info",
        components:{
            teacherInfo,
            teacherContact,
            teacherSchool,
        },
        data() {
            return {
                activeName:'first',
                dialogFormVisible:false,
                search:'',
                ruleForm:{},
                dialogType:''
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
            getUserInfo() {
                let jsid = this.$store.state.userInfo.jsid
                this.$GET("/teacherInfo/detail/" + jsid).then((res) => {
                        this.ruleForm = res.data||{}; 
                        this.ruleForm.znjgm = res.data.jgm ? JSON.parse(res.data.jgm || "{}") : '';
                        this.ruleForm.zncsdm = res.data.csdm ? JSON.parse(res.data.csdm || "{}") : '';
                        this.ruleForm.znhkszd = res.data.hkszd ? JSON.parse(res.data.hkszd || "{}") : '';
                    }
                )
            },
            //打开个人基本信息编辑框
            editInfoDialog(type) {
                this.dialogType = type
                this.dialogFormVisible = true;
            },
            //success
            success(){
                this.ruleForm = {}
                this.getUserInfo(); 
                this.dialogFormVisible = false;
            }
        }
    }
</script>

<style scoped>
</style>
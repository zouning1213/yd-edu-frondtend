<template>
    <div class="target-teacher-warp">
        <!--<web-head></web-head>-->
        <!--编辑教师信息详情-->
        <div class="edit-teacher-info">
            <el-row class="yd-router-title yd-bg">
                <div class="title-icon icon-skin"><i class="yd icon-teacher"></i></div>
                <h3>教师信息编辑</h3>
            </el-row>
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="基本信息" class="common-pd" name="first">
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">个人基本信息</h3>
                        </div>
                    </div>
                    <teacher-info :infoForm="ruleForm" :is_edit="true"></teacher-info>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">师资信息</h3>
                        </div>
                    </div>
                    <teacher-school :schoolForm="ruleForm" :is_edit="true"></teacher-school>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">联系信息</h3>
                        </div>
                    </div>
                    <teacher-contact :infoContact="ruleForm" :is_edit="true"></teacher-contact>
                </el-tab-pane>
                <el-tab-pane label="扩展信息" class="common-pd" name="second">
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">岗位证书信息</h3>
                        </div>
                    </div>
                    <teacher-certificate :teacherZgh="jsid"
                                         :certificateInfo="certificateInfo"
                                         :is_edit="true">
                    </teacher-certificate>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">专业技术信息</h3>
                        </div>
                    </div>
                    <teacher-professional :teacherZgh="jsid"
                                          :professionalInfo="professionalInfo"
                                          :is_edit="true">
                    </teacher-professional>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">语言能力信息</h3>
                        </div>
                    </div>
                    <teacher-language :teacherZgh="jsid"
                                      :languageInfo="languageInfo"
                                      :is_edit="true">
                    </teacher-language>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">教学工作量信息</h3>
                        </div>
                    </div>
                    <teacher-workload :teacherZgh="jsid"
                                      :workloadInfo="workloadInfo"
                                      :is_edit="true">
                    </teacher-workload>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">任课信息</h3>
                        </div>
                    </div>
                    <teacher-classroom :teacherZgh="jsid"
                                       :classroomInfo="classroomInfo"
                                       :is_edit="false">
                    </teacher-classroom>
                </el-tab-pane>
                <el-tab-pane label="附件信息" class="common-pd" name="three">
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">身份证</h3>
                        </div>
                    </div>
                    <id-card ref="idCard" :is_autoUpload="false"></id-card>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">获奖证书</h3>
                        </div>
                    </div>
                    <certificate class="text-center" ref="winningCard"
                                 :is_autoUpload="false"></certificate>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">毕业证书</h3>
                        </div>
                    </div>
                    <certificate class="text-center" ref="graduationCard"
                                 :is_autoUpload="false"></certificate>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">教师资格证书</h3>
                        </div>
                    </div>
                    <certificate class="text-center" ref="teachersCard"
                                 :is_autoUpload="false"></certificate>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/global.css'
    import '../css/common.less'
    import './css/edit-teacher-info.less'

    //基本信息
    import teacherInfo from '../../components-page/teacher/teacher-info-form'
    import teacherSchool from '../../components-page/teacher/teacher-info-school'
    import teacherContact from '../../components-page/teacher/teacher-info-contact'
    //扩展信息
    import teacherCertificate from '../../components-page/teacher/teacher-table-certificate'
    import teacherProfessional from '../../components-page/teacher/teacher-table-professional'
    import teacherLanguage from '../../components-page/teacher/teacher-table-language'
    import teacherClassroom from '../../components-page/teacher/teacher-table-classroom'
    import teacherWorkload from '../../components-page/teacher/teacher-table-workload'
    //附件信息
    import idCard from '../../components-page/common/info-upload-card'
    import certificate from '../../components-page/common/info-upload-certificate'

    export default {
        name:"edit-teacher-info",
        components:{
            //基本信息
            teacherInfo,
            teacherSchool,
            teacherContact,
            //扩展信息
            teacherCertificate,
            teacherProfessional,
            teacherLanguage,
            teacherClassroom,
            teacherWorkload,
            //附件信息
            idCard,
            certificate
        },
        data() {
            return {
                activeName:'first',
                jsid:this.$route.params.jsid,
                params:{
                    jsid:this.$route.params.jsid,
                    limit:20,
                    page:1
                },
                ruleForm:{},
                //扩展信息
                certificateInfo:[],
                professionalInfo:[],
                languageInfo:[],
                workloadInfo:[],
                classroomInfo:[],
                //附件信息
                idCard:[],
                winningCard:[],
                graduationCard:[],
                teachersCard:[]
            }
        },
        created() {
            this.$GET('/teacherInfo/detail/' + this.jsid).then((res) => {
                if (res.code == 200) {
                    //个人基本信息
                    this.ruleForm = res.data
                    this.ruleForm.znjgm = (JSON.parse(res.data.jgm || "[]")) || ''
                    this.ruleForm.zncsdm = (JSON.parse(res.data.csdm || "[]")) || ''
                    this.ruleForm.znhkszd = (JSON.parse(res.data.hkszd || "[]")) || ''
                    //身份证照片
                    this.idCard = this.convertArray(res.data.sfztp);
                    //获奖证书
                    this.winningCard = this.convertArray(res.data.hjzstp)
                    //毕业证
                    this.graduationCard = this.convertArray(res.data.byztp)
                    //教师资格证
                    this.teachersCard = this.convertArray(res.data.jszgztp)
                    //传递给组件
                    this.$refs.winningCard.setFileList(this.winningCard); //给子组件赋值
                    this.$refs.idCard.setFileList(this.idCard); //给子组件赋值
                    this.$refs.graduationCard.setFileList(this.graduationCard); //给子组件赋值
                    this.$refs.teachersCard.setFileList(this.teachersCard); //给子组件赋值
                }
            });

            this.$GET('/teacherCertificate/listByTeacherId',this.params).then((res) => {
                this.certificateInfo = res.data
            })
            this.$GET('/teacherSkill/listByTeacherId',this.params).then((res) => {
                this.professionalInfo = res.data
            })
            this.$GET('/teacherLanguage/listByTeacherId',this.params).then((res) => {
                this.languageInfo = res.data
            })
            this.$GET('/teacherWorkload/listByTeacherId',this.params).then((res) => {
                this.workloadInfo = res.data
            })
            this.$GET('/teacherLesson/listByTeacherId',this.params).then((res) => {
                this.classroomInfo = res.data
            })
        },
        methods:{
            convertArray(string) { //字符串转换数组
                let arr = [];
                if (string) {
                    string = string.split(",")
                    string.forEach(item => {
                        arr.push(item);
                    })
                    return arr
                } else {
                    return arr
                }
            },
        }
    }
</script>

<style scoped lang="less">

</style>
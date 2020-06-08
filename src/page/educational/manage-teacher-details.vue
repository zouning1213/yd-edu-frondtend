<template>
    <div class="manage-teacher-details">
        <div class="teacher-info-details yd-bg common-pd" :span="12" id="exportBox">
            <div class="title">
                <h1>教师信息详情</h1>
            </div>
            <!--个人基本信息-->
            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">个人基本信息</h3>
                </div>
            </div>
            <teacher-info v-if="ruleForm.zgh" :infoForm="ruleForm" :is_edit="false"></teacher-info>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">师资信息</h3>
                </div>
            </div>
            <teacher-school :schoolForm="ruleForm" :is_edit="false"></teacher-school>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">联系信息</h3>
                </div>
            </div>
            <teacher-contact
                    :infoContact="ruleForm"
                    :is_edit="false">
            </teacher-contact>

            <!-- 扩展信息 -->
            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">岗位证书信息</h3>
                </div>
            </div>
            <teacher-certificate
                    :certificateInfo="certificateInfo"
                    :is_edit="false">
            </teacher-certificate>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">专业技术信息</h3>
                </div>
            </div>
            <teacher-professional
                    :professionalInfo="professionalInfo"
                    :is_edit="false">
            </teacher-professional>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">语言能力信息</h3>
                </div>
            </div>
            <teacher-language :languageInfo="languageInfo"
                              :is_edit="false">
            </teacher-language>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">教务工作量信息</h3>
                </div>
            </div>
            <teacher-workload :workloadInfo="workloadInfo"></teacher-workload>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">任课信息</h3>
                </div>
            </div>
            <teacher-classroom :classroomInfo="classroomInfo" :is_edit="false"></teacher-classroom>

            <!-- 身份证 -->
            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">身份证信息</h3>
                </div>
            </div>
            <id-card ref="idCard" :is_autoUpload="false"></id-card>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">毕业证书</h3>
                </div>
            </div>
            <certificate class="text-center" ref="graduationCard" :is_autoUpload="false"></certificate>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">获奖证书</h3>
                </div>
            </div>
            <certificate class="text-center" ref="winningCard" :is_autoUpload="false"></certificate>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">教师资格证书</h3>
                </div>
            </div>
            <certificate class="text-center" ref="teachersCard" :is_autoUpload="false"></certificate>
        </div>
        <div class="download-Info" @click="downloadInfo">
            <span class="font-skin"><i class="yd icon-download"></i>下载信息</span>
        </div>
        <!--回到顶部-->
        <div class="backTop">
            <el-backtop target="" :bottom="100" :right="80"></el-backtop>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/global.css'
    import '../css/common.less'
    import './css/manage-teacher-details.less'

    import '../teacher/css/info.less'

    //个人基本信息
    import teacherInfo from '../../components-page/teacher/teacher-info-form'
    import teacherSchool from '../../components-page/teacher/teacher-info-school'
    import teacherContact from '../../components-page/teacher/teacher-info-contact'
    //岗位证书 
    import teacherCertificate from '../../components-page/teacher/teacher-table-certificate'
    import teacherProfessional from '../../components-page/teacher/teacher-table-professional'
    import teacherLanguage from '../../components-page/teacher/teacher-table-language'
    import teacherClassroom from '../../components-page/teacher/teacher-table-classroom'
    import teacherWorkload from '../../components-page/teacher/teacher-table-workload'
    //身份证
    import idCard from '../../components-page/common/info-upload-card'
    import certificate from '../../components-page/common/info-upload-certificate'

    export default {
        name:"manage-teacher-details",
        components:{
            teacherInfo,
            teacherContact,
            teacherSchool,
            //附件信息
            teacherCertificate,
            teacherProfessional,
            teacherLanguage,
            teacherClassroom,
            teacherWorkload,
            //扩展信息
            idCard,
            certificate,
        },
        data() {
            return {
                htmlTitle:"教师PDF名称",
                //基本信息
                ruleForm:{},
                //附件信息
                certificateInfo:[], //岗位证书
                professionalInfo:[], //专业技术
                languageInfo:[], // 语言能力信息
                workloadInfo:[], //教学工作量信息
                classroomInfo:[], //任课信息
                //扩展信息
                idCard:[], //身份证图片
                winningCard:[], // 获奖证书
                graduationCard:[],//毕业证
                teachersCard:[] //教师资格证
            }
        },
        created() {
            this.getUserInfo();
        },
        methods:{
            //下载
            downloadInfo() {
                document.documentElement.scrollTop = document.body.scrollTop = 0
                this.$getPdf('exportBox',this.htmlTitle)
            },
            getUserInfo() {
                // console.log("11传递过啦的"+this.$route.params.zgh)
                let jsid = this.$route.params.zgh || JSON.parse(localStorage.getItem("user")).jsid
                this.$GET("/teacherInfo/detail/" + jsid).then(
                    (res) => {
                        this.htmlTitle = res.data.xm + "的教师信息"
                        this.ruleForm = res.data;
                        this.idCard = this.convertArray(res.data.sfztp);
                        this.$refs.idCard.setFileList(this.idCard); //给子组件赋值
                        //获奖证书
                        this.winningCard = this.convertArray(res.data.hjzstp)
                        this.$refs.winningCard.setFileList(this.winningCard); //给子组件赋值
                        //毕业证
                        this.graduationCard = this.convertArray(res.data.byztp)
                        this.$refs.graduationCard.setFileList(this.graduationCard); //给子组件赋值
                        //教师资格证
                        this.teachersCard = this.convertArray(res.data.jszgztp)
                        this.$refs.teachersCard.setFileList(this.teachersCard); //给子组件赋值 
                    }
                )
                //附件信息
                let params = {
                    limit:200,
                    page:1,
                    jsid:jsid
                }
                this.$GET('/teacherCertificate/listByTeacherId',params).then((res) => {
                    this.certificateInfo = res.data
                })
                this.$GET('/teacherSkill/listByTeacherId',params).then((res) => {
                    this.professionalInfo = res.data
                })
                this.$GET('/teacherLanguage/listByTeacherId',params).then((res) => {
                    this.languageInfo = res.data
                })
                this.$GET('/teacherWorkload/listByTeacherId',params).then((res) => {
                    this.workloadInfo = res.data
                })
                this.$GET('/teacherLesson/listByTeacherId',params).then((res) => {
                    this.classroomInfo = res.data
                })
            },
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
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
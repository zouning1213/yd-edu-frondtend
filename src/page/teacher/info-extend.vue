<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="el-icon-edit-outline"></i></div>
                <h3>扩展信息</h3>
            </el-col>
            <!--  <el-col :span="20" class="text-right">
                  <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                      <el-button slot="append">搜索</el-button>
                  </el-input>
              </el-col>-->
        </el-row>
        <div class="yd-students-extend common-pd yd-bg"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-tabs v-model="activeName">
                <el-tab-pane label="岗位证书信息" name="first">
                    <div class="mt-30 yd-common-table">
                        <teacher-certificate :certificateInfo="certificateInfo"
                                             :is_edit="false">
                        </teacher-certificate>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="专业技术信息" name="second">
                    <div class="mt-30 yd-common-table">
                        <teacher-professional :professionalInfo="professionalInfo"
                                              :is_edit="false">
                        </teacher-professional>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="语言能力信息" name="third">
                    <div class="mt-30 yd-common-table">
                        <teacher-language :languageInfo="languageInfo"
                                          :is_edit="false">
                        </teacher-language>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="教学工作量信息" name="four">
                    <div class="mt-30 yd-common-table">
                        <teacher-workload :workloadInfo="workloadInfo"></teacher-workload>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="任课信息" name="five">
                    <div class="mt-30 yd-common-table">
                        <teacher-classroom :classroomInfo="classroomInfo" :teacherZgh='propjsid||jsid' :is_edit="false"></teacher-classroom>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import teacherCertificate from '../../components-page/teacher/teacher-table-certificate'
    import teacherProfessional from '../../components-page/teacher/teacher-table-professional'
    import teacherLanguage from '../../components-page/teacher/teacher-table-language'
    import teacherClassroom from '../../components-page/teacher/teacher-table-classroom'
    import teacherWorkload from '../../components-page/teacher/teacher-table-workload'

    export default {
        name:"extend-info", 
        props:{ 
            propjsid :{
                default :''
            }
        },
        components:{
            teacherCertificate,
            teacherProfessional,
            teacherLanguage,
            teacherClassroom,
            teacherWorkload
        },
        data() {
            return {
                activeName:'first',
                jsid : this.$store.state.userInfo.jsid||'',
                certificateInfo:[], //岗位证书
                professionalInfo:[], //专业技术
                languageInfo:[], // 语言能力信息
                workloadInfo:[], //教学工作量信息
                classroomInfo:[], //任课信息
                getParams:{ //分页
                    page:1,
                    limit:200
                },
            }
        },
        created() {
            this.getCertificateInfo()
            this.getProfessionalInfo()
            this.getLanguageInfo()
            this.getWorkloadInfo()
            this.getClassroomInfo()
        },
        methods:{
            getCertificateInfo() {
                this.$GET('/teacherCertificate/list',{jsid:this.jsid||this.$props.propjsid}).then((res) => {
                    this.certificateInfo = res.data
                })
            },
            getProfessionalInfo() {
                this.$GET('/teacherSkill/list',{jsid:this.jsid||this.$props.propjsid}).then((res) => {
                    this.professionalInfo = res.data
                })
            },
            getLanguageInfo() {
                this.$GET('/teacherLanguage/list',{jsid:this.jsid||this.$props.propjsid}).then((res) => {
                    this.languageInfo = res.data
                })
            },
            getWorkloadInfo() {
                this.$GET('/teacherWorkload/list',{jsid:this.jsid||this.$props.propjsid}).then((res) => {
                    this.workloadInfo = res.data
                })
            },
            getClassroomInfo() {
                this.$GET('/teacherLesson/list',{jsid:this.jsid||this.$props.propjsid}).then((res) => {
                    this.classroomInfo = res.data
                })
            },
        },
    }
</script>

<style lang="less" scoped>

</style>

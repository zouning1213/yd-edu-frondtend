<template>
    <div class="target-teacher-warp">
        <div class="edit-teacher-info">
            <el-row class="yd-router-title yd-bg">
                <div class="title-icon icon-skin"><i class="yd icon-teacher"></i></div>
                <h3>学生信息编辑</h3>
            </el-row>
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="基本信息" class="common-pd" name="first">
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">个人基本信息</h3>
                        </div>
                    </div>
                    <student-info
                            :infoForm="ruleForm" :is_edit="true">
                    </student-info>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">学籍信息</h3>
                        </div>
                    </div>
                    <student-school-roll
                            :schoolRollForm="ruleForm" :is_edit="true">
                    </student-school-roll>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">入学信息</h3>
                        </div>
                    </div>
                    <student-school
                            :schoolForm="ruleForm" :is_edit="true">
                    </student-school>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">联系信息</h3>
                        </div>
                    </div>
                    <student-contact
                            :infoContact="ruleForm" :is_edit="true">
                    </student-contact>
                </el-tab-pane>
                <el-tab-pane label="扩展信息" class="common-pd" name="second">
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">学籍异动信息</h3>
                        </div>
                    </div>
                    <school-changes :studentXh="xsid"
                                    :schoolChanges="schoolChanges"
                                    :is_edit='true'>
                    </school-changes>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">学校奖励</h3>
                        </div>
                    </div>
                    <school-punish :studentXh="xsid"
                                   :schoolPunish="schoolPunish"
                                   :is_edit='true'>
                    </school-punish>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">学校惩罚</h3>
                        </div>
                    </div>
                    <school-reward :studentXh="xsid"
                                   :schoolReward="schoolReward"
                                   :is_edit='true'>
                    </school-reward>
                    <!--  <div class="target-title">
                          <div class="name">
                              <div class="line"></div>
                              <h3>自定义信息</h3>
                          </div>
                      </div>-->
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
                    <certificate ref="winningCard" :is_autoUpload="false">
                    </certificate>
                    <div class="target-title">
                        <div class="name">
                            <div class="line border-color-skin"></div>
                            <h3 class="font-skin">毕业证书</h3>
                        </div>
                    </div>
                    <certificate ref="graduationCard"
                                 :is_autoUpload="false">
                    </certificate>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/global.css'
    import '../css/common.less'
    import './css/edit-teacher-info.less'
    //个人基本信息
    import studentInfo from '../../components-page/students/student-info-form'
    import studentSchoolRoll from '../../components-page/students/student-info-school-roll'
    import studentSchool from '../../components-page/students/student-info-school'
    import studentContact from '../../components-page/students/student-info-contact'
    //扩展信息
    import schoolChanges from '../../components-page/students/student-table-changes'
    import schoolPunish from '../../components-page/students/student-table-punish'
    import schoolReward from '../../components-page/students/student-table-reward'
    //附件信息
    import idCard from '../../components-page/common/info-upload-card'
    import certificate from '../../components-page/common/info-upload-certificate'

    export default {
        name:"edit-student-info",
        components:{
            studentInfo,
            studentSchoolRoll,
            studentSchool,
            studentContact,
            schoolChanges,
            schoolPunish,
            schoolReward,
            idCard,
            certificate
        },
        data() {
            return {
                activeName:'first',
                xsid:this.$route.params.xsid,
                ruleForm:{},
                //扩展信息
                schoolChanges:[],
                schoolPunish:[],
                schoolReward:[],
                //附件信息
                idCard:[],
                winningCard:[],
                graduationCard:[],
            }
        },
        created() {
            this.$GET('/studentInfo/detail/' + this.xsid).then((res) => {
                this.ruleForm = res.data
                this.ruleForm.znjgm = (JSON.parse(res.data.jgm || "[]")) || '';
                this.ruleForm.zncsdm = (JSON.parse(res.data.csdm || "[]")) || '';
                this.ruleForm.znhkszd = (JSON.parse(res.data.hkszd || "[]")) || '';
            });
            //查询学生附件信息
            this.$GET('/studentInfo/detail/' + this.xsid).then((res) => {
                //身份证
                this.idCard = this.convertArray(res.data.sfztp);
                this.$refs.idCard.setFileList(this.idCard); //给子组件赋值
                //获奖证书
                this.winningCard = this.convertArray(res.data.hjzstp)
                this.$refs.winningCard.setFileList(this.winningCard); //给子组件赋值
                //毕业证
                this.graduationCard = this.convertArray(res.data.byztp)
                this.$refs.graduationCard.setFileList(this.graduationCard); //给子组件赋值
            });

            //查询学生异动信息
            this.$GET('/schoolRoll/listByUser',{'account':this.xsid}).then((res) => {
                this.schoolChanges = res.data
            });

            //查询学生奖励信息
            this.$GET('/studentReward/listByUser',{'account':this.xsid}).then((res) => {
                this.schoolPunish = res.data
            });

            //查询学生惩罚信息
            this.$GET('/studentPunishment/listByUser',{'account':this.xsid}).then((res) => {
                this.schoolReward = res.data
            })
        },
        methods:{
            //字符串转换为数组
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

<style scoped>

</style>
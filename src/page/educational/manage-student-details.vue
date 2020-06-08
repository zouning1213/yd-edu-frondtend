<template>
    <div class="manage-teacher-details">
        <div class="teacher-info-details yd-bg common-pd" :span="12" id="exportBox">
            <div class="title">
                <h1>学生信息详情</h1>
            </div>
            <!--个人基本信息-->
            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">个人基本信息</h3>
                </div>
            </div>
            <student-info v-if="ruleForm.xh" :infoForm="ruleForm" :is_edit="false"></student-info>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">学籍信息</h3>
                </div>
            </div>
            <student-school-roll :schoolRollForm="ruleForm" :is_edit="false"></student-school-roll>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">入学信息</h3>
                </div>
            </div>
            <student-school :schoolForm="ruleForm" :is_edit="false"></student-school>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">联系信息</h3>
                </div>
            </div>
            <student-contact :infoContact="ruleForm" :is_edit="false"></student-contact>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">学籍异动信息</h3>
                </div>
            </div>
            <school-changes :schoolChanges="schoolChanges" :is_edit='false'></school-changes>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">学校奖励</h3>
                </div>
            </div>
            <school-punish :schoolPunish="schoolPunish" :is_edit='false'></school-punish>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">学校惩罚</h3>
                </div>
            </div>
            <school-reward :schoolReward="schoolReward" :is_edit='false'></school-reward>

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
                    <h3 class="font-skin">获奖证书</h3>
                </div>
            </div>
            <certificate class="text-center" ref="winningCard" :is_autoUpload="false"></certificate>

            <div class="target-title">
                <div class="name">
                    <div class="line border-color-skin"></div>
                    <h3 class="font-skin">毕业证书</h3>
                </div>
            </div>
            <certificate class="text-center" ref="graduationCard" :is_autoUpload="false"></certificate>
        </div>
        <!--弹窗-->
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

    //学生基本信息
    import studentInfo from '../../components-page/students/student-info-form'
    import studentSchoolRoll from '../../components-page/students/student-info-school-roll'
    import studentSchool from '../../components-page/students/student-info-school'
    import studentContact from '../../components-page/students/student-info-contact'
    //扩展信息
    import schoolChanges from '../../components-page/students/student-table-changes'
    import schoolPunish from '../../components-page/students/student-table-punish'
    import schoolReward from '../../components-page/students/student-table-reward'

    import idCard from '../../components-page/common/info-upload-card'
    import certificate from '../../components-page/common/info-upload-certificate'
    import dialogAddStudent from '../../components-page/students/dialog-add-student'


    export default {
        name:"manage-student-details",
        components:{
            //个人信心
            studentInfo,
            studentSchoolRoll,
            studentSchool,
            studentContact,
            //扩展信息
            schoolChanges,
            schoolPunish,
            schoolReward,
            //附件信息
            idCard,
            certificate,
            dialogAddStudent
        },
        data() {
            return {
                htmlTitle:"学生PDF名称",
                ruleForm:{},
                //扩展
                schoolChanges:[],
                schoolPunish:[],
                schoolReward:[],
                //附件
                idCard:[],
                winningCard:[],
                graduationCard:[]
            }
        },
        created() {
            this.getUserInfo();
        },
        methods:{
            downloadInfo() {
                document.documentElement.scrollTop = document.body.scrollTop = 0
                this.$getPdf('exportBox',this.htmlTitle)
            },
            getUserInfo() {
                // console.log("学生传递过啦的"+this.$route.params.xh)
                let xh = this.$route.params.xh
                this.$GET("/studentInfo/detail/" + xh).then((res) => {
                    this.ruleForm = res.data;
                })
                //查询学生附件信息
                this.$GET('/studentInfo/detail/' + xh).then((res) => {
                    this.htmlTitle = res.data.xm + "的学生信息"
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
                this.$GET('/schoolRoll/listByUser',{'account':xh}).then((res) => {
                    this.schoolChanges = res.data
                });

                //查询学生奖励信息
                this.$GET('/studentReward/listByUser',{'account':xh}).then((res) => {
                    this.schoolPunish = res.data
                });

                //查询学生惩罚信息
                this.$GET('/studentPunishment/listByUser',{'account':xh}).then((res) => {
                    this.schoolReward = res.data
                })
            },
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

<style lang="less" scoped>

</style>
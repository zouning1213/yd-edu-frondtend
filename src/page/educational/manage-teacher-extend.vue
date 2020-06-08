<template>
    <!--学生扩展信息管理-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-extend"></i></div>
                <h3>教师扩展信息管理</h3>
            </el-col>
            <!-- <el-col :span="20" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col> -->
        </el-row>
        <div class="manage-student-info">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="岗位证书" name="first">
                    <div class="yd-bg common-pd ">
                        <el-row class="yd-common-search">
                            <div class="fl">
                                <el-form :inline="true" :model="formOption">
                                    <!-- <el-form-item label="扩展信息:">
                                        <el-select v-model="formOption.user">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(1)">查询</el-button>
                                    </el-form-item> -->
                                </el-form>
                            </div>
                            <div class="fr pr">
                                <div @click="addStudentExtend(1)" class="yd-add-btn"></div>
                            </div>
                        </el-row>
                        <teacher-certificate-list
                                v-on:editTeacherCertificate="editTeacherCertificate"
                                v-on:deleteTeacherCertificate="deleteTeacherCertificate"
                                :certificateInfo="certificateInfo"></teacher-certificate-list>
                        <yd-page ref="teacherCertificatePage"
                                       url="/teacherCertificate/listByTeacherId" :params="params"
                                       @changePage="changeCertificate"></yd-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="专业技术信息" name="second">
                    <div class="yd-bg common-pd">
                        <el-row class="yd-common-search">
                            <!-- <div class="fl">
                                <el-form :inline="true" :model="formOption">
                                    <el-form-item label="扩展信息:">
                                        <el-select v-model="formOption.user">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(2)">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </div> -->
                            <div class="fr pr">
                                <div @click="addStudentExtend(2)" class="yd-add-btn"></div>
                            </div>
                        </el-row>
                        <teacher-professional-list
                                v-on:editProfessionalList="editProfessionalList"
                                v-on:deleteProfessionalList="deleteProfessionalList"
                                :professionalInfo="professionalInfo">
                        </teacher-professional-list>
                        <yd-page ref="teacherProfessionalPage" url="/teacherSkill/listByTeacherId"
                                       :params="params"
                                       @changePage="changeProfessional"></yd-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="语言能力信息" name="third">
                    <div class="yd-bg common-pd ">
                        <el-row class="yd-common-search">
                            <!-- <div class="fl">
                                <el-form :inline="true" :model="formOption">
                                    <el-form-item label="扩展信息:">
                                        <el-select v-model="formOption.user">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(3)">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </div> -->
                            <div class="fr pr">
                                <div @click="addStudentExtend(3)" class="yd-add-btn"></div>
                            </div>
                        </el-row>
                        <teacher-language-list
                                v-on:editLanguageList="editLanguageList"
                                v-on:deleteLanguageList="deleteLanguageList"
                                :languageInfo="languageInfo"></teacher-language-list>
                        <yd-page ref="teacherlanguageInfoPage"
                                       url="/teacherLanguage/listByTeacherId" :params="params"
                                       @changePage="changeLanguage"></yd-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="自定义信息" name="fourth">
                    <div class="yd-bg common-pd ">
                        <el-row class="yd-common-search">
                            <div class="fl">
                                <el-form :inline="true" :model="formOption">
                                    <!-- <el-form-item label="扩展信息:">
                                        <el-select v-model="formOption.user">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(4)">查询</el-button>
                                    </el-form-item> -->
                                </el-form>
                            </div>
                            <div class="fr pr">
                                <div @click="addStudentExtend(4)" class="yd-add-btn"></div>
                            </div>
                        </el-row>
                        <div style="height:50px;text-align:center">
                            暂无 
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--新增弹窗-->
        <el-dialog
                :title="title"
                :close-on-click-modal='false'
                :visible.sync="dialogVisible"
                width="680px">
            <div v-if="type =='1'">
                <add-teacher-certificate
                        :is_edit="is_edit"
                        ref="teacherCertificate"
                        v-on:receivesCertificate="receivesCertificate"
                        v-on:editCertificate="editCertificate"
                        :form="certificateFrom"></add-teacher-certificate>
            </div>
            <div v-if="type =='2'">
                <add-teacher-professional
                        :is_edit="is_edit"
                        ref="teacherProfessional"
                        :form="professionalForm"
                        v-on:receivesProfessional="receivesProfessional"
                        v-on:editProfessional="editProfessional"></add-teacher-professional>
            </div>
            <div v-if="type =='3'">
                <add-teacher-language
                        :is_edit="is_edit"
                        ref="teacherLanguage"
                        :form="languageForm"
                        v-on:receivesLanguage="receivesLanguage"
                        v-on:editLanguage="editLanguage"></add-teacher-language>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitStudentExtend">确 定</el-button>
                <el-button @click="resetStudentExtend">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    //岗位证书
    import teacherCertificateList from '../../components-page/educational/teacher-info/teacher-certificate-list'
    import addTeacherCertificate from '../../components-page/educational/teacher-info/teacher-certificate-add'
    //专业技术信息
    import teacherProfessionalList from '../../components-page/educational/teacher-info/teacher-professional-list'
    import addTeacherProfessional from '../../components-page/educational/teacher-info/teacher-professional-add'
    //语言能力信息
    import teacherLanguageList from '../../components-page/educational/teacher-info/teacher-language-list'
    import addTeacherLanguage from '../../components-page/educational/teacher-info/teacher-language-add'


    export default {
        name:"manage-students-extend",
        components:{
            teacherCertificateList,
            addTeacherCertificate,
            teacherProfessionalList,
            addTeacherProfessional,
            teacherLanguageList,
            addTeacherLanguage,
        },
        data() {
            return {
                dialogVisible:false,
                activeName:'first',
                formOption:{
                    user:'',
                    region:'',
                    content:''
                },
                search:'',
                //列表传递数据
                certificateInfo:[],
                professionalInfo:[],
                languageInfo:[],
                //修改传递数据
                certificateFrom:{}, //1 岗位证书
                professionalForm:{}, //2专业技术
                languageForm:{}, //3学校惩罚
                //是否编辑
                is_edit:false,
                params:{
                    limit:20,
                    page:1
                },
                type:'1', //1 学籍异动 2学校奖励 3学校惩罚 4自定义信息
                title:'',
            }
        },
        methods:{
            handleClick(tab,event) {
                if (tab.name == 'first') {
                    this.type = 1
                } else if (tab.name == 'second') {
                    this.type = 2
                } else if (tab.name == 'third') {
                    this.type = 3
                }
            },
            addStudentExtend(type) { //1 学籍异动 2学校奖励 3学校惩罚 4自定义信息
                this.type = type
                if (this.type == '1') {
                    this.title = '新增岗位'
                    this.is_edit = false
                    this.certificateFrom = {}
                } else if (this.type == 2) {
                    this.title = '新增专业技术'
                    this.is_edit = false
                    this.professionalForm = {}
                } else if (this.type == 3) {
                    this.title = '新增语言能力'
                    this.is_edit = false
                    this.languageForm = {}
                }
                this.dialogVisible = true
            },
            submitStudentExtend() {
                if (this.type == '1') {
                    this.$refs.teacherCertificate.submitInfoForm();
                } else if (this.type == 2) {
                    this.$refs.teacherProfessional.submitInfoForm()
                } else if (this.type == 3) {
                    this.$refs.teacherLanguage.submitInfoForm()
                }
            },
            //公共刷新数据
            refreshCommonList() {
                this.dialogVisible = false
                this.$refs.teacherCertificatePage.getData()
                this.$refs.teacherProfessionalPage.getData()
                this.$refs.teacherlanguageInfoPage.getData()
            },
            //取消
            resetStudentExtend() {
                this.refreshCommonList()
            },
            //公共
            commonReceivesList(url,data) {
                this.$POST(url,data).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'新增成功',
                            type:'success'
                        })
                        this.refreshCommonList()
                    } else {
                        this.$message.error('新增失败，请重新新增');
                    }
                })
            },
            commonEditList(url,data) {
                this.$POST(url,data).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        })
                    } else {
                        this.$message.error('修改失败，请重新修改');
                    }
                    this.dialogVisible = false
                })
            },
            commonDeleteList(url,data) {
                this.$POST(url,data).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message:'删除成功',
                            type:'success'
                        })
                        this.refreshCommonList()
                    } else {
                        this.$message.error('删除失败，请重新删除');
                    }
                    this.dialogVisible = false
                })
            },
            //提交新增
            receivesCertificate(data) { //
                this.commonReceivesList('/teacherCertificate/add',data)
            },
            receivesProfessional(data) { //
                this.commonReceivesList('/teacherSkill/add',data)
            },
            receivesLanguage(data) { //
                this.commonReceivesList('/teacherLanguage/add',data)
            },
            //提交编辑
            editCertificate(data) {
                this.commonEditList('/teacherCertificate/update',data)
            },
            editProfessional(data) {
                this.commonEditList('/teacherSkill/update',data)
            },
            editLanguage(data) {
                this.commonEditList('/teacherLanguage/update',data)
            },
            // 删除
            deleteTeacherCertificate(data) {
                this.commonDeleteList('/teacherCertificate/delete',{teacherCertificateId:data})
            },
            deleteProfessionalList(data) {
                this.commonDeleteList('/majorInfo/delete',{majorInfoId:data})
            },
            deleteLanguageList(data) {
                this.commonDeleteList('/studentPunishment/delete',{studentPunishmentId:data})
            },
            //接收编辑传递的数据
            editTeacherCertificate(data) {
                this.title = '修改岗位证书'
                this.is_edit = true
                this.certificateFrom = data
                this.dialogVisible = true
            },
            editProfessionalList(data) {
                this.title = '修改专业技术'
                this.is_edit = true
                this.professionalForm = data
                this.dialogVisible = true
            },
            editLanguageList(data) {
                this.title = '修改语言能力'
                this.is_edit = true
                this.languageForm = data
                this.dialogVisible = true
            },
            //查询
            searchStudentsList(type) {//查询类型 1 学籍异动 2学校奖励 3学校惩罚 4自定义信息
                // console.log('submit!');
            },
            //教师岗位证书
            changeCertificate(data) {
                this.certificateInfo = data
            },
            //专业技术信息
            changeProfessional(data) {
                this.professionalInfo = data
            },
            //查询学生惩罚信息
            changeLanguage(data) {
                this.languageInfo = data
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <!--学生扩展信息管理-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-basic-info"></i></div>
                <h3>学生扩展信息管理</h3>
            </el-col>
            <!-- <el-col :span="12" class="text-right">
                <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col> -->
        </el-row>
        <div class="manage-student-info">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="学籍异动信息" name="first">
                    <div class="yd-bg common-pd ">
                        <el-row class="yd-common-search">
                            <!-- <div class="fl">
                                <el-form :inline="true" :model="formOption">
                                    <el-form-item label="扩展信息 :">
                                        <el-select v-model="formOption.user">
                                            <el-option label="一年级" value="1"></el-option>
                                            <el-option label="二年级" value="2"></el-option>
                                            <el-option label="三 年级" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(1)">查询</el-button>
                                    </el-form-item>
                                </el-form>
                            </div> -->
                            <div class="fr pr">
                                <div @click="addStudentExtend(1)" class="yd-add-btn"></div>
                            </div>
                        </el-row>
                        <student-school-roll-list
                                v-on:editSchoolRollList="editSchoolRollList"
                                v-on:deleteSchoolRollList="deleteSchoolRollList"
                                :schoolRoll="schoolRoll">
                        </student-school-roll-list>
                        <yd-page ref="studentSchoolRollPage" url="/schoolRoll/list" :params="params"
                                       @changePage="changeSchoolRoll"></yd-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="学校奖励信息" name="second">
                    <div class="yd-bg common-pd">
                        <el-row class="yd-common-search">
                            <div class="fl">
                                <!-- <el-form :inline="true" :model="formOption">
                                    <el-form-item label="扩展信息 :">
                                        <el-select v-model="formOption.user">
                                            <el-option label="一年级" value="1"></el-option>
                                            <el-option label="二年级" value="2"></el-option>
                                            <el-option label="三 年级" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(2)">查询</el-button>
                                    </el-form-item>
                                </el-form> -->
                            </div>
                            <div class="fr pr">
                                <div @click="addStudentExtend(2)" class="yd-add-btn"></div>
                            </div>
                        </el-row>
                        <student-reward-list
                                v-on:editRewardList="editRewardList"
                                v-on:deleteRewardList="deleteRewardList"
                                :studentReward="studentReward"></student-reward-list>
                        <yd-page ref="studentRewardPage" url="/studentReward/list" :params="params"
                                       @changePage="changeStudentReward"></yd-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="学校惩罚信息" name="third">
                    <div class="yd-bg common-pd ">
                        <el-row class="yd-common-search">
                            <div class="fl">
                                <!-- <el-form :inline="true" :model="formOption">
                                    <el-form-item label="扩展信息 :">
                                        <el-select v-model="formOption.user">
                                            <el-option label="一年级" value="1"></el-option>
                                            <el-option label="二年级" value="2"></el-option>
                                            <el-option label="三 年级" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(3)">查询</el-button>
                                    </el-form-item>
                                </el-form> -->
                            </div>
                            <div class="fr pr">
                                <div @click="addStudentExtend(3)" class="yd-add-btn"></div>
                            </div>
                        </el-row>
                        <student-punishment-list
                                v-on:editPunishmentList="editPunishmentList"
                                v-on:deletePunishmentList="deletePunishmentList"
                                :studentPunishment="studentPunishment"></student-punishment-list>
                        <yd-page ref="studentPunishmentPage" url="/studentPunishment/list" :params="params"
                                       @changePage="changeStudentPunishment"></yd-page>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="自定义信息" name="fourth">
                    <div class="yd-bg common-pd ">
                        <el-row class="yd-common-search">
                            <div class="fl">
                                <!-- <el-form :inline="true" :model="formOption">
                                    <el-form-item label="扩展信息 :">
                                        <el-select v-model="formOption.user">
                                            <el-option label="一年级" value="1"></el-option>
                                            <el-option label="二年级" value="2"></el-option>
                                            <el-option label="三 年级" value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="内容 :">
                                        <el-input v-model="formOption.content"></el-input>
                                    </el-form-item>
                                    <el-form-item class="item-button item-">
                                        <el-button type="primary" @click="searchStudentsList(4)">查询</el-button>
                                    </el-form-item>
                                </el-form> -->
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
                <add-student-school-roll
                        :is_edit="is_edit"
                        ref="studentSchoolRoll"
                        :form="studentSchoolRollForm"
                        v-on:receivesSchoolRoll="receivesSchoolRoll"
                        v-on:editSchoolRoll="editSchoolRoll">
                </add-student-school-roll>
            </div>
            <div v-if="type =='2'">
                <add-student-reward
                        :is_edit="is_edit"
                        ref="studentReward"
                        :form="studentRewardForm"
                        v-on:receivesReward="receivesReward"
                        v-on:editReward="editReward">
                </add-student-reward>
            </div>
            <div v-if="type=='3'">
                <add-student-punishment
                        :is_edit="is_edit"
                        ref="studentPunishment"
                        :form="studentPunishmentForm"
                        v-on:receivesPunishment="receivesPunishment"
                        v-on:editPunishment="editPunishment">
                </add-student-punishment>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitStudentExtend">确 定</el-button>
                <el-button @click="resetStudentExtend">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    //展示
    import studentRewardList from '../../components-page/educational/student-info/student-reward-list'
    import studentSchoolRollList from '../../components-page/educational/student-info/student-schoolRoll-list'
    import studentPunishmentList from '../../components-page/educational/student-info/student-punishment-list'
    //新增
    import addStudentReward from '../../components-page/educational/student-info/student-reward-add'
    import addStudentSchoolRoll from '../../components-page/educational/student-info/student-schoolRoll-add'
    import addStudentPunishment from '../../components-page/educational/student-info/student-punishment-add'

    export default {
        name:"manage-students-extend",
        components:{
            studentRewardList,
            studentSchoolRollList,
            studentPunishmentList,
            addStudentReward,
            addStudentSchoolRoll,
            addStudentPunishment
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
                schoolRoll:[],
                studentReward:[],
                studentPunishment:[],
                //修改传递数据
                studentSchoolRollForm:{}, //1 学籍异动
                studentRewardForm:{}, //2学校奖励
                studentPunishmentForm:{}, //3学校惩罚
                //是否编辑
                is_edit:false,
                params:{
                    limit:20,
                    page:1,
                    // condition:'测试'
                },
                type:'1', //1 学籍异动 2学校奖励 3学校惩罚 4自定义信息
                title:'',
            }
        },
        methods:{
            handleClick(tab,event) {
                // console.log(tab.name);
            },
            addStudentExtend(type) { //1 学籍异动 2学校奖励 3学校惩罚 4自定义信息
                this.type = type
                if (this.type == '1') {
                    this.title = '新增学籍异动'
                    this.is_edit = false
                    this.studentSchoolRollForm = {}
                } else if (this.type == 2) {
                    this.title = '新增学校奖励'
                    this.is_edit = false
                    this.studentRewardForm = {}
                } else if (this.type == 3) {
                    this.title = '新增学校惩罚'
                    this.is_edit = false
                    this.studentPunishmentForm = {}
                }
                this.dialogVisible = true
            },
            submitStudentExtend() {
                if (this.type == '1') {
                    this.$refs.studentSchoolRoll.submitInfoForm();
                } else if (this.type == 2) {
                    this.$refs.studentReward.submitInfoForm()
                } else if (this.type == 3) {
                    this.$refs.studentPunishment.submitInfoForm()
                }
            },
            //公共刷新数据
            refreshCommonList() {
                this.dialogVisible = false
                this.$refs.studentSchoolRollPage.getData()
                this.$refs.studentRewardPage.getData()
                this.$refs.studentPunishmentPage.getData()
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
            receivesSchoolRoll(data) { //新增学籍异动
                this.commonReceivesList('/schoolRoll/add',data)
            },
            receivesReward(data) { //新增学校奖励
                this.commonReceivesList('/studentReward/add',data)
            },
            receivesPunishment(data) { //新增学校惩罚
                this.commonReceivesList('/studentPunishment/add',data)
            },
            //提交编辑
            editSchoolRoll(data) {
                this.commonEditList('/schoolRoll/update',data)
            },
            editReward(data) {
                this.commonEditList('/studentReward/update',data)
            },
            editPunishment(data) {
                this.commonEditList('/studentPunishment/update',data)
            },
            // 删除
            deleteSchoolRollList(data) {
                this.commonDeleteList('/schoolRoll/delete',{schoolRollId:data})
            },
            deleteRewardList(data) {
                this.commonDeleteList('/studentReward/delete',{studentRewardId:data})
            },
            deletePunishmentList(data) {
                this.commonDeleteList('/studentPunishment/delete',{studentPunishmentId:data})
            },
            //接收编辑传递的数据
            editSchoolRollList(data) {
                this.title = '修改学籍异动'
                this.type = 1
                this.is_edit = true
                this.studentSchoolRollForm = data
                this.dialogVisible = true
            },
            editRewardList(data) {
                this.title = '修改学校奖励'
                this.type = 2
                this.is_edit = true
                this.studentRewardForm = data
                this.dialogVisible = true
            },
            editPunishmentList(data) {
                this.title = '修改学校惩罚'
                this.type = 3
                this.is_edit = true
                this.studentPunishmentForm = data
                this.dialogVisible = true
            },
            //查询
            searchStudentsList(type) {//查询类型 1 学籍异动 2学校奖励 3学校惩罚 4自定义信息

            },
            //查询学生异动信息
            changeSchoolRoll(data) {
                this.schoolRoll = data
            },
            //查询学生奖励信息
            changeStudentReward(data) {
                this.studentReward = data
            },
            //查询学生惩罚信息
            changeStudentPunishment(data) {
                this.studentPunishment = data
            }
        }
    }
</script>

<style scoped>

</style>
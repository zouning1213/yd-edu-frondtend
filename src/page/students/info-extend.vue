<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-handle"></i></div>
                <h3>扩展信息</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <!--<p>更新时间: 2019年6月12日</p>-->
            </el-col>
        </el-row>
        <div class="yd-teacher-extend common-pd yd-bg"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="学籍异动信息" name="first">
                    <div class="mt-30 yd-common-table">
                        <school-changes :schoolChanges="schoolChanges"></school-changes>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="学校奖励" name="second">
                    <div class="mt-30 yd-common-table">
                        <school-punish :schoolPunish="schoolPunish"></school-punish>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="学校惩罚" name="third">
                    <div class="mt-30 yd-common-table">
                        <school-reward :schoolReward="schoolReward"></school-reward>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import schoolChanges from '../../components-page/students/student-table-changes'
    import schoolPunish from '../../components-page/students/student-table-punish'
    import schoolReward from '../../components-page/students/student-table-reward'

    export default {
        name:"extend-info",
        components:{
            schoolChanges,
            schoolPunish,
            schoolReward
        },
        data() {
            return {
                activeName:'first',
                schoolChanges:[],
                schoolPunish:[],
                schoolReward:[],
            }
        },
        created() {
            this.getSchoolChanges()
            this.getSchoolPunish()
            this.getSchoolReward()
        },
        methods:{
            handleClick(tab,event) {
                // console.log(tab,event);
            },
            //获取学籍异动信息
            getSchoolChanges() {
                let xsid = JSON.parse(localStorage.getItem("user")).xsid
                this.$GET("/schoolRoll/listByUser",{account:xsid}).then((res) => {
                    this.schoolChanges = res.data
                })
            },
            //获取学校奖励
            getSchoolPunish() {
                let xsid = JSON.parse(localStorage.getItem("user")).xsid
                this.$GET("/studentReward/listByUser",{account:xsid}).then((res) => {
                    this.schoolPunish = res.data
                })
            },
            //学校惩罚信息
            getSchoolReward() {
                let xsid = JSON.parse(localStorage.getItem("user")).xsid
                this.$GET("/studentPunishment/listByUser",{account:xsid}).then((res) => {
                    this.schoolReward = res.data
                })
            }
        },
    }
</script>

<style scoped>

</style>
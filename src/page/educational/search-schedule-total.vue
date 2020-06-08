<template>
    <!--总课表查-->
    <div style='margin-top: 20px'>
        <!--  <el-row class="yd-router-title yd-bg">
              <div class="title-icon icon-skin"><i class="yd icon-class-management"></i></div>
              <h3>课表查询</h3>
          </el-row>-->
        <div class="yd-bg" :style="{'minHeight':(this.$store.state.minClientHeight - 102) + 'px'}">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="班级总课表" name="first">
                    <div ref="bjPrint" class="common-pd">
                        <yd-schedule v-if="bjParams.keys!=''" ref="bjYdSchedule" :params="bjParams"></yd-schedule>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="教师总课表" name="second">
                    <div ref="jsPrint" class="common-pd">
                        <yd-schedule v-if="jsParams.keys!=''" ref="jsYdSchedule" :params="jsParams"></yd-schedule>
                    </div>
                </el-tab-pane>
              <!--  <el-tab-pane label="教室总课表" name="three">
                    <div ref="jshPrint" class="common-pd">
                        <yd-schedule v-if="jshParams.keys!=''" ref="jshYdSchedule"
                                     :params="jshParams"></yd-schedule>
                    </div>
                </el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ydSchedule from '../../components-page/schedule/yd_schedule_total'

    export default {
        name:"search-schedule-total",
        components:{
            ydSchedule
        },
        data() {
            return {
                activeName:'first',
                bjParams:{
                    mark:'classInfo',
                    keys:'',
                    appendSelfStudy:'1',//是否显示自习课 参数暂未使用到
                },
                jsParams:{
                    mark:'teacherInfo',
                    keys:'',
                    appendSelfStudy:'1',//是否显示自习课 参数暂未使用到
                },
                jshParams:{
                    mark:'classRoom',
                    keys:'',
                    appendSelfStudy:'1',//是否显示自习课 参数暂未使用到
                },
            }
        },
        created() {
            this.$GET('/classInfo/list',{limit:9999,page:1}).then((res) => {
                if (res.code == 200) {
                    let arry = []
                    res.data.forEach(item => {
                        arry.push(item.bjid)
                    })
                    this.bjParams.keys = arry.join(',')
                    // console.log(this.bjParams)

                } else {
                    this.$message.error(res.message)
                }
            })
            this.$GET('/teacherInfo/list',{limit:9999,page:1}).then((res) => {
                // console.log(res)
                if (res.code == 200) {
                    let arry = []
                    res.data.forEach(item => {
                        arry.push(item.jsid)
                    })
                    this.jsParams.keys = arry.join(',')
                    // console.log(this.jsParams)
                } else {
                    this.$message.error(res.message)
                }
            })
            this.$GET('/classRoom/list',{limit:9999,page:1}).then((res) => {
                if (res.code == 200) {
                    let arry = []
                    res.data.forEach(item => {
                        arry.push(item.jsh)
                    })
                    this.jshParams.keys = arry.join(',')
                    // console.log(this.jshParams)
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        methods:{
            checkedBjId(bjid) {
                this.bjParams.keys = bjid
                this.$refs.bjYdSchedule.getData()

            },
            checkedJsId(jsid) {
                this.jsParams.keys = jsid
                this.$refs.jsYdSchedule.getData()
            },
            checkedJsh(jsh) {
                this.jshParams.keys = jsh
                this.$refs.jshYdSchedule.getData()
            },
        }
    }
</script>

<style scoped lang="less">

</style>
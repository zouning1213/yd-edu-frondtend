<template>
    <div style='margin-top: 20px'>
        <!-- <el-row class="yd-router-title yd-bg">
             <div class="title-icon icon-skin"><i class="yd icon-class-management"></i></div>
             <h3>课表查询</h3>
         </el-row>-->
        <div class="yd-bg">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="按班级查询" name="first">
                    <div class="common-pd yd-common-flex ">
                        <div class="common-left-tree">
                            <yd-select-bjid v-on:checkedBjId="checkedBjId"></yd-select-bjid>
                        </div>
                        <div class="common-right-table"
                             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
                            <!--课表-->
                            <div v-if="bjParams.keys">
                                <yd-schedule ref="bjYdSchedule" :params="bjParams"></yd-schedule>
                            </div>
                            <div v-else class="no-checked-tree">
                                <img src="@/assets/no-tip-img/no-checked-tree.png"/>
                                <p class="font-skin">请先选择左侧的班级树</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="按教师查询" name="second">
                    <div class="common-pd yd-common-flex ">
                        <div class="common-left-tree">
                            <yd-select-jsid v-on:checkedJsId="checkedJsId"></yd-select-jsid>
                        </div>
                        <!--课表-->
                        <div class="common-right-table"
                             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
                            <!--课表-->
                            <div v-if="jsParams.keys">
                                <yd-schedule ref="jsYdSchedule" :params="jsParams"></yd-schedule>
                            </div>
                            <div v-else class="no-checked-tree">
                                <img src="@/assets/no-tip-img/no-checked-tree.png"/>
                                <p class="font-skin">请先选择左侧的教师树</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
              <!--  <el-tab-pane label="按教室查询" name="three">
                    <div class="common-pd yd-common-flex">
                        <div class="common-left-tree">
                            <yd-select-jsh v-on:checkedJsh="checkedJsh"></yd-select-jsh>
                        </div>
                        &lt;!&ndash;课表&ndash;&gt;
                        <div class="common-right-table"
                             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
                            &lt;!&ndash;课表&ndash;&gt;
                            <div v-if="jshParams.keys">
                                <yd-schedule ref="jshYdSchedule" :params="jshParams"></yd-schedule>
                            </div>
                            <div v-else class="no-checked-tree">
                                <img src="@/assets/no-tip-img/no-checked-tree.png"/>
                                <p class="font-skin">请先选择左侧的教室树</p>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import ydSelectBjid from '../../components-page/select/yd-tree-bjid'
    import ydSelectJsid from '../../components-page/select/yd-tree-jsid'
    import ydSelectJsh from '../../components-page/select/yd-tree-jsh'
    import ydSchedule from '../../components-page/schedule/yd_schedule_black'

    export default {
        name:"educational-schedule",
        components:{
            ydSelectBjid,
            ydSelectJsid,
            ydSelectJsh,
            ydSchedule,
        },
        data() {
            return {
                activeName:'first',
                bjParams:{
                    mark:'classInfo',
                    keys:'',
                    name:'班级课表'
                },
                jsParams:{
                    mark:'teacherInfo',
                    keys:'',
                    name:'教师课表'
                },
                jshParams:{
                    mark:'classRoom',
                    keys:'',
                    name:'教室课表'
                },
            }
        },
        mounted() {

        },
        methods:{
            checkedBjId(bjid) {
                this.bjParams.keys = bjid
                this.$nextTick(() => {
                    this.$refs.bjYdSchedule.getSchedule()
                })
            },
            checkedJsId(jsid) {
                this.jsParams.keys = jsid
                this.$nextTick(() => {
                    this.$refs.jsYdSchedule.getSchedule()
                })
            },
            checkedJsh(jsh) {
                this.jshParams.keys = jsh
                this.$nextTick(() => {
                    this.$refs.jshYdSchedule.getSchedule()
                })
            },
        }
    }
</script>

<style scoped lang="less">
    .no-checked-tree {
        text-align: center;
        padding-top: 13%;
        img {
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
        }
    }
</style>
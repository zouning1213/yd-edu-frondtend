<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-schedule"></i></div>
                <h3>课程表查询</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <!--<p>更新时间: 2019年6月12日</p>-->
            </el-col>
        </el-row>
        <div class="yd-bg common-pd yd-common-flex">
            <div class="common-left-tree">
                <yd-select-bjid v-on:checkedBjId="checkedBjId" :bjid='params.keys'></yd-select-bjid>
            </div>
            <div class="common-right-table">
                <div class="common-print hover-skin" @click="printContent">
                    <i class="yd icon-print"></i>
                </div>
                <!--课表-->
                <div ref="print" :style="{'minHeight':(this.$store.state.minClientHeight-225)+'px'}">
                    <yd-schedule ref="ydSchedule" :params="params"></yd-schedule>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ydSelectBjid from '../../components-page/select/yd-tree-bjid'
    import ydSchedule from '../../components-page/schedule/yd_schedule_gray'

    export default {
        name:"schedule",
        props:['year','is_edit'],
        components:{
            ydSelectBjid,
            ydSchedule
        },
        data() {
            return {
                search:'',
                options1:[],//学期下拉框
                options2:[],//年级下拉框
                options3:[],//班级下拉框
                params:{
                    // xlid:'0',
                    mark:'classInfo',
                    keys:'',
                },
            }
        },
        created() {
            this.params.keys = this.$store.state.userInfo.bjid
        },
        methods:{
            checkedBjId(bjid) {
                this.params.keys = bjid
                this.$refs.ydSchedule.getSchedule()
            },
            printContent() {
                this.$print(this.$refs.print) // 使用
            }
        },

    }
</script>

<style scoped lang="less">
</style>
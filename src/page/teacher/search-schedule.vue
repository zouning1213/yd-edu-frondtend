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
                <yd-select-jsid v-on:checkedJsId="checkedJsId" :jsid="params.keys"></yd-select-jsid>
            </div>
            <div class="common-right-table">
                <div class="common-print hover-skin" @click="printContent">
                    <i class="yd icon-print"></i>
                </div>
                <div ref="print" :style="{'minHeight':(this.$store.state.minClientHeight-225)+'px'}">
                    <!--课表-->
                    <yd-schedule ref="ydSchedule" :params="params"></yd-schedule>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ydSelectJsid from '../../components-page/select/yd-tree-jsid'
    import ydSchedule from '../../components-page/schedule/yd_schedule_gray'

    export default {
        name:"schedule",
        components:{
            ydSchedule,
            ydSelectJsid
        },
        data() {
            return {
                params:{
                    mark:'teacherInfo',
                    keys:'',
                },
            }
        },
        created() {
            this.params.keys = this.$store.state.userInfo.jsid
        },
        methods:{
            checkedJsId(jsid) {
                this.params.keys = jsid
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
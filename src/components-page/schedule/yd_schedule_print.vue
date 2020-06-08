<template>
    <!--打印单个课表-->
    <div class="yd-schedule-print el-row" ref="print">
        <div class="download-schedule">
            <!--<div class="download" @click="exportToExcel"><i class="yd icon-download"></i></div>-->
            <div class="print no-print" @click="printContent"><i class="yd icon-print"></i></div>
        </div>
        <el-col :span="20" :offset="2">
            <yd-schedule ref="ydSchedule" :params="this.$route.query"></yd-schedule>
        </el-col>
    </div>
</template>

<script>
    import '../../../static/css/global.css'
    import '../../page/css/common.less'
    import ydSchedule from './yd_schedule_black'

    export default {
        name:"yd-schedule-print",
        components:{
            ydSchedule
        },
        data() {
            return {
                params:this.$route.query
            }
        },
        methods:{
            printContent() {
                this.$print(this.$refs.print) // 使用
            }
        }
    }
</script>

<style scoped lang="less">
    .yd-schedule-print {
        padding-top: 40px;
        position: relative;
        .download-schedule {
            width: 60px;
            position: fixed;
            right: 20px;
            top: 40%;
            z-index: 999;
            .download, .print {
                width: 60px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background: url("img/schedule-bg.png") no-repeat;
                background-size: cover;
                margin-bottom: 10px;
                cursor: pointer;
                i {
                    font-size: 24px;
                    color: #fff;
                }
            }
        }
    }
</style>
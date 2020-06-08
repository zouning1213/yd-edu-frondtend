<template>
    <!--首页课程表展示-->
    <div class="yd-home-schedule">
        <div class="home-header clearfix">
            <div class="title-icon">
                <h3 class="fl">课程表</h3>
                <router-link :to="{name:$props.who=='ls'?'teacher_schedule':'students_schedule'}">
                    <i class="yd icon-19 fr"></i>
                </router-link>
            </div>
        </div>
        <div class="home-content height-360">
            <yd-schedule :params="studentParams"></yd-schedule>
        </div>
    </div>
</template>

<script>
    import ydSchedule from '../schedule/yd_schedule_gray'

    export default {
        name: 'home-schedule',
        props: ['studentParams', 'who'],
        components: {
            ydSchedule
        },
        data () {
            return {}
        },
        methods: {}
    }
</script>

<style lang="less">
    .yd-home-schedule {
        .home-content {
            padding-top: 10px !important;
            padding-bottom: 10px !important;
            .el-form {
                display: none;
            }
            .yd-schedule-grade {
                .schedule-table {
                    .table-head {
                        th {
                            padding: 8px 0;
                        }
                    }

                    .table-body {
                        .schedule-block {
                            min-height: 46px;
                        }
                    }
                }
            }
        }
    }
</style>
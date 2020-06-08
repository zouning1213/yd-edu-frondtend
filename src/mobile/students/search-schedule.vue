<template>
    <div class="mobile-common-warp bg-F3F5F7">
        <div class="mobile-common-header">
            <teacher-head :title-name="bjmc + '课程表'"></teacher-head>
        </div>
        <div class="mobile-common-main">
            <div class="mobile-student-schedule">
                <mobile-schedule :params="params"></mobile-schedule>
            </div>
        </div>
    </div>
</template>

<script>
    import teacherHead from '@/components-mobile/teacher-head.vue'
    import mobileSchedule from '../../components-mobile/schedule/mobile_schedule_gray'

    export default {
        name:"schedule",
        components:{
            teacherHead,
            mobileSchedule
        },
        data() {
            return {
                bjmc:this.$store.state.userInfo.bjmc,
                params:{
                    mark:'classInfo',
                    keys:'',
                },
            }
        },
        created() {
            this.params.keys = this.$store.state.userInfo.bjid
        },
        methods:{

        },
    }
</script>

<style scoped lang="less">
    .mobile-student-schedule {
        width: 100%;
        margin-top: 10px;
        padding-right: 2px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    }
</style>
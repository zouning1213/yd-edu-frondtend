<template>
    <div class="mobile-common-warp bg-F3F5F7">
        <div class="mobile-common-header">
            <teacher-head :title-name="zgxm + '课程表'"></teacher-head>
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
                zgxm:this.$store.state.userInfo.name,
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

        },

    }
</script>

<style scoped lang="less">
</style>

<template>
    <div class="arranging-schedule-box clearfix">
        <div class="schedule-filter-new">
            <div class="el-row filter-item">
                <el-col :span="2"><span class="tip">选择类型:</span></el-col>
                <el-col :span="20">
                    <ul class="checked-ul">
                        <li @click="changeMark('classInfo')" :class="{active:mark =='classInfo'}">班级</li>
                        <li @click="changeMark('teacherInfo')" :class="{active:mark =='teacherInfo'}">教师</li>
                        <li @click="changeMark('classRoom')" :class="{active:mark =='classRoom'}">教室</li>
                    </ul>
                </el-col>
            </div>
            <!--班级-->
            <template v-if="mark =='classInfo'">
                <select-class-info ref="selectClassInfo"></select-class-info>
            </template>
            <!--教师-->
            <template v-if="mark =='teacherInfo'">
                <select-teacher ref="selectTeacher"></select-teacher>
            </template>
            <!--教室-->
            <template v-if="mark =='classRoom'">
                <select-class-room ref="selectClassRoom"></select-class-room>
            </template>
        </div>
    </div>
</template>

<script>
    import selectTeacher from '../arranging/select-teacher'
    import selectClassInfo from '../arranging/select-classInfo'
    import selectClassRoom from '../arranging/select-classRoom'

    export default {
        name:"arranging-schedule",
        components:{
            selectTeacher,
            selectClassInfo,
            selectClassRoom
        },
        data() {
            return {
                // 显示弹窗
                mark:'classInfo',
                year:this.$route.params.year,
                params:{
                    keys:'',
                    mark:'',
                    appendSelfStudy:'0', //0不显示 1显示
                    xlid:this.$route.params.xlid,
                    year:this.$route.params.year,
                    xq:this.$route.params.xq,
                    name:'',
                }
            }
        },
        methods:{
            changeMark(name) {
                this.mark = name
            },
        },
    }
</script>

<style scoped>

</style>
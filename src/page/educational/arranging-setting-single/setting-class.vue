<template>
    <div>
        <el-row>
            <el-radio-group v-model="active" style="margin-bottom: 5px;">
                <el-radio-button label="0">按教师调课</el-radio-button>
                <el-radio-button label="1">按班级调课</el-radio-button>
            </el-radio-group>
        </el-row>
        <div v-show="active == 0 ">
            <adjust-teacher :weekindex="weekindex"
                            :weekName="weekName"
                            :days="days"
                            :rowSpan="rowSpan"
                            :rowName="rowName"
                            :year="year"></adjust-teacher>
        </div>
        <div v-show="active == 1 ">
            <adjust-class :weekindex="weekindex"
                          :weekName="weekName"
                          :days="days"
                          :rowSpan="rowSpan"
                          :rowName="rowName"></adjust-class>
        </div>
    </div>
</template>

<script>
    import adjustTeacher from './adjust-teacher'
    import adjustClass from './adjust-class'

    export default {
        name:"arranging-course-three",
        props:['year','weekindex','weekName','days','rowSpan','rowName'],
        components:{
            adjustTeacher,
            adjustClass
        },
        data() {
            return {
                active:0
            }
        },
        created() {
            //排课条件步骤
            if (localStorage.getItem('single_setting-class')) {
                this.active = localStorage.getItem('single_setting-class')
            } else {
                this.active = 0
            }
        },
        watch:{
            active(value) {
                localStorage.setItem('single_setting-class',value)
            }
        }
    }
</script>

<style scoped lang="less">

</style>
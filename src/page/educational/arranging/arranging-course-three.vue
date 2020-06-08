<template>
    <div>
        <!--选项卡-->
        <div class="arranging-common-tab">
            <el-button @click="active = 0" size="medium" :type="active == 0 ? 'primary' : ''">按教师调课</el-button>
            <el-button @click="active = 1" size="medium" :type="active == 1 ? 'primary' : ''">按班级调课</el-button>
        </div>
        <div v-show="active == 0 ">
            <adjust-teacher :year="year"></adjust-teacher>
        </div>
        <div v-show="active == 1 ">
            <adjust-class :year="year"></adjust-class>
        </div>
    </div>
</template>

<script>
    import adjustTeacher from './adjust-teacher'
    import adjustClass from './adjust-class'

    export default {
        name:"arranging-course-three",
        props:['year'],
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

        },
        methods:{}
    }
</script>

<style scoped lang="less">

</style>
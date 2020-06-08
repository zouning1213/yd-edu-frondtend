<template>
    <!--首页-->
    <div class="yd-warp-home">
        <!-- 中间主体 -->
        <div class="home-block-wrap clearfix">
            <el-row :gutter="20">
                <draggable @update="datadragEnd" :options="{animation:500}">
                    <transition-group>
                        <!-- 校历 -->
                        <el-col :lg="12" :xl="12" key="1">
                            <div class="home-block">
                                <homeSchoolName :who="`xs`"></homeSchoolName>
                            </div>
                        </el-col>
                        <!-- 最新公告 -->
                        <el-col :lg="12" :xl="12" key="2">
                            <div class="home-block">
                                <homeNotice :who="`xs`"></homeNotice>
                            </div>
                        </el-col>
                        <el-col :lg="12" :xl="12" key="3">
                            <div class="home-block">
                                <home-schedule
                                        who="xs"
                                        :studentParams="{mark: 'classInfo',keys: this.$store.state.userInfo.bjid}">
                                </home-schedule>
                            </div>
                        </el-col>
                        <!-- 留言板新 -->
                        <el-col :lg="12" :xl="12" key="4">
                            <div class="home-block" key="4">
                                <homeMessagebox :who="`xs`"></homeMessagebox>
                            </div>
                        </el-col>
                    </transition-group>
                </draggable>
            </el-row>
            <!-- 任务待办 -->
            <el-row class="home-block">
                <homeMyToDoList :who="`xs`"></homeMyToDoList>
            </el-row>
        </div>
        <div class="home-footer-copyright"> 教务数据管理系统 <span class="version-number">
            {{version}}{{versionName}}</span> Copyright {{copyright}} All rights reserved.
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import '../../components-page/home/css/home.less'
    import homeSchoolName from '../../components-page/home/home-schoolName'
    import homeMessagebox from '../../components-page/home/home-messagebox-new'
    import homeNotice from '../../components-page/home/home-notice'
    import homeMyToDoList from '../../components-page/home/home-task-list'
    import homeSchedule from '../../components-page/home/home-schedule'

    export default {
        name: 'home',
        components: {
            homeSchoolName,
            draggable,
            homeMessagebox,
            homeNotice,
            homeMyToDoList,
            homeSchedule
        },
        data () {
            return {
                search: '',
                version: '',
                versionName: '',
                copyright: ''
            }
        },
        created () {
            this.version = setting.version
            this.versionName = setting.versionName
            this.copyright = setting.copyright
        },
        methods: {
            getdata (evt) {
                // console.log(evt.draggedContext.element.text)
            },
            datadragEnd (evt) {
                evt.preventDefault()
                // console.log('拖动前的索引 :' + evt.oldIndex)
                // console.log('拖动后的索引 :' + evt.newIndex)
            }
        },
        mounted () {
            //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault()
                event.stopPropagation()
            }
        }
    }
</script>

<style lang="less">

</style>


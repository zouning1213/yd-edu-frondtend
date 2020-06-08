<template>
    <!--首页-->
    <div class="yd-warp-home">
        <!-- 中间主体 -->
        <div class="home-block-wrap clearfix">
            <el-row :gutter="20">
                <draggable @update="datadragEnd" :options="{animation:500}">
                    <transition-group>
                        <!-- 学校 -->
                        <el-col :lg="12" :xl="12" key="1">
                            <div class="home-block">
                                <homeSchoolName :who="`jw`"></homeSchoolName>
                            </div>
                        </el-col>
                        <!-- 基本信息 -->
                        <el-col :lg="12" :xl="12" key="2">
                            <div class="home-block">
                                <homeMessageInfo :who="`jw`"></homeMessageInfo>
                            </div>
                        </el-col>
                        <!-- 最新公告 -->
                        <el-col :lg="12" :xl="12" key="3">
                            <div class="home-block">
                                <homeNotice :who="`jw`"></homeNotice>
                            </div>
                        </el-col>
                        <!-- 留言板 -->
                        <el-col :lg="12" :xl="12" key="4">
                            <div class="home-block">
                                <homeMessagebox :who="`jw`"></homeMessagebox>
                            </div>
                        </el-col>
                    </transition-group>
                </draggable>
            </el-row>
            <!-- 任务待办 -->
            <el-row class="home-block">
                <homeMyToDoList :who="`jw`"></homeMyToDoList>
            </el-row>
        </div>
        <div class="home-footer-copyright"> 教务数据管理系统 <span class="version-number">{{version}}{{versionName}}</span>
            Copyright {{copyright}} All rights reserved.
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import '../../components-page/home/css/home.less'
    import homeNotice from '../../components-page/home/home-notice'
    import homeMessagebox from '../../components-page/home/home-messagebox-new'
    import homeSchoolName from '../../components-page/home/home-schoolName'
    import homeMessageInfo from '../../components-page/home/home-info'
    import homeMyToDoList from '../../components-page/home/home-task-list'

    export default {
        name: 'educationalHome',
        components: {
            draggable,
            homeMessagebox,
            homeNotice,
            homeSchoolName,
            homeMessageInfo,
            homeMyToDoList,
        },
        data () {
            return {
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
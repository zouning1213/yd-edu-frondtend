<template>
    <div class="yd-student-design">
        <el-row class="yd-router-title yd-bg">
            <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
            <h3>开始评教</h3>
        </el-row>
        <div class="common-pd yd-bg" :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-row v-if="is_design && loading" :gutter="20" class="yd-margin-right">
                <el-col :span="12" class="design-block" v-for="(item,index) in list" :key="index">
                    <div class="grid-content">
                        <h3>{{item.rwmc}}</h3>
                        <p>评教时间段：{{item.pjkssj.substring(0,10)}} ~ {{item.pjjssj.substring(0,10)}}</p>
                        <div class="mb-10"><label>{{item.rwms ||'暂无任务描述'}}</label></div>
                        <router-link :to="{name:'student_design_join',params:{rwid:item.rwid}}">
                            <el-button type="primary">开始评教</el-button>
                        </router-link>
                    </div>
                </el-col>
            </el-row>
            <div class="no-design-tip" v-else-if="!is_design && loading"
                 :style="{'minHeight':(this.$store.state.minClientHeight-234)+'px'}">
                <!--<img src="./img/evaluation-design.png"/>-->
                <p>当前暂无评教或者是未到开放评教时间</p>
            </div>
        </div>
    </div>
</template>

<script>
    import './css/student-design.less'

    export default {
        name:"test",
        data() {
            return {
                loading:false,
                is_design:false,
                list:[]
            }
        },
        created() {
            this.$GET('/evaluationTask/listByXs').then((res) => {
                if (res.code == 200) {
                    this.list = res.data
                    this.is_design = true
                }
                this.loading = true
            })
        },
        mounted() {

        },
        methods:{}
    }
</script>

<style scoped lang="less">

</style>

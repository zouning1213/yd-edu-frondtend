<template>
    <div class="teacher-talent-plan">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-plan"></i></div>
                <h3>人才培养</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="按标题关键字搜索" v-model="search"
                          @keyup.enter.native="searchBy" class="input-with-select">
                    <el-button slot="append" @click="searchBy">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="yd-margin-right clearfix">
            <talent-plan-list :talentList="talentList"></talent-plan-list>
        </div>
        <yd-page   ref="ydPage" url="/geniusInfo/list" @changePage="changePage"
                       :params="{condition:this.search}"></yd-page>
    </div>
</template>

<script>
    import talentPlanList from '../../components-page/common/talent-plan-list'


    export default {
        name:"talent-plan",
        components:{
            talentPlanList,
        },
        data() {
            return { 
                search:'',
                talentList:[]
            }
        },
        methods:{
            changePage(data) {
                this.talentList = data
            },
            searchBy() { 
                this.$refs.ydPage.getData('search')
            }
        }
    }
</script>

<style scoped>

</style>
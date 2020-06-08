<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-article"></i></div>
                <h3>通知公告查询</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入通知公告标题" v-model="search"
                          @keyup.enter.native="searchBy" class="input-with-select">
                    <el-button slot="append" @click="searchBy">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="yd-margin-right">
            <article-list :articleList="articleList"></article-list>
            <yd-page ref="ydPage" url="/notice/list" @changePage="changePage"
                           :params="{px:'desc',isOpen:'N',condition:this.search}"></yd-page>
        </div>
    </div>
</template>

<script>
    import articleList from '../../components-page/common/article-list'

    export default {
        name:"article_text",
        components:{
            articleList
        },
        data() {
            return {
                search:'',
                articleList:[],
            }
        },

        methods:{
            changePage(data) {
                this.articleList = data
            },
            searchBy() {
                this.$refs.ydPage.getData('search')
            }
        }
    }
</script>

<style scoped>

</style>
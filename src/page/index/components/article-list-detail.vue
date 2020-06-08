<template>
    <!--通知公告列表详情-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col>
                <div class="title-icon icon-skin"><i class="yd icon-plan"></i></div>
                <h3>通知公告列表详情</h3>
            </el-col>
            <!--  <el-col :span="12" class="text-right">
                  <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                      <el-button slot="append">搜索</el-button>
                  </el-input>
              </el-col>-->
        </el-row>
        <div class="common-pd yd-bg">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'teacher_article' }">通知公告查询</el-breadcrumb-item>
                <el-breadcrumb-item>通知公告列表详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="search-talent-detail">
                <div class="talent-title"><h3>{{detail.title}}</h3></div>
                <div class="talent-content">
                    <p v-html="detail.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"article-detail",
        data() {
            return {
                detail:{}
            }
        },
        created() {
            this.$GET('/notice/detail/' + this.$route.params.id).then((res) => {
                // console.log(res.data)
                this.detail = res.data
            })
        }
    }
</script>

<style scoped lang="less">
    .search-talent-detail {
        padding: 40px 64px;
        .talent-title {
            text-align: center;
            margin-bottom: 40px;
            h3 {
                font-size: 20px;
                color: #333;
                font-weight: 550;
            }
        }
        .talent-content {
            font-size: 15px;
            color: #333;
        }
    }
</style>
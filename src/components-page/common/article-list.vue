<template>
    <!--通知公告列表组件-->
    <div class="clearfix">
        <!--无图片的时候-->
        <div class="article-list" v-for="(item,index) in articleList" :key="index">
            <!--<router-link :to="{name:'article_list_detail',params:{id:item.noticeId}}" class="yd-bg">-->
            <div class="article-item yd-bg" @click="toArticleDetail(item.noticeId)">
                <!--有图片的时候-->
                <div v-if="item.imgUrl != '' " class="article-content display-flex">
                    <div class="article-info">
                        <div style="width: 100%">
                            <h3>{{item.title}}</h3>
                            <p class="line-3">{{item.contentText}}</p>
                        </div>
                    </div>
                    <div class="article-banner"
                         :style="{backgroundImage:'url('+ ((server + '/'+ item.imgUrl)||require('@/assets/no-tip-img/no-article-banner.png'))+')'}">
                    </div>
                </div>
                <!--没图片的时候-->
                <div v-else class="article-content">
                    <h3 class="line-1">{{item.title}}</h3>
                    <p class="line-3">{{item.contentText}}</p>
                </div>
                <el-row class="article-time">
                    <el-col :span="12">
                        <ul>
                            <li><img :src="item.tx"/><span>发表人：{{item.createrName}}</span></li>
                            <!-- <li><img src="./img/eye.png"/><span>浏览量：2000次</span></li> -->
                        </ul>
                    </el-col>
                    <el-col :span="12" class="text-right">
                        <p><i class="el-icon-time"></i>发布时间: {{item.createTime | cutOutDate}}</p>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"article-list",
        props:['articleList'],
        data() {
            return {
                server:''
            }
        },
        created() {
            this.server = setting.remoteHost
        },
        methods:{
            toArticleDetail(articleId) {
                this.$router.push({
                    name:'article_list_detail',
                    params:{
                        id:articleId
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .article-list {
        width: 50%;
        height: 183px;
        float: left;
        padding-right: 20px;
        margin-bottom: 20px;
        .article-item {
            padding: 20px 20px;
            -webkit-transition: all 0.4s;
            -moz-transition: all 0.4s;
            -ms-transition: all 0.4s;
            -o-transition: all 0.4s;
            transition: all 0.4s;
            cursor: pointer;
            &:hover {
                -webkit-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                -moz-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                -webkit-transform: translateY(-10px);
                -moz-transform: translateY(-10px);
                -ms-transform: translateY(-10px);
                -o-transform: translateY(-10px);
                transform: translateY(-10px);
            }
        }
        .display-flex {
            display: flex;
            margin-bottom: 14px !important;
        }
        .article-content {
            margin-bottom: 24px;
            max-height: 108px;
            overflow: hidden;
            h3 {
                font-size: 16px;
                color: #333;
                line-height: 20px;
                margin-bottom: 10px;
                /*white-space: nowrap;*/
                overflow: hidden;
                text-overflow: ellipsis;
            }
            p {
                min-height: 60px;
                font-size: 14px;
                color: #999;
            }
            .article-banner {
                width: 192px;
                height: 108px;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .article-info {
                flex: 1;
                padding-right: 20px;
            }
        }
        .article-time {
            ul {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                li {
                    display: inline-block;
                    padding-right: 20px;
                    img {
                        height: 16px;
                        margin-right: 4px;
                    }
                }
            }
            span, p {
                font-size: 12px;
                color: #CCC;
            }
            p {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                i {
                    margin-right: 4px;
                    font-size: 16px;
                    vertical-align: text-bottom;
                }
            }
        }
    }
</style>
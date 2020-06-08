<template>
    <!-- 手机通知公告查询的公共 -->
    <!-- <articleList :articleList="articleList"></articleList> -->
    <div class="mobile-common-List ">
        <div class="common-list" v-for="(item,index) in articleList" :key="index">
            <router-link :to="{name:'article_list_detail',params:{id:item.noticeId}}">
                <div class="list-content">
                    <!--有图片的时候-->
                    <template v-if="item.imgUrl != ''">
                        <van-row>
                            <div style="width: 108px;float: left">
                                <van-image
                                        width="124px"
                                        height="71px"
                                        fit="cover"
                                        :src="server + '/'+ item.imgUrl"/>
                            </div>
                            <div style="width: calc(100% - 139px);float: right">
                                <h2 class="line-1">{{item.title}}</h2>
                                <p class="line-2">{{item.contentText || '暂无内容'}}</p>
                            </div>
                        </van-row>
                    </template>
                    <!--没图片的时候-->
                    <template v-else>
                        <h2 class="line-1">{{item.title}}</h2>
                        <p class="line-2">{{item.contentText || '暂无内容'}}</p>
                    </template>
                    <van-row class="mt-16 article-time" type="flex" justify="space-between">
                        <van-col span="8">
                            <yd-author :name="item.createrName" width="22" style="margin-right: 8px"></yd-author>
                            {{item.createrName}}
                        </van-col>
                        <van-col span="16" class="text-right">
                            <span>发布时间:</span>{{item.createTime}}
                        </van-col>
                    </van-row>
                </div>
            </router-link>
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
    }
</script>

<style scoped lang="less">
    .article-time {
        color: #999;
        span {
            margin-right: 8px;
        }
    }
</style>
<template>
    <!--通知公告列表详情-->
    <div style="width:100%"> 
             <!-- <h3>手机通知公告列表详情</h3>  -->
        <div class="common-pd yd-bg">
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
<template>
<!-- 人才培养计划 -->
        <div> 
            <div class="home-header clearfix">
                <div class="title-icon">
                    <i class="yd icon-plan fl icon-skin-Color"></i>
                    <h3 class="fl">人才培养计划</h3> 
                        <router-link :to="{path:'/educational/manage/talent-plan'}">
                                <i  class="el-icon-more fr"></i>
                        </router-link> 
                </div>   
            </div> 
            <div class="home-content talent-plan-content">
                <ul>
                    <li v-for="(item,index) in tableData" :key="index">
                        <!-- <router-link :to="{path: '/article/list/detail/'+item.noticeId}"> -->
                        <router-link :to="{name:'talent_list_detail',params:{id:item.jhh}}"> 
                            <span class="text-left line-1"><i :class="{teaPlanTt:true,colorOrange:index%1==0,colorBlue:index%2==0,colorGreen:index==0}">{{item.zymc}}</i>{{item.bt}}</span>
                            <div class="fr text-right"> 
                                <!-- <span class="isread">未读 </span> -->
                                <span>{{item.fbsj|cutDate}}</span>
                            </div>
                        </router-link> 
                    </li> 
                </ul>
            </div>
        </div>  
</template>

<script>
    export default {
        name:'home-Telentplan',
        props:["who"],
        data() {
            return {
                tableData:[]
            }
        },
        created() {
            this.$GET('geniusInfo/list',{limit:5,page:1}).then((res) => {
                // console.log("人才培养计划")
                // console.log(res)
                this.tableData = res.data
            })
        },
        filters:{
            cutDate(time) {
                let date = new Date(time)
                return (date.getMonth() + 1) + "月" + date.getDate() + "日"
            }
        }
    }
</script>

<style lang="less" scoped>
    .talent-plan-content{
        .teaPlanTt {
            display: inline-block;
            padding: 0 10px;
            margin-right: 10px;
            border-radius: 11px;
            -webkit-border-radius: 11px;
            -moz-border-radius: 11px;
        }

        .colorOrange {
            background-color: #FFF5E4;
            color: #FF5549;
        }

        .colorBlue {
            background-color: #E0F2FF;
            color: #4996FF;
        }

        .colorGreen {
            background: rgba(227, 255, 245, 1);
            color: #3E7857;
        }
    }
</style>
<template>
    <!-- 首页校历 /educational/manage/seniority-->
    <div>
        <div class="home-header clearfix">
            <div class="title-icon">
                <i class="yd icon-school-calendar fl icon-skin"></i>
                <h3 class="fl">校历</h3>
                <router-link v-if="$props.who=='jw'" :to="{path:'/educational/manage/seniority'}">
                    <i class="el-icon-more fr"></i>
                </router-link>
                <i v-if="$props.who!='jw'" class="el-icon-more fr"></i>
            </div>
        </div>
        <div class="home-content">
            <div class="content-calendar clearfix">
                <div class="content-calendar-left fl">
                    <!-- <img src="./img/user.png" alt=""> -->
                    <div class="img">
                        <i class="yd icon-semester-o"></i>
                    </div>
                    <h2 style="font-weight:700;line-height:50px">{{tableData.xlxq}}</h2>
                    <span>{{tableData.qssj|cutDate}}~{{tableData.jssj|cutDate}}</span>
                </div>
                <div class="content-calendar-right fl">
                    <h4 style="font-weight:700">学期事件：</h4>
                    <ul>
                        <li v-for="(item,index) in tableData1" :key="index">
                            <span class="line-1">{{item.sjmc}}</span><span
                                class="fr">
                                    <!-- {{item.sjqssj.replace(/-/g,'.')}} -->
                                    {{item.sjqssj|cutOutDate('zntime22')}}
                                </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'home-Schoolcalendar',
        props:['who'],
        data() {
            return {
                tableData:[],
                tableData1:[],

            }
        },
        created() {
            this.$GET('/schoolCalendar/currentTermEvents').then((res) => {
                this.tableData = res.data.currentTerm
                this.tableData1 = res.data.currentTermEvents
            })
        },
        filters:{
            cutDate(time) {
                let date = new Date(time)
                return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
            }
        }
    }
</script>

<style lang="">

</style>
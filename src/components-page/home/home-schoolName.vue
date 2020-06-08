<template>
    <div class="home-schoolName height-346">
        <div class="schoolName-header bg-skin">
                <span class="istime time-left">
                    <span class="now-time">{{nowTime}}</span>
                    <p class="now-yearmounth">当前时间</p>
                </span>
                <span class="school-name-title">{{schoolName}}</span>
                <span class="istime time-right">
                    <span class="now-time">{{nowDate}}</span><br>
                    <span class="now-yearmounth">{{nowYear}}/{{nowMonth}}</span>
                    <p class="now-yearmounth">{{nowWeek}}</p>
                </span>  
        </div>
        <div class="schoolName-content">
            <ul>
                <li class="content-top clearfix"> 
                    <div class="content-top-toux">
                        <!-- <img src="" alt="">  -->
                        <span class="no-tx"><span>{{xm.slice(0,2)}}</span></span> 
                    </div>
                    <div class="content-top-content">
                        <h3>{{xm}}{{who=='xs'?'同学':who=="ls"?'老师':''}}  欢迎来到教务系统</h3>
                        <p>上次登录：2012.04.21 15:12:20   IP:1233456</p>
                    </div>
                </li>
                <li class="content-bottom ">
                    <div class="content-bottom-toux toux-first">
                        <i class="yd icon-calendar fl  mr-10"></i>
                        <span class="isflex">
                            <p>{{tableData.currentYear}}-{{tableData.currentYear+1}}学年第{{tableData.currentTerm=='01'?'一':tableData.currentTerm=='02'?'二':''}}学期</p>
                            <span class="first-span">{{tableData.startDate|cutOutDate('zntime3')}}~{{tableData.endDate|cutOutDate('zntime3')}}</span>
                        </span>
                    </div>
                    <div class="content-bottom-toux toux-second">
                        <i class="yd icon-benzhou fl  mr-10"></i>
                        <span class="isflex">
                            <p>第{{tableData.currentWeek}}周</p> 
                        </span>
                    </div>
                    <div class="content-bottom-toux toux-third">
                        <i class="yd icon-ziyuanxhdpi fl  mr-10"></i>
                        <span class="isflex">
                            <p>教务数据管理系统 </p>
<!--                            <span class="third-span">欢迎您的使用</span>-->
                        </span>
                        
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'home-Notice',
        props:["who"],
        data() {
            return {
                tableData:[],
                nowTime:'',
                nowYear:'',
                nowMonth:'',
                nowWeek:'',
                nowDate:'',
                xm:'',
                schoolName:''
            }
        },
        created() {
            this.schoolName = setting.schoolName

            this.$GET('/schoolCalendar/currentCalandar').then((res) => {
                this.tableData = res.data
            })
            this.getNowDate()
        },
        beforeMount(){
            if(this.who=='jw'){ 
                this.xm = JSON.parse(localStorage.getItem("user")).name
            }else{
                this.xm = JSON.parse(localStorage.getItem("user")).xm 
            }
            
        },
        methods:{
            getNowDate(){
                let date = new Date()
                this.nowTime = this.fill(date.getHours())+":"+this.fill(date.getMinutes())
                this.nowYear = date.getFullYear()
                this.nowDate = this.fill(date.getDate())
                this.nowMonth = this.fill(date.getMonth()+1)
                this.nowWeek = this.getWeek(date)
            },
            fill(num) {
                if (num < 10) {
                    return "0" + num;
                } else {
                    return num;
                }
            },
            getWeek(date) {
                var week;
                if(date.getDay() == 0) week = "星期日"
                if(date.getDay() == 1) week = "星期一"
                if(date.getDay() == 2) week = "星期二"
                if(date.getDay() == 3) week = "星期三"
                if(date.getDay() == 4) week = "星期四"
                if(date.getDay() == 5) week = "星期五"
                if(date.getDay() == 6) week = "星期六"
                return week;
            }
        },
        filters:{
            // cutDate(time) {
            //     let date = new Date(time)
            //     return (date.getMonth() + 1) + "月" + date.getDate() + "日"
            // }
        }
    }
</script>

<style lang="less" scope> 
.home-schoolName{
    .schoolName-header{
        padding: 20px 35px 20px 20px;
        // background-color: #3262EC;
        text-align: center; 
        display: flex;
        align-items: center;
        Justify-content:space-between;
        .school-name-title{ 
            text-align: center;
            color: #ffffff;
            font-size: 26px;
        }
        .istime{
            display: inline-block;
            // width: 100px;
            color: #ffffff;
        }
        .time-left{
            float: left;
            text-align: left;
        }
        .time-right{
            float: right;
            text-align: right;
        }
        .now-time{
            font-size: 20px;
        }
        .now-yearmounth{
            font-size: 12px;
        }
    }
    .schoolName-content{
        li{
            // padding: 52px 33px;
            padding:  33px;
            border-bottom: 1px solid rgba(237,240,246,1);
            &:last-child{
                border-bottom: none;
            }
        }
        .content-top{
            .content-top-toux{ 
                float: left;
                width: 44px;
                height: 44px;
                margin-right: 10px;
                img{
                    width: 44px;
                    height: 44px;
                }
                .no-tx{
                    display: inline-block;
                    width: 44px;
                    height: 44px;
                    border-radius: 4px;
                    background-color: #3262EC;
                    text-align: center;
                    color: #ffffff;
                    span{
                        line-height: 44px;
                    }
                }
            }
            .content-top-content{
                float: left;
                h3{
                    font-size: 16px;
                    font-weight: 700;
                }
                p{
                    font-size: 12px;
                    color: #ccc;
                    line-height: 23px;
                }
            }
        }
        .content-bottom{
            display: flex;
            justify-content: space-between;
            .content-bottom-toux{ 
                float: left;
                display: inline-block;
                height: 45px;
                i{ 
                    float: left;
                    font-size: 45px;
                }
                p{
                    font-size: 17px;
                }
            }
            .isflex{
                display: flex;
                height: 45px;
                flex-direction:column;
                justify-content: space-around;
            }
            .toux-first{ 
                i{
                    color: #4EA1FF;
                }
                .first-span{
                    font-size: 12px;
                    color: #666;
                }
            }
            .toux-second{ 
                i{
                    color: #FF7B8B;
                }
            }
            .toux-third{ 
                i{
                    color: #FFCB27;
                }
                .third-span{
                    color: #F45064;
                }
            }
        }
        .mr-10 {
            margin-right: 10px;
        }
    }
}
</style>
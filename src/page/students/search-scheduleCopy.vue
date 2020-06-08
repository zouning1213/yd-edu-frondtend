<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-schedule"></i></div>
                <h3>课程表查询</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <p>更新时间: 2019年6月12日</p>
            </el-col>
        </el-row>
        <div class="yd-bg common-pd">
            <div class="yd-common-search">
                <el-form ref="form" :inline="true" :model="form">
                    <el-form-item label="学校学期:">
                        <el-select v-model="form.region">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业:">
                        <el-select v-model="form.region">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择级数:">
                        <el-select v-model="form.region">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <table border="1" cellpadding="0" cellspacing="0" class="TableTop" width="100%">
                <thead>
                <tr>
                    <th class="FistRow" width="14%" colspan="2">
                        <span class="ColLeft">{{weekDate.title.timeTitle}}</span>
                        <span class="ColRight">{{weekDate.title.weekTitle}}</span>
                    </th>
                    <th class="FistRow" v-for="(val,index) in weekDate.week" :key="index">
                        <span class="ColLeft">{{val.WeekBay}}</span>
                        <span class="ColRight">{{val.DateRun}}</span>
                    </th>
                </tr>
                </thead>
                <tbody v-for="(time,key) in timeDate" :key="key">
                <template v-for="(quantum,index) in timeDate[key].timeList">
                    <tr :key="index">
                        <td :key="'two'+index">{{quantum.quantumTime}}</td>
                        <td
                                :key="'one'+index"
                                :rowspan="timeDate[key].rowspan"
                                v-if="index == 0"
                        >{{quantum.quantumName}}
                        </td>
                        <td
                                v-for="(active,index1) in timeDate[key].activeList"
                                :key="'active'+index1"
                        >{{active.count}}
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name:"schedule",
        data() {
            return {
                search:"",
                form:{
                    name:"",
                    region:"",
                    date1:"",
                    date2:"",
                    delivery:false,
                    type:[],
                    resource:"",
                    desc:""
                },
                startTime:"8:00",
                endTime:"21:00",
                noon:"12:00",
                night:"18:00",
                weekMap:[
                    "星期日",
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六"
                ],
                weekDate:{
                    title:{
                        timeTitle:"时间",
                        weekTitle:"周"
                    },
                    week:[]
                },
                timeDate:{
                    morning:{
                        rowspan:0,
                        timeList:[],
                        activeList:[]
                    },
                    noon:{
                        rowspan:0,
                        timeList:[],
                        activeList:[]
                    },
                    night:{
                        rowspan:0,
                        timeList:[],
                        activeList:[]
                    }
                },
                activeData:{
                    0:[
                        {
                            title:"大学计算机—计算思维",
                            start_time:"8:30",
                            end_time:"9:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        }
                    ],
                    1:[
                        {
                            title:"大学计算机—计算思维",
                            start_time:"8:30",
                            end_time:"9:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        }
                    ],
                    2:[
                        {
                            title:"大学计算机—JAVA",
                            start_time:"8:30",
                            end_time:"9:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        },
                        {
                            title:"大学计算机—前端",
                            start_time:"11:00",
                            end_time:"12:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        }
                    ],
                    3:[
                        {
                            title:"大学计算机—PHP",
                            start_time:"14:30",
                            end_time:"16:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        }
                    ],
                    4:[
                        {
                            title:"大学计算机—PHP",
                            start_time:"14:30",
                            end_time:"16:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        }
                    ],
                    5:[
                        {
                            title:"大学计算机—PHP",
                            start_time:"14:30",
                            end_time:"16:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        }
                    ],
                    6:[
                        {
                            title:"大学计算机—PHP",
                            start_time:"14:30",
                            end_time:"16:00",
                            place:"3号教学楼1508室",
                            teacher:"张伟教师"
                        }
                    ]
                }
            };
        },
        created() {
            this.setWeekDate();
            this.setTimeData();
            this.setActiveList();
        },
        methods:{
            onSubmit() {
                // console.log("submit!");
            },
            //让 8:00 格式化为 480
            getMinuteFn(hour) {
                let minute = hour.split(":");
                return minute[0] * 60 + Number(minute[1]);
            },
            //让 480 格式化为 8:00
            getHourFn(minute) {
                let hour = parseInt(minute / 60);
                minute = minute - 60 * hour;
                hour = hour < 10? "0" + hour :hour;
                minute = minute < 10? "0" + minute :minute;
                return hour + ":" + minute;
            },

            //设置X轴
            setWeekDate() {
                let arr = this.utils.getWeekday();
                arr.forEach((item,index) => {
                    let obj = {
                        WeekBay:this.weekMap[index],
                        DateRun:item
                    };
                    this.weekDate.week.push(obj);
                });
            },

            //设置Y轴
            setTimeData() {
                let noon = this.getMinuteFn(this.noon);
                let night = this.getMinuteFn(this.night);
                let start = this.getMinuteFn(this.startTime);
                let end = this.getMinuteFn(this.endTime);
                for (let now = start; now <= end; now = now + 30) {
                    let obj = {quantumName:"",quantumTime:""};
                    obj.quantumTime = this.getHourFn(now);
                    let key = "morning";
                    if (now < noon) {
                        obj.quantumName = "上午";
                    } else if (now >= night) {
                        obj.quantumName = "晚上";
                        key = "night";
                    } else {
                        obj.quantumName = "中午";
                        key = "noon";
                    }
                    this.timeDate[key].timeList.push(obj);
                }
                this.timeDate.morning.rowspan = this.timeDate.morning.timeList.length;
                this.timeDate.noon.rowspan = this.timeDate.noon.timeList.length;
                this.timeDate.night.rowspan = this.timeDate.night.timeList.length;
            },

            //获取两个时间相隔的长度 9:00 - 10:00  2
            getStepFn(begin,end) {
                begin = this.getMinuteFn(begin);
                end = this.getMinuteFn(end);
                let step = 0;
                for (let index = begin; index < end; index += 30) {
                    step++;
                }
                return step;
            },

            //设置活动事件
            setActive(quantum) {
                // this.activeData.forEach(item => {
                //     if (item.start_time) {

                //     }
                // });
                this.weekDate.week.forEach((item,index1) => {
                    //判断事件的时间长度是多少 9:00 - 10:00  2
                    // console.log(item);
                    let obj = {row:1,count:1 + "-" + index1};
                    this.timeDate[quantum].activeList.push(obj);
                });
            },
            //获取活动信息
            setActiveList() {
                for (let key in this.timeDate) {
                    this.setActive(key);
                }
            }
        }
    };
</script>

<style scoped>
    .IputSpacing {
        margin-left: 20px;
    }

    .TableTop {
        text-align: center;
        border-color: rgba(204, 204, 204, 0.4);
        border-collapse: collapse;
        border-width: 0px;
    }

    .ColLeft {
        position: absolute;
        top: 5px;
        left: 5px;
    }

    .FistRow {
        position: relative;
        height: 60px;
        background: rgba(240, 243, 247, 1);
    }

    .ColRight {
        position: absolute;
        right: 5px;
        bottom: 5px;
    }

    .HeightBar {
        height: 80px;
    }

    .StyleColor {
        background: #eb5870;
    }

    .sta {
        width: 100%;
        background: #f0f3f7ff;
        height: 120px;
        position: absolute;
        top: 0;
        line-height: 33px;
    }

    .FouSet {
        position: relative;
    }

    .IconLess {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .RowUl {
        border-bottom: 1px solid #f3f5f7ff;
        margin-bottom: 10px;
        padding-bottom: 10px;
        font-size: 12px;
        color: #999999ff;
    }

    .ImgSet {
        margin-right: 8px;
    }

    .ColorTitle {
        color: #333333ff;
        font-size: 18px;
    }

    .LiStyle {
        font-size: 13px;
        color: #333333ff;
    }

    .ImgRight {
        position: absolute;
        right: 0;
        bottom: 0;
    }

    .liuser {
        text-align: center;
        color: #333333ff;
    }

    th {
        color: #333333ff;
        font-weight: bolder;
        font-size: 14px;
    }
</style>
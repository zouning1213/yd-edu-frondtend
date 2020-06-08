<template>
    <!--单个 课时设置-->
    <div class="yd-common-flex arranging-setting-time">
        <div class="common-left-tree">
            <el-form ref="form" label-width="64px" size="mini">
                <div class="title">设置教学课时</div>
                <div class="set-block arranging-setting-color">
                    <div class="text">每周上课天数</div>
                    <el-checkbox-group v-model="days" @change="changeDays">
                        <div class="mb-10" v-for="(item,index) in weekOption" :key="index">
                            <el-checkbox :label="parseInt(item.code)" name="type">{{item.name}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
                <div class="set-block">
                    <div class="text">每天上课节数</div>
                    <template v-for="(item,index) in dayOption">
                        <el-form-item :label="item.name + ':'">
                            <el-select v-model="time[index]" placeholder="请选择活动区域">
                                <el-option :value="0" label="无"></el-option>
                                <el-option v-for="(item,index) in option" :key="index"
                                           :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </div>
                <div>
                    <el-button>取消</el-button>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </div>
            </el-form>
        </div>
        <div class="common-right-table">
            <div class="arranging-common-table">
                <table>
                    <thead>
                    <tr class="bg-skin border-skin">
                        <th width="80"></th>
                        <th width="80"></th>
                        <th v-for="item in days">{{weekName[item-1]}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item,index) in dayOption">
                        <tr v-if="time[index] != 0" v-for="(jc,index2) in time[index]">
                            <td v-if="index2 == 0" :rowspan="time[index]">{{item.name}}</td>
                            <td>{{getTableId(index) + index2+1}}</td>
                            <td v-for="(xq,index3) in days"><!--{{index3+1}}{{getTableId(index) + index2+1}}--></td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"setting-time",
        props:[
            'pkjhid'
        ],
        data() {
            return {
                planid:this.$route.params.planid,
                weekName:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
                option:[ //节数
                    {name:'1节',code:1},
                    {name:'2节',code:2},
                    {name:'3节',code:3},
                    {name:'4节',code:4},
                ],
                //生成课表第一种方法
                days:[], //选中的星期
                weekOption:[], //星期下拉
                dayOption:[], //节数的数据
                time:[], // 选中的节数
                //生成课表的第二种方法
                rowSpan:[], //跨列数
                rowName:[],
                weekindex:[],
            }
        },
        created() {
            //获取已保存的数据
            this.getTable()

            //获取每周上课结束选项
            this.$POST('/system/dictList/WEEKCODE').then(res => {
                this.weekOption = res
            })

            //获取每周上课选项
            this.$POST('/system/dictList/PKSJQJ').then(res => {
                this.dayOption = res
            })
        },
        methods:{
            getTable() {
                this.rowspan = []
                //获取保存的数据
                this.$POST('/timesheetPlan/timeSheetTable',{planid:this.planid}).then(res => {
                    if (res.code == 200) {
                        this.days = res.data.days || [1,2,3,4,5]
                        this.time = res.data.time
                        this.weekindex = res.data.weekindex
                    }
                })
            },

            getTableId(index) {
                var id = 0
                this.time.forEach((item2,index2) => {
                    if (index2 < index) {
                        id += parseInt(item2)
                    }
                })
                return id
            },

            changeDays() {
                this.days.sort((a,b) => a - b) // 对星期进行排序
            },

            onSubmit() {
                let params = {
                    days:this.days,
                    time:this.time
                }
                this.$POST('/timesheetPlan/update',{sjap:JSON.stringify(params),pkjhid:this.planid}).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'保存成功'
                        })

                        this.$emit('success')

                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .arranging-setting-time {
        .title {
            font-size: 16px;
            color: #333333;
            position: relative;
            padding-left: 14px;
            margin-bottom: 16px;
            &:before {
                content: '';
                width: 3px;
                height: 14px;
                position: absolute;
                left: 0;
                top: 4px;
                background-color: #999;
            }
        }
        .set-block {
            background-color: #F3F5F7;
            padding: 10px 6px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            margin-bottom: 20px;
            .text {
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #333333;
                background-color: #fff;
                padding: 0 20px;
                font-weight: 550;
                margin-bottom: 20px;
            }
            .el-checkbox-group {
                padding-left: 20px;
            }
            .el-form-item {
                margin-bottom: 10px;
            }
        }
        .arranging-common-table {
            padding: 10px 19px;
            background-color: #EEEEEE;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            margin-top: 38px;
        }
    }

</style>
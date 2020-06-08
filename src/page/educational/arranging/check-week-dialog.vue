<template>
    <!--选择区间周-->
    <div class="arranging-week-dialog">
        <ul class="tab-ul">
            <li :class="{'active':order.zllx ==2}" @click="order.zllx =2">连续周</li>
            <li :class="{'active':order.zllx ==3}" @click="order.zllx =3">区间周</li>
        </ul>
        <!--添加连续周-->
        <div v-if="order.zllx ==2" class="tab-content">
            <!--添加区间周-->
            <div class="setting-week el-row">
                <ul class="el-col-22">
                    <li class="el-row" v-for="(item,index) in order.regionList" :key="index">
                        <el-col :span="22" class="border">
                            <el-col :span="3"><label>开始周:</label></el-col>
                            <el-col :span="8"><input type="number" placeholder="请输入开始周" v-model="item.ksz"/>
                            </el-col>
                            <el-col :span="3"><label>结束周:</label></el-col>
                            <el-col :span="8"><input type="number" placeholder="请输入结束周" v-model="item.jsz"/>
                            </el-col>
                        </el-col>
                        <!--{{order.regionList.length}}-->
                        <el-col v-show="order.regionList.length > 1" :span="2" class="del-week">
                            <i class="el-icon-remove-outline" @click="delWeek(index)"></i>
                        </el-col>
                    </li>
                </ul>
                <div class="add-week hover-skin" @click="addWeek">
                    <i class="el-icon-circle-plus-outline"></i>
                </div>
            </div>
        </div>
        <div v-if="order.zllx ==3" class="tab-content">
            <!--添加区间周-->
            <div class="setting-week el-row">
                <ul class="el-col-22">
                    <li class="el-row" v-for="(item,index) in order.regionList" :key="index">
                        <el-col :span="22" class="border">
                            <el-col :span="3"><label>开始周:</label></el-col>
                            <el-col :span="9"><input type="number" placeholder="请输入开始周" v-model="item.ksz"/>
                            </el-col>
                            <el-col :span="3"><label>结束周:</label></el-col>
                            <el-col :span="9"><input type="number" placeholder="请输入结束周" v-model="item.jsz"/>
                            </el-col>
                        </el-col>
                        <!--{{order.regionList.length}}-->
                        <el-col v-show="order.regionList.length > 1" :span="2" class="del-week">
                            <i class="el-icon-remove-outline" @click="delWeek(index)"></i>
                        </el-col>
                    </li>
                </ul>
                <div class="add-week hover-skin" @click="addWeek">
                    <i class="el-icon-circle-plus-outline"></i>
                </div>
            </div>
            <div class="text-right el-col-20" style="margin-bottom: 20px">
                <el-button size="mini" @click='createWeek'>生成周次</el-button>
            </div>
            <div v-if="weeks.length !=''">
                <el-form ref="form" label-position="right" :inline="true" label-width="100px">
                    <!--选择状态-->
                    <el-form-item label="选择排课类型">
                        <el-radio-group v-model="order.pkfs" @change="changePkfs">
                            <el-radio label="0">默认</el-radio>
                            <el-radio label="1">单凸</el-radio>
                            <el-radio label="2">双凸</el-radio>
                            <el-radio label="3">前压</el-radio>
                            <el-radio label="4">后压</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否接收调剂" style="margin-left: 40px">
                        <el-radio-group v-model="order.xttj">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <table v-if="weeks[order.pkfs].zc != '' && weeks[order.pkfs].jc" class="show-week-table">
                    <thead>
                    <tr>
                        <th>周次</th>
                        <th v-for="(item,index) in weeks[order.pkfs].zc" :key="index">
                            <span>{{item}}</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>节次</td>
                        <td v-for="(item,index) in weeks[order.pkfs].jc" :key="index">
                            <!--  <template v-if="order.pkfs == 0">
                                  <input type="number" v-model="parseInt(item)"/>
                              </template>-->
                            <span>{{item}}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"check-week-dialog",
        props:['row'],
        data() {
            return {
                order:{},
                weeks:[],
                zlsd:{
                    jc:'', //节次
                    zc:'', //周次
                    pkfs:'0', //排课状态
                    regionList:[ //区间周
                        {
                            ksz:'',
                            jsz:'',
                        }
                    ],
                    kss:null,
                    xttj:'1', //是否接收系统调制
                    zllx:3 //区间类型
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods:{
            getData() {
                console.log(this.row)
                this.order = this.row.zlsd == ''? this.zlsd :JSON.parse(this.row.zlsd)
                this.order.kss = this.row.kss
            },
            getWeeks() {
                console.log(this.row)
                this.$POST('/timesheetTask/createOrderDetail',this.order,
                    {
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }).then((res) => {
                    if (res.code == 200) {
                        Object.keys(res.data).forEach((item,index) => {
                            res.data[index].zc = res.data[index].zc.split(',')
                            res.data[index].jc = res.data[index].jc.split(',')
                        })
                        this.weeks = res.data
                    } else {
                        this.$message.error(res.message);
                    }

                })
            }
            ,
            changePkfs() {
                this.getWeeks()
            }
            ,
            createWeek() {
                this.order.regionList.forEach(item => {
                    if (item.ksz == '' && item.jsz == '') {
                        this.$message.error('请输入开始周跟结束周');
                    } else {
                        this.getWeeks()
                    }
                })
            }
            ,
            sendData() {
                this.order.regionList.forEach(item => {
                    if (item.ksz == '' && item.jsz == '') {
                        this.$message.error('请输入开始周跟结束周');
                    }
                    else if (this.order.zllx == 3) { //区间周
                        if (this.weeks == '') {
                            this.$message.error('请点击生成周次');
                        } else {
                            this.order.jc = this.weeks[this.order.pkfs].jc.join(',')
                            this.order.zc = this.weeks[this.order.pkfs].zc.join(',')
                            let row = this.row
                            row.zlsd = JSON.stringify(this.order)
                            row.yxj = this.order.regionList.length > 0? 2 :99
                            this.$emit('getWeekData',row)
                        }
                    }
                    else { //连续周
                        this.order.jc = ''
                        this.order.zc = ''
                        let row = this.row
                        row.zlsd = JSON.stringify(this.order)
                        row.yxj = this.order.regionList.length > 0? 2 :99
                        this.$emit('getWeekData',row)
                    }
                })
            }
            ,
            addWeek() {
                this.order.regionList.push({
                    ksz:'',
                    jsz:'',
                })
            }
            ,
            delWeek(index) {
                this.$delete(this.order.regionList,index,1)
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <!--手工固课-->
    <div class="arranging-course-dialog" style="padding-bottom: 0">
        <div class="title-tip el-row">
            <el-col :span="12">
                <h3>需要选中<span>{{row.kss}}</span>个课时 ,已选择
                    <span v-if="isSeries == '1'">{{checked.length*2}}</span>
                    <span v-if="isSeries == '0'">{{checked.length}}</span>
                    课时</h3>
            </el-col>
            <el-col :span="12" class="text-right">
                <el-button size="mini" @click="clearCheck">清空自己选的</el-button>
            </el-col>
        </div>
        <!--单周固课-->
        <div v-if="isNoWeek == '0'">
            <!--连堂-->
            <div v-if="isSeries == '1'" style="min-height: 500px">
                <el-checkbox-group v-model="checked" @change="changeCheck">
                    <table class="arranging-course-table">
                        <thead>
                        <tr>
                            <td style="width: 68px"><p>星期</p></td>
                            <template v-for="xq in xq_num">
                                <td :colspan="jc_num/2" class="bg-skin">
                                    <p>星期{{weekName[xq-1]}}</p>
                                </td>
                            </template>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="width: 68px"><p style="color: #333;font-size: 13px">节次</p></td>
                            <template v-for="xq in xq_num">
                                <td v-for="jc in jc_num/2">
                                    <p>{{xq}}{{jc*2-1}}{{xq}}{{jc*2}}</p>
                                </td>
                            </template>
                        </tr>
                        <tr v-for="(obj,zc) in tableData">
                            <td style="width: 68px">
                                <p style="color: #333;font-size: 13px">
                                    第{{zc+1 >= 10 ? zc+1 : '0' + (zc+1)}}周
                                </p>
                            </td>
                            <td v-for="(item, jc) in weekHours/2">
                                <template v-if="tableData[zc][jc] != undefined">
                                    <!--已被别人选的-->
                                    <p v-if="checkedList.includes(tableData[zc][jc].hh)" class="checked">
                                        {{rwhObject[tableData[zc][jc].hh]}}
                                    </p>
                                    <!--自己已选-->
                                    <template v-else-if="checked.includes(tableData[zc][jc].hh)">
                                        <el-checkbox :class="['active','bg-skin',
                                  row.ksxq.split(',').includes(tableData[zc][jc].hh) ? 'opacity' : '']"
                                                     :label="tableData[zc][jc].hh"
                                                     name="course">
                                            <p>{{row.rwh.toString().substring(4,8)}}</p>
                                        </el-checkbox>
                                    </template>
                                    <!--国家法定节假日-->
                                    <template v-else-if="tableData[zc][jc].zt == '-1'">
                                        <p class="disabled">0000</p>
                                    </template>
                                    <template v-else>
                                        <el-checkbox :label="tableData[zc][jc].hh" name="course"
                                                     :disabled="checked.length*2 >= row.kss">
                                            <p class="hover-skin">
                                                {{row.rwh.toString().substring(4,8)}}</p>
                                        </el-checkbox>
                                    </template>
                                </template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-checkbox-group>
            </div>
            <!--不连堂-->
            <div v-if="isSeries == '0'" style="min-height: 500px">
                <el-checkbox-group v-model="checked" @change="changeCheck">
                    <table class="arranging-course-table">
                        <thead>
                        <tr>
                            <td style="width: 68px"><p>星期</p></td>
                            <template v-for="xq in xq_num">
                                <td :colspan="jc_num" class="bg-skin">
                                    <p>星期{{weekName[xq-1]}}</p>
                                </td>
                            </template>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style="width: 68px"><p style="color: #333;font-size: 13px">节次</p></td>
                            <template v-for="xq in xq_num">
                                <td v-for="jc in jc_num">
                                    <p>{{xq}}{{jc}}</p>
                                </td>
                            </template>
                        </tr>
                        <tr v-for="(obj,zc) in tableData">
                            <td style="width: 68px">
                                <p style="color: #333;font-size: 13px">
                                    第{{zc+1 >= 10 ? zc+1 : '0' + (zc+1)}}周
                                </p>
                            </td>
                            <td v-for="(item, jc) in weekHours">
                                <template v-if="tableData[zc][jc] != undefined">
                                    <!--已被别人选的-->
                                    <p v-if="checkedList.includes(tableData[zc][jc].hh)" class="checked">
                                        {{rwhObject[tableData[zc][jc].hh]}}
                                    </p>
                                    <!--自己已选-->
                                    <template v-else-if="checked.includes(tableData[zc][jc].hh)">
                                        <el-checkbox :class="['active','bg-skin',
                                   row.ksxq.split(',').includes(tableData[zc][jc].hh) ? 'opacity' : '']"
                                                     :label="tableData[zc][jc].hh"
                                                     name="course">
                                            <p>{{row.rwh.toString().substring(4,8)}}</p>
                                        </el-checkbox>
                                    </template>
                                    <!--国家法定节假日-->
                                    <template v-else-if="tableData[zc][jc].zt == '-1'">
                                        <p class="disabled">0000</p>
                                    </template>
                                    <template v-else>
                                        <el-checkbox :label="tableData[zc][jc].hh" name="course"
                                                     :disabled="checked.length >= row.kss">
                                            <p class="hover-skin">
                                                {{row.rwh.toString().substring(4,8)}}</p>
                                        </el-checkbox>
                                    </template>
                                </template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-checkbox-group>
            </div>
        </div>
        <!--连续周固课-->
        <div v-if="isNoWeek == 1" class="isNoWeek">
            <el-checkbox-group v-model="checked" @change="changeCheck">
                <table class="arranging-course-table">
                    <thead>
                    <tr>
                        <td class="bg-skin" style="width: 68px;"><p>星期</p></td>
                        <template v-for="jc in this.weekHours /xq_num">
                            <td class="bg-skin">
                                <p>第{{jc}}节</p>
                            </td>
                        </template>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(obj,xq) in tableData">
                        <td style="width: 120px">
                            <p style="color: #333;font-size: 13px">
                                星期{{weekName[xq]}}
                            </p>
                        </td>
                        <td v-for="(item, jc) in obj">
                            <div style="min-height:48px">
                                <template v-if="item != undefined">
                                    <!--已被别人选的-->
                                    <p v-if="checkedList.includes(item.hh)" class="checked">
                                        {{rwhObject[item.hh]}}
                                    </p>
                                    <!--自己已选-->
                                    <template v-else-if="checked.includes(item.hh)">
                                        <el-checkbox :class="['active','bg-skin',
                                   row.ksxq.split(',').includes(item.hh) ? 'opacity' : '']"
                                                     :label="item.hh"
                                                     name="course">
                                            <p>{{row.rwh.toString().substring(4,8)}}</p>
                                        </el-checkbox>
                                    </template>
                                    <!--国家法定节假日-->
                                    <template v-else-if="item.zt == '-1'">
                                        <p class="disabled">0000</p>
                                    </template>
                                    <template v-else>
                                        <el-checkbox :label="item.hh" name="course"
                                                     :disabled="checked.length >= row.kss">
                                            <p class="hover-skin">
                                                {{row.rwh.toString().substring(4,8)}}</p>
                                        </el-checkbox>
                                    </template>
                                </template>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script>
    export default {
        name:"check-classHour-dialog",
        props:['row'],
        data() {
            return {
                //头部
                xq_num:5, //一个星期五天
                jc_num:null, //一天几节课
                isSeries:'', //是否连堂
                isNoWeek:'1', //0单周固课 1循环周固课
                weekHours:null,
                weekName:['一','二','三','四','五','六','七'],
                //头部结束
                tableData:[],
                rwhObject:{}, //已被选中的根据表格id 得到任务号
                checkedList:[], //已被选中
                checked:[],//当前选中
                selfObject:{}, //自己选中的任务号
                //鼠标事件
                flag:false
            }
        },
        mounted() {
            this.checked = []
            let params = {
                bh:this.row.bh,
                rwh:this.row.rwh
            }
            this.$GET('/timesheetTask/listTimeSheet/',params).then((res) => {
                if (res.code == 200) {
                    //设置头部
                    this.isSeries = res.data.isSeries  //是否连堂
                    this.weekHours = res.data.zks //周课时
                    this.jc_num = Math.ceil(this.weekHours / this.xq_num) //节次
                    this.isNoWeek = res.data.isNoWeek

                    if (this.isNoWeek == '1') { //循环周固课
                        let data = res.data.dataList[0]
                        var result = [];
                        for (var i = 0; i < data.length; i += this.weekHours / this.xq_num) {
                            result.push(data.slice(i,i + this.weekHours / this.xq_num));
                        }
                        this.tableData = result
                    } else { //单周固课
                        this.tableData = res.data.dataList
                        console.log(this.tableData)
                    }

                    //自己选的
                    this.checked = res.data.assignedSelf == ''? [] :res.data.assignedSelf.split(',')
                    this.checked.forEach((item,index) => {
                        if (item != '') {
                            this.selfObject[item] = this.row.rwh.toString().substring(4,this.row.rwh.length)
                        } else {
                            this.$delete(this.checked,index)
                        }
                    })
                    //已被选的
                    let checkedOther = res.data.assignedOther
                    checkedOther.forEach(obj => {
                        obj.ksxq.split(',').forEach(item => {
                            this.checkedList.push(item)
                            this.rwhObject[item] = obj.rwh.substring(4,obj.rwh.length)
                        })
                    })
                }
            })
        },
        methods:{
            changeCheck() {
                this.checked.forEach(item => {
                    this.selfObject[item] = this.row.rwh.toString().substring(4,this.row.rwh.length)
                })
            },
            clearCheck() {
                this.checked = []
            },
            MouseDown() {
                this.flag = true
            },
            MouseMove(even) {
                /* if (this.flag) {
                     // console.dir(even.target.getAttribute('dataId'))
                     if (even.target.getAttribute('dataId') != null) {
                         this.checked.push(even.target.getAttribute('dataId'))
                     }
                 }*/
            },
            /*  MouseEnter(id) {
                  if (this.flag && this.checked.length * 2 <= this.row.kss) {
                      if (this.checked.includes(id)) {
                          this.checked.splice(this.checked.indexOf(id),1);
                      } else {
                          this.checked.push(id)
                      }
                  }
              },*/
            MouseUp() {
                this.flag = false
            },
            sendData() {
                let row = this.row
                row.ksxq = this.checked.length > 0? this.checked.join(',') :this.checked.toString()
                row.yxj = this.checked.length > 0? 1 :99
                this.$emit('getClassHour',row)
            },
        },
    }
</script>

<style scoped>

</style>
<template>
    <!--选择任务约束-->
    <div v-if="loading">
        <!--单周固课约束-->
        <div v-if="isNoWeek == 0" style="min-height: 500px">
            <!--连堂-->
            <div v-if="isSeries == '1'">
                <el-checkbox-group v-model="checked">
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
                                <td v-for="jc in jc_num/2"><p style="color:#333">
                                    {{xq}}{{jc*2-1}}{{xq}}{{jc*2}}</p>
                                </td>
                            </template>
                        </tr>
                        <tr v-for="(obj,zc) in tableData">
                            <td style="width: 68px">
                                <p style="color: #333;font-size: 13px">
                                    第{{zc+1 >= 10 ? zc+1 : '0' + (zc+1)}}周
                                </p>
                            </td>
                            <td v-for="(item,jc) in weekHours/2">
                                <template v-if="tableData[zc][jc] != undefined">
                                    <!--已选-->
                                    <!--  <p v-if="checkedList.includes(tableData[zc][jc].hh)" class="checked">
                                          {{rwhObject[tableData[zc][jc].hh]}}
                                      </p>
                                      &lt;!&ndash;自己已选&ndash;&gt;
                                      <template v-else-if="checked.includes(tableData[zc][jc].hh)">
                                          <el-checkbox :class="['active','bg-skin',
                                        row.ksxq.split(',').includes(tableData[zc][jc].hh) ? 'opacity' : '']"
                                                       :label="tableData[zc][jc].hh"
                                                       name="course">
                                              <p>{{row.rwh.toString().substring(4,8)}}</p>
                                          </el-checkbox>
                                      </template>
                                      &lt;!&ndash;国家法定节假日&ndash;&gt;
                                      <template v-else-if="tableData[zc][jc].zt == '-1'">
                                          <p class="disabled">0000</p>
                                      </template>-->
                                    <!--可选-->
                                    <template v-if="checked.includes(tableData[zc][jc].hh)">
                                        <el-checkbox :class="['active','bg-skin']"
                                                     :label="tableData[zc][jc].hh"
                                                     name="course">
                                            <p>{{tableData[zc][jc].hh}}</p>
                                        </el-checkbox>
                                    </template>
                                    <template v-else>
                                        <el-checkbox :label="tableData[zc][jc].hh" name="course">
                                            <p class="hover-skin">{{tableData[zc][jc].hh}}</p>
                                        </el-checkbox>
                                    </template>
                                </template>
                                <p v-else class="disabled">000000</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-checkbox-group>
            </div>
            <!--不连堂-->
            <div v-if="isSeries == '0'">
                <el-checkbox-group v-model="checked">
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
                                <td v-for="jc in jc_num"><p style="color:#333">
                                    {{xq}}{{jc}}</p>
                                </td>
                            </template>
                        </tr>
                        <tr v-for="(obj,zc) in tableData">
                            <td style="width: 68px"><p style="color: #333;font-size: 13px">
                                第{{zc+1 >= 10 ? zc+1 : '0' + (zc+1)}}周</p></td>
                            <td v-for="(item,jc) in weekHours">
                                <template v-if="tableData[zc][jc] != undefined">
                                    <!--可选-->
                                    <template v-if="checked.includes(tableData[zc][jc].hh)">
                                        <el-checkbox :class="['active','bg-skin']"
                                                     :label="tableData[zc][jc].hh"
                                                     name="course">
                                            <p>{{tableData[zc][jc].hh}}</p>
                                        </el-checkbox>
                                    </template>
                                    <template v-else>
                                        <el-checkbox :label="tableData[zc][jc].hh" name="course">
                                            <p class="hover-skin">{{tableData[zc][jc].hh}}</p>
                                        </el-checkbox>
                                    </template>
                                </template>
                                <p v-else class="disabled">000000</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-checkbox-group>
            </div>
        </div>
        <!--连续周约束-->
        <div v-if="isNoWeek == 1" class="isNoWeek">
            <el-checkbox-group v-model="checked">
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
                                    <!--可选-->
                                    <template v-if="checked.includes(item.hh)">
                                        <el-checkbox :class="['active','bg-skin',
                                   row.ksxq.split(',').includes(item.hh) ? 'opacity' : '']"
                                                     :label="item.hh"
                                                     name="course">
                                            <p>{{item.hh}}</p>
                                        </el-checkbox>
                                    </template>
                                    <template v-else>
                                        <el-checkbox :label="item.hh" name="course">
                                            <p class="hover-skin">
                                                {{item.hh}}</p>
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
        name:"check-task-dialog",
        props:['row'],
        data() {
            return {
                loading:false,
                //头部
                xq_num:5, //一个星期五天
                jc_num:null, //一天3节课
                isNoWeek:'1', //0单周固课 1循环周固课
                isSeries:null,
                weekHours:this.$route.params.weekHours,
                weekName:['一','二','三','四','五','六','七'],
                checked:[],
                checkedList:[], //已选
                tableData:[],
            }
        },
        created() {
            this.getData()
            console.log(this.$props.row)
        },
        methods:{
            getData() {
                this.$GET('/timesheetTask/noKeylistTimeSheet').then((res) => {
                    // console.log(res.data)
                    this.isSeries = res.data.isSeries
                    this.weekHours = res.data.zks
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
                    }

                    if (this.row.ksxq != '') {
                        this.checked = this.row.ksxq.split(',')
                    }

                    this.loading = true

                })
            },
            sendData() {
                let row = this.row
                row.ksxq = this.checked.join(',')
                this.$emit('getTask',row)
                this.checkedList = []
                this.checked = []
            },
        }
    }
</script>

<style scoped>

</style>
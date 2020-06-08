<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-schedule"></i></div>
                <h3>成绩查询</h3>
            </el-col>
            <el-col :span="20" class="text-right no-print">
                <el-select style="width:280px" v-model="params.xq" @change="xqChange" placeholder="请选择考期">
                    <el-option v-for="(item,index) in xqOption"
                               :key="index"
                               :label="item.xlxq"
                               :value="item.xlid">
                        <div class="clearfix">
                            <div class="fl" style="display: inline-block">{{item.xlxq}}</div>
                            <div class="fr" style="display: inline-block">
                                {{item.qssj.substring(0,11) | cutOutDate}}
                                <span style="margin:0 8px;color: #999">至</span>
                                {{item.jssj.substring(0,11) | cutOutDate}}
                            </div>
                        </div>
                    </el-option>
                </el-select>
                <el-select style="width:280px" v-model="params.ksapids" placeholder="选择考试">
                    <el-option label="所有考试" value=""></el-option>
                    <el-option
                            v-for="item in ksOptions"
                            :key="item.ksapid"
                            :label="item.ksapmc"
                            :value="item.ksapid">
                    </el-option>
                </el-select>
                <el-button style="margin-left: 10px" type="primary" @click="onSubmit">查询</el-button>
                <el-button type="success" @click="printData">打印</el-button>
            </el-col>
        </el-row>
        <div class="common-pd yd-bg" :style="{'minHeight':(this.$store.state.minClientHeight-185)+'px'}">
            <div ref="print" class="yd-common-table" style="width: 100%">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                            prop="xqmc"
                            align="center"
                            label="学年学期">
                        <template slot-scope="scope">
                            <p>{{scope.row.xqmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="ksapmc"
                            align="center"
                            label="考试名称">
                        <template slot-scope="scope">
                            <p>{{scope.row.ksapmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="kcmc"
                            align="center"
                            label="课程名称">
                        <template slot-scope="scope">
                            <p>{{scope.row.kcmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="zhcj"
                            align="center"
                            label="成绩">
                        <template slot-scope="scope">
                            <p class="text-blue" v-if="scope.row.zhcj > 80">{{scope.row.zhcj||'-'}}</p>
                            <p v-else-if="scope.row.zhcj < 80" class="text-red">{{scope.row.zhcj||'-'}}</p>
                            <p v-else-if="scope.row.zhcj ==''">-</p>
                            <p v-else>{{scope.row.zhcj}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="skls"
                            align="center"
                            label="课程教师">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"grade",
        data() {
            return {
                search:'',
                params:{
                    xq:null,
                    xsid:this.$store.state.userInfo.xsid,
                    ksapids:''
                },
                xqOption:[],
                ksOptions:[],
                tableData:[]
            }
        },
        created() {

            //获取当前考期
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.xqOption = res.data || []
                this.getGrade()
                this.getXq()  
            }) 
        },
        methods:{
            xqChange() {
                this.$GET("/examArrange/selectlist/teachersearch",{xlid:this.params.xq}).then((res) => {
                    this.ksOptions = res.data
                })
            },
            getXq() {
                this.$GET('/schoolCalendar/currentCalandar').then((res) => {
                    if (res.code == 200) {
                        this.params.xq = parseInt(res.data.xlid)
                        this.xqChange()  
                    }
                })
            },
            getGrade() {
                this.$POST("/studentExamScore/scoreInfo",this.params).then((res) => {
                    this.tableData = res.data || []
                })
            },
            onSubmit() {
                this.getGrade()
            },
            //打印
            printData() {
                this.$print(this.$refs.print) // 使用
            },
        }
    }
</script>

<style scoped>

</style>
<template>
    <!--连堂设置-->
    <div class="setting-common-table">
        <div class="setting-title el-row">
            <!-- <el-col :span="16"><h3>展示为当前默认值</h3></el-col>
            <el-col :span="8">
                <el-input placeholder="请输入教师名称搜索" size="small" v-model="condition">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col> -->
            <el-col :span="24">
                <div  class="fr">  
                    <el-select size='small' style="width:131px"  v-model="isnfid" @change="yearChange" filterable placeholder="选择课程">
                            <el-option
                                    v-for="item in nfOptions"
                                    :key="item.xn"
                                    :label="item.xn+'级'"
                                    :value="item.xn">
                            </el-option>
                    </el-select>
                    <el-select size='small' style="width:131px" v-model="iszyid" @change="zyChange" filterable placeholder="选择专业"> 
                            <el-option
                                    v-for="item in zyOptions"
                                    :key="item.zyid"
                                    :label="item.zymc"
                                    :value="item.zyid">
                            </el-option>
                    </el-select>
                    <el-select size='small' style="width:131px" v-model="iskcid" @change="kcChange"  placeholder="选择课程"> 
                            <el-option
                                    v-for="item in kcOptions"
                                    :key="item.kcid"
                                    :label="item.kcmc"
                                    :value="item.kcid">
                            </el-option>
                    </el-select>
                </div>  
            </el-col> 
        </div> 
        <!-- <el-row class="arranging-common-select"> 
        </el-row> -->
        <div class="yd-common-table"> 
            <el-table
                :data="tableData"
                border   
                :max-height="this.$store.state.minClientHeight-245"  
                >
                <el-table-column
                    prop="kcmc"
                    align="center"
                    width="250"
                    label="课程(班级)">
                    <template slot-scope="scope">
                         {{scope.row.kcmc}}({{scope.row.bjmc}})
                    </template>
                </el-table-column>
                <el-table-column
                        prop="conum"
                        label="一天最长连上节数值"
                        align="center"> 
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.conum" @change="changeNoun(scope.row)">
                            <el-radio v-for="(item,index) in courseOption" :key="index"
                                      :label="item.code">{{item.name}}
                            </el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>  
        </div>
    </div>
</template>

<script>
    export default {
        name:"setting-course",
        data() {
            return {
                condition:'',
                tableData:[],
                expandKey:[],//默认展开数组
                courseOption:[],
                allNoun:'',
                
                iszyid:'',
                iskcid:'',
                isnfid:'',
                zyOptions:[],
                kcOptions:[],
                nfOptions:[],
            }
        },
        async created() {
            this.$POST('/system/dictList/CONLESSON').then(res => {
                this.courseOption = res
                // console.log(res)
            }) 
            
            //初始化年
            await this.$GET("/timesheetTask/getTaskYears",{pkjhid:this.$route.params.planid}).then((res)=>{ 
                this.nfOptions = res.data
                this.isnfid = res.data[0].xn 
            }) 
            //初始化专业id
            await this.$GET("/timesheetTask/getTaskZyids",{pkjhid:this.$route.params.planid,year:this.isnfid}).then((res)=>{ 
                this.zyOptions = res.data 
                this.iszyid = res.data[0].zyid
            }) 
            //初始化课程id
            await this.$GET("/timesheetTask/getTaskKcids",{pkjhid:this.$route.params.planid,year:this.isnfid,zyid:this.iszyid}).then((res)=>{ 
                this.kcOptions = res.data
                this.iskcid = res.data.length?res.data[0].kcid:''
            }) 
            this.getTableData()
        },
        methods:{ 
            //初始化年
            getYearSelect(){
                this.$GET("/timesheetTask/getTaskYears",{pkjhid:this.$route.params.planid}).then((res)=>{ 
                    this.nfOptions = res.data
                    this.isnfid = res.data[0].xn 
                }) 
            },
            yearChange(){
                this.iszyid =''
                this.iskcid =''
                this.getZySelect()
                this.getKcSelect()
            },
            //初始化专业id
            getZySelect(){
                this.$GET("/timesheetTask/getTaskZyids",{pkjhid:this.$route.params.planid,year:this.isnfid}).then((res)=>{ 
                    this.zyOptions = res.data   
                }) 
            },
            zyChange(){
                this.iskcid =''
                this.getKcSelect() 
            },
            //初始化课程id
            getKcSelect(){
                this.$GET("/timesheetTask/getTaskKcids",{pkjhid:this.$route.params.planid,year:this.isnfid,zyid:this.iszyid}).then((res)=>{ 
                    this.kcOptions = res.data 
                    this.selectLeftTree()
                }) 
            },
            kcChange(){
                this.getKcSelect()
            },



            getTableData(){  
                this.$GET("/timesheetTask/listBySelect",{year:this.isnfid,zyid:this.iszyid,kcid:this.iskcid,pkjhid:this.$route.params.planid}).then((res)=>{
                        this.tableData = res
                })
            }, 
            changeNoun(row) {
                let params = {
                    id:row.rwh,
                    jc:row.conum,
                    pkjhid:this.$route.params.planid,
                    type:'task'
                }
                this.$GET('/timesheetRestrict/setConLesson',params).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'设置成功'
                        })
                        this.getTableData() 
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }, 
            selectLeftTree(){
                this.getTableData() 
            }
        }
    }
</script>

<style scoped>

</style>
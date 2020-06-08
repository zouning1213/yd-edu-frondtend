<template>
    <div class="setting-merge-first" >
            <!-- <p>合班教学</p> -->
            <el-row>
                <el-col :span="5">
                    <div class="yd-common-table arranging-setting-color">
                        <el-checkbox-group v-model="checkedOne" @change="isClickTable">
                            <template>
                                <el-table
                                :data="tableDataOne"
                                border
                                height="540"
                                style="width: 100%">
                                    <el-table-column
                                        prop="date" 
                                        label="第一步  选择班级"
                                        width="">
                                        <template slot-scope="scope"> 
                                            <span style="margin-left: 10px"> 
                                                <el-checkbox :label="scope.row.bjid" >{{scope.row.bjmc}}</el-checkbox>
                                            </span>
                                        </template>
                                    </el-table-column> 
                                </el-table>
                            </template>
                        </el-checkbox-group>
                    </div>
                </el-col>
                <!-- <el-col :span="2" class="col-second">
                    <i class="yd icon-jurassic_next font-skin"></i> 
                </el-col>
                <el-col :span="5"> 
                    <div class="yd-common-table">
                        <el-checkbox-group v-model="checkedTwo" @change="isClickTable">
                            <template>
                                <el-table
                                :data="tableDataTwo"
                                border
                                height="540"
                                style="width: 100%">
                                    <el-table-column
                                        prop="date" 
                                        label="第二步  选择课程"
                                        width="">
                                        <template slot-scope="scope"> 
                                            <span style="margin-left: 10px"> 
                                                <el-checkbox :label="scope.row.id" >{{scope.row.name}}</el-checkbox>
                                            </span>
                                        </template>
                                    </el-table-column> 
                                </el-table>
                            </template>
                        </el-checkbox-group>
                    </div>
                </el-col> -->
                <el-col :span="3" class="col-third">
                    <div class="col-third-wrap">
                        <span>
                            <el-button @click="joinClasses" type='primary' style="margin-bottom:10px;">合班</el-button>
                        </span> 
                        <el-button  @click="splitClasses" >拆分</el-button>
                    </div>
                   
                </el-col>
                <el-col :span="9"> 
                    <div class="yd-common-table arranging-setting-color">  
                        <el-checkbox-group v-model="checkedThree" @change="isClickTableThree">
                            <template>
                                <el-table
                                :data="tableDataThree"
                                border
                                height="540"
                                style="width: 100%">
                                    <el-table-column
                                        prop="date" 
                                        label="已存在的合并班"
                                        width="">
                                        <template slot-scope="scope"> 
                                            <!-- <span style="margin-left: 10px"> 
                                                {{scope.row.bjmc}} 
                                            </span> -->
                                            <span style="margin-left: 10px"> 
                                                <el-checkbox :label="scope.row.jxbjid" >{{scope.row.bjmc}}</el-checkbox>
                                            </span>
                                        </template>
                                    </el-table-column> 
                                </el-table>
                            </template> 
                        </el-checkbox-group>
                    </div>
                </el-col>
            </el-row>
    </div>
</template>

<script>
    export default {
        name:"setting-merge-class",
        data() {
            return {
                tableDataOne: [
                    {
                        id: 'bj1',
                        name: '19级会计一班',
                    }, {
                        id: 'bj2',
                        name: '19级计算机一班',
                    }, {
                        id: 'bj3',
                        name: '19级广告设计一班',
                    }, {
                        id: 'bj4',
                        name: '19级机电学一班',
                    }, {
                        id: 'bj5',
                        name: '19级会计一班',
                    }, {
                        id: 'bj6',
                        name: '19级计算机一班',
                    }
                ],
                tableDataTwo: [
                    {
                        id: 'kc1',
                        name: '大学英语',
                    }, {
                        id: 'kc2',
                        name: '高等数学',
                    }, {
                        id: 'kc3',
                        name: '体育',
                    }, {
                        id: 'kc4',
                        name: '计算机应用基础',
                    }, {
                        id: 'kc5',
                        name: '马克思列宁主义',
                    } 
                ],
                tableDataThree: [
                    {
                        id: 'hb1',
                        name: '大学英语：（19级广告设计一班、19级机电学一班）',
                    }, {
                        id: 'hb2',
                        name: '高等数学：（19级广告设计一班、19级机电学一班）',
                    }, {
                        id: 'hb3',
                        name: '毛概：（19级广告设计一班、19级机电学一班）',
                    } 
                ],
                checkedOne:[],
                checkedTwo:[],
                checkedThree:[]
            }
        },
        created(){
            this.getTableData()
        },
        methods:{
            getTableData(){
                this.$GET("/timesheetRestrict/globalTeachinClassList").then((res)=>{
                    console.log(res)
                    this.tableDataOne = res.data.normalClassList
                    this.tableDataThree = res.data.teachingClassList
                })
            },
            isClickTable(){
                console.log(this.checkedOne)
                // console.log(this.checkedTwo)
            },
            //分班控制单选
            isClickTableThree(){ 
                if(this.checkedThree.length>1){
                    this.checkedThree.shift()
                } 
            },
            //合班
            joinClasses(){ 
                console.log(this.checkedOne.join())
                this.$POST("/timesheetRestrict/setTeachingClass",{bjids:this.checkedOne.join()}).then((res)=>{
                    if(res.code==200){
                        this.getTableData()
                    }
                })
            },
            //拆分
            splitClasses(){
                this.$POST("/timesheetRestrict/delTeachingClass",{jxbjid:this.checkedThree.join()}).then((res)=>{
                    if(res.code==200){
                        this.getTableData()
                    }
                })
            }
        }
    }
</script>

<style scoped lang='less'>
    .setting-merge-first{
        margin-top:33px; 
        .el-col{
            height: 540px;
        }
        .col-second{
            text-align: center; 
            i{
                line-height: 540px;
            }
        }
        .col-third{
            text-align: center;
            .col-third-wrap{
                display: inline-block;
                height: 200px; 
                transform: translateY(230px)
            }
        }
        i{
            font-size: 29px;
        }
    }
</style>
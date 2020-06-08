<template>
<!--单个固排设置 arranging-course-one用于按钮皮肤 -->
    <div class="setting-solid-row-wrap  pr arranging-course-one"> 
        <el-row class="arranging-common-select">
            <el-col :span="24">
                <div class="mb-20">  
                    <el-select size='small' style="width:131px"  v-model="isnfid" @change="yearChange" filterable placeholder="选择课程">
                            <el-option
                                    v-for="item in nfOptions"
                                    :key="item.xn"
                                    :label="item.xn + '级'"
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
                    <div class="arranging-setting-color fr" v-show="false">
                        <el-checkbox-group v-model="byflag" @change="isUsedGlobal" class="" style="line-height: 30px;">
                            <el-checkbox label="99" >是否显示全局不排课</el-checkbox>
                        </el-checkbox-group>
                    </div> 
                </div>  
            </el-col> 
        </el-row>
            
        <div class="yd-common-flex">
            <div class="bd common-left-tree yd-common-table" style="width:400px" :style="{'maxHeight':(this.$store.state.minClientHeight-242)+'px'}"> 
                <el-table
                    :data="treeData"  
                    @row-click="expandChange"
                    :max-height="this.$store.state.minClientHeight-245"
                    :row-class-name="bgSkin"  
                    :cell-class-name ="selectedHighlight"
                    >
                    <el-table-column
                        prop="kcmc"
                        align="center"
                        label="课程(班级)">
                        <template slot-scope="scope">
                            {{scope.row.kcmc}}({{scope.row.bjmc}})
                        </template>
                    </el-table-column> 
                    <el-table-column
                        prop="zgxm"
                        align="center"
                        label="教师">
                    </el-table-column>
                    <el-table-column
                        prop="kss"
                        align="center"
                        label="课时">
                    </el-table-column>
                </el-table>    
            </div>
            <div class="common-right-table yd-common-table " style="width: calc(100% - 400px);">
                <!-- <div class="common-right-table-allCourse">
                    <div class="isflagbox">
                        <h3>广告一班所有课程</h3>
                        
                        <el-radio-group v-model="allCourse" >
                            <el-radio-button 
                                    v-for="item in allCourseOptions"
                                    :key="item.code"
                                    :label="item.code"
                                    :value="item.code">{{item.name}}
                            </el-radio-button> 
                        </el-radio-group>
                    </div>
                        
                </div> -->
                <div class="arranging-common-table">
                    <el-checkbox-group v-model="checked" @change="isClickTable">
                        <table>
                            <thead>
                                <tr class="bg-skin border-skin">
                                    <th width="80"></th>
                                    <th width="80"></th>
                                    <th width="130" v-for="(item,index) in days">
                                        <p> 
                                            {{weekName[index]}}
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(item,index) in dayOption">
                                    <tr v-if="times[index] != 0" v-for="(jc,index2) in times[index]">
                                        <td v-if="index2 == 0" :rowspan="times[index]">{{item.name}}</td>
                                        <td>{{getID(index)+index2+1}}</td>
                                        <td v-for="(xq,index3) in days"  style="min-height:48px" >  
                                            <template style="min-height:48px" >  
                                                    <div :class="{'black_color':blackTable.includes((''+(index3+1)+(getID(index)+index2+1)))||isIncludeGlobal((''+(index3+1)+(getID(index)+index2+1)))}"  @click="tableClick((''+(index3+1)+(getID(index)+index2+1)))" style="min-height:48px">
                                                        <div v-for="(item4,index4) in isCheckedTable[(''+(index3+1)+(getID(index)+index2+1))]" :key="index4" > 
                                                            <span @click.stop="isDeleteTable(item4.rwh,(''+(index3+1)+(getID(index)+index2+1)))" class="icon-delete">X</span>
                                                            <span :class="{'text-red':!checkList.length?false:item4.rwh == checkList[0].rwh?true:false }">{{item4.kcmc||''}}({{item4.bjmc||""}})</span>                                                          
                                                        </div>
                                                    </div> 
                                            </template>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </el-checkbox-group> 
                </div>
            </div>
        </div> 
    </div>
</template>

<script> 
    import '../../../components-page/select/css/select-tree.less' 

    export default {
        name:"setting-solid-row-wrap", 
        props:[  
             'weekindex',
             'days',
             'times'
        ],
        data() {
            return {  
                bqboxOptions:[],
                value:'',
                isbq:'',
                //头部     
                weekHour:null,
                weekHours:['一','二','三','四','五','六','七'],
                weekName:null,
                checked:[],
                //
                thisYear:'',
                checkList:[],
                treeData:[],
 
                //是否能点击右边格子
                allCourse:'',
                allCourseOptions:[
                    {
                        name:'语文',
                        code:1
                    },
                    {
                        name:'数学',
                        code:2
                    },
                    {
                        name:'英语',
                        code:3
                    },
                    {
                        name:'物理',
                        code:4
                    },
                ],
                
                // 
                weekName:['星期一','星期二','星期三','星期四','星期五','星期六','星期日',],
                dayOption:[], //节数的数据
                // days:['1','2','3','4','5'], //选中的星期
                // times:[], // 选中的节数
                // weekindex:[]  ,
                isCheckedTable:{},
                iszyid:'',
                iskcid:'',
                isnfid:'',
                rwhid:'',
                zyOptions:[],
                kcOptions:[],
                nfOptions:[],
                blackTable:[],
                getIndex:'',
                globaltime:[],
                showglobaltime:[],

                //
                byflag:true,
                byflagGlobal:'99',

            }
        },
        async created() { 
            this.thisYear = this.$route.params.year
            //渲染表格参数
            // this.getKbTableData() 

            //获取所有排课用标签列表
            // this.getBqData() 
            
            await this.$POST('/system/dictList/PKSJQJ').then(res => {
                this.dayOption = res
                res.forEach(item => {
                    this.times.push(4) //往默认值添加数据
                })
            })    
            //固排列表  
            this.getTableList()
            //初始化年
            await this.$GET("/timesheetTask/getTaskYears",{pkjhid:this.$route.params.planid}).then((res)=>{ 
                this.nfOptions = res.data
                this.isnfid = res.data[0].xn
                // this.selectLeftTree()
            }) 
            //初始化专业id
            await this.$GET("/timesheetTask/getTaskZyids",{pkjhid:this.$route.params.planid,year:this.isnfid}).then((res)=>{ 
                this.zyOptions = res.data  
                this.iszyid = res.data[0].zyid
                // this.selectLeftTree()
            }) 
            //初始化课程id
            await this.$GET("/timesheetTask/getTaskKcids",{pkjhid:this.$route.params.planid,year:this.isnfid,zyid:this.iszyid}).then((res)=>{ 
                this.kcOptions = res.data
                this.iskcid = res.data.length?res.data[0].kcid:''
                // this.selectLeftTree()
            }) 
            this.selectLeftTree()
            
            //全局禁排 
            this.$GET("/timesheetRestrict/gloablRestricTime",{pkjhid:this.$route.params.planid}).then((res) => {
                // console.log(res)
                // this.globaltime = res.time
                // this.showglobaltime = res.time
            }) 
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


            //是否适用于全局更改
            isUsedGlobal(){ 
                if(this.byflag){
                    this.byflagGlobal = '0'
                    this.globaltime = this.showglobaltime
                    this.fathertime = this.showfathertime
                }else{
                    this.byflagGlobal = '99' 
                    this.globaltime = []
                    this.fathertime = []
                }
                // console.log(this.byflagGlobal) 
                // this.isClickTable()
                // this.getRightTableData()
            },
            isIncludeGlobal(id){
                let a = false
                this.globaltime.forEach((item,index)=>{
                    if(item.timeid == id){
                        a = true
                    }
                })
                return a
            },
            //点击一行
            expandChange(row,column,event) {
                this.checkList = []
                // console.log(row) 
                this.getIndex=row.index
                this.checkList[0] = row
                this.$GET("/timesheetRestrict/taskUnrangeTime",{pkjhid:this.$route.params.planid,rwh:row.rwh}).then((res)=>{ 
                        this.blackTable = res
                })
            },
            selectedHighlight({row, rowIndex}) { 
                // console.log('getColor')
                // console.log(row)
                // console.log(this.checkList)
                if(this.checkList.length){
                    if(this.checkList[0].rwh==row.rwh){
                        return 'bg-skin-imp color-f'
                    }
                }
                return ''
                // if ((this.getIndex) === rowIndex ) {  
                //     return 'bg-skin-imp color-f'
                // }
            },
            bgSkin ({row, rowIndex}) { 
                //把每一行的索引放进row 
                row.index = rowIndex; 
            },

            //固排列表 
            getTableList(){
                this.$GET("/timesheetRestrict/preRangeTable",{pkjhid:this.$route.params.planid}).then((res)=>{ 
                    this.isCheckedTable = res
                    this.checked = Object.keys(res)
                })  
            },
            getID(index){
                // console.log(this.times)
                var id = 0
                this.times.forEach((item2,index2)=>{
                    // console.log(item2,index2)
                    if(index2<index){
                        id += parseInt(item2)
                    }
                })
                // console.log(id)
                return id
            },
            //获取所有排课用标签列表
            getBqData() {
                this.$GET("/timesheetTag/getTags").then((res) => {
                    this.bqboxOptions = res
                })
            },  
            //过滤不排课字段
            getZnIsData(id) {
                let name = ''
                // this.checked.forEach((item,index) => {
                //     if (item.timeid == id) {
                //         // name =  item.tagname||'不排课'
                //         // if(item.Tagname=='bpk'){
                //         name = '不排课'
                //         // }
                //         // console.log(item.timeid)
                //         this.bqboxOptions.forEach((item2,index2) => {
                //             if (item.tagid == item2.tagid) {
                //                 name = item2.tagname
                //             }
                //         })
                //     }

                // })
                if( this.isCheckedTable[id]){
                    name = this.isCheckedTable[id][0].kcmc + '('+ this.isCheckedTable[id][0].bjmc+ ')'
                    // console.log(this.isCheckedTable[id][0].kcmc)
                }
                
                // console.log(id)
                return name
            },
            //课表table渲染参数
            getKbTableData() {
                this.$GET("/timesheetTask/timeSheetTable").then((res) => {
                    this.weekHour = res.data.day
                    // this.weekName = res.data.timeAll
                })
            },  
            //\表格框变化调用
            isClickTable() {
                // if (this.checkList.length) {
                //     var hash = {}
                //     this.checked = this.checked.reduceRight((item,index) => {
                //         hash[index['timeid']]? '' :hash[index['timeid']] = true && item.push(index)
                //         return item;
                //     },[])

                //     //格式化返回后台数据的格式  
                //     let a = {
                //         year:this.$route.params.year,
                //         id:this.checkList[0].id || '',
                //         type:this.checkList[0].label || '',
                //         time:JSON.stringify(this.checked)
                //     }
                //     // console.log(a)
                //     this.$POST("/timesheetRestrict/setUnrangeTime",a).then((res) => {
                //         if (res.code == 200) {
                //             // console.log(res)
                //             this.getRightTableData()
                //             this.getRuleData()
                //         } else {
                //             this.$message.error({
                //                 message:res.message
                //             })
                //             this.getRightTableData()
                //         }

                //     })
                // } else {
                //     this.$message.error('请先选择左侧节点！');
                //     this.checked = []
                // }


            },
            //左边树下面数据改变
            theTreeDataChange(mark) {
                this.$GET("/timesheetTask/getUnrangeObjList",{year:this.thisYear,mark:mark}).then((res) => {
                    this.treeData = res.data
                })
            },
            //控制左边树单选
            checkListChange() {
                if (this.checkList.length > 1) {
                    this.checkList.shift()
                }
                //请求右边表格数据  
                if (this.checkList.length) {
                    // this.getRightTableData() 
                    this.$GET("/timesheetRestrict/taskUnrangeTime",{pkjhid:this.$route.params.planid,rwh:this.checkList[0].rwh}).then((res)=>{
                            // console.log(res)
                            this.blackTable = res
                    })
                } else {
                    this.checked = []
                }

            },
            //请求右边表格数据 
            getRightTableData() {
                this.$GET("/timesheetRestrict/objRestricTime",{
                    year:this.thisYear,
                    id:this.checkList[0].id,
                    type:this.checkList[0].label
                }).then((res) => {
                    this.checked = res.time
                })
            },
            //发送给父组件
            sendFrom() {
                this.$emit('receivecourseOne',this.ruleTableData)
            },
            //
            checkedBjId(bjid){
                console.log(bjid)
            },
            //查询左边树表格
            selectLeftTree(){
                this.$GET("/timesheetTask/listBySelect",{year:this.isnfid,zyid:this.iszyid,kcid:this.iskcid,pkjhid:this.$route.params.planid}).then((res)=>{
                        this.treeData = res 
                })
            },
            //点击格子
            tableClick(timeid){ 
                // console.log('马泡泡')
                // console.log(timeid)
                if(this.checkList.length){
                    if(this.blackTable.includes(timeid)){
                        return
                    }else{
                        this.$GET("/timesheetRestrict/setRangeLesson",{time :timeid,pkjhid:this.$route.params.planid,rwh:this.checkList[0].rwh}).then((res)=>{
                            // this.treeData = res
                            if(res.code==200){
                            this.getTableList()
                            }else{
                                this.$message.error({
                                    message:res.message
                                })
                            }
                        })
                    }
                   
                }else{
                    this.$message.error({
                            message:'请先选择左侧节点'
                        })
                }
                
            },
            //删除格子里面某一条
            isDeleteTable(rwh,timeid){
                // console.log(rwh,timeid)
                this.$GET("/timesheetRestrict/delRangeLesson",{time :timeid,rwh:rwh,pkjhid:this.$route.params.planid}).then((res)=>{
                        // this.treeData = res
                        if(res.code==200){
                           this.getTableList()
                        }else{
                            this.$message.error({
                                message:res.message
                            })
                        }
                })
            }
        },
    }
</script>  
<style lang='less'>
    .setting-solid-row-wrap {
        .color-f{
            color: #fff;
        }
        .bd{
            border: 1px solid #ccc;
            border-bottom: none;
        }
        .isflagbox {
            .el-radio__input {
                display: none;
            } 
            .el-radio__input.is-checked + .el-radio__label {
                color: #fff;
            }
            //
            .el-radio-button__inner{
                border-color: #fff;
                background-color: #F3F5F7;
            }  
        }
        .el-radio {
            margin-right: 0;
        } 
        .common-right-table-allCourse{
            width: 100%;
            padding: 20px;
            background-color: #F3F5F7;
            margin-bottom: 20px;
            h3{
                font-size:14px; 
                font-weight:bold;
                margin-bottom: 20px;
                color:rgba(51,51,51,1);
            }
            .isflagbox { 
                .el-radio__input.is-checked + .el-radio__label {
                    color: #fff;
                }
                //
                .el-radio-button__inner{
                    border-color: #fff;
                    background-color: #F3F5F7;
                    border: none; 
                }  
                .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                    border-radius: 20px;
                }
                .el-radio-button--medium .el-radio-button__inner{
                    padding: 7px 13px;
                }
            }
        } 
        
        .position-td{
            position: absolute;
            right: 0;
            top: 0; 
            left: 0;
            bottom: 0; 
        }
        
        .isbqspan {
            margin-right: 10px;
            position: relative;
            .isbqspan-close {
                display: inline-block;
                position: absolute;
                width: 17px;
                height: 17px;
                right: -8px;
                top: -16px;
                border-radius: 50%;
                background-color: #ccc;
                color: #fff;
                cursor: pointer;
                text-align: center;
                line-height: 17px;
                z-index: 2;
            }
        }
        //表格
        .table-td {
            white-space: normal;
        }
        .arranging-course-table tbody td p {
            color: #000;
            line-height: 48px;
        }
        //
        .isflagbox {
            margin-bottom: 20px;
        }
        .arranging-common-table {
            // padding: 10px 19px;
            // background-color: #EEEEEE;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            // margin-top: 38px;
            .el-checkbox__inner{
                display: none;
            }
        }
        .tree-content-p {
            font-size: 24px;
        }
        .icon-delete{
            padding: 0 5px;
            color: #ccc;
            cursor: pointer;
        }
        .text-red{
            color: red;
        }
        .black_color{
            background-color: #eee;
        }
    }
</style> 

<template>
<!--单个禁排设置 arranging-course-one用于按钮皮肤 -->
    <div class="setting-constraint-wrap  pr arranging-course-one">
        <el-row class="isflagbox">
            <!-- <span>选择：</span>
            <el-select v-model="value" placeholder="请选择" @change="selectChange">
                <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select> -->
            <el-radio-group v-model="value" @change="selectChange">
                <el-radio-button 
                        v-for="item in options"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">{{item.name}}
                </el-radio-button> 
            </el-radio-group>
 
        </el-row>
        <el-row>
            <div class="isflagbox" style="margin-top: 10px">
                <span>标签：</span>
                <!-- <divv-for="(item,index) in  bqboxOptions" :key="index">
                        <p>{{item.name}}</p>
                </div> -->
                <span v-for="(item,index) in  bqboxOptions" :key="index" class="isbqspan">
                    <span class="isbqspan-close" @click="deleteBq(item.tagid)">x</span>
                    <el-radio @click.native.prevent="clickitem(item.tagid)" v-model="isbq" :label="item.tagid" border
                              size="small">{{item.tagname}}</el-radio>
                </span>
            <el-button type="primary" @click="addBq" size="small">添加标签</el-button>
            <el-button type="primary" @click="editBq" size="small">编辑标签</el-button>

            <el-button plain class="fr" @click="dialogFormVisibleRule = true" size="small">规则列表</el-button>

            <div class="fr arranging-setting-color" v-show="value=='unrange_class'">
                <el-checkbox-group v-model="byflag" @change="isUsedGlobal" style="line-height: 30px;">
                    <el-checkbox label="99" >适用于全局禁排</el-checkbox>
                </el-checkbox-group>
            </div>
                
            </div> 
        </el-row>
        <div class="yd-common-flex">
            <!-- <div class="common-left-tree">
                <div class="yd-common-select-tree" :style="{'minHeight':(this.$store.state.minClientHeight-225)+'px'}">
                    <div class="bg-skin tree-title border-skin"><h3>选择</h3></div>
                    <div class="tree-content" :style="{'maxHeight':(this.$store.state.minClientHeight-268)+'px'}">
                        <el-checkbox-group v-model="checkList" @change="checkListChange">
                            <p class="tree-content-p" v-for="(item,index) in treeData" :key="index">
                                <el-checkbox :label="item">{{item.value}}</el-checkbox>
                            </p>
                        </el-checkbox-group>
                    </div>
                </div>
            </div> -->
            
            <div class="common-left-tree" v-show="value=='unrange_lesson'">
                <yd-select-kcid-tree v-on:checkedKcId="checkedKcId" :treeData="treeData"></yd-select-kcid-tree>
            </div>
            <div class="common-left-tree" v-show="value=='unrange_teacher'">
                <yd-select-jsid-tree v-on:checkedJsId="checkedJsId" :treeData="treeData"></yd-select-jsid-tree>
            </div>
            <div class="common-left-tree" v-show="value=='unrange_class'">
                <yd-select-bjid-tree v-on:checkedBjId="checkedBjId" :treeData="treeData"></yd-select-bjid-tree>
            </div>
            
            <div class="common-right-table  ">
                <div v-show="false" class="common-right-table-allCourse">
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
                        
                </div> 
                <div class="arranging-common-table">
                    <el-checkbox-group v-model="checked" @change="isClickTable">
                        <table>
                            <thead class="arranging-common-table-thead">
                                <tr class="bg-skin border-skin">
                                    <th width="5%"></th>
                                    <th width="5%"></th>
                                    <th v-for="(item,index) in days" :width="90/days.length+'%'">
                                        <p> 
                                            <span>{{weekName[index]}}</span> 
                                            <el-checkbox-group v-model="checkAlltime" @change="isCheckAllTimeChange" class="mt-15">
                                                <el-checkbox v-show="item2&&dayOption[index2]" v-for="(item2,index2) in times" :key="index2" :label="(index+1+','+(index2+1))">{{dayOption[index2]?dayOption[index2].name:''}}不排课</el-checkbox>
                                            </el-checkbox-group>
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,index) in dayOption">
                                <tr v-if="times[index] != 0" v-for="(jc,index2) in times[index]">
                                    <td v-if="index2 == 0" :rowspan="times[index]">{{item.name}}</td>
                                    <td>{{getTableId(index)+index2+1}}</td>
                                    <td v-for="(xq,index3) in days" >  
                                        <template style="min-height:48px" >  
                                                <el-checkbox style="min-height:48px;width: 100%;line-height: 48px;" :class="{bgcc:isNjBpk(''+(index3+1)+(getTableId(index)+index2+1))}" :disabled="isNjBpk(''+(index3+1)+(getTableId(index)+index2+1))"
                                                :label="{timeid:''+(index3+1)+(getTableId(index)+index2+1),tagid:isbq}"
                                                            name="course">
                                                    <div class="" style="color:#000">  
                                                        {{getZnIsData(''+(index3+1)+(getTableId(index)+index2+1))}}  
                                                    </div>
                                                </el-checkbox> 
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
        <el-dialog title="添加标签" :visible.sync="dialogFormVisible" width="30%" center>
            <el-form :model="motaiform">
                <el-form-item label="标签名称" label-width="100px">
                    <el-input v-model="motaiform.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitMotaiData">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑标签" :visible.sync="dialogFormVisibleEdit" width="30%" center @close='editMotaiClose'>

            <el-table
                    :data="bqboxOptions"
                    tooltip-effect="dark"
                    style="width: 100%">

                <el-table-column prop="nj" label="标签名" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.tagname" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button class="del-btn" @click="subeditBq(scope.row)"
                                   type="text"
                                   size="small"><i class="el-icon-edit"></i>确定编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="规则列表" :visible.sync="dialogFormVisibleRule" width="60%" center>

            <el-table :data="ruleTableData" border style="width: 100%" height="600">
                <el-table-column
                        prop="kcmc"
                        width="150"
                        align="center"
                        label="规则">
                    <template slot-scope="scope">
                        {{scope.row.ysmc}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="skls"
                        label="细则">
                    <template slot-scope="scope"> 
                        <div v-if="scope.row.yslx!='conlesson'">
                            {{scope.row.xm}}:
                            <span v-for="(item,index) in scope.row.ksxq.split(',')" :key="index">
                                    周{{item.substring(0,1)}}第{{item.substring(1)}}节,
                            </span> 
                        </div>
                        <div v-if="scope.row.yslx=='conlesson'">
                            {{scope.row.xm}}:
                            <span>
                                {{scope.row.jc}}节连堂
                            </span>  
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button class="del-btn" @click="subDelYs(scope.row)"
                                   type="text"
                                   size="small"><i class="el-icon-delete"></i>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script> 
    import '../../../components-page/select/css/select-tree.less'
    import ydSelectJsidTree from '../../../components-page/select/yd-tree-jsid-setting-single'
    import ydSelectKcidTree from '../../../components-page/select/yd-tree-kcid-setting-single'
    import ydSelectBjidTree from '../../../components-page/select/yd-tree-bjid-setting-single'

    export default {
        name:"setting-constraint-wrap",
        props:[
             'pkjhid', 
             'weekindex',
             'days',
             'times'
        ],
        components:{
            ydSelectJsidTree,
            ydSelectKcidTree,
            ydSelectBjidTree
        },
        data() {
            return {
                motaiform:{
                    name:''
                },
                dialogFormVisible:false,
                dialogFormVisibleEdit:false,
                dialogFormVisibleRule:false,
                options:[],
                bqboxOptions:[],
                value:'',
                isbq:'',
                //头部     
                weekHour:null,
                weekHours:['一','二','三','四','五','六','七'],
                // weekName:null,
                // checked:[{timeid:'25',tagid:'25'}],
                checked:[],
                //
                thisYear:'',
                checkList:[],
                treeData:[],

                //rule规则
                ruleTableData:[],
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
                // weekindex:[],
                checkAlltime:[],//选中上午或者等不排课
                changXData:[],//上下午变化的保存数据
                treeId:'',
                istype:'',
                fathertime:[],
                globaltime:[],
                byflag:true,
                byflagGlobal:'0',
                showfathertime:[],
                showglobaltime:[],
            }
        },
        async created() {  
            // this.thisYear = this.$route.params.year
            //渲染表格参数
            // this.getKbTableData()
            await this.$POST('/system/dictList/PKSJQJ').then(res => {   
                this.dayOption = res  
            }) 
            //
            await this.$GET("/system/dictList/BPKXL").then((res) => {
                this.options = res
                this.value = this.options[0].code
                
            })  
            this.theTreeDataChange(this.value) 
            //获取所有排课用标签列表
            this.getBqData() 
            //初始化规则
            this.getRuleData()  
            //全局禁排 
            this.$GET("/timesheetRestrict/gloablRestricTime",{pkjhid:this.$props.pkjhid}).then((res) => {
                this.globaltime = res.time || []
                this.showglobaltime = res.time || []
            })  
        },
        methods:{
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
                this.isClickTable()
                // this.getRightTableData()
            },
            //是否适用于全局更改的回显
            isNjBpk(id){
                let flag = false
                this.fathertime.forEach((item,index)=>{
                    if(item.timeid==id){ 
                        flag = true
                    }
                }) 
                this.globaltime.forEach((item,index)=>{
                    if(item.timeid==id){ 
                        flag = true
                    }
                })  
                return flag
            },
            //返回格子的id
            getTableId(index){
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
            //上下午点击全选的按钮
            isCheckAllTimeChange(value){  
                let a =  this.changXData;
                let b =  this.checkAlltime; 
                //点击取消全选的时候调用
                if(a.length>b.length){
                     let difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v))
                    // console.log(difference) 
                    difference.forEach((item,index)=>{
                        var heng = item.split(',')[0]
                        var zong = item.split(',')[1]
                        var zongid = null
                        this.times.forEach((item2,index2)=>{ 
                            // console.log(index2,zong-1)
                            if(index2<zong-1){
                                zongid+=item2  
                            } 
                            if(index2==zong-1){ 
                                for(var i=0;i<item2;i++){   
                                    let isitem = {
                                        timeid:heng+''+(zongid+i+1),
                                        tagid:''  
                                    }    
                                    this.checked.forEach((item,index)=>{    
                                        if(item.timeid == isitem.timeid&&item.tagid==isitem.tagid){ 
                                            this.checked.splice(index,1)
                                        }
                                    }) 
                                } 
                            }
                        })
                    }) 
                }  
                //记录上一次checkAlltime里面的值,用于找少了哪一个
                this.changXData  = JSON.parse(JSON.stringify(this.checkAlltime)) 
                // console.log(value)
                //times=[0,2,2,0]
                //this.checkAlltime[0].split(',')[0]   //代表星期几横坐标第一位
                //this.checkAlltime[0].split(',')[1]   //代表星期几的上午还是下午  
                let resauleData = []
                this.checkAlltime.forEach((item,index)=>{
                    var heng = item.split(',')[0]
                    var zong = item.split(',')[1]
                    var zongid = null
                    this.times.forEach((item2,index2)=>{ 
                        // console.log(index2,zong-1)
                        if(index2<zong-1){
                            zongid+=item2  
                        } 
                        if(index2==zong-1){ 
                            for(var i=0;i<item2;i++){ 
                                resauleData.push({
                                    timeid:heng+''+(zongid+i+1),
                                    tagid:'' 
                                }) 
                                this.checked.push({
                                    timeid:heng+''+(zongid+i+1),
                                    tagid:''  
                                })
                            } 
                        }
                    })
                }) 
                var hash = {}
                this.checked = this.checked.reduce((item,index) => {
                    hash[index['timeid']]? '' :hash[index['timeid']] = true && item.push(index)
                    return item;
                },[])

                this.isClickTable()
            }, 
            //初始化规则
            getRuleData() {
                this.$GET("/timesheetRestrict/list",{pkjhid:this.$props.pkjhid} ).then((res) => {
                    this.ruleTableData = res.data||[]
                    // console.log(res)
                })
            },
            //添加标签
            addBq() {
                this.dialogFormVisible = true
            },
            //添加模态提交
            submitMotaiData() {
                if (this.motaiform.name) {
                    this.$POST("/timesheetTag/add",{tagname:this.motaiform.name}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:"success",
                                message:'添加成功'
                            })
                            this.getBqData()
                            this.dialogFormVisible = false
                        } else {
                            this.$message({
                                type:"error",
                                message:res.message
                            })
                        }
                    })
                } else {
                    this.$message({
                        type:"error",
                        message:'请输入正确的名称'
                    })
                }

            },
            //修改标签
            editBq() {
                this.dialogFormVisibleEdit = true
            },
            //标签编辑提交
            subeditBq(row) {
                if (row.tagname) {
                    this.$POST("/timesheetTag/update",row).then((res) => {
                        this.$message({
                            type:"success",
                            message:'编辑成功'
                        })
                    })
                } else {
                    this.$message({
                        type:"error",
                        message:'请输入正确的名称'
                    })
                }

            },
            //编辑标签关闭
            editMotaiClose(){
                this.getBqData()
            },
            //获取所有排课用标签列表
            getBqData() {
                this.$GET("/timesheetTag/getTags").then((res) => {
                    this.bqboxOptions = res
                })
            },
            //删除标签
            deleteBq(tagid) {
                this.$confirm('删除此标签后，占用此标签的格子将变成“不排课”, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET("/timesheetTag/delete",{timesheetTagId:tagid}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:"success",
                                message:'删除成功'
                            })
                            this.getBqData()
                            this.dialogFormVisible = false
                        } else {
                            this.$message({
                                type:"error",
                                message:res.message
                            })
                        }
                    })
                })
            },
            //模态删除约束
            subDelYs(row) {
                this.$confirm('确定删除此规则?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET("/timesheetRestrict/delete",{timesheetRestrictId:row.id}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:"success",
                                message:'删除成功'
                            })
                            this.getRuleData()
                            this.getRightTableData()
                        } else {
                            this.$message({
                                type:"error",
                                message:res.message
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    });
                });
            },
            //过滤不排课字段
            getZnIsData(id) {
                let name = ''
                this.checked.forEach((item,index) => {
                    if (item.timeid == id) {
                        // name =  item.tagname||'不排课'
                        // if(item.Tagname=='bpk'){
                        name = '不排课'
                        // }
                        // console.log(item.timeid)
                        this.bqboxOptions.forEach((item2,index2) => {
                            if (item.tagid == item2.tagid) {
                                name = item2.tagname
                            }
                        })
                    }

                })
                this.fathertime.forEach((item,index) => {
                    if (item.timeid == id) { 
                        name = '年级不排课' 
                        this.bqboxOptions.forEach((item2,index2) => {
                            if (item.tagid == item2.tagid) {
                                name = item2.tagname
                            }
                        })
                    }

                })
                this.globaltime.forEach((item,index) => {
                    if (item.timeid == id) { 
                        name = '全局不排课' 
                        this.bqboxOptions.forEach((item2,index2) => {
                            if (item.tagid == item2.tagid) {
                                name = item2.tagname
                            }
                        })
                    }

                })
                // console.log(name)
                return name
            },
            //课表table渲染参数
            getKbTableData() {
                this.$GET("/timesheetTask/timeSheetTable").then((res) => {
                    this.weekHour = res.data.day
                    // this.weekName = res.data.timeAll
                })
            },
            //根据who不排课更改
            selectChange() { 
                //左边树数据测试 
                this.theTreeDataChange(this.value)
                //选中的清空
                this.checked = []
                this.checkList = []


            },
            clickitem(e) {
                e === this.isbq? this.isbq = '' :this.isbq = e
            },
            //表格框变化调用
            isClickTable() {
                // console.log(this.checked)
                if (this.treeId) {
                    var hash = {}
                    this.checked = this.checked.reduceRight((item,index) => {
                        hash[index['timeid']]? '' :hash[index['timeid']] = true && item.push(index)
                        return item;
                    },[])

                    //格式化返回后台数据的格式  
                    let a = { 
                        id:this.treeId || '',
                        type:this.istype || '',
                        time:JSON.stringify(this.checked),
                        pkjhid:this.$props.pkjhid,
                        byflag:this.byflagGlobal
                    }
                    // console.log(a)
                    this.$POST("/timesheetRestrict/setUnrangeTime",a).then((res) => {
                        if (res.code == 200) { 
                            this.getRightTableData()
                            this.getRuleData()
                        } else {
                            this.$message.error({
                                message:res.message
                            })
                            this.getRightTableData()
                        }

                    })
                } else {
                    this.$message.error('请先选择左侧节点！');
                    this.checked = []
                } 
            },
            //左边树下面数据改变
            theTreeDataChange(mark) {
                // console.log("mark")
                // console.log(mark)
                this.$GET("/timesheetTask/getUnrangeObjList",{year:this.thisYear,mark:mark,pkjhid:this.$props.pkjhid}).then((res) => {
                    this.treeData = res.data||[]
                })
            },
            //控制左边树单选
            checkListChange() {
                if (this.checkList.length > 1) {
                    this.checkList.shift()
                }
                //请求右边表格数据  
                if (this.checkList.length) {
                    this.getRightTableData()
                } else {
                    this.checked = []
                } 
            },
            //请求右边表格数据 
            getRightTableData() {
                this.$GET("/timesheetRestrict/objRestricTime",{ 
                    id:this.treeId,
                    type:this.istype,
                    pkjhid:this.$props.pkjhid
                    // byflag:this.byflagGlobal
                }).then((res) => {
                    this.checked = res.time
                    if(this.byflag){
                        this.fathertime = res.fathertime?res.fathertime.year:[]
                    } 
                    
                    this.byflagGlobal = res.byflag?res.byflag:''
                    if(this.byflagGlobal=='99'){
                        this.byflag =false
                    }else{
                        this.byflag =true
                    }

                    if(this.byflag){
                        this.byflagGlobal = '0'
                        this.globaltime = this.showglobaltime
                        this.fathertime = this.showfathertime
                    }else{
                        this.byflagGlobal = '99' 
                        this.globaltime = []
                        this.fathertime = []
                    }


                    this.showfathertime = res.fathertime?res.fathertime.year:[]
                })
            },
            //发送给父组件
            sendFrom() {
                this.$emit('receivecourseOne',this.ruleTableData)
            },
            checkedKcId(kcid,type){   
                // console.log('kcid')
                this.treeId = kcid
                this.istype = this.value.split("_")[1]
                // console.log(this.treeId,this.istype)
                this.getRightTableData()
            },
            checkedJsId(jsid,type){    
                // console.log('jsid')
                this.treeId = jsid
                this.istype = this.value.split("_")[1]
                // console.log(this.treeId,this.istype)
                this.getRightTableData()
            },
            checkedBjId(bjid,type){    
                // console.log('bjid')
                this.treeId = bjid
                // this.istype = this.value.split("_")[1]
                this.istype = type
                // console.log(this.treeId,this.istype)
                this.getRightTableData()
            } 
        },
    }
</script> 

<style lang='less'>
    .setting-constraint-wrap {  
        .bgcc{
            background-color: #eee;
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
                border-top: none;
                border-bottom: none;
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
            .arranging-common-table-thead{
                .el-checkbox{
                    margin-right: 0;
                    font-size: 12px;
                    color: #fff;
                    &:last-child {
                        // margin-right: 29px ;
                    }
                }  
                .el-checkbox__inner{
                    display: inline-block;
                }
                .mt-15{
                    margin-top: 15px;
                }
            }
        }
        .tree-content-p {
            font-size: 24px;
        }
    }
</style> 

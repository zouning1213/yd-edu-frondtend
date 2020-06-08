<template>
    <!--全局禁排设置 arranging-course-one用于按钮皮肤 -->
    <div class="setting-constraint-wrap  pr arranging-course-one">
        <el-row class="isflagbox">
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
            </div>
        </el-row>
        <div class="yd-common-flex">
            <div class="common-left-tree" v-if="value=='unrange_teacher'">
                <yd-select-jsid-tree v-on:checkedJsId="checkedJsId"></yd-select-jsid-tree>
            </div>
            <div class="common-left-tree" v-if="value=='unrange_lesson'">
                <yd-select-kcid-tree v-on:checkedJsId="checkedKcId"></yd-select-kcid-tree>
            </div>

            <div :class="{'common-right-table':showLeftTree}">
                <div class="arranging-common-table">
                    <el-checkbox-group v-model="checked" @change="isClickTable">
                        <table>
                            <thead class="arranging-common-table-thead">
                            <tr class="bg-skin border-skin">
                                <th width="5%"></th>
                                <th width="5%"></th>
                                <th v-for="(item,index) in days"  :width="90/days.length+'%'"> 
                                    <p>
                                        <span>{{weekName[index]}}</span>
                                        <el-checkbox-group v-model="checkAlltime" @change="isCheckAllTimeChange"
                                                           class="mt-15">
                                            <el-checkbox v-show="item2" v-for="(item2,index2) in times" :key="index2"
                                                         :label="(index+1+','+(index2+1))">{{dayOption[index2].name}}不排课
                                            </el-checkbox>
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
                                    <td v-for="(xq,index3) in days">
                                        <template style="min-height:48px">
                                            <el-checkbox style="min-height:48px;width: 100%;line-height: 48px;"
                                                         :label="{timeid:''+(index3+1)+(getTableId(index)+index2+1),tagid:isbq}"
                                                         name="course">
                                                <div class="">
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
    import ydSelectKcidTree from '../../../components-page/select/yd-tree-kcid-setting-multiple'
    import ydSelectJsidTree from '../../../components-page/select/yd-tree-jsid'

    export default {
        name:"setting-constraint-wrap",
        components:{
            ydSelectJsidTree,
            ydSelectKcidTree
        },
        props:{
            pkjhid:{
                default:0
            },
            tableWrap:{
                default:{}
            },
            weekindex:{
                default:[]
            },
            days:{
                default:[]
            },
            times:{
                default:[]
            }
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
                checked:[],
                //
                thisYear:'',
                checkList:[],
                treeData:[],
                weekName:['星期一','星期二','星期三','星期四','星期五','星期六','星期日',],
                dayOption:[], //节数的数据
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
                checkAlltime:[],//选中上午或者等不排课
                changXData:[],//上下午变化的保存数据
                showLeftTree:false,
                treeId:'',
                istype:''
            }
        },
        async created() {
            this.thisYear = this.$route.params.year

            await this.$POST('/system/dictList/PKSJQJ').then(res => { 
                this.dayOption = res ||[]
            })
            //全局不排课
            await this.$GET("/system/dictList/QJBPKXL").then((res) => {
                this.options = res
                this.value = this.options[0].code
                this.istype = this.options[0].code.split("_")[1]
            })
            //获取所有排课用标签列表
            this.getBqData()
            //初始化规则
            this.getRuleData()

            this.theTreeDataChange(this.value)
            this.selectChange()
        },
        methods:{
            //获取表格的id
            getTableId(index) {
                var id = 0
                this.times.forEach((item2,index2) => {
                    if (index2 < index) {
                        id += parseInt(item2)
                    }
                })
                return id
            },
            //上下午点击全选的按钮
            isCheckAllTimeChange(value) {
                let a = this.changXData;
                let b = this.checkAlltime;
                //点击取消全选的时候调用
                if (a.length > b.length) {
                    let difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v))
                    // console.log(difference) 
                    difference.forEach((item,index) => {
                        var heng = item.split(',')[0]
                        var zong = item.split(',')[1]
                        var zongid = null
                        this.times.forEach((item2,index2) => {
                            // console.log(index2,zong-1)
                            if (index2 < zong - 1) {
                                zongid += item2
                            }
                            if (index2 == zong - 1) {
                                for (var i = 0; i < item2; i++) {
                                    let isitem = {
                                        timeid:heng + '' + (zongid + i + 1),
                                        tagid:''
                                    }
                                    this.checked.forEach((item,index) => {
                                        if (item.timeid == isitem.timeid && item.tagid == isitem.tagid) {
                                            console.log("进行中啊啊 ")
                                            this.checked.splice(index,1)
                                        }
                                    })
                                }
                            }
                        })
                    })
                }
                //记录上一次checkAlltime里面的值,用于找少了哪一个
                this.changXData = JSON.parse(JSON.stringify(this.checkAlltime))
                // console.log(value)
                //times=[0,2,2,0]
                //this.checkAlltime[0].split(',')[0]   //代表星期几横坐标第一位
                //this.checkAlltime[0].split(',')[1]   //代表星期几的上午还是下午  
                let resauleData = []
                this.checkAlltime.forEach((item,index) => {
                    var heng = item.split(',')[0]
                    var zong = item.split(',')[1]
                    var zongid = null
                    this.times.forEach((item2,index2) => {
                        // console.log(index2,zong-1)
                        if (index2 < zong - 1) {
                            zongid += item2
                        }
                        if (index2 == zong - 1) {
                            for (var i = 0; i < item2; i++) {
                                resauleData.push({
                                    timeid:heng + '' + (zongid + i + 1),
                                    tagid:''
                                })
                                this.checked.push({
                                    timeid:heng + '' + (zongid + i + 1),
                                    tagid:''
                                })
                            }
                        }
                    })
                })
                // console.log("结尾..")
                // console.log(this.checked)
                var hash = {}
                this.checked = this.checked.reduce((item,index) => {
                    hash[index['timeid']]? '' :hash[index['timeid']] = true && item.push(index)
                    return item;
                },[])
                // console.log(this.checked)
                // console.log(this.checked)
                this.isClickTable()
            },

            //初始化规则
            getRuleData() {
                this.$GET("/timesheetRestrict/list/",{pkjhid:this.$props.pkjhid}).then((res) => {
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
            //编辑提交
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
            editMotaiClose() {
                this.getBqData()
            },
            //获取所有排课用标签列表
            getBqData() {
                this.$GET("/timesheetTag/getTags").then((res) => {
                    this.bqboxOptions = res||[]
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
                // console.log(name)
                return name
            },
            //根据who不排课更改
            selectChange() {
                //左边树数据测试 
                this.theTreeDataChange(this.value)
                //选中的清空
                this.checked = []
                this.checkList = []

                if (this.value == 'unrange_global') {
                    this.showLeftTree = false
                    this.treeId = '0'
                    this.istype = this.value.split("_")[1]
                    this.getRightTableData()
                } else {
                    this.showLeftTree = true
                }

                this.treeId = '0'

            },
            clickitem(e) {
                e === this.isbq? this.isbq = '' :this.isbq = e
            },
            //表格框变化调用
            isClickTable() {
                if (this.treeId != '0' || this.value == 'unrange_global') {
                    var hash = {}
                    this.checked = this.checked.reduceRight((item,index) => {
                        hash[index['timeid']]? '' :hash[index['timeid']] = true && item.push(index)
                        return item;
                    },[])
                    // console.log(this.checked)

                    //格式化返回后台数据的格式
                    let a = {
                        // id:this.treeId || '',
                        id:this.treeId || '0',
                        type:this.istype || '',
                        // type:this.value || '',
                        time:JSON.stringify(this.checked),
                        pkjhid:this.$props.pkjhid
                    }
                    // console.log(a)
                    this.$POST("/timesheetRestrict/setUnrangeTime",a).then((res) => {
                        if (res.code == 200) {
                            // console.log(res)
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
                this.$GET("/timesheetTask/getUnrangeObjList",{
                    year:this.thisYear,
                    mark:mark,
                    pkjhid:this.$props.pkjhid
                }).then((res) => {
                    this.treeData = res.data
                })
            },
            //控制左边树单选
            checkListChange() {
                // console.log(this.checkList)
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
                    // year:this.thisYear,
                    id:this.treeId || '0',
                    type:this.istype,
                    pkjhid:this.$props.pkjhid
                }).then((res) => {
                    this.checked = res.time
                })
            },
            //发送给父组件
            sendFrom() {
                this.$emit('receivecourseOne',this.ruleTableData)
            },
            checkedJsId(jsid) {
                // console.log(jsid)
                this.treeId = jsid
                this.istype = this.value.split("_")[1]
                this.getRightTableData()
            },
            checkedKcId(kcid) {
                // console.log(kcid)
                this.treeId = kcid
                this.istype = this.value.split("_")[1]
                this.getRightTableData()
            }
        },
    }
</script>

<style lang='less'>
    .setting-constraint-wrap {
        .isflagbox {
            .el-radio__input {
                display: none;
            }
            .el-radio__input.is-checked + .el-radio__label {
                color: #fff;
            }
            //
            .el-radio-button__inner {
                border-top: none;
                border-bottom: none;
                border-color: #fff;
                background-color: #F3F5F7;
            }
        }
        .el-radio {
            margin-right: 0;
        }

        .position-td {
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
            .el-checkbox__inner {
                display: none;
            }
            .arranging-common-table-thead {
                .el-checkbox {
                    margin-right: 0;
                    font-size: 12px;
                    color: #fff;
                    &:last-child {
                        // margin-right: 29px;
                    }
                }
                .el-checkbox__inner {
                    display: inline-block;
                }
                .mt-15 {
                    margin-top: 15px;
                }
            }
        }
        .tree-content-p {
            font-size: 24px;
        }
    }
</style> 

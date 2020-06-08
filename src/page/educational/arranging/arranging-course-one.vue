<template>
    <div class="arranging-course-one pr">
        <el-row>
            <span>选择：</span>
            <el-select v-model="value" placeholder="请选择" @change="selectChange">
                <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                </el-option>
            </el-select>
            <el-button type="primary" @click="addBq">添加标签</el-button>
            <el-button type="primary" @click="editBq">编辑标签</el-button>

            <el-button plain class="fr" @click="dialogFormVisibleRule = true">规则列表</el-button>
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
            </div>

        </el-row>
        <div class="yd-common-flex">
            <div class="common-left-tree">
                <div class="yd-common-select-tree"
                     :style="{'minHeight':(this.$store.state.minClientHeight-225)+'px'}">
                    <div class="bg-skin tree-title border-skin"><h3>选择</h3></div>
                    <div class="tree-content"
                         :style="{'maxHeight':(this.$store.state.minClientHeight-268)+'px'}">
                        <el-checkbox-group v-model="checkList" @change="checkListChange">
                            <p class="tree-content-p" v-for="(item,index) in treeData" :key="index">
                                <el-checkbox :label="item">{{item.value}}</el-checkbox>
                            </p>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="common-right-table yd-common-table ">
                <el-checkbox-group v-model="checked" @change="isClickTable">
                    <table class="arranging-course-table">
                        <thead>
                        <tr>
                            <td class="bg-skin" style="width: 5%;"><p>节次</p></td>
                            <template v-for="jc in this.weekHour">
                                <td class="bg-skin" :style="'width:'+(95/weekHour)+'%;'">
                                    <p>
                                        星期{{weekHours[jc-1]}}
                                    </p>
                                </td>
                            </template>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="obj in weekName">
                            <td style="width: 5%;">
                                <p style="color: #333;font-size: 13px">
                                    第{{obj}}节
                                </p>
                            </td>

                            <td v-for="item in weekHour" :style="'width:'+(95/weekHour)+'%;'">
                                <div style="min-height:48px">
                                    <template>
                                        <el-checkbox style="min-height:48px" :label="{timeid:''+item+obj,tagid:isbq}"
                                                     name="course">
                                            <p class="hover-skin table-td">
                                                {{getZnIsData(''+item+obj)}}
                                            </p>
                                        </el-checkbox>
                                    </template>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </el-checkbox-group>
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
                        {{scope.row.xm}}:
                        <span v-for="(item,index) in scope.row.ksxq.split(',')" :key="index">
                                    周{{item.substring(0,1)}}第{{item.substring(1)}}节,
                            </span>
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

    export default {
        name:"arranging-course-one",
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
                weekName:null,
                checked:[],
                //
                thisYear:'',
                checkList:[],
                treeData:[],

                //rule规则
                ruleTableData:[],
                //是否能点击右边格子


            }
        },
        created() {
            this.thisYear = this.$route.params.year
            //渲染表格参数
            this.getKbTableData()
            //下拉字典
            this.$GET("/system/dictList/BPKXL").then((res) => {
                this.options = res
                this.value = this.options[0].code
                this.theTreeDataChange(this.value)
            })

            //获取所有排课用标签列表
            this.getBqData()

            //初始化规则
            this.getRuleData()

        },
        methods:{
            //初始化规则
            getRuleData() {
                this.$GET("/timesheetRestrict/list/" + this.thisYear).then((res) => {
                    this.ruleTableData = res.data
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
                return name
            },
            //课表table渲染参数
            getKbTableData() {
                this.$GET("/timesheetTask/timeSheetTable").then((res) => {
                    this.weekHour = res.data.day
                    this.weekName = res.data.timeAll
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
            //\表格框变化调用
            isClickTable() {
                if (this.checkList.length) {
                    var hash = {}
                    this.checked = this.checked.reduceRight((item,index) => {
                        hash[index['timeid']]? '' :hash[index['timeid']] = true && item.push(index)
                        return item;
                    },[])

                    //格式化返回后台数据的格式  
                    let a = {
                        year:this.$route.params.year,
                        id:this.checkList[0].id || '',
                        type:this.checkList[0].label || '',
                        time:JSON.stringify(this.checked)
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
                    this.getRightTableData()
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
        },
    }
</script>

<style lang='less' scoped>
    .arranging-course-one {
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
        }
        .tree-content-p {
            font-size: 24px;
        }
    }
</style>

<style lang='less'>
    .arranging-course-one {
        .isflagbox {
            .el-radio__input {
                display: none;
            }
            // 颜色要写到皮肤里
            // .el-radio.is-bordered.is-checked{
            //     background-color: red; 
            // }
            .el-radio__input.is-checked + .el-radio__label {
                color: #fff;
            }
        }
        .el-radio {
            margin-right: 0;
        }

    }
</style> 

<template>
    <!--评教任务 -->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-school-calendar"></i></div>
                <h3>评教任务</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入评教任务搜索" v-model="params.condition"
                          @keyup.enter.native="searchForm"
                          class="input-with-select">
                    <el-button @click="searchForm" slot="append">搜索</el-button>
                </el-input>
                <el-button type="primary" @click="addComment">添加</el-button>
            </el-col>
        </el-row>
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd yd-common-table pr"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <!-- 选课的表格 -->
            <el-table
                    border
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50"
                        label="序号"
                        align="center">
                </el-table-column>
                <el-table-column prop="rwmc" label="评教任务" align="center">
                </el-table-column>
                <el-table-column prop="pjsjd" label="评教时间段" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.pjkssj.substring(0,10)}}
                            <span style="margin: 0 8px">至</span>
                            {{scope.row.pjjssj.substring(0,10)}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="参与教师数" align="center" width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.dqjsrs}}/{{scope.row.jssl}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="参与学生数" align="center" width="120">
                    <template slot-scope="scope">
                        <p>{{scope.row.dqxsrs}}/{{scope.row.xssl}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="pjf" label="平均分" align="center" width="90">
                    <template slot-scope="scope">
                        {{scope.row.pjf=='0'?0:scope.row.pjf?scope.row.pjf:'-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="sfqy" label="是否启用" align="center" width="110">
                    <template slot-scope="scope">
                        <p v-if="scope.row.sfqy == 1" class="text-red">已启用</p>
                        <p v-if="scope.row.sfqy == 0">未启用</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="210">
                    <template slot-scope="scope">
                        <el-button class="edit-btn" @click="editTable(scope.row)"
                                   type="text">
                            <i class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button class="del-btn" @click="delTable(scope.$index,scope.row.rwid)"
                                   type="text">
                            <i class="el-icon-delete"></i>删除
                        </el-button>
                        <el-button class="edit-btn" @click="lookScore(scope.row)"
                                   type="text">
                            <i class="el-icon-document"></i>平均分
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <yd-page ref="ydPage" url="/evaluationTask/list" :params="params" @changePage="changePage"></yd-page>
        </div>
        <!--添加评教任务-->
        <el-dialog title="评教任务" v-if='addDialog'
                   :visible.sync="addDialog"
                   width="860px"
                   lock-scroll
                   top="10vh"
                   :close-on-click-modal='false'>
            <el-row>
                <el-col :span="22" :offset="1">
                    <el-form ref="ruleForm" :model="evaluationJson.evaluationTask" :rules="rules" label-width="86px">
                        <el-form-item label="评教任务:" prop="rwmc">
                            <el-input v-model="evaluationJson.evaluationTask.rwmc" placeholder="请输入评教任务"></el-input>
                        </el-form-item>
                        <el-form-item label="评教描述:" prop="rwms">
                            <el-input :rows="2" v-model="evaluationJson.evaluationTask.rwms"
                                      maxlength="100"
                                      show-word-limit
                                      type="textarea"
                                      placeholder="请输入评教描述"></el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="15">
                                <el-form-item label="开始时间:" required>
                                    <el-date-picker
                                            style="width:320px;"
                                            v-model="formTime"
                                            type="daterange"
                                            range-separator="至"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" :offset="1">
                                <el-form-item label="是否启用:">
                                    <el-radio v-model="evaluationJson.evaluationTask.sfqy"
                                              label="1">启用
                                    </el-radio>
                                    <el-radio v-model="evaluationJson.evaluationTask.sfqy"
                                              label="0">否
                                    </el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <el-table
                            border
                            stripe
                            ref="singleTable"
                            :data="evaluationJson.evaluationProjectList"
                            max-height="400px"
                            style="width: 100%">
                        <el-table-column
                                label="序号"
                                type="index"
                                align="center"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="xmmc"
                                label="名称"
                                align="center">
                            <template slot-scope="scope">
                                <el-input type="textarea" :rows="2"
                                          v-model="scope.row.xmmc"
                                          size="small"
                                          placeholder="请输入名称"></el-input>
                                <!--<el-input size="small" v-model="scope.row.xmmc" placeholder="请输入名称"></el-input>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="xmfz"
                                label="项目分值"
                                width="120"
                                align="center">
                            <template slot-scope="scope">
                                <el-input size="small"
                                          type="number"
                                          @change="changeScore"
                                          v-model="scope.row.xmfz"
                                          placeholder="输入数字"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="fzfb"
                                label="分值分布"
                                width="160"
                                align="center">
                            <template slot-scope="scope">
                                <el-input size="small"
                                          v-model="scope.row.fzfb"
                                          placeholder="以逗号分隔的数字"
                                          @input="scope.row.fzfb = scope.row.fzfb.replace(/[^0-9,]*/g,'')">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                width="80"
                                align="center">
                            <template slot-scope="scope">
                                <i style="font-size: 16px"
                                   @click="delList(scope.$index,scope.row.xmid)" class="text-red el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row class="comment-num">
                        <el-col :span="16"><p><span style="margin-right: 6px">总分:</span>{{allScore}}</p></el-col>
                        <el-col :span="8" class="text-right">
                            <el-button size="mini" @click="addList"><i class="el-icon-plus"></i>添加</el-button>
                            <el-button size="mini" @click="important">引入</el-button>
                        </el-col>
                    </el-row>
                    <div class="dialog-footer text-left mt-20">
                        <el-button @click="addDialog = false">取 消</el-button>
                        <el-button type="primary" @click="submitForm">确 定</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
        <!--详情弹窗-->
        <el-dialog title="平均分" v-if='dialogVisible'
                   :visible.sync="dialogVisible" width="680px"
                   :close-on-click-modal='false'>
            <el-table
                    border
                    :data="scoreTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :max-height="(this.$store.state.minClientHeight*0.6) + 'px'">
                <el-table-column prop="xmmc" label="项目名称" align="center">
                </el-table-column>
                <el-table-column prop="xmfz" label="参考分" align="center" width="120">
                </el-table-column>
                <el-table-column prop="pjf" label="平均分" align="center" width="120">
                    <template slot-scope="scope">
                        <p v-if="scope.row.pjf == ''">-</p>
                        <p v-else>{{scope.row.pjf}}</p>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!--选择评教列表-->
        <el-dialog
                title="引入评教任务"
                :visible.sync="importDialog"
                width="680px">
            <el-checkbox-group v-model="importRxid" @change="changRwid">
                <ul class="import-check-dialog">
                    <li class="item-block" v-for="(item,index) in historyList" :key="index">
                        <el-checkbox :label="item.rwid" name="type">{{item.rwmc}}</el-checkbox>
                    </li>
                </ul>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="importDialog = false">取 消</el-button>
                <el-button type="primary" @click="submitRwid">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ydSelectDialogTree from "../../components-page/select/yd-tree-ksid-dialog"

    export default {
        components:{
            ydSelectDialogTree
        },
        name:"manage-achievements",
        data() {
            return {
                params:{
                    limit:20,
                    condition:''
                },
                addDialog:false,
                dialogVisible:false,
                importDialog:false,
                evaluationJson:{
                    evaluationTask:{
                        rwid:'',
                        rwmc:'',
                        pjkssj:'',
                        pjjssj:'',
                        rwms:'',
                        sfqy:'1',
                    },
                    evaluationProjectList:[
                        {
                            xmmc:'',
                            xmfz:'',
                            fzfb:'',
                        },
                    ]
                },
                tableData:[],
                formTime:[],
                rules:{
                    rwmc:[{required:true,message:'请输入必填项',trigger:'blur'}],
                    rwms:[{required:true,message:'请输入必填项',trigger:'blur'}],
                    xmfz:[{type:'number',message:'分值必需为数字'}]
                },
                scoreTable:[],
                allScore:0,
                //导入评教
                historyList:[],
                importRxid:[]
            }
        },
        created() {
            this.$GET('/evaluationTask/queryTask').then((res) => {
                if (res.code == 200) {
                    this.historyList = res.data
                }
                // console.log(res.data)
            })
        },
        /* computed:{
             allScore:function () {
                 let sum = null;
                 this.evaluationJson.evaluationProjectList.forEach(item => {
                     sum += parseFloat(item.xmfz)
                 })
                 return sum || 0;
             }
         },*/
        methods:{
            testNum(refId) {
                var reg = /^(\d+,?)+$/;
                if (refId != "") {
                    if (!reg.exec(refId)) {
                        refId = refId.substr(0,refId.length - 1);
                        // console.log(refId);
                        return false;
                    }
                }
            },
            submitRwid() {
                this.$POST('/evaluationTask/ImportByRwid',{rwid:this.importRxid.join(',')}).then((res) => {
                    if (res.code == 200) {
                        // console.log(res.data)
                        this.$message({
                            type:'success',
                            message:'引入成功'
                        })

                        this.importDialog = false
                        res.data.forEach(item => {
                            this.evaluationJson.evaluationProjectList.push({
                                xmmc:item.xmmc,
                                xmfz:item.xmfz,
                                fzfb:item.fzfb,
                            })
                        })
                        this.evaluationJson.evaluationProjectList.splice(0,1)
                        //计算分值
                        this.countScore()
                    }
                })
            },
            changRwid() {
                if (this.importRxid.length > 1) {
                    this.importRxid.shift();
                }
            },
            important() {
                this.importDialog = true
            },
            changeScore() {
                this.countScore()
            },
            countScore() {
                let sum = null;
                this.evaluationJson.evaluationProjectList.forEach(item => {
                    sum += parseFloat(item.xmfz)
                })
                this.allScore = sum || 0
            },
            lookScore(row) {
                this.$GET('/evaluationTask/detail',{rwid:row.rwid}).then((res) => {
                    this.scoreTable = res.data
                    this.dialogVisible = true
                })
            },
            changePage(data) {
                this.tableData = data
            },
            searchForm() {
                this.$refs.ydPage.getData('search')
            },
            resetForm() {
                this.evaluationJson.evaluationTask = {
                    rwid:'',
                    rwmc:'',
                    pjkssj:'',
                    pjjssj:'',
                    rwms:'',
                    sfqy:'1',
                }
                this.evaluationJson.evaluationProjectList = [
                    {
                        xmmc:'',
                        xmfz:'',
                        fzfb:'',
                    }
                ]
                this.scoreTable = []
                this.formTime = []
            },
            //添加评教
            addComment() {
                this.resetForm()
                this.addDialog = true
            },
            editTable(row) {
                this.resetForm() //清空数据
                this.$GET('/evaluationTask/queryTaskAndProjectByRwid',{rwid:row.rwid}).then((res) => {
                    if (res.code == 200) {
                        this.evaluationJson.evaluationTask = res.data.evaluationTask
                        this.evaluationJson.evaluationProjectList = res.data.evaluationProjectList
                        //单选转换为字符串
                        this.evaluationJson.evaluationTask.sfqy = this.evaluationJson.evaluationTask.sfqy.toString()
                        //赋值给时间组件
                        this.formTime.push(this.evaluationJson.evaluationTask.pjkssj.substring(0,10))
                        this.formTime.push(this.evaluationJson.evaluationTask.pjjssj.substring(0,10))
                        console.log(this.formTime)
                        this.addDialog = true
                        //计算分值
                        this.countScore()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            delTable(index,id) {
                this.$confirm('删除之后不可恢复, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$POST('/evaluationTask/delete',{evaluationTaskId:id}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message:'刪除成功',
                                type:'success'
                            });
                            this.$refs.ydPage.getData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            submitForm() {  
                let a = []
                this.evaluationJson.evaluationProjectList.forEach((item,index)=>{
                    if(item.fzfb!==''&&item.xmfz!==''&&item.xmmc!==''){
                        a.push(item) 
                    }
                    let isfzfb = []
                    item.fzfb.split(',').forEach((item2,index2)=>{
                        if(item2!==''){
                            isfzfb.push(item2)
                        }
                    })
                    item.fzfb = isfzfb.join()
                })
                this.evaluationJson.evaluationProjectList = a   
                if (this.formTime.length > 0) {
                    //赋值给时间
                    this.evaluationJson.evaluationTask.pjkssj = this.formTime[0]
                    this.evaluationJson.evaluationTask.pjjssj = this.formTime[1]
                } else {
                    this.evaluationJson.evaluationTask.pjkssj = ''
                    this.evaluationJson.evaluationTask.pjjssj = ''
                }
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        //编辑
                        if (this.evaluationJson.evaluationTask.rwid) {
                            this.$POST('/evaluationTask/update',this.evaluationJson,{
                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        message:'修改成功',
                                        type:'success'
                                    })
                                    this.addDialog = false
                                    this.$refs.ydPage.getData()
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        } else { //新增
                            this.$POST('/evaluationTask/add',this.evaluationJson,{
                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        message:'新增成功',
                                        type:'success'
                                    })
                                    this.addDialog = false
                                    this.$refs.ydPage.getData()
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            delList(index,xmid) {
                this.$confirm('删除之后不可恢复, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.countScore()
                    this.$delete(this.evaluationJson.evaluationProjectList,index)
                    this.$GET('/evaluationProject/delete',{evaluationProjectId:xmid}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'删除成功'
                            })
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
            },
            addList() {
                this.evaluationJson.evaluationProjectList.push({
                    xmmc:'',
                    xmfz:'',
                    fzfb:'',
                    xmid:''
                })
            },
        }
        ,
    }
</script>

<style lang='less' scoped>
    .comment-num {
        padding: 10px 18px;
        border: 1px solid #EBEEF5;
        border-top: none;
        p {
            line-height: 28px;
            color: #020202;
        }
    }

    .import-check-dialog {
        max-height: 400px;
        overflow-y: auto;
        .item-block {
            display: inline-block;
            margin-right: 20px;
            margin-bottom: 20px;
        }
    }
</style>
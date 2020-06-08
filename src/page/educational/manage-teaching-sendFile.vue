<template>
    <!--教材分发-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-material"></i></div>
                <h3>分发教材</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入教材名称搜索" v-model="params.condition"
                          @keyup.enter.native="searchTable"
                          class="input-with-select">
                    <el-button slot="append" @click="searchTable">搜索</el-button>
                </el-input>
                <el-button type="primary" @click="addSendFile">新增分发</el-button>
                <el-button type="success" @click="sendFileHistory">分发历史</el-button>
                <el-button type="success" @click="printData">打印当前</el-button>
                <el-button type="success" @click="printDataAll">打印全部</el-button>
            </el-col>
        </el-row>

        <div class="yd-bg common-pd yd-common-table"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-row class="yd-common-search">
                <div class="fl">
                    <el-form :model="params" :inline="true">
                        <!-- <el-form-item label="年级:">
                            <el-select v-model="params.nj" @change="changeSearchZyh">
                                <el-option label="所有年级" value=""></el-option>
                                <el-option label="一年级" key="1" value=1></el-option>
                                <el-option label="二年级" key="2" value=2></el-option>
                                <el-option label="三年级" key="3" value=3></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="院系:">
                            <el-select v-model="yx" placeholder="请选择院系" @change="yxSelectzy">
                                <el-option label="所有院系" value=""></el-option>
                                <el-option
                                        v-for="item in yxOptions"
                                        :key="item.yxid"
                                        :label="item.yxmc"
                                        :value="item.yxid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="专业:">
                            <el-select v-model="params.zyh" @change="changeSearchZyh">
                                <el-option label="所有专业" value=""></el-option>
                                <el-option
                                        v-for="item in zyhOptions"
                                        :key="item.zyh"
                                        :label="item.zymc"
                                        :value="item.zyh"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="班级:">
                            <el-select v-model="params.bh">
                                <el-option label="所有班级" value=""></el-option>
                                <el-option
                                        v-for="(item,index) in bhOptions"
                                        :key="index"
                                        :label="item.bjmc" :value="item.bh">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="item-button item-">
                            <el-button type="primary" @click="searchTable">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="fr" align="right">

                </div>
            </el-row>

            <div ref="print">
                <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark">
                    <el-table-column prop="" label="教材名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.jcmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="分发专业" align="center">
                        <template slot-scope="scope">
                            {{scope.row.zymc||'-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="分发班级" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级总人数" align="center">
                        <template slot-scope="scope"> 
                            {{scope.row.rs=='0'?0:scope.row.rs?scope.row.rs:'-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="分发教材数量" align="center">
                        <template slot-scope="scope"> 
                            {{scope.row.ffsl=='0'?0:scope.row.ffsl?scope.row.ffsl:'-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" class-name="no-print" width="145">
                        <template slot-scope="scope">
                            <el-button @click="editSendFile(scope.row)" class="edit-btn" type="text" size="small">
                                <i class="el-icon-edit"></i>编辑
                            </el-button>
                            <el-button @click="deleteSendFile(scope.row)" class="del-btn" type="text" size="small">
                                <i class="el-icon-delete"></i>删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <yd-page ref="ydPage" :url="'/textbookInfo/distrbuteList'"
                     :params="{bjid:params.bh,condition:params.condition}"
                     @changePage="changePage"></yd-page>
            <!-- 模态  -->
            <el-dialog v-if="dialogFormVisible" width="680px"
                       z-index='20'
                       :visible.sync="dialogFormVisible"
                       :close-on-click-modal='false'
                       @close="closeDialog">
                <el-form :model="form" :rules="rules" label-width="100px"
                         class="clearfix" ref="ruleForm">
                    <el-col :span="12">
                        <el-form-item label="教材名称:" prop="jcid">
                            <el-select
                                    @change="changeJcId"
                                    placeholder="请选择分发的教材"
                                    v-model="form.jcid"
                                    filterable>
                                <el-option v-for="item in jcIdOptions"
                                           :key="item.jcid"
                                           :label="item.jcmc"
                                           :value="item.jcid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="教材数量:">
                            <p v-if="form.jcsl == '' && form.jcsl != 0"
                               style="height: 38px;color: #C0C4CC">选择教材后显示</p>
                            <p v-else style="height: 38px">{{form.jcsl}}</p>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="24">
                        <el-form-item label="院系:" prop="zyh">
                            <el-select v-model="yx1" @change="yxSelectzy1"> 
                                <el-option
                                        v-for="item in yxOptions1"
                                        :key="item.yxid"
                                        :label="item.yxmc"
                                        :value="item.yxid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分发专业:" prop="zyh">
                            <el-select v-model="form.zyh" @change="changeFormZyh()">
                                <el-option
                                        placeholder="请选择分发专业"
                                        v-for="(item,index) in zyhOptions1"
                                        :key="index"
                                        :label="item.zymc"
                                        :value="item.zyh"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分发年级:" prop="nj">
                            <el-select v-model="form.nj" placeholder="请选择分发年级" @change="changeFormZyh()">
                                <el-option
                                        v-for="item in njOptions"
                                        :label="item.njm"
                                        :key='item.nj'
                                        :value='item.nj'></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="分发班级:" prop="bjid">
                            <!-- <el-select @change="changeBh" v-model="form.bjid">
                                <el-option placeholder="请选择分发班级"
                                           v-for="(item,index) in bhOptions"
                                           :key="index"
                                           :label="item.bjmc"
                                           :value="item.bh">
                                </el-option>
                            </el-select> -->
                            <el-input v-show='!form.bjid' v-model="form.bjid" placeholder="点击选择班级"
                                      @click.native="openBzrDialog(form.bjid)"></el-input>
                            <el-input v-show='form.bjid' v-model="form.bjmc" placeholder="点击选择班级"
                                      @click.native="openBzrDialog(form.bjid)"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="班级人数:">
                            <p v-if="form.rs == '' && form.rs != 0" style="height: 38px;color: #C0C4CC">选择班级后显示</p>
                            <p v-else style="height: 38px">{{form.rs || '选择班级后显示'}}</p>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="分发数量:" prop="ffsl">
                            <el-input v-model.number="form.ffsl" autocomplete="off"
                                      placeholder="请输入分发数量"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
                <div class="dialog-footer text-center">
                    <el-button @click="closeDialog">取消</el-button>
                    <el-button class="text-left" type="primary" @click="submitSendFile">提交</el-button>
                </div>
            </el-dialog>

            <!--分发历史-->
            <el-dialog v-if="dialogSendFileHistory" width="960px"
                       :close-on-click-modal='false'
                       :visible.sync="dialogSendFileHistory">
                <send-file-history></send-file-history>
            </el-dialog>
        </div>
        <!--选择班级-->
        <el-dialog
                v-if="bzrDialogVisible"
                :close-on-click-modal='false'
                z-index="22"
                :modal="true"
                :visible.sync="bzrDialogVisible"
                width="600px"
                :before-close="closeDialog2">
            <yd-select-bjid-tree v-on:checkedBjId="checkedBjId" :bjid='bjid'></yd-select-bjid-tree>
            <div style="margin: 10px auto 20px" class="text-center">
                <el-button @click="closeDialog2">取 消</el-button>
                <el-button type="primary" @click="submitBzr">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    //选择树
    import ydSelectBjidTree from '../../components-page/select/yd-tree-bjid-dialog'
    import sendFileHistory from '../../components-page/educational/teaching-sendFile-history'

    export default {
        components:{
            sendFileHistory,
            ydSelectBjidTree
        },
        name:"manage-teaching-sendFile",
        data() {
            return {
                motaibjid:'',
                motaibjmc:'',
                bjid:'',
                bzrDialogVisible:false,


                yx:'',
                yx1:'',
                yxOptions:'',
                dialogFormVisible:false,
                dialogSendFileHistory:false,
                params:{
                    zyh:'',
                    nj:'',
                    bh:'',
                    condition:''
                },
                tableList:[],
                njOptions:[
                    {
                        nj:'1',
                        njm:'一年级'
                    },
                    {
                        nj:'2',
                        njm:'二年级'
                    },
                    {
                        nj:'3',
                        njm:'三年级'
                    }
                ],
                bhOptions:[],     //班级
                zyhOptions:[],
                zyhOptions1:[],
                jcIdOptions:[],    //教材名称
                form:{
                    id:'',
                    bjid:"",
                    bjmc:"",
                    ffsl:'',
                    jcid:"",
                    jcmc:"",
                    jcsl:'',
                    nj:"",
                    rs:"",
                    zyh:"",
                    zymc:"",
                },
                rules:{
                    jcid:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    nj:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    zyh:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    bjid:[
                        {required:true,message:'请输入必填项',trigger:'blur'}
                    ],
                    ffsl:[
                        {required:true,message:'分发数量不能为空'},
                        {type:'number',message:'分发数量为数字'}
                    ],
                }
            }
        },
        created() {

            //院系数据 
            this.$GET('/collegeInfo/queryCollegInfo').then((res) => {
                this.yxOptions = res.data
                this.yxOptions1 = res.data
            }),
                //专业数据
                // this.$GET('/majorInfo/selectList').then(
                //     (res) => {
                //         this.zyhOptions = res.data
                //     }
                // )
                //教材下拉框
                this.getJcOptions()
        },
        methods:{
            //教材下拉框
            getJcOptions(){
                this.$GET('/textbookInfo/searchTextBook').then(
                    (res) => {
                        this.jcIdOptions = res.data
                    }
                )
            },
            //打开班主任模态
            openBzrDialog(bjid) {
                this.bzrDialogVisible = true
            },
            closeDialog2() {//专业号弹窗关闭 
                this.bzrDialogVisible = false
            },
            submitBzr() { //确定班主任 
                this.form.bjid = this.motaibjid
                this.bjid = this.motaibjid
                this.form.bjmc = this.motaibjmc
                this.changeBh()
                this.bzrDialogVisible = false
            },
            checkedBjId(bjid,bjmc) {
                // console.log(bjid)
                // console.log(bjmc)
                this.motaibjid = bjid
                this.motaibjmc = bjmc
                // this.infoForm.bjid = bjid
                // this.infoForm.bjmc = bjmc
            },


            //分页数据
            changePage(res) {
                this.tableList = res
            },
            getBhOptions(params) {
                // console.log(params)
                this.$GET('/collegeInfo/queryClassInfoByZyh',{zyid:params.zyh}).then((res) => {
                        // console.log(res.data)
                        this.bhOptions = res.data
                    }
                )
            },
            changeSearchZyh() {
                this.getBhOptions(this.params)
                this.params.bh = ''
            },
            changeFormZyh() {
                this.form.bjid = ''
            },
            //班级变化
            changeBh() {
                if (this.form.bjid != '') {
                    this.$GET("/classInfo/detail/" + this.form.bjid).then((res) => {
                        // console.log(res)
                        this.form.rs = res.data.xsrs
                    })
                }
            },
            //教材变化
            changeJcId() {
                if (this.form.jcid != '') {
                    var index = this.jcIdOptions.map(function (item) {
                        return item.jcid;
                    }).indexOf(this.form.jcid);
                    this.form.jcsl = this.jcIdOptions[index].jcsl
                }
            },
            //打印
            printData() {
                this.$print(this.$refs.print) // 使用
            },
            //
            printDataAll(){
                window.open( '/manage/teaching/sendFile/pointAll?bh='+this.params.bh,'_blank')
                // window.open('/manage/teacher/details/' + jsid,'_blank')
            },
            //分发历史
            sendFileHistory() {
                this.dialogSendFileHistory = true;
            },
            //表单提交
            submitSendFile() {
                if (this.form.jcsl >= this.form.ffsl) {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            //新增
                            if (this.form.id == undefined || this.form.id == '') {
                                this.$POST('/textbookInfo/textBookDistribute',this.form).then((res) => {
                                        if (res.code == 200) {
                                            this.$message({
                                                message:'添加成功',
                                                type:'success'
                                            });
                                            this.$refs.ydPage.getData()
                                            this.dialogFormVisible = false;
                                        } else {
                                            this.$message({
                                                message:res.message,
                                                type:'error'
                                            });
                                        }
                                        
                                        this.getJcOptions()
                                    }
                                )
                            }
                            //修改
                            else {
                                this.$POST('/textbookInfo/distrbuteUpdate',this.form).then((res) => {
                                        if (res.code == 200) {
                                            this.$message({
                                                message:'修改成功',
                                                type:'success'
                                            });
                                            this.$refs.ydPage.getData()
                                            this.dialogFormVisible = false;
                                        } else {
                                            this.$message({
                                                message:res.message,
                                                type:'error'
                                            });
                                        }
                                        
                                    this.getJcOptions()
                                    }
                                )
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else {
                    this.$message.error('分发数量不能大于教材数量,请更改分发数量')
                }
            },
            //点击编辑
            editSendFile(row) {
                this.form = row
                this.$GET('/classInfo/classInfoSelect',this.form).then((res) => {
                        this.bhOptions = res.data
                        this.changeJcId()
                        this.changeBh()
                        this.dialogFormVisible = true;
                    }
                )
            },
            //删除
            deleteSendFile(row) {
                this.$confirm('此操作将永久删除该记录, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/textbookInfo/distrbuteDelete',row).then(
                        (res) => {
                            this.$refs.ydPage.getData()
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                        }
                    )
                })
            },
            //模态关闭
            closeDialog() {
                this.$refs.ydPage.getData()
                this.dialogFormVisible = false
            },
            searchTable() {
                this.$refs.ydPage.getData("search")
            },
            //教材分发
            addSendFile() {
                //重置清空数据
                this.form = {
                    id:'',
                    bjid:"",
                    bjmc:"",
                    ffsl:'',
                    jcid:"",
                    jcmc:"",
                    jcsl:'',
                    nj:"",
                    rs:"",
                    zyh:"",
                    zymc:"",
                }
                this.dialogFormVisible = true;
            },
            // 院系查专业
            yxSelectzy() {
                this.$GET('/collegeInfo/queryMajorByYXBM',{yxid:this.yx}).then((res) => {
                    // console.log(res.data)
                    this.zyhOptions = res.data
                })
            },
            yxSelectzy1() {
                this.$GET('/collegeInfo/queryMajorByYXBM',{yxid:this.yx1}).then((res) => {
                    // console.log(res.data)
                    this.zyhOptions1 = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
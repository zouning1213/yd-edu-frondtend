<template>
    <!--学籍注册-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-school-roll"></i></div>
                <h3>新生分班</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入学生姓名搜索" v-model="params.condition"
                          @keyup.enter.native="searchTable" class="input-with-select">
                    <el-button slot="append" @click="searchTable">搜索</el-button>
                </el-input>
                <yd-import-data
                        toPathName='专业'
                        ruleUrl='/majorInfo/list'
                        toPathUrl='educational_professional'
                        name="学生信息"
                        @importSuccess="importSuccess"
                        importUrl="/studentTemporary/exportExcel"
                        templateUrl="/studentTemporary/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/studentTemporary/exportData?'+
                        'bjids=' + this.params.bjid">
                </yd-export-data>
                <el-button @click="clearAllData" type="success">清空新生</el-button>
            </el-col>
        </el-row>
        <div class="common-pd yd-bg" ref="dialog">
            <div class="yd-common-flex">
                <div class="common-left-tree">
                    <yd-select-zy-tree @isClearAllid='isClearAllid'
                                       @checkedZyId="checkedZyId"
                                       @childEditBj="childEditBj" @childDeleteBj="childDeleteBj"
                                       ref="selectTree"></yd-select-zy-tree>
                </div>
                <div class="common-right-table yd-common-table">
                    <el-table :max-height="this.$store.state.minClientHeight-354" border ref="multipleTable"
                              :data="tableList" 
                              tooltip-effect="dark"
                              empty-text="暂无未分班的同学">
                        <el-table-column type="index"
                                         label="序号"
                                         width="50"
                                         align="center">
                        </el-table-column>
                        <el-table-column prop="zymc"
                                         label="专业名称/专业号"
                                         align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.zymc||'-'}}</p>
                                <p>({{scope.row.zyh||'-'}})</p>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop=""
                                          label="专业号"
                                          align="center">
                             <template slot-scope="scope">
                                 <p>{{scope.row.zyid||'-'}}</p>
                             </template>
                         </el-table-column>-->
                        <el-table-column prop=""
                                         label="姓名"
                                         align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.xm||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="xh"
                                         width="150"
                                         label="学号"
                                         align="center">
                            <template slot-scope="scope">
                                <el-button @click="xhEdit(scope.row)" size="mini" style="width:112px" class="line-1">
                                    {{scope.row.xh||'-'}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="中考成绩"
                                         align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.zkcj||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop=""
                                         label="入学学年"
                                         align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.rxxn.substring(0,4)||'-'}}年</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="bj" label="班级名称" align="center">
                            <template slot-scope="scope">
                                <p v-if="scope.row.bjid != ''">{{scope.row.bjmc}}</p>
                                <p v-else style="color: #ddd">未分班</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button class="edit-btn" @click="divideEdit(scope.row)" type="text" size="small">
                                    <i class="el-icon-document"></i>修改班级
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <yd-page url="/studentTemporary/list" ref="ydPage"
                             :params="{'limit':params.limit,'condition':params.condition,'bjids':params.bjid}"
                             @changePage="changePage"></yd-page>
                </div>
            </div>
            <div class="school-submit-bottom text-right">
                <el-form :inline="true" :model="form" ref="ruleForm" :rules="rules">
                    <el-form-item label="班级数量:" prop="bjsl">
                        <el-input v-model.number="form.bjsl" placeholder="班级总数量"></el-input>
                    </el-form-item>
                    <el-form-item label="重点班:" prop="zdbj">
                        <el-input v-model.number="form.zdbj" placeholder="重点班数量"></el-input>
                    </el-form-item>
                    <el-form-item class="item-button">
                        <el-button @click="divideClassInfo" type="primary" 
                            v-loading.fullscreen.lock="fullscreenLoading">开始分班</el-button>
                    </el-form-item>
                    <el-form-item class="item-button">
                        <el-button @click="divideSubmit" type="success">确定分班</el-button>
                    </el-form-item>
                    <el-form-item class="item-button">
                        <el-button @click="resectAll" type="success">重置学生学号</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--修改班级-->
        <el-dialog center width="400px"
                   :visible.sync="dialogFormVisible"
                   :close-on-click-modal='false'>
            <el-form v-model="editRow" label-width="80px" class="demo-form-inline">
                <el-form-item label="姓名:">
                    <span>{{editRow.xm}}</span>
                </el-form-item>
                <el-form-item label="班级:">
                    <el-select v-model="editRow.bjid">
                        <el-option v-for="item in classOptions"
                                   :key="item.BJID"
                                   :label="item.BJMC"
                                   :value="item.BJID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="divideEditSubmit" type="primary">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--修改学号-->
        <el-dialog center width="400px"
                   @close='xhclose'
                   :visible.sync="dialogFormVisibleXh"
                   :close-on-click-modal='false'>
            <el-form :model="editXhData" label-width="80px" class="demo-form-inline" :rules="xhrule" ref="xhformName">
                <el-form-item label="学号:" prop="xh">
                    <el-input v-model="editXhData.xh"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="xhEditSubmit" type="primary">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--编辑班级名称-->
        <el-dialog center width="400px"
                   :visible.sync="dialogFormVisibleBjmc"
                   :close-on-click-modal='false'>
            <el-form :model="childBjData" label-width="90px" class="demo-form-inline" :rules="rule" ref="formName">
                <el-form-item label="班级名称:" prop="bjmc">
                    <el-input v-model="childBjData.bjmc"></el-input>
                </el-form-item>
                <el-form-item label="班号:" prop="bh">
                    <el-input v-model="childBjData.bh"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="childEditBjSubmit" type="primary">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import '../../page/educational/css/manage-school-roll.less'
    import ydSelectZyTree from "../../components-page/select/yd-tree-zyid-editClass"
    import ydImportData from "../../components-page/common/yd-import-data"
    import ydExportData from "../../components-page/common/yd-export-data"


    export default {
        name:"manage-school-roll",
        components:{
            ydSelectZyTree,
            ydImportData,
            ydExportData
        },
        data() {
            return {
                params:{ //传递给分页组件需要的参数
                    limit:10,
                    condition:'',
                    zyid:'',
                    isnull:'',
                    bjid:''
                },
                importStuSuccess:false,
                fileList:[],
                childBjData:{
                    bjmc:'',
                    bjid:''
                },
                dialogFormVisibleImportStu:false,
                editXhData:{},
                zyid:'',
                dialogFormVisibleXh:false,
                dialogFormVisible:false,
                dialogFormVisibleBjmc:false,
                form:{
                    zyid:'',
                    zyid:'',
                    bjsl:null,
                    zdbj:null
                },
                xhrule:{
                    xh:[
                        {required:true,message:'请输入学号',trigger:'blur'}
                    ]
                },
                rules:{
                    zyid:[
                        {required:true,message:'请选择专业号',trigger:'blur'},
                    ],
                    bjsl:[
                        {required:true,message:'请输入班级数量',trigger:'change'},
                        {type:'number',message:'班级数量必需为数字'}
                    ],
                    zdbj:[
                        {required:true,message:'请输入重点班数量',trigger:'change'},
                        {type:'number',message:'重点班数量必需为数字'}
                    ],
                },
                rule:{
                    bh:[
                        {required:true,message:'请输入班号',trigger:'blur'}
                    ],
                    bjmc:[
                        {required:true,message:'请输入班级名称',trigger:'blur'}
                    ]
                },
                classOptions:[],
                zyOptions:[],
                tableList:[],
                editRow:{}, //编辑的对象
                fullscreenLoading: false
            }
        },
        created() {
            //获取专业下拉框
            this.$GET('/majorInfo/selectList').then(
                (res) => {
                    this.zyOptions = res.data
                }
            )
        },
        methods:{
            //清空按钮
            clearAllData() {
                this.$confirm('当前操作将所有的新生清空,清空之后不可恢复,是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$POST("/studentTemporary/deleteData").then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:"清空成功"
                            })
                            this.$refs.ydPage.getData();
                            this.$refs.selectTree.getTreeData()
                        } else {
                            this.$message({
                                type:'error',
                                message:res.message
                            })
                        }
                    })
                })
            },
            //重置所有学号
            resectAll() {
                let dialogPanel = this.$refs.dialog 
                this.$confirm('该操作将按照学号规则,重新对学生生成学号,生成之后不可恢复, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    const loading3 = this.$loading({
                        target: dialogPanel,
                        lock: true,
                        text: '正在重置中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$POST("/studentTemporary/resetXh").then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:"重置成功"
                            }) 
                        } else {
                            this.$message({
                                type:'error',
                                message:res.message
                            }) 
                        }
                        loading3.close();
                    })
                })
            },
            childEditBj(data) {
                //bjid查班级
                this.$GET("/studentTemporary/classTemporaryDetail",{bjid:data.value}).then((res) => {
                    this.childBjData = res
                })

                this.dialogFormVisibleBjmc = true
            },
            childEditBjSubmit() {
                this.$refs['formName'].validate((valid) => {
                    if (valid) {
                        this.$POST("/studentTemporary/updateClassTemporary",this.childBjData).then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    type:'success',
                                    message:"修改班级成功"
                                })
                                this.$refs.selectTree.getTreeData()
                                this.dialogFormVisibleBjmc = false
                            } else {
                                this.$message({
                                    type:'error',
                                    message:res.message
                                })
                            }
                        })
                    }
                });

            },
            childDeleteBj(data) {
                let bjid = data.id.substr(1)
                this.$confirm('此操作将永久删除该班级, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET("/studentTemporary/deleteClassTemporary",{bjid:bjid}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:"删除班级成功"
                            })
                            this.$refs.ydPage.getData();
                            this.$refs.selectTree.getTreeData()
                        } else {
                            this.$message({
                                type:'error',
                                message:res.message
                            })
                        }
                    })
                })
            },
            xhclose() {
                this.$refs.ydPage.getData();
            },
            //修改学号
            xhEdit(data) {
                if(data.xh){
                    this.editXhData = data
                    this.dialogFormVisibleXh = true
                }
                
            },
            //提交修改的学号
            xhEditSubmit() {
                this.$refs['xhformName'].validate((valid) => {
                    if (valid) {
                        this.$POST('/studentTemporary/update',this.editXhData).then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message:'修改学号成功',
                                    type:'success'
                                });
                                // this.$refs.ydPage.getData();
                                this.dialogFormVisibleXh = false
                            } else {
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //子树调用--专业
            checkedZyId(data) {
                let zyList = []
                let bjList = []
                data.forEach(item => {
                    if (item.substring(0,1) == 'z') {
                        if (item == 'znullzy') {
                            bjList.push(item.substring(1))
                        } else {
                            zyList.push(item.substring(1))
                        }
                    }
                    if (item.substring(0,1) == 'b') {
                        bjList.push(item.substring(1))
                    }
                });
                this.params.isnull = ''
                this.params.zyid = zyList.join(',')
                this.form.zyid = zyList.join(',')
                this.params.bjid = bjList.join(',')
                this.$nextTick(() => {
                    this.$refs.ydPage.getData();
                })
            },
            //清空选中的exportBjid跟exportZyid
            isClearAllid() {
                // console.log("啥都没选清空")
                this.params.isnull = ''
                this.params.zyid = ''
                this.params.bjid = ''
                this.form.zyid = ''
                this.form.zyid = ''
                this.$refs.ydPage.getData();
            },
            changePage(data) {
                // console.log('数据')
                // console.log(data)
                this.tableList = data.data || data
                // console.log(this.tableList)
            },
            //开始分班
            divideClassInfo() {
                let dialogPanel = this.$refs.dialog 
                if (this.params.zyid.split(',').length == 1 && this.form.zyid.split(',')[0]) {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            if (this.form.zdbj > this.form.bjsl) {
                                this.$message.error('重点班级数量不能大于班级总数量');
                                return
                            } else {
                                // this.fullscreenLoading = true; 
                                const loading = this.$loading({
                                    target: dialogPanel,
                                    lock: true,
                                    text: '正在分班中',
                                    spinner: 'el-icon-loading',
                                    background: 'rgba(0, 0, 0, 0.7)'
                                    });
                                this.$POST('/studentTemporary/distribute',this.form).then((res) => {
                                    if (res.code == 200) {
                                        this.$message({
                                            message:'分班成功',
                                            type:'success'
                                        });
                                        this.$refs.ydPage.getData();
                                        this.$refs.selectTree.getTreeData()
                                        // this.fullscreenLoading = false;
                                    } else {
                                        this.$message({
                                            message:res.message,
                                            type:'error'
                                        });
                                    }
                                    loading.close();
                                })
                            }
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else {
                    this.$message({
                        message:'请针对一个专业进行分班操作',
                        type:'error'
                    });
                }
            },
            //确定分班
            divideSubmit() {
                let dialogPanel = this.$refs.dialog 
                if (this.form.zyid.split(',').length == 1 && this.form.zyid.split(',')[0]) {
                    const loading1 = this.$loading({
                        target: dialogPanel,
                        lock: true,
                        text: '正在确定分班中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$POST('/studentTemporary/generate',{zyid:this.form.zyid}).then((res) => {
                        // console.log(res)
                        if (res.code == 200) {
                            this.$message({
                                message:'确定分班成功',
                                type:'success'
                            });
                            this.$refs.ydPage.getData();
                            this.$refs.selectTree.getTreeData()
                        } else {
                            this.$message.error(res.message);
                        }
                        loading1.close();
                    })
                } else {
                    this.$message.error('请先选择左侧的一个专业, 再进行确认分班');
                }

            },
            //修改分班
            divideEdit(row) {
                // console.log(row)
                // this.editRow = row.bjid
                // if (this.form.zyid.split(',').length == 1 && this.form.zyid.split(',')[0]) {
                    this.$GET('/studentTemporary/classListByZyh',{zyid:row.zyid}).then((res) => {
                        // console.log(res)
                        if (res.data.length > 0) {
                            this.classOptions = res.data
                            this.editRow = row
                            this.dialogFormVisible = true;
                        } else {
                            this.$message.error('当前学生暂未分班，还不能修改班级');
                        }
                    })
                // } else {
                //     this.$message.error('请选择修改到哪一个专业下的班级');
                // }

            },
            //确定修改班级
            divideEditSubmit() {
                let index = this.classOptions.findIndex((num) => {
                    return num.BH == this.editRow.bjid
                })
                // let bjmc = this.classOptions[index].BJMC
                let params = {
                    // bj:bjmc,
                    bjid:this.editRow.bjid,
                    temporaryId:this.editRow.temporaryId
                }
                this.$POST('/studentTemporary/update',params).then((res) => {
                        // console.log(res)
                        if (res.code == 200) {
                            this.$refs.ydPage.getData();
                            this.dialogFormVisible = false;
                            this.$message({
                                message:'修改成功',
                                type:'success'
                            });
                            this.$refs.selectTree.getTreeData()
                        } else {
                            this.$message({
                                message:res.message,
                                type:'error'
                            });
                        }
                    }
                )
            },
            //查询
            searchTable() {
                this.params.zyid = ''
                this.params.bjid = ''
                this.params.isnull = ''
                this.$refs.selectTree.removeNode()
                this.$nextTick((res) => {
                    this.$refs.ydPage.getData();
                })

            },
            importSuccess() {
                this.$refs.ydPage.getData();
                this.$refs.selectTree.getTreeData()
            }
        },
    }
</script>

<style scoped lang='less'>
    .yd-router-title {

    }

    .school-submit-bottom {
        margin-top: 20px;
        width: 100%;
        background-color: #F3F5F7;
        padding: 10px;
        .tip {
            font-size: 13px;
        }
        .el-form-item {
            margin-bottom: 0;
            .el-input {
                width: 120px;
            }
        }
    }
</style>
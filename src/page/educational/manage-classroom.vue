<template>
    <!--教室管理-->
    <div class="yd-manage-classroom">
        <el-row class="yd-router-title yd-bg manage-student-scourse">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-classroom"></i></div>
                <h3>教室管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入教室名称" v-model="params.jsmc" class="input-with-select text-right"
                          @keyup.enter.native="searchBy">
                    <el-button slot="append" @click="searchBy">搜索</el-button>
                </el-input>
                <el-button type="primary" @click="dialogFormVisible = true">添加教室</el-button>
                <yd-import-data
                        toPathName='教学楼'
                        ruleUrl='/teachingBuilding/list'
                        toPathUrl='educational_teaching_building'

                        name="教室"
                        @importSuccess="importSuccess"
                        importUrl="/classRoom/exportExcel"
                        templateUrl="/classRoom/exportTemplate">
                </yd-import-data>
                <yd-export-data
                        :url="remoteHost + '/classRoom/exportData ' "
                        name="教室"></yd-export-data>
            </el-col>
        </el-row>
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd" :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-row class="yd-common-search">
                <!-- <div class="yd-add-btn" style="right:-10px;top:-10px" @click="dialogFormVisible = true"></div> -->
                <div class="fl">
                    <el-form :inline="true" :model="params">
                        <el-form-item label="教学楼:">
                            <el-select v-model="params.jxlid" placeholder="请选择教学楼" :disabled="isEdit">
                                <el-option label="所有教学楼" value=""></el-option>
                                <el-option v-for="(item,index) in JxlOptions"
                                           :key="index"
                                           :label="item.jxlmc"
                                           :value="item.jxlid"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="教室类型:">
                            <el-select v-model="params.jsxz" placeholder="请选择教室类型" :disabled="isEdit">
                                <el-option label="所有类型" value=""></el-option>
                                <el-option v-for="(item,index) in jsxzOptions"
                                           :key="index"
                                           :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="searchBy">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-row>
            <!-- 选课的表格 -->
            <div class="yd-common-table yd-students-course" ref="print">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%">
                    <el-table-column prop="jxlmc" label="教学楼名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.jxlmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jsmc" label="教室名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.jsmc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jsdd" label="教室地址" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.jsdd||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="rnrs" label="教室容量" align="center">
                        <template slot-scope="scope">{{scope.row.rnrs||'-'}}
                            <span style="margin-left: 4px">(人)</span></template>
                    </el-table-column>
                    <el-table-column prop="jsxzmc" label="教室类型" align="center">
                        <template slot-scope="scope">
                            {{scope.row.jsxzmc}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="jszt" label="状态" align="center" class="xiaodian">
                         <template slot-scope="scope">
                             <ul>
                                 <li :class="scope.row.jszt=='2'?'text-red':scope.row.jszt=='3'?'text-blue':''">
                                     {{scope.row.jszt=='1'?'正常':scope.row.jszt=='2'?'损坏':'报修'}}
                                 </li>
                             </ul>
                         </template>
                     </el-table-column>-->
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button class="edit-btn" @click="editClassRoom(scope.row)"
                                       type="text" size="small">
                                <i class="el-icon-edit"></i> 编辑
                            </el-button>
                            <el-button class="del-btn" @click="delClassRoom(scope.row)"
                                       type="text" size="small">
                                <i class="el-icon-delete"></i> 删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <yd-page ref="ydPage" :url="'/classRoom/list'" :params="params"
                     @changePage="changePage"></yd-page>
        </div>
        <!-- 模态 -->
        <el-dialog
                :visible.sync="dialogFormVisible"
                :close-on-click-modal='false'
                width="600px" class="manage-course" @close="motaiClose">
            <el-form v-if="dialogFormVisible"
                     :model="roomFrom"
                     :rules="rules" ref="ruleForm"
                     label-width="120px">
                <el-form-item label="教室名称:" prop="jsmc">
                    <el-input v-model="roomFrom.jsmc" :disabled="isEdit" placeholder="请输入教室名称"></el-input>
                </el-form-item>

                <el-form-item label="教室地址:" prop="jsdd">
                    <el-input v-model="roomFrom.jsdd" :disabled="isEdit" placeholder="请输入教室地址"></el-input>
                </el-form-item>
                <el-form-item label="选择教学楼:" prop="jxlid">
                    <el-select v-model="roomFrom.jxlid" placeholder="请选择教学楼" :disabled="isEdit">
                        <el-option v-for="(item,index) in JxlOptions"
                                   :key="index"
                                   :label="item.jxlmc"
                                   :value="item.jxlid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教室类型:" prop="jsxz">
                    <el-select v-model="roomFrom.jsxz" placeholder="请选择教室类型" :disabled="isEdit">
                        <el-option v-for="(item,index) in jsxzOptions"
                                   :key="index"
                                   :label="item.name"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="教室容量:" prop="rnrs">
                    <el-input v-model="roomFrom.rnrs" :disabled="isEdit" placeholder="请输入教室容纳人数" type="number"
                              onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="pl-120">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" @click="submitClassRoom('ruleForm')"> 保 存</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import ydExportData from '../../components-page/common/yd-export-data'
    import ydImportData from '../../components-page/common/yd-import-data'
    export default {
        name:"manage-classroom",
        components:{ 
            ydExportData,
            ydImportData
        },
        data() {
            return {
                search:'',
                JxlOptions:[],
                dialogFormVisible:false,
                isEdit:false,
                params:{
                    jxlid:"",
                    jsxz:"",
                    jsmc:'',
                },
                roomFrom:{
                    jsmc:'',
                    jsdd:'',
                    zyh:'',
                    nj:'',
                    jsxz:'',
                    rnrs:'',
                    jszt:'',
                    jsh:'',
                    jxlid:''
                },
                jsxzOptions:[],
                rules:{
                    jsmc:[
                        {required:true,message:'请输入教室名称',trigger:'blur'}
                    ],
                    jsdd:[
                        {required:true,message:'请输入教室地址',trigger:'blur'}
                    ],
                    rnrs:[
                        {required:true,message:'请输入教室容量',trigger:'blur'}
                    ],
                    jsxz:[
                        {required:true,message:'请输入教室类型',trigger:'blur'}
                    ],
                    jxlid:[
                        {required:true,message:'请选择教学楼',trigger:'blur'}
                    ]
                },
                tableData:[]
            }
        },
        created() {
            this.$GET("/system/dictList/JSXZ").then((res) => {
                this.jsxzOptions = res
            })
            //获取所有教学楼
            this.$GET("/teachingBuilding/list",{limit:99999,page:1}).then((res) => {
                this.JxlOptions = res.data
            })
        },
        methods:{
            //导入成功回调
            importSuccess(){ 
                this.$refs.ydPage.getData()
            },
            changePage(res) {
                this.tableData = res
            },
            //点击编辑
            editClassRoom(row) {
                this.roomFrom = row
                this.isEdit = false
                this.dialogFormVisible = true
            },
            delClassRoom(row) {
                this.$confirm('当前选择删除该教室,删除之后不可恢复?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/classRoom/delete',{classRoomId:row.jsh}).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message:'删除成功',
                                type:'success'
                            });
                            this.$refs.ydPage.getData()
                        } else {
                            this.$message.error(res.message);
                        }
                    })
                })
            },
            //模态关闭
            motaiClose() {
                this.roomFrom.jsmc = ''
                this.roomFrom.jsdd = ''
                this.roomFrom.jsxz = ''
                this.roomFrom.rnrs = ''
                this.roomFrom.nj = ''
                this.roomFrom.zyh = ''
                this.roomFrom.jszt = ''
                this.roomFrom.jsh = ''
                this.roomFrom.jxlid = ''
                this.$refs.ydPage.getData()
                this.isEdit = false
                this.dialogFormVisible = false
            },
            //模态保存
            submitClassRoom(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {
                            jsmc:this.roomFrom.jsmc,
                            jsdd:this.roomFrom.jsdd,
                            nj:this.roomFrom.nj,
                            zyh:this.roomFrom.zyh,
                            jsxz:this.roomFrom.jsxz,
                            rnrs:this.roomFrom.rnrs,
                            jszt:this.roomFrom.jszt,
                            jxlid:this.roomFrom.jxlid,
                        }

                        if (this.roomFrom.jsh) {
                            obj.jsh = this.roomFrom.jsh
                            this.$POST('/classRoom/update',obj).then((res) => {  
                                if(res.code==200){
                                    this.$message({
                                        message:'修改成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogFormVisible = false
                                }else{
                                    this.$message({
                                        message:res.message,
                                        type:'error'
                                    });
                                }
                            })
                        }
                        else {
                            this.$POST('/classRoom/add',obj).then((res) => {
                                if(res.code==200){
                                    this.$message({
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.dialogFormVisible = false
                                }else{
                                    this.$message({
                                        message:res.message,
                                        type:'error'
                                    });
                                }
                                
                            })
                        }
                    } else {
                        this.$message.error('请输入必填项');
                        return false;
                    }
                });

            },
            //搜索
            searchBy() {
                this.$refs.ydPage.getData('search')
                // this.search = ''
            }
        }
    }
</script>

<style lang="less">
    .yd-manage-classroom {
        .manage-course {
            .el-input {
                width: 400px;
            }
        }
        .pl-120 {
            padding-left: 120px;
        }
        .text-red {
            color: red
        }
        .text-blue {
            color: #3E7857
        }
        .yd-students-course {
            ul {
                li {
                    list-style: inside;
                }
            }
        }

    }

    .huafennianji {
        z-index: 1013 !important;
    }
</style>
<style lang="less" scoped>
</style>

<template>
    <!--师资管理-->
    <div class="yd-manage-teachers">
        <el-row class="yd-router-title yd-bg manage-student-scourse">
            <el-col :span="2">
                <div class="title-icon icon-skin"><i class="yd icon-teacher-resources"></i></div>
                <h3>师资管理</h3>
            </el-col>
            <el-col :span="22" class="text-right">
                <el-select class=" " v-model="params.whcdm" placeholder="请选择">
                    <el-option label="所有文化程度" value=""></el-option>
                    <el-option v-for="(item,index) in whcdOptions" :key="index"
                               :label="item.name" :value="item.code"></el-option>
                </el-select>
                <el-input placeholder="按教师姓名或职工号" v-model="params.condition"
                          class="input-with-select text-right"
                          @keyup.enter.native="selectby">
                    <!--<el-button slot="append" @click="selectby">搜索</el-button>-->
                </el-input>
                <el-button type="primary" @click="selectby">查询</el-button>
            </el-col>
        </el-row>
        <!-- 中间 主体  -->
        <div class="yd-bg common-pd yd-common-flex">
            <div class="common-left-tree">
                <yd-select-tree ref="selectTree" v-on:checkedKsId="checkedKsId"></yd-select-tree>
            </div>
            <div class="common-right-table">
                <!-- 选课的表格 -->
                <div class="yd-common-table" ref="print">
                    <el-table
                            border
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            empty-text="暂无教师">
                        <el-table-column label="序号" align="center" width="80">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="xm" label="教师姓名" align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.xm||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zgh" label="职工号" align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.zgh||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="lxny" label="来校年月" align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.lxny||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zymc" label="现从事专业" align="center" width="110">
                            <template slot-scope="scope">
                                <p>{{scope.row.zymc||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="whcd" label="文化程度" align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.whcd||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="szztmc" label="师资状态" align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.szztmc||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="szzcmc" label="师资职称" align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.szzcmc||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="jslxmc" label="师资类型" align="center">
                            <template slot-scope="scope">
                                <p>{{scope.row.jslxmc||'-'}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="180">
                            <template slot-scope="scope">
                                <el-button class="detail-btn" type="text" size="small" @click="openDialog(scope.row)">
                                    <i class="el-icon-edit-outline"></i>编辑师资状态
                                </el-button>
                                <el-button class="detail-btn" type="text" size="small"
                                           @click="openDetials(scope.row.jsid)">
                                    <i class="el-icon-document"></i>详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <yd-page ref="ydPage" :url="'/teacherInfo/list'"
                             :params="params"
                             @changePage="changePage"></yd-page>
                </div>
            </div>
        </div>
        <el-dialog
                @close="motaiClose"
                title=""
                :close-on-click-modal='false'
                :visible.sync="centerDialogVisible"
                width="480px"
                center>
            <el-form :model="motaiform" :rules="rules" ref="ruleForm" style="padding-left: 80px">
                <el-form-item label="师资状态" prop="szzt" style="margin-left: -10px">
                    <el-select v-model="motaiform.szzt" placeholder="请选择师资状态">
                        <el-option v-for="(item,index) in szztOptions" :key="index"
                                   :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="师资职称">
                    <el-select v-model="motaiform.szzc" placeholder="请选择师资职称">
                        <el-option v-for="(item,index) in szzcOptions" :key="index"
                                   :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="师资类型">
                    <el-select v-model="motaiform.jslx" placeholder="请选择师资类型">
                        <el-option v-for="(item,index) in jslxOptions" :key="index"
                                   :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="text-center mt-20">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitMotai">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ydSelectDialogTree from '../../components-page/select/yd-tree-ksid-dialog'
    import ydSelectTree from '../../components-page/select/yd-tree-ksid'

    export default {
        name:"manage-teachers",
        components:{
            ydSelectDialogTree,
            ydSelectTree,
        },
        data() {
            return {
                centerDialogVisible:false,
                whcdOptions:[],
                szztOptions:[],
                jslxOptions:[],
                szzcOptions:[],
                params:{
                    ksid:'',
                    whcdm:"",
                    condition:''
                },
                motaiform:{
                    szzt:'',
                    szzc:'',
                    jslx:''
                },
                rules:{
                    szzt:[
                        {required:true,message:'请选择师资状态',trigger:'blur'}
                    ],
                },
                motaisubmitData:[],
                tableData:[]
            }
        },
        created() {
            //文化程度下拉框
            this.$GET('/system/dictList/WHCDM',).then((res) => {
                this.whcdOptions = res
            })
            //师资状态下拉框
            this.$GET('/system/dictList/SZZT',).then((res) => {
                this.szztOptions = res
            })
            //师资类型下拉框
            this.$GET('/system/dictList/JSLX',).then((res) => {
                this.jslxOptions = res
            })
            //师资职称下拉框
            this.$GET('/system/dictList/SZZC',).then((res) => {
                this.szzcOptions = res
            })
        },
        methods:{
            checkedKsId(ksid) {
                this.params.ksid = ksid
                this.params.condition = ''
                this.params.whcdm = ''
                this.$nextTick(() => {
                    this.$refs.ydPage.getData()
                })
            },
            //点击编辑
            openDialog(row) {
                this.motaisubmitData = row
                this.motaiform.szzt = row.szzt
                this.motaiform.szzc = row.szzc
                this.motaiform.jslx = row.jslx
                this.centerDialogVisible = true
            },
            //模态关闭
            motaiClose() {
                this.motaisubmitData = []
                this.motaiform.szzt = ''
                this.motaiform.szzc = ''
                this.motaiform.jslx = ''
            },
            //模态提交
            submitMotai() {
                this.motaisubmitData.szzt = this.motaiform.szzt
                this.motaisubmitData.szzc = this.motaiform.szzc
                this.motaisubmitData.jslx = this.motaiform.jslx
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.$POST("/teacherInfo/update",this.motaisubmitData).then((res) => {
                            this.$message({message:'修改成功',type:'success'});
                            this.$refs.ydPage.getData()
                            this.centerDialogVisible = false
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //查询
            selectby() {
                this.params.ksid = ''
                this.$refs.selectTree.removeNode()
                this.$refs.ydPage.getData("search")
            },
            changePage(data) {
                this.tableData = data
                // console.log(data)
            },
            //打开新窗口
            openDetials(jsid) {
                window.open('/manage/teacher/details/' + jsid,'_blank')
            },
        }
    }
</script>

<style scoped>

</style>

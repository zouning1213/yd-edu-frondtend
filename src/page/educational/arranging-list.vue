<template>
    <el-row class="yd-bg mt-20" :style="{'minHeight':this.$store.state.minClientHeight - 100+'px'}">
        <div class="yd-router-title box-shadow-none" style="margin-bottom: 0;margin-top:6px;">
            <el-row style="border-bottom: 1px solid #EDF0F6;padding-bottom: 20px">
                <el-col :span="4">
                    <div class="title-icon icon-skin"><i class="yd icon-schedule"></i></div>
                    <h3>辅助排课</h3>
                </el-col>
                <el-col :span="20" class="text-right">
                    <el-input placeholder="请输入排课名称搜索" v-model="params.condition"
                              @keyup.enter.native="searchForm" style="width: 335px">
                        <el-button slot="append" @click="searchForm">搜索</el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div style="padding: 0 26px">
            <router-link tag="a" target="_blank"
                         :to="{name:'arranging_setting_multiple',
                          params:{planid:0}}">
                <el-button type="primary" style="margin-right: 10px">
                    全局设置
                </el-button>
            </router-link>
            <el-button type="primary" icon="el-icon-plus" @click="addCourse">新增排课计划</el-button>
        </div>
        <div class="common-pd yd-common-table">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="pkjhmc"
                        label="名称"
                        align="center">
                </el-table-column>
                <!--  <el-table-column
                          prop="name"
                          label="类型"
                          align="center">
                  </el-table-column>
                  <el-table-column
                          prop="address"
                          label="状态"
                          align="center">
                  </el-table-column>-->
                <el-table-column
                        prop="createTime"
                        align="center"
                        label="创建时间">
                    <!-- <template slot-scope="scope">
                         <p v-if="scope.row.createTime" class="line-1">
                             {{scope.row.createTime.substring(0,10)}}</p>
                     </template>-->
                </el-table-column>
                <!--       <el-table-column
                               prop="address"
                               align="center"
                               label="更新时间">
                       </el-table-column>-->
                <el-table-column
                        prop="xqmc"
                        align="center"
                        label="学期">
                    <!--<template slot-scope="scope">{{xqObject}}</template>-->
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="排课范围"
                        align="center">
                    <template slot-scope="scope">
                        <el-radio-group v-model="radio">
                            <el-radio label="1">全校</el-radio>
                        </el-radio-group>
                        <!-- <el-checkbox-group v-model="全校">
                             <el-checkbox label="全校" name="type"></el-checkbox>
                         </el-checkbox-group>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        align="center"
                        label="操作" width="288">
                    <template slot-scope="scope">
                        <router-link tag="a" target="_blank" :to="{name:'arranging_setting_single',
                        params:{planid:scope.row.pkjhid,planName:scope.row.pkjhmc}}">
                            <el-button class="edit-btn" type="text" icon="el-icon-date">排课</el-button>
                        </router-link>
                        <!--  <el-button class="edit-btn" type="text" icon="el-icon-document-copy">复用
                          </el-button>-->
                        <el-button class="edit-btn" type="text" icon="el-icon-edit" @click="editPkjh(scope.row)">修改
                        </el-button>
                        <el-button class="del-btn" type="text" icon="el-icon-delete" @click="delPkjh(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <yd-page ref="page" url="/timesheetPlan/list" :params="params" @changePage="changeData"></yd-page>
        </div>
        <!--添加辅助排课弹窗-->
        <el-dialog
                :visible.sync="dialogVisible"
                width="480px"
                @close="motaiClose"
                custom-class="course-setting-dialog">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="学期选择:" prop="xlid">
                    <el-select v-model="form.xlid" placeholder="请选择学期">
                        <el-option v-for="(item,index) in xqOption"
                                   :key="index"
                                   :label="item.xlxq"
                                   :value="item.xlid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排课名称:" prop="pkjhmc">
                    <el-input v-model="form.pkjhmc" placeholder="请输入排课名称"></el-input>
                </el-form-item>
                <!--        <el-form-item label="排课范围:">
                            <el-checkbox-group v-model="form.resource">
                                <el-checkbox v-for="(item,index) in list" :label="item.term" :key="index" name="type">
                                    <div class="check-item">{{item.year}}级学生
                                        <img v-show="form.resource.includes(item.term)"
                                             class="check-img"
                                             src="./img/checked.png"/>
                                    </div>
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>-->
                <!-- <el-form-item label="排课方式:">
                     <el-radio-group v-model="form.name">
                         <el-radio label="连续周"></el-radio>
                         <el-radio label="区间周"></el-radio>
                     </el-radio-group>
                 </el-form-item>-->
                <div class="text-right">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddCourse">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name:"arranging-course-steps",
        data() {
            return {
                radio:'1',
                params:{
                    condition:'',
                    limit:20,
                    page:1
                },
                form:{
                    pkjhmc:'',
                    resource:[],
                    xlid:''
                },
                dialogVisible:false,
                search:'',
                list:[],
                tableData:[
                    {
                        name:'2019级新生课表预排演示'
                    }
                ],
                xqOption:[],
                motaiData:[],
                rules:{
                    xn:[{
                        required:true,
                        message:'请选择学期',
                        trigger:'change'
                    }],
                    pkjhmc:[{
                        required:true,
                        message:'请输入排课名称',
                        trigger:'blur'
                    }],
                },
                xqObject:{}
            }
        },
        created() {
            this.getTableData()

            //获取当前考期
            this.$GET('/schoolCalendar/decadeCalandar').then((res) => {
                this.xqOption = res.data || []
                this.xqOption.forEach(item => {
                    this.xqObject[item.xlid] = item.xlxq
                })
                // console.log(this.xqObject)
                this.getXq()
            })
        },
        methods:{
            getTableData() {
                this.$POST('/timesheetPlan/list',this.params).then(res => {
                    // console.log(res)
                    this.tableData = res.data
                })
            },
            getXq() {
                this.$GET('/schoolCalendar/currentCalandar').then((res) => {
                    if (res.code == 200) {
                        this.form.xlid = res.data.xlid
                    }
                })
            },
            changeData(data) {
                this.tableData = data
            },
            addCourse() {
                this.dialogVisible = true
                localStorage.removeItem('singleActive')
                localStorage.removeItem('single_setting-class')
                localStorage.removeItem('single_first_steps')
                localStorage.removeItem('single_steps_second')
            },
            searchForm() {
                this.$refs.page.getData()
            },
            submitAddCourse() {
                this.$refs.form.validate((valid) => {
                    //验证成功
                    if (valid) {
                        if (this.form.pkjhid) {
                            this.$POST('/timesheetPlan/update',this.form).then(res => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'修改成功!'
                                    });
                                    setTimeout(() => {
                                        this.dialogVisible = false
                                    },300)
                                    this.getTableData()
                                }
                            })
                        } else {
                            this.$POST('/timesheetPlan/add',this.form).then(res => {
                                if (res.code == 200) {
                                    this.$message({
                                        type:'success',
                                        message:'添加成功'
                                    })
                                    setTimeout(() => {
                                        this.dialogVisible = false
                                    },300)
                                    this.getTableData()
                                }
                            })
                        }
                    }
                })
            },
            delPkjh(row) {
                this.$confirm('此操作将永久删除该次排课, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET('/timesheetPlan/delete',{timesheetPlanId:row.pkjhid}).then(res => {
                        if (res.code == 200) {
                            this.$message({
                                type:'success',
                                message:'删除成功!'
                            });
                            this.getTableData()
                        } else {
                            this.$message({
                                type:'error',
                                message:res.message
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    });
                });
            },
            editPkjh(row) {
                this.form = row
                this.dialogVisible = true
            },
            motaiClose() {
                this.form = {
                    pkjhmc:'',
                    resource:[],
                }
                this.getXq()
            }
        }
    }
</script>

<style lang="less">
    .course-setting-dialog {
        .el-form {
            padding-right: 20px;
            padding-bottom: 20px;
            .el-select {
                width: 100%;
            }
            .el-checkbox {
                margin-right: 25px;
                .el-checkbox__input {
                    position: absolute;
                    opacity: 0;
                }
                .el-checkbox__label {
                    padding-left: 0;
                }
                &:last-child {
                    margin-right: 0;
                }
                .check-item {
                    width: 126px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 4px;
                    font-size: 14px;
                    color: #333;
                    text-align: center;
                    position: relative;
                    background-color: #F3F5F7;
                    .check-img {
                        position: absolute;
                        right: 0px;
                        bottom: 0px;
                        width: 18px;
                        height: 18px;
                    }
                }
                /*   &:first-child {
                       .check-item {
                           background: linear-gradient(0deg, rgba(55, 175, 250, 1), rgba(107, 207, 254, 1));
                       }
                   }
                   &:nth-child(2) {
                       .check-item {
                           background: linear-gradient(90deg, rgba(255, 85, 110, 1), rgba(255, 143, 127, 1));
                       }
                   }
                   &:nth-child(3) {
                       .check-item {
                           background: linear-gradient(90deg, rgba(45, 219, 146, 1), rgba(138, 231, 151, 1));
                       }
                   }*/
            }
        }
    }
</style>
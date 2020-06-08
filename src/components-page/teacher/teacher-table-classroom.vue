<template>
    <!--教师任课信息-->
    <div class="yd-common-table yd-common-extend">
        <!-- 不能编辑 -->
        <el-table v-if="!is_edit" :data="classroomInfo" border style="width: 100%">
            <el-table-column
                    prop="kch"
                    label="任课课程"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.kcmc||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="kclb"
                    label="任课课程类别"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.kclb||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="rkqsny"
                    label="任课起始年月"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.rkqsny||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="rkzzny"
                    label="任课终止年月"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.rkzzny||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="rkzxs"
                    label="任课总学时"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.rkzxs||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="rkxd"
                    label="任课学段码"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.rkxd||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="rkjs"
                    label="任课角色码"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.rkjs||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="skbjmc"
                    label="授课班级"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.skbjmc||'-'}}</p>
                </template>
            </el-table-column>
            <el-table-column
                    prop="xsrs"
                    label="授课人数"
                    align="center"
                    width="">
                <template slot-scope="scope">
                    <p>{{scope.row.xsrs||'-'}}</p>
                </template>
            </el-table-column>
        </el-table>
        <!-- 能编辑 -->
        <el-form :model="editform" :rules="rules" ref="ruleForm">
            <el-table v-if="is_edit" :data="editform.tableData" border style="width: 100%">
                <el-table-column
                        prop="kcid"
                        label="任课课程号"
                        align="center"
                        width="150">
                    <template slot-scope="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.kcid'" :rules='rules.kcid'>
                            <el-select v-model="scope.row.kcid" placeholder="任课课程号">
                                <el-option v-for="(item,index) in kchOptions" :key="index" :label="item.kcmc"
                                           :value="item.kcid"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rkkclb"
                        label="任课课程类别"
                        align="center"
                        width="">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.rkkclb" placeholder="任课课程类别"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rkqsny"
                        label="任课起始年月"
                        align="center"
                        width="180">
                    <template slot-scope="scope">
                        <el-date-picker
                                v-model="scope.row.rkqsny"
                                value-format="yyyy年MM月dd日"
                                format="yyyy年MM月dd日"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rkzzny"
                        label="任课终止年月"
                        align="center"
                        width="180">
                    <template slot-scope="scope">
                        <el-date-picker
                                v-model="scope.row.rkzzny"
                                value-format="yyyy年MM月dd日"
                                format="yyyy年MM月dd日"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rkzxs"
                        label="任课总学时"
                        align="center"
                        width="">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.rkzxs" placeholder="任课总学时"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rkxdm"
                        label="任课学段码"
                        align="center"
                        width="">
                    <template slot-scope="scope">
                        <!-- <el-input v-model="scope.row.rkxdm" placeholder="任课学段码"></el-input> -->
                        <el-select v-model="scope.row.rkxdm" placeholder="请选择任课学段码"> 
                            <el-option
                                    v-for="item in rkxdmOptions"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="rkjsm"
                        label="任课角色码"
                        align="center"
                        width="">
                    <template slot-scope="scope">
                        <!-- <el-input v-model="scope.row.rkjsm" placeholder="任课角色码"></el-input> -->
                        <el-select v-model="scope.row.rkjsm" placeholder="请选择任课角色码"> 
                            <el-option
                                    v-for="item in rkjsmOptions"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="skbj"
                        label="授课班级"
                        align="center"
                        width=" 150">
                    <template slot-scope="scope">
                        <el-form-item :prop="'tableData.' + scope.$index + '.skbj'" :rules='rules.skbj'>
                            <el-select v-model="scope.row.skbj" placeholder="授课班级">
                                <el-option v-for="(item,index) in bhOptions" :key="index" :label="item.bjmc"
                                           :value="item.bh"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="skrs" label="授课人数" align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.skrs" placeholder="授课人数"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, editform.tableData)"
                                type="text"
                                size="small">移除
                        </el-button>
                    </template>
                </el-table-column>
                <div slot="append" @click="addExtendList" class="add-extend">
                    <span>+新增</span>
                </div>
                <div slot="append" class="submit-btn">
                    <el-button type="primary" @click="submitEdit('ruleForm')">提交</el-button>
                </div>
            </el-table>
        </el-form>
    </div>
</template>

<script>
    import '../students/css/common-extend.less'

    export default {
        name:"teacher-classroom-info",
        props:['classroomInfo','is_edit','teacherZgh'],
        data() {
            return {
                editform:{
                    tableData:this.classroomInfo,
                },
                tableData:this.classroomInfo,
                kchOptions:[],
                bhOptions:[],
                rkxdmOptions:[],
                rkjsmOptions:[],
                rules:{
                    kcid:[
                        {required:true,message:'请选择课程号',trigger:'change'}
                    ],
                    skbj:[
                        {required:true,message:'请选择班号',trigger:'change'}
                    ]
                }
            }
        },
        created(){
            
            //任课学段码下拉
            this.$POST("/system/dictList/RKXDM").then((res)=>{
                this.rkxdmOptions = res
            })
            //任课角色码下拉
            this.$POST("/system/dictList/RKJSM").then((res)=>{
                this.rkjsmOptions = res
            })
        },
        beforeMount() {
            // console.log('this.$props.teacherZgh')
            // console.log(this.$props.teacherZgh)
            let zyid = ''
            let ksid = ''
            this.$GET("/teacherInfo/detail/" + this.$props.teacherZgh).then((res) => {
                // console.log(res.data)
                zyid = res.data.zyid
                ksid = res.data.ksid
            }).then(() => {
                //根据专业号 查询 任课课程号 
                this.$GET("/lessonInfo/lessonInfoByksid",{ksid:ksid}).then((res) => {
                    // console.log(res)
                    this.kchOptions = res.data
                })
                //根据专业号 查询 授课班级
                this.$GET("/classInfo/classInfoSelect",{zyid:zyid}).then((res) => {
                    // console.log(res)
                    this.bhOptions = res.data
                })
            })
        },
        methods:{
            //教师专业 信息提交
            submitEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.editform.tableData)
                        let teacherLessons = {
                            'info':this.editform.tableData,
                            'jsid':this.$props.teacherZgh
                        }
                        // console.log(teacherLessons)
                        this.$POST("/teacherLesson/batchSaveOrUpdate",teacherLessons,{
                            transformRequest:function (data) {
                                return JSON.stringify(data);
                            },
                            headers:{"Content-Type":"application/json"}
                        }).then(res => {
                            this.$message({
                                type:"success",
                                message:"修改成功!"
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleClick(row) {
                // console.log(row);
            },
            addExtendList() {
                this.editform.tableData.push({
                    jsid:this.$props.teacherZgh,
                    kch:'',
                    rkkclb:'',
                    rkqsny:'',
                    rkzzny:'',
                    rkzxs:'',
                    rkxdm:'',
                    rkjsm:'',
                    skbj:'',
                    skrs:'',
                })
            },
            //删除扩展信息一条
            deleteRow(index,rows) {
                this.$confirm('此操作将删除该条信息, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    });
                    this.editform.tableData.splice(index,1);
                })
            }
        },
        watch:{
            classroomInfo:function (newVal,oldVal) {
                this.editform.tableData = newVal
            },
        }
    }
</script>

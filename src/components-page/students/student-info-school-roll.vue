<template>
    <!--学生学籍信息表单-->
    <div class="yd-common-info">
        <!--可编辑-->
        <div v-if="is_edit" class="common-info-edit">
            <el-form labelPosition="right"
                     :rules="rules"
                     :model="schoolRollForm"
                     label-width="120px"
                     ref="studentRollForm">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="yxid" label="院系:">
                            <el-select v-model="schoolRollForm.yxid" @change="changeYx" placeholder="请选择院系">
                                <el-option
                                        v-for="(item,index) in yxOption"
                                        :key="index"
                                        :label="item.yxmc"
                                        :value="item.yxid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="zyid" label="专业:">
                            <el-select v-model="schoolRollForm.zyid" placeholder="请选择专业" @change="changeZyid">
                                <el-option
                                        v-for="(item,index) in zyOptions"
                                        :key="index"
                                        :label="item.zymc"
                                        :value="item.zyid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="bjid" label="班级:">
                            <el-select v-model="schoolRollForm.bjid" placeholder="请选择班级">
                                <el-option
                                        v-for="(item,index) in bhOptions"
                                        :key="index"
                                        :label="item.bjmc"
                                        :value="item.bjid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="学籍状态:" prop="xjztm">
                            <el-select v-model="schoolRollForm.xjztm" placeholder="请选择学籍状态">
                                <el-option
                                        v-for="(item,index) in xjOptions"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="毕业时间:" prop="byss">
                            <el-date-picker
                                    v-model="schoolRollForm.byss"
                                    type="date"
                                    format="yyyy年MM月dd日"
                                    value-format="yyyy年MM月dd日"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :md="8" :lg="8" :xl="8">
                   <el-form-item prop="nj" label="现在年级:">
                        <el-select v-model="schoolRollForm.nj" placeholder="请选择年级">
                           <el-option  key="1" label="一年级"  value="1"></el-option>
                           <el-option  key="2" label="二年级"  value="3"></el-option>
                           <el-option  key="3" label="三年级"  value="4"></el-option>
                       </el-select>
                   </el-form-item>
               </el-col> -->
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="xz" label="学制:">
                            <el-select v-model="schoolRollForm.xz" placeholder="请选择学制">
                                <el-option :value="parseInt(3)" label="3年"></el-option>
                                <el-option :value="parseInt(4)" label="4年"></el-option>
                                <el-option :value="parseInt(5)" label="5年"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="学生类别:" prop="xslbm">
                            <el-select v-model="schoolRollForm.xslbm">
                                <el-option v-for="(item,index) in xslbOptions" :key='index'
                                           :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label=" ">
                            <el-button type="primary" @click="submitInfoForm">保存</el-button>
                            <el-button @click="emptyForm">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--不可编辑-->
        <div v-else class="common-info-look">
            <el-form labelPosition="right"
                     :rules="rules"
                     :model="schoolRollForm"
                     label-width="120px">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="yxid" label="院系:">
                            <span>{{schoolRollForm.yxmc||'-'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="zyid" label="专业:">
                            <span>{{schoolRollForm.zymc||'-'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="bjid" label="班级:">
                            <span>{{schoolRollForm.bjmc||'-'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="xjztm" label="学籍状态:">
                            <span>{{schoolRollForm.xjzt||'-'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="byss" label="毕业时间:">
                            <span>{{schoolRollForm.byss||'-'}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="xz" label="学制:">
                            <span v-if="schoolRollForm.xz != ''">{{schoolRollForm.xz}}年</span>
                            <span v-else>-</span>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="nj" label="现在年级:">
                            <span>{{schoolRollForm.nj=="1"?"一年级":schoolRollForm.nj=="2"?"二年级":schoolRollForm.nj=="3"?"三年级":'-'}}</span>
                        </el-form-item>
                    </el-col> -->
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item prop="xslbm" label="学生类别:">
                            <span>{{schoolRollForm.xslb||'-'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'

    import './css/common-info.less'

    export default {
        name:"info-schoolRoll-form",
        props:['is_edit','schoolRollForm'],
        props:{
            is_edit:{
                default:false
            },
            schoolRollForm:{
                default:{}
            },
            postUrl:{
                default:'/studentInfo/eduUpdate' //默认教务的上传地址
            }
        },
        data() {
            return {
                xjOptions:[],
                zyOptions:[],
                bhOptions:[],
                rules:{
                    yxid:[{
                        required:true,
                        message:'请选择院系',
                        trigger:'change'
                    }],
                    zyid:[{
                        required:true,
                        message:'请选择专业号',
                        trigger:'change'
                    }],
                    bjid:[{
                        required:true,
                        message:'请选择班级',
                        trigger:'blur'
                    }],
                    xjztm:[{
                        required:true,
                        message:'请选择学籍状态',
                        trigger:'blur'
                    }],
                    xz:[{
                        required:true,
                        message:'请选择学制',
                        trigger:'blur'
                    }],
                    byss:[{
                        required:true,
                        message:'请选择毕业时间',
                        trigger:'blur'
                    }],
                    xslbm:[{
                        required:true,
                        message:'请选择学生类别',
                        trigger:'blur'
                    }],
                    // nj:[{
                    //     required:true,
                    //     message:'请输入现在年级',
                    //     trigger:'change'
                    // }],
                    /*    zyklm:[{
                            required:true,
                            message:'请输入专业科类',
                            trigger:'change'
                        }],*/
                },
                xslbOptions:[],
                yxOption:[]
            }
        },
        async created() {

            console.log(this.schoolRollForm)

            //初始化学籍状态下拉框
            this.$GET("/system/dictList/xjztm").then((res) => {
                this.xjOptions = res
            })

            //学生类别
            this.$POST("/system/dictList/XSLBM").then(res => {
                this.xslbOptions = res
            })

            //院系别码下拉
            await this.$GET("/collegeInfo/queryCollegInfo").then(res => {
                this.yxOption = res.data
                res.data.forEach(item => {
                    item.yxid = item.yxid
                });
            })

            //获取专业列表
            this.$GET('/collegeInfo/queryMajorByYXBM',{yxid:this.schoolRollForm.yxid||''}).then((res) => {
                // console.log(res.data)
                this.zyOptions = res.data
            })
            this.$GET('/classInfo/classInfoSelect',{zyid:this.schoolRollForm.zyid||''}).then((res) => {
                this.bhOptions = res.data
            })

        },
        methods:{
            changeYx() {
                this.schoolRollForm.zyid = ''
                this.schoolRollForm.bjid = '',
                    //获取专业列表
                    this.$GET('/collegeInfo/queryMajorByYXBM',{yxid:this.schoolRollForm.yxid}).then((res) => {
                        this.zyOptions = res.data
                    })
            },
            changeZyid() {
                this.schoolRollForm.bjid = ''
                this.$GET('/classInfo/classInfoSelect',{zyid:this.schoolRollForm.zyid}).then((res) => {
                    this.bhOptions = res.data
                })
            },
            submitInfoForm() { //需要提交的地址
                this.$refs.studentRollForm.validate((valid) => {
                    //验证成功
                    if (valid) {
                        this.$POST(this.postUrl,this.schoolRollForm).then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    message:'编辑成功',
                                    type:'success'
                                });
                                //更新vuex 里面的用户信息
                                this.$POST('/system/user_info').then((res) => {
                                    if (res.code == 200) {
                                        auth.setItemUserInfo(res.data);
                                        this.$store.commit("setUserInfo",res.data);
                                    }
                                })

                                //向父组件发送成功事件
                                this.$emit('success')

                            } else {
                                this.$message.error('编辑失败，请重新编辑')
                            }
                        })
                    } else {
                        this.$message.error('请输入必填项');
                    }
                })
            },
            emptyForm() {
                this.$refs.studentRollForm.clearValidate();
                //向父组件发送成功事件
                this.$emit('success')
            },
        }
    }
</script>


<style scoped lang="less">
</style>

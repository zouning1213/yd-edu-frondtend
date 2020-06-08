<template>
    <!--师资信息-->
    <div class="yd-common-info">
        <!--可编辑-->
        <div v-if="is_edit" class="common-info-edit">
            <el-form label-position="right"
                     :rules="rules"
                     ref="studentSchoolForm"
                     :model="schoolForm"
                     label-width="120px">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item class="el-item-left" label="院系:" prop="yxid">
                            <el-select v-model="schoolForm.yxid" placeholder="请选择院系" @change="changeYxbm">
                                <el-option
                                        v-for="(item,index) in yxbmOptions"
                                        :key="index"
                                        :label="item.yxmc"
                                        :value="item.yxid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="教研组:" prop="ksid">
                            <el-select v-if="ksOptions" v-model="schoolForm.ksid" placeholder="请选择院系">
                                <el-option v-for="(item,index) in ksOptions"
                                           :key="index"
                                           :label="item.ksmc"
                                           :value="item.ksid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <!-- <el-form-item class="el-item-left" label="现从事专业:" prop="zyid">
                            <yd-select-zyid v-if="schoolForm.zyid" :zyid="schoolForm.zyid"
                                            @changeZyid="function(data)
                                                {schoolForm.zyid=data}">
                            </yd-select-zyid>
                        </el-form-item> -->

                           <el-form-item label="现从事专业:" prop="zyid">
                               <el-select v-model="schoolForm.zyid">
                                   <el-option v-for="(item,index) in zyOptions" :key="index"
                                              :label="item.zymc"
                                              :value="item.zyid"></el-option>
                               </el-select>
                           </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="师资类型:" prop="jslx">
                            <el-select v-model="schoolForm.jslx" placeholder="请选择师资类型">
                                <el-option v-for="(item,index) in jslxOptions"
                                           :key="index"
                                           :label="item.name"
                                           :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="师资职称:" prop="szzc">
                            <el-select v-model="schoolForm.szzc" placeholder="请选择师资职称">
                                <el-option v-for="(item,index) in szzcOptions"
                                           :key="index"
                                           :label="item.name"
                                           :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item class="el-item-left" label="师资状态:" prop="szzt">
                            <el-select v-model="schoolForm.szzt" placeholder="请选择师资状态">
                                <el-option v-for="(item,index) in szztOptions" :key="index"
                                           :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="文化程度:" prop="whcdm">
                            <!-- <el-input v-model="schoolForm.whcdm"></el-input> -->
                            <el-select v-model="schoolForm.whcdm">
                                <el-option v-for="(item,index) in whcdOptions" :key="index" :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="参加工作年月:" prop="cjgzny">
                            <!-- <el-input v-model="schoolForm.cjgzny"></el-input> -->
                            <el-date-picker
                                    v-model="schoolForm.cjgzny"
                                    type="month"
                                    format="yyyy年MM月"
                                    value-format="yyyy年MM月"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--   <el-col :md="8" :lg="8" :xl="8">
                           <el-form-item label="曾专业号:" prop="zyh">
                               <el-select v-model="schoolForm.zyh">
                                   <el-option v-for="(item,index) in zyOptions" :key="index"
                                              :label="item.zymc"
                                              :value="item.zyh"></el-option>
                               </el-select>
                           </el-form-item>
                       </el-col>-->
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="来校年月:" prop="lxny">
                            <el-date-picker
                                    v-model="schoolForm.lxny"
                                    type="month"
                                    format="yyyy年MM月"
                                    value-format="yyyy年MM月"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item class="el-item-left" label="从教年月:" prop="cjny">
                            <el-date-picker
                                    v-model="schoolForm.cjny"
                                    type="month"
                                    format="yyyy年MM月"
                                    value-format="yyyy年MM月"
                                    placeholder="选择年月">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item class="el-item-left" label="学期课时:" prop="xqks">
                            <el-input v-model="schoolForm.xqks" placeholder="请输入学期课时数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="24" :xl="24">
                        <el-form-item label=" ">
                            <el-button type="primary" @click="submitInfoForm">保存</el-button>
                            <!-- <el-button>取消</el-button> -->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--不可编辑-->
        <div v-else class="common-info-look">
            <el-form label-position="right"
                     :rules="rules"
                     :model="schoolForm"
                     label-width="120px">
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="院系:" prop="yxid">
                            <span>{{schoolForm.yxmc}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="教研组:" prop="ksid">
                            <span>{{schoolForm.ksmc}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="现从事专业:" prop="ksid">
                            <span>{{schoolForm.zymc}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="师资类型:" prop="jslx">
                            <span>{{schoolForm.jslxmc}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="师资职称:" prop="szzc">
                            <span>{{schoolForm.szzcmc}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="师资状态:" prop="szzt">
                            <span>{{schoolForm.szztmc}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="文化程度:" prop="whcd">
                            <span>{{schoolForm.whcd}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="参加工作年月:" prop="cjgzny">
                            <span>{{schoolForm.cjgzny}}</span>
                        </el-form-item>
                    </el-col>
                    <!--
                                        <el-col :md="8" :lg="8" :xl="8">
                                            <el-form-item label="曾专业号:" prop="zymc">
                                                <span>{{schoolForm.zymc}}</span>
                                            </el-form-item>
                                        </el-col>-->
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="来校年月:" prop="lxny">
                            <span>{{schoolForm.lxny}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item class="el-item-left" label="从教年月:" prop="cjny">
                            <span>{{schoolForm.cjny}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item class="el-item-left" label="学期课时:" prop="xqks">
                            <span>{{schoolForm.xqks}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'

    import ydSelectZyid from '../select/yd-zyid-dialog'
    import ydSelectDialogTree from '../select/yd-tree-ksid-dialog'

    import '../students/css/common-info.less'

    export default {
        name:"info-school-form",
        props:{
            is_edit:{
                default:false
            },
            schoolForm:{
                default:{}
            },
            // postUrl:{
            //     default:''
            // }
        },
        components:{
            ydSelectZyid,
            ydSelectDialogTree,
        },
        data() {
            return {
                zyOptions:[],
                whcdOptions:[],
                yxbmOptions:[],
                jslxOptions:[],
                szzcOptions:[],
                szztOptions:[],
                ksOptions:[],
                rules:{
                    yxid:[{
                        required:true,
                        message:'请选择院系',
                        trigger:'change'
                    }],
                    ksid:[{
                        required:true,
                        message:'请选择教研组',
                        trigger:'change'
                    }],
                    szzc:[{
                        required:true,
                        message:'请选择教职工类型',
                        trigger:'change'
                    }],
                    szzt:[{
                        required:true,
                        message:'请选择师资状态',
                        trigger:'change'
                    }],
                    jslx:[{
                        required:true,
                        message:'请选择师资类型',
                        trigger:'change'
                    }],
                }
            }
        },
        created() {
            this.$GET("/system/dictList/whcdm").then((res) => {
                this.whcdOptions = res
            })
            //专业下拉框
            this.$GET("/majorInfo/selectList").then((res) => {
                this.zyOptions = res.data
            })
            //院系别码下拉
            this.$GET("/collegeInfo/queryCollegInfo").then(res => {
                this.yxbmOptions = res.data
                if(this.schoolForm.yxid){
                    this.getKsOptions()
                }
            })
            //师资类型下拉框
            this.$GET('/system/dictList/JSLX',).then((res) => {
                this.jslxOptions = res
            })

            //师资职称下拉框
            this.$GET('/system/dictList/SZZC',).then((res) => {
                this.szzcOptions = res
            })

            //师资状态下拉框
            this.$GET('/system/dictList/SZZT',).then((res) => {
                this.szztOptions = res
            })
        },
        methods:{
            changeYxbm() {
                this.schoolForm.ksid = ''
                this.getKsOptions()
            },
            getKsOptions() {
                let params = {
                    limit:999999,
                    page:1,
                    yxid:this.schoolForm.yxid || ''
                }
                this.$GET('/departmentInfo/queryDepartmentInfoByYXBM',params).then(res => {
                    if (res.code == 200) {
                        this.ksOptions = res.data
                    }
                })
            },
            submitInfoForm(url) { //需要提交的地址
                // console.log(this.schoolForm)
                this.$refs.studentSchoolForm.validate((valid) => {
                    //验证成功
                    if (valid) {
                        this.$POST('/teacherInfo/update',this.schoolForm).then((res) => {
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
                                this.$message.error('修改失败,请重新修改');
                            }
                        })
                    } else {
                        this.$message.error('请输入必填项');
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">

</style>

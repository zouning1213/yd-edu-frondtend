<template>
    <!--添加教师弹窗-->
    <div class="yd-common-info">
        <div class="common-info-edit">
            <el-form :rules="rules"
                     ref="refAddTeacher"
                     label-width="120px"
                     label-position="right"
                     :model="infoForm">
                <el-row>
                    <el-col :md="18" :xl="18">
                        <el-col :md="12" :xl="12">
                            <el-form-item label="职工号:" prop="zgh">
                                <el-input v-model="infoForm.zgh" placeholder="请输入职工号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="姓名:" prop="xm">
                                <el-input v-model="infoForm.xm" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="性别:" prop="xbm">
                                <el-select v-model="infoForm.xbm" style="width:100%">
                                    <el-option label="男" value='1'></el-option>
                                    <el-option label="女" value='2'></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="民族:" prop="mzm">
                                <el-select v-model="infoForm.mzm">
                                    <el-option v-for="(item,index) in mzmOptions" :key='index' :label="item.name"
                                               :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="籍贯:" prop="jgm">
                                <el-cascader
                                        style="width:100%"
                                        :options="options2"
                                        v-model="infoForm.jgm"
                                        @change="addressChange">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="身份证号:" prop="sfzh">
                                <el-input v-model="infoForm.sfzh" placeholder="请输入身份证号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="院系:" prop="yxid">
                                <el-select v-model="infoForm.yxid" placeholder="请选择院系" @change="changeYx">
                                    <el-option
                                            v-for="(item,index) in yxOptions"
                                            :key="index"
                                            :label="item.yxmc"
                                            :value="item.yxid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="教研组:" prop="ksid">
                                <el-select v-model="infoForm.ksid" placeholder="请选择院系" @change="changeKs">
                                    <el-option v-for="(item,index) in ksOptions"
                                               :key="index"
                                               :label="item.ksmc"
                                               :value="item.ksid + ''">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="师资类型:" prop="jslx">
                                <el-select v-model="infoForm.jslx" placeholder="请选择师资类型">
                                    <el-option v-for="(item,index) in jslxOptions"
                                               :key="index"
                                               :label="item.name"
                                               :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :xl="12">
                            <el-form-item label="师资职称:" prop="szzc">
                                <el-select v-model="infoForm.szzc" placeholder="请选择师资职称">
                                    <el-option v-for="(item,index) in szzcOptions"
                                               :key="index"
                                               :label="item.name"
                                               :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--  <el-col :md="12" :xl="12">
                                  <el-form-item label="现从事专业:" prop="zyid">
                                      <yd-select-zyid :zyid="infoForm.zyid"
                                                      @changeZyid="function(data)
                                                  {infoForm.zyid=data}">
                                      </yd-select-zyid>
                                  </el-form-item>
                              </el-col>-->
                    </el-col>
                    <el-col :md="6" :xl="6" style="text-align: center">
                        <div class="common-info-avatar" style="display:inline-block">
                            <!-- <el-upload
                                    :headers='config.header'
                                    :action="config.action"
                                    :on-success="uploadAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    name="files"
                                    :show-file-list="false">
                                <img class="user-avatar" :src="infoForm.zp || require('@/assets/no-tip-img/no-avatar.png')"
                                    alt="暂无头像"/>
                                <p><i class="el-icon-edit"></i>更改图片</p>
                            </el-upload>   -->
                            <div style="position:relative">
                                <img class="user-avatar"
                                     :src="infoForm.zp || require('@/assets/no-tip-img/no-avatar.png')"
                                     alt="暂无照片"/>
                                <cut-pic @submit='uploadAvatarSuccess' class="upload-text pa"
                                         :title="'更改照片'" :ratio='25/35'
                                         :cutStyle="2">
                                </cut-pic>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import ydSelectZyid from '../select/yd-zyid-dialog'

    import cutPic from '../common/cropperPic'
    import '../students/css/common-info.less'
    import {
        regionData,
        CodeToText,
        provinceAndCityData
    } from "element-china-area-data";

    export default {
        name:"dialog-add-student",
        components:{
            cutPic,
        },
        data() {
            //学号正则验证
            let studentNumber = (rule,value,callback) => {
                let reg = /[0-9a-zA-Z]{4,9}/;
                if (!reg.test(value)) {
                    callback(new Error('账号必须是由4-9位数字和字母组合'))
                } else {
                    callback()
                }
            };
            return {
                options:regionData,
                options2:provinceAndCityData,
                jgm:[],
                yxOptions:[],
                mzmOptions:[],
                ksOptions:[],
                jslxOptions:[],
                szzcOptions:[],
                config:{
                    header:{
                        Authorization:''
                    },
                    action:'',
                },
                fileUrl:setting.remoteHost + '/storage/fetch/',
                infoForm:{
                    zp:'',
                    ksid:''
                },
                rules:{
                    zgh:[{
                        required:true,
                        message:'请填写职工号',
                        trigger:'change'
                    }],
                    xbm:[{
                        required:true,
                        message:'请选择性别',
                        trigger:'change'
                    }],
                    mzm:[{
                        required:true,
                        message:'请填写民族',
                        trigger:'change'
                    }],
                    jgm:[{
                        required:true,
                        message:'请填写籍贯',
                        trigger:'change'
                    }],
                    xm:[{
                        required:true,
                        message:'请填写姓名',
                        trigger:'change'
                    }],
                    sfzh:[{
                        required:true,
                        message:'请选择身份证号',
                        trigger:'change'
                    }],
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
                    jslx:[{
                        required:true,
                        message:'请选择师资类型',
                        trigger:'change'
                    }],
                },
            }
        },
        created() {
            //民族
            this.$POST("/system/dictList/MZM").then(res => {
                this.mzmOptions = res
            })

            this.$POST("/collegeInfo/list",{limit:999,page:1}).then(res => {
                if (res.code == 200) {
                    this.yxOptions = res.data
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
            // this.changeYx()
        },
        mounted() {
            this.config.header.Authorization = localStorage.getItem(setting.userToken);
            this.config.action = setting.remoteHost + '/teacherInfo/upload64/zp';
        },
        methods:{
            changeYx() {
                // console.log(this.infoForm.ksid)
                let params = {
                    limit:999999,
                    page:1,
                    yxid:this.infoForm.yxid || ''
                }
                this.infoForm.ksid = ''
                this.$GET('/departmentInfo/queryDepartmentInfoByYXBM',params).then(res => {
                    if (res.code == 200) {
                        this.ksOptions = res.data
                        // console.log(this.ksOptions)
                    }
                })
            },
            changeKs() {
                // console.log(typeof (this.infoForm.ksid))
                // console.log(this.infoForm.ksid)
            },
            uploadPhoto(data) {
                let token = localStorage.getItem("token")
                let formData = new FormData();
                formData.append('files',data);
                var xhr = new XMLHttpRequest()
                xhr.open('POST',this.config.action,true)
                xhr.setRequestHeader("Authorization",token);
                xhr.send(formData)
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        this.infoForm.zp = this.imageAddress + JSON.parse(xhr.responseText).data
                    }
                }
            },
            //上传成功后拿到返回的图片路径
            uploadAvatarSuccess(res,file) { //正面 
                // this.infoForm.zp = this.imageAddress + res.data 
                this.uploadPhoto(res)
            },

            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submitAddStudent() {  
                this.$refs.refAddTeacher.validate((valid) => {
                    if (valid) {
                        this.infoForm.jgm = JSON.stringify(this.infoForm.jgm) 
                        // console.log(this.infoForm)
                        this.$emit('receiveAddTeacher',this.infoForm)
                    } else { 
                        this.$message.error('请先填写必填项');
                    }
                })
            },
            //三级联动
            addressChange(arr) {
                // console.log(arr)
                // console.log(this.csdm);
                // console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
            }
        }
    }
</script>

<style scoped>

</style>
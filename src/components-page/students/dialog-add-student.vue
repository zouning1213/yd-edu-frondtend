<template>
    <!--添加学生弹窗-->
    <div class="yd-common-info">
        <div class="common-info-edit">
            <el-form :rules="rules"
                     ref="refAddStudent"
                     label-width="120px"
                     label-position="right"
                     :model="infoForm">
                <el-row>
                    <el-col :md="18" :xl="18">
                        <el-row>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="学号:" prop="xh">
                                    <el-input v-model="infoForm.xh" placeholder="请输入学号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="姓名:" prop="xm">
                                    <el-input v-model="infoForm.xm" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="性别:" prop="xbm">
                                    <el-select v-model="infoForm.xbm">
                                        <el-option label="男" value='1'></el-option>
                                        <el-option label="女" value='2'></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="血型:" prop="xxm">
                                    <el-select v-model="infoForm.xxm">
                                        <el-option label="A型" value=1></el-option>
                                        <el-option label="B型" value=2></el-option>
                                        <el-option label="AB型" value=3></el-option>
                                        <el-option label="O型" value=4></el-option>
                                        <el-option label="HR阳性熊猫血" value=5></el-option>
                                        <el-option label="HR阴性熊猫血" value=6></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="民族:" prop="mzm">
                                    <!-- <el-input v-model="infoForm.mzm" placeholder="请输入民族"></el-input> -->
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
                                            size="large"
                                            :options="options2"
                                            v-model="infoForm.jgm"
                                            @change="addressChange">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="院系:" prop="yxid">
                                    <el-select v-model="infoForm.yxid"
                                               placeholder="请选择院系"
                                               @change="changeYx">
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
                                <el-form-item label="专业:" prop="zyid">
                                    <el-select v-model="infoForm.zyid" placeholder="请选择专业" @change="changeZyid">
                                        <el-option
                                                v-for="(item,index) in zyOptions"
                                                :key="index"
                                                :label="item.zymc"
                                                :value="item.zyid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="班级名称:" prop="bjid">
                                    <el-select v-model="infoForm.bjid" placeholder="请选择班级">
                                        <el-option
                                                v-for="(item,index) in bhOptions"
                                                :key="index"
                                                :label="item.bjmc"
                                                :value="item.bjid">
                                            <!-- {{typeof (item.bjid)}}-->
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item label="入学学年:" prop="rxny">
                                    <el-date-picker
                                            v-model="infoForm.rxny"
                                            type="year"
                                            format="yyyy年"
                                            value-format="yyyy"
                                            placeholder="选择年">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <!--    <el-col :md="12" :xl="12">
                                    <el-form-item prop="nj" label="现在年级:">
                                        <el-select v-model="infoForm.nj">
                                            <el-option label="一年级" value=1></el-option>
                                            <el-option label="二年级" value=2></el-option>
                                            <el-option label="三年级" value=3></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>-->
                            <el-col :md="12" :xl="12">
                                <el-form-item prop="xz" label="学制:">
                                    <!-- <el-input v-model="infoForm.xz" placeholder="请输入学制"></el-input> -->
                                    <el-select v-model="infoForm.xz">
                                        <el-option label="3年" value='3'></el-option>
                                        <el-option label="4年" value='4'></el-option>
                                        <el-option label="5年" value='5'></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item prop="xjztm" label="学籍状态:">
                                    <el-select v-model="infoForm.xjztm">
                                        <el-option v-for="(item,index) in xjztOptions" :key='index' :label="item.name"
                                                   :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item prop="xslbm" label="学生类别:">
                                    <!-- <el-input v-model="infoForm.xslbm" placeholder="请输入学生类别"></el-input> -->
                                    <el-select v-model="infoForm.xslbm">
                                        <el-option v-for="(item,index) in xslbOptions" :key='index' :label="item.name"
                                                   :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :xl="12">
                                <el-form-item prop="rxkslbm" label="考生类别:">
                                    <el-select v-model="infoForm.rxkslbm">
                                        <el-option v-for="(item,index) in kslbOptions"
                                                   :key='index'
                                                   :label="item.name"
                                                   :value="item.code"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--     <el-col :md="12" :xl="12">
                                     <el-form-item prop="byxx" label="毕业学校:">
                                         <el-input v-model="infoForm.byxx" placeholder="请输入学校"></el-input>
                                     </el-form-item>
                                 </el-col>
                                 <el-col :md="12" :xl="12">
                                     <el-form-item prop="byss" label="毕业时间:">
                                         <el-date-picker
                                                 v-model="infoForm.byss"
                                                 type="date"
                                                 format="yyyy年MM月dd日"
                                                 value-format="yyyyMMdd"
                                                 placeholder="选择日期">
                                         </el-date-picker>
                                     </el-form-item>
                                 </el-col>-->
                        </el-row>
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
                            </el-upload> -->
                            <div style="position:relative">
                                <img class="user-avatar" :src="infoForm.zp ||
                            require('@/assets/no-tip-img/no-avatar.png')"
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
    //选择树
    // import ydSelectBjidTree from '../common/yd-select-bjid-tree'
    import ydSelectBjidTree from '../select/yd-tree-bjid-dialog'

    import cutPic from '../common/cropperPic'
    import ydSelectZyid from '../select/yd-zyid-dialog'
    import './css/common-info.less'
    import {
        regionData,
        CodeToText,
        provinceAndCityData
    } from "element-china-area-data";

    export default {
        name:"dialog-add-student",
        components:{
            cutPic,
            ydSelectZyid,
            ydSelectBjidTree
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
                config:{
                    header:{
                        Authorization:''
                    },
                    action:'',
                },
                fileUrl:setting.remoteHost + '/storage/fetch/',
                infoForm:{
                    zp:'',
                    yxid:'',
                    zyid:'',
                    bjid:''
                },
                rules:{
                    xh:[{
                        required:true,
                        message:'请输入学号',
                        trigger:'blur'
                    }],
                    xm:[{
                        required:true,
                        message:'请输入姓名',
                        trigger:'blur'
                    }],
                    xbm:[{
                        required:true,
                        message:'请选择性别',
                        trigger:'change'
                    }],
                    rxny:[{
                        required:true,
                        message:'请选择入学学年',
                        trigger:'change'
                    }],

                    jgm:[{
                        required:true,
                        message:'请填写籍贯',
                        trigger:'change'
                    }],
                    xxm:[{
                        required:true,
                        message:'请填写血型',
                        trigger:'change'
                    }],
                    mzm:[{
                        required:true,
                        message:'请选择民族',
                        trigger:'change'
                    }],
                    yxid:[{
                        required:true,
                        message:'请选择院系',
                        trigger:'change'
                    }],
                    zyid:[{
                        required:true,
                        message:'请选择专业',
                        trigger:'change'
                    }],
                    bjid:[{
                        required:true,
                        message:'请选择班级',
                        trigger:'change'
                    }],
                    xjztm:[{
                        required:true,
                        message:'请选择学籍状态',
                        trigger:'change'
                    }],
                    xz:[{
                        required:true,
                        message:'请选择学制',
                        trigger:'change'
                    }],
                    xslbm:[{
                        required:true,
                        message:'请选择学生类别',
                        trigger:'change'
                    }],
                    rxkslbm:[{
                        required:true,
                        message:'请选择考生类别',
                        trigger:'change'
                    }]
                },
                xjztOptions:[],
                zyOptions:[],
                kslbOptions:[],
                xslbOptions:[],
                mzmOptions:[],
                yxOptions:[],
                zyOptions:[],
                bhOptions:[],
            }
        },
        created() {
            //学籍状态
            this.$POST("/system/dictPaged",{limit:10,page:1,pcode:'xjztm'}).then(res => {
                this.xjztOptions = res.data
            })
            //k考试类别
            this.$POST("/system/dictList/RXKSLBM").then(res => {
                this.kslbOptions = res
            })

            //学生类别
            this.$POST("/system/dictList/XSLBM").then(res => {
                this.xslbOptions = res
            })
            //民族
            this.$POST("/system/dictList/MZM").then(res => {
                this.mzmOptions = res
            })

            //院系别码下拉
            this.$GET("/collegeInfo/queryCollegInfo").then(res => {
                this.yxOptions = res.data
            })

            //获取专业列表
            this.$GET('/collegeInfo/queryMajorByYXBM',{yxid:''}).then((res) => {
                console.log(res.data)
                this.zyOptions = res.data
            })

            this.changeZyid()
        },
        mounted() {
            this.config.header.Authorization = localStorage.getItem(setting.userToken);
            this.config.action = setting.remoteHost + '/studentInfo/upload64/zp';
        },
        methods:{
            changeYx() {
                this.infoForm.zyid = ''
                this.infoForm.bjid = '',
                    //获取专业列表
                    this.$GET('/collegeInfo/queryMajorByYXBM',{yxid:this.infoForm.yxid}).then((res) => {
                        console.log(res)
                        this.zyOptions = res.data
                    })
            },
            changeZyid() {
                this.infoForm.bjid = ''
                // console.log(this.infoForm.zyid)
                if (this.infoForm.zyid == '') { //当专业等于空的时候 班级也为空
                    this.bhOptions = []
                } else {
                    this.$GET('/classInfo/classInfoSelect',{zyid:this.infoForm.zyid}).then((res) => {
                        this.bhOptions = res.data
                    })
                }
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
                this.$refs.refAddStudent.validate((valid) => {
                    if (valid) { 
                            this.infoForm.jgm = JSON.stringify(this.infoForm.jgm) 
                            this.infoForm.zp = this.infoForm.zp.substring(this.imageAddress.length)
                            this.$emit('receiveAddStudent',this.infoForm) 
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
            },
        },
    }
</script>

<style scoped>

</style>
<template>
    <!--教师基本信息-->
    <div class="yd-common-info">
        <!--可编辑-->
        <div v-if="is_edit" class="common-info-edit">
            <el-form
                    labelPosition="right"
                    :rules="rules"
                    :model="infoForm"
                    ref="studentInfoForm"
                    label-width="120px">
                <el-row>
                    <el-col :md="16" :lg="16" :xl="16">
                        <el-row>
                            <el-col :md="12" :lg="12" :xl="12">
                                <el-form-item label="职工号:" prop="zgh">
                                    <el-input v-model="infoForm.zgh" placeholder="请输入职工号" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :lg="12" :xl="12">
                                <el-form-item label="姓名:" prop="xm">
                                    <el-input v-model="infoForm.xm" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :lg="12" :xl="12">
                                <el-form-item label="姓名拼音:" prop="xmpy">
                                    <el-input v-model="infoForm.xmpy" placeholder="请输入姓名拼音"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :lg="12" :xl="12">
                                <el-form-item label="曾用名:" prop="cym">
                                    <el-input v-model="infoForm.cym" placeholder="请输入曾用名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :lg="12" :xl="12">
                                <el-form-item label="性别:" prop="xbm">
                                    <el-select v-model="infoForm.xbm">
                                        <el-option label="男" value="1"></el-option>
                                        <el-option label="女" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12" :lg="12" :xl="12">
                                <el-form-item label="血型:" prop="xxm">
                                    <el-select v-model="infoForm.xxm">
                                        <el-option label="A型" value="1"></el-option>
                                        <el-option label="B型" value="2"></el-option>
                                        <el-option label="AB型" value="3"></el-option>
                                        <el-option label="O型" value="4"></el-option>
                                        <el-option label="HR阳性熊猫血" value="5"></el-option>
                                        <el-option label="HR阴性熊猫血" value="6"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                         <!--   <el-col :md="12" :lg="12" :xl="12">
                                <el-form-item label="现从事专业:" prop="zyid">
                                    <yd-select-zyid :zyid="infoForm.zyid"
                                                    v-if="showzyh"
                                                    @changeZyid="function(data)
                                                {infoForm.zyid=data}">
                                    </yd-select-zyid>
                                </el-form-item>
                            </el-col>-->
                            <el-col :md="24" :lg="24" :xl="24">
                                <el-form-item label="出生地:" prop="csdm">
                                    <el-cascader
                                            style="width:40%;float:left"
                                            size="medium"
                                            :options="options"
                                            v-model="infoForm.zncsdm"
                                            @change="addressChange"></el-cascader>
                                    <el-input style="width:60%;padding-top: 1px;"
                                              placeholder="请输入详细门牌号" v-model="infoForm.xzz"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8" style="text-align: center">
                        <div class="common-info-avatar" style="display:inline-block">
                            <!-- <el-upload
                                    :headers="config.header"
                                    :action="config.action"
                                    :on-success="uploadAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    name="files"
                                    :show-file-list="false">
                                <img class="user-avatar"
                                     :src="infoForm.zp || require('@/assets/no-tip-img/no-avatar.png')"/>
                                <p class="font-skin"><i class="el-icon-edit"></i>更改图片</p>
                            </el-upload> -->
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
                <el-row>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="籍贯:" prop="jgm">
                            <!-- <el-input v-model="infoForm.jgm"></el-input> -->
                            <el-cascader
                                    style="width:100%"
                                    size="medium"
                                    :options="options2"
                                    v-model="infoForm.znjgm"
                                    @change="addressChange"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :md="16" :lg="16" :xl="16">
                        <el-form-item label="户口所在地:" prop="hkszd">
                            <!-- <el-input v-model="infoForm.hkszd"></el-input> -->
                            <el-cascader
                                    style="width:100%"
                                    size="medium"
                                    :options="options"
                                    v-model="infoForm.znhkszd"
                                    @change="addressChange"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="出生日期:" prop="csrq">
                            <el-date-picker
                                    v-model="infoForm.csrq"
                                    type="date"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy年MM月dd日"
                                    placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="身份证类型:" prop="gatqm">
                            <!-- <el-input v-model="infoForm.gatqm"></el-input>  -->
                            <el-select v-model="infoForm.sfzlxm">
                                <el-option v-for="(item,index) in sfzlxOptions" :key="index" :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="身份证号码:" prop="sfzh">
                            <el-input v-model="infoForm.sfzh" placeholder="请输入身份证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="民族:" prop="mzm">
                            <!-- <el-input v-model="infoForm.mzm"  placeholder="请输入民族"></el-input> -->
                            <el-select v-model="infoForm.mzm">
                                <el-option v-for="(item,index) in mzmOptions" :key="index" :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="国家地区:" prop="gjdqm">
                            <!-- <el-input v-model="infoForm.gjdqm"  placeholder="请输入国家地区"></el-input> -->
                            <el-select v-model="infoForm.gjdqm">
                                <el-option v-for="(item,index) in gbmOptions" :key="index" :label="item.name"
                                           :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="政治面貌:" prop="zzmmm">
                            <!-- <el-input v-model="infoForm.zzmmm"></el-input> -->
                            <el-select v-model="infoForm.zzmmm">
                                <el-option v-for="(item,index) in zzmmmOptions" :key="index" :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="入学前户口性质:" prop="hkxzm">
                            <!-- <el-input v-model="infoForm.hkxzm"></el-input> -->
                            <el-select v-model="infoForm.hkxzm">
                                <el-option v-for="(item,index) in hkxzmOptions" :key="index" :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="婚姻状态:" prop="hyzkm">
                            <el-select v-model="infoForm.hyzkm" placeholder="请选择婚姻状态">
                                <el-option
                                        v-for="item in hyzkmOptions"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="开户名:" prop="khm">
                            <el-input v-model="infoForm.khm" placeholder="请输入开户名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="开户行:" prop="khh">
                            <el-input v-model="infoForm.khh" placeholder="请输入开户行"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="银行账号:" prop="yhzh">
                            <el-input v-model="infoForm.yhzh" placeholder="请输入银行账号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="健康状态:" prop="jkzkm">
                            <!-- <el-input v-model="infoForm.jkzkm"></el-input> -->
                            <el-select v-model="infoForm.jkzkm">
                                <el-option v-for="(item,index) in jkzkOptions" :key="index" :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                  <!--  <el-col :md="8" :lg="8" :xl="8">
                        <el-form-item label="所属教研组:" prop="ksid">
                            <yd-select-dialog-tree :ksid="infoForm.ksid"
                                                   @changeKsId="changeKsId">
                            </yd-select-dialog-tree>
                        </el-form-item>
                    </el-col>-->
                    <el-row style="clear:both">
                        <el-col :md="24" :lg="24" :xl="24">
                            <el-form-item label="特长:" prop="tc">
                                <el-input type="textarea" rows="3" class="texta" v-model="infoForm.tc"
                                          placeholder="请输入特长"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :md="24" :lg="24" :xl="24">
                            <el-form-item label="病史:">
                                <el-input type="textarea" rows="3" class="texta" v-model="infoForm.bs"
                                          placeholder="请输入病史"></el-input>
                                <p class="tip">带<span>*</span>为必填内容</p>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24" :xl="24">
                            <el-form-item label=" ">
                                <el-button type="primary" @click="submitInfoForm">保存</el-button>
                                <!-- <el-button>取消</el-button> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-row>
            </el-form>
        </div>
        <!--不可编辑-->
        <div v-else class="common-info-look">
            <el-form
                    labelPosition="right"
                    :rules="rules"
                    :model="infoForm"
                    label-width="120px">
                <el-row>
                    <el-col :md="20" :xl="20">
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="职工号:" prop="zgh">
                                <span>{{infoForm.zgh}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="姓名:" prop="xm">
                                <span>{{infoForm.xm}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="姓名拼音:" prop="xmpy">
                                <span>{{infoForm.xmpy}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="曾用名:" prop="cym">
                                <span>{{infoForm.cym}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="性别:" prop="xbm">
                                <span v-text="infoForm.xbm == '1'?'男':infoForm.xbm == '2'?'女':''"></span>
                            </el-form-item>
                        </el-col>
                       <!-- <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="现从事专业:" prop="zymc">
                                <span>{{infoForm.zymc}}</span>
                            </el-form-item>
                        </el-col>-->
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="出生日期:" prop="csrq">
                                <span>{{infoForm.csrq}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="民族:" prop="mz">
                                <span>{{infoForm.mz}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="身份证类型:" prop="sfzlx">
                                <span>{{infoForm.sfzlx}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="身份证号码:" prop="sfzh">
                                <span>{{infoForm.sfzh}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="籍贯:" prop="jgm">
                                <span>{{jgm1||""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="16" :lg="16" :xl="16">
                            <el-form-item label="出生地:" prop="csdm">
                                <span>{{csdm1||""}}{{infoForm.xzz}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="16" :lg="16" :xl="16">
                            <el-form-item label="户口所在地:" prop="hkszd">
                                <span>{{hkszd1||""}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="入学前户口性质:" prop="hkxzm">
                                <span>{{infoForm.hkxz}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="国家地区:" prop="gb">
                                <span>{{infoForm.gjdq}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="政治面貌:" prop="zzmmm">
                                <span>{{infoForm.zzmm}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="婚姻状态:" prop="hyzk">
                                <span>{{infoForm.hyzk}}</span>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :md="6" :lg="6" :xl="6">
                                        <el-form-item label="一卡通号码:" prop="ykthm">
                                            <span>{{infoForm.ykthm}}</span>
                                        </el-form-item>
                        </el-col>-->
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="开户名:" prop="khm">
                                <span>{{infoForm.khm}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="开户行:" prop="khh">
                                <span>{{infoForm.khh}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="银行账号:" prop="yhzh">
                                <span>{{infoForm.yhzh}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="血型:" prop="xxm">
                                <span>{{infoForm.xx}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8" :lg="8" :xl="8">
                            <el-form-item label="健康状态:" prop="jkzkm">
                                <span>{{infoForm.jkzk}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="24" :xl="24">
                            <el-form-item label="特长:" prop="tc">
                                <span>{{infoForm.tc}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="4" :xl="24">
                            <el-form-item label="病史:">
                                <span>{{infoForm.bs}}</span>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :md="4" :xl="4" style="text-align: center">
                        <div class="common-info-avatar" style="display:inline-block">
                            <img class="user-avatar"
                                 :src="infoForm.zp || require('@/assets/no-tip-img/no-avatar.png')"
                                 alt="center"/>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'

    import cutPic from '../common/cropperPic'
    import '../students/css/common-info.less'
    import ydSelectZyid from '../select/yd-zyid-dialog'
    import ydSelectDialogTree from '../select/yd-tree-ksid-dialog'

    import {regionData,CodeToText,provinceAndCityData} from "element-china-area-data";

    export default {
        name:"teacher-info-form",
        props:{
            is_edit:{
                default:false
            },
            infoForm:{
                default:{}
            },
            // postUrl:{
            //     default:''
            // }
        },
        components:{
            ydSelectDialogTree,
            ydSelectZyid,
            cutPic
        },
        data() {
            //学号正则验证
            let studentNumber = (rule,value,callback) => {
                let reg = /[0-9a-zA-Z]{4,9}/;
                if (!reg.test(value)) {
                    callback(new Error("账号必须是由4-9位数字和字母组合"));
                } else {
                    callback();
                }
            };
            //身份证号正则验证
            let studentCard = (rule,value,callback) => {
                let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;

                if (!reg.test(value)) {
                    callback(new Error("请输入正确身份证号码"));
                } else {
                    callback();
                }
            };
            return {
                showzyh:true,

                zzmmmOptions:[],
                jkzkOptions:[],
                hkxzmOptions:[],
                sfzlxOptions:[],
                mzmOptions:[],
                gbmOptions:[],

                hyzkmOptions:[],
                options:regionData,
                options2:provinceAndCityData,
                tableData:this.infoForm,
                csdm:[],
                hkszd:[],
                jgm:[],
                csdm1:[],
                hkszd1:[],
                jgm1:[],
                rules:{
                    sfzh:[{required:true,message:"请输入身份证",trigger:"blur"}],
                    zgh:[{required:true,message:"请输入职工号",trigger:"blur"}],
                    xm:[{required:true,message:'请填写姓名',trigger:'blur'}],
                    // zyid:[{required:true,message:"请选择从事专业",trigger:"change"}],
                    xbm:[{required:true,message:"请选择性别",trigger:"change"}],
                    mzm:[{required:true,message:"请填写民族",trigger:"blur"}],
                    jgm:[{required:true,message:"请填写籍贯",trigger:"blur"}],
                    xxm:[{required:true,message:"请填写血型",trigger:"blur"}]
                },
                path:"",
                config:{
                    header:{
                        Authorization:""
                    },
                    action:""
                }
            };
        },
        computed:{
            zyh() {
                return this.infoForm.zyid
            }
        },
        created() {
            //初始化婚姻状况下拉框
            this.$GET("/system/dictList/hyzkm").then((res) => {
                // console.log(res)
                this.hyzkmOptions = res
            })
            //初始化政治面貌下拉框
            this.$GET("/system/dictList/ZZMMM").then((res) => {
                this.zzmmmOptions = res
            })
            //初始化身份证类型下拉框
            this.$GET("/system/dictList/sfzlxm").then((res) => {
                this.sfzlxOptions = res
            })
            //初始健康状态吗下拉框
            this.$GET("/system/dictList/JKZKM").then((res) => {
                this.jkzkOptions = res
            })
            //初始化户口性质码下拉框
            this.$GET("/system/dictList/HKXZM").then((res) => {
                this.hkxzmOptions = res
            })
            //初始化民族码下拉框
            this.$GET("/system/dictList/MZM").then((res) => {
                this.mzmOptions = res
            })
            //初始化国家地区下拉框
            this.$GET("/system/dictList/GBM").then((res) => {
                this.gbmOptions = res
            })


            this.csdm = JSON.parse(this.tableData.csdm || "{}");
            this.hkszd = JSON.parse(this.tableData.hkszd || "{}");
            this.jgm = JSON.parse(this.tableData.jgm || "{}");
            this.csdm1 = (CodeToText[this.csdm[0]] + CodeToText[this.csdm[1]] + CodeToText[this.csdm[2]]) || '';
            this.hkszd1 = (CodeToText[this.hkszd[0]] + CodeToText[this.hkszd[1]] + CodeToText[this.hkszd[2]]) || '';
            this.jgm1 = (CodeToText[this.jgm[0]] + CodeToText[this.jgm[1]]) || '';
        },
        mounted() {
            this.config.header.Authorization = localStorage.getItem(setting.userToken);
            this.config.action = setting.remoteHost + "/teacherInfo/upload64/zp";
        },
        methods:{
            changeKsId(data) {
                // console.log(data)
                this.$set(this.$props.infoForm,'ksid',data)
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
            uploadAvatarSuccess(res,file) {
                // this.infoForm.zp = this.imageAddress + res.data;
                this.uploadPhoto(res)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error("上传头像图片只能是 JPG 格式!");
                }
                if (!isLt2M) {
                    this.$message.error("上传头像图片大小不能超过 2MB!");
                }
                return isJPG && isLt2M;
            },
            submitInfoForm() {
                //需要提交的地址
                (this.infoForm.csdm = JSON.stringify(this.infoForm.zncsdm)),
                    (this.infoForm.hkszd = JSON.stringify(this.infoForm.znhkszd)),
                    (this.infoForm.jgm = JSON.stringify(this.infoForm.znjgm)),
                    (this.infoForm.xzz = this.infoForm.xzz),
                    this.$refs.studentInfoForm.validate(valid => {
                        //验证成功
                        if (valid) {
                            this.$POST('/teacherInfo/update',this.infoForm).then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        message:'编辑成功',
                                        type:'success'
                                    });
                                    //更新vuex 里面的用户信息
                                    this.$POST('/system/user_info').then((res) => {
                                        if (res.code == 200){
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
                            // this.$emit("receiveInfoForm",this.infoForm);
                        } else {
                            this.$message.error("请输入必填项");
                        }
                    });
            },
            //三级联动
            addressChange(arr) {
                // console.log(arr)
                // console.log(this.csdm);
                // console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
            }
        },
        watch:{
            zyh(newValue,oldValue) {
                //console.log(this.infoForm.zyid)
                //这里面可以执行一旦监听的值发生变化你想做的操作
                this.showzyh = false
                this.$nextTick(() => {
                    this.showzyh = true
                })
            }
        }
    };
</script>

<style lang="less">
</style>

<template>
    <!--
      当 is_autoUpload  等于 true 的时候 是默认上传  url 为上传到服务器地址  postUrl 保存到数据库地址  2个参数必填

      当 is_autoUpload 等于 false 的时候 不上传 只显示  url  postUrl 可不填
    -->
    <!--上传身份证-->
    <div class="yd-common-attachment">
        <div class="attachment-upload">
            <!--可编辑-->
            <div v-if="is_autoUpload">
                <div>
                    <el-upload
                            class="avatar-uploader"
                            :headers="config.headers"
                            :action="config.action + url"
                            name="files"
                            disabled
                            :auto-upload="is_autoUpload"
                            :show-file-list="false"
                            :on-success="positiveUploadSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                        <div v-else class="avatar-uploader-icon">
                            <i class="yd icon-add"></i>
                            <div class="el-upload__text">人像面照片</div>
                        </div>
                        <cut-pic :isshowid='1' @submit='positiveUploadSuccess' style="top:0" class="upload-text pa"
                                 :title="'更改人像面照片'" :ratio='90/54'
                                 :cutStyle="2">
                        </cut-pic>
                    </el-upload>

                    <el-upload
                            class="avatar-uploader"
                            :headers="config.headers"
                            :action="config.action + url"
                            name="files"
                            disabled
                            :auto-upload="is_autoUpload"
                            :show-file-list="false"
                            :on-success="reverseUploadSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                        <div v-else class="avatar-uploader-icon is_avatar">
                            <i class="yd icon-add"></i>
                            <div class="el-upload__text">国徽面照片</div>
                        </div>
                        <cut-pic :isshowid='2' @submit='reverseUploadSuccess' style="top:0" class="upload-text pa"
                                 :title="'更改国徽面照片'" :ratio='90/54'
                                 :cutStyle="2">
                        </cut-pic>
                    </el-upload>
                </div>
                <!--确定事件暂时放在里面,看后期有没有需要添加其他的事件 再看是否移出-->
                <el-button class="mt-30" type="primary" round @click="submitUpload"><i
                        class="el-icon-upload2"></i>确认上传
                </el-button>
            </div>
            <!--不可编辑-->
            <div v-else>
                <li v-if="imageUrl1" class="file-list el-upload">
                    <img :src="imageUrl1"/>
                </li>
                <li v-if="imageUrl2" class="file-list el-upload">
                    <img :src="imageUrl2"/>
                </li>
                <li v-if="!imageUrl1&&!imageUrl2" class="text-center"
                    style="list-style:none;color:#909399;text-align:center">
                    <span>暂无数据</span>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
    import cutPic from "./cropperPic"
    import './css/info-upload.less'

    export default {
        name:"info-upload-card",
        components:{
            cutPic
        },
        props:{
            url:{
                default:'#'
            },
            postUrl:{
                default:'#'
            },
            is_autoUpload:{
                default:true,
            }
        },
        data() {
            return {
                config:{
                    action:setting.remoteHost,
                    headers:{
                        Authorization:localStorage.getItem(setting.userToken)
                    }
                },
                imageUrl1:"",
                imageUrl2:"",
                fileUrlPaths:[] //确定上传的图片路径
            }
        },
        methods:{
            uploadPhoto(data,index) {
                let token = localStorage.getItem("token")
                let formData = new FormData();
                formData.append('files',data);
                var xhr = new XMLHttpRequest()
                xhr.open('POST',this.config.action + this.url,true)
                xhr.setRequestHeader("Authorization",token);
                xhr.send(formData)
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        if (index == 1) {
                            this.imageUrl1 = this.imageAddress + JSON.parse(xhr.responseText).data
                        } else {
                            this.imageUrl2 = this.imageAddress + JSON.parse(xhr.responseText).data
                        }
                    }
                }
            },
            setFileList(list) {
                this.imageUrl1 = list[0] !== this.imageAddress? list[0] :''
                this.imageUrl2 = list[1] !== this.imageAddress? list[1] :''
            },
            setFileUrlPaths() {
                this.fileUrlPaths[0] = this.imageUrl1? this.imageUrl1.substring(this.imageAddress.length) :''
                this.fileUrlPaths[1] = this.imageUrl2? this.imageUrl2.substring(this.imageAddress.length) :''
            },
            positiveUploadSuccess(res,file) { //正面
                //// this.imageUrl1 = URL.createObjectURL(file.raw); 本地显示地址
                // this.imageUrl1 = this.imageAddress + res.data //服务器显示地址
                // this.imageUrl1 = res
                this.uploadPhoto(res,'1')
            },
            reverseUploadSuccess(res,file) {
                //// this.imageUrl2 = URL.createObjectURL(file.raw); 本地显示地址
                //this.imageUrl2 = this.imageAddress + res.data  //服务器显示地址
                // this.imageUrl2 =  res
                this.uploadPhoto(res,'2')
            },
            submitUpload() {
                this.setFileUrlPaths()
                let type = this.$store.state.userType
                let userId = ''
                // if (type == 'S') {
                //     userId = this.$store.state.userInfo.xsid
                // } else if (type == 'T') {
                //     userId = this.$store.state.userInfo.jsid
                // }
                    userId = this.$store.state.userInfo.xsid || this.$store.state.userInfo.jsid

                this.$POST(this.postUrl + '/' + userId,this.fileUrlPaths,{
                    transformRequest:function (data) {
                        return JSON.stringify(data);
                    },
                    headers:{'Content-Type':'application/json'}
                }).then((res) => {
                    if (res.code) {
                        this.$message({
                            message:'上传成功',
                            type:'success'
                        });
                    }
                })
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
            }
        }
    }
</script>

<style scoped lang="less">
    .attachment-upload {
        .avatar-uploader {
            display: inline-block;
            margin-right: 40px;
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 364px;
                height: 218px;
                text-align: center;
                padding-top: 44px;
                background: url("img/attachment-card.png") no-repeat;
                background-size: 364px;
                background-position: center;
                &.is_avatar {
                    background: url("img/attachment-card1.png") no-repeat;
                }
                i {
                    font-size: 50px;
                    color: #999;
                }
                .el-upload__text {
                    font-size: 20px;
                    color: #999;
                }
            }
            .avatar {
                width: 364px;
                height: 218px;
                display: block;
            }
        }
    }
</style>

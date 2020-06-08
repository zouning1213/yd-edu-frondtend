<template>
    <!--身份证上传-->
    <div class="yd-bg mobile-upload-idCrd" :style="{minHeight:(this.$store.state.minClientHeight-64)+'px'}">
        <template v-if="is_autoUpload">
            <div class="upload-card card-positive">
                <!--:imgUrl="img"-->
                <cut-pic :cutStyle="2" :imgUrl="imageUrl1" :showStyle="2"
                         ref="cutPic" :ratio="90/54" @submit="uploadSuccess1"></cut-pic>
            </div>
            <div class="upload-card card-reverse">
                <cut-pic :cutStyle="2" :showStyle="2"
                         ref="cutPic" :imgUrl="imageUrl2" :ratio="90/54" @submit="uploadSuccess2"></cut-pic>
            </div>
            <div class="text-center mt-20">
                <van-button type="primary" size="large" round @click="submitUpload">确认上传</van-button>
            </div>
        </template>
        <ul v-else class="exhibition-ul">
            <li><img :src="imageUrl1"/></li>
            <li><img :src="imageUrl2"/></li>
        </ul>
    </div>
</template>

<script>
    import cutPic from '../../components-mobile/common/cropperPic'

    export default {
        name:"upload-IdCard",
        components:{
            cutPic
        },
        props:{
            img:{
                default:''
            },
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
        mounted() {
            this.$nextTick(() => {
                let list = this.img.split(",")
                this.setFileList(list)
            })
        },
        methods:{
            uploadSuccess1(url) {
                this.uploadPhoto(url,1)
            },
            uploadSuccess2(url) {
                this.uploadPhoto(url,2)
            },
            uploadPhoto(data,index) {
                console.log(data)
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
            submitUpload() {
                this.setFileUrlPaths()
                let type = this.$store.state.userType
                let userId = ''
                if (type == 'S') {
                    userId = this.$store.state.userInfo.xsid
                } else if (type == 'T') {
                    userId = this.$store.state.userInfo.jsid
                }

                //当地址不等于空的时候 上传
                if (this.postUrl != '#') {
                    this.$POST(this.postUrl + '/' + userId,this.fileUrlPaths,{
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }).then((res) => {
                        if (res.code) {
                            this.$toast.success('上传成功');
                        }
                    })
                }
            },
        }
    }
</script>

<style lang="less">
    .mobile-upload-idCrd {
        width: 95%;
        margin: 10px auto;
        padding: 10px 10px;
        .upload-card {
            height: 209px;
            margin-bottom: 10px;
            .crop-wrapper {
                .file-wrapper {
                    .file {
                        .upload-banner {
                            background-size: cover;
                        }
                    }
                }
            }
        }
        .card-positive {
            .crop-wrapper {
                .file-wrapper {
                    .file {
                        .upload-banner {
                            background-image: url("./img/card-positive.png");
                        }
                    }
                }
            }
        }
        .card-reverse {
            .crop-wrapper {
                .file-wrapper {
                    .file {
                        .upload-banner {
                            background-image: url("./img/card-reverse.png");
                        }
                    }
                }
            }
        }
        .exhibition-ul {
            li {
                margin-bottom: 10px;
                img {
                    height: 209px;
                    -webkit-border-radius: 4px;
                    -moz-border-radius: 4px;
                    border-radius: 4px;
                }
            }
        }
    }
</style>

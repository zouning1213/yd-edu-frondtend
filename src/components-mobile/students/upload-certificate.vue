<template>
    <!--获奖证书 毕业证书上传-->
    <div class="yd-bg mobile-upload-certificate" :style="{minHeight:(this.$store.state.minClientHeight-64)+'px'}">
        <template v-if="is_autoUpload">
            <van-uploader :after-read="afterRead"
                          accept="image/jpg, image/jpeg"
                          preview-size="100%"
                          v-model="fileList" multiple/>
            <div class="text-center mt-20">
                <van-button type="primary" size="large" round @click="submitUpload"
                            result-type="file">确认上传
                </van-button>
            </div>
        </template>
        <ul v-else class="exhibition-ul">
            <li v-for="(item,index) in fileList" :key="index"><img :src="item.url"/></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"upload-certificate",
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
                fileList:[],
                fileUrlPaths:[],
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.setFileList(this.img.split(","))
            })
        },
        methods:{
            setFileList(list) {
                let arr = []
                list.forEach(item => { //转换element ui 要的显示图片格式
                    arr.push({
                        url:item
                    })
                })
                this.fileList = arr
            },
            afterRead(file) {
                let content = file.file;
                let formData = new FormData();
                formData.append("files",content);
                this.$POST(this.url,formData,{
                    transformRequest:function (data) {
                        return data;
                    },
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }).then(res => { //url是服务器的提交地址//成功回调
                    if (res.code == 200) {
                        this.fileList[this.fileList.length - 1].url = this.imageAddress + res.data
                    }
                })
            },
            setFileUrlPaths() {
                console.log(this.fileList)
                let arr = []
                this.fileList.forEach(item => { //转换成后台要的图片格式
                    arr.push(item.url.substring(this.imageAddress.length))
                })
                this.fileUrlPaths = arr
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

                if (this.fileUrlPaths.length > 0) {
                    this.$POST(this.postUrl + '/' + userId,this.fileUrlPaths,{
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }).then((res) => {
                        if (res.code == 200) {
                            this.$toast.success('上传成功');
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    .mobile-upload-certificate {
        width: 95%;
        margin: 10px auto;
        padding: 10px 10px;
        .van-uploader__preview {
            margin: 0 0 10px 0;
            .van-uploader__preview-image {
                width: 100%;
                height: inherit;
            }
        }
        .exhibition-ul {
            text-align: center;
            li {
                margin-bottom: 10px;
                img {
                    max-height: 209px;
                    -webkit-border-radius: 4px;
                    -moz-border-radius: 4px;
                    border-radius: 4px;
                }
            }
        }
    }
</style>

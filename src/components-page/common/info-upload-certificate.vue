<template>
    <!--
     当 is_autoUpload  等于 true 的时候 是默认上传  url 为上传到服务器地址  postUrl 保存到数据库地址  2个参数必填

     当 is_autoUpload 等于 false 的时候 不上传 只显示  url  postUrl 可不填-->

    <!--获奖证书上传 毕业证书上传-->
    <div class="yd-common-attachment zn-image-cover">
        <div class="attachment-upload">
            <div v-if="is_autoUpload">
                <el-upload
                        :headers="config.headers"
                        :action="config.action + url"
                        name="files"
                        list-type="picture-card"
                        :file-list="fileList"
                        :mutilple="true"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess">
                    <i class="yd icon-add"></i>
                    <div class="el-upload__text">上传证书</div>
                </el-upload>
                <el-button class="mt-30" type="primary" round @click="submitUpload">
                    <i class="el-icon-upload2"></i>确认上传
                </el-button>
                <!--查看大图-->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <ul v-else>
                <li class="file-list el-upload" v-for="(item,index) in fileList" :key="index">
                    <img :src="item.url"/>
                </li>
                <li v-if="fileList.length==0" class="text-center" style="color:#909399;text-align:center">
                    暂无数据
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import './css/info-upload.less'

    export default {
        name:"info-upload-certificate",
        props:{
            url:{
                default:'#'
            },
            postUrl:{
                default:'#'
            },
            is_autoUpload:{
                default:true
            }
        },
        data() {
            return {
                dialogImageUrl:'',
                dialogVisible:false,
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

        methods:{
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            setFileList(list) {
                let arr = []
                list.forEach(item => { //转换element ui 要的显示图片格式
                    arr.push({
                        url:item
                    })
                })
                this.fileList = arr
            },
            setFileUrlPaths() {
                let arr = []
                this.fileList.forEach(item => { //转换成后台要的图片格式
                    arr.push(item.url.substring(this.imageAddress.length))
                })
                this.fileUrlPaths = arr
            },
            handleRemove(file,fileList) { //移出某一个元素
                this.fileList = fileList
            },
            uploadSuccess(res,file,fileList) { //上传成功
                file.url = this.imageAddress + res.data
                this.fileList = fileList
            },
            submitUpload() {
                this.setFileUrlPaths()

                // let type = this.$store.state.userType
                let userId = ''
                // if (type == 'S') {
                    userId = this.$store.state.userInfo.xsid || this.$store.state.userInfo.jsid
                // } else if (type == 'T') {
                //     userId = 
                // }
                //console.log(this.fileUrlPaths)
                if (this.fileUrlPaths.length > 0) {
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
                } else {
                    this.$message({
                        message:'请先上传图片',
                        type:'warning'
                    });
                }
            }
        }
    }
</script>

<style lang="less">
    .zn-image-cover {
        .el-upload-list__item-thumbnail {
            object-fit: cover;
        }
    }

</style>

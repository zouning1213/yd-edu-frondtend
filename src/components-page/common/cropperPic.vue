<!--title:调用组件时的传入文字
cutStyle:剪切样式  [1:圆形 2:方形]
showStyle:显示样式  [1:文字  2:框框]
ratio:比例   [1  4/3]
imgUrl:默认图片  在showStyle的框框模式下作用
submit:返回函数，一个参数，base64编码-->

<template>
    <div class="yd-page-cropperPic">
        <!-- 遮罩层 -->
        <!--cutStyle == 1  用户者上传头像-->
        <div v-if="isshowid==1" class="crop-wrapper" >
            <div :class="['crop-container',cutStyle == 1 ? 'crop-container-round' : '']" v-show="panel">
                <div class="container-content">
                    <div class="crop-img-b">
                        <img class="crop-image"
                            :src="url"
                            style="width:100%;"
                            alt="Picture">
                    </div>
                    <p>推荐长宽尺寸比列为16:9,JPG/PNG 2M以内</p>
                    <!--操作按钮-->
                    <div class="crop-btn-group clearfix">
                        <div class="crop-btn btn-cancel icon-skin border-skin" @click="cancel">取消</div>
                        <div class="crop-btn btn-success border-skin el-button--primary" @click="commit">确定</div>
                    </div>
                </div>
            </div>
            <div class="file-wrapper">
                <a href="javascript:;" class="file">
                    <!--上传按钮-->
                    <input type="file" name="" id="" @change="change">
                    <!--用户头像-->
                    <div v-if="showStyle==1" class="upload-avator">{{title}}</div>
                    <!--封面上传图片(封面没有图片)-->
                    <div v-else-if="showStyle==2 && !headerImage" class="upload-banner pr">
                        <i class="el-icon-plus"></i>
                    </div>
                    <!--封面上传图片(封面已存在图片)-->
                    <img v-else-if="showStyle==2 && headerImage" :src="headerImage">
                </a>
            </div>
        </div>
        <!--圆的-->
        <div v-if="isshowid==2" class="crop-wrapper" >
            <div :class="['crop-container',cutStyle == 1 ? 'crop-container-round' : '']" v-show="panel2">
                <div class="container-content">
                    <div class="crop-img-b">
                        <img class="crop-image2"
                            :src="url"
                            style="width:100%;"
                            alt="Picture">
                    </div>
                    <p>推荐长宽尺寸比列为16:9,JPG/PNG 2M以内</p>
                    <!--操作按钮-->
                    <div class="crop-btn-group clearfix">
                        <div class="crop-btn btn-cancel icon-skin border-skin" @click="cancel">取消</div>
                        <div class="crop-btn btn-success border-skin el-button--primary" @click="commit">确定</div>
                    </div>
                </div>
            </div>
            <div class="file-wrapper">
                <a href="javascript:;" class="file">
                    <!--上传按钮-->
                    <input type="file" name="" @change="change">
                    <!--用户头像-->
                    <div v-if="showStyle==1" class="upload-avator">{{title}}</div>
                    <!--封面上传图片(封面没有图片)-->
                    <div v-else-if="showStyle==2 && !headerImage" class="upload-banner pr">
                        <i class="el-icon-plus"></i>
                    </div>
                    <!--封面上传图片(封面已存在图片)-->
                    <img v-else-if="showStyle==2 && headerImage" :src="headerImage">
                </a>
            </div>
        </div>
        <!--手机端-->
        <div v-if="isshowid==3" class="crop-wrapper" >
            <div :class="['crop-container',cutStyle == 1 ? 'crop-container-round' : '']" v-show="panel3">
                <div class="container-content container-content-zn">
                    <div class="crop-img-b">
                        <img class="crop-image3"
                            :src="url"
                            style="width:100%;"
                            alt="Picture">
                    </div>
                    <p>推荐长宽尺寸比列为16:9,JPG/PNG 2M以内</p>
                    <!--操作按钮-->
                    <div class="crop-btn-group clearfix">
                        <div class="crop-btn btn-cancel icon-skin border-skin" @click="cancel">取消</div>
                        <div class="crop-btn btn-success border-skin el-button--primary" @click="commit">确定</div>
                    </div>
                </div>
            </div>
            <div class="file-wrapper">
                <a href="javascript:;" class="file">
                    <!--上传按钮-->
                    <input type="file" name="" @change="change">
                    <!--用户头像-->
                    <div v-if="showStyle==1" class="upload-avator">{{title}}</div>
                    <!--封面上传图片(封面没有图片)-->
                    <div v-else-if="showStyle==2 && !headerImage" class="upload-banner pr">
                        <i class="el-icon-plus"></i>
                    </div>
                    <!--封面上传图片(封面已存在图片)-->
                    <img v-else-if="showStyle==2 && headerImage" :src="headerImage">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import "./css/cropperPic.less";

    import Cropper from "cropperjs";

    export default {
        props: {
            title: {
                default: '更换头像'
            },
            cutStyle: {
                default: 1
            },
            isshowid: {
                default: 1
            },
            ratio: {
                default: 1
            },
            showStyle: {
                default: 1
            },
            imgUrl: {
                default: ''
            }
        },
        data() {
            return {
                headerImage: "",
                picValue: "",
                cropper: "",
                croppable: false,
                panel: false,
                panel2: false,
                panel3: false,
                url: "",
                imgCropperData: {
                    accept: "image/gif, image/jpeg, image/png, image/jpg"
                }
            };
        },
        created() {
            this.headerImage = this.imgUrl;
        },
        watch: {
            imgUrl: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.headerImage = newVal;
                }
            }
        },
        mounted() {
            //初始化这个裁剪框
            var self = this;
            if(this.$props.isshowid==1){
                var image = document.querySelector(".crop-image");
            }else if(this.$props.isshowid==2){
                var image = document.querySelector(".crop-image2");
            }else if(this.$props.isshowid==3){
                var image = document.querySelector(".crop-image3");
            }
            this.cropper = new Cropper(image, {
                aspectRatio: this.ratio, //裁剪框比例  默认NaN   例如：: 1 / 1,//裁剪框比例 1：1
                viewMode: 1,
                guides: false, //是否在剪裁框上显示虚线。
                background: false,
                zoomable: false, //允许缩放图片
                autoCrop: true,
                autoCropArea: 1, //
                ready: function () {
                    self.croppable = true;
                }
            });

        },
        methods: {
            //取消上传
            cancel() {
                this.panel = false;
                this.panel2 = false;
                this.panel3 = false;
                // var obj = document.querySelector(".crop-change");
                // obj.outerHTML = obj.outerHTML;
            },
            //创建url路径
            getObjectURL(file) {
                let url = null;
                if (window.createObjectURL != undefined) {
                    // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) {
                    // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            },
            //input框change事件，获取到上传的文件
            change(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                let type = files[0].type; //文件的类型，判断是否是图片
                let size = files[0].size; //文件的大小，判断图片的大小
                if (this.imgCropperData.accept.indexOf(type) == -1) {
                    alert("请选择我们支持的图片格式！");
                    return false;
                }
                if (size > 5242880) {
                    alert("请选择5M以内的图片！");
                    return false;
                }
                this.picValue = files[0];
                this.url = this.getObjectURL(this.picValue);
                //每次替换图片要重新得到新的url
                if (this.cropper) {
                    this.cropper.replace(this.url);
                }
                this.panel = true;
                this.panel2 = true;
                this.panel3 = true;
                e.target.value = '';//清楚数据,触发同一图片的change事件
            },
            //确定提交
            commit() {
                this.panel = false;
                this.panel2 = false;
                this.panel3 = false;
                let croppedCanvas;
                let roundedCanvas;
                if (!this.croppable) {
                    return;
                }
                // 创建一个Canvas
                croppedCanvas = this.cropper.getCroppedCanvas();
                // Round
                roundedCanvas = this.getRoundedCanvas(croppedCanvas);
                this.headerImage = roundedCanvas.toDataURL();
                //上传图片
                this.postImg();
            },
            //canvas画图
            getRoundedCanvas(sourceCanvas) {
                let canvas = document.createElement("canvas");
                let context = canvas.getContext("2d");
                let width = sourceCanvas.width;
                let height = sourceCanvas.height;
                if(width > 200 && this.ratio == 1){
                    width = 200;
                    height = 200;
                }else if(width > 600){
                    width = 600;
                    height = 337.5;
                } 
                canvas.width = width;
                canvas.height = height;
                context.imageSmoothingEnabled = true;
                context.drawImage(sourceCanvas, 0, 0, width, height);
                context.globalCompositeOperation = "destination-in";
                context.beginPath();
                if (this.cutStyle == 1) {
                    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
                } else {
                    context.fillRect(0, 0, width, height);
                }
                context.fill();
                return canvas;
            },
            //提交上传函数
            postImg() {
                this.$emit('submit', this.headerImage);
            },
        }
    };
</script>
<style>

</style>


<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-info"></i></div>
                <h3>附件信息</h3>
            </el-col>
            <!--   <el-col :span="12" class="text-right">
                   <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                       <el-button slot="append">搜索</el-button>
                   </el-input>
               </el-col>-->
        </el-row>
        <div class="yd-common-attachment common-pd yd-bg"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-tabs v-model="activeName">
                <el-tab-pane label="身份证上传" name="first">
                    <div class="mt-30" style="padding-left: 20px">
                        <div class="attachment-title">
                            <p>上传{{this.$store.state.userInfo.name}}本人身份证照片</p>
                            <ul>
                                <li>1.请上传本人的身份证照片</li>
                                <li>2.拍照时请确保身份证边框完整、图像清晰、光纤均匀</li>
                            </ul>
                        </div>
                        <id-card ref="idCard"
                                 :is_autoUpload="true"
                                 url="/studentInfo/upload64/sfztp"
                                 postUrl="/system/confirmUpload/sfztp">
                        </id-card>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="获奖证书上传" name="second">
                    <div class="mt-30" style="padding-left: 20px">
                        <div class="attachment-title">
                            <p>上传{{this.$store.state.userInfo.name}}本人荣誉证书</p>
                        </div>
                        <certificate ref="winningCard"
                                     :is_autoUpload="true"
                                     url="/studentInfo/upload/hjzstp"
                                     postUrl="/system/confirmUpload/hjzstp">
                        </certificate>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="毕业证上传" name="third">
                    <div class="mt-30" style="padding-left: 20px">
                        <div class="attachment-title">
                            <p>上传{{this.$store.state.userInfo.name}}本人毕业证</p>
                        </div>
                        <certificate ref="graduationCard"
                                     :is_autoUpload="true"
                                     url="/studentInfo/upload/byztp"
                                     postUrl="/system/confirmUpload/byztp">
                        </certificate>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import idCard from '../../components-page/common/info-upload-card'
    import certificate from '../../components-page/common/info-upload-certificate'
    import cutPic from '../../components-page/common/cropperPic'

    export default {
        name:"info-attachment",
        components:{
            idCard,
            certificate,
            cutPic
        },
        data() {
            return {
                activeName:'first',
                idCard:[], //身份证图片
                winningCard:[], // 获奖证书
                graduationCard:[] //毕业证
            }
        },
        created() {
            this.getData()
        },
        methods:{
            getData() {
                this.$POST('/system/user_info').then((res) => {
                    if (res.code = 200) {
                        //身份证照片
                        this.idCard = this.convertArray(res.data.sfztp.split(","));
                        this.$refs.idCard.setFileList(this.idCard); //给子组件赋值
                        //获奖证书
                        this.winningCard = this.convertArray(res.data.hjzstp.split(","))
                        this.$refs.winningCard.setFileList(this.winningCard); //给子组件赋值
                        //毕业证
                        this.graduationCard = this.convertArray(res.data.byztp.split(","))
                        this.$refs.graduationCard.setFileList(this.graduationCard); //给子组件赋值
                    }
                })
            },
            convertArray(string) { //字符串转换数组
                let arr = [];
                string.forEach(item => {
                    arr.push(item);
                })
                return arr
            },
        }
    }
</script>

<style scoped>

</style>
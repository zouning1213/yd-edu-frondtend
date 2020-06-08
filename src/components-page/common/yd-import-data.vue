<template>
    <!--使用方法
        //isupdata  上传带的参数{}
      <yd-import-data 
                toPathName='院系'
                ruleUrl='/collegeInfo/list'
                toPathUrl='educational_college' 

                name="班级"
                btnName='按钮名称'
                @importSuccess="importSuccess"
                :isupdata="isupdata"
                importUrl="/classInfo/exportExcel"
                templateUrl="/classInfo/exportTemplate">
      </yd-import-data>
     -->
    <!--导入数据-->
    <div style="display: inline-block;margin-left: 10px">
        <el-button type="success" @click="clickImportBtn">{{btnName}}</el-button>
        <el-dialog
                z-index='20'
                :title="'导入'+name"
                center
                :visible.sync="DialogVisible"
                @close=" is_upload=false , is_upload_error=false"
                width="480px">
            <!--未上传时  is_upload 是否上传成功-->
            <div v-if="!is_upload && !is_upload_error&&ruleDataIsNull" class="import-stu-wrap">
                请导入{{name}}信息！
            </div>
            <!--上传之前，条件数据必须不为空-->
            <div v-if="!ruleDataIsNull" class="import-stu-wrap">
                导入{{name}}信息之前，必须先导入{{toPathName}}信息
            </div>
            <!--上传成功-->
            <div v-if="is_upload && !is_upload_error" class="import-stu-wrap"> 
                {{is_upload_loading}}
                <div class="mt-10">
                    <el-progress color="#67c23a" :percentage="upload_progress"></el-progress>
                </div>
            </div>
            <!--上传失败-->
            <div v-if="is_upload_error" class="import-stu-wrap">
                上传失败！
                <div class="mt-10">
                    <el-progress color="#67c23a" :percentage="upload_progress"></el-progress>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="ruleDataIsNull" @click="downImport" style="margin-right: 10px">下载模板</el-button>
                <div v-if="ruleDataIsNull" style="display: inline-block" >
                    <el-upload :headers='config.header'
                                :disabled="is_disableed"
                               :action="remoteHost + importUrl"
                               :on-success="uploadSuccess"
                               :on-error="uploadError"
                               :before-upload="beforeUpload"
                               :on-progress="uploadProgress"
                               :data="isupdata"
                               :show-file-list="false">
                        <el-button type="primary" >导入{{name}}</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </div> 
                <span v-for="(item,index) in toPathUrlReceive" :key="index">
                    <router-link :to="{name:item}"> 
                        <el-button v-show="testIsNull[index]" type="primary" style="margin-right:10px">前往{{toPathNameReceive[index]}}导入</el-button>
                    </router-link>
                </span> 
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:"yd-import-data",
        // props:['name','importUrl','exportUrl'],
        props:{
            name:{ //名称
                default:'',
            },
            btnName:{
                default:'导入'
            },
            importUrl:{ // 导入地址
                required:true,
            },
            templateUrl:{ //下载模板地址
                required:true,
            },
            isupdata:{
                default:function(){
                    return {}
                }
            },
            toPathName:{//前往xx导入的按钮
                default:''
                // default:'院系'
            },
            toPathUrl:{//前往xx导入的按钮
                default:''
                // default:'educational_college'
            },
            ruleUrl:{//需要验证是否为空的url地址
                default:''
            }
        },
        data() {
            return {
                DialogVisible:false,
                config:{
                    header:{
                        Authorization:''
                    },
                    action:'',
                },
                is_upload:false, //是否上传
                is_upload_error:false, //是否上传错误
                upload_progress:0, //上传进去
                is_upload_loading:"导入中..." ,
                is_disableed:false,
                params:{
                    limit:10,
                    page:1
                },
                ruleDataIsNull:true,//导入的条件数据是否为空
                testIsNull:{},
                toPathNameReceive:this.$props.toPathName,
                toPathUrlReceive:this.$props.toPathUrl,
                ruleUrlReceive:this.$props.ruleUrl,
            }
        },
        created(){
            this.haveMustData()
        },
        mounted() {
            this.config.header.Authorization = localStorage.getItem(setting.userToken);
            // this.config.action = setting.remoteHost + '/classInfo/exportExcel';
        },
        methods:{
            uploadProgress(event,file,fileList) {
                this.is_disableed = true
                this.is_upload = true;
                this.upload_progress = Math.ceil(file.percentage);
            },
            uploadSuccess(res,file) { //正面 
                if(res.code==500){
                    this.$message.error({
                        message:res.message
                    })
                    this.is_upload_error = true
                    this.is_upload = false
                }else{
                    this.is_upload_error = false
                    this.upload_progress = 100
                    this.is_upload_loading = '导入成功！'

                    this.is_disableed = false
                    this.importSuccess(res )
                } 
            },
            uploadError() {
                this.is_upload_error = true
            },
            beforeUpload(file) {
                const isText = file.type === 'application/vnd.ms-excel'
                const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                return (isText | isTextComputer);
            },
            //下载导入模板
            downImport() {
                // console.log(setting.remoteHost + this.templateUrl)
                location.href = setting.remoteHost + this.templateUrl
            },
            importSuccess(res){
                this.$emit("importSuccess",res)
            },
            //点击导入弹模态中。。。
            clickImportBtn(){

                this.DialogVisible = true
            },
            async getDataIsNUll(item,index){
                await this.$GET(item,this.params).then((res)=>{  
                    if(res.data.length!=0){
                        // console.log("数据不为空") 
                        this.testIsNull[index] = false 
                    }else{
                        // console.log("数据为空") 
                        this.testIsNull[index] = true
                    }
                })
            },
            async haveMustData(){ 
                this.toPathNameReceive = this.toPathNameReceive.split(',')
                this.toPathUrlReceive = this.toPathUrlReceive.split(',')
                this.ruleUrlReceive = this.ruleUrlReceive.split(',')  
                if(this.ruleUrlReceive[0]){ 
                    for(var i=0;i<this.ruleUrlReceive.length;i++){ 
                        await this.getDataIsNUll(this.ruleUrlReceive[i],i)  
                    }  
                    this.ruleUrlReceive.forEach((item,index)=>{  
                        if(this.testIsNull[index]==true){
                            this.ruleDataIsNull = false
                        }
                    })      
                } 
                
            }
        }
    }
</script>

<style scoped>

</style>
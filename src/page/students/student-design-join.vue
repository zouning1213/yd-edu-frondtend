<template>
    <div>
        <el-row class="yd-router-title yd-bg">
            <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
            <h3>正在评教</h3>
        </el-row>
        <div class="common-pd yd-bg yd-student-design1"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <div v-show="this.checkedJsid.length"> 
                <!--选择教师-->
                <div class="clearfix">
                    <el-col :span="19" :offset="1">
                        <h3 class="title">选择教师</h3>
                        <div class="check-list">
                            <el-checkbox-group v-model="checkedJsid" @change="changeJsid">
                                <el-checkbox v-for="(item,index) in jsList" :key="index"
                                            :label="item.jsid"
                                            name="type">{{item.jsmc}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                    <el-col :span="2" class="text-right">
                        <router-link :to="{name:'student_design_open'}">
                            <el-button>返回上一步</el-button>
                        </router-link>
                    </el-col>
                </div>
                <!---->
                <div v-if="checkedPjzt" class="no-design-tip">
                    <img src="./img/evaluation-design.png"/>
                    <p>该教师已评教完毕</p>
                </div>
                <!--开始评教-->
                <div v-else>
                    <el-row>
                        <el-col :span="21" :offset="1">
                            <el-form ref="ruleForm">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>评教项目</th>
                                        <th>教师: {{checkedJsmc}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in tableList" :key="index">
                                        <td>
                                            <p>{{item.xmmc}}({{item.xmfz}}分)</p>
                                        </td>
                                        <td align="center">
                                            <!--为空的提示-->
                                            <div style="width:46px;display: inline-block">
                                        <span v-show="item.fs == '' && is_validation"
                                            class="text-red" style="margin-right: 6px;font-size: 12px">*必选</span>
                                            </div>
                                            <el-radio v-model="item.fs"
                                                    v-for="(item1,index) in item.fzfb.split(',')" :key="index"
                                                    :label="item1">{{item1}}分
                                            </el-radio>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <el-form-item label="你对教师有什么意见？" label-width="152px">
                                                <el-input rows="4" type="textarea" v-model="jybz"></el-input>
                                            </el-form-item>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </el-form>
                            <div class="mt-20 text-right">
                                <el-button type="primary" @click="onSubmit">提交评教</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div v-show="!this.checkedJsid.length" class="no-design-tip">
                <img src="./img/evaluation-design.png"/>
                    <p>暂无教师需要评教</p>
            </div>
        </div>
    </div>
</template>

<script>
    import './css/student-design.less'

    export default {
        name:"test",
        data() {
            return {
                jybz:'', //教师建议
                jsList:[],
                checkedJsid:[], //教师id
                checkedJsmc:'', //教师姓名
                checkedPjzt:'', //评教状态
                tableList:[],
                rwid:this.$route.params.rwid, //任务id
                xsid:JSON.parse(localStorage.getItem("user")).xsid, //学生id
                is_validation:false,
            }
        },
        async created() {  
            await this.getData();
            await this.setJsid() //设置教师默认值
            await this.getJsxm() //获取教师姓名 
        },
        methods:{
            getData() {
                return this.$GET('./evaluationTask/listByEvaluation',{rwid:this.rwid,xsid:this.xsid}).then((res) => {
                    if (res.code == 200) {
                        if (res.data.js.length > 0) {
                            this.tableList = res.data.evaluationProjectList
                            //教师列表
                            this.jsList = res.data.js
                        }
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            setJsid() {
                this.checkedJsid = this.jsList.length ? [this.jsList[0].jsid] : []
            },
            changeJsid() { //控制教师是单选
                if (this.checkedJsid.length > 1) {
                    this.checkedJsid.shift();
                }
                this.getData()
                this.getJsxm()
                this.jybz = ''
            },
            getJsxm() {
                //根据选中的id得到 专业名称
                // var index = this.jsList.map(function (item) {
                //     return item.jsid;
                // }).indexOf(parseInt(this.checkedJsid.join(',')));

                // this.checkedJsmc = this.jsList[index].jsmc
                // this.checkedPjzt = this.jsList[index].pjzt

                
                //zn改 
                var index = this.jsList.map((item)=>{
                    if(item.jsid == this.checkedJsid[0]){
                        this.checkedJsmc = item.jsmc
                        this.checkedPjzt = item.pjzt
                    } 
                });  
            },
            onSubmit() {
                this.is_validation = true

                //创建后台需要的数据格式
                let teacherscoreDetailsJson = {
                    jybz:this.jybz,
                    teacherscoreDetailsList:[],
                    teacherscoreInfo:{
                        rwid:this.rwid,
                        jsid:this.checkedJsid.join(','),
                        xsid:this.xsid,
                    }
                }
                //添加分数
                this.tableList.forEach(item => {
                    teacherscoreDetailsJson.teacherscoreDetailsList.push({
                        fs:item.fs,
                        xmid:item.xmid
                    })
                })

                this.$POST('/teacherscoreDetails/generateTeacherScore',teacherscoreDetailsJson,{
                    transformRequest:function (data) {
                        return JSON.stringify(data);
                    },
                    headers:{'Content-Type':'application/json'}
                }).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'评教成功'
                        })
                        this.checkedPjzt = true
                    } else {
                        this.$message.error('请选择必选')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>
<style lang="less">

</style>
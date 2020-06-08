<template>
    <!--留言管理-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-message-board"></i></div>
                <h3>留言管理</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入留言标题" v-model="tosearch" class="input-with-select"
                          @keyup.enter.native="qjsearchMessage">
                    <el-button slot="append" @click="qjsearchMessage">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="message-board yd-bg common-pd">
            <!-- 留言版主体 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first">
                    <i slot="label" class="">全部<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :isjiaowu="true" @responsdMessage="responsdMessage" @delMessage="delMessage"
                                     :messagedata="allDatas"></messageListItem>
                </el-tab-pane>

                <el-tab-pane name="second">
                    <i slot="label" class="">已回复<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :isjiaowu="true" @responsdMessage="responsdMessage" @delMessage="delMessage"
                                     :messagedata="replyDatas"></messageListItem>
                </el-tab-pane>

                <el-tab-pane label="未回复" name="third">
                    <i slot="label" class="">未回复<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :isjiaowu="true" @responsdMessage="responsdMessage" @delMessage="delMessage"
                                     :messagedata="unreplyDatas"></messageListItem>
                </el-tab-pane>
                <el-tab-pane label="与我相关" name="fourth">
                    <i slot="label" class="">与我相关<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :isjiaowu="true" @responsdMessage="responsdMessage" @delMessage="delMessage"
                                     :messagedata="mylistDatas"></messageListItem>
                </el-tab-pane>
            </el-tabs>
            <!-- 模态 -->
            <div class="message-motai" ref="motai">
                <div class="message-motai-content">
                    <i class="isClose el-icon-close" @click="isclose"></i>
                    <textarea cols="30" rows="10" placeholder="请输入回复留言内容" ref="messagecontent"></textarea>
                    <!-- <el-checkbox v-model="anonymous">匿名</el-checkbox> -->
                    <div class="message-motai-submit">
                        <el-button type="primary" @click="submitMessage">提交</el-button>
                        <el-button @click="isclose">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <ydPage v-if="DestroyIncomeStatistics"
                ref="ydPage"
                :url="conputedurl"
                :params="{condition:this.condition||'' }"
                @changePage="changePageOne">
        </ydPage>
    </div>
</template>

<script>
    import '../../components-page/common/css/message-border-list.less'
    import messageListItem from "../../components-page/common/message-board-list"

    export default {
        name:"manager-message",
        components:{
            messageListItem,
        },
        data() {
            return {
                hfflag:false,
                hflyh:'',
                search:'',
                tosearch:'',
                isurl:'/message/list',
                //分页是否显示
                DestroyIncomeStatistics:true,
                //搜索条件
                condition:'',
                anonymous:true,
                //所有回复
                allDatas:[],
                //已回复
                replyDatas:[],
                //未回复
                unreplyDatas:[],
                //与我相干
                mylistDatas:[],
                //chuan
                activeName:'first',
                anonymous:true,
                newcontent:false,
            }
        },
        methods:{
            changePageOne(data) {
                if (this.activeName == "first") {
                    this.allDatas = data || []
                } else if (this.activeName == 'second') {
                    this.replyDatas = data || []
                } else if (this.activeName == 'third') {
                    this.unreplyDatas = data || []
                } else if (this.activeName == 'fourth') {
                    this.mylistDatas = data || []
                }
            },
            //后面改组件加
            handleClick(tab,event) {
                this.$emit("tabChanges",this.activeName);
            },
            open() {
                this.$refs.motai.style = "display:block"
            },
            isclose() {
                this.$refs.messagecontent.value = '',
                    this.$refs.motai.style = "display:none"
            },
            submitMessage() {
                if (!this.flag) {
                    console.log("回复")
                    let a = {
                        gllyh:this.hflyh,
                        lyxx:this.$refs.messagecontent.value
                    }
                    // console.log("回复留言" + this.hflyh)
                    // console.log(a)
                    if (a.lyxx != '') {
                        this.$POST("/message/reply",a).then((res) => {
                            this.$message({
                                title:'成功',
                                message:'添加成功',
                                type:'success'
                            });
                            this.$refs.ydPage.getData()
                        })

                        this.searchMessage()
                        this.$refs.motai.style = "display:none"
                    } else {
                        this.$message({
                            
                                title:'失败',
                                message:'请输入回复留言信息',
                                type:'error'
                            });
                    }

                } else {
                    console.log("添加新留言 ")
                    let messagecontent = this.$refs.messagecontent.value
                    let nm = this.anonymous? '1' :'';
                    let user = JSON.parse(localStorage.getItem("user"))
                    let zh = user.account
                    // console.log(user)
                    let messages = {
                        createTime:'',
                        createUser:'',
                        //关联留言号
                        gllyh:0,
                        //留言号
                        lyh:'',
                        lyxx:messagecontent,
                        //是否匿名
                        nm:nm,
                        //更改时间
                        updateTime:'',
                        //更改用户
                        updateUser:'',
                        //用户类型
                        yhlx:'',
                        //账号
                        zh:zh
                    }
                    if (messages.lyxx != '') {
                        this.$POST("/message/add",messages).then((res) => {
                            this.$message({
                                title:'成功',
                                message:'添加成功',
                                type:'success'
                            });
                            // messages.zp = this.allDatas[0].zp
                            // messages.xm = this.allDatas[0].xm
                            // this.allDatas.unshift(messages)
                            // this.unreplyDatas.unshift(messages)
                            // this.mylistDatas.unshift(messages)
                            this.$refs.ydPage.getData('search')

                        })
                        this.$refs.motai.style = "display:none"
                    } else {
                        this.$message('请输入留言信息');
                    }
                }


            },
            //回复
            responsdMessage(lyh) {
                this.hfflag = true,
                    this.hflyh = lyh,
                    this.open()
            },
            //删除
            delMessage(lyh) {
                this.$confirm('此操作将永久删除该文件, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    this.$GET("/message/delete",{messageId:lyh}).then(() => {
                        this.$refs.ydPage.getData()
                    })
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    });
                })
            },
            //搜索
            searchMessage() {
                this.DestroyIncomeStatistics = false;
                this.condition = this.search
                this.$GET(this.isurl,{limit:10,page:1,condition:this.condition}).then((res) => {
                    this.$nextTick(() => {
                        this.DestroyIncomeStatistics = true;
                    });
                    if (this.activeName == "first") {
                        this.allDatas = res.data || []
                    } else if (this.activeName == 'second') {
                        this.replyDatas = res.data || []
                    } else if (this.activeName == 'third') {
                        this.unreplyDatas = res.data || []
                    } else if (this.activeName == 'fourth') {
                        this.mylistDatas = res.data || []
                    }
                })
            },
            qjsearchMessage() {
                this.search = this.tosearch
                this.$refs.ydPage.getData("search")
            }
        },
        computed:{
            conputedurl() {
                if (this.activeName == "first") {
                    this.isurl = '/message/list'
                    this.searchMessage()
                    return this.isurl
                } else if (this.activeName == 'second') {
                    this.isurl = '/message/replyList'
                    this.searchMessage()
                    return this.isurl
                } else if (this.activeName == 'third') {
                    this.isurl = '/message/unReplyList'
                    this.searchMessage()
                    return this.isurl
                } else if (this.activeName == 'fourth') {
                    this.isurl = '/message/myList'
                    this.searchMessage()
                    return this.isurl
                }
            }
        }
    }
</script>

<style>
</style>
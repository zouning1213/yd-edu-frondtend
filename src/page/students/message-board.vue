<template>
    <!--留言板-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-message-board"></i></div>
                <h3>留言板</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="根据内容搜索" v-model="tosearch"
                          @keyup.enter.native="qjsearchMessage" class="input-with-select">
                    <el-button slot="append" @click="qjsearchMessage">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <div class="message-board yd-bg common-pd pr">
            <div class="yd-add-btn" style="right:10px;top:5px;" @click="open"></div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- 主体 -->
                <el-tab-pane label="全部" name="first">
                    <i slot="label" class="">全部<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :messagedata="allDatas"></messageListItem>
                </el-tab-pane>

                <el-tab-pane name="second">
                    <i slot="label" class="">已回复<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :messagedata="replyDatas"></messageListItem>
                </el-tab-pane>

                <el-tab-pane label="未回复" name="third">
                    <i slot="label" class="">未回复<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :messagedata="unreplyDatas"></messageListItem>
                </el-tab-pane>
                <el-tab-pane label="与我相关" name="fourth">
                    <i slot="label" class="">与我相关<span class="red-point" v-if="newcontent"></span></i>
                    <messageListItem :messagedata="mylistDatas"></messageListItem>
                </el-tab-pane>
            </el-tabs>
            <!-- 模态 -->
            <div class="message-motai" ref="motai">
                <div class="message-motai-content">
                    <i class="isClose el-icon-close" @click="isclose"></i>
                    <textarea cols="30" rows="10" placeholder="请输入留言内容" ref="messagecontent"></textarea>
                    <el-checkbox v-model="anonymous">匿名</el-checkbox>
                    <div class="message-motai-submit">
                        <el-button type="primary" @click="submitMessage">提交</el-button>
                        <el-button @click="isclose">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <ydPage ref="ydPage" :url="conputedurl" :params="{condition:this.condition||'' }"
                @changePage="changePageOne"></ydPage>
    </div>
</template>

<script>
    import '../../components-page/common/css/message-border-list.less'
    import messageListItem from "../../components-page/common/message-board-list"

    export default {
        name:"messageBoard",
        components:{
            messageListItem,
        },
        data() {
            return {
                search:'',
                tosearch:'',
                isurl:'/message/list',
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
                this.$refs.motai.style = "display:none"
            },
            submitMessage() {
                let messagecontent = this.$refs.messagecontent.value
                let nm = this.anonymous? '1' :'';
                let user = JSON.parse(localStorage.getItem("user"))
                let zh = user.account
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
                if (messages.lyxx) {
                    this.$POST("/message/add",messages).then((res) => {
                        this.$message({
                            message:'添加成功',
                            type:'success'
                        });
                        // messages.zp = this.allDatas[0].zp
                        // messages.xm = this.allDatas[0].xm
                        // this.allDatas.unshift(messages)
                        // this.unreplyDatas.unshift(messages)
                        // this.mylistDatas.unshift(messages)
                        this.$refs.messagecontent.value = ''
                        this.$refs.ydPage.getData('search')
                    })
                    this.$refs.motai.style = "display:none"
                } else {
                    this.$message('请输入留言信息');
                }

            },
            addReply(lyh) {
                // console.log("添加回复"+lyh)
            },
            //搜索
            searchMessage() {
                this.condition = this.search
                this.$GET(this.isurl,{limit:10,page:1,condition:this.condition}).then((res) => {

                    this.$refs.ydPage.getData('search')
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
                this.$refs.ydPage.getData('search')
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
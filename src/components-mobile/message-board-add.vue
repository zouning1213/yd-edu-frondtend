<template> 
    <!-- <h3>手机留言板</h3>   -->
    <div  class="yd-phone-wrap"> 
        
        <!-- 头部搜索框 --> 
        <div class="search-wrap">
            <div class="search-content">
                <div class="search-header clearfix">
                    <div class="fl"><i class="el-icon-arrow-left" @click="$router.go(-1)"></i>添加</div> 
                </div> 
            </div>
        </div>

        
        <div class="phone-detail-add-wrap">
            <div class="list-wrap clearfix"> 
                <!-- 模态 -->
                <div class="message-motai" ref="motai">
                    <div class="message-motai-content">
                        <!-- <i class="isClose el-icon-close" @click="isclose"></i> -->
                        <textarea cols="30" rows="10" placeholder="请输入留言内容" ref="messagecontent" style="width:100%"></textarea>
                        <el-checkbox v-model="anonymous" style="padding:20px 0">匿名</el-checkbox>
                        <!-- <div class="message-motai-submit">
                            <el-button type="primary" @click="submitMessage">提交</el-button>
                            <el-button @click="isclose">取消</el-button>
                        </div> -->
                    </div>
                </div>
            </div> 
        </div>

        <!-- 模态提交 -->
        <div class="add-wrap-buttom" @click="submitMessage">
                <span>
                    提交
                </span>
        </div> 
    </div>
</template>

<script>  
    export default {
        name:"students-message-board-add",  
        data() {
            return {
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
                            title:'成功',
                            message:'添加成功',
                            type:'success'
                        });
                       this.$router.go(-1)

                    }) 
                } else {
                    this.$message('请输入留言信息');
                }

            },
            addReply(lyh) {
                // console.log("添加回复"+lyh)
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
                this.DestroyIncomeStatistics = false;
                this.search = this.tosearch
                this.$nextTick(()=>{ 
                    this.DestroyIncomeStatistics = true 
                })
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
        }, 
    }
</script>

<style scoped>
.pb-20{
    padding-bottom: 20px;
}
</style>
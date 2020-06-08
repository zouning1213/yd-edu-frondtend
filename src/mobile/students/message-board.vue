<template>
    <!-- <h3>手机留言板</h3>   -->
    <div class="mobile-common-warp bg-F3F5F7">
        <div class="mobile-common-header">
            <van-nav-bar left-text="留言板" @click-left="$router.go(-1)" left-arrow>
                <!--<van-icon name="search" slot="right"/>-->
                <div name="search" slot="right">
                    <van-search
                            v-model="params.condition"
                            placeholder="请输入内容关键字"
                            show-action
                            shape="round"
                            @input="onInput"
                            @search="onSearch">
                        <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
                </div>
            </van-nav-bar>
        </div>
        <div class="mobile-common-footer">
            <van-button type="primary" size="large" @click="sendMessage">发表留言</van-button>
        </div>
        <div class="mobile-common-main pr">
            <van-tabs v-model="active" sticky @click="onClick" swipeable animated>
                <van-tab title="全部">
                    <div class=" mobile-message-board">
                        <message-board-list :messageList="allList"></message-board-list>
                    </div>
                    <mobile-page ref="mobilePage1" url="/message/list" :params="params" @changePage="function(data) {
                    allList = data}"></mobile-page>
                </van-tab>
                <van-tab title="已回复">
                    <div class=" mobile-message-board">
                        <message-board-list :messageList="replyList"></message-board-list>
                    </div>
                    <mobile-page ref="mobilePage2" url="/message/replyList"
                                 :params="params" @changePage="function(data) {
                    replyList = data}"></mobile-page>
                </van-tab>
                <van-tab title="未回复">
                    <div class=" mobile-message-board">
                        <message-board-list :messageList="notList"></message-board-list>
                    </div>
                    <mobile-page ref="mobilePage3" url="/message/unReplyList"
                                 :params="params" @changePage="function(data) {
                    notList = data}"></mobile-page>
                </van-tab>
                <van-tab title="与我相关">
                    <div class=" mobile-message-board">
                        <message-board-list :messageList="relatedList"></message-board-list>
                    </div>
                    <mobile-page ref="mobilePage4" url="/message/myList"
                                 :params="params" @changePage="function(data) {
                    relatedList = data}"></mobile-page>
                </van-tab>
            </van-tabs>
        </div>
        <!--弹出层-->
        <van-popup v-model="showPopup" position="bottom" :style="{ height: '40%' }">
            <van-cell-group>
                <van-field
                        v-model="form.lyxx"
                        rows="6"
                        autosize
                        label="留言内容:"
                        type="textarea"
                        placeholder="请输入留言内容"/>
                <van-field label="是否匿名:">
                    <van-switch slot="input" size="24px" v-model="form.checked"/>
                </van-field>
            </van-cell-group>
            <div style="padding: 10px 10px;text-align: right">
                <van-button type="default" @click="removeMessage">取消留言</van-button>
                <van-button type="primary" @click="submitMessage">发表留言</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import messageBoardList from '../../components-mobile/message-board-list'

    export default {
        name:"messageBoard",
        components:{
            messageBoardList
        },
        data() {
            return {
                active:'0',
                params:{
                    condition:'',
                    limit:30,
                },
                allList:[],
                replyList:[],
                notList:[],
                relatedList:[],
                showPopup:false,
                form:{
                    lyxx:'',
                    zh:JSON.parse(localStorage.getItem("user")).account,
                    nm:'1', // 当checked 等于true的时候 等于1  其他情况等于空
                    checked:true //是否匿名
                }
            }
        },
        methods:{
            sendMessage() {
                this.showPopup = true
            },
            removeMessage() {
                this.showPopup = false
                this.form = {
                    lyxx:'',
                    zh:'',
                    nm:'1', // 当checked 等于true的时候 等于1  其他情况等于空
                    checked:true //是否匿名
                }
            },
            submitMessage() {
                let form = {
                    lyxx:this.form.lyxx,
                    zh:this.form.zh,
                    nm:this.form.checked? '1' :''
                }
                if (this.form.lyxx != '') {
                    this.$POST("/message/add",form).then((res) => {
                        if (res.code == 200) {
                            this.$toast.success('发布成功');
                            this.showPopup = false
                            this.removeMessage() //清空表单
                            this.onInput() //刷新数据
                        } else {
                            this.$toast.fail(res.message);
                        }
                    })
                } else {
                    this.$toast.fail('留言内容不能为空');
                }
            },
            onClick(name,title) {
                this.$nextTick(() => {
                    this.onInput()
                })
            },
            onInput() {
                if (this.active == '0') {
                    this.$refs.mobilePage1.getData()
                } else if (this.active == '1') {
                    this.$refs.mobilePage2.getData()
                } else if (this.active == '2') {
                    this.$refs.mobilePage3.getData()
                } else {
                    this.$refs.mobilePage4.getData()
                }
            },
            onSearch() {
                if (this.active == '0') {
                    this.$refs.mobilePage1.getData('search')
                } else if (this.active == '1') {
                    this.$refs.mobilePage2.getData('search')
                } else if (this.active == '2') {
                    this.$refs.mobilePage3.getData('search')
                } else {
                    this.$refs.mobilePage4.getData('search')
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .mobile-message-board {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        width: 95%;
        margin: 16px auto 0;
        /*padding: 16px;*/
    }
</style>
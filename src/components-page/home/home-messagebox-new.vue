<template>
    <div class="home-messageBox">
        <div class="home-header clearfix ">
            <div class="title-icon">
                <!-- <i class="yd icon-sign fl icon-skin"></i>  -->
                <h3 class="fl">留言板</h3>
                <div class="state-box">
                    <ul class="state-list">
                        <li class="state-item" @click="activeNameChange('all')"
                            :class="{'active' : activeName == 'all'}">最新
                        </li>
                        <li class="state-item" @click="activeNameChange('reply')"
                            :class="{'active' : activeName == 'reply'}">已回复
                        </li>
                        <li class="state-item" @click="activeNameChange('unReply')"
                            :class="{'active' : activeName == 'unReply'}">未回复
                        </li>
                        <!-- <li class="state-item" @click="activeNameChange('my')" :class="{'active' : activeName == 'my'}">与我相关</li> -->
                    </ul>
                </div>
                <router-link
                        :to="{name:$props.who=='jw'?'educational_message':$props.who=='xs'?'students_message_board':'teacher_message_board'}">
                    <i class="yd icon-19 fr" style="color:#333"></i>
                </router-link>
            </div>
        </div>
        <div class="home-content messageBox-content height-360">
            <div class="message-body" v-for="(dataItem,key) in dataList" :key="key" v-show="key == activeName">
                <div v-for="(item,index) in dataItem.list" :key="index" class="message-item">
                    <div class="head-icon">
                        <yd-author :name="item.createrName" width="40"></yd-author>
                    </div>
                    <div class="message-people">
                        <div class="people-info">
                            <div class="name">
                                {{item.createrName}}
                                <span class="message-time">{{item.createTime}} 发表</span>
                            </div>
                        </div>
                        <div class="people-text">
                            {{item.lyxx}}
                        </div>
                        <div class="first-reset" v-if="item.hf">
                            <label class="name">{{item.hfxm}}：</label>{{item.hf}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home-Notice',
        props: ['who'],
        data () {
            return {
                tableData: [],
                limit: 3,
                dataList: {
                    all: {
                        url: '/message/list',
                        page: 1,
                        loading: false,
                        finished: false,
                        list: [],
                        count: 0
                    },
                    reply: {
                        url: '/message/replyList',
                        page: 1,
                        loading: false,
                        finished: false,
                        list: [],
                        count: 0
                    },
                    unReply: {
                        url: '/message/unReplyList',
                        page: 1,
                        loading: false,
                        finished: false,
                        list: [],
                        count: 0
                    },
                    my: {
                        url: '/message/myList',
                        page: 1,
                        loading: false,
                        finished: false,
                        list: [],
                        count: 0
                    },
                },
                activeName: 'all',
            }
        },
        created () {
            // this.$GET('/notice/list',{limit:5,page:1,px:'desc',isOpen:"N"}).then((res) => {
            //     this.tableData = res.data
            // })
            this.getTableData()

        },
        methods: {
            activeNameChange (activeName) {
                this.activeName = activeName
                if (this.dataList[activeName].page == 1) {
                    this.getTableData()
                }
            },
            getTableData () {
                let newDataObj = this.dataList[this.activeName]
                this.$GET(newDataObj.url, {limit: this.limit, page: newDataObj.page++}).then((res) => {
                    let data = res.data || []
                    newDataObj.count = res.count
                    newDataObj.list.push(...data)
                })
            }
        },
        filters: {
            cutDate (time) {
                function fill (num) {
                    if (num < 10) {
                        return '0' + num
                    } else {
                        return num
                    }
                }

                let date = new Date(time)
                return date.getFullYear() + '/' + fill((date.getMonth() + 1)) + '/' + fill(date.getDate()) + ' ' + fill(date.getHours()) + ':' + fill(date.getSeconds())
            }
        }
    }
</script>

<style lang="less" scope>
    .home-messageBox{
        .state-box {
            display: inline-block;
            height: 36px;
            .state-list {
                width: 100%;
                display: flex;
                padding-left: 10px;

                .state-item {
                    padding: 9px 5px;
                    margin-right: 16px;
                    font-size: 15px;
                    font-weight: 400;
                    cursor: pointer;

                    &:first-child {
                        padding-left: 10px;
                    }

                    &.active {
                        color: #3E7857;
                    }
                }
            }
        }
        /*内容*/
        .messageBox-content{
            .message-body {
                .message-item {
                    border-bottom: 1px solid #F5F5F5;
                    display: flex;
                    padding: 20px 20px 20px 0;
                    justify-content: space-between;
                    .head-icon {
                        align-self: flex-start;
                        margin-right: 10px;
                    }
                    .message-people {
                        flex: 1;
                        width: 0;
                        .people-info {
                            font-weight: 400;
                            margin-bottom: 6px;
                            .name {
                                font-size: 15px;
                                color: #2c2c2c;
                                font-weight: 550;
                                .message-time {
                                    font-size: 12px;
                                    color: #999;
                                    margin-left: 20px;
                                }
                            }
                            .time {
                                height: 12px;
                                margin-top: 5px;
                                font-size: 12px;
                                color: #BFBFBF;
                            }
                        }

                        .people-text {
                            color: #8A8A8A;
                            font-size: 14px;
                        }

                        .first-reset {
                            padding: 14px 10px;
                            background: rgba(250, 250, 250, 1);
                            border-radius: 5px;
                            margin-top: 15px;
                            .name {
                                color: #3262EC;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
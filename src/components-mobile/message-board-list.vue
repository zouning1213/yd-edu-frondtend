<template>
    <ul class="message-board-ul">
        <template v-if="messageList.length > 0">
            <li class="board-list clearfix yd-bg" v-for="(item,index) in messageList" :key="index">
                <div class="board-user">
                    <yd-author v-if="item.nm==1" width="36" name="匿名"></yd-author>
                    <yd-author v-else width="36" :name="item.xm"></yd-author>
                </div>
                <div class="board-content">
                    <!--一级-->
                    <div class="one-content">
                        <h3>{{item.nm==1 ? "匿名":item.xm || '未设置姓名'}}</h3>
                        <span class="time">提问日期：{{item.createTime}}</span>
                        <div class="text">
                            <p>{{item.lyxx}}</p>
                        </div>
                    </div>
                    <!--二级-->
                    <div class="two-content">
                        <div v-if="item.hf">
                            <h3>{{item.hfxm}}</h3>
                            <span class="time">{{item.hfsj}}</span>
                            <div class="text">
                                <p><span class="font-skin">回复:</span>{{item.hf}}</p>
                            </div>
                        </div>
                        <p v-else><span class="font-skin">暂未回复</span></p>
                    </div>
                </div>
            </li>
        </template>
        <template v-else>
            <li class="board-list text-center yd-bg">
                <p class="font-skin">未搜索到相关回复</p>
            </li>
        </template>
    </ul>
</template>

<script>
    export default {
        name:"message-board-list",
        props:{
            messageList:{
                default:[]
            }
        }
    }
</script>

<style scoped lang="less">
    .message-board-ul {
        .board-list {
            margin-bottom: 8px;
            padding: 16px;
            .board-user {
                float: left;
                width: 40px;
            }
            .board-content {
                float: right;
                width: calc(100% - 50px);
                position: relative;
                top: -2px;
                .one-content {

                }
                .two-content {
                    background: rgba(243, 245, 247, 1);
                    border-radius: 4px;
                    padding: 10px 16px;
                    margin-top: 8px;
                    /*margin-left: -50px;*/
                }
                .text {
                    margin-top: 8px;
                }
                h3 {
                    font-size: 16px;
                    color: #333;
                    margin-bottom: 4px;
                }
                .time {
                    font-size: 14px;
                    color: #CCCCCC;
                }
                p {
                    font-size: 14px;
                    color: #333;
                    span {
                        margin-right: 6px;
                    }
                }
            }
        }
    }
</style>
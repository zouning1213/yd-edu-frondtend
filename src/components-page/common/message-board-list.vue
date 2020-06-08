<template>
    <!--留言列表-->
    <div>
        <el-row class="wrap-message" v-for="(item,index) in messagedata" :key="index">
            <div class="message-tou-wrap">
                <div class="message-tou-type">
                    <yd-author v-if="item.nm==1" width="40" name="匿名"></yd-author>
                    <yd-author v-else width="40" :name="item.createrName"></yd-author>
                </div>
            </div>
            <div class="content-message">
                <div class="put-questions">
                    <!-- <h2>{{item.createUser}}</h2> -->
                    <h3>{{item.nm==1?"匿名":item.createrName}}</h3>
                    <p>提问日期：{{item.createTime}}</p>
                    <h2>{{item.lyxx}}</h2>
                </div>
                <div class="respond-message" @click="respondMessage(item)">
                    <div v-if="item.hf">
                        <div>
                            <!-- <img src="../common/img/user.png" alt="">-->
                            <img :src="item.hftx" alt="">
                            <div class="put-questions">
                                <h2>{{item.hfxm}}</h2>
                                <p>{{item.hfsj}}</p>
                            </div>
                        </div>
                        <span class="respond-message-span font-skin">回复:</span>
                        {{item.hf}}
                    </div>
                    <span v-if="!item.hf" class="respond-message-span font-skin">
                        暂未回复 <span v-if="isjiaowu" style="cursor: pointer;">点击回复</span></span>
                </div>
                <el-button v-if="isjiaowu" class="delliuyan del-btn" @click="delely(item)" type="text" size="small">
                    <i class="el-icon-delete"></i> 删除
                </el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:"article-detail",
        props:['messagedata','isjiaowu'],
        data() {
            return {}
        },
        methods:{
            respondMessage(item) {
                if (item.hf == '') {
                    // console.log("子组件未回复的")
                    // console.log(item)
                    this.$emit("responsdMessage",item.lyh);
                }
            },
            delely(item) {
                this.$emit("delMessage",item.lyh);
            }
        }
    }
</script>

<style>

</style>
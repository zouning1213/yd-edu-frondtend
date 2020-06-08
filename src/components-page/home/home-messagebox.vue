<template>
    <div>
        <div class="home-header clearfix">
            <div class="title-icon">
                <i class="yd el-icon-chat-dot-round fl icon-skin"></i>
                <h3 class="fl">留言板</h3>
                <router-link :to="{name:$props.who=='ls'?'teacher_message_board':'students_message_board'}">
                    <i class="el-icon-more fr"></i>
                </router-link>
            </div>
        </div>
        <div class="home-content">
            <el-scrollbar wrap-class="list"
                          v-infinite-scroll="load"
                          infinite-scroll-disabled="disabled"
                          infinite-scroll-distance="0"
                          wrap-style="margin-right:-38px;overflow-x: hidden;"
                          view-style="font-weight: bold;"
                          view-class="view-box" :native="false">

                <div v-for="(item,index) in tableData" :key="index" class="list-item">
                    <div class="list-allmessage">
                        <div class="list-tx fl">
                            <yd-author :name="item.xm" width="40"></yd-author>
                        </div>
                        <div class="pr-10">
                            <div><span>{{item.xm}}</span><span class="fr text-999">{{item.createTime}}</span></div>
                            <span class="line-2 text-999">{{item.lyxx}}</span>
                        </div>
                    </div>
                </div>
                <p v-if="loading" class="loading-tip">加载中...</p>
                <p v-if="noMore" class="loading-tip">没有更多了</p>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
    export default {
        name:'home-Messagebox',
        props:["who"],
        data() {
            return {
                tableData:[],
                loading:false,
                count:1,
                allcount:''
            }
        },
        created() {
            this.getTableData()
        },
        methods:{
            getTableData() {
                //获取留言板信息
                this.$GET('/message/list',{limit:6,page:this.count}).then((res) => {
                    // console.log("留言板完成")
                    this.allcount = res.count
                    this.tableData = this.tableData.concat(res.data) 
                    // console.log(this.tableData)
                })
            },
            load() {
                this.loading = true
                setTimeout(() => {
                    this.count += 1
                    this.getTableData()
                    this.loading = false
                },1000)
            }
        },
        computed:{
            noMore() {
                // console.log('noMore')
                // console.log(this.tableData.length + '-------' + this.allcount)
                return this.tableData.length >= this.allcount
            },
            disabled() {
                return this.loading || this.noMore
            }
        },
    }
</script>

<style lang="">

</style>
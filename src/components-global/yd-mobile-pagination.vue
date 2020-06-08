<template>
    <!--分页组件 必需传的参数 地址:url--->

    <div class="yd-mobile-page">
        <van-pagination
                v-model="current"
                @change="handleCurrentChange"
                :total-items="pagination.total"
                :items-per-page="pagination.pageSize"/>
    </div>
</template>

<script>
    export default {
        name:"yd-pagination",
        props:{
            url:{
                default:"#"
            },
            params:{
                default:() => {
                }
            },
            mode:{
                default:"get"
            },
            ispageSize:{
                default:10
            }
            // resetParams:false,
        },
        data() {
            return {
                pagination:{
                    pageSize:this.ispageSize, // 每页显示记录数
                    total:0// 总条数
                },
                current:1, //当前第几页
                getParams:{ //  获取参数
                    page:1,
                    limit:10
                },
                isReset:false
            }
        },
        created() {
            /*   this.current = this.currentPage
               console.log(this.currentPage)*/
            this.getData();
        },
        methods:{
            handleCurrentChange(val,bol) { //点击分页时
                this.getParams.page = val;
                this.isReset = bol;
                this.getData();
            },
            getData(page) {
                if (page) {  //刷新或搜索数据的时候传递页数进来
                    this.getParams.page = 1;
                    this.current = 1
                }
                let self = this;
                if (this.url !== "#" && this.mode === "get") {
                    // for (const key in this.params) {
                    //     this.getParams[key] = this.params[key];
                    // }
                    Object.assign(this.getParams,this.params);
                    this.$GET(this.url,this.getParams).then(response => {
                        if (response.code == 0 || 200) {
                            //总条数
                            this.pagination.total = parseInt(response.count);

                            if (response.data) {
                                self.$emit("changePage",response.data);
                            }
                        }
                    });
                }
                else {
                    for (const key in this.params) {
                        this.getParams.params[key] = this.params[key];
                    }
                    this.$POST(this.url,this.getParams.params).then(response => {
                        if (response.data.code == 0 || 200) {
                            //总条数
                            this.pagination.total = parseInt(response.total);
                            if (response.data) {
                                self.$emit("changePage",response.data);
                            }
                        }
                    });
                }
            },
            searchData(page) { //刷新或搜索数据的时候传递页数进来
                this.getParams.page = 1;
                this.current = 1
                this.getData()
            }
        },
    }
</script>

<style lang="less">
    .yd-mobile-page {
        padding: 10px 10px;
        /*text-align: center;*/
    }
</style>
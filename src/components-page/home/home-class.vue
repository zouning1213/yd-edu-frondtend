<template>
    <!-- 班级管理 -->
    <div>
        <div class="home-header clearfix">
            <div class="title-icon">
                <i class="yd icon-classroom fl icon-skin"></i>
                <h3 class="fl">班级管理</h3>
            </div>
            <router-link :to="{name:''}">
                <i class="el-icon-more fr"></i>
            </router-link>
        </div>
        <div class="home-content home-class-content">
            <el-row>
                <el-col :span="8">
                    <div class="icon-yuan color-blue">
                        <i class="yd icon-damage"></i>
                    </div>
                    <h4>{{tableData.sh.length}}</h4>
                    <h4><span class="mr-20">损坏教室</span></h4>
                </el-col>
                <el-col :span="8">
                    <div class="icon-yuan color-green">
                        <i class="yd icon-normal "></i>
                    </div>
                    <h4>{{tableData.zc.length}}</h4>
                    <h4><span class="mr-20">正常教室</span></h4>
                </el-col>
                <el-col :span="8">
                    <div class="icon-yuan color-orange">
                        <i class="yd icon-maintain"></i>
                    </div>
                    <h4>{{tableData.bx.length}}</h4>
                    <h4><span class="mr-20">报修教室</span></h4>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name:'home-manage-class',
        props:["who"],
        data() {
            return {
                tableData:{
                    sh:'',
                    zc:'',
                    bx:''
                }
            }
        },
        created() {
            this.$GET('/classRoom/classRoomStatus').then((res) => {
                this.tableData = res.data
                // console.log(this.tableData)
            })
        }
    }
</script>

<style lang="less" scoped>
    .home-class-content{
        .el-row {
            margin-top: 50px;
            .el-col {
                min-width: 187px;
                // margin-bottom: 20px;
                margin: 20px 0;
                border-right: 1px solid rgba(233, 237, 247, 1);
                &:last-child{
                    border-right: none;
                }
                h4 {
                    font-size: 24px;
                    line-height: 30px;
                    font-weight: 700;
                    span {
                        font-size: 20px;
                        color: rgba(153, 153, 153, 1);
                    }
                }
            }
            .icon-yuan {
                float: left;
                margin-right: 20px;
                margin-left: 20px;
                display: inline-block;
                text-align: center;
                width: 69px;
                height: 69px;
                border-radius: 50%;
                // background-color: rgb(93, 172, 255);
                i {
                    color: #fff;
                    font-size: 42px;
                    margin-right: 0;
                    line-height: 69px;
                }
            }
            .color-blue {
                background-color: #467BEFFF;
            }
            .color-green {
                background-color: #70D12CFF;
            }
            .color-orange {
                background-color: #FDAA30FF;
            }
            .mr-20 {
                margin-right: 20px;
            }
        }
    }
</style>
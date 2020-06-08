<template>
    <!--人才培养计划列表-->
    <div>
        <div class="talent-list" v-for="(item,index) in talentList" :key="index">
            <router-link :to="{name:'talent_list_detail',params:{id:item.jhh}}" class="yd-bg">
                <div class="talent-title"><h3><i class="yd icon-file-o font-skin"></i>{{item.bt}}</h3></div>
                <div class="talent-content">
                    <p>专业: {{item.zyh}}</p>
                    <p>代码: {{item.jhh}}</p>
                </div>
                <el-row class="talent-time">
                    <el-col :span="20"><p><i class="el-icon-time"></i>发布时间: {{item.fbsj | cutOutDate}}</p></el-col>
                    <el-col :span="4" class="text-right"><p>已过期</p></el-col>
                </el-row>
            </router-link>
        </div>

    </div>
</template>

<script>
    export default {
        name:"talent-plan",
        props:['talentList'],
        data() {
            return {
            }
        },
        created() {
            // console.log(this.talentList)
        }
    }
</script>

<style scoped lang="less">
    .talent-list {
        width: 25%;
        padding-right: 20px;
        margin-bottom: 20px;
        float: left;
        a {
            display: block;
            height: 100%;
            border: 1px solid #fff;
            -webkit-transition: all 0.4s;
            -moz-transition: all 0.4s;
            -ms-transition: all 0.4s;
            -o-transition: all 0.4s;
            transition: all 0.4s;
            &:hover {
                border: 1px solid rgba(255, 255, 255, 1);
                -webkit-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                -moz-box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                box-shadow: 0px 3px 7px 0px rgba(111, 111, 111, 0.26);
                -webkit-transform: translateY(-10px);
                -moz-transform: translateY(-10px);
                -ms-transform: translateY(-10px);
                -o-transform: translateY(-10px);
                transform: translateY(-10px);
            }
        }
        .talent-title, .talent-content, .talent-time {
            padding: 16px 24px;
        }
        .talent-title {
            border-bottom: 1px solid #EDF0F6;
            h3 {
                font-size: 16px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                i {
                    font-size: 18px;
                    margin-right: 8px;
                }
            }
            img {
                height: 16px;
                position: relative;
                top: -2px;
            }
        }
        .talent-content, .talent-time {
            p {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        .talent-content {
            p {
                font-size: 14px;
                color: #333;
                line-height: 24px;
                &:first-child {
                    margin-bottom: 10px;
                }
            }
        }
        .talent-time {
            p {
                font-size: 12px;
                color: #ccc;
                &.ongoing {
                    color: #EB5870;
                }
            }
            i {
                vertical-align: text-bottom;
                font-size: 16px;
                margin-right: 4px;
            }
        }
    }
</style>
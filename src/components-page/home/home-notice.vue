<template>
    <div class="isnotices">
        <div class="home-header clearfix ">
            <div class="title-icon">
                <!-- <i class="yd icon-sign fl icon-skin"></i>  -->
                <h3 class="fl">通知公告</h3>
                <!-- <router-link :to="{path:'/teacher/search/article'}"> -->
                <router-link :to="{path:$props.who=='ls'?'/teacher/search/article':'/students/search/article'}">
                    <i class="yd icon-19 fr"></i>
                </router-link>
            </div>
        </div>
        <div :class="['home-content', 'notice-content',
        $props.who == 'jw' ? 'height-360' : 'height-297']">
            <ul>
                <li v-for="(item,index) in tableData" :key="index" class="active-list">
                    <router-link class="hover-skin" :to="{name: 'article_list_detail',params:{id:item.noticeId}}">
                        <img class="icon" src="./img/home-tzgg@2x.png" alt="">
                        <p class="line-1 ">{{item.title}}</p>
                        <div class="date">
                            <span>{{item.createTime|cutDate}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home-Notice',
        props: ['who'],
        data () {
            return {
                tableData: []
            }
        },
        created () {
            this.$GET('/notice/list', {
                limit: this.who == 'jw' ? 7 : 6,
                page: 1,
                px: 'desc',
                isOpen: 'N'
            }).then((res) => {
                this.tableData = res.data
            })
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
    .notice-content {
        ul {
            padding-bottom: 10px;

            li {
                border-bottom: 1px solid #F3F5FB;
                position: relative;
                &:last-child {
                    border-bottom: none;
                }
                .icon{
                    width: 17px;
                    height: 14px;
                    position: absolute;
                    left: 5px;
                    top: 16px;
                }
                .date{
                    position: absolute;
                    right: 12px;
                    top: 15px;
                }
                a {
                    padding: 14px 16px 14px 36px;
                    display: block;
                    &:hover {
                        background-color: #F5F5F7;
                    }
                    p{
                        font-size: 14px;
                        color: #333;
                    }
                }
            }
        }
    }
</style>
<template>
    <!--没有内容提示为空-->
    <div class="yd-content-tip yd-bg" :style="{'minHeight':minHeight + 'px','paddingTop':paddingTop+'px'}">
        <img :src="src"/>
        <h3>{{title}}</h3>
        <router-link :to="{name:toName}">
            <el-button type="primary" round>{{button}}</el-button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name:"no-content-tip",
        props:['title','src','toName','button'],
        props:{
            title:{
                default:'暂无数据'
            },
            toName:{
                default:'#'
            },
            button:{
                default:'暂无操作'
            },
            src:{
                default:require('@/assets/no-tip-img/no-content.png')
            }
        },
        data() {
            return {
                minHeight:'',
                paddingTop:''
            }
        },
        mounted() {
            const documentHeight = document.documentElement.clientHeight || document.body.clientHeight
            const headHeight = document.querySelector('.yd-header').clientHeight || 60
            const titleHeight = document.querySelector('.yd-router-title ').clientHeight || 64
            this.minHeight = documentHeight - headHeight - titleHeight - 60 //  80  title的 maigin 值  20 内下边距
            this.paddingTop = this.minHeight / 4
        }
    }
</script>

<style scoped lang="less">
    .yd-content-tip {
        text-align: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        img {
            width: 110px;
            margin-bottom: 30px;
        }
        h3 {
            font-size: 20px;
            color: #333;
            margin-bottom: 30px;
        }
    }
</style>
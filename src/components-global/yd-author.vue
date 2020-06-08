<template>
    <!--定义头像 传递姓名过来即可-->
    <label :style="{'width':width+'px','height':width+'px','line-height':width+'px'}"
           class="yd-author-span bg-skin">{{newName}}</label>
</template>

<script>
    export default {
        name:"yd-author",
        props:{
            name:{
                default:'无名'
            },
            width:{
                default:32
            }
        },
        data() {
            return {
                newName:''
            }
        },
        created() {
            if (this.name.length >= 3) {
                this.newName = this.name.substring(1,3)
            } else {
                this.newName = this.name
            }
        },
        methods:{}
    }
</script>

<style scoped lang="less">
    .yd-author-span {
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;
        color: #fff;
        position: relative;
        top: -1px;
        font-size: 12px;
        line-height: 32px;
        text-align: center;
    }
</style>
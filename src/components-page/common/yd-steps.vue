<template>
    <div class="yd-common-steps">
        <ul>
            <slot>

            </slot>
        </ul>
    </div>
</template>

<script>
    /*    var stepList = {
            props:{
                title:{
                    default:''
                }
            },
            data:function () {
                return {
                    test:"就爱光王八岛"
                }
            },
            template:'<div>{{title}}{{test}}</div>',
        }*/
    export default {
        name:"yd-steps",
        /*   components:{
               'yd-step':stepList
           },*/
        props:['active'],
        data() {
            return {
                active:1
            }
        }
    }
</script>

<style scoped lang="less">

</style>
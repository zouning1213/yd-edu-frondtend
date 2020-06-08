<template>
    <!--学校惩罚-->
    <div>
        <div v-for="(item,index) in form" :key="index" class="mobile-changes-list">
            <van-cell-group>
                <van-field
                        v-model="item.ccmc"
                        type="text"
                        label="惩处名称"
                        :disabled="is_edit"/>
                <van-field
                        v-model="item.ccyybm"
                        type="text"
                        label="惩处原因"
                        :disabled="is_edit"/>
                <van-field
                        v-model="item.ccnr"
                        type="text"
                        label="惩处内容"
                        :disabled="is_edit"/>
                <van-field
                        v-model="item.ccwh"
                        type="text"
                        label="惩处文号"
                        :disabled="is_edit"/>
                <van-field
                        v-model="item.ccrq"
                        type="text"
                        label="惩处日期"
                        :disabled="is_edit"/>
                <van-field
                        v-model="item.cccxrq"
                        type="text"
                        label="惩处撤销日期"
                        :disabled="is_edit"/>
                <van-field
                        v-model="item.cccxyybm"
                        type="text"
                        label="惩处撤销原因"
                        :disabled="is_edit"/>
                <van-field
                        v-model="item.cccxwh"
                        type="text"
                        label="惩处撤销文号"
                        :disabled="is_edit"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name:"school-reward",
        props:["form"],
        data() {
            return {
                is_edit:false,
                /*    form:[
                        {
                            ccmc:"测试",
                            hjfsbm:"测试",
                            sprq:"测试",
                            spwh:"测试",
                            ydly:"测试",
                            ydqx:"测试",
                            ydsm:"测试"
                        },
                    ]*/
            }
        },
        methods:{}
    }
</script>

<style scoped lang="less">
    .mobile-changes-list {
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        margin-bottom: 10px;
        overflow: hidden;
    }
</style>
<template>
    <!--学校奖励获奖的的-->
    <div>
        <div v-for="(item,index) in form" :key="index" class="mobile-changes-list">
            <van-cell-group>
                <van-field
                        v-model="item.hjxm"
                        type="text"
                        label="获奖项目"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.hjfsbm"
                        type="text"
                        label="获奖方式"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.hjmc"
                        type="text"
                        label="获奖名称"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.bjrq"
                        type="text"
                        label="颁奖日期"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.hjjbm"
                        type="text"
                        label="获奖级别码"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.hryrq"
                        type="text"
                        label="获荣誉日期"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.bjdw"
                        type="text"
                        label="颁奖单位"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.rychm"
                        type="text"
                        label="获荣誉号码"
                        :disabled="is_edit"
                />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name:"school-punish",
        props:["form"],
        data() {
            return {
                is_edit:false,
            /*    form:[
                    {
                        hjxm:"测试",
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
        methods:{},
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
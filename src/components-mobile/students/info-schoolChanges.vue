<template>
    <!--学籍异动-->
    <div>
        <div v-for="(item,index) in form" :key="index" class="mobile-changes-list">
            <van-cell-group>
                <van-field
                        v-model="item.ydrq"
                        type="text"
                        label="异动日期"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.ydyy"
                        type="text"
                        label="异动原因"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.sprq"
                        type="text"
                        label="审批日期"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.spwh"
                        type="text"
                        label="审批公文"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.ydly"
                        type="text"
                        label="异动来源"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.ydqx"
                        type="text"
                        label="异动去向"
                        :disabled="is_edit"
                />
                <van-field
                        v-model="item.ydsm"
                        type="text"
                        label="异动说明"
                        :disabled="is_edit"
                />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    export default {
        name:"school-changes",
        props:["form"],
        data() {
            return {
                is_edit:false,
            }
        },
        created() {

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
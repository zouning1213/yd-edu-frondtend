<template>
    <div>
        <!--开始排课-->
        <div v-if="active == 1" class="setting-arranging-start">
            <div class="banner">
                <img src="../img/start.png"/>
            </div>
            <p>若课程表规则设置好 请开始进行排课操作</p>
            <el-button type="primary" @click="submitForm">开始排课</el-button>
        </div>
        <!--排课中-->
        <div v-else class="setting-arranging-start">
            <div class="banner">
                <img src="../img/ongoing.png"/>
            </div>
            <p>正在排课 请稍后</p>
            <el-button type="primary">排课中</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name:"arranging-start",
        data() {
            return {
                active:1,
                planid:this.$route.params.planid,
            }
        },
        created() {

        },
        methods:{
            submitForm() {
                this.active = 2
                this.$GET('/timesheetTask/planAutoArrangement',{planid:this.planid}).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'排课成功'
                        })
                        this.$emit('success')
                        this.active = 1
                    } else {
                        this.$message.error(res.message)
                        setTimeout(() => {
                            this.active = 1
                        },500)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>
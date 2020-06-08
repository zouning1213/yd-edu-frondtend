<template>
    <!--人才培养计划列表--> 
                
        <div class="list"  style="width:100%;height:auto"> 
            <div class="list-wrap" v-for="(item,index) in talentList" :key="index">
                <router-link :to="{name:'talent_list_detail',params:{id:item.jhh}}" class="yd-bg">
                    <div class="wrap-list">
                        <div class="list-content">
                            <h2>{{item.bt}}<a href="#" class="fr"><i class="el-icon-more"></i></a></h2>
                            <div class="color-999">
                                <h4>专业: {{item.zymc}} </h4>
                                <h4>代码: {{item.jhh}} </h4>
                                <h4><span class="yd icon-time"></span> {{item.fbsj}} </h4> 
                            </div>
                            
                        </div>  
                    </div> 
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
        } 
    }
</script>

<style scoped lang="less">
  
</style>
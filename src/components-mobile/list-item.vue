<template>
    <div> 
        <div class="list-wrap" v-for="(item,index) in tableData" :key="index">
            <div class="wrap-list">
                <div class="list-content">
                    <h2>计算机系统与网络安全技术<a href="#" class="fr">详情</a></h2>
                    <h4>2019.6.20  09:00~11:30     上午</h4>
                    <div><span class="yd icon-didian"></span>3号教学楼1502</div>
                </div>  
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        name:"test",
        props:{
            tableData:{
                default:[]
                }
        },
        data() { 
        } 
    }
</script>

<style scoped  lang="less">  
.list-wrap{
    width: 100%;
    margin-bottom: 20px;
    .wrap-list{
        padding: 20px;
        width: 100%;
        background: #fff ;
        .list-content{ 
            clear: both;
            h2{
                font-size: 31px
            }
            h4{
                font-size: 21px;
                padding: 10px 0;
            }
            >div{
                font-size: 21px;
                color: #ccc;
            }
        }
        
    }
}
</style>
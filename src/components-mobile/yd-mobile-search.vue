<template>
<!--手机端搜索组件 根据什么查询, --> 
        <div class="search-wrap">
            <div class="search-content">
                <div class="search-header clearfix">
                    <div class="fl"><i class="el-icon-arrow-left"  @click="$router.go(-1)"></i>专业管理</div>
                    <div class="fr">
                        <input class="search-input" height="48px"  placeholder="请输入内容" @focus="showall=true"  @keyup.13="" type="serch"> 
                        <span class="searchicon"><i class="el-icon-search"></i></span>
                        <span class="cancle fr" @click="showall=false">取消</span>
                    </div>
                </div>
                <div class="search-content-in" v-if="showall"> 
                    <div class="search-center">
                        <el-tabs v-model="activeName" @tab-click="handleClick"   >
                            <el-tab-pane  name="0"> 
                                <span slot="label"> 建班时间 <i :class="activeName==0?'el-icon-caret-bottom':'el-icon-caret-top'"></i></span>
                                <div :class="{'searchlist-item-wrap':true,'activeColor':activeJbsj==item.id}" v-for="(item,index) in jbsjOptions" :key="index" @click="selectjbsj(item.id)">  
                                    <span>{{item.name}}</span>
                                    <i class="el-icon-check fr"></i>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="配置管理" name="1">配置管理</el-tab-pane> 
                        </el-tabs>
                    </div>
                    <div class="search-footer">
                        <button class="Reset">重置</button>
                        <button class="sure bg-skin">确定</button>
                    </div>
                </div>
            </div>
        </div> 
</template>

<script>
    export default {
        name:"yd-mobile-search", 
        data() { 
            return{
                showall:false,
                activeName: '0' ,
                activeJbsj:'',
                jbsjOptions:[
                    {
                        id:'1',
                        name:'19年',
                    },
                    {
                        id:'2',
                        name:'19年2',
                    },
                    {
                        id:'3',
                        name:'19年3',
                    },
                    {
                        id:'4',
                        name:'111119年4',
                    },
                    {
                        id:'5',
                        name:'1111119年5',
                    },
                    {
                        id:'6',
                        name:'19年6',
                    }
                ]
            }
        },
        methods:{ 
            selectjbsj(id){
                this.activeJbsj = id
            },
            handleClick(tab, event) {
                // console.log(tab, event);
            }
        } 
    }
</script>

<style scoped  lang="less">  
// .search-wrap{
//     // position: absolute;
//     width: 100%;
//     // z-index: 999;
//     // top: 0;
//     // left: 0;
//     // bottom: 0;
//     // right: 0;
//     // background-color: #929394; 
//     .search-content{
//         background-color: #fff;
//         font-size: 34px;
//         .search-header{
//             padding: 30px;
//             border-bottom: 1px solid rgba(243,245,247,1);
//             >.fr{
//                 position: relative;
//             }
//             .cancle{
//                 font-size: 24px;
//                 line-height: 48px;
//                 margin-left: 30px;
//                 color: #ccc;
//             }
//             .search-input{
//                 position: relative;
//                 display: inline-block;
//                 padding: 10px 20px 10px 50px;
//                 width: 400px;
//                 height: 48px;
//                 background:rgba(243,245,247,1);
//                 border-radius:24px; 
//                 font-size: 24px;
//             }
//             .searchicon{
//                 display: inline-block;
//                 position: absolute;
//                 left: 18px;
//                 top: 10px;
//                 font-size: 24px;
//             }
//         }
//         .search-content-in{
//             position: relative;
//             bottom: 0;
//             background-color: #fff;
//         }
//         .search-center{
//             font-size: 28px;
//             padding: 0 30px 30px;
//             .searchlist-item-wrap{
//                 padding: 10px;
//                 border-bottom: 1px solid  rgba(243,245,247,1);
//                 .searchlist-item{
//                     display: inline-block;
//                     margin: 20px;
//                     padding: 17px 40px;
//                     background:rgba(243,245,247,1);
//                     border-radius:32px;
//                 }  
//             }  
//             .activeColor{
//                 // background-color: #E7EDFF;
//                 color: #3262EC
//             }
//         }
//         .search-footer{
//             button{
//                 float: left;
//                 width: 50%;
//                 height: 88px;
//                 font-size: 33px; 
//                 color: #fff;
//             }
//             .Reset{
//                 background-color: #F3F5F7;
//                 color: #000;
//                 border-bottom-left-radius: 20px;
//             }
//             .sure{
//                 border-bottom-right-radius: 20px;

//             }
//         }
//     } 
// } 
  
</style>
<style lang="less" >
.search-wrap{
  .el-tabs__nav-wrap::after{
        content: none
    }
    .el-tabs__active-bar{
        height: 0;
    }
}

</style>
<template>
    <!--教材分发-->
    <div>  
        <div class="yd-bg common-pd yd-common-table"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}"> 

            <div class="pointAll" @click="printData"> 
                 打印所有 
            </div>

            <div ref="print">
                <el-table border ref="multipleTable" :data="tableList" tooltip-effect="dark">
                    <el-table-column prop="" label="教材名称" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.jcmc}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="分发专业" align="center">
                        <template slot-scope="scope">
                            {{scope.row.zymc}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="分发班级" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.bjmc}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="班级总人数" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.rs}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="分发教材数量" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.ffsl}}</p>
                        </template>
                    </el-table-column> 
                </el-table>
            </div>

            <yd-page ref="ydPage" :url="'/textbookInfo/distrbuteList'"
                     :params="{bjid:$route.query.bh ,limit:9999}"
                     :ispageSize='9999'
                     @changePage="changePage"></yd-page> 
 
        </div> 
    </div>
</template>

<script> 

    export default { 
        name:"manage-teaching-sendFile",
        data() {
            return {  
                yxOptions:'', 
                params:{
                    zyh:'',
                    nj:'',
                    bh:'',
                    condition:''
                },
                bh:'',
                tableList:[],
                njOptions:[
                    {
                        nj:'1',
                        njm:'一年级'
                    },
                    {
                        nj:'2',
                        njm:'二年级'
                    },
                    {
                        nj:'3',
                        njm:'三年级'
                    }
                ],
                bhOptions:[],     //班级
                zyhOptions:[],
                zyhOptions1:[],
                jcIdOptions:[],    //教材名称 
            }
        }, 
        mounted(){
            this.bh = this.$route.query.bh  
        },
        methods:{  
            //分页数据
            changePage(res) { 
                this.tableList = res
            }, 
            //打印
            printData() {
                this.$print(this.$refs.print) // 使用
            },     
        },  
    }
</script>

<style lang='less' scoped>
.pointAll{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px; 
    line-height: 60px;
    border: 1px solid #ccc;
    text-align: center;
    cursor: pointer;
}
</style>
<template>
    <!--分数变量设置-->
    <div class="setting-common-pd setting-score"
         :style='{"minHeight":this.$store.state.minClientHeight-230+"px"}'>
        <el-form :model="ruleForm" ref="ruleForm" size="small" label-width="82px">
            <ul class="setting-ul">
                <li class="fl" style="width:50%" v-for="(item,index) in tableData" :key="index" >
                    <div>
                        <h3>{{item.blms}}：</h3>
                        <div class="score-content el-row">
                            <el-col :span='24'>
                                <!-- <p class="explain-1">{{item.blms}}</p> -->
                                <p class="explain">{{item.bz}}</p>
                                <div class="score-form">
                                    <el-form-item v-for="(item2,index2) in item.blsj" :key="index2"  label="分数区间：" class="el-row">
                                        <el-col :span="4">
                                            <el-input v-model="item2.first"></el-input>
                                        </el-col>
                                        <el-col :span="1" class="text-center">~</el-col>
                                        <el-col :span="4">
                                            <el-input v-model="item2.second"></el-input>
                                        </el-col>
                                        <el-col :span="4"><span class="unit"> (单位/分)</span></el-col>
                                    </el-form-item> 
                                </div>
                                <el-button type="text" size="small" @click="addOneItem(index)">
                                    <i class="yd icon-add-o"></i>新增加一个分数区间
                                </el-button>
                                <el-button type="text" size="small" @click="delOneItem(index)">
                                    <i class="yd icon-del-o"></i>删除最后一个分数区间
                                </el-button>
                                <div class="mt-20">
                                    <el-button size="small" type="info">取消</el-button>
                                    <el-button size="small" type="primary" @click="submit(item)">确定</el-button>
                                </div>
                            </el-col>
                        </div>
                    </div>
                </li>  
            </ul> 
        </el-form>
    </div>
</template>

<script>
    export default {
        name:"setting-score",
        data() {
            return {
                ruleForm:{},
                tableData:[], 
            }
        },
        created(){ 
            this.$GET("/systemVariable/queryByGn/CJCX",).then((res)=>{
                // console.log(this.tableData)
                let a =  res
                a = a.map((item,index)=>{
                    let isitem = item.blsj.split(",")
                    isitem = isitem.map((item,index)=>{ 
                        return {
                            first : item.split("-")[0],
                            second : item.split("-")[1]
                        }
                    }) 
                    item.blsj =  isitem 
                    return item
                })
                console.log(a)
                this.tableData = a 
            })
        },
        methods:{
            submit(item){ 
                // console.log(item)
                let data = {}
                for(var i in item){
                    data[i] = item[i]
                }
                let a  = data.blsj.map((item,index)=>{
                   return  item.first +"-"+ item.second
                }) 
                a = a.join(",")
                data.blsj =a  
                // console.log(data) 
                this.$POST("/systemVariable/update",data).then((res)=>{
                    if(res.code==200){
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
            //添加第一个
            addOneItem(index){
                this.tableData[index].blsj.push({
                    first:'',
                    second:""
                })
            },
            delOneItem(index){
                this.tableData[index].blsj.pop({
                    first:'',
                    second:""
                })
            },  
        }
    }
</script>

<style >
.yd-manage-setting .setting-score .setting-ul li::after{
    content: none
}
</style>
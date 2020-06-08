<template>
    <!--分数变量设置-->
    <div class="setting-common-pd setting-score"
         :style='{"minHeight":this.$store.state.minClientHeight-230+"px"}'>
        <el-form :model="ruleForm" ref="ruleForm" size="small" label-width="82px">
            <ul class="setting-ul">
                <li>
                    <h3>饼状分数段范围：</h3>
                    <div class="score-content el-row">
                        <el-col :span='10'>
                            <p class="explain-1">{{tableDataOne.blms}}</p>
                            <p class="explain">{{tableDataOne.bz}}</p>
                            <div class="score-form">
                                <el-form-item v-for="(item,index) in tableDataOneBlsj" :key="index"  label="分数区间：" class="el-row">
                                    <el-col :span="4">
                                        <el-input v-model="item.first"></el-input>
                                    </el-col>
                                    <el-col :span="1" class="text-center">~</el-col>
                                    <el-col :span="4">
                                        <el-input v-model="item.second"></el-input>
                                    </el-col>
                                    <el-col :span="4"><span class="unit"> (单位/分)</span></el-col>
                                </el-form-item>
                                <!-- <el-form-item label="分数区间：" class="el-row">
                                    <el-col :span="4">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-col>
                                    <el-col :span="1" class="text-center">~</el-col>
                                    <el-col :span="4">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-col>
                                    <el-col :span="4"><span class="unit"> (单位/分)</span></el-col>
                                </el-form-item> -->
                            </div>
                            <el-button type="text" size="small" @click="addOneItem">
                                <i class="yd icon-add-o"></i>新增加一个分数区间
                            </el-button>
                            <el-button type="text" size="small" @click="delOneItem">
                                <i class="yd icon-del-o"></i>删除最后一个分数区间
                            </el-button>
                            <div class="mt-20">
                                <el-button size="small" type="info">取消</el-button>
                                <el-button size="small" type="primary" @click="submitOne">确定</el-button>
                            </div>
                        </el-col>
                        <el-col :span='10' :offset="4">
                            <p class="explain-1">{{tableDataTwo.blms}}</p>
                            <p class="explain">{{tableDataTwo.bz}}</p>
                            <div class="score-form">
                                <el-form-item v-for="(item,index) in tableDataTwoBlsj" :key="index"  label="分数区间：" class="el-row">
                                    <el-col :span="4">
                                        <el-input v-model="item.first"></el-input>
                                    </el-col>
                                    <el-col :span="1" class="text-center">~</el-col>
                                    <el-col :span="4">
                                        <el-input v-model="item.second"></el-input>
                                    </el-col>
                                    <el-col :span="4"><span class="unit"> (单位/分)</span></el-col>
                                </el-form-item> 
                            </div>
                            <el-button type="text" size="small" @click="addTwoItem">
                                <i class="yd icon-add-o"></i>新增加一个分数区间
                            </el-button>
                            <div class="mt-20">
                                <el-button size="small" type="info">取消</el-button>
                                <el-button size="small" type="primary"  @click="submitTwo">确定</el-button>
                            </div>
                        </el-col>
                    </div>
                </li>
                <li>
                    <h3>折线图分数段范围：</h3>
                    <div class="score-content el-row">
                        <el-col :span='10'>
                            <p class="explain-1">{{tableDataThree.blms}}</p>
                            <p class="explain">{{tableDataThree.bz}}</p>
                            <div class="score-form">
                                <el-form-item v-for="(item,index) in tableDataThreeBlsj" :key="index"  label="分数区间：" class="el-row">
                                    <el-col :span="4">
                                        <el-input v-model="item.first"></el-input>
                                    </el-col>
                                    <el-col :span="1" class="text-center">~</el-col>
                                    <el-col :span="4">
                                        <el-input v-model="item.second"></el-input>
                                    </el-col>
                                    <el-col :span="4"><span class="unit"> (单位/分)</span></el-col>
                                </el-form-item> 
                            </div>
                            <el-button type="text" size="small" @click="addThreeItem">
                                <i class="yd icon-add-o"></i>新增加一个分数区间
                            </el-button>
                            <div class="mt-20">
                                <el-button size="small" type="info">取消</el-button>
                                <el-button size="small" type="primary"  @click="submitThree">确定</el-button>
                            </div>
                        </el-col>
                        <el-col :span='10' :offset="4">
                            <p class="explain-1">{{tableDataFour.blms}}</p>
                            <p class="explain">{{tableDataFour.bz}}</p>
                            <div class="score-form">
                                <el-form-item v-for="(item,index) in tableDataFourBlsj" :key="index" label="分数区间：" class="el-row">
                                    <el-col :span="4">
                                        <el-input v-model="item.first"></el-input>
                                    </el-col>
                                    <el-col :span="1" class="text-center">~</el-col>
                                    <el-col :span="4">
                                        <el-input v-model="item.second"></el-input>
                                    </el-col>
                                    <el-col :span="4"><span class="unit"> (单位/分)</span></el-col>
                                </el-form-item>
                                <!-- <el-form-item label="分数区间：" class="el-row">
                                    <el-col :span="4">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-col>
                                    <el-col :span="1" class="text-center">~</el-col>
                                    <el-col :span="4">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-col>
                                    <el-col :span="4"><span class="unit"> (单位/分)</span></el-col>
                                </el-form-item> -->
                            </div>
                            <el-button type="text" size="small" @click="addFourItem">
                                <i class="yd icon-add-o"></i>新增加一个分数区间
                            </el-button>
                            <div class="mt-20">
                                <el-button size="small" type="info">取消</el-button>
                                <el-button size="small" type="primary"  @click="submitFour">确定</el-button>
                            </div>
                        </el-col>
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

                tableDataOne:{},
                tableDataOneBlsj:[], 

                tableDataTwo:{},
                tableDataTwoBlsj:[], 

                tableDataThree:{},
                tableDataThreeBlsj:[], 

                tableDataFour:{},
                tableDataFourBlsj:[], 
            }
        },
        created(){ 
            this.$GET("/systemVariable/queryByGn/CJCX",).then((res)=>{
                this.tableData = res
                // console.log(this.tableData)

                this.tableDataOne = res[0]
                this.tableDataOneBlsj = res[0].blsj.split(",")
                // console.log(this.tableDataOneBlsj)  
                this.tableDataOneBlsj = this.tableDataOneBlsj.map((item,index)=>{ 
                    return {
                        first : item.split("-")[0],
                        second : item.split("-")[1]
                    }
                }) 
                // console.log(this.tableDataOneBlsj)  

                this.tableDataTwo = res[1]
                this.tableDataTwoBlsj = res[1].blsj.split(",")
                // console.log(this.tableDataTwoBlsj)  
                this.tableDataTwoBlsj = this.tableDataTwoBlsj.map((item,index)=>{ 
                    return {
                        first : item.split("-")[0],
                        second : item.split("-")[1]
                    }
                }) 
                
                this.tableDataThree = res[2]
                this.tableDataThreeBlsj = res[2].blsj.split(",")
                // console.log(this.tableDataThreeBlsj)  
                this.tableDataThreeBlsj = this.tableDataThreeBlsj.map((item,index)=>{ 
                    return {
                        first : item.split("-")[0],
                        second : item.split("-")[1]
                    }
                }) 

                this.tableDataFour = res[3]
                this.tableDataFourBlsj = res[3].blsj.split(",")
                // console.log(this.tableDataFourBlsj)  
                this.tableDataFourBlsj = this.tableDataFourBlsj.map((item,index)=>{ 
                    return {
                        first : item.split("-")[0],
                        second : item.split("-")[1]
                    }
                }) 
            })
        },
        methods:{
            submit(){ 
                this.$POST("/systemVariable/updateList",this.tableData,{
                                transformRequest:function (data) {
                                    return JSON.stringify(data);
                                },
                                headers:{'Content-Type':'application/json'}
                            }).then((res)=>{
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
            addOneItem(){
                this.tableDataOneBlsj.push({
                    first:'',
                    second:""
                })
            },
            //删除第一个
            delOneItem(){
                 this.tableDataOneBlsj.pop()
            },
            //提交第一个
            submitOne(){ 
                let oneBlsj = this.tableDataOneBlsj.map((item,index)=>{
                   return  item.first +"-"+ item.second
                }) 
                this.tableDataOne.blsj = oneBlsj.join(",")
                // console.log(this.tableDataOne) 
                this.$POST("/systemVariable/update",this.tableDataOne).then((res)=>{
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

            //添加第二个
            addTwoItem(){
                this.tableDataTwoBlsj.push({
                    first:'',
                    second:""
                })
            },
            //提交第二个
            submitTwo(){ 
                let TwoBlsj = this.tableDataTwoBlsj.map((item,index)=>{
                   return  item.first +"-"+ item.second
                }) 
                this.tableDataTwo.blsj = TwoBlsj.join(",")
                // console.log(this.tableDataTwo) 
                this.$POST("/systemVariable/update",this.tableDataTwo).then((res)=>{
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

            //添加第三个
            addThreeItem(){
                this.tableDataThreeBlsj.push({
                    first:'',
                    second:""
                })
            },
            //提交第三个
            submitThree(){ 
                let ThreeBlsj = this.tableDataThreeBlsj.map((item,index)=>{
                   return  item.first +"-"+ item.second
                }) 
                this.tableDataThree.blsj = ThreeBlsj.join(",")
                // console.log(this.tableDataThree) 
                this.$POST("/systemVariable/update",this.tableDataThree).then((res)=>{
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

            //添加第四个
            addFourItem(){
                this.tableDataFourBlsj.push({
                    first:'',
                    second:""
                })
            },
            //提交第四个
            submitFour(){ 
                let FourBlsj = this.tableDataFourBlsj.map((item,index)=>{
                   return  item.first +"-"+ item.second
                }) 
                this.tableDataFour.blsj = FourBlsj.join(",")
                // console.log(this.tableDataFour) 
                this.$POST("/systemVariable/update",this.tableDataFour).then((res)=>{
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



        }
    }
</script>

<style scoped>

</style>
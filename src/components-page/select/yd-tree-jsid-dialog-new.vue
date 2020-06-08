<template>
    <!--选择教师 目前控制的是单选 但是组件是支持多选的 -->
    <!--使用方法  ksid 教研组id(多个以字符串形式,自动填补k) 可传 可不传 checkedKsId方法 返回的是选中的id(字符串形式,并且截取掉k)
      <yd-select-zy-tree v-on:checkedJsId="checkedJsId" :jsid='jsid'></yd-select-zy-tree>
       -->
    <div class="tree-select-bzr-wrap">  
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="科室 :" >
                <el-select v-model="ksid" placeholder="请选择科室" @change="ksChange" style="width:100%">
                    <el-option
                    v-for="item in tableData"
                    :key="item.ksid"
                    :label="item.ksmc"
                    :value="item.ksid">
                    </el-option>
                </el-select> 
            </el-form-item>
        </el-form>
        <div class="select-wrap arranging-setting-color">
            <h3>选择班主任</h3>
            <div class="h-400">
                <el-checkbox-group v-model="checkList"  @change="bzrChange">
                    <div class="bzr-item" v-for="(item,index) in bzrData" :key="index">
                        <el-checkbox :label="item.jsid">
                            <span class="img-icon-zn img-icon-zn-out" v-show="item.jslx=='1'">外</span> 
                            <span class="img-icon-zn img-icon-zn-in" v-show="item.jslx=='0'">校</span> 
                            {{item.xm}}({{item.zymc}}) <span class="bzr-color" v-show="item.bjmcs"> 已任{{item.bjmcs}}班班主任</span>  
                        </el-checkbox>
                    </div> 
                </el-checkbox-group>
            </div> 
        </div>         
    </div>
</template>

<script>
    import './css/select-tree.less' 
    export default {
        props:{
            jsid:{
                default:'',
            },
        },
        name:"check-subject-zyh",
        data() {
            return { 
                tableData:[],
                form:{},
                ksid:'',
                bzrData:[],
                checkList:[]
            }
        },
        created() {
            this.getTableData(); 
            this.checkList.push(this.jsid)
        },
        methods:{
            getTableData() { 
                this.$GET("/departmentInfo/getksidByYxid").then((res)=>{
                    this.tableData = res.data
                    // this.ksid = res.data[0].ksid
                    this.ksChange()
                })
            },  
            submitTree() { 
                this.$emit('checkedJsId',this.checkList.join())
            },
            ksChange(){ 
                this.$GET("/teacherInfo/list",{limit:9999,page:1,ksids:this.ksid}).then((res)=>{
                    this.bzrData = res.data
                })
            },
            bzrChange(){
                if(this.checkList.length>1){
                    this.checkList.shift()
                }
                // console.log(this.checkList.join()) 
            }
        }
    }
</script>

<style lang="less">
.tree-select-bzr-wrap{
    .el-form-item{
        margin-bottom: 0;
    }
   .select-wrap{
       margin-left:30px;
       h3{
           font-weight:bold;
           color:rgba(51,51,51,1);
           line-height:60px;
       }
       .bzr-item{
           padding:0 0 15px 0;
       }
       .bzr-color{
           padding-left: 10px;
           color:#F35959;
       }
   } 
   .h-400{
       max-height: 400px;
       overflow-y: scroll;
   }
   .img-icon-zn-out{ 
        background-color: #F35959; 
   }
   .img-icon-zn-in{ 
        background-color: #3E7857;  
   }
   .img-icon-zn{
        display: inline-block;
        width: 16px;
        height: 16px; 
        border-radius: 3px;
        -webkit-border-radius: 3px;
        -o-border-radius: 3px;
        -moz-border-radius: 3px;
        text-align: center;
        font-size: 12px;
        color: #fff;
   }
}
</style>
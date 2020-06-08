<template>
    <!--教师工作亮信息--> 
        <div>    
            <div class="mobile-common-List " v-for="(item,index) in tableData" :key="index">
                <div class="common-list">
                    <div class="list-content"> 
                        <h4><span class="color-999 pr-20">教学类型码  </span> {{item.jxlxm}}</h4> 
                        <h4><span class="color-999 pr-20">教学内容  </span> {{item.jxnr}}</h4>
                        <h4><span class="color-999 pr-20">教学工作量  </span> {{item.jxgzl}}</h4> 
                        <h4><span class="color-999 pr-20">教学评语  </span> {{item.jxpy}}</h4> 
                        <h4><span class="color-999 pr-20">教学起始年月  </span> {{item.jxqsny}}</h4>  
                        <h4><span class="color-999 pr-20">教学终止年月  </span> {{item.jxzzny}}</h4>   
                    </div>  
                </div> 
            </div>
        </div>  
</template>

<script>
    export default {
        name:"teacher-workload-info",
        props:['workloadInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.workloadInfo
            }
        }, 
        methods:{
            //教师专业 信息提交
            submitEdit(){  
                let teacherWorkloads  = this.tableData 
                this.$POST("/teacherWorkload/batchSaveOrUpdate",teacherWorkloads , {
                    transformRequest: function(data) {
                    return JSON.stringify(data);
                    },
                    headers: { "Content-Type": "application/json" }
                }).then(res => {  
                    this.$message({
                    type: "success",
                    message: "修改成功!"
                    });  
                });
            },
            handleClick(row) {
                // console.log(row);
            }, 
            addExtendList() {
                this.tableData.push({
                    zgh:this.$props.teacherZgh,
                    jxlxm:'',
                    jxnr:'',
                    jxgzl:'' ,
                    jxpy:'' ,
                    jxqsny:'' ,
                    jxzzny:'', 
                })
            },
            //删除扩展信息一条
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        watch:{
                workloadInfo:function(newVal,oldVal){ 
                    this.tableData = newVal
                }, 
        }
    }
</script>

<style scoped>
.yd-jxgzl .el-date-editor.el-input{
        width: 153px;
    } 
</style>
<template>
    <!--教师任课信息--> 
    <div>    
        <div class="mobile-common-List " v-for="(item,index) in tableData" :key="index">
            <div class="common-list">
                <div class="list-content"> 
                    <h4><span class="color-999 pr-20">任课课程号  </span> {{item.kch}}</h4> 
                    <h4><span class="color-999 pr-20">任课课程类别  </span> {{item.rkkclb}}</h4>
                    <h4><span class="color-999 pr-20">任课起始年月  </span> {{item.rkqsny}}</h4> 
                    <h4><span class="color-999 pr-20">任课终止年月  </span> {{item.rkzzny}}</h4> 
                    <h4><span class="color-999 pr-20">任课总学时  </span> {{item.rkzxs}}</h4> 
                    <h4><span class="color-999 pr-20">任课学段码  </span> {{item.rkxdm}}</h4> 
                    <h4><span class="color-999 pr-20">任课角色码  </span> {{item.rkjsm}}</h4> 
                    <h4><span class="color-999 pr-20">授课班级  </span> {{item.skbj}}</h4> 
                    <h4><span class="color-999 pr-20">授课人数  </span> {{item.skrs}}</h4> 
                </div>  
            </div> 
        </div>
    </div>  
</template>

<script>
    export default {
        name:"teacher-classroom-info",
        props:['classroomInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.classroomInfo
            }
        }, 
        methods:{
            //教师专业 信息提交
            submitEdit(){   
                let teacherLessons = this.tableData 
                this.$POST("/teacherLesson/batchSaveOrUpdate",teacherLessons, {
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
                    kch:'',
                    rkkclb:'',
                    rkqsny:'' ,
                    rkzzny:'' ,  
                    rkzxs:'',  
                    rkxdm:'',  
                    rkjsm:'',  
                    skbj:'',  
                    skrs:'',  
                })
            },
            //删除扩展信息一条
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        watch:{
                classroomInfo:function(newVal,oldVal){ 
                    this.tableData = newVal
                }, 
        }
    }
</script>

<style scoped>
.yd-rkrq .el-date-editor.el-input{
        width: 100px;
    } 
</style>
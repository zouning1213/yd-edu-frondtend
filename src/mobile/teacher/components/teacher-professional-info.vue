<template>
    <!--教师专业技术-->  
        <div>    
            <div class="mobile-common-List " v-for="(item,index) in tableData" :key="index">
                <div class="common-list">
                    <div class="list-content"> 
                        <h4><span class="color-999 pr-20">任职资格名称  </span> {{item.rzzgmc}}</h4> 
                        <h4><span class="color-999 pr-20">获取资格途径  </span> {{item.qdzgtj}}</h4>
                        <h4><span class="color-999 pr-20">评审单位  </span> {{item.psdw}}</h4> 
                        <h4><span class="color-999 pr-20">评定日期  </span> {{item.pdrq}}</h4> 
                        <h4><span class="color-999 pr-20">聘任职务码  </span> {{item.przwm}}</h4>  
                        <h4><span class="color-999 pr-20">聘任单位  </span> {{item.prdw}}</h4>  
                        <h4><span class="color-999 pr-20">聘任情况码  </span> {{item.prqkm}}</h4>  
                        <h4><span class="color-999 pr-20">解聘日期  </span> {{item.jprq}}</h4>  
                        <h4><span class="color-999 pr-20">解聘原因  </span> {{item.jpyy}}</h4>  
                    </div>  
                </div> 
            </div>
        </div>   
</template>

<script>
    export default {
        name:"teacher-professional-info",
        props:['professionalInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.professionalInfo
            }
        }, 
        methods:{
            //教师专业 信息提交
            submitEdit(){  
                let teacherSkills = this.tableData 
                this.$POST("/teacherSkill/batchSaveOrUpdate",teacherSkills, {
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
                    rzzgmc:'',
                    qdzgtj:'',
                    psdw:'' ,
                    pdrq:'' ,
                    przwm:'' ,
                    prdw:'',
                    prqkm:'' ,
                    jprq:'' ,
                    jpyy:'' , 
                })
            },
            //删除扩展信息一条
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        watch:{
                professionalInfo:function(newVal,oldVal){ 
                    this.tableData = newVal
                }, 
        }
    }
</script>

<style>
.yd-zyjs .el-date-editor.el-input{
        width: 100px;
    } 
</style>
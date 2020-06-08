<template>
    <!--教师岗位证书-->  
    <div>    
        <div class="mobile-common-List " v-for="(item,index) in tableData" :key="index">
            <div class="common-list">
                <div class="list-content"> 
                    <h4><span class="color-999 pr-20">岗位证书名称  </span> {{item.gwzfmc}}</h4> 
                    <h4><span class="color-999 pr-20">颁发单位  </span> {{item.bfdw}}</h4>
                    <h4><span class="color-999 pr-20">颁发日期  </span> {{item.bfrq}}</h4> 
                </div>  
            </div> 
        </div>
    </div> 
</template>

<script>
    export default {
        name:"teacher-certificate-info",
        props:['certificateInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.certificateInfo
            }
        }, 
        methods:{
            //学籍异动提交
            submitEdit(){ 
                // console.log(this.tableData) 
                // console.log(this.teacherZgh)  
                let teacherCertificates  = this.tableData 
                this.$POST("/teacherCertificate/batchSaveOrUpdate",teacherCertificates, {
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
                    gwzfmc:'',
                    bfdw:'',
                    bfrq:'' 
                })
            },
            //删除扩展信息一条
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        watch:{
                certificateInfo:function(newVal,oldVal){ 
                    this.tableData = newVal
                }, 
        }
    }
</script>

<style lang="less">
.add-extend{
    width: 100%;
    height: 50px;
    background-color: #f3f5f7;
    cursor: pointer;
    line-height: 50px
}
.submit-btn{
    width: 100%;
    height: 50px; 
    cursor: pointer;
    line-height: 50px
}
.yd-gwzs{
    .el-date-editor.el-input{
        width: 202px;
    }

}
</style>
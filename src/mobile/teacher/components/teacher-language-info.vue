<template>
    <!--教师语言能力信息--> 
    <div>    
        <div class="mobile-common-List " v-for="(item,index) in tableData" :key="index">
            <div class="common-list">
                <div class="list-content"> 
                    <h4><span class="color-999 pr-20">外国语种码  </span> {{item.wgyzm}}</h4> 
                    <h4><span class="color-999 pr-20">外国语种熟练  </span> {{item.wgyzsl}}</h4>
                    <h4><span class="color-999 pr-20">中国语种码  </span> {{item.zgyzm}}</h4> 
                    <h4><span class="color-999 pr-20">中国语种熟练  </span> {{item.zgyzsl}}</h4> 
                    <h4><span class="color-999 pr-20">普通话水平等  </span> {{item.pthspd}}</h4>  
                </div>  
            </div> 
        </div>
    </div>  
</template>

<script>
    export default {
        name:"teacher-language-info",
        props:['languageInfo','is_edit','teacherZgh'],
        data() {
            return {
                tableData:this.languageInfo
            }
        }, 
        methods:{
            //教师专业 信息提交
            submitEdit(){   
                let teacherLanguages  = this.tableData 
                this.$POST("/teacherLanguage/batchSaveOrUpdate",teacherLanguages , {
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
                    wgyzm:'',
                    wgyzsl:'',
                    zgyzm:'' ,
                    zgyzsl:'' ,
                    pthspd:''  
                })
            },
            //删除扩展信息一条
            deleteRow(index, rows) {
                rows.splice(index, 1);
            }
        },
        watch:{
                languageInfo:function(newVal,oldVal){ 
                    this.tableData = newVal
                }, 
        }
    }
</script>

<style scoped>

</style>
<template>
    <!--教师信息-->
    <div class="arranging-course-five pr">
        <el-table
                :data="tableData"
                :header-cell-style="{background:'rgba(243,245,247,1)'}"
                border
                :max-height="(this.$store.state.minClientHeight-205) + 'px'"
                style="width: 100%">
            <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="80">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="ksmc"
                    label="科室名称"
                    :filters="ksOptions"
                    :filter-method="filterTag">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="xm"
                    label="教职名称">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="zgh"
                    label="教职工号">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name:"arranging-course-five",
        props:['year'],
        data() {
            return {
                tableData:[],
                ksOptions:[]
            }
        },
        created() {
            //教师列表
            this.$GET('/timesheetTask/listTeacherInfo/' + this.year).then((res) => {
                this.tableData = res.data;
                let ksmc = []
                    res.data.forEach((item,index)=>{
                        ksmc.push({
                            text : item.ksmc,
                            value : item.ksmc
                        })  
                    }) 
                this.ksOptions = this.unique(ksmc)
            })
        },
        methods:{
            //发送给父组件
            sendFrom() {
                this.$emit('receiveCourseFive',this.tableData)
            },
            filterTag(value, row) {
                return row.ksmc === value;
            },
            //深度去重
            unique(a){
                var arr = [];
                    for(var i = 0; i < a.length; i++){
                        if(i == 0) arr.push(a[i]);
                        var b = false;
                        if(arr.length > 0 && i > 0){
                            for(var j = 0; j < arr.length; j++){
                                if(arr[j].value == a[i].value){
                                    b = true;
                                //break;
                                }
                            }
                            if(!b){ arr.push(a[i]);}
                        }
                    }  
                return arr
            },
        },
    }
</script>

<style>

</style>

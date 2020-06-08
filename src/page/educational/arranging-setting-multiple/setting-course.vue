<template>
    <!--连堂设置-->
    <div class="setting-common-table">
        <div class="setting-title el-row">
            <!-- <el-col :span="16"><h3>展示为当前默认值</h3></el-col>
            <el-col :span="8">
                <el-input placeholder="请输入教师名称搜索" size="small" v-model="condition">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col> -->
        </div>
        <div class="yd-common-table">
            <el-table
                    :data="tableData"
                    row-key="id"
                    border
                    refs="refTable"
                    :expand-row-keys="expandKey"
                    :span-method="arraySpanMethod"
                    @row-click="expandChange"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                        prop="label"
                        label="课程教研组"
                        width="280"
                        align="left">
                    <!--   <template slot-scope="scope">
                           <span style="padding-left: 10px">{{scope.row.date}}</span>
                       </template>-->
                </el-table-column>
                <el-table-column
                        prop="noun"
                        label="一天最长连上节数值"
                        align="center">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.noun" @change="changeNoun(scope.row)">
                            <el-radio v-for="(item,index) in courseOption" :key="index"
                                      :label="item.code">{{item.name}}
                            </el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name:"setting-course",
        data() {
            return {
                condition:'',
                tableData:[],
                expandKey:[],//默认展开数组
                courseOption:[]
            }
        },
        created() {
            this.$POST('/system/dictList/CONLESSON').then(res => {
                this.courseOption = res
            })

            this.$GET('/timesheetRestrict/allConLesson').then(res => {
                this.tableData = res
            })
        },
        methods:{
            changeNoun(row) {
                let params = {
                    id:row.value,
                    jc:row.noun,
                    pkjhid:0,
                    type:'lesson'
                }
                this.$GET('/timesheetRestrict/setConLesson',params).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type:'success',
                            message:'设置成功'
                        })
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            //跨行
            arraySpanMethod({row,column,rowIndex,columnIndex}) {
                if (row.id.substring(0,2) == 'ks') {
                    if (columnIndex === 0) { //只针对第一个td跨行
                        return [1,2];
                    } else {
                        return [0,0];
                    }
                }
            },
            //点击一行折叠
            expandChange(row,column,event) {
                /* console.log(row)
                 console.log(column)
                 console.log(event)*/
                if (row.children) {
                    console.log(row.id)
                    console.log(this.expandKey)
                    if (this.expandKey.includes(row.id)) {
                        /* var index = this.expandKey.map(function (item) {
                             return item;
                         }).indexOf(row.id.toString());

                         console.log(index)*/
                        // this.expandKey.remove(row.id.toString());
                        /* this.$nextTick(()=>{
                             this.$delete(this.expandKey,index);
                         })*/
                    } else {
                        this.expandKey.push(row.id)
                    }
                }
                // console.log(this.expandKey)
            }
        }
    }
</script>

<style scoped>

</style>
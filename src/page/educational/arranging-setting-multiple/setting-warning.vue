<template>
    <!--预警设置-->
    <div class="setting-common-table">
        <div class="setting-title el-row">
            <el-col :span="16"><h3>展示为当前默认值</h3></el-col>
            <el-col :span="8">
                <el-input placeholder="请输入教师名称搜索" size="small" v-model="condition">
                    <el-button slot="append">搜索</el-button>
                </el-input>
            </el-col>
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
                        prop="date"
                        label="教师名称"
                        align="left">
                    <!--   <template slot-scope="scope">
                           <span style="padding-left: 10px">{{scope.row.date}}</span>
                       </template>-->
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="单周课时数设置"
                        align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.name"
                                         size="small"
                                         :min="1" :max="100" label="输入课时数">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="单天课时数设置"
                        align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.address"
                                         size="small"
                                         :min="1" :max="100" label="输入课时数">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="任课科目数设置"
                        align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.address"
                                         size="small"
                                         :min="1" :max="100" label="输入课时数">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="跨年级级数设置"
                        align="center">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.address"
                                         size="small"
                                         :min="1" :max="100" label="输入课时数">
                        </el-input-number>
                    </template>
                </el-table-column>
            </el-table>
            <div class="text-center mt-20">
                <el-button type="primary">保存设置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"setting-class",
        data() {
            return {
                condition:'',
                tableData:[
                    {
                        id:1,
                        date:'语文组',
                        children:[{
                            id:11,
                            date:'王老师',
                            name:'王小虎',
                            address:'上海市普陀区金沙江路 1519 弄'
                        },{
                            id:12,
                            date:'李老师',
                            name:'王小虎',
                            address:'上海市普陀区金沙江路 1519 弄'
                        }]
                    },{
                        id:2,
                        date:'数学组',
                        children:[{
                            id:21,
                            date:'李老师',
                            name:'王小虎',
                            address:'上海市普陀区金沙江路 1519 弄'
                        },{
                            id:22,
                            date:'李老师',
                            name:'王小虎',
                            address:'上海市普陀区金沙江路 1519 弄'
                        }]
                    },{
                        id:3,
                        date:'实验组',
                        children:[{
                            id:31,
                            date:'2016-05-01',
                            name:'王小虎',
                            address:'上海市普陀区金沙江路 1519 弄'
                        },{
                            id:32,
                            date:'2016-05-01',
                            name:'王小虎',
                            address:'上海市普陀区金沙江路 1519 弄'
                        }]
                    }],
                expandKey:[],//默认展开数组
            }
        },
        methods:{
            //跨行
            arraySpanMethod({row,column,rowIndex,columnIndex}) {
                if (row.children) {
                    if (columnIndex === 0) { //只针对第一个td跨行
                        return [1,5];
                    } else {
                        return [0,0];
                    }
                }
            },
            //点击一行折叠
            expandChange(row,column,event) {
                console.log(row)
                console.log(column)
                console.log(event)
                if (row.children) {
                    if (this.expandKey.includes(row.id.toString())) {
                        this.expandKey.remove(row.id.toString());
                    } else {
                        this.expandKey.push(row.id.toString())
                    }
                }
                console.log(this.expandKey)
            }
        }
    }
</script>

<style scoped>

</style>
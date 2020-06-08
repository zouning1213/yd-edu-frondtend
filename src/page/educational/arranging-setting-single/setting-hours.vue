<template>
    <!--时段分布-->
    <div>
        <el-row  :gutter="20">
            <el-col :span="11">  
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
                                prop="name"
                                label="课程教研组" 
                                align="left"> 
                        </el-table-column>
                        <el-table-column
                                prop="value"
                                label="重要程度"
                                align="center">
                            <template slot-scope="scope">
                                <el-radio-group v-model="scope.row.value">
                                    <el-radio label="0">很重要</el-radio>
                                    <el-radio label="1">重要</el-radio>
                                    <el-radio label="2">一般</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column> 
                    </el-table>
                </div>
            </el-col> 
            <el-col :span="11" class="ml-20"> 
                <div class="yd-common-table">
                    <el-table
                            :data="tableDataTwo" 
                            border >
                        <el-table-column
                                prop="name"
                                label="教学时段"
                                width=""
                                align="center"> 
                        </el-table-column>
                        <el-table-column
                                prop="value"
                                label="重要程度"
                                align="center">
                            <template slot-scope="scope">
                                <el-radio-group v-model="scope.row.value">
                                    <el-radio label="0">很重要</el-radio>
                                    <el-radio label="1">重要</el-radio>
                                    <el-radio label="2">一般</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column> 
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:"setting-hours",
        data() {
            return { 
                tableData:[
                    {
                        id:1,
                        name:'机电技术应用',
                        value:'',
                        kcid:'y1',
                        children:[{
                            id:11,
                            value:'',
                            kcid:'k11',
                            name:'机电的发展史',
                        },{
                            id:12,
                            value:'',
                            kcid:'k12',
                            name:'机电技术',
                        }]
                    },{
                        id:2,
                        name:'专业名称',
                        value:'',
                        kcid:'y2',
                        children:[{
                            id:21,
                            value:'',
                            kcid:'k21',
                            name:'课程名称',
                        },{
                            id:22,
                            value:'',
                            kcid:'k22',
                            name:'课程名称',
                        }]
                    },{
                        id:3,
                        name:'专业名称',
                        value:'',
                        kcid:'y3',
                        children:[{
                            id:31,
                            value:'',
                            kcid:'k31',
                            name:'课程名称',
                        },{
                            id:32,
                            value:'',
                            kcid:'k32',
                            name:'课程名称',
                        }]
                }],
                tableDataTwo:[
                    {
                        id:1,
                        name:'第一节'
                    },
                    {
                        id:2,
                        name:'第二节'
                    },
                    {
                        id:3,
                        name:'第三节'
                    },
                    {
                        id:4,
                        name:'第四节'
                    },
                    {
                        id:5,
                        name:'第五节'
                    },
                    {
                        id:6,
                        name:'第六节'
                    }
                ],
                expandKey:[],//默认展开数组
            }
        },
        methods:{ 
            //跨行
            arraySpanMethod({row,column,rowIndex,columnIndex}) {
                if (row.children) {
                    if (columnIndex === 0) { //只针对第一个td跨行
                        return [1,2];
                    } else {
                        return [0,0];
                    }
                }
            },
            //点击一行折叠
            expandChange(row,column,event) { 
                if (row.children) {
                    if (this.expandKey.includes(row.id.toString())) { 
                        this.expandKey.splice(this.expandKey.findIndex(item=>item.id==row.id.toString()),1);
                    } else {
                        this.expandKey.push(row.id.toString())
                    }
                } 
            } 
        }
    }
</script>

<style scoped>

</style>
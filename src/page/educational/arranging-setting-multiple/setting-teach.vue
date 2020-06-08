<template>
    <!--任课分布-->
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
                        prop="name"
                        label="课程教研组"
                        width="280"
                        align="left">
                    <!--   <template slot-scope="scope">
                           <span style="padding-left: 10px">{{scope.row.date}}</span>
                       </template>-->
                </el-table-column>
                <el-table-column
                        prop="value"
                        label="周任务分布"
                        align="center">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.value">
                            <el-radio label="0">周内分散任课</el-radio>
                            <el-radio label="1">周内集中任课</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="value"
                        label="日任务分布"
                        align="center">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.value">
                            <el-radio label="0">日内分散任课</el-radio>
                            <el-radio label="1">日内集中任课</el-radio>
                        </el-radio-group>
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
        name:"setting-teach",
        data() {
            return {
                condition:'',
                tableData:[
                    {
                        id:1,
                        name:'专业名称',
                        value:'',
                        kcid:'y1',
                        children:[{
                            id:11,
                            value:'',
                            kcid:'k11',
                            name:'课程名称',
                        },{
                            id:12,
                            value:'',
                            kcid:'k12',
                            name:'课程名称',
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
                expandKey:[],//默认展开数组
            }
        },
        methods:{
            //跨行
            arraySpanMethod({row,column,rowIndex,columnIndex}) {
                if (row.children) {
                    if (columnIndex === 0) { //只针对第一个td跨行
                        return [1,3];
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
                    if (this.expandKey.includes(row.id.toString())) {
                        this.expandKey.remove(row.id.toString());
                    } else {
                        this.expandKey.push(row.id.toString())
                    }
                }
                // console.log(this.expandKey)
            }
        }
    }
</script>

<style scoped>

</style>
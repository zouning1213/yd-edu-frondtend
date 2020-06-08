<template>
    <!--用户选择器-->
    <div class="yd-user-select-btn">
        <el-button @click="userSelect">点击选择</el-button>
        <el-popover
                placement="top-start"
                popper-class="show-user-select"
                trigger="click">
            <!--提示内容-->
            <div class="select-list">
                <h3>部门</h3>
                <ul>
                    <li>综合管理部、</li>
                    <li>纪委监察部、</li>
                    <li>行政人事部、</li>
                    <li>总经办、</li>
                    <li>实施服务后勤部、</li>
                    <li>战略发展</li>
                    <li>规划部、</li>
                    <li>技术研发部</li>
                </ul>
            </div>
            <div class="select-list">
                <h3>人员</h3>
                <ul>
                    <li>综合管理部、</li>
                    <li>纪委监察部、</li>
                    <li>行政人事部、</li>
                    <li>总经办、</li>
                    <li>实施服务后勤部、</li>
                    <li>战略发展</li>
                    <li>规划部、</li>
                    <li>技术研发部</li>
                </ul>
            </div>
            <!--提示文字-->
            <div slot="reference" class="user-select-tip">
                <p>您暂无添加参考人员</p>
            </div>
        </el-popover>
        <!--用户选择弹窗-->
        <el-dialog
                title="选择用户"
                :close-on-click-modal='false'
                :visible.sync="dialogVisible"
                width="600px"
                custom-class="user-select-dialog">
            <!--body-->
            <el-row class="user-select-title">
                <ul class="title-tab-ul">
                    <li :class="{active:activeName == 'first'}" @click="activeName = 'first'"><span>选择人员</span></li>
                    <li :class="{active:activeName == 'second'}" @click="activeName = 'second'"><span>选择部门</span></li>
                </ul>
                <div class="title-search">
                    <input type="text" placeholder="搜索人员或部门"/>
                    <button class="search-bth"><img src="img/search.png"/></button>
                </div>
            </el-row>
            <div class="user-select-tree">
                <el-row class="tree-top">
                    <el-col :span="20">
                        <div class="checked-tip">
                            <i class="el-icon-info"></i>已选择<span>100</span>项
                        </div>
                        <el-button type="text">清空全选</el-button>
                    </el-col>
                    <el-col :span="4" style="text-align: right">
                        <el-button type="text" @click="setExpandAll">
                            {{isExpand}}
                            <template v-if="isExpand">全部收起</template>
                            <template v-else>全部展开</template>
                        </el-button>
                    </el-col>
                </el-row>
                <el-tree :data="data"
                         show-checkbox
                         node-key="id"
                         :load="loadNode"
                         @node-click="handleNodeClick"
                         :default-expanded-keys="expandedKeys"
                         :default-checked-keys="checkedKeys"
                         :default-expand-all="isExpand"
                         :props="defaultProps"
                         ref="tree">
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                        <span><i :class="data.icon"></i>{{node.label }}</span>
                    </div>
                </el-tree>
            </div>
            <!--footer-->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitSelectUser">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/yd-user-select.less'

    export default {
        name:"yd-user-select",
        data() {
            return {
                dialogVisible:false,
                activeName:'first',
                isExpand:true,
                data:[],
                defaultProps:{
                    children:'children',
                    label:'label',
                    icon:"icon"
                },
                checkedKeys:[5], //选中节点的数组
                expandedKeys:[1] //展开节点的数组
            }
        },
        created() {
            let userData = require("./data/userSelect.json")
            this.data = userData.userData
        },
        methods:{
            setExpandAll() {
                this.isExpand = !this.isExpand
            },
            userSelect() {
                this.dialogVisible = true
            },
            handleNodeClick(data) {
                // console.log(data)
            },
            loadNode(node,resolve) {
                // console.log(node,resolve)
            },
            submitSelectUser() {

                //获取当前选中的节点
                let checkedNode = this.$refs.tree.getCheckedNodes()
                checkedNode.forEach((item,index) => {
                    this.checkedKeys.push(item.id)
                })
                // console.log(this.checkedKeys)
            }
        }
    }
</script>

<style scoped>
</style>
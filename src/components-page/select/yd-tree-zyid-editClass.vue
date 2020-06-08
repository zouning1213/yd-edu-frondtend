<template>
    <!--选择专业 新生分班信息树-->
    <div class="yd-common-select-tree yd-common-select-temporary-tree"
         :style="{'minHeight':(this.$store.state.minClientHeight-324)+'px'}">
        <div class="bg-skin tree-title border-skin"><h3>选择专业</h3></div>
        <div class="tree-content" :style="{'height':(this.$store.state.minClientHeight-342)+'px'}">
            <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    accordion
                    show-checkbox
                    empty-text="暂无人才计划"
                    :default-expand-all="false"
                    :default-expanded-keys="[]"
                    :default-checked-keys="[]"
                    ref="tree"
                    :check-on-click-node="false"
                    :check-strictly="false"
                    @check="changeTree"
                    node-key="id">
                <div class="custom-tree-node" slot-scope="{node,data }">
                    <span :class="{isPink:data.id.substring(1,5) == 'null'}">
                        <i v-if="data.id.substring(0,1) == 'z'" class="yd icon-tree-yx"></i>
                        <i v-if="data.id.substring(0,1) == 'b'" class="yd icon-tree-kys"></i>
                        {{data.label}}
                         <label class="point" v-show="data.noun==1">重</label>
                    </span>
                    <!-- <div class="class-button-wrap" v-show="data.id == isSelectWho&&data.id.substring(1,5) != 'null'"> -->
                    <div :class="{'class-button-wrap':true,'class-button-wrap-hidden':data.id.substring(0,1) == 'b'&&data.id.substring(1,5) != 'null'}"
                            v-show="data.id.substring(0,1) == 'b'&&data.id.substring(1,5) != 'null'">
                        <span class="is-edit" @click="isEdit(data)">编辑</span>
                        <span class="is-delete" @click="isDelete(data)">删除</span>
                    </div>
                </div>
            </el-tree>
        </div>
    </div>
</template>

<script>
    import './css/select-tree.less'

    let id = 1000;
    export default {
        name:'yd-tree-student-temporary',
        data() {
            return {
                isSelectWho:'',
                i:0,
                defaultProps:{
                    children:'children',
                    label:'label',
                    id:'id',
                    disabled:function (data,node) {
                     /*   if (data.id.substring(0,1) != 'b') {
                            return true
                        } else {
                            return false
                        }*/
                    }
                },
                treeData:[],
            }
        },
        created() {
            //初始化人才计划树
            this.getTreeData()
        },
        methods:{
            //初始化树
            getTreeData() {
                this.$GET("/studentTemporary/studentTemporaryTree").then((res) => {
                    this.treeData = res 
                })
            },
            changeTree(data,node) {  
                    let a = this.$refs.tree.getCheckedKeys() 
                    this.$emit('checkedZyId',a)
            },
            submitTree() { //提交教研组
                let treeCheckedId = this.$refs.tree.getCheckedKeys(true) //选中的keys 集合， true 为传递最后一级的id
            },
            removeNode() {
                this.$refs.tree.setCheckedNodes([]);
            },
            //
            isEdit(data) {
                // console.log("编辑")
                // console.log(data)
                this.$emit('childEditBj',data)
            },
            //
            isDelete(data) {
                // console.log("删除")
                // console.log(data) 
                this.$emit('childDeleteBj',data)
            }
        }
    }
</script>

<style lang='less'>
    .yd-common-select-temporary-tree {
        .el-tree-node__content>.el-tree-node__expand-icon{
            padding: 4px;
        }
        .el-tree-node__children {
            .el-tree-node.is-focusable.is-checked {
                // height: 60px;
                .el-tree-node__content {
                    height: 60px;
                    // height: auto;
                    padding-top: 8px;
                }
                .custom-tree-node {
                    color: #217045;
                }
                .class-button-wrap {
                    display: block;
                    color: #217045;
                    text-align: right;
                    span {
                        display: inline-block;
                        cursor: pointer;
                        padding: 6px 18px 0 12px;
                    }
                    .is-edit {

                    }
                    .is-delete {
                        color: #EC526C;
                    }
                }
            }
            .class-button-wrap {
                display: none;
            }
            .isPink {
                color: #EC526C !important;
            }
        }
        .el-tree-node__content {
            align-items: end;
            padding-top: 8px;
        }
        .custom-tree-node {
            width: 100%;
            height: 100%;
            clear: both;
            // background-color: #ccc;
        }
    }

</style>
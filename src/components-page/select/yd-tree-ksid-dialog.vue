<template>
    <!--弹窗选择教研组 -->
    <!--使用方法 ksid 以字符串形式传入 转换为数组 并且id 前面添加k , 后以字符串形式传出 截取掉k-->
    <!-- <yd-select-dialog-tree
             :ksid="courseForm.ksid"
             @changeKsId="changeKsId">
     </yd-select-dialog-tree>-->

    <div>
        <el-input v-model="checkedKsmc" placeholder="选择教研组" @click.native="openDialog"></el-input>
        <div v-if="dialogVisible">
            <!-- 添加 z-index="23" 会影响到添加课程弹窗 下课程类别的层级-->
            <el-dialog
                    custom-class="yd-common-select-tree"
                    :close-on-click-modal='false'
                    :modal-append-to-body="true"
                    :modal="is_modal"
                    title="选择教研组"
                    :visible.sync="dialogVisible"
                    width="480px"
                    :before-close="closeDialog">
                <div class="tree-content" style="margin-top: -20px">
                    <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            show-checkbox
                            ref="tree"
                            empty-text="暂无院系"
                            :accordion="true"
                            :default-expand-all="false"
                            :default-expanded-keys="defaultChecked"
                            :default-checked-keys="checkedKsid"
                            :check-on-click-node="false"
                            :check-strictly="false"
                            @check="changeTree"
                            node-key="id">
                        <div class="custom-tree-node" slot-scope="{node,data}">
                            <span>
                                <i v-if="data.pid == 0" class="yd icon-tree-yx"></i>
                                <i v-if="data.id.substring(0,1) == 'k'" class="yd icon-tree-kys"></i>
                                {{data.label}}
                            </span>
                        </div>
                    </el-tree>
                </div>
                <div slot="footer" class="dialog-footer text-center">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="submitTree">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import './css/select-tree.less'

    export default {
        props:{
            ksid:{ //课室id 进来的时候 id 没有带k  但是tree 里面是需要k的,返出去的id 也是不带k的
                default:'',
            },
        },
        name:"check-subject-zyh",
        data() {
            return {
                is_modal:false,
                dialogVisible:false,
                treeData:[],
                defaultProps:{
                    children:'children',
                    label:'label',
                    id:'id',
                    disabled:function (data,node) {
                        if (data.pid == '0') {
                            return true
                        } else {
                            return false
                        }
                    }
                },
                checkedKsid:[],
                checkedKsmc:'',
                defaultChecked:[]
            }
        },
        created() {
            this.getTreeData();
        },
        methods:{
            getTreeData() {
                this.treeData = []
                this.$GET('/departmentInfo/queryTreeByks').then((res) => {
                    this.treeData = res.data
                    this.setCheckedTree()
                })
            },
            setCheckedTree() {
                let ksidString = this.ksid.toString() //转换科室号为字符串
                let ksidArry = ksidString == ''? [] :ksidString.split(',')  //转换课室号为数组
                ksidArry.forEach(item => {
                    this.checkedKsid.push('k' + item)
                })
                if (this.checkedKsid.length > 0) {
                    this.treeData.forEach((item) => {
                        if (item.children.length > 0) {
                            item.children.forEach((item2) => {
                                if (this.checkedKsid.includes(item2.id)) {
                                    this.checkedKsmc = item2.label || '未找到教研组名称'
                                    this.defaultChecked = [item2.pid] || []
                                }
                            })
                        }
                    })
                }
            },
            //控制单选
            changeTree(data,node) {
                this.$refs.tree.setCheckedNodes([data]);
            },
            submitTree() { //提交教研组
                let treeData = this.$refs.tree.getCheckedNodes(true)
                if (treeData.length > 0) {
                    let checkedId = []
                    let name = []
                    treeData.forEach((item) => {
                        checkedId.push(item.id.substring(1))
                        name.push(item.label)
                    })
                    this.checkedKsmc = name.join(',')
                    this.$emit('changeKsId',checkedId.join(','))
                    this.dialogVisible = false
                }
            },
            closeDialog() {//教研组弹窗关闭
                this.dialogVisible = false
            },
            openDialog() { //点击选择教研组
                this.dialogVisible = true
                this.setCheckedTree()
            }
        }
    }
</script>

<style lang="less">

</style>

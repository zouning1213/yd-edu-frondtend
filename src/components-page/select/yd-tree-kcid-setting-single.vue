<template>
    <!--选择教师 目前控制的是单选 但是组件是支持多选的 -->
    <!--使用方法  ksid 教研组id(多个以字符串形式,自动填补k) 可传 可不传 checkedKsId方法 返回的是选中的id(字符串形式,并且截取掉k)
      <yd-select-zy-tree v-on:checkedJsId="checkedJsId" :jsid='jsid'></yd-select-zy-tree>
       -->
    <div class="yd-common-select-tree" :style="{'minHeight':(this.$store.state.minClientHeight-225)+'px'}">
        <div class="bg-skin tree-title border-skin"><h3>选择课程</h3></div>
        <div class="tree-content" :style="{'maxHeight':(this.$store.state.minClientHeight-268)+'px'}">
            <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    show-checkbox
                    ref="tree"
                    empty-text="暂无课程"
                    :default-expand-all="false"
                    :default-expanded-keys="defaultChecked"
                    :default-checked-keys="checkedId"
                    :check-on-click-node="false"
                    :check-strictly="false"
                    @check="changeTree"
                    node-key="id">
                <div class="custom-tree-node" slot-scope="{node,data }">
                    <span>
                        <!-- <i v-if="data.pid == 0" class="yd icon-tree-yx"></i> -->
                        <i v-if="data.id.substring(0,1) == 'd'" class="yd icon-tree-major"></i>
                        <i v-if="data.id.substring(0,1) == 'k'" class="yd icon-teaching"></i>
                        {{data.label}}
                    </span>
                </div>
            </el-tree>
        </div>
    </div>
</template>

<script>
    import './css/select-tree.less'

    export default {
        props:{
            jsid:{
                default:'',
            },
            treeData:{
                default:[]
            }
        },
        name:"check-subject-zyh",
        data() {
            return {
                is_modal:false,
                dialogVisible:false,
                // treeData:[],
                defaultProps:{
                    children:'children',
                    label:'label',
                    id:'id',
                    disabled:function (data,node) { 
                        if (data.id.substring(0,1) != 'k') {
                            return true
                        } else {
                            return false
                        }
                    }
                },
                checkedId:[],
                defaultChecked:[]
            }
        },
        created() {
            this.getTreeData();
        },
        methods:{
            getTreeData() {
                // this.treeData = []
                // this.$GET('/departmentInfo/queryTreeByks',{teacher:1}).then((res) => {
                    // this.treeData = res.data
                    // console.log(this.treeData)
                    if (this.jsid != '') {
                        //赋值传递过来的id 给tree
                        let ksidString = this.jsid.toString() //转换科室号为字符串
                        let ksidArry = ksidString == ''? [] :ksidString.split(',')  //转换课室号为数组
                        ksidArry.forEach(item => {
                            this.checkedId.push('k' + item)
                        })
                        //赋值传递归来的id 的父级 展开
                        if (this.checkedId.length > 0) {
                            this.treeData.forEach((item) => {
                                // if (item.children.length > 0) {
                                    // item.children.forEach((item2) => {
                                        if (item.children.length > 0) {
                                            item.children.forEach((item3) => {
                                                if (this.checkedId.includes(item3.id)) {
                                                    this.defaultChecked = [item3.pid] || []
                                                }
                                            })
                                        }
                                    // })
                                // }
                            })
                        }
                    }
                // })
            },
            removeNode() {
                this.$refs.tree.setCheckedNodes([]);
            },
            //控制单选
            changeTree(data,node) {
                if (data.id.substring(0,1) == 'k') { 
                    this.$refs.tree.setCheckedNodes([data]);
                    this.submitTree()
                }
            },
            submitTree() { //提交教研组
                let treeCheckedId = this.$refs.tree.getCheckedKeys(true)
                if (treeCheckedId.length > 0) {
                    let checkedId = []
                    treeCheckedId.forEach((item) => {
                        checkedId.push(item.substring(1))
                    })
                    this.$emit('checkedKcId',checkedId.join(','))
                }
            },
        }
    }
</script>

<style lang="less">

</style>
<template>
    <!--选择专业 人才培养计划使用-->
    <div class="yd-common-select-tree" :style="{'minHeight':(this.$store.state.minClientHeight-225)+'px'}">
        <div class="bg-skin tree-title border-skin"><h3>选择专业</h3></div>
        <div class="tree-content" :style="{'maxHeight':(this.$store.state.minClientHeight-268)+'px'}">
            <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    :default-expanded-keys="[]"
                    :default-checked-keys="[]"
                    :check-on-click-node="false"
                    node-key="id"
                    ref="treeForm"
                    empty-text="暂无人才计划"
                    :check-strictly=false
                    @check="changeTree"
                    accordion
                    :render-content="renderContent"
                    show-checkbox>
            </el-tree>
        </div>
    </div>
</template>

<script>
    import './css/select-tree.less'

    let id = 1000;
    export default {
        name:'yd-select-zyh-talent',
        data() {
            return {
                i:0,
                defaultProps:{
                    children:'children',
                    label:'label',
                    id:'id',
                    disabled:function (data,node) {
                        if (data.id.substring(0,1) != 'z') {
                            return true
                        } else {
                            return false
                        }
                    }
                },
                treeData:[],
            }
        },
        created() {
            //初始化人才计划树
            this.$GET("/geniusInfo/treeByGenius").then((res) => {
                this.treeData = res
            })
        },
        methods:{
            renderContent(h,{node,data,store}) {
                var createElement = arguments[0];
                var level = arguments[1].node.level;
                if (level == 1) {
                    return createElement('span',[
                        createElement('i',{attrs:{class:'yd icon-tree-year'}}),
                        createElement('span',"     "),
                        createElement('span',arguments[1].node.label + '级')
                    ]);
                } else if (level == 2) {
                    return createElement('span',[
                        createElement('i',{attrs:{class:'yd icon-tree-yx'}}),
                        createElement('span',"     "),
                        createElement('span',arguments[1].node.label)
                    ]);
                } else {
                    // arguments[1].node.data.id
                    return createElement('span',[
                        createElement('i',{attrs:{class:'yd icon-tree-major'}}),
                        createElement('span',"     "),
                        createElement('span',arguments[1].node.label),
                    ]);
                }
            },
            //控制单选
            changeTree(data,node) {
                console.log(data)
                if (data.id.substring(0,1) == 'z') {
                    this.$refs.treeForm.setCheckedNodes([data]);
                    this.$emit('getJhh',data.value)
                }
            },
            /*  isChecked(a,b) {
                  let isa = a.id.substring(0,1)
                  if (isa == '') {
                      // console.log("层级为1,啥也不干")
                  }
                  if (isa == 2) {
                      // console.log("层级为2,可以绑定添加按钮加的东西")
                  }
                  if (isa == 'z') {
                      // console.log("层级为3,根据zyh查询右边表格")
                      // console.log(a.value)
                      this.$emit('getJhh',a.value)
                  }
              },
              isTreeDelete(a) {
                  // console.log("删除")
                  // console.log(a)
              }*/
        }
    }
</script>

<style lang='less'>
</style>
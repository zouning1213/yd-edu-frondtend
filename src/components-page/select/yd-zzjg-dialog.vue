<template>
    <!--选择组织架构 -->
    <!--使用方法
    <yd-select-zyh :zyh="infoForm.zyh"
        @changeZyh="function(data)
        {infoForm.zyh=data}">
    </yd-select-zyh>
       -->
    <div class="yd-common-select">
        <el-input v-model="newzzjgmc" placeholder="选择组织架构" @click.native="openDialog"></el-input>
        <el-dialog
                custom-class="yd-common-select-dialog"
                :close-on-click-modal='false'
                :modal-append-to-body="true"
                z-index="1000"
                :modal="is_modal"
                title="选择组织"
                :visible.sync="dialogVisible"
                v-if="dialogVisible"
                width="480px"
                :before-close="handleClose">
            <el-tree
                    :data="data"
                    :default-expand-all="true"
                    :props="defaultProps"
                    show-checkbox
                    ref="tree"
                    :default-checked-keys="checkedId"
                    :check-on-click-node="false"
                    :check-strictly="false"
                    node-key="id">
                <div class="custom-tree-node" slot-scope="{node,data }">
                    <span><i class="yd icon-banji"></i>{{node.label}}</span>
                </div>
            </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submitTree">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/select-dialog.less'

    export default {
        props:{
            zzjg:'',  // 选中组织架构id
            zzjgmc:'', //选中组织架构名称
            is_edit:{
                default:true
            }
        },
        name:"check-subject-zyh",
        data() {
            return {
                newzzjgmc:'',
                is_modal:false,
                dialogVisible:false,
                data:[],
                checkedId:[],
                defaultProps:{
                    children:'nodes',
                    label:'text',
                    id:'nodeId'
                },
            }
        },
        mounted() {
            //淘汰的接口
            // this.$GET('/organizationInfo/treeview').then((res) => {
            //     this.data = [res]
            // })
            // this.checkedId = this.zzjg == ''? [] :this.zzjg.split(',')
            // this.newzzjgmc = this.zzjgmc == ''? '' :this.zzjgmc
        },
        methods:{
            changeZyh() { //改变专业号

            },
            openDialog() { //点击选择专业号
                this.dialogVisible = true
            },
            submitTree() { //提交专业号
                let data = this.$refs.tree.getCheckedNodes()
                let name = [] //选中的名称
                let check = [] //选中的id
                data.forEach(item => {
                    name.push(item.text)
                    check.push(item.id)
                })
                this.newzzjgmc = name.join(',')
                this.checkedId = check

                let params = {
                    zzjg:check.join(','),
                    zzjgmc:name.join(',')
                }

                this.$emit('changeZZJG',params)
                this.dialogVisible = false
                console.log(this.checkedId)
            },
            deleteSubject() {
                this.checkedId = []
            },
            handleClose() {//专业号弹窗关闭
                this.dialogVisible = false
            }
        }
    }
</script>

<style lang="less">
</style>

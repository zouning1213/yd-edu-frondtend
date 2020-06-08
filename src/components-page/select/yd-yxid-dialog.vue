<template>
    <!--选择院系号 -->
    <!--使用方法
   <yd-select-yx :yxid="form.yxid"
        @changeYx="function(data)
        {form.yxid=data}">
   </yd-select-yx>
       -->
    <div class="yd-common-select">
        <el-input v-model="newYxmc" placeholder="点击选择院系" @click.native="openDialog"></el-input>
        <el-dialog
                custom-class="yd-common-select-dialog"
                :modal-append-to-body="true"
                z-index="1000"
                :close-on-click-modal='false'
                :modal="is_modal"
                title="选择所属院系"
                :visible.sync="dialogVisible"
                width="680px"
                :before-close="handleClose">
            <el-checkbox-group v-model="checkedYxid" @change="changeYxbm">
                <el-checkbox v-for="(item,index) in yxList" :key="index"
                             :label="item.yxid" name="type">{{item.yxmc}}
                             <!-- {{item.yxbm}}{{item.yxid}} -->
                </el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submitZyh">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/select-dialog.less'

    export default {
        props:{
            yxid:'',
            is_modal:{
                default:false
            },
            is_edit:{
                default:true
            }
        },
        name:"check-subject-zyh",
        data() {
            return {
                dialogVisible:false,
                yxList:[],
                checkedYxid:this.yxid == ''? [] :[this.yxid],
                newYxid:this.yxid == ''? '' :this.yxid,
                newYxmc:''
            }
        },
        created() {
            this.$GET('/collegeInfo/list',{
                page:1,
                limit:99999,
                condition:''
            }).then((res) => {
                this.yxList = res.data
                this.getYxmc()
            })
        },
        methods:{
            getYxmc() {
                if (this.checkedYxid.length > 0) {
                    var index = this.yxList.map(function (item) {
                        return item.yxid;
                    }).indexOf(parseInt(this.newYxid));
                    this.newYxmc = this.yxList[index] == undefined? '未匹配到院系名称' :this.yxList[index].yxmc
                }
            },
            changeYxbm() { //改变专业号
                if (this.checkedYxid.length > 1) {
                    this.checkedYxid.shift();
                }
                this.newYxid = this.checkedYxid.join('')
                this.getYxmc()
            },
            openDialog() { //点击选择专业号
                if (this.is_edit) {
                    this.dialogVisible = true
                }
            },
            submitZyh() { //提交专业号
                this.$emit('changeYxid',this.newYxid)
                this.dialogVisible = false
            },
            /* deleteSubject() {
                 this.checkedYxid = []
                 this.newYxid = ''
             },*/
            handleClose() {//专业号弹窗关闭
                this.dialogVisible = false
                this.checkedYxid = []
                this.newYxid = ''
            }
        },
    }
</script>

<style lang="less">

</style>
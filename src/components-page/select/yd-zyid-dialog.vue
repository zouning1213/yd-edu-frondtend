<template>
    <!--选择专业号 -->
    <!--使用方法
    <yd-select-zyid :zyid="infoForm.zyid"
        @changeZyid="function(data)
        {infoForm.zyid=data}">
    </yd-select-zyid>
       -->
    <div class="yd-common-select">
        <el-input v-model="checkedZymc" placeholder="请选择专业号" @click.native="openDialog"></el-input>
        <el-dialog
                custom-class="yd-common-select-dialog"
                :modal-append-to-body="true"
                z-index="1000"
                :close-on-click-modal='false'
                :modal="is_modal"
                title="选择专业"
                :visible.sync="dialogVisible"
                width="540px"
                :before-close="handleClose">
            <el-checkbox-group v-model="checkedId" @change="changeZyid">
                <el-checkbox v-for="(item,index) in zyidList" :key="index"
                             :label="item.zyid" name="type">{{item.zymc}}
                </el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer text-center">
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
            zyid:{
                default:''
            },
            is_modal:{
                default:false
            },
        },
        name:"check-subject-zyh",
        data() {
            return {
                dialogVisible:false,
                zyidList:[],
                checkedId:[],
                checkedZymc:''
            }
        },
        created() { 
            //赋值选中的id
            this.checkedId = this.zyid == ''? [] :this.zyid.toString().split(',')

            //获取专业列表
            this.$GET('/majorInfo/selectList').then((res) => {
                this.zyidList = res.data
                if (this.checkedId.length > 0) {
                    this.getZymc()
                }
            })
        },
        methods:{
            getZymc() {
                //根据选中的id得到 专业名称
                var index = this.zyidList.map(function (item) {
                    return item.zyid;
                }).indexOf(parseInt(this.checkedId.join(',')));

                this.checkedZymc = this.zyidList[index].zymc
            },
            changeZyid() { //改变专业号
                if (this.checkedId.length > 1) {
                    this.checkedId.shift();
                }

                if (this.checkedId.length > 0) {
                    this.getZymc()
                }
            },
            openDialog() { //点击选择专业号
                this.dialogVisible = true
            },
            submitZyh() { //提交专业号
                let zyid = this.checkedId.join('')
                this.$emit('changeZyid',zyid)
                this.dialogVisible = false
            },
            deleteSubject() {
                this.checkedId = []
            },
            handleClose() {//专业号弹窗关闭
                this.dialogVisible = false
                this.checkedId = []
            }
        },
    }
</script>

<style lang="less">

</style>
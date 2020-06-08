<template>
    <!--根据专业选择教师 等待淘汰组件-->
    <div class="yd-common-select">
        <div :class="['check-box','edit-border']" @click="checkTeacher">
            <p v-if="checkedZgh.length <= 0" style="color: #c0c4cc">点击选择教师</p>
            <p v-else>{{checkedZgmc}}</p>
            <i class="el-icon-error" @click.stop="removeTeacher"></i>
        </div>
        <el-dialog
                custom-class="yd-common-select-dialog"
                v-if="dialogVisible"
                width="680px"
                :close-on-click-modal='false'
                :visible.sync="dialogVisible"
                :modal="false"
                @close=closeDialog>
            <div class="mb-20">
                选择专业:
                <el-select v-model="checkedZyh" @change="changeZyh()">
                    <el-option
                            v-for="item in zyhOptions"
                            :key="item.zyh"
                            :label="item.zymc"
                            :value="item.zyh">
                    </el-option>
                </el-select>
            </div>
            <!--选择班主任-->
            <div v-if="zghOptions.length > 0">
                <el-checkbox-group v-model="checkedZgh" @change="changeZgh">
                    <ul class="clearfix">
                        <li v-for="(item,index) in zghOptions" :key="index">
                            <el-checkbox :key="index"
                                         :label="item.zgh"
                                         name="type">{{item.xm}}({{item.zgh}})
                            </el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
            </div>
            <div v-else style="min-height:100px;line-height: 100px;text-align: center;color:#c0c4cc">
                <p>请先选择专业来选择教师</p>
            </div>
            <div style="margin: 10px 20px" class="text-center">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="submitTeacher">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/select-dialog.less'

    export default {
        name:"yd-select-zgh",
        props:['zyh','zgh'],
        data() {
            return {
                dialogVisible:false,
                zyhOptions:[],
                zghOptions:[],
                checkedZyh:'',
                checkedZgh:[],
                checkedZgmc:''
            }
        },
        created() {
            //专业数据
            this.$GET('/majorInfo/selectList').then((res) => {
                this.zyhOptions = res.data
                this.checkedZyh = this.zyh || ''
                this.checkedZgh = this.zgh == ''? [] :this.zgh.split(',')
                this.changeZyh();
            })
        },
        methods:{
            checkTeacher() { //赋值选中的
                this.dialogVisible = true
            },
            removeTeacher() {
                this.checkedZyh = ''
                this.checkedZgh = []
            },
            submitTeacher() {
                let zgh = this.checkedZgh.join(',')
                this.$emit('changeZgh',zgh)
                this.getCheckedZgmc()
                this.dialogVisible = false
            },
            closeDialog() {//专业号弹窗关闭
                this.checkedZyh = ''
                this.checkedZgh = []
                this.dialogVisible = false
            },
            changeZyh() {
                this.$GET('/teacherInfo/teacherZyhSelect',{'zyh':this.checkedZyh}).then((res) => {
                    this.zghOptions = res.data
                    this.getCheckedZgmc()
                })
            },
            changeZgh() {
                if (this.checkedZgh.length > 1) {
                    this.checkedZgh.shift()
                }
            },
            getCheckedZgmc() {
                if (this.checkedZgh.length > 0) {
                    var index = this.zghOptions.map(function (item) {
                        return item.zgh;
                    }).indexOf(this.checkedZgh.join(','));
                    this.checkedZgmc = this.zghOptions[index] == undefined? '未找到教师,请重新选择' :this.zghOptions[index].xm
                }
            },
            sendFrom() {
                let params = {
                    zgh:this.checkedZgh.join(','),
                    zyh:this.checkedZyh
                }
                this.$emit('receiveZgh',params)
            }
        }
    }
</script>

<style scoped lang="less">

</style>
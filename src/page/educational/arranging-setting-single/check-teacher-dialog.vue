<template>
    <!--选择教师弹窗-->
    <div class="arranging-setting-dialog">
        <!--系统推荐-->
        <div class="choose-list mb-30">
            <div class="title"><h3 class="text-blue">
                <span class="line bg-skin"></span>已选择老师
                <!--<label>(至少需要{{min}}个教师)</label>--></h3>
            </div>
            <ul class="content clearfix">
                <li v-for="(item,index) in checked" :key="index">
                    <el-checkbox :label="item" name="teacher1" :disabled="true">
                        <div class="cancel-checked" @click="deleteData(item,index)">
                            <i class="el-icon-circle-close text-red"></i>
                        </div>
                        <template v-if="listZgh[item]">
                            <span v-if="listZgh[item].jslx == '0'" class="status bg-blue">校</span>
                            <span v-if="listZgh[item].jslx == '1'" class="status bg-red">外</span>
                            <p style="margin-bottom: 4px" class="line-1">
                                {{listZgh[item].xm}}({{listZgh[item].ksmc}})</p>
                            <label>任务量:{{listZgh[item].rwl}}</label>
                            <label class="fr" v-if="listZgh[item].szzt == '0'">在校</label>
                            <label class="fr" v-if="listZgh[item].szzt == '1'">休假</label>
                            <label class="fr" v-if="listZgh[item].szzt == '2'">停职</label>
                            <label class="fr" v-if="listZgh[item].szzt == ''">在校</label>
                        </template>
                    </el-checkbox>
                </li>
            </ul>
        </div>
        <!--自助选择-->
        <div class="choose-list">
            <div class="title"><h3 class="text-blue">
                <span class="line bg-skin"></span>可选择教师
                <!--<label>(建议不超过{{min*2}}个教师)</label>--></h3>
            </div>
            <ul class="content clearfix">
                <el-checkbox-group v-model="checked">
                    <li v-for="(item,index) in listZgh" :key="index" :class="{active:checked.includes(item.zgh)}">
                        <span v-if="item.jslx == '0'" class="status bg-blue">校</span>
                        <span v-if="item.jslx == '1'" class="status bg-red">外</span>
                        <el-checkbox :label="item.zgh" name="teacher">
                            <!--:disabled="checked.length <= 1 ? checked.includes(item.zgh) : false"-->
                            <!--选中图标-->
                            <div v-show="checked.includes(item.zgh)" class="checked">
                                <i class="yd icon-checked-o icon-skin"></i>
                            </div>
                            <p style="margin-bottom: 4px">{{item.xm}}({{item.ksmc}})</p>
                            <i>任务量:{{item.rwl}}</i>
                            <i class="fr" v-if="item.szzt == '0'">在校</i>
                            <i class="fr" v-if="item.szzt == '1'">休假</i>
                            <i class="fr" v-if="item.szzt == '2'">停职</i>
                            <i class="fr" v-if="item.szzt == ''">在校</i>
                        </el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:"check-teacher-dialog",
        props:['min','row'],
        data() {
            return {
                listZgh:[], //职工号为键值对
                checked:[] //选中的
            }
        },
        mounted() {
            this.getData()
        },
        methods:{
            getData() {
                this.$POST('/timesheetTask/recommendTeacherInfo',this.row,{
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }
                ).then((res) => {
                    this.listZgh = this.getListZgh(res.data.teacherList)
                    // console.log(this.listZgh)
                    if (this.row.zgh == '') {
                        this.checked = this.getCheckedZgh(res.data.teacherRecommd)
                    } else {
                        this.checked = this.row.zgh.split(',')
                    }
                })
            },
            //转换数据格式
            getCheckedZgh(data) {
                let arr = []
                data.forEach(item => {
                    arr.push(item.zgh)
                })
                return arr
            },
            getListZgh(data) {
                let arr = {}
                data.forEach(item => {
                    arr[item.zgh] = item
                })
                return arr
            },
            deleteData(item,index) {
                this.$delete(this.checked,index,1)
            },
            sendData() { //看后期是否需要添加判断
                if (this.checked.length < 1) {
                    this.$message.error('至少要选一位教师');
                } else {
                    let row = this.row
                    let name = []
                    this.checked.forEach(item => {
                        name.push(this.listZgh[item].xm)
                    })
                    row.zgh = this.checked.join(',')
                    row.zgxm = name.join(',')
                    this.$emit('getData',row)
                }
            },
        }
    }
</script>

<style scoped>

</style>
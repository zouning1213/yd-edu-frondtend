<template>
    <!--选择班级弹窗-->
    <div class="arranging-course-dialog">
        <!--系统推荐-->
        <div class="choose-list mb-30">
            <div class="title"><h3 class="text-blue">
                <span class="line bg-skin"></span>已选择班级
                <label>(需要选中{{min}}个班级)</label></h3>
            </div>
            <ul v-if="checked.length > 0" class="content clearfix">
                <li v-for="(item,index) in checked" :key="index">
                    <el-checkbox :label="item" name="teacher1" :disabled="true">
                        <div class="cancel-checked" v-show="row.bh.split(',')[0] != item"
                             @click="deleteData(item,index)">
                            <i class="el-icon-circle-close text-red"></i>
                        </div>
                        <!--<p>{{row.bh.split(',')[0]}},{{item}}</p>-->
                        <p class="line-1">{{listBh[item].bjmc || '暂无名称'}}({{listBh[item].xsrs || 0}}人)</p>
                    </el-checkbox>
                </li>
            </ul>
        </div>
        <!--自助选择-->
        <div class="choose-list">
            <div class="title"><h3 class="text-blue">
                <span class="line bg-skin"></span>可选择班级
                <label>(最多可选{{min}}个班级,如果遇到选择班级数量不够,系统会自动进行填补)</label></h3>
            </div>
            <ul v-if="checked.length > 0" class="content clearfix">
                <el-checkbox-group v-model="checked">
                    <li v-for="(item,index) in listBh" :key="index" :class="{active:checked.includes(item.bh)}">
                        <!--默认的班号row.bh 是必选的, 当可选数量大于 min 是禁止选中 但是已经选中的是可以删除的 -->
                        <el-checkbox :label="item.bh" name="teacher"
                                     :disabled="row.bh.split(',')[0] == item.bh ||
                                      checked.length >= min && !checked.includes(item.bh)">
                            <!--:disabled="checked.length <= 1 ? checked.includes(item.bh) : false"-->
                            <!--选中图标-->
                            <div v-show="checked.includes(item.bh)" class="checked">
                                <i class="yd icon-checked-o icon-skin"></i>
                            </div>
                            <!--<p>{{row.bh.split(',')[0]}},{{item.bh}}</p>-->
                            <p>{{item.bjmc}}({{item.xsrs}}人)</p>
                        </el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:"check-classInfo-dialog",
        props:['min','row'],
        data() {
            return {
                listBh:[], //职工号为键值对
                checked:[], //选中的
            }
        },
        created() {
            this.getData()
        },
        methods:{
            getData() {
                this.checked = []
                this.listBh = []
                this.$POST('/timesheetTask/recommendClassInfo',this.row,{
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }
                ).then((res) => {
                    //等于理论课 并且三班合并或者俩班合并的时候走推荐
                    if (this.row.kcxz == 1 && this.row.jxfs != 1) {
                        this.checked = this.getCheckedZgh(res.data.classRecommd)
                    } else {
                        this.checked = this.row.bh.split(',')
                    }
                    this.listBh = this.getListZgh(res.data.classList)
                })
            },
            //转换数据格式
            getCheckedZgh(data) {
                let arr = []
                data.forEach(item => {
                    arr.push(item.bh)
                })
                return arr
            },
            getListZgh(data) {
                let arr = {}
                data.forEach(item => {
                    arr[item.bh] = item
                })
                return arr
            },
            deleteData(item,index) {
                this.$delete(this.checked,index,1)
            },
            sendData() {
                if (this.checked.length < this.min && Object.keys(this.listBh).length > this.min) {
                    this.$message.error('需要选中' + this.min + '个班级');
                } else {
                    let row = this.row
                    let name = []
                    this.checked.forEach(item => {
                        name.push(this.listBh[item].bjmc)
                    })
                    row.bh = this.checked.join(',')
                    row.bjmc = name.join(',')
                    row.yxj = this.checked.length > 0? 9 :99
                    this.$emit('getClassInfoData',row)
                }
            },
        }
    }
</script>

<style scoped>

</style>
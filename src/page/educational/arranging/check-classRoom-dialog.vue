<template>
    <!--选择教室弹窗-->
    <div class="arranging-course-dialog">
        <!--系统推荐-->
        <div class="choose-list mb-30">
            <div class="title"><h3 class="text-blue">
                <span class="line bg-skin"></span>已选择教室
                <label>(需要选中{{min}}个教室)</label></h3>
            </div>
            <ul class="content clearfix">
                <li v-for="(item,index) in checked" :key="index">
                    <el-checkbox :label="item" name="teacher1" :disabled="true">
                        <div class="cancel-checked" @click="deleteData(item,index)">
                            <i class="el-icon-circle-close text-red"></i>
                        </div>
                        <p class="line-1">{{listJsh[item].jsmc || '暂无名称'}}(可容纳{{listJsh[item].rnrs || 0}}人)</p>
                        <p class="line-1">{{listJsh[item].zymc || '暂无名称'}}</p>
                    </el-checkbox>
                </li>
            </ul>
        </div>
        <!--自助选择-->
        <div class="choose-list">
            <div class="title"><h3 class="text-blue">
                <span class="line bg-skin"></span>可选择教室
                <!-- <label>(建议不超过{{min*2}}个教师)</label>--></h3>
            </div>
            <ul class="content clearfix">
                <el-checkbox-group v-model="checked">
                    <li v-for="(item,index) in listJsh" :key="index" :class="{active:checked.includes(item.jsh)}">
                        <!--<p>{{item.jsh}}</p>-->
                        <el-checkbox :label="item.jsh" name="teacher">
                            <!--:disabled="checked.length <= 1 ? checked.includes(item.zgh) : false"-->
                            <!--选中图标-->
                            <div v-show="checked.includes(item.jsh)" class="checked">
                                <i class="yd icon-checked-o icon-skin"></i>
                            </div>
                            <p class="line-1">{{item.jsmc || '暂无名称'}}(可容纳{{item.rnrs || 0}}人)</p>
                            <p class="line-1">{{item.zymc || '暂无名称'}}</p>
                        </el-checkbox>
                    </li>
                </el-checkbox-group>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:"check-classRoom-dialog",
        props:['min','row','is_recommend'],
        data() {
            return {
                listJsh:[], //职工号为键值对
                checked:[] //选中的
            }
        },
        mounted() {
            this.getData()
        },
        methods:{
            getData() {
                this.$POST('/timesheetTask/recommendClassRoom',this.row,{
                        transformRequest:function (data) {
                            return JSON.stringify(data);
                        },
                        headers:{'Content-Type':'application/json'}
                    }
                ).then((res) => {

                    this.listJsh = res.data.roomList != []? this.getListZgh(res.data.roomList) :[]

                    //实训课
                    if (this.row.kcxz == '1') {
                        if (this.row.jsh == '') {
                            this.checked = res.data.roomRecommd != []? this.getCheckedZgh(res.data.roomRecommd) :[]
                        } else {
                            this.checked = this.row.jsh == ''? [] :this.row.jsh.split(',')
                        }
                    }
                    //理论课
                    if (this.row.kcxz == '2') {
                        if (this.row.jsh == '' || this.is_recommend) {
                            this.checked = res.data.roomRecommd != []? this.getCheckedZgh(res.data.roomRecommd) :[]
                        } else if (this.row.jsh == '' || !this.is_recommend) {
                            this.checked = this.row.jsh == ''? [] :this.row.jsh.split(',')
                        } else if (this.row.jsh != '' || this.is_recommend) {
                            this.checked = res.data.roomRecommd != []? this.getCheckedZgh(res.data.roomRecommd) :[]
                        } else if (this.row.jsh != '' || !this.is_recommend) {
                            this.checked = this.row.jsh == ''? [] :this.row.jsh.split(',')
                        }
                    }

                    /* if (this.row.kcxz == '1' || (this.row.kcxz == '2' && this.is_recommend)) {
                         this.checked = res.data.roomRecommd != []? this.getCheckedZgh(res.data.roomRecommd) :[]
                     } else {
                         this.checked = this.row.jsh == ''? [] :this.row.jsh.split(',')
                     }*/
                })
            },
            //转换数据格式
            getCheckedZgh(data) {
                let arr = []
                data.forEach(item => {
                    arr.push(item.jsh)
                })
                return arr
            },
            getListZgh(data) {
                let arr = {}
                data.forEach(item => {
                    arr[item.jsh] = item
                })
                return arr
            },
            deleteData(item,index) {
                this.$delete(this.checked,index,1)
            },
            sendData() {
                let row = this.row
                let name = []
                this.checked.forEach(item => {
                    name.push(this.listJsh[item].jsmc)
                })
                row.jsh = this.checked.join(',')
                row.jsmc = name.join(',')
                this.$emit('getClassRoomData',row)

                /*  if (this.checked.length < 1) {
                      this.$message.error('需要选中' + this.min + '个教室');
                  } else {
                      let row = this.row
                      let name = []
                      this.checked.forEach(item => {
                          name.push(this.listJsh[item].jsmc)
                      })
                      row.jsh = this.checked.join(',')
                      row.jsmc = name.join(',')
                      this.$emit('getClassRoomData',row)
                  }*/
            },
        }
    }
</script>

<style scoped>

</style>
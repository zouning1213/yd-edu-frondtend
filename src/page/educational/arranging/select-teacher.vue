<template>
    <!--课表查询选择教师-->
    <div>
        <!--选择院系-->
        <div class="el-row filter-item">
            <el-col :span="2"><span class="tip">选择院系:</span></el-col>
            <el-col :span="20">
                <ul class="checked-ul">
                    <el-checkbox-group v-model="yxid" @change="changeYX">
                        <li v-for="(item,index1) in yxList" :key="index1">
                            <el-checkbox :label="item.yxid" name="yxList">{{item.yxid}}{{item.yxmc}}</el-checkbox>
                        </li>
                    </el-checkbox-group>
                </ul>
            </el-col>
            <el-col :span="2"></el-col>
        </div>
        <div class="el-row filter-item">
            <el-col :span="2"><span class="tip">选择教研组:</span></el-col>
            <el-col :span="20">
                <ul v-if="ksList.length > 0" class="checked-ul">
                    <el-checkbox-group v-model="ksid" @change="changeKsid">
                        <li v-for="(item,index1) in ksList" :key="index1">
                            <el-checkbox :label="item.ksid" name="ksList">{{item.ksmc}}</el-checkbox>
                        </li>
                    </el-checkbox-group>
                </ul>
                <template v-else>
                    <el-button type="text" disabled>当前院系下暂无教研组,请更换院系查询</el-button>
                </template>
            </el-col>
        </div>
        <div :class="['el-row', 'filter-item', is_checked ? 'checked-border':'']">
            <template v-if="ksid.length > 0">
                <el-col :span="2"><span class="tip">选择教师:</span></el-col>
                <template v-if="jsList.length > 0">
                    <el-col :span="20">
                        <ul class="checked-ul"><!--教师-->
                            <el-checkbox-group v-model="jsid" @change="changeJsid">
                                <li v-for="(item,index3) in jsList" :key="index3">
                                    <el-checkbox :label="item.jsid" name="teacher">{{item.xm}}</el-checkbox>
                                </li>
                            </el-checkbox-group>
                        </ul>
                        <div v-show="is_checked" style="margin-top: 10px">
                            <el-button size="mini" @click="searchData" type="primary">多课表查询</el-button>
                            <el-button size="mini" @click="setAllChecked">{{is_all == true ? '反选':'全选'}}</el-button>
                        </div>
                    </el-col>
                    <el-col :span="2" class="text-right">
                        <el-button size="mini" @click="setChecked">
                            <template v-if="!is_checked"><i class="el-icon-plus"></i>多选</template>
                            <template v-else><i class="el-icon-minus"></i>单选</template>
                        </el-button>
                    </el-col>
                </template>
                <template v-else>
                    <el-col :span="20">
                        <el-button type="text" disabled>当前教研组下暂无教师,请更换教研组查询</el-button>
                    </el-col>
                </template>
            </template>
        </div>
        <el-col v-if="params.keys != ''" :span="22" :offset="1">
            <yd-schedule ref="ydSchedule" :params="params"></yd-schedule>
        </el-col>
    </div>
</template>

<script>
    import ydSchedule from '../../../components-page/schedule/yd_schedule_black'

    export default {
        name:"check-teacher",
        components:{
            ydSchedule
        },
        data() {
            return {
                yxid:'',
                yxList:[],
                ksList:[],
                ksid:[],
                jsList:[],
                jsid:[],
                is_all:false, //是否全选
                is_checked:false,//是否多选
                params:{
                    mark:'teacherInfo',
                    keys:'',
                    name:''
                }
            }
        },
        created() {
            //获取院系列表
            this.$GET('/collegeInfo/list',{limit:9999,page:1}).then((res) => {
                this.yxList = res.data
                this.yxid = [this.yxList[0].yxid]
                this.getKsList()
            })
        },
        methods:{
            changeYX() {
                if (this.yxid.length > 1) {
                    this.yxid.shift();
                }
                this.getKsList()
            },
            getKsList() {
                this.ksid = []
                let params = {
                    limit:999999,
                    page:1,
                    yxid:this.yxid.join(',')
                }
                this.$GET('/departmentInfo/queryDepartmentInfoByYXBM',params).then((res) => {
                    this.ksList = res.data
                    if (this.ksList.length > 0) {
                        this.ksid = [res.data[0].ksid]
                        this.getJsList()
                    }
                })
            },
            getJsList() {
                let params = {
                    limit:999999,
                    page:1,
                    ksid:this.ksid.join(',')
                }
                this.$GET('/teacherInfo/list',params).then((res) => {
                    this.jsList = res.data
                    if (this.jsList.length > 0) {
                        this.jsid = [res.data[0].jsid]
                        this.params.keys = this.jsid.join(',')
                        this.params.name = res.data[0].xm
                        this.getBjList()
                    }
                })
            },
            changeKsid() {
                if (this.ksid.length > 1) {
                    this.ksid.shift();
                }
                this.getJsList()
            },
            changeJsid() {
                if (this.jsid.length > 1 && !this.is_checked) {
                    this.jsid.shift();
                }
                this.setKeys()
            },
            setChecked() {
                this.is_checked = !this.is_checked
                if (!this.is_checked) {
                    this.jsid = [this.jsList[0].jsid]
                    this.setKeys()
                }
            },
            setAllChecked() {  //是否全选
                this.is_all = !this.is_all
                if (this.is_all) {
                    this.jsList.forEach(item => {
                        this.jsid.push(item.jsid)
                    })
                } else {
                    this.jsid = []
                }
            },
            setKeys() {
                if (this.jsid.length > 0) {
                    var index = this.jsList.map(function (item) {
                        return item.jsid;
                    }).indexOf(parseInt(this.jsid.join(',')));
                    this.params.name = this.jsList[index].xm
                }

                this.params.keys = this.jsid.join(',')
                this.$nextTick(() => {
                    this.$refs.ydSchedule.getSchedule()
                })
            },
            searchData() {
                this.params.keys = this.jsid.join(',')
                let routeData = this.$router.resolve({
                    name:"educational_schedule_all",
                    query:this.params
                });
                window.open(routeData.href,'_blank');
            },
        }
    }
</script>

<style scoped>

</style>
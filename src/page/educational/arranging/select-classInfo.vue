<template>
    <!--课表查询选择班级-->
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
            <el-col :span="2"><span class="tip">选择专业:</span></el-col>
            <el-col :span="20">
                <ul v-if="zyList.length > 0" class="checked-ul">
                    <el-checkbox-group v-model="zyid" @change="changeZyid">
                        <li v-for="(item,index1) in zyList" :key="index1">
                            <el-checkbox :label="item.zyid" name="zyList">{{item.zymc}}</el-checkbox>
                        </li>
                    </el-checkbox-group>
                </ul>
                <template v-else>
                    <el-button type="text" disabled>当前院系下暂无专业,请更换院系查询</el-button>
                </template>
            </el-col>
        </div>
        <template v-if="zyid.length > 0">
            <div :class="['el-row', 'filter-item', is_checked ? 'checked-border':'']">
                <el-col :span="2"><span class="tip">选择班级:</span></el-col>
                <template v-if="bjList.length > 0">
                    <el-col :span="20">
                        <ul class="checked-ul">
                            <el-checkbox-group v-model="bjid" @change="changeBjid">
                                <li v-for="(item,index3) in bjList" :key="index3">
                                    <el-checkbox :label="item.bjid" name="teacher">{{item.bjmc}}</el-checkbox>
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
                        <el-button type="text" disabled>当前专业下暂无班级,请更换班级查询</el-button>
                    </el-col>
                </template>
            </div>
            <el-col :span="22" :offset="1">
                <yd-schedule ref="ydSchedule" :params="params"></yd-schedule>
            </el-col>
        </template>
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
                zyList:[],
                zyid:[],
                bjList:[],
                bjid:[],
                is_all:false, //是否全选
                is_checked:false,//是否多选
                params:{
                    mark:'classInfo',
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
                this.getZyList()
            })
        },
        methods:{
            changeYX() {
                if (this.yxid.length > 1) {
                    this.yxid.shift();
                }
                this.getZyList()
            },
            getZyList() {
                this.zyid = []
                let params = {
                    limit:999999,
                    page:1,
                    yxid:this.yxid.join(',')
                }
                this.$GET('/collegeInfo/queryMajorByYXBM',params).then((res) => {
                    this.zyList = res.data
                    if (this.zyList.length > 0) {
                        this.zyid = [res.data[0].zyid]
                        this.getBjList()
                    }
                })
            },
            getBjList() {
                this.bjid = []
                let params = {
                    limit:999999,
                    page:1,
                    zyid:this.zyid.join(',')
                }
                this.$GET('/classInfo/list',params).then((res) => {
                    this.bjList = res.data
                    if (res.data.length > 0) {
                        this.bjid = [res.data[0].bjid]
                        this.params.keys = this.bjid.join(',')
                        this.params.name = res.data[0].bjmc
                    }
                    this.setKeys()
                })
            },
            changeZyid() {
                if (this.zyid.length > 1) {
                    this.zyid.shift();
                }
                this.getBjList()
            },
            changeBjid() {
                if (this.bjid.length > 1 && !this.is_checked) {
                    this.bjid.shift();
                }
                this.setKeys()
            },
            setChecked() {
                this.is_checked = !this.is_checked
                if (!this.is_checked) {
                    this.bjid = [this.bjList[0].bjid]
                    this.setKeys()
                }
            },
            setAllChecked() {  //是否全选
                this.is_all = !this.is_all
                if (this.is_all) {
                    this.bjList.forEach(item => {
                        this.bjid.push(item.bjid)
                    })
                } else {
                    this.bjid = []//设置清空
                }
            },
            setKeys() {
                if (this.bjid.length > 0) {
                    var index = this.bjList.map(function (item) {
                        return item.bjid;
                    }).indexOf(parseInt(this.bjid.join(',')));
                    this.params.name = this.bjList[index].bjmc
                }
                this.params.keys = this.bjid.join(',')
                this.$nextTick(() => {
                    this.$refs.ydSchedule.getSchedule()
                })
            },
            searchData() {
                this.params.keys = this.bjid.join(',')
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
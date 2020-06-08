<template>
    <!--课表查询选择教室-->
    <div>
        <!--    <div v-show="false" class="el-row filter-item">
                <el-col :span="2"><span class="tip">选择专业:</span></el-col>
                <el-col :span="20">
                    <ul class="checked-ul">
                        <el-checkbox-group v-model="zyid" @change="changeZyid">
                            <li v-for="(item,index1) in zyList" :key="index1">
                                <el-checkbox :label="item.zyid" name="zyList">{{item.zymc}}</el-checkbox>
                            </li>
                        </el-checkbox-group>
                    </ul>
                </el-col>
                <el-col :span="2"></el-col>
            </div>-->
        <div class="el-row filter-item">
            <el-col :span="2"><span class="tip">选择教学楼:</span></el-col>
            <el-col :span="20">
                <ul class="checked-ul">
                    <el-checkbox-group v-model="jxlid" @change="changeJxlid">
                        <li v-for="(item,index1) in jxlList" :key="index1">
                            <el-checkbox :label="item.jxlid" name="zyList">{{item.jxlmc}}</el-checkbox>
                        </li>
                    </el-checkbox-group>
                </ul>
            </el-col>
            <el-col :span="2"></el-col>
        </div>
        <div :class="['el-row', 'filter-item', is_checked ? 'checked-border':'']">
            <el-col :span="2"><span class="tip">选择教室:</span></el-col>
            <template v-if="jsList.length > 0">
                <el-col :span="20">
                    <ul class="checked-ul">
                        <el-checkbox-group v-model="jsh" @change="changeJsh">
                            <li v-for="(item,index3) in jsList" :key="index3">
                                <el-checkbox :label="item.jsh" name="teacher">{{item.jsmc}}</el-checkbox>
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
                    <el-button type="text" disabled>暂无教室</el-button>
                </el-col>
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
                zyList:[],
                zyid:[],
                jxlList:[],
                jxlid:[],
                jsList:[],
                jsh:[],
                is_all:false, //是否全选
                is_checked:false,//是否多选
                params:{
                    mark:'classRoom',
                    keys:'',
                    name:''
                }
            }
        },
        created() {
            this.getJxlList()
        },
        methods:{
            /* getYxid(yxid) {
                 this.yxid = []
                 this.jxlid = []
                 this.jsh = []
                 this.yxid = yxid.join(',')
                 this.getJxlList()
             },
             changeZyid() {
                 if (this.zyid.length > 1) {
                     this.zyid.shift();
                 }
                 this.getJsList()
             },
             getZyList() {
                 this.zyid = []
                 let params = {
                     limit:999999,
                     page:1,
                     yxid:this.yxid
                 }
                 this.$GET('/collegeInfo/queryMajorByYXBM',params).then((res) => {
                     this.zyList = res.data
                     if (this.zyList.length > 0) {
                         this.zyid = [res.data[0].zyid]
                         this.getJsList()
                     }
                 })
             },*/
            getJxlList() {
                this.$GET('/teachingBuilding/list',{limit:9999,page:1}).then((res) => {
                    if (res.code == 200) {
                        this.jxlList = res.data
                        this.jxlid = [res.data[0].jxlid]
                        this.getJsList()
                    }
                })
            },
            getJsList() {
                let params = {
                    jxlid:this.jxlid.join(',')
                }
                this.$GET('/classRoom/getByjxlid',params).then((res) => {
                    //console.log(res.data)
                    this.jsList = res.data
                    if (this.jsList.length > 0) {
                        this.jsh = [res.data[0].jsh]
                        this.setKeys()
                    }
                })
            },
            changeJxlid() {
                if (this.jxlid.length > 1) {
                    this.jxlid.shift();
                }
                this.getJsList()
            },
            changeJsh() {
                if (this.jsh.length > 1 && !this.is_checked) {
                    this.jsh.shift();
                }
                this.setKeys()
            },
            setChecked() {
                this.is_checked = !this.is_checked
                if (!this.is_checked) {
                    this.jsh.shift();
                    this.jsh = [this.jsList[0].jsh]
                    this.setKeys()
                }
            },
            setAllChecked() {  //是否全选
                this.is_all = !this.is_all
                if (this.is_all) {
                    this.jsList.forEach(item => {
                        this.jsh.push(item.jsh)
                    })
                } else {
                    this.jsh = []
                }
            },
            setKeys() {
                if (this.jsh.length > 0) {
                    var index = this.jsList.map(function (item) {
                        return item.jsh;
                    }).indexOf(parseInt(this.jsh.join(',')));
                    this.params.name = this.jsList[index].jsmc
                }
                this.params.keys = this.jsh.join(',')
                this.$nextTick(() => {
                    this.$refs.ydSchedule.getSchedule()
                })
            },
            searchData() {
                this.params.keys = this.jsh.join(',')
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

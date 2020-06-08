<template>
    <!--学生报到统计-->
    <div class="manage-school-registration">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="6">
                <div class="title-icon icon-skin"><i class="yd icon-school-roll"></i></div>
                <h3>学生报到统计</h3>
            </el-col>
            <el-col :span="18" class="text-right">
                <el-button type="success"><a style="color:#FFF;" :href="motaiform.exportResult">导出统计结果</a></el-button>
                <el-button type="success"><a style="color:#FFF" :href="motaiform.exportPeople">导出未报到人员</a></el-button>
            </el-col>
        </el-row>
        <div class="yd-bg">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick(activeName)" class="isconfig-mb-1">
                <el-tab-pane v-for="(item,index) in xlOptions" :key="index" style="margin-bottom:2px"
                             :name="item.XLBH">
                    <template slot="label">
                        <p>{{item.XLBH.substr(0,4)}}{{item.XLBH.substr(-2)=='01'?'上学期':'下学期'}}</p>
                    </template>
                    <div class="common-pd clearfix" :style="{'minHeight':minHeight+'px'}">
                        <el-row class="mt-10" style="margin-bottom:24px">
                            <el-col :span="12">
                                <el-radio-group v-model="tabPositionList" @change="isNjChange">
                                    <el-radio-button :label="tabPosition">{{tabPosition}}级</el-radio-button>
                                    <el-radio-button :label="tabPosition-1">{{tabPosition-1}}级</el-radio-button>
                                    <el-radio-button :label="tabPosition-2">{{tabPosition-2}}级</el-radio-button>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="12" class="text-right">
                                <ul class="registration-total">
                                    <li>
                                        <p>已报到总人数:<span class="text-blue">{{allybd}}</span></p>
                                    </li>
                                    <li>
                                        <p>未报到总人数:<span class="text-red">{{allwbd}}</span></p>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                        <el-collapse v-model="activeNames" @change="handleChange"
                                     v-for="(item,index) in bdOptions"
                                     :key="index">
                            <el-collapse-item :name="index">
                                <div slot="title" class="registration-title">
                                    <i class="el-icon-caret-top"></i>
                                    <i class="el-icon-s-order"></i>
                                    <span class="name">{{item.yxmc}}</span>
                                    (<label>已报到 :<span class="text-blue mr-10">{{item.yxbdrs}}</span></label>
                                    <label>未报到 :<span class="text-red  ">{{item.yxwdrs}}</span></label>)
                                </div>
                                <div v-if="item.classList.length > 0">
                                    <div class="registration-item"
                                         v-for="(item2,index2) in item.classList" :key="index2"
                                         @click="showWbdrs(item2.bjid)">
                                        <p class="line-1">{{item2.bjmc}}</p>
                                        <p>班主任：{{item2.bzrmc}}</p>
                                        <p>已报到：{{item2.bdrs}} 未报到：<span class="text-red">{{item2.wbdrs}}</span></p>
                                    </div>
                                </div>
                                <div v-else class="registration-tip">
                                    <p>暂无报到数据</p>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
            <el-table
                    border
                    :header-cell-style="()=>{return 'backgroundColor:#F3F5F7'}"
                    :data="motaiData"
                    stripe
                    empty-text="暂无未报到学生"
                    :max-height="(this.$store.state.minClientHeight*0.6) + 'px'"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="bjmc"
                        label="班级"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="xm"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="xh"
                        label="学号">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="bdzt"
                        label="状态">
                    <template slot-scope="scope">
                        <span class="text-red">{{scope.row.bdzt=='0'?"未报到":"已报到"}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'manage-school-registration',
        components:{},
        data() {
            return {
                minHeight:this.$store.state.minClientHeight - 230,
                xlOptions:[],
                dialogTableVisible:false,
                activeName:'',
                tabPosition:'',
                tabPositionList:'',
                activeNames:['1'],
                bdOptions:[],
                motaiData:[],
                allybd:'',
                allwbd:'',
                motaiform:{
                    exportResult:setting.remoteHost + '',
                    exportPeople:setting.remoteHost + '',
                }
            }
        },
        created() {
            //拿校历的接口
            this.$GET("/reportInfo/queryXlbh").then((res) => {
                this.xlOptions = res.data
                this.activeName = res.data[0].XLBH
                this.handleClick(this.activeName)
            })
        },
        methods:{
            isNjChange() {
                // 选择的哪个年级
                // console.log(this.tabPositionList)
                this.getListData()
            },
            searchStudent() {

            },
            handleClick(tab) {
                let a = tab.substr(0,4)
                this.tabPositionList = a
                this.tabPosition = a
                //选择的哪个学期
                // console.log(tab)
                this.motaiform.exportResult = setting.remoteHost + '/reportInfo/exportReportInfo?xq=' + tab + '&xjs=' + a + ',' + (a - 1) + ',' + (a - 2),
                    this.motaiform.exportPeople = setting.remoteHost + '/reportInfo/unReportStudent?xq=' + tab + '&xjs=' + a + ',' + (a - 1) + ',' + (a - 2),
                    this.getListData()
            },
            handleChange(val) {
                // console.log(val);
            },
            //show未报到人数
            showWbdrs(bjid) {
                //拿xj xq的啊啊啊
                let a = ''
                this.$GET("/reportInfo/querydqxq",{xq:this.activeName,xj:this.tabPositionList}).then((res) => {
                    a = res.data || ''
                }).then(() => {
                    this.$GET("/reportInfo/queryStudentListByBjidAndWbd",{bjid:bjid,dqxq:a}).then((res) => {
                        this.motaiData = res.data || []
                    })
                    this.dialogTableVisible = true
                })
            },
            //根据
            getListData() {
                this.$GET("/reportInfo/queryBDZTByXQAndXj",{xj:this.tabPositionList,xq:this.activeName}).then((res) => {
                    this.allybd = res.data.ztbdrs
                    this.allwbd = res.data.ztwdrs
                    this.bdOptions = res.data.collegeList
                })
            }
        }
    }
</script>

<style lang='less'>
    .manage-school-registration {
        .registration-title {
            font-size: 16px;
            i {
                font-size: 16px;
                color: #999;
            }
            .el-icon-s-order {
                margin-right: 3px;
            }
            label {
                padding: 0 4px;
                span {
                    margin-left: 4px;
                }
            }
            .mr-10 {
                margin-right: 8px;
            }
        }
        .registration-item {
            cursor: pointer;
            display: inline-block;
            margin: 0 15px 20px 0;
            width: 200px;
            padding: 20px;
            background-color: #F3F5F7;
            p {
                font-size: 14px;
                color: rgba(0, 0, 0, 1);
            }
        }
        .registration-total {
            li {
                display: inline-block;
                margin-left: 45px;
                p {
                    font-size: 14px;
                    color: #1C1C1C;
                    span {
                        margin-left: 12px;
                        font-size: 28px;
                        vertical-align: middle;
                        line-height: 32px;
                    }
                }
            }
        }
        .registration-tip {
            padding-bottom: 20px;
            p {
                color: #999;
            }
        }
        .el-collapse-item {
            .el-collapse-item__wrap {
                border-bottom: 1px solid #fff;
            }
            .el-collapse-item__header {
                border-bottom: 1px solid #fff;
                .el-collapse-item__arrow {
                    font-size: 16px;
                    color: #999;
                }
                .el-icon-caret-top {
                    transition: all .5s;
                }
                &.is-active {
                    .el-icon-caret-top {
                        transition: all .5s;
                        -webkit-transform: rotate(180deg);
                        transform: rotate(180deg);
                    }
                }
            }
            .el-collapse-item__content {
                padding-left: 43px;
                padding-bottom: 0;
            }
        }
        .el-radio-button--medium .el-radio-button__inner {
            font-size: 16px;
            padding: 7px 20px;
        }
    }
</style>

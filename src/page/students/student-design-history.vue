<template>
    <!--开始评教-->
    <div class="yd-student-design">
        <el-row class="yd-router-title yd-bg">
            <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
            <h3>历史评教</h3>
        </el-row>
        <!--历史评教-->
        <div class="common-pd yd-bg"
             :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <el-radio-group v-model="nf" style="margin-bottom: 20px;" @change="nfChange">
                <el-radio-button v-for="(item,index) in nfList" :key="index"
                                 :label="item.nf">{{item.nf}}年
                </el-radio-button>
            </el-radio-group>
            <ul v-if="historyList.length > 0" class="history-design-ul">
                <li class="history-block" v-for="(item,index) in historyList" :key="index">
                    <el-image v-if="item.ZP" style="width: 107px; height: 150px"
                              :src="imageAddress + item.ZP"
                              fit="cover"></el-image>
                    <el-image v-else style="width: 107px; height: 150px"
                              :src="require('@/assets/no-tip-img/no-avatar-write.jpg')"
                              fit="cover"></el-image>
                    <h3>{{item.XM}}</h3>
                    <h4>综合评分：{{item.ZF}}</h4>
                    <el-button @click="lookScore(item.PFID)" type="text" size="small">查看明细</el-button>
                    <p>评教日期:{{item.PJSJ.substring(0,10)}}</p>
                </li>
            </ul>
            <div v-else class="no-design-tip">
                <img src="./img/evaluation-design.png"/>
                <p>暂无评教的历史记录</p>
            </div>
        </div>
        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="680px">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    :max-height="(this.$store.state.minClientHeight*0.5) + 'px'">
                <el-table-column
                        prop="XMMC"
                        label="评教项目">
                </el-table-column>
                <el-table-column
                        prop="FS"
                        label="分数"
                        align="center"
                        width="80">
                        <template slot-scope="scope">
                            <p>{{scope.row.FS||'-'}}</p>
                        </template>
                </el-table-column>
            </el-table>
            <div class="mt-20" style="padding: 0 6px">
                <p>意见: {{tableJybz || '无'}}</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import './css/student-design.less'

    export default {
        name:"test",
        data() {
            return {
                nf:'',
                nfList:[],
                historyList:[],
                xsid:JSON.parse(localStorage.getItem("user")).xsid, //学生id
                //查看明细
                dialogVisible:false,
                tableData:[],
                tableJybz:''
            }
        },
        created() {
            //历史评教年份
            this.$GET('/evaluationTask/queryNfByPj',{xsid:this.xsid}).then(res => {
                this.nfList = res.data
                if (this.nfList.length > 0) {
                    this.nf = this.nfList[0].nf
                    this.getHistory()
                }
            })
        },
        methods:{
            //年份更改
            nfChange(){
                console.log(this.nf)
                this.getHistory()
            },
            getHistory() {
                this.$GET('/evaluationTask/queryScoreInfoByNf',{nf:this.nf,xsid:this.xsid}).then(res => {
                    if (res.code == 200) {
                        this.historyList = res.data
                    }
                })
            },
            lookScore(PFID) {
                this.tableData = []
                this.tableJybz = ''
                this.dialogVisible = true
                this.$GET('/teacherscoreInfo/detail',{pfid:PFID}).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.teacherscoreDetailsList
                        this.tableJybz = res.data.jybz
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .student-evaluation-design {
        .evaluation-item-wrap {
            border-bottom: 1px solid rgba(243, 245, 247, 1);
            padding: 10px 0 20px 0;
            .evaluation-item-left {
                text-align: center;
                min-width: 110px;
                img {
                    width: 107px;
                    height: 155px;
                }
            }
            .evaluation-item-li {
                padding: 5px 15px 5px 0;
                min-width: 520px;
                border-bottom: 1px solid rgba(243, 245, 247, 1);
            }
            .evaluation-item-right-content {
                padding-left: 30px;
                h4 {
                    font-size: 17px;
                    margin-bottom: 10px;
                }
            }

        }
        .evaluation-item-wrap-history {
            transform: translateX(2px);
            padding-left: 20px;
            padding-right: 30px;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .evaluation-item-bottom {
                padding: 10px 0;
                h4 {
                    font-size: 14px;
                }
                p {
                    line-height: 20px;
                }
                span {
                    color: rgba(204, 204, 204, 1);
                }
            }
            &:nth-last-child(1) {
                border-bottom: none;
            }
            &:nth-last-child(2) {
                border-bottom: none;
            }

        }
        .yd-content-tip {
            text-align: center;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            h3 {
                font-size: 26px;
                color: #333;
            }
            span {
                display: block;
                font-size: 17px;
                margin-top: 5px;
                color: rgba(255, 0, 0, 1);
            }
            img {
                width: 170px;
                margin: 20px 0;
                display: inline-block;
            }
            p {
                font-size: 14px;
                margin-top: 10px;
                color: rgba(204, 204, 204, 1);
                margin-bottom: 30px;
            }
        }
    }

</style>
<style lang="less">
    .student-evaluation-design {
        .el-tabs__header .el-tabs__item.is-active {
            color: #000 !important;
            background-color: #fff !important;
        }
        .el-textarea__inner {
            height: 90px !important;
        }
    }

</style>
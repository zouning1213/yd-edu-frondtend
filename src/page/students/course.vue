<template>
    <!-- 学生选课 -->
    <div class="yd-student-course">
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-self-fill"></i></div>
                <h3>学生选课</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请按课程关键字搜索" v-model="search1" class="input-with-select"
                          @keyup.enter.native="titleSearch">
                    <el-button slot="append" @click="titleSearch">搜索</el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 年级分类 -->
        <div class="yd-bg common-pd" :style="{'minHeight':(this.$store.state.minClientHeight-186)+'px'}">
            <!-- 选课的表格 -->
            <div class="yd-common-table yd-students-course">
                <el-table
                        border=""
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column label="课程序号" align="center" type="index" width="100">
                      <!--  <template slot-scope="scope">
                            <el-checkbox
                                    v-model="checkedHandle"
                                    :label="scope.row"
                                    :disabled="scope.row.count==scope.row.maxCount"
                                    @change="handleCheckedCitiesChange">
                            </el-checkbox>
                            {{scope.row.xkid <=9 ? '0' + scope.row.xkid : scope.row.xkid}}
                        </template>-->
                    </el-table-column>
                    <el-table-column prop="kc" label="课程" align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.kc||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kcnr" label="课程内容" align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">{{scope.row.kcnr||'-'}}</div>
                                <p class="line-2 line-2-zn" effect="light">{{scope.row.kcnr||'-'}}</p>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="授课教师" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.sklsmc||'-' }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="lsjj"
                            label="教师简介"
                            align="center">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="light" placement="top">
                                <div slot="content">{{scope.row.lsjj||'-'}}</div>
                                <p class="line-2 line-2-zn" effect="light">{{scope.row.lsjj||'-'}}</p>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="ks"
                            label="课时"
                            align="center">
                        <template slot-scope="scope">
                            <p>{{scope.row.ks||'-'}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-if="thetimenow"
                            label="学生容量"
                            align="center">
                        <template slot-scope="scope">
                            <div :class="[scope.row.dqrs==scope.row.kxrs ? 'text-red' : 'text-blue']"> 
                                <p>{{scope.row.dqrs=='0'?0:scope.row.dqrs?scope.row.dqrs:'-'}}/{{scope.row.kxrs}}</p>
                                <p v-if="scope.row.dqrs==scope.row.kxrs">已满</p>
                                <p v-show="checkedHandle.find(function(value){return value==scope.row})">已选</p>
                            </div>
                            <!-- <div v-if="scope.row.isselect" class="rongliang rongliang0">
                                <p>{{scope.row.count}}/80</p>
                                <p>已选</p>
                            </div> -->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="选择课程"
                            align="center"
                            v-if="thetimenow">
                        <template slot-scope="scope">
                            <!-- 遮挡层 -->
                            <div class="moban">
                                <el-checkbox
                                        :disabled="scope.row.dqrs==scope.row.kxrs"
                                        v-model="checkedHandle"
                                        :label="scope.row"
                                        @change="handleCheckedCitiesChange">
                                </el-checkbox>
                            </div>
                            <!-- {{ scope.row.id }} -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- 分页 -->
        <yd-page ref="ydPage" :url="`/studentLessonSelect/selectLessonList`"
                 :params="{xsid:xsid,condition:searchJS}" @changePage="changePage"></yd-page>

        <div class="yd-submit-course" v-if="!this.checkedHandle.length==0" ref="submitcourseBox">
            <div class="dl">
                <h2>您确定要选择 <span v-for="(item,index) in checkedHandle " :key="index">《{{item.kc}}》</span>作为必修课程吗</h2>
                <p>提示：每人最多选择2门课程</p>
            </div>
            <div class="dr">
                <el-button type="primary" @click="submitCourse">提交</el-button>
                <el-button @click="closeSubmit">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name:"course",
        components:{},
        data() {
            return {
                xsid:this.$store.state.userInfo.xsid,
                multipleSelection:[],
                value:'',
                search:'',
                search1:'',
                currentPage:1,
                checkedHandle:[],
                thetimenow:true,
                tableData:[],
            }
        },
        methods:{
            handleClick() {
                alert('button click');
            },
            indexMethod(index) {
                return index * 2;
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 多选框变化调用
            handleCheckedCitiesChange(val) {
                // console.log(this.checkedHandle)

                // console.log(val)

            },
            //分页调用
            changePage(data) {
                this.tableData = data || []
            },
            //提交选课
            submitCourse() {
                let selectedCourse = {
                   studentLessonSelectList  : this.checkedHandle,
                   xsid: this.$store.state.userInfo.xsid
                }
                // console.log(selectedCourse)
                //提交选课
                this.$POST('/studentLessonSelect/selectLesson',selectedCourse,{
                    transformRequest:function (data) {
                        return JSON.stringify(data);
                    },
                    headers:{'Content-Type':'application/json'}
                }).then((res) => {
                    if (res.code == 500) {
                        this.$message.error(res.message);
                    } else {
                        this.$message({
                            message:'提交成功了',
                            type:'success'
                        });
                    }
                    this.$refs.ydPage.getData()
                    this.checkedHandle = []
                    this.$refs.submitcourseBox.style = "display:none"
                })
            },
            //取消选课
            closeSubmit() {
                this.checkedHandle = []
                this.$refs.submitcourseBox.style = "display:none"
            },
            //标题搜索
            titleSearch() {
                this.search = this.search1
                this.$refs.ydPage.getData('search')
            },
            getTableData() {
                //tableData数据初始化
                this.$GET('/studentLessonSelect/selectLessonList',{
                    xsid:this.xsid,
                    limit:10,
                    page:1,
                    condition:this.search
                }).then((res) => {
                    // console.log("自助选课初始化")
                    // console.log(res)
                    this.tableData = res.data || []
                })
            }
        },
        created() {
        },
        computed:{
            searchJS() {
                this.getTableData()
                return this.search
            }
        }
    }
</script>

<style lang="less">
    .yd-student-course {
        .line-2-zn {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
        }
        .el-table__row {
            height: 65px;
        }
        .el-checkbox__label {
            display: none;
        }
        //选课时间
        .select-course-time {
            p {
                font-size: 16px;
                color: #3262EC;
                line-height: 36px;
                i {
                    font-size: 17px;
                    margin-right: 8px;

                }
            }
        }

        //提交选课
        .yd-submit-course {
            position: fixed;
            z-index: 999;
            left: 0;
            bottom: 0;
            padding: 15px 66px 15px 285px;
            width: 100%;
            height: 80px;
            background: rgba(255, 255, 255, 1);
            -webkit-box-shadow: 0px 5px 26px 1px rgba(0, 0, 0, 0.11);
            -moz-box-shadow: 0px 5px 26px 1px rgba(0, 0, 0, 0.11);
            box-shadow: 0px 5px 26px 1px rgba(0, 0, 0, 0.11);
            h2 {
                font-size: 20px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
            }
            p {
                font-size: 14px;
                color: rgba(204, 204, 204, 1);
            }
            div {
                float: right;
            }
            .dl {
                float: left;
            }
            .dr {
                line-height: 50px;
            }

        }

        .yd-students-course {
            .moban {
                .el-checkbox__label {
                    display: none;
                }
            }
        }
    }

</style>
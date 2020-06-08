<template>
    <!--通知公告-->
    <div>
        <el-row class="yd-router-title yd-bg">
            <el-col :span="4">
                <div class="title-icon icon-skin"><i class="yd icon-wenzhang"></i></div>
                <h3>通知公告</h3>
            </el-col>
            <el-col :span="20" class="text-right">
                <el-input placeholder="请输入通知公告标题" v-model="tosearch" class="input-with-select"
                          @keyup.enter.native="contentSearch">
                    <el-button slot="append" @click="contentSearch">搜索</el-button>
                </el-input>
                <el-button @click="handleClick()" type="primary" style="margin-left: 10px">添加通知公告</el-button>
            </el-col>
        </el-row>

        <!-- 通知公告 -->
        <div class="educational-manager-article common-pd yd-bg">
            <div class="article-top">
                <!-- <div class="yd-add-btn" @click="handleClick()"></div> -->
                <el-form :inline="true" label-width="120px">
                    <el-form-item label="通知公告类型：">
                        <el-radio v-model="radio" label="N">所有人查看</el-radio>
                        <el-radio v-model="radio" label="Y">教务内部查看</el-radio>
                    </el-form-item>
                    <el-form-item label=" " label-width="30px">
                        <el-dropdown>
                        <span class="el-dropdown-link">
                            时间排序<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="sort('asc')">升序</el-dropdown-item>
                                <el-dropdown-item @click.native="sort('desc')">降序</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-form-item>
                </el-form>
            </div>
            <ul class="manger-article-ulbox">
                <li v-for="(item, index) in tableData" :key="index">
                    <img class="fl article-img" src="./img/noticle.png" width="60" height="60" alt="">
                    <div class="article-title">
                        <div>
                            <h2 class="fl">{{item.title}}</h2>
                            <span class="article-title-time">{{item.createTime}}发布</span>
                            <p class="article-title-content line-1">{{item.contentText }}</p>
                        </div>
                    </div>
                    <div class="article-edit">
                        <el-button class="edit-btn" @click="handleClick(item)" type="text" size="small"><i
                                class="el-icon-edit"></i>编辑
                        </el-button>
                        <el-button class="del-btn" @click="delClick(item.noticeId)" type="text" size="small"><i
                                class="el-icon-delete"></i>删除
                        </el-button>
                    </div>
                </li>
            </ul>
        </div>

        <!--成绩管理详情编辑 查看弹窗-->
        <el-dialog v-if="dialogFormVisible" title="发布通知公告公告"
                   custom-class="article-model-dialog"
                   center width="660px"
                   :close-on-click-modal='false'
                   :visible.sync="dialogFormVisible"
                   @close='closeDialog'>
            <el-form label-position="top" :rules="rules" ref="ruleForm"
                     :model="form"
                     label-width="80px">
                <el-form-item label="通知公告标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-radio v-model="form.isOpend" label="N">所有人查看</el-radio>
                    <el-radio v-model="form.isOpend" label="Y">教务内部查看</el-radio>
                </el-form-item>
                <el-form-item label="">
                    <editor :height="200" :name="editorName"
                            :value="form.content" :uploadUrl="'/notice/editor/upload'"
                            v-model="form.content"
                            @change="function(html){form.content=html}">
                    </editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="articleSubmit">提 交</el-button>
                    <el-button @click="dialogFormVisible= false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <ydPage ref="ydPage" :url="'/notice/list'"
                :params="{isOpen:radios||'',condition:this.search||'',px:this.paixu||''}"
                @changePage="changePage"></ydPage>
    </div>
</template>

<script>
    import "../../page/educational/css/managerArticle.less"
    import editor from "../../components-page/common/editor"


    export default {
        name:"manager-article",
        components:{
            editor,
        },
        data() {
            return {
                search:'',
                tosearch:'',
                paixu:'desc',
                myflag:true,
                //tankuang  
                dialogFormVisible:false,
                editorName:'contentText',
                form:{//表单3项
                    content:"",
                    title:"",
                    isOpend:'',
                },
                noticeId:'',
                radio:'',
                tableData:[],
                rules:{
                    title:[
                        {required:true,message:'请输入通知公告标题',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            closeDialog() {
                // console.log("关闭")
                this.form.title = ''
                this.form.content = ''
                this.form.isOpend = ''
                this.noticeId = ''
                this.dialogFormVisible = false
            },
            //编辑
            handleClick(row) {
                if (row) {
                    //
                    this.$GET("/notice/detail/" + row.noticeId).then((res) => {
                        // console.log("下面根据id从服务器取的")
                        // console.log(res)
                        this.form.title = res.data.title || ''
                        this.form.content = res.data.content || ''
                        this.form.isOpend = res.data.isOpen || ''
                        this.noticeId = res.data.noticeId || ''

                        this.myflag = true

                        this.dialogFormVisible = true
                    })
                }
                else {
                    this.myflag = false

                    this.dialogFormVisible = true
                }
            },
            //删除
            delClick(noticeId) {
                this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(() => {
                    //删除
                    this.$GET("/notice/delete",{noticeId:noticeId}).then((res) => {
                        // console.log("库里删除成功")
                        //
                        this.$refs.ydPage.getData()
                    })
                    this.$message({
                        type:'success',
                        message:'删除成功!'
                    });
                })
            },
            //模态提交
            articleSubmit() {
                let subData = {
                    title:this.form.title,
                    content:this.form.content,
                    isOpen:this.form.isOpend,
                    noticeId:this.noticeId
                }
                // console.log(subData)
                if (subData.title == '') {
                    this.$message.error('请输入通知公告标题');
                } else if (subData.content == '') {
                    this.$message.error('请输入通知公告内容');
                } else {
                    this.$refs.ruleForm.validate((valid) => {
                        if (valid) {
                            if (this.myflag) {
                                //编辑请求
                                this.$POST("/notice/update",subData).then((res) => {
                                    this.$message({
                                        title:'成功',
                                        message:'编辑成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                    this.closeDialog()
                                })
                            } else {
                                //添加请求
                                this.$POST("/notice/add",subData).then((res) => {
                                    this.$message({
                                        title:'成功',
                                        message:'添加成功',
                                        type:'success'
                                    });
                                    this.$refs.ydPage.getData()
                                })
                            }
                        } else {
                            console.log('请输入通知公告标题');
                            return false;
                        }
                    });

                    this.dialogFormVisible = false
                }

            },
            //分页回调
            changePage(data) {
                this.tableData = data
            },
            searchArticle() {
                this.$GET("/notice/list",{
                    limit:10,
                    page:1,
                    isOpen:this.radio,
                    condition:this.search,
                    px:this.paixu || ''
                }).then((res) => {
                    this.tableData = res.data
                })
            },
            //事件排序
            sort(a) {
                this.paixu = a
            },
            //点击搜索按钮
            contentSearch() {
                this.search = this.tosearch
            }
        },
        computed:{
            radios() {
                this.searchArticle()
                return this.radio
            }
        }
    }
</script>

<style lang="less">
    // .el-radio__input.is-checked .el-radio__inner {
    //     border-color: red;
    //     background: red;
    // }
    // .el-radio__input.is-checked+.el-radio__label {
    //     color: red;
    // }
</style>

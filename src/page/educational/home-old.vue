<template>
    <!--首页-->
    <div class="yd-warp-home">
    <!-- 中间主体 -->
        <div class="home-block-wrap clearfix">
            <div class="wrap-top clearfix"> 
                <draggable  v-model="motaiform.yiyou" @update="datadragEnd" :options = "{animation:500}">
                    <transition-group> 
                        <!-- 动态组件 -->
                        <div class="home-block" :key="item.name" v-for="(item) in motaiform.yiyou">
                            <div class="home-block-list" >
                                <component :who="'jw'" :is="item.name"></component>
                            </div>
                        </div>  
                    </transition-group>
                </draggable>
            <!-- 添加模块...... --> 
                <div class="home-block"  slot="footer">
                    <div class="home-block-list">
                        <div class="addmokuai"  @click="clickAdd"> 
                            <h5><i class="yd icon-add"></i></h5>
                            <span>添加模块</span>
                        </div>
                    </div>
                </div> 
            </div> 
        </div>
    <!-- 模态 -->
        <el-dialog :close-on-click-modal='false' :visible.sync="dialogFormVisible" width="600px" class="home-module">
            <h2>已有模块</h2>
            <el-row>
                <el-col :span=6 v-for="(item,index) in motaiform.yiyou" :key="index">
                    <i :class="['yd',item.icon,'isicon']" :style="{color:item.color}"></i>
                    <h4>{{item.biaoti}}</h4>
                    <i class="el-icon-error del"  @click="delmk(item,index)"></i>
                </el-col> 
            </el-row>
            <h2>添加模块</h2> 
            <el-row>
                <el-col :span=6 v-for="(item,index) in motaiform.tianjia" :key="index">
                    <i :class="['yd',item.icon,'isicon']" :style="{color:item.color}"></i>
                    <h4>{{item.biaoti}}</h4>
                    <i class="el-icon-circle-plus add icon-skin" @click="addmk(item,index)"></i>
                </el-col> 
            </el-row>
            <div slot="footer" class="dialog-footer text-left">
                <el-button type="primary" @click="motaisubmit">保 存</el-button>
                <el-button @click="moaticancal">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import draggable from 'vuedraggable' 
    import "../../components-page/home/css/home.less"
    import homeCourse from "../../components-page/home/home-schedule"
    import homeMessagebox from "../../components-page/home/home-messagebox"
    import homeNotice from "../../components-page/home/home-notice"
    import homeProfessional from "../../components-page/home/home-professional"
    import homeManageteachers from "../../components-page/home/home-teachers"

    export default {
        name:"educationalHome",
        components:{
            draggable,
            homeCourse,
            homeMessagebox,
            homeNotice,
            // homeTelentplan,
            // homeTeachingplan,
            homeProfessional,
            // homeManageclass,
            homeManageteachers
        },
        data(){
            return{
                Myiyou : [],
                Mtianjia : [],
                search:'', 
                dialogFormVisible:false,
                motaiform:{
                    yiyou:[
                        {
                            name:'homeNotice',
                            icon:'icon-sign',
                            biaoti:'最新公告',
                            color:'#FF5763'
                        },
                        {
                            name:'homeSchoolcalendar',
                            icon:'icon-school-calendar',
                            biaoti:'校历',
                            color:'#FF5763'
                        }
                    ],
                    tianjia:[ 
                        // {
                        //     name:'homeTelentplan',
                        //     icon:'icon-test-search',
                        //     biaoti:'人才培养计划',
                        //     color:'#FF5763'
                        // },
                        // {
                        //     name:'homeTeachingplan',
                        //     icon:'icon-teaching-plan',
                        //     biaoti:'教学计划管理',
                        //     color:'#6173FA'
                        // },
                        {
                            name:'homeProfessional',
                            icon:'icon-course',
                            biaoti:'专业课程管理',
                            color:'##FFC541'
                        },  
                        // {
                        //     name:'homeManageclass',
                        //     icon:'icon-classroom',
                        //     biaoti:'班级管理',
                        //     color:'#8048DD'
                        // },
                        {
                            name:'homeManageteachers',
                            icon:'icon-teacher-resources',
                            biaoti:'教师管理',
                            color:'#FD8B62'
                        }
                    ]
                }
            }
        },
        methods:{
            //添加
            addmk(item,index){ 
                // console.log("添加模块") 
                this.motaiform.tianjia.splice(index,1)
                this.motaiform.yiyou.push(item) 
            },
            //删除
            delmk(item,index){
                // console.log('删除模块') 
                this.motaiform.yiyou.splice(index,1)
                this.motaiform.tianjia.push(item) 
            },
            //打开模态tinaija
            clickAdd(){
                this.Myiyou =  JSON.parse(JSON.stringify(this.motaiform.yiyou))
                this.Mtianjia = JSON.parse(JSON.stringify(this.motaiform.tianjia)) 
                this.dialogFormVisible = true
            },
            //点击确定保存
            motaisubmit(){
                localStorage.setItem("addlist",JSON.stringify(this.motaiform.tianjia))
                localStorage.setItem("sypaixu",JSON.stringify(this.motaiform.yiyou))
                this.dialogFormVisible = false
            },
            //点击取消保存
            moaticancal(){
                // console.log("点击取消")
                // console.log()
                // console.log() 
                this.motaiform.tianjia  = JSON.parse(JSON.stringify(this.Mtianjia))  
                this.motaiform.yiyou  = JSON.parse(JSON.stringify(this.Myiyou))  
                
                this.dialogFormVisible = false
            },
            getdata (evt) {
                // console.log(evt.draggedContext.element.text)
            },
            datadragEnd (evt) {
                evt.preventDefault();
                // console.log('拖动前的索引 :' + evt.oldIndex)
                // console.log('拖动后的索引 :' + evt.newIndex)   
                localStorage.setItem("sypaixu",JSON.stringify(this.motaiform.yiyou))
            } 
        },
        created(){
                let addlist = JSON.parse(localStorage.getItem("addlist"))||[]
                let paixu = JSON.parse(localStorage.getItem("sypaixu"))||[]
                if(paixu.length!=0){
                    this.motaiform.yiyou = paixu 
                    this.motaiform.tianjia = addlist
                }
        },
         mounted () {
	        //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
</script>

<style lang="less" scoped>
    .home-block-list{
        box-shadow: 0px 3px 25px 5px rgba(50,98,236,0.08);
        -webkit-box-shadow: 0px 3px 25px 5px rgba(50,98,236,0.08);
        -moz-box-shadow: 0px 3px 25px 5px rgba(50,98,236,0.08);
        border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        background-color: #fff;
        position: relative;
        //添加模块
        .addmokuai{
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -74px;
            margin-top: -74px;
            width:148px;
            height:148px;
            text-align: center;
            padding-top: 50px;
            border:2px dashed rgba(204,204,204,1);
            border-radius:50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            cursor: pointer;
        }
        .home-header{
            cursor: move;
            padding: 10px 35px 10px 20px;
            border-bottom: 1px solid rgba(237,240,246,1);
            h3{
                color: #333;
                font-weight: bold;
                line-height: 36px;
                font-size: 20px;
                margin: 0 20px 0 10px;
            }
            i{
                font-size: 20px;
                line-height: 36px;
            }
            span{
                font-size: 12px;
                color: #ccc;
                line-height: 36px;
                vertical-align: sub;
            }
            .el-dropdown-link{
                color: #333;
            }
            .el-icon-arrow-down{
                font-size: 12px;
            }
        }
        .home-content{
            padding: 0 35px 20px 20px;
            ul{
                li{
                    //padding: 11px 0; 样式影响到其他的首页板块
                    border-bottom: 1px solid rgba(237,240,246,1);
                    .isread{
                        display: inline-block;
                        width: 32px;
                        height: 20px;
                        margin-right: 20px;
                        background-color: red;
                        color: #fff;
                        font-size: 12px;
                        text-align: center;
                        line-height: 20px;
                    }
                }
            }
        }
        //校力的样式
        .content-calendar{
            padding: 30px 0 40px 0;
            >div{
                width: 50%;
            }
            .content-calendar-left{
                border-right: 1px solid #ccc;
                text-align: center;
                padding: 20px 0 30px 0;
                .img{
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                    background:linear-gradient(-63deg,rgba(255,74,71,1),rgba(255,142,86,1));
                    box-shadow: 0px 3px 7px 0px rgba(255,180,180,1);
                    -webkit-box-shadow: 0px 3px 7px 0px rgba(255,180,180,1);
                    -moz-box-shadow: 0px 3px 7px 0px rgba(255,180,180,1);
                    border-radius: 50%;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    i{
                        color: #fff;
                        font-size: 38px;
                        line-height: 80px
                    }
                }
            }
            .content-calendar-right{
                // border-left: 1px solid rgba(237,240,246,1);
                padding-left: 15px;
                li{
                    padding: 6px;
                }
            }
        }
    }
</style>
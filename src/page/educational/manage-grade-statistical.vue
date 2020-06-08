<template>
    <!--成绩管理统计-->
    <div class="yd-educational-grade yd-educational-grade-tongji">
        <el-row class="yd-router-title yd-bg manage-student-scourse mb-0 bd-1">
            <div class="title-icon icon-skin"><i class="yd icon-grade"></i></div>
            <h3>成绩统计</h3>
        </el-row>
            
        <el-row slot="searchwrap" class="yd-router-title yd-bg manage-student-scourse mt-0"> 
                <el-select  v-model="nf" placeholder="请选择"   class="mr-50 nianfen" @change="courseList" >
                    <el-option label="请选年份" value=""></el-option>
                    <el-option
                    v-for="item in nfOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select> 
                <el-select v-model="zyh" placeholder="请选择"  @change="courseList"  class="mr-50">
                    <!-- <el-option label="请选专业" value=""></el-option> -->
                    <el-option
                    v-for="item in zyhOptions"
                    :key="item.zyh"
                    :label="item.zymc"
                    :value="item.zyh">
                    </el-option>
                </el-select>  
                <el-select v-model="kq" placeholder="请选择"   class="mr-50"  @change="courseList">
                    <el-option label="请选考期" value=""></el-option>
                    <el-option
                    v-for="item in kqmcOptions"
                    :key="item.kq"
                    :label="item.kqmc"
                    :value="item.kq">
                    </el-option>
                </el-select> 
        </el-row>
        
        <el-row>
            <el-col  class="pr-1 w49 common-pd-warp">
                <div class="common-pd-header yd-bg">
                    <span>分数百分比</span>
                </div> 
                <div class="common-pd-content">
                     <div class="pd-content-header">
                         <div class="switch-warp switch">
                            <div :class="{'switch-class':true,'switch':true,'active-color':oneiswho=='班级1'}" @click="oneIsclass('班级1')">班级</div>
                            <div :class="{'switch-course':true,switch:true,'active-color':oneiswho=='课程1'}" @click="oneIsclass('课程1')">课程</div>
                         </div>
                         <span class="fr">
                             单位/分数
                         </span>
                     </div>
                     <el-row class="">
                         <el-col :span="12">
                             <div class="pd-content-content" id="c1"> 
                            </div>
                         </el-col> 
                         <el-col :span="12" class="">
                             <div class="content-class" v-show="oneiswho=='班级1'">
                                <el-checkbox-group v-model="oneClass"  @change="classhandleSelectionChange('1')" style="max-height: 380px;overflow: auto;">
                                    <el-checkbox label="">{{'所有班级'}}</el-checkbox> 
                                    <el-checkbox v-for="(item,index) in classOptions" :key="index" :label="item.bh">{{item.bjmc}}</el-checkbox> 
                                </el-checkbox-group>
                             </div>
                             <div class="content-class" v-show="oneiswho=='课程1'">
                                <el-checkbox-group v-model="oneCourse"  @change="coursehandleSelectionChange('1')" style="max-height: 380px;overflow: auto;">
                                    <el-checkbox v-for="(item,index) in courseOptions" :key="index" :label="item.kch" >{{item.kcmc}}</el-checkbox> 
                                </el-checkbox-group>
                             </div>
                         </el-col>
                     </el-row>
                     
                       
                </div>
            </el-col>
            <el-col  class="w49 common-pd-warp">
                <div class="common-pd-header yd-bg">
                    <span>成绩排行榜</span>
                </div>
                <div class="common-pd-content">
                     <div class="pd-content-header">
                         <div class="switch-warp switch">
                            <div :class="{'switch-class':true,'switch':true,'active-color':twoiswho=='班级2'}" @click="twoIsclass('班级2')">班级</div>
                            <div :class="{'switch-course':true,switch:true,'active-color':twoiswho=='课程2'}" @click="twoIsclass('课程2')">课程</div>
                         </div>
                         <span class="fr">
                             单位/分数
                         </span>
                     </div>
                    <div class="content-class" v-show="twoiswho=='班级2'">
                        <el-checkbox-group v-model="twoClass"  @change="classhandleSelectionChange('2')" style="max-height: 130px;overflow: auto;">
                            <el-checkbox label=[]>{{'所有班级'}}</el-checkbox> 
                            <el-checkbox v-for="(item,index) in classOptions" :key="index" :label="item.bh" >{{item.bjmc}}</el-checkbox> 
                        </el-checkbox-group>
                    </div>
                    <div class="content-class" v-show="twoiswho=='课程2'">
                        <el-checkbox-group v-model="twoCourse"  @change="coursehandleSelectionChange('2')" style="max-height: 130px;overflow: auto;">
                            <el-checkbox v-for="(item,index) in courseOptions" :key="index" :label="item.kch" >{{item.kcmc}}</el-checkbox> 
                        </el-checkbox-group>
                    </div>
                    <div class="pd-content-content" id="c2"> 
                    </div>
                </div> 
            </el-col>
        </el-row>
        
        <el-row>
            <el-col class="common-pd-warp">
                <div class="common-pd-header yd-bg">
                    <span>分数百分比</span>
                </div> 
                <div class="common-pd-content">
                    <el-row>
                        <el-col :span="15">
                            <div class="pd-content-content" id="c3"></div>
                        </el-col>
                        <el-col :span="9">
                            <!-- <el-checkbox-group v-model="oneClass"  @change="classhandleSelectionChange">
                                <el-checkbox label="往年" value='item.bh'></el-checkbox> 
                                <el-checkbox label="今年" value='item.bh'></el-checkbox> 
                            </el-checkbox-group> -->
                            <div class="pd-content-header">
                                <div class="switch-warp switch">
                                    <div :class="{'switch-class':true,'switch':true,'active-color':threeiswho=='班级3'}" @click="threeIsclass('班级3')">班级</div>
                                    <div :class="{'switch-course':true,switch:true,'active-color':threeiswho=='课程3'}" @click="threeIsclass('课程3')">课程</div>
                                </div>
                                <span class="fr">
                                    单位/分数
                                </span>
                            </div>
                            <div class="content-class" v-show="threeiswho=='班级3'">
                            <el-checkbox-group v-model="threeClass"  @change="classhandleSelectionChange('3')"  style="max-height: 380px;overflow: auto;">
                                <el-checkbox v-for="(item,index) in classOptions" :key="index" :label="item.bh" >{{item.bjmc}}</el-checkbox> 
                            </el-checkbox-group>
                            </div>
                            <div class="content-class" v-show="threeiswho=='课程3'">
                            <el-checkbox-group v-model="threeCourse"  @change="coursehandleSelectionChange('3')" style="max-height: 380px;overflow: auto;">
                                <el-checkbox v-for="(item,index) in courseOptions" :key="index" :label="item.kch" >{{item.kcmc}}</el-checkbox> 
                            </el-checkbox-group>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col> 
        </el-row>
    </div>
</template>

<script>   
    import G2 from '@antv/g2';
    export default {
        components:{ 
        },
        name:"educational-grade-statistical", 
        data(){
            return {
                value:'', 
                msg: "",
                chart: null,
                data:[{
                    // type: '硕士',
                    // value: 0.4
                    // }, {
                    // type: '本科',
                    // value: 0.21
                    // }, {
                    // type: '博士',
                    // value: 0.17
                    // }, {
                    // type: '初中',
                    // value: 0.009
                    // }, {
                    // type: '专科',
                    // value: 0.013
                    // }, {
                    // type: '未知',
                    // value: 0.08
                    
                    type: '0-50',
                    value: 0
                    }, {
                    type: '50-100',
                    value: 0.14
                    }, {
                    type: '100-200',
                    value: 0.57
                    }, {
                    type: '200',
                    value: 0.29
                    }],
                data2:[
                    {
                        zhpm: '未知',
                        zhcj: 654,
                        percent: 0.02,
                        zhcj:230,
                        xm:'张三'
                    }, {
                        zhpm: '17 岁以下',
                        zhcj: 654,
                        percent: 0.02,
                        zhcj:320,
                        xm:'张三'
                    }, {
                        zhpm: '18-24 岁',
                        zhcj: 4400,
                        percent: 0.2,
                        zhcj:330,
                        xm:'张三'
                    }, {
                        zhpm: '25-29 岁',
                        zhcj: 5300,
                        percent: 0.24,
                        zhcj:430,
                        xm:'张三'
                    }, {
                        zhpm: '30-39 岁',
                        zhcj: 6200,
                        percent: 0.28,
                        zhcj:550,
                        xm:'张三'
                    }, {
                        zhpm: '40-49 岁',
                        zhcj: 3300,
                        percent: 0.14,
                        zhcj:13,
                        xm:'张三'
                    }, {
                        zhpm: '50 岁以上',
                        zhcj: 1500,
                        percent: 0.06,
                        zhcj:500,
                        xm:'张三'
                }],
                data3:[
                    {
                        date: '2018/8/1',
                        type: 'download',
                        value: 4623
                    }, {
                        date: '2018/8/1',
                        type: 'register',
                        value: 2208
                    }, {
                        date: '2018/8/1',
                        type: 'bill',
                        value: 182
                    }, {
                        date: '2018/8/2',
                        type: 'download',
                        value: 6145
                    }, {
                        date: '2018/8/2',
                        type: 'register',
                        value: 2016
                    }, {
                        date: '2018/8/2',
                        type: 'bill',
                        value: 257
                    }, {
                        date: '2018/8/3',
                        type: 'download',
                        value: 508
                    }, {
                        date: '2018/8/3',
                        type: 'register',
                        value: 2916
                    }, {
                        date: '2018/8/3',
                        type: 'bill',
                        value: 289
                    }, {
                        date: '2018/8/4',
                        type: 'download',
                        value: 6268
                    }, {
                        date: '2018/8/4',
                        type: 'register',
                        value: 4512
                    }, {
                        date: '2018/8/4',
                        type: 'bill',
                        value: 428
                    }, {
                        date: '2018/8/5',
                        type: 'download',
                        value: 6411
                    }, {
                        date: '2018/8/5',
                        type: 'register',
                        value: 8281
                    }, {
                        date: '2018/8/5',
                        type: 'bill',
                        value: 619
                    }, {
                        date: '2018/8/6',
                        type: 'download',
                        value: 1890
                    }, {
                        date: '2018/8/6',
                        type: 'register',
                        value: 2008
                    }, {
                        date: '2018/8/6',
                        type: 'bill',
                        value: 87
                    }, {
                        date: '2018/8/7',
                        type: 'download',
                        value: 4251
                    }, {
                        date: '2018/8/7',
                        type: 'register',
                        value: 1963
                    }, {
                        date: '2018/8/7',
                        type: 'bill',
                        value: 706
                    }, {
                        date: '2018/8/8',
                        type: 'download',
                        value: 2978
                    }, {
                        date: '2018/8/8',
                        type: 'register',
                        value: 2367
                    }, {
                        date: '2018/8/8',
                        type: 'bill',
                        value: 387
                    }, {
                        date: '2018/8/9',
                        type: 'download',
                        value: 3880
                    }, {
                        date: '2018/8/9',
                        type: 'register',
                        value: 2956
                    }, {
                        date: '2018/8/9',
                        type: 'bill',
                        value: 488
                    }, {
                        date: '2018/8/10',
                        type: 'download',
                        value: 3606
                    }, {
                        date: '2018/8/10',
                        type: 'register',
                        value: 678
                    }, {
                        date: '2018/8/10',
                        type: 'bill',
                        value: 507
                    }, {
                        date: '2018/8/11',
                        type: 'download',
                        value: 4311
                    }, {
                        date: '2018/8/11',
                        type: 'register',
                        value: 3188
                    }, {
                        date: '2018/8/11',
                        type: 'bill',
                        value: 548
                    }, {
                        date: '2018/8/12',
                        type: 'download',
                        value: 4116
                    }, {
                        date: '2018/8/12',
                        type: 'register',
                        value: 3491
                    }, {
                        date: '2018/8/12',
                        type: 'bill',
                        value: 456
                    }, {
                        date: '2018/8/13',
                        type: 'download',
                        value: 6419
                    }, {
                        date: '2018/8/13',
                        type: 'register',
                        value: 2852
                    }, {
                        date: '2018/8/13',
                        type: 'bill',
                        value: 689
                    }, {
                        date: '2018/8/14',
                        type: 'download',
                        value: 1643
                    }, {
                        date: '2018/8/14',
                        type: 'register',
                        value: 4788
                    }, {
                        date: '2018/8/14',
                        type: 'bill',
                        value: 280
                    }, {
                        date: '2018/8/15',
                        type: 'download',
                        value: 445
                    }, {
                        date: '2018/8/15',
                        type: 'register',
                        value: 4319
                    }, {
                        date: '2018/8/15',
                        type: 'bill',
                        value: 176
                }],
                //
                nf:'',
                nfOptions:[],
                zyh:'',
                zyhOptions:[],
                kq:'',
                kqmcOptions:[],
                courseOptions:[],
                classOptions:[],
                //第一个图
                chart1:{},
                oneTableData:[],
                oneClass:[],
                oneCourse:[],
                oneiswho:'班级1',
                onekch:'',
                onebhs:'',
                //第二个图
                chart2:{},
                twoTableData:[], 
                twoClass:[],
                twoCourse:[],
                twoiswho:'班级2',
                colorSet : {
                    第一名: '#EB5348',
                    第二名: '#F28041',
                    第三名: '#3A85DC',
                    第四名:'#6AC199',
                    第五名:'#6AC199',
                    第六名:'#6AC199',
                    第七名:'#6AC199',
                    第八名:'#6AC199',
                    第九名:'#6AC199',
                    第十名:'#6AC199',
                },
                //第三个图
                chart3:{},
                threeTableData:[],
                threeClass:[],
                threeCourse:[],
                threeiswho:'班级3',
            }
        },
        methods:{ 
            initComponent() {  
                    // 此函数为个人习惯,喜欢创建一个初始化的函数 
                    this.chart1 = new G2.Chart({
                        container: 'c1',
                        forceFit: true,
                        height: 400,
                        width:300,
                        padding: 14
                    })  
                    this.chart1.source(this.oneTableData);  
                    this.chart1.legend(false);
                    this.chart1.coord('theta', {
                        radius: 0.75
                    });  
                    this.chart1.intervalStack().position('value').color('type', ['#2593fc', '#38c060', '#27c1c1', '#705dc8', '#3b4771', '#f9cb34']).opacity(1).label('value', function(val) {
                        var offset = val > 0.02 ? -50 : 50;
                        var label_class = val > 0.02 ? "g2-label-item-inner" : "g2-label-item-outer";
                        return {
                            offset: offset,
                            useHtml: true, 
                            htmlTemplate: function htmlTemplate(text, item) {
                                var d = item.point; 
                                var percent = String(parseInt(d.value * 100)) + "%";
                                return '<div class=' + label_class + '>'+'<span class="g2-label-item-zdy">' +percent +'</span>'+ '<br/>' + d.type +'</div>';
                            }
                        };
                    });
                    this.chart1.render();   
            },
            initComponent2(){
                this.chart2 = new G2.Chart({
                    container: 'c2',
                    forceFit: true,
                    height: 300,
                    width:666,
                    padding: [20, 20, 50, 20]
                });
                this.chart2.source(this.twoTableData); 
                this.chart2.axis('zhcj', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        }
                    },
                    tickLine: {
                        alignWithLabel: false,
                        length: 0
                    }
                });
                this.chart2.axis('zhcj', false);
                //这是鼠标移上去的提示
                this.chart2.tooltip({
                    share: true ,
                        // showTitle: {boolean}, // 是否展示 title，默认为 true
                        crosshairs: {
                            type: 'rect',
                            // type: 'rect' || 'x' || 'y' || 'cross', 
                        }, // tooltip 辅助线配置 
                        itemTpl: '<li>{xm} {bjmc}</li>', // tooltip 每项记录的默认模板
                        useHtml:true, 
                        htmlContent:function(title,items){ 
                            return '<div><ul><li>'+items[0].point.point.xm+'</li><li>'+items[0].point.point.bjmc+'</li></ul></div>'
                        }
                        // shared: true || false, // 默认为 true, false 表示只展示单条 tooltip 
                });  
                //这是每条顶部的提示
                this.chart2.interval().position('zhpm*zhcj').opacity(1).label('zhcj', {
                    useHtml: true,
                    htmlTemplate: function htmlTemplate(text, item) {
                    var a = item.point;
                    a.percent = String(parseInt(a.percent * 100)) + "成绩";
                    return '<span class="g2-label-item"><p class="g2-label-item-value">' + '<p>'+a.zhcj+'分'+ '</p>';
                    }
                }).color('zhpm',(val)=>{
                    return this.colorSet[val]
                }); 
                this.chart2.legend(false);
                this.chart2.render();
            },
            initComponent3(){
                this.chart3 = new G2.Chart({
                    container: 'c3',
                    forceFit: true,
                    height: 350,
                    width:400,
                    padding: [100, 20, 30, 45] // 上右下左
                });
                this.chart3.source(this.threeTableData,{
                    value:{  
                //         max :7700,   // 坐标轴的结束值
                //         formatter: val => {    // 设置坐标轴和提示框的文字
                //             return val ;
                //         },
                //         tickInterval: 1100,  // 设置坐标轴间隔
                //         alias: '比例'       // 提示信息起别名
                    }, 
                }); 
                this.chart3.axis('data', {
                    label: {
                        textStyle: { 
                            fill: '#aaaaaa'
                        }, 
                        formatter: function formatter(text) {
                            // console.log('text')
                            // console.log(text)  
                            return text+'分';
                        }
                    }
                });
                this.chart3.axis('value', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        },
                        grid:1100,
                        formatter: function formatter(text) {
                            // console.log('text')
                            // console.log(text)  
                            return text+'人';
                        }
                    }
                }); 
                this.chart3.legend({ 
                    position: 'top', // 设置图例的显示位置
                });
                // this.chart3.legend(false);
                this.chart3.line().position('data*value').color('type');
                this.chart3.render();
                this.chart3.showTooltip({
                    // x: $("#mountNode").width() - 20,
                    // y: 100
                });
                // const e = document.createEvent('Event')
                // e.initEvent('resize',true,true);
                // window.dispatchEvent(e)
            },
            classhandleSelectionChange(a) { 
                 if(a=='1'){
                     this.oneCourse=[]
                    if (this.oneClass.length > 1) {
                        this.oneClass.shift() 
                    } 
                    this.getOneTableData()
                 }else if(a=='2'){
                     this.twoCourse=[]
                    if (this.twoClass.length > 1) {
                        this.twoClass.shift()
                    } 
                    this.getTwoTableData()
                 }else if(a=='3'){ 
                    //   if (this.threeClass.length > 1) {
                    //     this.threeClass.shift()
                    // } 
                    this.getThreeTableData()
                 } 
            },
            coursehandleSelectionChange(a) { 
                // console.log(a)
                // console.log(this.oneCourse)
                 if(a=='1'){ 
                     this.oneClass=[]
                    if (this.oneCourse.length > 1) {
                        this.oneCourse.shift()
                    } 
                    this.getOneTableData() 
                 }else if(a=='2'){
                     this.twoClass=[]
                    if (this.twoCourse.length > 1) {
                        this.twoCourse.shift()
                    } 
                    this.getTwoTableData()
                 }else if(a=='3'){
                      if (this.threeCourse.length > 1) {
                        this.threeCourse.shift()
                    } 
                    this.getThreeTableData()
                 }
            },
            //专业查课程下拉框
            courseList(a) {
                this.getOneTableData()
                this.getThreeTableData()
                this.getTwoTableData()
                // console.log(a)
                if(a){
                    //初始化课程
                    this.$GET('/lessonInfo/lessonInfoByZyh',{zyh:a}).then((res) => { 
                        this.courseOptions = res.data 
                    })
                    //初始化班级
                    this.$GET('/classInfo/classInfoSelect',{zyh:a}).then((res) => { 
                        this.classOptions = res.data

                    })
                }
                
            },
            //班级课程切换
            oneIsclass(res){
                this.oneiswho = res
            },
            twoIsclass(res){
                this.twoiswho = res
            },
            threeIsclass(res){
                this.threeiswho = res
            },
            //查第一个图的数据
            getOneTableData(){
                // if(this.zyh==''||this.nf==''||this.qk==''){
                //     this.$message.error("年份，专业号，考期为必选内容")
                // }else{
                    this.$GET('/studentExamScore/queryScoreByNfZyKq',{kq:this.kq||'',nf:this.nf,zyh:this.zyh,bh:this.oneClass[0],kch:this.oneCourse[0]}).then((res) => {
                        // console.log(res.data)
                        this.oneTableData = res.data 
                    }).then(()=>{
                        // 刷新图标数据 this.initComponent()
                        this.chart1.changeData(this.oneTableData) 
                    })
                // } 
            }, 
            //查第二个图的数据
            getTwoTableData(){
                // if(this.zyh==''||this.nf==''||this.qk==''){
                //     this.$message.error("年份，专业号，考期为必选内容")
                // }else{
                    // console.log(this.kq)
                    // console.log(this.nf)
                    // console.log(this.zyh)
                    this.$GET('/studentExamScore/queryStudentSourceByNfZyKq',{kq:this.kq||'',xj:this.nf,zyh:this.zyh,bh:this.twoClass[0]!='[]'?this.twoClass[0]:'',kch:this.twoCourse[0]}).then((res) => {
                        // console.log(res.data)
                        this.twoTableData = res.data 
                    }).then(()=>{
                        // 刷新图标数据 
                        this.chart2.changeData(this.twoTableData) 
                    })
                // } 
            }, 
            //查第三个图的数据
            getThreeTableData(){
                // if(this.zyh==''||this.nf==''||this.qk==''){
                //     this.$message.error("年份，专业号，考期为必选内容")
                // }else{
                    // console.log(this.threeClass)
                    let a = this.threeClass.join(',')
                    // console.log(a)
                    this.$GET('/studentExamScore/queryScoreByBj',{kq:this.kq||'',nf:this.nf,zyh:this.zyh,bhs:a,kch:this.threeCourse[0]},).then((res) => {
                        // console.log(res.data)
                        this.threeTableData = res.data 
                    }).then(()=>{
                        // 刷新图标数据 
                        this.chart3.changeData(this.threeTableData) 
                    })
                // } 
            },
            //初始化3个下拉框
            getThreeSelect(){   
                (async ()=>{
                    await   Promise.all([
                                //届数下拉框
                                this.$POST("/classInfo/queryNfByJbny").then((res) => {
                                    this.nfOptions = res.data 
                                    this.nf = res.data[2] 
                                }),
                                //专业下拉框 
                                this.$GET('/majorInfo/selectList').then((res) => { 
                                    this.zyhOptions = res.data 
                                    this.zyh = res.data[5].zyh
                                    this.$nextTick(()=>{
                                        this.courseList(this.zyh)
                                    }) 
                                }),
                                //考期名称  
                                this.$GET('/examInfo/examInfoSelect').then((res) => {
                                    // console.log("初始化考期名称下拉框")
                                    // console.log(res)
                                    this.kqmcOptions = res.data
                                    this.kq = res.data[0].kq 
                                })  
                            ]) 
                    this.getThreeDataWithSelect() 
                })() 
            },
            //3个下拉框初始化3个图
            getThreeDataWithSelect(){ 
                this.getOneTableData()
                this.getTwoTableData()
                this.getThreeTableData()  
            },  
        },
        created(){   
             this.getThreeSelect()  
        }, 
        mounted(){ 
            this.initComponent();
            this.initComponent2()
            this.initComponent3()
        }
        
    }
</script>

<style lang='less'>
// 成绩管理公共样式 
.yd-educational-grade-tongji{
    .el-input__inner{
        border: none; 
    } 
}
.yd-educational-grade{
    
    .common-pd-warp{
        margin-bottom: 20px;
    }
    .common-pd-header{
        padding-left: 30px;
        height: 50px;
        background:rgba(233,238,250,1);
        span{
            font-size:18px;  
            line-height: 50px;
        }
    }  
    .common-pd-content{
        padding: 20px;
        width: 100%;
        height: 470px;
        background-color: #fff;
        span{
            line-height: 40px;
        }
        .switch{
            cursor: pointer;
            width: 80px;
            height: 40px;
            // border: 1px solid #ccc;
            border-radius: 20px;
            line-height: 40px;
            .switch-class{
                position: absolute;
                left: 0;
            }
            .switch-course{
                position: absolute;
                right: 0;
            }
        }
        .switch-warp{
            display: inline-block;
            text-align: center;
            width: 146px;
            position: relative;
            border: 1px solid #ccc;
            background-color: #FAFBFE;
        }
        //
        .g2-label-item-zdy{
            font-size: 19px;
            font-weight: 700;
            line-height: 1.4
        }
        .g2-label-item-inner{
            color: #eee;
            width: 60px;
        }
        .g2-label-item-outer{
            width: 60px;
        }
        .pd-content-content{
            .g2-label-item{
                >p{
                    width: 40px;
                    line-height: 100px;
                }
            }
        }
    }
    .active-color{
        background-color: #47B381;
        color: #fff;
    }
    .w49{
        width: 49.5%;
        min-width: 800px;
    }
    .pr-1{
        margin-right: 1%;
    }
    //
    .mb-0{
        margin-bottom: 0;
    }
    .mt-0{
        margin-top: 0;
    }
    .bd-1{
        border-bottom: 1px solid rgba(242,244,247,1);
    }
    .ml-44{
        margin-left: 100px;
    }
    .mr-50{
        margin-right: 50px;
    }
    .isradio{
        padding: 0 30px; 
        width: 260px;
        background:rgba(243,245,247,1); 
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    } 
    .yd-router-title .el-input {
        width: 260px;
    }
    .nianfen .el-input {
        width: 120px;
    }
    .el-form-item__label{
        width: 100px;
    }
    .yd-common-table{
        position: relative;
        .download{
            position: absolute;
            right: 10px;
            bottom: 10px;
            width:60px;
            height:60px;
            background:rgba(0,0,0,1);
            opacity:0.6;
            border-radius:50%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            color: #fff;
            text-align: center;
            i{
                font-size: 23px;
                line-height: 60px;
            }
        }
        .el-table thead th{
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
    }
    
}
</style>
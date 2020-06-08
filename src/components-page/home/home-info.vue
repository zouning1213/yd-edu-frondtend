<template>
    <div>
        <div class="home-header clearfix ">
            <div class="title-icon">
                <h3 class="fl">基本信息</h3>
                <!-- <router-link :to="{path:'/teacher/search/article'}"> -->
                <!-- <router-link :to="{path:$props.who=='ls'?'/teacher/search/article':'/students/search/article'}">
                    <i class="yd icon-19 fr"></i>
                </router-link> -->
            </div>
        </div>
        <div class="home-content home-info-content height-297">
            <div class="info-block">
                <div class="info-top">
                    <div class="info-icon">
                        <img src="./img/student2x.png" alt="">
                    </div>
                    <p>学生总数</p> 
                    <span>{{studentnum}}</span>人
                </div> 
                <div class="info-bottom">
                    <div class="progress-item" v-for="(item,index) in studentmap" :key="index">
                        <p class="name">
                            <span class="yuan color-yellow"></span>
                            <span>{{item.name}}级学生</span>
                            <span class="fr mb-10">{{item.countnum}}</span>
                        </p>
                        <el-progress :percentage="item.countnum/studentnum*100" :show-text="false" color="#FFCB27"></el-progress>
                    </div>
                </div>
            </div>
            <div class="info-block">
                <div class="info-top">
                    <div class="info-icon">
                        <img src="./img/class2x.png" alt="">
                    </div>
                    <p> 班级总数</p> 
                    <span>{{classnum}}</span>个
                </div> 
                <div class="info-bottom">
                    <div class="progress-item"  v-for="(item,index) in classmap" :key="index">
                        <p class="name">
                            <span class="yuan color-pink"></span>
                            <span>{{item.name}}级学生</span>
                            <span class="fr mb-10">{{item.countnum}}</span>
                        </p>
                        <el-progress :percentage="item.countnum/classnum*100" :show-text="false" color="#FF7B8B"></el-progress>
                    </div>
                </div>
            </div>
            <div class="info-block ">
                <div class="info-top">
                    <div class="info-icon">
                        <img src="./img/teacher2x.png" alt="">
                    </div>
                    <p>教职工</p> 
                    <span>{{teachernum}}</span>人
                </div>
                <div class="info-bottom">
                    <div class="progress-item"  v-for="(item,index) in teachermap" :key="index">
                        <p class="name">
                            <span class="yuan color-blue"></span>
                            <span>{{item.name}}</span>
                            <span class="fr mb-10">{{item.countnum}}</span>
                        </p>
                        <el-progress :percentage="item.countnum/teachernum*100" :show-text="false" color="#4EA1FF"></el-progress>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        name:'home-Notice',
        props:["who"],
        data() {
            return {
                tableData:[],
                teachernum:'',
                classnum:'',
                studentnum:'',
                studentmap:[],
                classmap:[],
                teachermap:[],
                // percentage:''
            }
        },
        created() {
            this.$GET('/system/homepageCount').then((res) => {
                this.tableData = res.data
                // console.log(res.data)
                this.teachernum = res.data.teachernum
                this.classnum = res.data.classnum
                this.studentnum = res.data.studentnum

                this.studentmap = res.data.studentmap.slice(0,3)
                this.classmap = res.data.classmap.slice(0,3)
                this.teachermap = res.data.teachermap.slice(0,3)
            })
        }, 
        methods:{ 
            getJindutiao(a,b){
                let data = 0
                data = (a/b)*100
                return data 
            }
        },
        filters:{
            cutDate(time) {
                function fill(num) {
                    if (num < 10) {
                        return "0" + num;
                    } else {
                        return num;
                    }
                }
                let date = new Date(time)
                return date.getFullYear() + "/" +  fill((date.getMonth() + 1)) + "/" +  fill(date.getDate()) + ' '+ fill(date.getHours())+':'+ fill(date.getSeconds())
            }
        }
    }
</script>

<style lang="less" scope>
    .home-info-content{
        display: flex;
        justify-content: space-between;
        padding-top: 30px !important;
        padding-bottom: 20px !important;
        .info-block{
            width: 32%;
            border: 1px solid #eee;
            padding: 12px 9px;
            .name{
                margin: 10px 0;
            }
            .info-top{
                margin-bottom: 24px;
                .info-icon{
                    display: inline-block;
                    float: left;
                    width: 56px;
                    height: 56px;
                    margin-right: 5px;
                    img{
                        width: 56px;
                        height: 56px;
                    }
                }
                p{
                    font-size: 14px;
                    line-height: 25px;
                }
                span{
                    font-size: 23px;
                }
            }
            .info-bottom{
                .progress-item{
                    .yuan{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: #fff;
                        border: 2px solid #FFCB27;
                        border-radius: 50%;
                    }
                    .color-yellow{
                        border-color: #FFCB27;
                    }
                    .color-pink{
                        border-color: #FF7B8B;
                    }
                    .color-blue{
                        border-color: #4EA1FF;
                    }
                }
            }
        }
    }
</style>
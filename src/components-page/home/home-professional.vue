<template>
    <!-- 专业课程管理 -->
    <div>
        <div class="home-header">
            <div class="title-icon">
                <i class="yd icon-course icon-skin fl"></i>
                <h3 class="fl">专业课程管理</h3>
                <router-link :to="{path:'/educational/manager/professional'}">
                    <i class="el-icon-more fr"></i>
                </router-link>
            </div>
        </div>
        <div class="home-content professional-content">
            <div class="professional-row">
                <router-link :to="{path:'/educational/manager/professional'}">
                    <div class="probj">
                        <div style="height:190px">
                            <img src="./img/home-professional01.png" alt="">
                            <div class="probj-zi">
                                <span>专业管理</span>
                                <div class="probj-zi-x"></div>
                                <h4>{{zygl}}</h4>
                            </div>
                            <i class="yd icon-course fl"></i>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{path:'/educational/manager/courses'}">
                    <div class="probj">
                        <div style="height:190px">
                            <img src="./img/home-professional02.png" alt="">
                            <div class="probj-zi">
                                <span>课程管理</span>
                                <div class="probj-zi-x"></div>
                                <h4>{{kcgl}}</h4>
                            </div>
                            <i class="yd icon-course fl"></i>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'home-Professional',
        props:["who"],
        data() {
            return {
                zygl:'',
                kcgl:'',
                tableData:[]
            }
        },
        created() {
            this.$GET('/majorInfo/selectList').then((res) => {
                // console.log("专业课程管理--zhuanye")
                // console.log(res)
                this.zygl = res.data.length
            })
            this.$GET('/lessonInfo/list',{limit:100,page:1}).then((res) => {
                // console.log("专业课程管理--keceng")
                // console.log(res)
                this.kcgl = res.count
            })
        }
    }
</script>

<style lang="less" scoped>
    .professional-content {
        padding: 0 20px 20px 20px !important;
        .professional-row {
            margin-right: -20px;
            margin-top: 25px;
            .probj {
                float: left;
                width: 50%;
                padding-right: 20px;
                > div {
                    position: relative;
                    width: 100%;
                    // background-color: #ccc;
                    img {
                        width: 100%;
                    }
                    .probj-zi {
                        position: absolute;
                        left: 10%;
                        top: 20%;
                        color: #fff;
                        span {
                            font-size: 20px;
                        }
                        h4 {
                            font-size: 24px;
                            font-weight: 700;
                        }
                        .probj-zi-x {
                            margin: 20px 0;
                            width: 15px;
                            height: 2px;
                            background-color: #fff;
                        }
                    }
                    i {
                        position: absolute;
                        right: 10%;
                        top: 25%;
                        font-size: 43px;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
<template>
    <!-- 教师管理 -->
    <div>
        <div class="home-header clearfix">
            <div class="title-icon">
                <i class="yd icon-teacher-resources fl icon-skin"></i>
                <h3 class="fl">教师管理</h3>
                <router-link :to="{path:'/educational/manage/teacher/info'}">
                    <i class="el-icon-more fr"></i>
                </router-link>
            </div>
        </div>
        <div class="home-content teacher-content">
            <swiper :options="swiperOption" ref="mySwiper" class='swipers'>    
                <swiper-slide v-for="(item,index) in tableData" :key="index" :id="item.id">
                    <div class="item-lunbo">
                        <img :src="item.zp || require('@/assets/no-tip-img/no-avatar.png') " alt="">
                        <!-- <img src="../educational/img/teacher.png" alt=""> -->
                        <div class="img-xia-zi">
                            <h4 class="font-skin line-1">{{item.xm}}</h4>
                            <p class="line-1"><i class=" yd icon-graduation"></i>{{item.yxmc}}</p>
                            <p class="line-1"><i class="yd icon-major"></i>{{item.ksmc}}</p>
                            <p class="line-1"><i class="yd icon-level"></i>{{item.jslxmc}}</p>
                            <p class="line-1"><i class="yd icon-age"></i>{{item.cjjl}}年教龄</p>
                        </div>
                    </div>
                                   
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                 
            </swiper>
        </div>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.css"
    import {swiper,swiperSlide} from 'vue-awesome-swiper'

    export default {
        name:'home-teachers',
        components:{
            swiper,
            swiperSlide
        },
        props:["who"],
        data() {
            return {
                page:1,
                tableData:[],
                swiperOption:{
                    autoplayDisableOnInteraction:false,
                    slidesPerView:2.4,
                    freeMode:true,
                    spaceBetween:20,
                    on:{},
                    breakpoints:{
                        668:{
                            slidesPerView:2,
                        }
                    }
                }

            }
        },
        methods:{
//         touchEndFunc(data) {
//                setTimeout(() => {
//                     this.checkIndex = this.$refs.mySwiper.swiper.activeIndex;//通过延迟来获取滑动之后的当前index
//                     console.log(this.checkIndex)
//     //             }, 300);

//         },  
            getData() {
                this.$GET('/teacherInfo/list',{limit:10,page:this.page}).then((res) => {
                    // console.log("最后教师管理")
                    this.page++
                    // this.tableData=res.data
                    this.tableData = this.tableData.concat(res.data)
                    // console.log(this.tableData)
                })
            }
        },
        computed:{
            // swiper() {
            //     return this.$refs.mySwiper.swiper//引入(好像可以不用这句话)
            // }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="less" scoped>
    .teacher-content {
        padding: 0 20px;
        .item-lunbo {
            margin: 40px 0;
            padding: 15px;
            width: 100%;
            height: 162px;
            border: 1px solid rgba(243, 245, 247, 1);
            img {
                float: left;
                width: 90px;
                height: 126px;
            }
            .img-xia-zi {
                padding-left: 100px;
                h4 {
                    line-height: 30px;
                }
                p {
                    line-height: 25px;
                    i {
                        padding-right: 5px;
                    }
                }
            }
        }
    }
</style>
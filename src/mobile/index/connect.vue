<template>
    <!--手机端过渡页面-->
    <div class="yd-connect text-center"
         :style="{'marginTop':marginTop +'px'}">
        <van-loading size="24px">加载中...</van-loading>
    </div>
</template>

<script>
    import auth from '@/services/auth.js'

    export function getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [,""])[1].replace(/\+/g,'%20')) || null
    }

    export default {
        name:"connect",
        data() {
            return {
                loading:true,
                marginTop:''
            }
        },
        created() {

            let token = getUrlKey('token') || this.$route.params.token

            let user = {};

            localStorage.setItem(setting.userToken,token)

            console.log(token)

            this.$POST('/system/user_info').then((res) => {

                user = res.data;

                auth.setItemUserInfo(user);

                this.$store.commit("setUserInfo",user); //用户信息存储到vux 里面

            }).then(() => {

                let preHost = localStorage.getItem(setting.preHost)

                if (preHost) { //有存储

                    this.$router.push({
                        path:localStorage.getItem(setting.preHost),
                    });

                } else { //没有存储

                    this.$router.push({
                        path:'/',
                    });
                    localStorage.removeItem('currentMenu') //移出本地缓存的菜单
                }
            });
        },
        mounted() {
            let documentHeight = document.documentElement.clientHeight || document.body.clientHeight
            let currentHeight = document.querySelector('.yd-connect').clientHeight
            this.marginTop = (documentHeight - currentHeight) / 3
        },
    }
</script>

<style lang="less">
    .yd-connect {
        text-align: center;
        height: 295px;
        img {
            max-width: 580px;
            margin-bottom: 30px;
        }
        p {
            font-size: 16px;
            color: #ccc;
            span {
                margin: 0 8px;
            }
        }
    }
</style>

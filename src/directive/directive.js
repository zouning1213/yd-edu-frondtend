import Vue from 'vue'

//是自定义指令
const focus = Vue.directive('focus',{
    // 当被绑定的元素插入到 DOM 中时……
    inserted:function (el) {
        // 聚焦元素
        el.focus()
    },
})

const mobileDrag = Vue.directive('mobileDrag',{
    // 拖拽移动
    bind:function (el) {
        var _this = this
        let odiv = el;   //获取当前元素
        let flags;
        odiv.ontouchstart = (event) => {
            flags = true;
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }

            let positionX = touch.clientX;
            let positionY = touch.clientY;
            let offsetLeft = odiv.offsetLeft;
            let offsetTop = odiv.offsetTop;

            odiv.ontouchmove = (event) => {
                if (flags) {
                    var touch1;
                    if (event.touches) {
                        touch1 = event.touches[0];
                    } else {
                        touch1 = event;
                    }
                    let moveLeft = touch1.clientX - positionX;
                    let moveTop = touch1.clientY - positionY;
                    let left = offsetLeft + moveLeft;
                    let top = offsetTop + moveTop;

                    // 把拖拽元素 放到 当前的位置
                    if (left <= 0) {
                        left = 0;
                    } else if (left >= document.documentElement.clientWidth - odiv.offsetWidth) {
                        left = document.documentElement.clientWidth - odiv.offsetWidth;
                    }
                    if (top <= 0) {
                        top = 0;
                    } else if (top >= document.documentElement.clientHeight - odiv.offsetHeight) {
                        top = document.documentElement.clientHeight - odiv.offsetHeight
                    }

                    odiv.style.left = left + "px";
                    odiv.style.top = top + "px";

                    //阻止页面的滑动默认事件
                    document.addEventListener("touchmove",function () { // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
                        event.stopPropagation()
                    },false);
                }
            };
            document.ontouchend = (e) => {
                flags = false;
            };
        };
    }
})

export default {focus,mobileDrag}
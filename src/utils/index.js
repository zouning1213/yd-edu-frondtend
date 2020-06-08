//工具类
import http from "../services/http";

export default {
    /**
     *
     * @param startColor 指定起始颜色
     * @param endColor   指定结束颜色
     * @param step       划分渐变色区域数量
     * @returns {Array}  返回渐变色数组
     */
    gradientColor(startColor,endColor,step) {
        let startRGB = this.colorRgb(startColor); //转换为rgb数组模式
        let startR = startRGB[0];
        let startG = startRGB[1];
        let startB = startRGB[2];

        let endRGB = this.colorRgb(endColor);
        let endR = endRGB[0];
        let endG = endRGB[1];
        let endB = endRGB[2];

        let sR = (endR - startR) / step; //总差值
        let sG = (endG - startG) / step;
        let sB = (endB - startB) / step;

        let colorArr = [];
        for (let i = 0; i < step; i++) {
            //计算每一步的hex值
            let hex = this.colorHex(
                "rgb(" +
                parseInt(sR * i + startR) +
                "," +
                parseInt(sG * i + startG) +
                "," +
                parseInt(sB * i + startB) +
                ")"
            );
            colorArr.push(hex);
        }
        return colorArr;
    },

    // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
    colorRgb(sColor) {
        let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i,i + 1).concat(sColor.slice(i,i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i,i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    },
    // 将rgb表示方式转换为hex表示方式
    colorHex(rgb) {
        let _this = rgb;
        let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
            let strHex = "#";
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16);
                hex = hex < 10? 0 + "" + hex :hex; // 保证每个rgb的值为2位
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        } else if (reg.test(_this)) {
            let aNum = _this.replace(/#/,"").split("");
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                let numHex = "#";
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += aNum[i] + aNum[i];
                }
                return numHex;
            }
        } else {
            return _this;
        }
    },

    //判断有几个版本不同
    judgeVersion(newVersion) {
        let nowVersion = JSON.parse(localStorage.getItem("options_version")) || {};
        let differentVersion = [];
        for (let key in newVersion) {
            if (nowVersion[key] != newVersion[key]) {
                differentVersion.push(key);
            }
        }
        return differentVersion;
    },

    //修改localStorage中的数据
    async updateDataValues(differentVersion) {
        if (
            differentVersion.includes("ad_cate") ||
            differentVersion.includes("article_cate") ||
            differentVersion.includes("course_cate")
        ) {
            await this.getOptions();
        }
        if (differentVersion.includes("component")) {
            await this.getComponents();
        }
        if (differentVersion.includes("pagesite")) {
            await this.getSiteInfo();
        }
        if (differentVersion.includes("layout")) {
            await this.getComponentsName();
        }
    },

    //获取组件
    async getComponents() {
        let params = {type:"pc"};
        await http.get("page/get-components1",params).then(res => {
            if (res.data.code == 0) {
                let obj = JSON.stringify(res.data.data);
                localStorage.setItem("components",obj);
            }
        });
    },

    //获取options
    async getOptions() {
        await http.get("component/get-options").then(res => {
            if (res.data.code == 0) {
                let obj = res.data.data;
                for (let key in obj) {
                    localStorage.setItem(key,JSON.stringify(obj[key]));
                }
            }
        });
    },

    //获取站点信息
    async getSiteInfo() {
        let params = {index:"code"};
        await http.get("/component/get-site",{params:params}).then(
            res => {
                if (res.data.code == 0) {
                    localStorage.setItem("pagesite",JSON.stringify(res.data.data));
                }
            },
            err => {
                console.log("请求错误！");
            }
        );
    },

    //获取站点组件
    async getComponentsName() {
        let compArr = [];
        await http.get("/page/get-site-components").then(res => {
            if (res.data.code == 0) {
                compArr = res.data.data;
                localStorage.setItem("ComponentsName",JSON.stringify(compArr));
            }
        });
    },

    getVersion() {
        //获取版本号
        return http.get("component/get-options-version").then(
            async res => {
                if (res.data.code == 0) {
                    // 获取版本信息
                    let differentVersion = this.judgeVersion(res.data.data);
                    await this.updateDataValues(differentVersion);
                    localStorage.setItem(
                        "options_version",
                        JSON.stringify(res.data.data)
                    );
                }
            },
            err => {
                console.log("请求错误！");
            }
        );
    },

    //获取星期
    getWeekday() {
        let arr = []; // 周一开始
        let newdate = new Date();
        let now = newdate.getTime();
        let day = newdate.getDay(); // 星期
        let oneDayTime = 60 * 60 * 24 * 1000;
        for (let i = 0; i < 7; i++) {
            if (day >= i) {
                let dd = new Date(now - (day - i) * oneDayTime).getDate();
                arr.push(dd < 10? "0" + dd :dd + "");
            } else {
                let aa = new Date(now + (i - day) * oneDayTime).getDate();
                arr.push(aa < 10? "0" + aa :aa + "");
            }
        }
        return arr;
    },


    // getElementHeight(event,ratio) { //按照比例计算当前的高度
    //     console.log(Array.from(event))
    //     let height
    //     if (event != undefined) {
    //         if (event.length > 0) {
    //             height = event['0'].clientWidth * (1 / ratio);
    //         }else {
    //             height = event.clientWidth * (1 / ratio);
    //         }
    //         // return height
    //     }
    //     // console.log(height)
    // }
};

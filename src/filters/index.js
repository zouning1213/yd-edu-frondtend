export default {
    //返回年月日格式
    cutOutDate:(time,type) => {

        let date = new Date(time)

        if (type == 'hms') {

            let time = fill(date.getHours()) + ':' + fill(date.getMinutes()) + ":" + fill(date.getSeconds())

            return date.getFullYear() + "年" + date.getMonth() + "月" + date.getDay() + "日" + " " + time
  
        } else if (type == 'zntime') {
            let time = fill(date.getHours()) + ':' + fill(date.getMinutes())

            return date.getFullYear() + "." + date.getMonth() + "." + date.getDay() + " " + time
 
        } else if (type == 'zntime2') {
            let time = fill(date.getHours()) + ':' + fill(date.getMinutes()) + ":" + fill(date.getSeconds())

            return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + (date.getDay() + 1) + "日" + " " + time
 
        }else if (type == 'zntime3') {
            let time = fill(date.getHours()) + ':' + fill(date.getMinutes()) + ":" + fill(date.getSeconds())

            return date.getFullYear() + "/" + fill((date.getMonth() + 1)) + "/" + fill(date.getDate())
 
        } else if(type == 'ymd'){

            return date.getFullYear().toString() + fill((date.getMonth() + 1)).toString() + fill(date.getDate()).toString()

        }else{
            return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
        } 
        //填补0
        function fill(num) {
            if (num < 10) {
                return "0" + num;
            } else {
                return num;
            }
        }
    },
    //根据课程号显示课程名称 根据专业号显示专业名称 (多选的)
    showCourseName(kch,obj) { //kch课程号 obj 课程号对应的课程名称
        let name = [] //课程名称的数组
        let Array = [] //课程号的数组
        if (kch.length > 0) {
            Array = kch.split(',') //字符传转换为数组
        } else {
            Array = []
        }
        Array.forEach((item) => {
            name.push(obj[item])
        })
        return name.join(',')
    },
    //根据专业号显示专业名称 (单选的) 根据班号显示班级名称
    showSubjectName(zyh,obj) {
        if (zyh != '') {
            let name = {} //课程名称
            obj.forEach((item) => {
                name[item.zyh] = item.zymc
            })
            return name[zyh]
        }
    },
    //截取时间后面的时分秒
    filtersTime(time) {
        return time.substring(0,10)
    }
}

Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};

Vue.filter("getDiff", time => {
    const mistiming = getDiffTimeStamp(time);
    const strings = ['年', '月', '天', '小时', '分钟', '刚刚'];
    const timestamps = [31536000, 2592000, 86400, 3600, 60, 1];
    for (let i = 0; i < timestamps.length; i++) {
        const near = Math.floor((mistiming + 1) / timestamps[i]);
        if (near !== 0) {
            if (i === 5) return strings[i];
            return near + strings[i] + '前';
        }
    }
})
Vue.filter("calcCount", num => {
    if (num >= 10000) return Math.round(num / 1000) / 10 + 'w'
    if (num >= 1000) return Math.round(num / 100) / 10 + 'k'
    return num
})

Vue.filter("getRank", (num, time) => {
    if (num === undefined || time === undefined) return 1;
    const x = getDiffTimeStamp(time);
    num = num + (+(x / 86400).toFixed(2))
    return num < 200 ? 1 : Math.floor(num / 100)
})

function getDiffTimeStamp(time) {
    const dateTimeStamp = new Date(time.replace(/-/g, "/")).getTime()
    return Math.round((Date.now() - dateTimeStamp) / 1000);
}

Date.fmt = function (fmt = "yyyy-MM-dd hh:mm:ss") {
    const dt = new Date()
    const o = {
        "M+": dt.getMonth() + 1, //月份
        "d+": dt.getDate(), //日
        "h+": dt.getHours(), //小时
        "m+": dt.getMinutes(), //分
        "s+": dt.getSeconds(), //秒
        "q+": Math.floor((dt.getMonth() + 3) / 3), //季度
        "S": dt.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
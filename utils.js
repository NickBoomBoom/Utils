"use strict";
exports.__esModule = true;
/**
 * 获取window.search后参数
 * @param name
 * @returns {null}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r ? unescape(r[2]) : null;
}
exports.getQueryString = getQueryString;
/**
 *  等分切割数组
 *
 * @static
 * @param {*} arr 数组
 * @param {*} limit 份数
 * @returns
 */
function isArrSlice(arr, limit) {
    var res = [];
    for (var i = 0; i < arr.length; i += limit) {
        res.push(arr.slice(i, i + limit));
    }
    return res;
}
exports.isArrSlice = isArrSlice;
/**
 *  复制文字
 *  TODO:可能有兼容问题,目前在 PC端发现,待真实环境测试
 * @param {*} dom 需要复制的文字 dom
 * @returns  Boolean 值, true 则为复制成功, false 失败
 */
function copy(dom) {
    window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.selectNode(dom);
    window.getSelection().addRange(range);
    var bol = document.execCommand("copy");
    return bol;
}
exports.copy = copy;
// js 计算进度丢失 在严格模式中的解决方案
// 严格模式下,除法的处理
function decimalLength(num1, num2) {
    var length1;
    var length2;
    try {
        length1 = num1.toString().split(".")[1].length;
    }
    catch (e) {
        length1 = 0;
    }
    try {
        length2 = num2.toString().split(".")[1].length;
    }
    catch (e) {
        length2 = 0;
    }
    return [length1, length2];
}
//除法
function divide(num1, num2) {
    var result = decimalLength(num1, num2);
    var length1 = result[0];
    var length2 = result[1];
    var integer1 = +num1.toString().replace(".", "");
    var integer2 = +num2.toString().replace(".", "");
    // 默认保留小数点最长的个数
    return (integer1 / integer2) * Math.pow(10, length2 - length1);
}
exports.divide = divide;
//乘法
function multiply(arg1, arg2) {
    var s1 = arg1.toString();
    var s2 = arg2.toString();
    var m = 0;
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) { }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) { }
    return ((Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m));
}
exports.multiply = multiply;
//加法
function plus(arg1, arg2) {
    var r1;
    var r2;
    var m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (multiply(arg1, m) + multiply(arg2, m)) / m;
}
exports.plus = plus;
//减法
function minus(arg1, arg2) {
    var r1;
    var r2;
    var m;
    var n;
    var res;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    res = +((multiply(arg1, m) - multiply(arg2, m)) / m).toFixed(n);
    return res;
}
exports.minus = minus;
/**
 * 如果数字小于1位，前面用0填充 返回字符串格式
 * @param num {Number} 数字
 */
function fillDigit(num) {
    num = parseInt(num + "");
    var res = "";
    res = num <= 9 ? "0" + num : num + "";
    return res;
}
// 时间处理方法
/**
 * 倒计时
 *
 * @static
 * @param {any} time 倒计时时间戳  毫秒级
 * @param {any} colon true: 冒号形式  20:30:00
 * @returns  01天01小时03分钟30秒 || 1:20:30:00
 */
function countDown(time, colon) {
    if (colon === void 0) { colon = true; }
    if (time <= 0)
        return;
    var dayMS = 86400000; // 每天毫秒
    var hoursMs = 60 * 60 * 1000;
    var minuteMs = 60 * 1000;
    var secondMs = 1000;
    var day = time / dayMS;
    var d = day >= 1 ? ~~day : 0;
    var remainingTime = d ? time - d * dayMS : time;
    console.log(remainingTime);
    var hours = remainingTime / hoursMs;
    var h = ~~hours;
    var minute = (remainingTime - h * hoursMs) / minuteMs;
    var m = ~~minute;
    var second = (remainingTime - h * hoursMs - m * minuteMs) / secondMs;
    var s = ~~second;
    var dd = fillDigit(d);
    var hh = fillDigit(h);
    var mm = fillDigit(m);
    var ss = fillDigit(s);
    var res = "";
    if (colon) {
        dd && (res = res + dd + ":");
        res = (hh ? res + hh : res + "00") + ":";
        res = (mm ? res + mm : res + "00") + ":";
        res = res + ss;
    }
    else {
        dd && (res = res + dd + "天");
        hh && (res = res + hh + "小时");
        mm && (res = res + mm + "分");
        res = res + ss + "秒";
    }
    return res;
}
exports.countDown = countDown;
/**
 * 深拷贝
 * @param {*} p  原始对象
 * @param {*} c  新对象 可选
 * @returns  object
 */
function deepCopy(p, c) {
    c = c || {};
    for (var i in p) {
        if (typeof p[i] === "object") {
            c[i] = p[i].constructor === Array ? [] : {};
            deepCopy(p[i], c[i]);
        }
        else {
            c[i] = p[i];
        }
    }
    return c;
}
exports.deepCopy = deepCopy;
/**
 *
 * @returns 返回视窗高度, 兼容所有浏览器
 */
function viewPortHeight() {
    return (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight);
}
exports.viewPortHeight = viewPortHeight;
/**
 *
 *
 * @param {*} el dom
 * @param {number} [offset=100] 提前在到达可视距离 多少前加载
 * @returns  Boolean true 视图内  fasle  视图外
 */
function inViewPort(el, offset) {
    if (offset === void 0) { offset = 100; }
    var vh = viewPortHeight();
    var offsetTop = el.offsetTop;
    var scrollTop = document.documentElement.scrollTop;
    var top = offsetTop - scrollTop;
    return top <= vh + offset;
}
exports.inViewPort = inViewPort;

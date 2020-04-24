(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Utils = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *严格模式下,除法的处理
 *
 * @param {number} num1
 * @param {number} num2
 * @returns {number[]}
 */
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
/**
 * 除法
 *
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
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
/**
 *乘法
 *
 * @param {number} arg1
 * @param {number} arg2
 * @returns {number}
 */
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
/**
 * 加法
 *
 * @param {number} arg1
 * @param {number} arg2
 * @returns {number}
 */
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
/**
 * 减法
 *
 * @param {number} arg1
 * @param {number} arg2
 * @returns {number}
 */
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

},{}],2:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var feature_1 = require("./feature");
/**
 * 补0操作
 * @param num
 * @return sting
 */
function _fill(num) {
    if (num < 10) {
        return "0" + num;
    }
    return "" + num;
}
/**
 * 转化成Date对象
 * @param date
 */
function _date(date) {
    if (date instanceof Date) {
        return date;
    }
    if (typeof date === 'string') {
        date = date.replace('-', '/');
    }
    return new Date(date);
}
/**
 * 返回周几
 * @param week Date.getDay() 获取的周几 0 -6
 * @return 周几
 */
function _week(week) {
    var WEEK = [
        '周日',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
    ];
    return WEEK[week];
}
function getYMDW(date) {
    date = _date(date);
    var _a = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay()], year = _a[0], month = _a[1], day = _a[2], week = _a[3];
    return {
        year: year, month: month, day: day, week: week
    };
}
/**
 * 返回 周起始数组
 * @param weekStart 周起始
 */
function _weeks(weekStart) {
    var WEEKS = [0, 1, 2, 3, 4, 5, 6];
    var startIndex = WEEKS.findIndex(function (t) { return t === weekStart; });
    var header = WEEKS.splice(startIndex, WEEKS.length);
    var footer = WEEKS.splice(0, startIndex);
    return __spreadArrays(header, footer);
}
/**
 * 首补足
 * @param week 周几
 * @param weekStart 周起始
 */
function getStartMend(week, weekStart) {
    var weeks = _weeks(weekStart);
    var index = weeks.findIndex(function (t) { return t === week; });
    var startIndex = weeks.findIndex(function (t) { return t === weekStart; });
    return Math.abs(startIndex - index);
}
/**
 * 尾补足
 * @param week 周几
 * @param weekStart 周起始
 */
function getEndMend(week, weekStart) {
    var weeks = _weeks(weekStart);
    var index = weeks.findIndex(function (t) { return t === week; });
    return weeks.filter(function (t, ti) { return ti > index; }).length;
}
/**
 * 返回月份数据
 * @param date Date 对象 或 可被new Date对象解析;
 * @param weekStart number 周开始 0 - 6 ,默认0 从周日开始
 * @return Day[]
 */
function createMonth(date, weekStart) {
    if (weekStart === void 0) { weekStart = 1; }
    var newDate = _date(date);
    var weekEnd = weekStart - 1 < 0 ? 6 : weekStart - 1; // 可以优化
    var year = newDate.getFullYear();
    var month = newDate.getMonth(); // 当前月份的Date对象展示,非实际月份,实际月份需+1
    var currentMonth = month + 1; // 当前月份 
    var nextMonth = month + 1; // 下一月份 
    var prevMonth = month - 1; // 上一月份
    var days = new Date(year, nextMonth, 0).getDate(); // 将月份下移到下一个月份，同时将日期设置为0；由于Date里的日期是1~31，所以Date对象自动跳转到上一个月的最后一天；getDate（）获取天数即可。
    var res = [];
    for (var i = 1; i <= days; i++) {
        var day = i;
        var week = new Date(year, month, day).getDay(); // 0 - 6 ; 周日 - 周六
        // 补足上月尾信息
        if (i === 1) {
            if (weekStart !== week) {
                var mendDays = getStartMend(week, weekStart); // 需要补足天数
                for (var _i = mendDays; _i > 0; _i--) {
                    var prevDate = new Date(year, month, -_i + 1);
                    var dateInfo = getYMDW(prevDate);
                    res.push({
                        date: prevDate,
                        data: {
                            day: dateInfo.year + "/" + _fill(dateInfo.month) + "/" + _fill(dateInfo.day),
                            week: dateInfo.week,
                            current: false,
                        }
                    });
                }
            }
        }
        res.push({
            date: new Date(year, month, day),
            data: {
                day: year + "/" + _fill(currentMonth) + "/" + _fill(day),
                week: week,
                current: true,
            }
        });
        // 补足下月首信息
        if (i === days) {
            if (week !== weekEnd) {
                var mendDays = getEndMend(week, weekStart);
                for (var _i = 0; _i < mendDays; _i++) {
                    var nextDate = new Date(year, nextMonth, _i + 1);
                    var dateInfo = getYMDW(nextDate);
                    res.push({
                        date: nextDate,
                        data: {
                            day: dateInfo.year + "/" + _fill(dateInfo.month) + "/" + _fill(dateInfo.day),
                            week: dateInfo.week,
                            current: false,
                        }
                    });
                }
            }
        }
    }
    // 转二维排列数组
    res = feature_1.sliceArrary(res, 7);
    return res;
}
exports.createMonth = createMonth;

},{"./feature":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 深拷贝
 * @param {*} p  原始对象
 * @param {*} c  新对象 可选
 * @returns  object
 */
function deepClone(p, c) {
    c = c || {};
    for (var i in p) {
        if (typeof p[i] === "object") {
            c[i] = p[i].constructor === Array ? [] : {};
            deepClone(p[i], c[i]);
        }
        else {
            c[i] = p[i];
        }
    }
    return c;
}
exports.deepClone = deepClone;
/**
 *  等分切割数组
 *
 * @static
 * @param {*} arr 数组
 * @param {*} limit 份数
 * @returns
 */
function sliceArrary(arr, limit) {
    var res = [];
    for (var i = 0; i < arr.length; i += limit) {
        res.push(arr.slice(i, i + limit));
    }
    return res;
}
exports.sliceArrary = sliceArrary;
/**
 *  返回 年 月 日 周 时 分 秒 毫秒
 *
 * @static
 * @param {any} time 时间戳  毫秒级
 * @returns {年,月,日,周几,时,分,秒,毫秒}
 */
function timeObject(time) {
    var t = new Date(time);
    return {
        year: t.getFullYear(),
        month: t.getMonth() + 1,
        day: t.getDate(),
        week: t.getDay(),
        hour: t.getHours(),
        minute: t.getMinutes(),
        second: t.getSeconds(),
        millisecond: t.getMilliseconds()
    };
}
exports.timeObject = timeObject;
/**
 * 过滤url search 中的字符串
 * @param url
 * @param keys
 */
function filterUrlSearch(url, keys) {
    if (keys === void 0) { keys = []; }
    keys.forEach(function (key) {
        var reg = new RegExp(key + "=([^&]*)(&|$)", 'gi');
        url = url.replace(reg, '');
    });
    return url;
}
exports.filterUrlSearch = filterUrlSearch;
function checkOverlap(arr) {
    var startArr = [];
    var endArr = [];
    var bol = false;
    arr.forEach(function (t) {
        startArr.push(t.s);
        endArr.push(t.e);
    });
    startArr = startArr.sort();
    endArr = endArr.sort();
    for (var i = 1; i < startArr.length; i++) {
        if (startArr[i] < endArr[i - 1]) {
            bol = true;
            break;
        }
    }
    return bol;
}
exports.checkOverlap = checkOverlap;
checkOverlap([
    {
        s: 2,
        e: 4
    },
    {
        s: 1,
        e: 3
    }
]);
checkOverlap([
    {
        s: 1,
        e: 2
    }
]);

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compute = require("./compute");
exports.compute = compute;
var weixin = require("./weixin");
var dom = require("./dom");
exports.dom = dom;
var feature = require("./feature");
exports.feature = feature;
var platform = require("./platform");
exports.platform = platform;
var storage = require("./storage");
exports.storage = storage;
var date = require("./date");
exports.date = date;
var wx = weixin.wx;
exports.wx = wx;
var Utils = {
    wx: wx,
    dom: dom,
    date: date,
    compute: compute,
    feature: feature,
    storage: storage,
    platform: platform,
};
exports.default = Utils;

},{"./compute":1,"./date":2,"./dom":3,"./feature":4,"./platform":6,"./storage":7,"./weixin":8}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var u = navigator.userAgent;
function isIOS() {
    var bol = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return bol;
}
exports.isIOS = isIOS;
function isIOSX() {
    var bol = /iphone/gi.test(u) && (screen.height === 812 && screen.width === 375); // IOSX 终端
    return bol;
}
exports.isIOSX = isIOSX;
function isAndroid() {
    var bol = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
    return bol;
}
exports.isAndroid = isAndroid;
function isWX() {
    var bol = !!u.match(/MicroMessenger\/([\d.]+)/);
    return bol;
}
exports.isWX = isWX;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var l = window.localStorage; // 本地存储
var s = window.sessionStorage; // 会话存储
/**
 * 数据格式化
 * @param data 数据
 * @return parse后的数据
 */
function _parse(data) {
    var res = data;
    try {
        res = JSON.parse(data);
    }
    catch (err) {
        console.log(err);
    }
    return res;
}
/**
 * 将非string类型数据 json化 不然无法存储本地
 * @param data 数据
 * @return 字符串数据
 */
function _json(data) {
    if (typeof data === 'string') {
        return data;
    }
    else {
        return JSON.stringify(data);
    }
}
/**
 * 获取本地数据
 * @param key 变量名
 * @return 格式化后的数据
 */
function getLocal(key) {
    var result = '';
    try {
        var res = l.getItem(key);
        result = _parse(res);
    }
    catch (err) {
        console.error('get localStorage error ===>', err);
    }
    return result;
}
exports.getLocal = getLocal;
/**
 * 设置本地数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
function setLocal(key, data) {
    try {
        var newData = _json(data);
        l.setItem(key, newData);
    }
    catch (err) {
        console.error('set localStorage error ===>', err);
    }
}
exports.setLocal = setLocal;
/**
 * 移除本地数据
 * @param key 变量名
 */
function removeLocal(key) {
    try {
        l.removeItem(key);
    }
    catch (err) {
        console.error('remove localStorage error ===>', err);
    }
}
exports.removeLocal = removeLocal;
/**
 * 清除本地数据
 */
function clearLocal() {
    try {
        l.clear();
    }
    catch (err) {
        console.error('clear localStorage error ===>', err);
    }
}
exports.clearLocal = clearLocal;
/**
 * 获取会话数据
 * @param key 变量名
 * @return 格式化后的数据
 */
function getSession(key) {
    var result = '';
    try {
        var res = s.getItem(key);
        result = _parse(res);
    }
    catch (err) {
        console.error('get sessionStorage error ===>', err);
    }
    return result;
}
exports.getSession = getSession;
/**
 * 设置会话数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
function setSession(key, data) {
    try {
        var newData = _json(data);
        s.setItem(key, newData);
    }
    catch (err) {
        console.error('set sessionStorage error ===>', err);
    }
}
exports.setSession = setSession;
/**
 * 移除会话数据
 * @param key 变量名
 */
function removeSession(key) {
    try {
        s.removeItem(key);
    }
    catch (err) {
        console.error('remove sessionStorage error ===>', err);
    }
}
exports.removeSession = removeSession;
/**
 * 清空会话缓存
 */
function clearSession() {
    try {
        s.clear();
    }
    catch (err) {
        console.error('clear sessionStorage error ===>', err);
    }
}
exports.clearSession = clearSession;

},{}],8:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var weixin = require("weixin-js-sdk");
var platform_1 = require("./platform");
var feature_1 = require("./feature");
var JS_API_LIST = [
    "updateAppMessageShareData",
    "updateTimelineShareData",
    "onMenuShareWeibo",
    "onMenuShareQZone",
    "startRecord",
    "stopRecord",
    "onVoiceRecordEnd",
    "playVoice",
    "pauseVoice",
    "stopVoice",
    "onVoicePlayEnd",
    "uploadVoice",
    "downloadVoice",
    "chooseImage",
    "previewImage",
    "uploadImage",
    "downloadImage",
    "translateVoice",
    "getNetworkType",
    "openLocation",
    "getLocation",
    "hideOptionMenu",
    "showOptionMenu",
    "hideMenuItems",
    "showMenuItems",
    "hideAllNonBaseMenuItem",
    "showAllNonBaseMenuItem",
    "closeWindow",
    "scanQRCode",
    "chooseWXPay",
    "openProductSpecificView",
    "addCard",
    "chooseCard",
    "openCard"
];
/**
 * 获取当前页面URL（去除hash）
 * @returns {string} 页面URL
 */
function getCurrentURL() {
    return location.href.split('#')[0];
}
/**
 * 初始化SDK需要的参数,
 * @returns url:string 当前url 已过滤hash模式下的参数
 * @returns jsApiList:string[] 需要获取的 微信api 列表, 截止今日,写了所有的权限,省的麻烦
 */
function signatureBody() {
    var res = {
        url: getCurrentURL(),
        jsApiList: JS_API_LIST,
    };
    return res;
}
// 将微信jssdk 处理成链式调用
var fnNames = Object.keys(weixin);
var newWeixin = __assign({}, weixin);
fnNames.forEach(function (item) {
    newWeixin[item] = function () {
        console.log('传递参数 ===> ', arguments);
        weixin[item](arguments);
        return wx;
    };
});
var wx = __assign(__assign({}, newWeixin), { iosSdkStatus: false, shareConfig: {}, getJsConfig: function (body) { }, 
    /**
     * 初始化项目和数据
     * @params  shareConfig: 分享配置
     * @params  getJsConfig: 获取签名信息promise
     * @returns wx
     */
    initConfig: function (shareConfig, getJsConfig) {
        wx.shareConfig = shareConfig;
        wx.getJsConfig = getJsConfig;
        return wx;
    }, 
    /**
     * 初始化SDK
     */
    initSDK: function () {
        return new Promise(function (resolve, reject) {
            var body = signatureBody();
            wx.getJsConfig(body)
                .then(function (res) {
                newWeixin.config(res); // 配置sdk
                newWeixin.ready(function () {
                    wx.iosSdkStatus = true;
                    resolve();
                });
            })
                .catch(function (err) {
                console.error(err);
                wx.iosSdkStatus = false;
                reject(err);
            });
        });
    }, 
    /**
     * 使用微信jsapi的前置条件
     * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
     * 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复
     * @ios 在ios中,初始配置一次之后即可通用使用
     * @android 在安卓中,需要在每次路由变化时重新配置
     */
    pre: function () {
        return new Promise(function (reslove, reject) {
            if (!platform_1.isWX()) {
                console.warn('非微信环境,无需配置微信sdk');
                reslove(wx);
                return;
            }
            var isInitSDK = false;
            if (platform_1.isIOS()) {
                isInitSDK = wx.iosSdkStatus;
            }
            else if (platform_1.isAndroid()) {
                isInitSDK = false;
            }
            if (!isInitSDK) {
                wx.initSDK()
                    .then(function () { return reslove(wx); })
                    .catch(function (err) {
                    console.error(err);
                    reslove(wx);
                });
            }
            else {
                reslove(wx);
            }
        });
    }, 
    /**
     * config中,若link 并不存在,即自动将当前url 贴上去
     * @params config
     *          object 朋友圈和朋友分享内容相同
     *          array[0]: 朋友分享内容
     *          array[1]: 朋友圈分享内容
     * @params filter string[] url上可过滤的字段
     */
    share: function (config, filter) {
        if (config === void 0) { config = wx.shareConfig; }
        return __awaiter(void 0, void 0, void 0, function () {
            var chatConfig, momentConfig, currentUrl;
            return __generator(this, function (_a) {
                if (config instanceof Object) {
                    chatConfig = config;
                    momentConfig = config;
                }
                if (config instanceof Array) {
                    chatConfig = config[0];
                    momentConfig = config[1] || config[0];
                }
                currentUrl = window.location.href;
                // 过滤部分携带参数
                chatConfig.link = feature_1.filterUrlSearch(chatConfig.link || currentUrl, filter);
                momentConfig.link = feature_1.filterUrlSearch(momentConfig.link || currentUrl, filter);
                newWeixin.updateAppMessageShareData(chatConfig); // 分享给朋友 qq
                newWeixin.updateTimelineShareData(momentConfig); // 分享到朋友圈 qq空间
                return [2 /*return*/, wx];
            });
        });
    } });
exports.wx = wx;

},{"./feature":4,"./platform":6,"weixin-js-sdk":9}],9:[function(require,module,exports){
! function (e, n) {
  module.exports = n(e)
}(window, function (e, n) {
  function i(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.invoke(n, o(i),
    function(e) {
      c(n, e, t)
    }) : u(n, t)
  }
  function t(n, i, t) {
    e.WeixinJSBridge ? WeixinJSBridge.on(n,
    function(e) {
      t && t.trigger && t.trigger(e),
      c(n, e, i)
    }) : t ? u(n, t) : u(n, i)
  }
  function o(e) {
    return e = e || {},
    e.appId = C.appId,
    e.verifyAppId = C.appId,
    e.verifySignType = "sha1",
    e.verifyTimestamp = C.timestamp + "",
    e.verifyNonceStr = C.nonceStr,
    e.verifySignature = C.signature,
    e
  }
  function r(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1"
    }
  }
  function a(e) {
    return e.postalCode = e.addressPostalCode,
    delete e.addressPostalCode,
    e.provinceName = e.proviceFirstStageName,
    delete e.proviceFirstStageName,
    e.cityName = e.addressCitySecondStageName,
    delete e.addressCitySecondStageName,
    e.countryName = e.addressCountiesThirdStageName,
    delete e.addressCountiesThirdStageName,
    e.detailInfo = e.addressDetailInfo,
    delete e.addressDetailInfo,
    e
  }
  function c(e, n, i) {
    "openEnterpriseChat" == e && (n.errCode = n.err_code),
    delete n.err_code,
    delete n.err_desc,
    delete n.err_detail;
    var t = n.errMsg;
    t || (t = n.err_msg, delete n.err_msg, t = s(e, t), n.errMsg = t),
    (i = i || {})._complete && (i._complete(n), delete i._complete),
    t = n.errMsg || "",
    C.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
    case "ok":
      i.success && i.success(n);
      break;
    case "cancel":
      i.cancel && i.cancel(n);
      break;
    default:
      i.fail && i.fail(n)
    }
    i.complete && i.complete(n)
  }
  function s(e, n) {
    var i = e,
    t = v[i];
    t && (i = t);
    var o = "ok";
    if (n) {
      var r = n.indexOf(":");
      "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
      "failed" == o && (o = "fail"),
      -1 != o.indexOf("failed_") && (o = o.substring(7)),
      -1 != o.indexOf("fail_") && (o = o.substring(5)),
      "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"),
      "config" == i && "function not exist" == o && (o = "ok"),
      "" == o && (o = "fail")
    }
    return n = i + ":" + o
  }
  function d(e) {
    if (e) {
      for (var n = 0,
      i = e.length; n < i; ++n) {
        var t = e[n],
        o = h[t];
        o && (e[n] = o)
      }
      return e
    }
  }
  function u(e, n) {
    if (! (!C.debug || n && n.isInnerInvoke)) {
      var i = v[e];
      i && (e = i),
      n && n._complete && delete n._complete,
      console.log('"' + e + '",', n || "")
    }
  }
  function l(e) {
    if (! (k || w || C.debug || x < "6.0.2" || V.systemType < 0)) {
      var n = new Image;
      V.appId = C.appId,
      V.initTime = A.initEndTime - A.initStartTime,
      V.preVerifyTime = A.preVerifyEndTime - A.preVerifyStartTime,
      N.getNetworkType({
        isInnerInvoke: !0,
        success: function(e) {
          V.networkType = e.networkType;
          var i = "https://open.weixin.qq.com/sdk/report?v=" + V.version + "&o=" + V.isPreVerifyOk + "&s=" + V.systemType + "&c=" + V.clientVersion + "&a=" + V.appId + "&n=" + V.networkType + "&i=" + V.initTime + "&p=" + V.preVerifyTime + "&u=" + V.url;
          n.src = i
        }
      })
    }
  }
  function p() {
    return (new Date).getTime()
  }
  function f(n) {
    T && (e.WeixinJSBridge ? n() : S.addEventListener && S.addEventListener("WeixinJSBridgeReady", n, !1))
  }
  function m() {
    N.invoke || (N.invoke = function(n, i, t) {
      e.WeixinJSBridge && WeixinJSBridge.invoke(n, o(i), t)
    },
    N.on = function(n, i) {
      e.WeixinJSBridge && WeixinJSBridge.on(n, i)
    })
  }
  function g(e) {
    if ("string" == typeof e && e.length > 0) {
      var n = e.split("?")[0],
      i = e.split("?")[1];
      return n += ".html",
      void 0 !== i ? n + "?" + i: n
    }
  }
  if (!e.jWeixin) {
    var h = {
      config: "preVerifyJSAPI",
      onMenuShareTimeline: "menu:share:timeline",
      onMenuShareAppMessage: "menu:share:appmessage",
      onMenuShareQQ: "menu:share:qq",
      onMenuShareWeibo: "menu:share:weiboApp",
      onMenuShareQZone: "menu:share:QZone",
      previewImage: "imagePreview",
      getLocation: "geoLocation",
      openProductSpecificView: "openProductViewWithPid",
      addCard: "batchAddCard",
      openCard: "batchViewCard",
      chooseWXPay: "getBrandWCPayRequest",
      openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
      startSearchBeacons: "startMonitoringBeacons",
      stopSearchBeacons: "stopMonitoringBeacons",
      onSearchBeacons: "onBeaconsInRange",
      consumeAndShareCard: "consumedShareCard",
      openAddress: "editAddress"
    },
    v = function() {
      var e = {};
      for (var n in h) e[h[n]] = n;
      return e
    } (),
    S = e.document,
    I = S.title,
    y = navigator.userAgent.toLowerCase(),
    _ = navigator.platform.toLowerCase(),
    k = !(!_.match("mac") && !_.match("win")),
    w = -1 != y.indexOf("wxdebugger"),
    T = -1 != y.indexOf("micromessenger"),
    M = -1 != y.indexOf("android"),
    P = -1 != y.indexOf("iphone") || -1 != y.indexOf("ipad"),
    x = function() {
      var e = y.match(/micromessenger\/(\d+\.\d+\.\d+)/) || y.match(/micromessenger\/(\d+\.\d+)/);
      return e ? e[1] : ""
    } (),
    A = {
      initStartTime: p(),
      initEndTime: 0,
      preVerifyStartTime: 0,
      preVerifyEndTime: 0
    },
    V = {
      version: 1,
      appId: "",
      initTime: 0,
      preVerifyTime: 0,
      networkType: "",
      isPreVerifyOk: 1,
      systemType: P ? 1 : M ? 2 : -1,
      clientVersion: x,
      url: encodeURIComponent(location.href)
    },
    C = {},
    L = {
      _completes: []
    },
    B = {
      state: 0,
      data: {}
    };
    f(function() {
      A.initEndTime = p()
    });
    var O = !1,
    E = [],
    N = {
      config: function(e) {
        C = e,
        u("config", e);
        var n = !1 !== C.check;
        f(function() {
          if (n) i(h.config, {
            verifyJsApiList: d(C.jsApiList)
          },
          function() {
            L._complete = function(e) {
              A.preVerifyEndTime = p(),
              B.state = 1,
              B.data = e
            },
            L.success = function(e) {
              V.isPreVerifyOk = 0
            },
            L.fail = function(e) {
              L._fail ? L._fail(e) : B.state = -1
            };
            var e = L._completes;
            return e.push(function() {
              l()
            }),
            L.complete = function(n) {
              for (var i = 0,
              t = e.length; i < t; ++i) e[i]();
              L._completes = []
            },
            L
          } ()),
          A.preVerifyStartTime = p();
          else {
            B.state = 1;
            for (var e = L._completes,
            t = 0,
            o = e.length; t < o; ++t) e[t]();
            L._completes = []
          }
        }),
        m()
      },
      ready: function(e) {
        0 != B.state ? e() : (L._completes.push(e), !T && C.debug && e())
      },
      error: function(e) {
        x < "6.0.2" || ( - 1 == B.state ? e(B.data) : L._fail = e)
      },
      checkJsApi: function(e) {
        var n = function(e) {
          var n = e.checkResult;
          for (var i in n) {
            var t = v[i];
            t && (n[t] = n[i], delete n[i])
          }
          return e
        };
        i("checkJsApi", {
          jsApiList: d(e.jsApiList)
        },
        (e._complete = function(e) {
          if (M) {
            var i = e.checkResult;
            i && (e.checkResult = JSON.parse(i))
          }
          e = n(e)
        },
        e))
      },
      onMenuShareTimeline: function(e) {
        t(h.onMenuShareTimeline, {
          complete: function() {
            i("shareTimeline", {
              title: e.title || I,
              desc: e.title || I,
              img_url: e.imgUrl || "",
              link: e.link || location.href,
              type: e.type || "link",
              data_url: e.dataUrl || ""
            },
            e)
          }
        },
        e)
      },
      onMenuShareAppMessage: function(e) {
        t(h.onMenuShareAppMessage, {
          complete: function(n) {
            "favorite" === n.scene ? i("sendAppMessage", {
              title: e.title || I,
              desc: e.desc || "",
              link: e.link || location.href,
              img_url: e.imgUrl || "",
              type: e.type || "link",
              data_url: e.dataUrl || ""
            }) : i("sendAppMessage", {
              title: e.title || I,
              desc: e.desc || "",
              link: e.link || location.href,
              img_url: e.imgUrl || "",
              type: e.type || "link",
              data_url: e.dataUrl || ""
            },
            e)
          }
        },
        e)
      },
      onMenuShareQQ: function(e) {
        t(h.onMenuShareQQ, {
          complete: function() {
            i("shareQQ", {
              title: e.title || I,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href
            },
            e)
          }
        },
        e)
      },
      onMenuShareWeibo: function(e) {
        t(h.onMenuShareWeibo, {
          complete: function() {
            i("shareWeiboApp", {
              title: e.title || I,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href
            },
            e)
          }
        },
        e)
      },
      onMenuShareQZone: function(e) {
        t(h.onMenuShareQZone, {
          complete: function() {
            i("shareQZone", {
              title: e.title || I,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href
            },
            e)
          }
        },
        e)
      },
      updateTimelineShareData: function(e) {
        i("updateTimelineShareData", {
          title: e.title,
          link: e.link,
          imgUrl: e.imgUrl
        },
        e)
      },
      updateAppMessageShareData: function(e) {
        i("updateAppMessageShareData", {
          title: e.title,
          desc: e.desc,
          link: e.link,
          imgUrl: e.imgUrl
        },
        e)
      },
      startRecord: function(e) {
        i("startRecord", {},
        e)
      },
      stopRecord: function(e) {
        i("stopRecord", {},
        e)
      },
      onVoiceRecordEnd: function(e) {
        t("onVoiceRecordEnd", e)
      },
      playVoice: function(e) {
        i("playVoice", {
          localId: e.localId
        },
        e)
      },
      pauseVoice: function(e) {
        i("pauseVoice", {
          localId: e.localId
        },
        e)
      },
      stopVoice: function(e) {
        i("stopVoice", {
          localId: e.localId
        },
        e)
      },
      onVoicePlayEnd: function(e) {
        t("onVoicePlayEnd", e)
      },
      uploadVoice: function(e) {
        i("uploadVoice", {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
        },
        e)
      },
      downloadVoice: function(e) {
        i("downloadVoice", {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
        },
        e)
      },
      translateVoice: function(e) {
        i("translateVoice", {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
        },
        e)
      },
      chooseImage: function(e) {
        i("chooseImage", {
          scene: "1|2",
          count: e.count || 9,
          sizeType: e.sizeType || ["original", "compressed"],
          sourceType: e.sourceType || ["album", "camera"]
        },
        (e._complete = function(e) {
          if (M) {
            var n = e.localIds;
            try {
              n && (e.localIds = JSON.parse(n))
            } catch(e) {}
          }
        },
        e))
      },
      getLocation: function(e) {},
      previewImage: function(e) {
        i(h.previewImage, {
          current: e.current,
          urls: e.urls
        },
        e)
      },
      uploadImage: function(e) {
        i("uploadImage", {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
        },
        e)
      },
      downloadImage: function(e) {
        i("downloadImage", {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
        },
        e)
      },
      getLocalImgData: function(e) { ! 1 === O ? (O = !0, i("getLocalImgData", {
          localId: e.localId
        },
        (e._complete = function(e) {
          if (O = !1, E.length > 0) {
            var n = E.shift();
            wx.getLocalImgData(n)
          }
        },
        e))) : E.push(e)
      },
      getNetworkType: function(e) {
        var n = function(e) {
          var n = e.errMsg;
          e.errMsg = "getNetworkType:ok";
          var i = e.subtype;
          if (delete e.subtype, i) e.networkType = i;
          else {
            var t = n.indexOf(":"),
            o = n.substring(t + 1);
            switch (o) {
            case "wifi":
            case "edge":
            case "wwan":
              e.networkType = o;
              break;
            default:
              e.errMsg = "getNetworkType:fail"
            }
          }
          return e
        };
        i("getNetworkType", {},
        (e._complete = function(e) {
          e = n(e)
        },
        e))
      },
      openLocation: function(e) {
        i("openLocation", {
          latitude: e.latitude,
          longitude: e.longitude,
          name: e.name || "",
          address: e.address || "",
          scale: e.scale || 28,
          infoUrl: e.infoUrl || ""
        },
        e)
      },
      getLocation: function(e) {
        e = e || {},
        i(h.getLocation, {
          type: e.type || "wgs84"
        },
        (e._complete = function(e) {
          delete e.type
        },
        e))
      },
      hideOptionMenu: function(e) {
        i("hideOptionMenu", {},
        e)
      },
      showOptionMenu: function(e) {
        i("showOptionMenu", {},
        e)
      },
      closeWindow: function(e) {
        i("closeWindow", {},
        e = e || {})
      },
      hideMenuItems: function(e) {
        i("hideMenuItems", {
          menuList: e.menuList
        },
        e)
      },
      showMenuItems: function(e) {
        i("showMenuItems", {
          menuList: e.menuList
        },
        e)
      },
      hideAllNonBaseMenuItem: function(e) {
        i("hideAllNonBaseMenuItem", {},
        e)
      },
      showAllNonBaseMenuItem: function(e) {
        i("showAllNonBaseMenuItem", {},
        e)
      },
      scanQRCode: function(e) {
        i("scanQRCode", {
          needResult: (e = e || {}).needResult || 0,
          scanType: e.scanType || ["qrCode", "barCode"]
        },
        (e._complete = function(e) {
          if (P) {
            var n = e.resultStr;
            if (n) {
              var i = JSON.parse(n);
              e.resultStr = i && i.scan_code && i.scan_code.scan_result
            }
          }
        },
        e))
      },
      openAddress: function(e) {
        i(h.openAddress, {},
        (e._complete = function(e) {
          e = a(e)
        },
        e))
      },
      openProductSpecificView: function(e) {
        i(h.openProductSpecificView, {
          pid: e.productId,
          view_type: e.viewType || 0,
          ext_info: e.extInfo
        },
        e)
      },
      addCard: function(e) {
        for (var n = e.cardList,
        t = [], o = 0, r = n.length; o < r; ++o) {
          var a = n[o],
          c = {
            card_id: a.cardId,
            card_ext: a.cardExt
          };
          t.push(c)
        }
        i(h.addCard, {
          card_list: t
        },
        (e._complete = function(e) {
          var n = e.card_list;
          if (n) {
            for (var i = 0,
            t = (n = JSON.parse(n)).length; i < t; ++i) {
              var o = n[i];
              o.cardId = o.card_id,
              o.cardExt = o.card_ext,
              o.isSuccess = !!o.is_succ,
              delete o.card_id,
              delete o.card_ext,
              delete o.is_succ
            }
            e.cardList = n,
            delete e.card_list
          }
        },
        e))
      },
      chooseCard: function(e) {
        i("chooseCard", {
          app_id: C.appId,
          location_id: e.shopId || "",
          sign_type: e.signType || "SHA1",
          card_id: e.cardId || "",
          card_type: e.cardType || "",
          card_sign: e.cardSign,
          time_stamp: e.timestamp + "",
          nonce_str: e.nonceStr
        },
        (e._complete = function(e) {
          e.cardList = e.choose_card_info,
          delete e.choose_card_info
        },
        e))
      },
      openCard: function(e) {
        for (var n = e.cardList,
        t = [], o = 0, r = n.length; o < r; ++o) {
          var a = n[o],
          c = {
            card_id: a.cardId,
            code: a.code
          };
          t.push(c)
        }
        i(h.openCard, {
          card_list: t
        },
        e)
      },
      consumeAndShareCard: function(e) {
        i(h.consumeAndShareCard, {
          consumedCardId: e.cardId,
          consumedCode: e.code
        },
        e)
      },
      chooseWXPay: function(e) {
        i(h.chooseWXPay, r(e), e)
      },
      openEnterpriseRedPacket: function(e) {
        i(h.openEnterpriseRedPacket, r(e), e)
      },
      startSearchBeacons: function(e) {
        i(h.startSearchBeacons, {
          ticket: e.ticket
        },
        e)
      },
      stopSearchBeacons: function(e) {
        i(h.stopSearchBeacons, {},
        e)
      },
      onSearchBeacons: function(e) {
        t(h.onSearchBeacons, e)
      },
      openEnterpriseChat: function(e) {
        i("openEnterpriseChat", {
          useridlist: e.userIds,
          chatname: e.groupName
        },
        e)
      },
      launchMiniProgram: function(e) {
        i("launchMiniProgram", {
          targetAppId: e.targetAppId,
          path: g(e.path),
          envVersion: e.envVersion
        },
        e)
      },
      miniProgram: {
        navigateBack: function(e) {
          e = e || {},
          f(function() {
            i("invokeMiniProgramAPI", {
              name: "navigateBack",
              arg: {
                delta: e.delta || 1
              }
            },
            e)
          })
        },
        navigateTo: function(e) {
          f(function() {
            i("invokeMiniProgramAPI", {
              name: "navigateTo",
              arg: {
                url: e.url
              }
            },
            e)
          })
        },
        redirectTo: function(e) {
          f(function() {
            i("invokeMiniProgramAPI", {
              name: "redirectTo",
              arg: {
                url: e.url
              }
            },
            e)
          })
        },
        switchTab: function(e) {
          f(function() {
            i("invokeMiniProgramAPI", {
              name: "switchTab",
              arg: {
                url: e.url
              }
            },
            e)
          })
        },
        reLaunch: function(e) {
          f(function() {
            i("invokeMiniProgramAPI", {
              name: "reLaunch",
              arg: {
                url: e.url
              }
            },
            e)
          })
        },
        postMessage: function(e) {
          f(function() {
            i("invokeMiniProgramAPI", {
              name: "postMessage",
              arg: e.data || {}
            },
            e)
          })
        },
        getEnv: function(n) {
          f(function() {
            n({
              miniprogram: "miniprogram" === e.__wxjs_environment
            })
          })
        }
      }
    },
    b = 1,
    R = {};
    return S.addEventListener("error",
    function(e) {
      if (!M) {
        var n = e.target,
        i = n.tagName,
        t = n.src;
        if (("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) && -1 != t.indexOf("wxlocalresource://")) {
          e.preventDefault(),
          e.stopPropagation();
          var o = n["wx-id"];
          if (o || (o = b++, n["wx-id"] = o), R[o]) return;
          R[o] = !0,
          wx.ready(function() {
            wx.getLocalImgData({
              localId: t,
              success: function(e) {
                n.src = e.localData
              }
            })
          })
        }
      }
    },
    !0),
    S.addEventListener("load",
    function(e) {
      if (!M) {
        var n = e.target,
        i = n.tagName;
        n.src;
        if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
          var t = n["wx-id"];
          t && (R[t] = !1)
        }
      }
    },
    !0),
    n && (e.wx = e.jWeixin = N),
    N
  }
});
},{}]},{},[5])(5)
});

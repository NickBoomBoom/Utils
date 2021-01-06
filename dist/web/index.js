(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Utils = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var VueHistory = {
    _history: null,
    install: function (Vue, opt) {
        if (opt === void 0) { opt = {
            router: {
                onReady: null,
                push: null,
                go: null,
                replace: null
            },
            onExceed: function (obj) { },
            onExit: function (obj) { },
            onChange: function (obj) { },
        }; }
        var router = opt.router, onExceed = opt.onExceed, onExit = opt.onExit, onChange = opt.onChange;
        var that = this;
        that._history = new Proxy({
            current: 0,
            stack: [],
        }, {
            set: function (obj, prop, value) {
                obj[prop] = value;
                onChange && onChange(obj);
                return true;
            }
        });
        // 挂载到router原型上,_history
        router.constructor.prototype._history = that._history;
        // 初始化 将当前栈压入
        router.onReady(function (res) {
            that._history.stack = __spreadArrays(that._history.stack, [res]);
        });
        // 使用push的时候压栈
        router.push = new Proxy(router.push, {
            apply: function (target, obj, args) {
                return Reflect.apply(target, obj, args).then(function (res) {
                    var _a = that._history, stack = _a.stack, current = _a.current;
                    that._history.stack = __spreadArrays(stack, [res]).slice();
                    that._history.current = current + 1;
                });
            }
        });
        // replace
        router.replace = new Proxy(router.replace, {
            apply: function (target, obj, args) {
                return Reflect.apply(target, obj, args).then(function (res) {
                    var _a = that._history, stack = _a.stack, current = _a.current;
                    var newStack = stack.slice();
                    newStack[current] = res;
                    that._history.stack = newStack;
                });
            }
        });
        /*
          go函数, 非promise
          hash和history模式下源码均是  window.history.go(n)
        */
        router.go = new Proxy(router.go, {
            apply: function (target, obj, args) {
                var n = args[0];
                var stackLength = that._history.stack.length;
                var nextCurrent = that._history.current + n;
                if (nextCurrent < 0) { // 后退超过历史记录长度
                    onExit && onExit(that._history);
                    throw new Error("go(" + n + "),\u4F4E\u4E8E\u5386\u53F2\u8BB0\u5F55\u957F\u5EA6,\u65E0\u6CD5\u8DF3\u8F6C");
                }
                else if (nextCurrent >= stackLength) { // 前进超过历史记录长度
                    onExceed && onExceed(that._history);
                    throw new Error("go(" + n + "),\u8D85\u8FC7\u5386\u53F2\u8BB0\u5F55\u957F\u5EA6,\u65E0\u6CD5\u8DF3\u8F6C");
                }
                that._history.current = nextCurrent;
                return Reflect.apply(target, obj, args);
            }
        });
    },
};
exports.default = VueHistory;

},{}],2:[function(require,module,exports){
"use strict";
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
var WeChatJsSdk = require("weixin-js-sdk");
var platform_1 = require("./platform");
var feature_1 = require("./feature");
var lib_1 = require("../lib");
var WeChat = /** @class */ (function () {
    function WeChat(shareConfig, getJsSdk) {
        this.iosSdkStatus = false; // ios 配置状态
        this.shareConfig = shareConfig;
        this.getJsSdk = getJsSdk;
    }
    /**
     * 调用微信sdk函数
     * @param fnKey 微信sdk 内部函数调用 函数名
     * @param handler 传递给微信函数的参数,详情见 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4
     */
    WeChat.prototype.handler = function (fnKey, handler) {
        return WeChatJsSdk[fnKey](handler);
    };
    /**
     * 使用微信js api的前置条件
     * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
     * 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复
     * @ios 在ios中,初始配置一次之后即可通用使用(ios 中请求的url需要初次进入的url来获取签名,否则会出错)
     * @android 在安卓中,需要在每次路由变化时重新配置
     */
    WeChat.prototype.pre = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var isInitSDK, res, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!platform_1.isWX()) {
                            reject(new lib_1.Fail('非微信环境,无需配置微信sdk'));
                            return [2 /*return*/];
                        }
                        isInitSDK = platform_1.isIOS() ? this.iosSdkStatus : false;
                        if (!!isInitSDK) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getJsSdk()
                            // 配置微信 sdk
                        ];
                    case 2:
                        res = _a.sent();
                        // 配置微信 sdk
                        this.handler('config', res);
                        this.handler('ready', function () {
                            _this.iosSdkStatus = true;
                            resolve(new lib_1.Success());
                        });
                        this.handler('error', function (err) {
                            _this.iosSdkStatus = false;
                            reject(new lib_1.Fail(err));
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.iosSdkStatus = false;
                        reject(new lib_1.Fail(err_1));
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        resolve(new lib_1.Success());
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 微信sdk 分享配置(聊天 朋友圈 qq qq空间)
     * config中,若link 并不存在,即自动将当前url 贴上去
     * @params config: ShareConfig[] | ShareConfig
     *  当为数组时,
     *          array[0]: 朋友分享内容
     *          array[1]: 朋友圈分享内容  array[1] 为空则默认array[0]为朋友圈分享内容
     * @params filter string[] url上可过滤的字段
     */
    WeChat.prototype.share = function (config, filter) {
        if (config === void 0) { config = this.shareConfig; }
        var chatConfig = config[0];
        var momentConfig = config[1] || config[0];
        var currentUrl = window.location.href;
        // 过滤部分携带参数
        chatConfig.link = feature_1.filterUrlSearch(chatConfig.link || currentUrl, filter);
        momentConfig.link = feature_1.filterUrlSearch(momentConfig.link || currentUrl, filter);
        this.handler('updateAppMessageShareData', chatConfig); // 分享给朋友 qq
        this.handler('updateTimelineShareData', chatConfig); // 分享到朋友圈 qq空间
    };
    /**
     * 自动配置分享.预检sdk config后,自动配置分享内容.
     * 相当于 this.pre().then(()=> this.share())
     * @param config 分享配置
     * @param filter url上过滤字段
     * @return Promise 返回一个promise 可接续在后面添加其他处理
     */
    WeChat.prototype.autoShare = function (config, filter) {
        if (config === void 0) { config = this.shareConfig; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.pre()];
                                case 1:
                                    _a.sent();
                                    this.share(config, filter);
                                    resolve(new lib_1.Success());
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _a.sent();
                                    reject(new lib_1.Fail(err_2));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return WeChat;
}());
exports.default = WeChat;

},{"../lib":13,"./feature":7,"./platform":8,"weixin-js-sdk":15}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryString = exports.copy = void 0;
/**
 *  复制文字
 *  TODO:可能有兼容问题,目前在 PC端未发现,待真实环境测试
 * @param {*} dom 需要复制的文字 dom
 * @return  Boolean 值, true 则为复制成功, false 失败
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
/**
 * location.search 上获取name值
 * @param name
 * @return String || null
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null)
        return decodeURIComponent(r[2]);
    return null;
}
exports.getQueryString = getQueryString;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minus = exports.plus = exports.multiply = exports.divide = void 0;
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

},{}],5:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMonth = void 0;
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
 * @param weekStart number 周开始 0 - 6 ,默认1 从周一开始
 * @return Day[]
 */
function createMonth(date, weekStart) {
    if (date === void 0) { date = Date.now(); }
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
    res = feature_1.sliceArray(res, 7);
    return res;
}
exports.createMonth = createMonth;

},{"./feature":7}],6:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.off = exports.on = void 0;
var feature_1 = require("./feature");
/* ---------------- 监听函数 优化 start---------------- */
var passiveIfSupported = false;
var listenDefaultOpt = {
    capture: false,
    once: false,
    passive: true
};
// polyfill 检测当前环境是否支持 passive, 支持即默认开启 passive(默认不执行 preventDefault() )
try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function () {
            passiveIfSupported = true;
        }
    }));
}
catch (err) { }
function isPreventDefault(handler) {
    var r = /(\/\/|\/\*+)(\s)*(\w)+\.preventDefault\((\w|\s)*?\)/g; // 匹配注释中的 preventDefault 
    var r2 = /(\w)+\.preventDefault\((\w |\s)*?\)/g; // 匹配执行的preventDefault
    var txt = handler.toString().replace(r, '');
    return r2.test(txt);
}
function handlerListenOpt(config, handler) {
    if (passiveIfSupported) {
        var type = feature_1.getVarType(config);
        var handlerIsDefault = isPreventDefault(handler); // 函数内部是否执行preventDefault, true 为执行
        var passive = !handlerIsDefault; // 函数内部执行preventDefault,关闭passive
        if (type === 'Boolean') {
            return __assign(__assign({}, listenDefaultOpt), { capture: !!config, passive: passive });
        }
        if (type === 'Object') {
            return __assign(__assign(__assign({}, listenDefaultOpt), config), { passive: passive });
        }
    }
    return !!config;
}
/**
 * 开始事件监听
 * @param element 监听对象
 * @param event   监听事件
 * @param handler 监听执行函数
 * @param config  监听配置, 默认 false, 且开启passive(当执行函数内部执行preventDefault时关闭passive). 可传对象参数
 */
function on(element, event, handler, config) {
    if (config === void 0) { config = false; }
    if (document.addEventListener) {
        var params = handlerListenOpt(config, handler);
        return element.addEventListener(event, handler, params);
    }
    else {
        return element.attachEvent('on' + event, handler);
    }
}
exports.on = on;
/**
 * 移除事件监听
 * @param element 监听对象
 * @param event   监听事件
 * @param handler 监听执行函数
 * @param config  监听配置, 默认 false, 且开启passive(当执行函数内部执行preventDefault时关闭passive). 可传对象参数
 */
function off(element, event, handler, config) {
    if (config === void 0) { config = false; }
    if (document.removeEventListener) {
        var params = handlerListenOpt(config, handler);
        return element.removeEventListener(event, handler, params);
    }
    else {
        return element.detachEvent('on' + event, handler);
    }
}
exports.off = off;

},{"./feature":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageToBase64 = exports.getBase64Img = exports.filterUrlSearch = exports.checkOverlap = exports.sliceArray = exports.getVarType = void 0;
/**
 *  等分切割数组
 *
 * @static
 * @param {*} arr 数组
 * @param {*} limit 份数
 * @returns
 */
function sliceArray(arr, limit) {
    var res = [];
    for (var i = 0; i < arr.length; i += limit) {
        res.push(arr.slice(i, i + limit));
    }
    return res;
}
exports.sliceArray = sliceArray;
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
    startArr = startArr.sort(function (a, b) { return a - b; });
    endArr = endArr.sort(function (a, b) { return a - b; });
    for (var i = 1; i < startArr.length; i++) {
        if (startArr[i] < endArr[i - 1]) {
            bol = true;
            break;
        }
    }
    return bol;
}
exports.checkOverlap = checkOverlap;
/**
 * 返回对象类型, 首字母大写
 * @param variable any
 * @return String  (Object, Boolean, Number, String, Undefined, Null, Array, Function, Symbol)
 */
function getVarType(variable) {
    var type = Object.prototype.toString.call(variable);
    type.match(/\s(\S+)]$/);
    return RegExp.$1;
}
exports.getVarType = getVarType;
/**
 * 图片转化base64
 * @param img 图片dom
 */
function imageToBase64(img) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var dataURL = canvas.toDataURL('image/png');
    return dataURL;
}
exports.imageToBase64 = imageToBase64;
/**
 * 获取图片的base64
 * @param src 图片地址
 */
function getBase64Img(src) {
    return new Promise(function (resolve, reject) {
        var result = '';
        var img = new Image();
        img.crossOrigin = '';
        img.src = src;
        img.onload = function () {
            result = imageToBase64(img);
            resolve(result);
        };
        img.onerror = function (err) {
            reject(err);
        };
    });
}
exports.getBase64Img = getBase64Img;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = exports.isIOS = exports.isWX = void 0;
var u = window.navigator.userAgent;
function isIOS() {
    var bol = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return bol;
}
exports.isIOS = isIOS;
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

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSession = exports.removeSession = exports.setSession = exports.getSession = exports.clearLocal = exports.removeLocal = exports.setLocal = exports.getLocal = void 0;
var L = window.localStorage; // 本地存储
var S = window.sessionStorage; // 会话存储
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
        // console.log(err)
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
        var res = L.getItem(key);
        result = _parse(res);
    }
    catch (err) {
        throw new Error(err);
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
        L.setItem(key, newData);
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.setLocal = setLocal;
/**
 * 移除本地数据
 * @param key 变量名
 */
function removeLocal(key) {
    try {
        L.removeItem(key);
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.removeLocal = removeLocal;
/**
 * 清除本地数据
 */
function clearLocal() {
    try {
        L.clear();
    }
    catch (err) {
        throw new Error(err);
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
        var res = S.getItem(key);
        result = _parse(res);
    }
    catch (err) {
        throw new Error(err);
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
        S.setItem(key, newData);
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.setSession = setSession;
/**
 * 移除会话数据
 * @param key 变量名
 */
function removeSession(key) {
    try {
        S.removeItem(key);
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.removeSession = removeSession;
/**
 * 清空会话缓存
 */
function clearSession() {
    try {
        S.clear();
    }
    catch (err) {
        throw new Error(err);
    }
}
exports.clearSession = clearSession;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueHistory = exports.platform = exports.storage = exports.feature = exports.compute = exports.date = exports.dom = exports.bom = exports.WeChat = void 0;
var compute = require("./core/compute");
exports.compute = compute;
var WeChat_1 = require("./core/WeChat");
exports.WeChat = WeChat_1.default;
var dom = require("./core/dom");
exports.dom = dom;
var feature = require("./core/feature");
exports.feature = feature;
var platform = require("./core/platform");
exports.platform = platform;
var storage = require("./core/storage");
exports.storage = storage;
var date = require("./core/date");
exports.date = date;
var bom = require("./core/bom");
exports.bom = bom;
var VueHistory_1 = require("./core/VueHistory");
exports.VueHistory = VueHistory_1.default;
var Utils = {
    WeChat: WeChat_1.default,
    bom: bom,
    dom: dom,
    date: date,
    compute: compute,
    feature: feature,
    storage: storage,
    platform: platform,
    VueHistory: VueHistory_1.default
};
exports.default = Utils;

},{"./core/VueHistory":1,"./core/WeChat":2,"./core/bom":3,"./core/compute":4,"./core/date":5,"./core/dom":6,"./core/feature":7,"./core/platform":8,"./core/storage":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_model_1 = require("../models/lib.model");
var Fail = /** @class */ (function () {
    function Fail(err) {
        var result = {
            state: lib_model_1.State.fail,
            err: err
        };
        return result;
    }
    return Fail;
}());
exports.default = Fail;

},{"../models/lib.model":14}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_model_1 = require("../models/lib.model");
var Success = /** @class */ (function () {
    function Success(data) {
        var result = {
            state: lib_model_1.State.success,
            data: data
        };
        return result;
    }
    return Success;
}());
exports.default = Success;

},{"../models/lib.model":14}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Success = exports.Fail = void 0;
var Fail_1 = require("./Fail");
exports.Fail = Fail_1.default;
var Success_1 = require("./Success");
exports.Success = Success_1.default;

},{"./Fail":11,"./Success":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State;
(function (State) {
    State[State["fail"] = 0] = "fail";
    State[State["success"] = 1] = "success";
})(State = exports.State || (exports.State = {}));

},{}],15:[function(require,module,exports){
!(function(e, n) {
  module.exports = n(e);
})(window, function(o, e) {
  if (!o.jWeixin) {
    var n,
      c = {
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
      a = (function() {
        var e = {};
        for (var n in c) e[c[n]] = n;
        return e;
      })(),
      i = o.document,
      t = i.title,
      r = navigator.userAgent.toLowerCase(),
      s = navigator.platform.toLowerCase(),
      d = !(!s.match("mac") && !s.match("win")),
      u = -1 != r.indexOf("wxdebugger"),
      l = -1 != r.indexOf("micromessenger"),
      p = -1 != r.indexOf("android"),
      f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),
      m = (n =
        r.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
        r.match(/micromessenger\/(\d+\.\d+)/))
        ? n[1]
        : "",
      g = {
        initStartTime: L(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
      },
      h = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        isPreVerifyOk: 1,
        systemType: f ? 1 : p ? 2 : -1,
        clientVersion: m,
        url: encodeURIComponent(location.href)
      },
      v = {},
      S = { _completes: [] },
      y = { state: 0, data: {} };
    O(function() {
      g.initEndTime = L();
    });
    var I = !1,
      _ = [],
      w = {
        config: function(e) {
          B("config", (v = e));
          var t = !1 !== v.check;
          O(function() {
            if (t)
              M(
                c.config,
                {
                  verifyJsApiList: C(v.jsApiList),
                  verifyOpenTagList: C(v.openTagList)
                },
                (function() {
                  (S._complete = function(e) {
                    (g.preVerifyEndTime = L()), (y.state = 1), (y.data = e);
                  }),
                    (S.success = function(e) {
                      h.isPreVerifyOk = 0;
                    }),
                    (S.fail = function(e) {
                      S._fail ? S._fail(e) : (y.state = -1);
                    });
                  var t = S._completes;
                  return (
                    t.push(function() {
                      !(function() {
                        if (
                          !(
                            d ||
                            u ||
                            v.debug ||
                            m < "6.0.2" ||
                            h.systemType < 0
                          )
                        ) {
                          var i = new Image();
                          (h.appId = v.appId),
                            (h.initTime = g.initEndTime - g.initStartTime),
                            (h.preVerifyTime =
                              g.preVerifyEndTime - g.preVerifyStartTime),
                            w.getNetworkType({
                              isInnerInvoke: !0,
                              success: function(e) {
                                h.networkType = e.networkType;
                                var n =
                                  "https://open.weixin.qq.com/sdk/report?v=" +
                                  h.version +
                                  "&o=" +
                                  h.isPreVerifyOk +
                                  "&s=" +
                                  h.systemType +
                                  "&c=" +
                                  h.clientVersion +
                                  "&a=" +
                                  h.appId +
                                  "&n=" +
                                  h.networkType +
                                  "&i=" +
                                  h.initTime +
                                  "&p=" +
                                  h.preVerifyTime +
                                  "&u=" +
                                  h.url;
                                i.src = n;
                              }
                            });
                        }
                      })();
                    }),
                    (S.complete = function(e) {
                      for (var n = 0, i = t.length; n < i; ++n) t[n]();
                      S._completes = [];
                    }),
                    S
                  );
                })()
              ),
                (g.preVerifyStartTime = L());
            else {
              y.state = 1;
              for (var e = S._completes, n = 0, i = e.length; n < i; ++n)
                e[n]();
              S._completes = [];
            }
          }),
            w.invoke ||
              ((w.invoke = function(e, n, i) {
                o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);
              }),
              (w.on = function(e, n) {
                o.WeixinJSBridge && WeixinJSBridge.on(e, n);
              }));
        },
        ready: function(e) {
          0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());
        },
        error: function(e) {
          m < "6.0.2" || (-1 == y.state ? e(y.data) : (S._fail = e));
        },
        checkJsApi: function(e) {
          M(
            "checkJsApi",
            { jsApiList: C(e.jsApiList) },
            ((e._complete = function(e) {
              if (p) {
                var n = e.checkResult;
                n && (e.checkResult = JSON.parse(n));
              }
              e = (function(e) {
                var n = e.checkResult;
                for (var i in n) {
                  var t = a[i];
                  t && ((n[t] = n[i]), delete n[i]);
                }
                return e;
              })(e);
            }),
            e)
          );
        },
        onMenuShareTimeline: function(e) {
          P(
            c.onMenuShareTimeline,
            {
              complete: function() {
                M(
                  "shareTimeline",
                  {
                    title: e.title || t,
                    desc: e.title || t,
                    img_url: e.imgUrl || "",
                    link: e.link || location.href,
                    type: e.type || "link",
                    data_url: e.dataUrl || ""
                  },
                  e
                );
              }
            },
            e
          );
        },
        onMenuShareAppMessage: function(n) {
          P(
            c.onMenuShareAppMessage,
            {
              complete: function(e) {
                "favorite" === e.scene
                  ? M("sendAppMessage", {
                      title: n.title || t,
                      desc: n.desc || "",
                      link: n.link || location.href,
                      img_url: n.imgUrl || "",
                      type: n.type || "link",
                      data_url: n.dataUrl || ""
                    })
                  : M(
                      "sendAppMessage",
                      {
                        title: n.title || t,
                        desc: n.desc || "",
                        link: n.link || location.href,
                        img_url: n.imgUrl || "",
                        type: n.type || "link",
                        data_url: n.dataUrl || ""
                      },
                      n
                    );
              }
            },
            n
          );
        },
        onMenuShareQQ: function(e) {
          P(
            c.onMenuShareQQ,
            {
              complete: function() {
                M(
                  "shareQQ",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href
                  },
                  e
                );
              }
            },
            e
          );
        },
        onMenuShareWeibo: function(e) {
          P(
            c.onMenuShareWeibo,
            {
              complete: function() {
                M(
                  "shareWeiboApp",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href
                  },
                  e
                );
              }
            },
            e
          );
        },
        onMenuShareQZone: function(e) {
          P(
            c.onMenuShareQZone,
            {
              complete: function() {
                M(
                  "shareQZone",
                  {
                    title: e.title || t,
                    desc: e.desc || "",
                    img_url: e.imgUrl || "",
                    link: e.link || location.href
                  },
                  e
                );
              }
            },
            e
          );
        },
        updateTimelineShareData: function(e) {
          M(
            "updateTimelineShareData",
            { title: e.title, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
        updateAppMessageShareData: function(e) {
          M(
            "updateAppMessageShareData",
            { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl },
            e
          );
        },
        startRecord: function(e) {
          M("startRecord", {}, e);
        },
        stopRecord: function(e) {
          M("stopRecord", {}, e);
        },
        onVoiceRecordEnd: function(e) {
          P("onVoiceRecordEnd", e);
        },
        playVoice: function(e) {
          M("playVoice", { localId: e.localId }, e);
        },
        pauseVoice: function(e) {
          M("pauseVoice", { localId: e.localId }, e);
        },
        stopVoice: function(e) {
          M("stopVoice", { localId: e.localId }, e);
        },
        onVoicePlayEnd: function(e) {
          P("onVoicePlayEnd", e);
        },
        uploadVoice: function(e) {
          M(
            "uploadVoice",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        downloadVoice: function(e) {
          M(
            "downloadVoice",
            {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        translateVoice: function(e) {
          M(
            "translateVoice",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        chooseImage: function(e) {
          M(
            "chooseImage",
            {
              scene: "1|2",
              count: e.count || 9,
              sizeType: e.sizeType || ["original", "compressed"],
              sourceType: e.sourceType || ["album", "camera"]
            },
            ((e._complete = function(e) {
              if (p) {
                var n = e.localIds;
                try {
                  n && (e.localIds = JSON.parse(n));
                } catch (e) {}
              }
            }),
            e)
          );
        },
        getLocation: function(e) {},
        previewImage: function(e) {
          M(c.previewImage, { current: e.current, urls: e.urls }, e);
        },
        uploadImage: function(e) {
          M(
            "uploadImage",
            {
              localId: e.localId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        downloadImage: function(e) {
          M(
            "downloadImage",
            {
              serverId: e.serverId,
              isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            },
            e
          );
        },
        getLocalImgData: function(e) {
          !1 === I
            ? ((I = !0),
              M(
                "getLocalImgData",
                { localId: e.localId },
                ((e._complete = function(e) {
                  if (((I = !1), 0 < _.length)) {
                    var n = _.shift();
                    wx.getLocalImgData(n);
                  }
                }),
                e)
              ))
            : _.push(e);
        },
        getNetworkType: function(e) {
          M(
            "getNetworkType",
            {},
            ((e._complete = function(e) {
              e = (function(e) {
                var n = e.errMsg;
                e.errMsg = "getNetworkType:ok";
                var i = e.subtype;
                if ((delete e.subtype, i)) e.networkType = i;
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
                      e.errMsg = "getNetworkType:fail";
                  }
                }
                return e;
              })(e);
            }),
            e)
          );
        },
        openLocation: function(e) {
          M(
            "openLocation",
            {
              latitude: e.latitude,
              longitude: e.longitude,
              name: e.name || "",
              address: e.address || "",
              scale: e.scale || 28,
              infoUrl: e.infoUrl || ""
            },
            e
          );
        },
        getLocation: function(e) {
          M(
            c.getLocation,
            { type: (e = e || {}).type || "wgs84" },
            ((e._complete = function(e) {
              delete e.type;
            }),
            e)
          );
        },
        hideOptionMenu: function(e) {
          M("hideOptionMenu", {}, e);
        },
        showOptionMenu: function(e) {
          M("showOptionMenu", {}, e);
        },
        closeWindow: function(e) {
          M("closeWindow", {}, (e = e || {}));
        },
        hideMenuItems: function(e) {
          M("hideMenuItems", { menuList: e.menuList }, e);
        },
        showMenuItems: function(e) {
          M("showMenuItems", { menuList: e.menuList }, e);
        },
        hideAllNonBaseMenuItem: function(e) {
          M("hideAllNonBaseMenuItem", {}, e);
        },
        showAllNonBaseMenuItem: function(e) {
          M("showAllNonBaseMenuItem", {}, e);
        },
        scanQRCode: function(e) {
          M(
            "scanQRCode",
            {
              needResult: (e = e || {}).needResult || 0,
              scanType: e.scanType || ["qrCode", "barCode"]
            },
            ((e._complete = function(e) {
              if (f) {
                var n = e.resultStr;
                if (n) {
                  var i = JSON.parse(n);
                  e.resultStr = i && i.scan_code && i.scan_code.scan_result;
                }
              }
            }),
            e)
          );
        },
        openAddress: function(e) {
          M(
            c.openAddress,
            {},
            ((e._complete = function(e) {
              e = (function(e) {
                return (
                  (e.postalCode = e.addressPostalCode),
                  delete e.addressPostalCode,
                  (e.provinceName = e.proviceFirstStageName),
                  delete e.proviceFirstStageName,
                  (e.cityName = e.addressCitySecondStageName),
                  delete e.addressCitySecondStageName,
                  (e.countryName = e.addressCountiesThirdStageName),
                  delete e.addressCountiesThirdStageName,
                  (e.detailInfo = e.addressDetailInfo),
                  delete e.addressDetailInfo,
                  e
                );
              })(e);
            }),
            e)
          );
        },
        openProductSpecificView: function(e) {
          M(
            c.openProductSpecificView,
            {
              pid: e.productId,
              view_type: e.viewType || 0,
              ext_info: e.extInfo
            },
            e
          );
        },
        addCard: function(e) {
          for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
            var r = n[t],
              a = { card_id: r.cardId, card_ext: r.cardExt };
            i.push(a);
          }
          M(
            c.addCard,
            { card_list: i },
            ((e._complete = function(e) {
              var n = e.card_list;
              if (n) {
                for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
                  var o = n[i];
                  (o.cardId = o.card_id),
                    (o.cardExt = o.card_ext),
                    (o.isSuccess = !!o.is_succ),
                    delete o.card_id,
                    delete o.card_ext,
                    delete o.is_succ;
                }
                (e.cardList = n), delete e.card_list;
              }
            }),
            e)
          );
        },
        chooseCard: function(e) {
          M(
            "chooseCard",
            {
              app_id: v.appId,
              location_id: e.shopId || "",
              sign_type: e.signType || "SHA1",
              card_id: e.cardId || "",
              card_type: e.cardType || "",
              card_sign: e.cardSign,
              time_stamp: e.timestamp + "",
              nonce_str: e.nonceStr
            },
            ((e._complete = function(e) {
              (e.cardList = e.choose_card_info), delete e.choose_card_info;
            }),
            e)
          );
        },
        openCard: function(e) {
          for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
            var r = n[t],
              a = { card_id: r.cardId, code: r.code };
            i.push(a);
          }
          M(c.openCard, { card_list: i }, e);
        },
        consumeAndShareCard: function(e) {
          M(
            c.consumeAndShareCard,
            { consumedCardId: e.cardId, consumedCode: e.code },
            e
          );
        },
        chooseWXPay: function(e) {
          M(c.chooseWXPay, V(e), e);
        },
        openEnterpriseRedPacket: function(e) {
          M(c.openEnterpriseRedPacket, V(e), e);
        },
        startSearchBeacons: function(e) {
          M(c.startSearchBeacons, { ticket: e.ticket }, e);
        },
        stopSearchBeacons: function(e) {
          M(c.stopSearchBeacons, {}, e);
        },
        onSearchBeacons: function(e) {
          P(c.onSearchBeacons, e);
        },
        openEnterpriseChat: function(e) {
          M(
            "openEnterpriseChat",
            { useridlist: e.userIds, chatname: e.groupName },
            e
          );
        },
        launchMiniProgram: function(e) {
          M(
            "launchMiniProgram",
            {
              targetAppId: e.targetAppId,
              path: (function(e) {
                if ("string" == typeof e && 0 < e.length) {
                  var n = e.split("?")[0],
                    i = e.split("?")[1];
                  return (n += ".html"), void 0 !== i ? n + "?" + i : n;
                }
              })(e.path),
              envVersion: e.envVersion
            },
            e
          );
        },
        openBusinessView: function(e) {
          M(
            "openBusinessView",
            {
              businessType: e.businessType,
              queryString: e.queryString || "",
              envVersion: e.envVersion
            },
            ((e._complete = function(n) {
              if (p) {
                var e = n.extraData;
                if (e)
                  try {
                    n.extraData = JSON.parse(e);
                  } catch (e) {
                    n.extraData = {};
                  }
              }
            }),
            e)
          );
        },
        miniProgram: {
          navigateBack: function(e) {
            (e = e || {}),
              O(function() {
                M(
                  "invokeMiniProgramAPI",
                  { name: "navigateBack", arg: { delta: e.delta || 1 } },
                  e
                );
              });
          },
          navigateTo: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "navigateTo", arg: { url: e.url } },
                e
              );
            });
          },
          redirectTo: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "redirectTo", arg: { url: e.url } },
                e
              );
            });
          },
          switchTab: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "switchTab", arg: { url: e.url } },
                e
              );
            });
          },
          reLaunch: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "reLaunch", arg: { url: e.url } },
                e
              );
            });
          },
          postMessage: function(e) {
            O(function() {
              M(
                "invokeMiniProgramAPI",
                { name: "postMessage", arg: e.data || {} },
                e
              );
            });
          },
          getEnv: function(e) {
            O(function() {
              e({ miniprogram: "miniprogram" === o.__wxjs_environment });
            });
          }
        }
      },
      T = 1,
      k = {};
    return (
      i.addEventListener(
        "error",
        function(e) {
          if (!p) {
            var n = e.target,
              i = n.tagName,
              t = n.src;
            if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i)
              if (-1 != t.indexOf("wxlocalresource://")) {
                e.preventDefault(), e.stopPropagation();
                var o = n["wx-id"];
                if ((o || ((o = T++), (n["wx-id"] = o)), k[o])) return;
                (k[o] = !0),
                  wx.ready(function() {
                    wx.getLocalImgData({
                      localId: t,
                      success: function(e) {
                        n.src = e.localData;
                      }
                    });
                  });
              }
          }
        },
        !0
      ),
      i.addEventListener(
        "load",
        function(e) {
          if (!p) {
            var n = e.target,
              i = n.tagName;
            n.src;
            if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
              var t = n["wx-id"];
              t && (k[t] = !1);
            }
          }
        },
        !0
      ),
      e && (o.wx = o.jWeixin = w),
      w
    );
  }
  function M(n, e, i) {
    o.WeixinJSBridge
      ? WeixinJSBridge.invoke(n, x(e), function(e) {
          A(n, e, i);
        })
      : B(n, i);
  }
  function P(n, i, t) {
    o.WeixinJSBridge
      ? WeixinJSBridge.on(n, function(e) {
          t && t.trigger && t.trigger(e), A(n, e, i);
        })
      : B(n, t || i);
  }
  function x(e) {
    return (
      ((e = e || {}).appId = v.appId),
      (e.verifyAppId = v.appId),
      (e.verifySignType = "sha1"),
      (e.verifyTimestamp = v.timestamp + ""),
      (e.verifyNonceStr = v.nonceStr),
      (e.verifySignature = v.signature),
      e
    );
  }
  function V(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1"
    };
  }
  function A(e, n, i) {
    ("openEnterpriseChat" != e && "openBusinessView" !== e) ||
      (n.errCode = n.err_code),
      delete n.err_code,
      delete n.err_desc,
      delete n.err_detail;
    var t = n.errMsg;
    t ||
      ((t = n.err_msg),
      delete n.err_msg,
      (t = (function(e, n) {
        var i = e,
          t = a[i];
        t && (i = t);
        var o = "ok";
        if (n) {
          var r = n.indexOf(":");
          "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
            "failed" == o && (o = "fail"),
            -1 != o.indexOf("failed_") && (o = o.substring(7)),
            -1 != o.indexOf("fail_") && (o = o.substring(5)),
            ("access denied" !=
              (o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
              "no permission to execute" != o) ||
              (o = "permission denied"),
            "config" == i && "function not exist" == o && (o = "ok"),
            "" == o && (o = "fail");
        }
        return (n = i + ":" + o);
      })(e, t)),
      (n.errMsg = t)),
      (i = i || {})._complete && (i._complete(n), delete i._complete),
      (t = n.errMsg || ""),
      v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n);
    }
    i.complete && i.complete(n);
  }
  function C(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
          o = c[t];
        o && (e[n] = o);
      }
      return e;
    }
  }
  function B(e, n) {
    if (!(!v.debug || (n && n.isInnerInvoke))) {
      var i = a[e];
      i && (e = i),
        n && n._complete && delete n._complete,
        console.log('"' + e + '",', n || "");
    }
  }
  function L() {
    return new Date().getTime();
  }
  function O(e) {
    l &&
      (o.WeixinJSBridge
        ? e()
        : i.addEventListener &&
          i.addEventListener("WeixinJSBridgeReady", e, !1));
  }
});

},{}]},{},[10])(10)
});

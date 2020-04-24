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
//# sourceMappingURL=feature.js.map
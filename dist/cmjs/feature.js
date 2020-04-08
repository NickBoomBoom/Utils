"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * 倒计时
 *
 * @static
 * @param {any} time 时间戳  毫秒级
 * @returns {年,月,日,周几,时,分,秒,毫秒}
 */
function countDown(time) {
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
exports.countDown = countDown;
//# sourceMappingURL=feature.js.map
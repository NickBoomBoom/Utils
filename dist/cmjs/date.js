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
                            day: dateInfo.year + "/" + dateInfo.month + "/" + dateInfo.day,
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
                day: year + "/" + currentMonth + "/" + day,
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
                            day: dateInfo.year + "/" + dateInfo.month + "/" + dateInfo.day,
                            week: dateInfo.week,
                            current: false,
                        }
                    });
                }
            }
        }
    }
    // 转二维周排列数组
    res = feature_1.sliceArrary(res, 7);
    console.log(res);
    console.log(res.forEach(function (t) { return console.log(t.length); }));
    return res;
}
exports.createMonth = createMonth;
function init() {
}
exports.init = init;
//# sourceMappingURL=date.js.map
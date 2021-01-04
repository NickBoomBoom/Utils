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
export { divide, multiply, plus, minus };
//# sourceMappingURL=compute.js.map
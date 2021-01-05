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
export { getVarType, sliceArray, checkOverlap, filterUrlSearch, getBase64Img, imageToBase64 };
//# sourceMappingURL=feature.js.map
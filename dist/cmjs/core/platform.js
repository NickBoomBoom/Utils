"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=platform.js.map
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
//# sourceMappingURL=platform.js.map
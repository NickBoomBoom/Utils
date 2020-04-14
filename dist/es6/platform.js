function isIOS() {
    var u = navigator.userAgent;
    var bol = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return bol;
}
function isIOSX() {
    var u = navigator.userAgent;
    var bol = /iphone/gi.test(u) && (screen.height === 812 && screen.width === 375); // IOSX 终端
    return bol;
}
function isAndroid() {
    var u = navigator.userAgent;
    var bol = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
    return bol;
}
function isWX() {
    var u = navigator.userAgent;
    var bol = !!u.match(/MicroMessenger\/([\d.]+)/);
    return bol;
}
export { isWX, isIOS, isIOSX, isAndroid };
//# sourceMappingURL=platform.js.map
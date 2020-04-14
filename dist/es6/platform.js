var u = navigator.userAgent;
function isIOS() {
    var bol = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return bol;
}
function isIOSX() {
    var bol = /iphone/gi.test(u) && (screen.height === 812 && screen.width === 375); // IOSX 终端
    return bol;
}
function isAndroid() {
    var bol = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
    return bol;
}
function isWX() {
    var bol = !!u.match(/MicroMessenger\/([\d.]+)/);
    return bol;
}
export { isWX, isIOS, isIOSX, isAndroid };
//# sourceMappingURL=platform.js.map
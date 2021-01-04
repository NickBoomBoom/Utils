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
import { getVarType } from './feature';
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
        var type = getVarType(config);
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
/* ---------------- 监听函数 优化 end---------------- */
export { on, off };
//# sourceMappingURL=dom.js.map
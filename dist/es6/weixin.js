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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as weixin from 'weixin-js-sdk';
import { isIOS, isWX, isAndroid } from './platform';
import { filterUrlSearch } from './feature';
var JS_API_LIST = [
    "updateAppMessageShareData",
    "updateTimelineShareData",
    "onMenuShareWeibo",
    "onMenuShareQZone",
    "startRecord",
    "stopRecord",
    "onVoiceRecordEnd",
    "playVoice",
    "pauseVoice",
    "stopVoice",
    "onVoicePlayEnd",
    "uploadVoice",
    "downloadVoice",
    "chooseImage",
    "previewImage",
    "uploadImage",
    "downloadImage",
    "translateVoice",
    "getNetworkType",
    "openLocation",
    "getLocation",
    "hideOptionMenu",
    "showOptionMenu",
    "hideMenuItems",
    "showMenuItems",
    "hideAllNonBaseMenuItem",
    "showAllNonBaseMenuItem",
    "closeWindow",
    "scanQRCode",
    "chooseWXPay",
    "openProductSpecificView",
    "addCard",
    "chooseCard",
    "openCard"
];
/**
 * 获取当前页面URL（去除hash）
 * @returns {string} 页面URL
 */
function getCurrentURL() {
    return location.href.split('#')[0];
}
/**
 * 初始化SDK需要的参数,
 * @returns url:string 当前url 已过滤hash模式下的参数
 * @returns jsApiList:string[] 需要获取的 微信api 列表, 截止今日,写了所有的权限,省的麻烦
 */
function signatureBody() {
    var res = {
        url: getCurrentURL(),
        jsApiList: JS_API_LIST,
    };
    return res;
}
console.log(111, weixin);
// 将微信jssdk 处理成链式调用
var fnNames = Object.keys(weixin);
var newWeixin = __assign({}, weixin);
fnNames.forEach(function (item) {
    newWeixin[item] = function () {
        console.error(arguments);
        weixin[item](arguments);
        return wx;
    };
});
console.log(222, newWeixin);
var wx = __assign(__assign({}, newWeixin), { iosSdkStatus: false, shareConfig: {}, getJsConfig: function (body) { }, 
    /**
     * 初始化项目和数据
     * @params  shareConfig: 分享配置
     * @params  getJsConfig: 获取签名信息promise
     * @returns wx
     */
    initConfig: function (shareConfig, getJsConfig) {
        wx.shareConfig = shareConfig;
        wx.getJsConfig = getJsConfig;
        return wx;
    }, 
    /**
     * 初始化SDK
     */
    initSDK: function () {
        return new Promise(function (resolve, reject) {
            var body = signatureBody();
            wx.getJsConfig(body)
                .then(function (res) {
                newWeixin.config(res); // 配置sdk
                newWeixin.ready(function () {
                    wx.iosSdkStatus = true;
                    resolve();
                });
            })
                .catch(function (err) {
                console.error(err);
                wx.iosSdkStatus = false;
                reject(err);
            });
        });
    }, 
    /**
     * 使用微信jsapi的前置条件
     * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
     * 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复
     * @ios 在ios中,初始配置一次之后即可通用使用
     * @android 在安卓中,需要在每次路由变化时重新配置
     */
    pre: function () {
        return new Promise(function (reslove, reject) {
            if (!isWX()) {
                console.warn('非微信环境,无需配置微信sdk');
                reslove(wx);
                return;
            }
            var isInitSDK = false;
            if (isIOS()) {
                isInitSDK = wx.iosSdkStatus;
            }
            else if (isAndroid()) {
                isInitSDK = false;
            }
            if (!isInitSDK) {
                wx.initSDK()
                    .then(function () { return reslove(wx); })
                    .catch(function (err) {
                    console.error(err);
                    reslove(wx);
                });
            }
            else {
                reslove(wx);
            }
        });
    }, 
    /**
     * config中,若link 并不存在,即自动将当前url 贴上去
     * @params config
     *          object 朋友圈和朋友分享内容相同
     *          array[0]: 朋友分享内容
     *          array[1]: 朋友圈分享内容
     * @params filter string[] url上可过滤的字段
     */
    share: function (config, filter) {
        if (config === void 0) { config = wx.shareConfig; }
        return __awaiter(void 0, void 0, void 0, function () {
            var chatConfig, momentConfig, currentUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wx.pre()];
                    case 1:
                        _a.sent();
                        if (config instanceof Object) {
                            chatConfig = config;
                            momentConfig = config;
                        }
                        if (config instanceof Array) {
                            chatConfig = config[0];
                            momentConfig = config[1] || config[0];
                        }
                        currentUrl = window.location.href;
                        // 过滤部分携带参数
                        chatConfig.link = filterUrlSearch(chatConfig.link || currentUrl, filter);
                        momentConfig.link = filterUrlSearch(momentConfig.link || currentUrl, filter);
                        newWeixin.updateAppMessageShareData(chatConfig); // 分享给朋友 qq
                        newWeixin.updateTimelineShareData(momentConfig); // 分享到朋友圈 qq空间
                        return [2 /*return*/, wx];
                }
            });
        });
    } });
export { wx };
//# sourceMappingURL=weixin.js.map
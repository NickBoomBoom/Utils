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
import * as WeChatJsSdk from 'weixin-js-sdk';
import { isIOS, isWX } from './platform';
import { filterUrlSearch } from './feature';
import { Fail, Success } from '../lib';
var WeChat = /** @class */ (function () {
    function WeChat(shareConfig, getJsSdk) {
        this.iosSdkStatus = false; // ios 配置状态
        this.shareConfig = shareConfig;
        this.getJsSdk = getJsSdk;
    }
    /**
     * 调用微信sdk函数
     * @param fnKey 微信sdk 内部函数调用 函数名
     * @param handler 传递给微信函数的参数,详情见 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4
     */
    WeChat.prototype.handler = function (fnKey, handler) {
        return WeChatJsSdk[fnKey](handler);
    };
    /**
     * 使用微信js api的前置条件
     * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
     * 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复
     * @ios 在ios中,初始配置一次之后即可通用使用(ios 中请求的url需要初次进入的url来获取签名,否则会出错)
     * @android 在安卓中,需要在每次路由变化时重新配置
     */
    WeChat.prototype.pre = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var isInitSDK, res, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isWX()) {
                            reject(new Fail('非微信环境,无需配置微信sdk'));
                            return [2 /*return*/];
                        }
                        isInitSDK = isIOS() ? this.iosSdkStatus : false;
                        if (!!isInitSDK) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getJsSdk()
                            // 配置微信 sdk
                        ];
                    case 2:
                        res = _a.sent();
                        // 配置微信 sdk
                        this.handler('config', res);
                        this.handler('ready', function () {
                            _this.iosSdkStatus = true;
                            resolve(new Success());
                        });
                        this.handler('error', function (err) {
                            _this.iosSdkStatus = false;
                            reject(new Fail(err));
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.iosSdkStatus = false;
                        reject(new Fail(err_1));
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        resolve(new Success());
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 微信sdk 分享配置(聊天 朋友圈 qq qq空间)
     * config中,若link 并不存在,即自动将当前url 贴上去
     * @params config: ShareConfig[] | ShareConfig
     *  当为数组时,
     *          array[0]: 朋友分享内容
     *          array[1]: 朋友圈分享内容  array[1] 为空则默认array[0]为朋友圈分享内容
     * @params filter string[] url上可过滤的字段
     */
    WeChat.prototype.share = function (config, filter) {
        if (config === void 0) { config = this.shareConfig; }
        var chatConfig = config[0];
        var momentConfig = config[1] || config[0];
        var currentUrl = window.location.href;
        // 过滤部分携带参数
        chatConfig.link = filterUrlSearch(chatConfig.link || currentUrl, filter);
        momentConfig.link = filterUrlSearch(momentConfig.link || currentUrl, filter);
        this.handler('updateAppMessageShareData', chatConfig); // 分享给朋友 qq
        this.handler('updateTimelineShareData', chatConfig); // 分享到朋友圈 qq空间
    };
    /**
     * 自动配置分享.预检sdk config后,自动配置分享内容.
     * 相当于 this.pre().then(()=> this.share())
     * @param config 分享配置
     * @param filter url上过滤字段
     * @return Promise 返回一个promise 可接续在后面添加其他处理
     */
    WeChat.prototype.autoShare = function (config, filter) {
        if (config === void 0) { config = this.shareConfig; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.pre()];
                                case 1:
                                    _a.sent();
                                    this.share(config, filter);
                                    resolve(new Success());
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _a.sent();
                                    reject(new Fail(err_2));
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return WeChat;
}());
export default WeChat;
//# sourceMappingURL=WeChat.js.map
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var weixin = require("weixin-js-sdk");
var wx = /** @class */ (function () {
    /**
     * *前置:  IOS的配置一次就行，android的话就要每跳到一个新页面（也就是通过History.pushState()改变了当前地址栏URL）就重新生成签名并进行配置
     *
     * @param ajax Promise 请求微信jsconfig,
     * 返回微信config配置参数
     * {
     *    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     *    appId: '', // 必填，公众号的唯一标识
     *    timestamp: , // 必填，生成签名的时间戳
     *    nonceStr: '', // 必填，生成签名的随机串
     *    signature: '',// 必填，签名
     *    jsApiList: [] // 必填，需要使用的JS接口列表}
     * }
     * @param config Object || Arrary
     * 当为对象时.朋友圈,qq空间,qq,微信 分享内容统一;
     * 当为数组时,config[0] qq,朋友内容, config[1] qq空间,朋友圈内容
     * {
     *    title:"",
     *    desc:"",
     *    link: "",
     *    imgUrl:""
     * }
     */
    function wx(ajax, config) {
        this.config = {};
        this.ajax = function () { };
        this.success = false;
        this.config = config;
        this.ajax = ajax;
        this.init();
    }
    wx.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wxConfig, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.ajax()];
                    case 2:
                        wxConfig = _a.sent();
                        weixin.config(wxConfig); // 配置sdk
                        weixin.ready(function () {
                            _this.success = true;
                            _this.setShare();
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    wx.prototype.setShare = function () {
        var chatConfig;
        var momentConfig;
        if (this.config instanceof Object) {
            chatConfig = this.config;
            momentConfig = this.config;
        }
        if (this.config instanceof Array) {
            chatConfig = this.config[0];
            momentConfig = this.config[1];
        }
        weixin.updateAppMessageShareData(chatConfig); // 分享给朋友 qq
        weixin.updateTimelineShareData(momentConfig); // 分享到朋友圈 qq空间
    };
    return wx;
}());
exports.default = wx;
//# sourceMappingURL=weixin.js.map
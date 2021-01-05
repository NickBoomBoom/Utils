"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueHistory = exports.platform = exports.storage = exports.feature = exports.compute = exports.date = exports.dom = exports.bom = exports.WeChat = void 0;
var compute = require("./core/compute");
exports.compute = compute;
var WeChat_1 = require("./core/WeChat");
exports.WeChat = WeChat_1.default;
var dom = require("./core/dom");
exports.dom = dom;
var feature = require("./core/feature");
exports.feature = feature;
var platform = require("./core/platform");
exports.platform = platform;
var storage = require("./core/storage");
exports.storage = storage;
var date = require("./core/date");
exports.date = date;
var bom = require("./core/bom");
exports.bom = bom;
var VueHistory_1 = require("./core/VueHistory");
exports.VueHistory = VueHistory_1.default;
var Utils = {
    WeChat: WeChat_1.default,
    bom: bom,
    dom: dom,
    date: date,
    compute: compute,
    feature: feature,
    storage: storage,
    platform: platform,
    VueHistory: VueHistory_1.default
};
exports.default = Utils;
//# sourceMappingURL=index.js.map
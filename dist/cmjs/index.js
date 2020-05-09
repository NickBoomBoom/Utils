"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compute = require("./compute");
exports.compute = compute;
var weixin_1 = require("./weixin");
exports.WX = weixin_1.default;
var dom = require("./dom");
exports.dom = dom;
var feature = require("./feature");
exports.feature = feature;
var platform = require("./platform");
exports.platform = platform;
var storage = require("./storage");
exports.storage = storage;
var date = require("./date");
exports.date = date;
var bom = require("./bom");
exports.bom = bom;
var Utils = {
    WX: weixin_1.default,
    bom: bom,
    dom: dom,
    date: date,
    compute: compute,
    feature: feature,
    storage: storage,
    platform: platform,
};
exports.default = Utils;
//# sourceMappingURL=index.js.map
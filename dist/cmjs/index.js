"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compute = require("./compute");
exports.compute = compute;
var weixin = require("./weixin");
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
var wx = weixin.wx;
exports.wx = wx;
var Utils = {
    wx: wx,
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
import * as compute from './compute';
import * as weixin from './weixin';
import * as dom from './dom';
import * as feature from './feature';
import * as platform from './platform';
import * as storage from './storage';
import * as date from './date';
import * as bom from './bom';
var wx = weixin.wx;
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
export { wx, bom, dom, date, compute, feature, storage, platform, };
export default Utils;
//# sourceMappingURL=index.js.map
import * as compute from './compute';
import * as weixin from './weixin';
import * as dom from './dom';
import * as feature from './feature';
import * as platform from './platform';
import * as storage from './storage';
import * as date from './date';
var wx = weixin.wx;
var Utils = {
    wx: wx,
    dom: dom,
    date: date,
    compute: compute,
    feature: feature,
    storage: storage,
    platform: platform,
};
export { wx, dom, date, compute, feature, storage, platform, };
export default Utils;
//# sourceMappingURL=index.js.map
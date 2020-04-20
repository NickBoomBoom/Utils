import * as compute from './compute';
import * as weixin from './weixin';
import * as dom from './dom';
import * as feature from './feature';
import * as platform from './platform';
import * as storage from './storage';
var wx = weixin.wx;
var Utils = {
    wx: wx,
    dom: dom,
    compute: compute,
    feature: feature,
    storage: storage,
    platform: platform,
};
export { wx, dom, compute, feature, storage, platform, };
export default Utils;
//# sourceMappingURL=index.js.map
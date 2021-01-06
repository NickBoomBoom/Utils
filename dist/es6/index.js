import * as compute from './core/compute';
import WeChat from './core/WeChat';
import * as dom from './core/dom';
import * as feature from './core/feature';
import * as platform from './core/platform';
import * as storage from './core/storage';
import * as date from './core/date';
import * as bom from './core/bom';
import VueHistory from './core/VueHistory';
import * as WeChatJsSDK from 'weixin-js-sdk';
var Utils = {
    WeChat: WeChat,
    bom: bom,
    dom: dom,
    date: date,
    compute: compute,
    feature: feature,
    storage: storage,
    platform: platform,
    VueHistory: VueHistory,
    WeChatJsSDK: WeChatJsSDK
};
export { WeChat, bom, dom, date, compute, feature, storage, platform, VueHistory, WeChatJsSDK };
export default Utils;
//# sourceMappingURL=index.js.map
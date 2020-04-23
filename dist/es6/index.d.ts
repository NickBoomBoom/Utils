import * as compute from './compute';
import * as dom from './dom';
import * as feature from './feature';
import * as platform from './platform';
import * as storage from './storage';
import * as date from './date';
declare const wx: any;
declare const Utils: {
    wx: any;
    dom: typeof dom;
    date: typeof date;
    compute: typeof compute;
    feature: typeof feature;
    storage: typeof storage;
    platform: typeof platform;
};
export { wx, dom, date, compute, feature, storage, platform, };
export default Utils;

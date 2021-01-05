import * as compute from './core/compute';
import WeChat from './core/WeChat';
import * as dom from './core/dom';
import * as feature from './core/feature';
import * as platform from './core/platform';
import * as storage from './core/storage';
import * as date from './core/date';
import * as bom from './core/bom';
import VueHistory from './core/VueHistory';
declare const Utils: {
    WeChat: typeof WeChat;
    bom: typeof bom;
    dom: typeof dom;
    date: typeof date;
    compute: typeof compute;
    feature: typeof feature;
    storage: typeof storage;
    platform: typeof platform;
    VueHistory: {
        _history: any;
        install(Vue: any, opt?: {
            router: {
                onReady: any;
                push: any;
                go: any;
                replace: any;
            };
            onExceed: (obj: any) => void;
            onExit: (obj: any) => void;
            onChange: (obj: any) => void;
        }): void;
    };
};
export { WeChat, bom, dom, date, compute, feature, storage, platform, VueHistory };
export default Utils;

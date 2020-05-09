export interface JsConfig {
    debug?: boolean;
    appId: string | number;
    timestamp: number | string;
    nonceStr: string;
    signature: string;
    jsApiList: string[];
}
export interface ShareConfig {
    title: string;
    desc: string;
    link?: string;
    imgUrl: string;
}

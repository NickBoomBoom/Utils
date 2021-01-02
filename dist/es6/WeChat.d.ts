import { ShareConfig, JsConfig } from './models/weChat.model';
export default class WeChat {
    private shareConfig;
    private getJsSdk;
    private iosSdkStatus;
    constructor(shareConfig: ShareConfig[], getJsSdk: Promise<JsConfig>);
    /**
     * 调用微信sdk函数
     * @param fnKey 微信sdk 内部函数调用 函数名
     * @param handler 传递给微信函数的参数,详情见 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4
     */
    handler(fnKey: string, handler: any): any;
    /**
     * 使用微信js api的前置条件
     * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
     * 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复
     * @ios 在ios中,初始配置一次之后即可通用使用(ios 中请求的url需要初次进入的url来获取签名,否则会出错)
     * @android 在安卓中,需要在每次路由变化时重新配置
     */
    pre(): Promise<any>;
    /**
     * 微信sdk 分享配置(聊天 朋友圈 qq qq空间)
     * config中,若link 并不存在,即自动将当前url 贴上去
     * @params config: ShareConfig[] | ShareConfig
     *  当为数组时,
     *          array[0]: 朋友分享内容
     *          array[1]: 朋友圈分享内容  array[1] 为空则默认array[0]为朋友圈分享内容
     * @params filter string[] url上可过滤的字段
     */
    share(config?: ShareConfig[], filter?: string[]): void;
    /**
     * 自动配置分享.预检sdk config后,自动配置分享内容.
     * 相当于 this.pre().then(()=> this.share())
     * @param config 分享配置
     * @param filter url上过滤字段
     * @return Promise 返回一个promise 可接续在后面添加其他处理
     */
    autoShare(config?: ShareConfig[], filter?: string[]): Promise<any>;
}

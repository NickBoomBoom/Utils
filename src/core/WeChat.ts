import { isIOS, isWX } from './platform'
import { filterUrlSearch } from './feature'
import { ShareConfig, JsConfig } from '../models/weChat.model';

//  weixin-js-sdk 文档:  https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4
export class WeChat {
  private WeChatJsSdk: any;
  private shareConfig: ShareConfig[]
  private getJsSdk: any  // 最后返回 jsConfig 配置信息 
  private iosSdkStatus: boolean = false // ios 配置状态
  constructor(
    WeChatJsSdk: any,
    shareConfig: ShareConfig[],
    getJsSdk: Promise<JsConfig>
  ) {
    this.shareConfig = shareConfig;
    this.getJsSdk = getJsSdk;
    this.WeChatJsSdk = WeChatJsSdk
  }

  /**
   * 使用微信js api的前置条件
   * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
   * 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复
   * @ios 在ios中,初始配置一次之后即可通用使用(ios 中请求的url需要初次进入的url来获取签名,否则会出错)
   * @android 在安卓中,需要在每次路由变化时重新配置
   */
  pre(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!isWX()) {
        return reject('非微信环境,无需配置微信sdk')
      }

      // ios 配置一次即可,其余每次必须重新导入
      let isInitSDK: boolean = isIOS() ? this.iosSdkStatus : false

      if (!isInitSDK) {
        try {
          const res: JsConfig = await this.getJsSdk()
          // 配置微信 sdk
          this.WeChatJsSdk.config(res)
          // 配置成功
          this.WeChatJsSdk.ready(() => {
            this.iosSdkStatus = true
            resolve({})
          })
          // 配置报错
          this.WeChatJsSdk.error((err: any) => {
            this.iosSdkStatus = false
            reject(err)
          })
        } catch (err) {
          this.iosSdkStatus = false
          reject(err)
        }
      } else {
        resolve({})
      }
    })
  }

  /**
   * 微信sdk 分享配置(聊天 朋友圈 qq qq空间)
   * config中,若link 并不存在,即自动将当前url 贴上去
   * @params config: ShareConfig[] | ShareConfig
   *  当为数组时,
   *          array[0]: 朋友分享内容
   *          array[1]: 朋友圈分享内容  array[1] 为空则默认array[0]为朋友圈分享内容
   * @params filter string[] url上可过滤的字段
   */
  share(config: ShareConfig[] = this.shareConfig, filter?: string[]) {
    const chatConfig: ShareConfig = config[0]
    const momentConfig: ShareConfig = config[1] || config[0]

    const currentUrl = window.location.href
    // 过滤部分携带参数
    chatConfig.link = filterUrlSearch(chatConfig.link || currentUrl, filter)
    momentConfig.link = filterUrlSearch(momentConfig.link || currentUrl, filter)

    this.WeChatJsSdk.updateAppMessageShareData(chatConfig)// 分享给朋友 qq
    this.WeChatJsSdk.updateTimelineShareData(momentConfig)// 分享到朋友圈 qq空间
  }

  /**
   * 自动配置分享.预检sdk config后,自动配置分享内容. 
   * 相当于 this.pre().then(()=> this.share())
   * @param config 分享配置
   * @param filter url上过滤字段
   * @return Promise 返回一个promise 可接续在后面添加其他处理 
   */
  async autoShare(config: ShareConfig[] = this.shareConfig, filter?: string[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.pre()
        this.share(config, filter)
        resolve({})
      } catch (err) {
        reject(err)
      }
    })
  }
}

import * as weixin from 'weixin-js-sdk'
import { isIOS, isWX, isAndroid } from './platform'
import { filterUrlSearch } from './feature'

interface SignatureBody {
  url: string,
  jsApiList: string[]
}

interface ShareConfig {
  title: string,
  desc: string,
  link?: string,
  imgUrl: string
}

const JS_API_LIST: string[] = [
  "updateAppMessageShareData",
  "updateTimelineShareData",
  "onMenuShareWeibo",
  "onMenuShareQZone",
  "startRecord",
  "stopRecord",
  "onVoiceRecordEnd",
  "playVoice",
  "pauseVoice",
  "stopVoice",
  "onVoicePlayEnd",
  "uploadVoice",
  "downloadVoice",
  "chooseImage",
  "previewImage",
  "uploadImage",
  "downloadImage",
  "translateVoice",
  "getNetworkType",
  "openLocation",
  "getLocation",
  "hideOptionMenu",
  "showOptionMenu",
  "hideMenuItems",
  "showMenuItems",
  "hideAllNonBaseMenuItem",
  "showAllNonBaseMenuItem",
  "closeWindow",
  "scanQRCode",
  "chooseWXPay",
  "openProductSpecificView",
  "addCard",
  "chooseCard",
  "openCard"
]

/**
 * 获取当前页面URL（去除hash）
 * @returns {string} 页面URL
 */
function getCurrentURL(): string {
  return location.href.split('#')[0]
}

/**
 * 初始化SDK需要的参数,
 * @returns url:string 当前url 已过滤hash模式下的参数
 * @returns jsApiList:string[] 需要获取的 微信api 列表, 截止今日,写了所有的权限,省的麻烦
 */
function signatureBody(): SignatureBody {
  const res: SignatureBody = {
    url: getCurrentURL(),
    jsApiList: JS_API_LIST,
  }
  return res
}

// 将微信jssdk 处理成链式调用
const fnNames = Object.keys(weixin)

let newWeixin = {
  ...weixin
}

fnNames.forEach(item => {
  newWeixin[item] = function () {
    weixin[item](arguments)
    return wx
  }
})

const wx = {
  ...newWeixin,

  iosSdkStatus: false, // ios 配置状态
  shareConfig: [],
  getJsConfig: (body: SignatureBody) => { }, // 默认接受组件传递过去的url和api参数

  /** 
   * 初始化项目和数据
   * @params  shareConfig: 分享配置
   * @params  getJsConfig: 获取签名信息promise
   * @returns wx
   */
  initConfig: (shareConfig: ShareConfig[], getJsConfig: Promise<any>): any => {
    wx.shareConfig = shareConfig
    wx.getJsConfig = getJsConfig
    return wx
  },

  /**
   * 初始化SDK
   */
  initSDK: (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const body = signatureBody()
      wx.getJsConfig(body)
        .then(res => {
          newWeixin.config(res) // 配置sdk
          newWeixin.ready(() => {
            wx.iosSdkStatus = true
            resolve()
          })
        })
        .catch(err => {
          console.error(err)
          wx.iosSdkStatus = false
          reject(err)
        })
    })
  },
  /**
   * 使用微信jsapi的前置条件
   * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用
   * 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复
   * @ios 在ios中,初始配置一次之后即可通用使用
   * @android 在安卓中,需要在每次路由变化时重新配置
   */
  pre: (): Promise<any> => {
    return new Promise((reslove, reject) => {
      if (!isWX()) {
        console.warn('非微信环境,无需配置微信sdk')
        reslove(wx)
        return
      }

      let isInitSDK: boolean = false

      if (isIOS()) {
        isInitSDK = wx.iosSdkStatus
      } else if (isAndroid()) {
        isInitSDK = false
      }

      if (!isInitSDK) {
        wx.initSDK()
          .then(() => reslove(wx))
          .catch(err => {
            console.error(err)
            reslove(wx)
          })
      } else {
        reslove(wx)
      }
    })
  },

  /**
   * config中,若link 并不存在,即自动将当前url 贴上去
   * @params config 
   *          object 朋友圈和朋友分享内容相同
   *          array[0]: 朋友分享内容
   *          array[1]: 朋友圈分享内容
   * @params filter string[] url上可过滤的字段
   */
  share: async (config: ShareConfig[] = wx.shareConfig, filter: string[]) => {
    const chatConfig: ShareConfig = config[0]
    const momentConfig: ShareConfig = config[1] || config[0]

    const currentUrl = window.location.href
    // 过滤部分携带参数
    chatConfig.link = filterUrlSearch(chatConfig.link || currentUrl, filter)
    momentConfig.link = filterUrlSearch(momentConfig.link || currentUrl, filter)

    newWeixin.updateAppMessageShareData(chatConfig) // 分享给朋友 qq
    newWeixin.updateTimelineShareData(momentConfig) // 分享到朋友圈 qq空间

    return wx
  }
}
export {
  wx
}
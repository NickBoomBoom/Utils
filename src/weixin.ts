import * as weixin from 'weixin-js-sdk'
import { isIOS, isWX, isAndroid } from './feature'

/**
 * *前置:  IOS的配置一次就行，android的话就要每跳到一个新页面（也就是通过History.pushState()改变了当前地址栏URL）就重新生成签名并进行配置
 *
 * @param ajax Promise 请求微信jsconfig,
 * 返回微信config配置参数
 * {
 *    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
 *    appId: '', // 必填，公众号的唯一标识
 *    timestamp: , // 必填，生成签名的时间戳
 *    nonceStr: '', // 必填，生成签名的随机串
 *    signature: '',// 必填，签名
 *    jsApiList: [] // 必填，需要使用的JS接口列表}
 * }
 * @param _config Object || Arrary
 * 当为对象时.朋友圈,qq空间,qq,微信 分享内容统一;
 * 当为数组时,config[0] qq,朋友内容, config[1] qq空间,朋友圈内容
 * {
 *    title:"",
 *    desc:"",
 *    link: "",
 *    imgUrl:""
 * }
 */

const _isIOS = isIOS()
const _isAndroid = isAndroid()
let success = false
const wx = {
  ...weixin,

  _config: {},

  _init: (ajax) => {
    return new Promise((resolve, reject) => {
      ajax()
        .then(res => {
          weixin.config(res) // 配置sdk
          weixin.ready(() => {
            success = true
            resolve()
          })
        })
        .catch((err) => {
          success = false
          reject(err)
        })
    })
  },

  _setConfig: config => {
    wx._config = config
    return wx
  },

  _setShare:async (ajax) => {
    if (!success) {
      await wx._init(ajax)
    }

    if (_isAndroid) {
      await wx._init(ajax)
    }
    let chatConfig
    let momentConfig
    if (wx._config instanceof Object) {
      chatConfig = wx._config
      momentConfig = wx._config
    }

    if (wx._config instanceof Array) {
      chatConfig = wx._config[0]
      momentConfig = wx._config[1]
    }

    weixin.updateAppMessageShareData(chatConfig) // 分享给朋友 qq
    weixin.updateTimelineShareData(momentConfig) // 分享到朋友圈 qq空间
  }
}
export default wx
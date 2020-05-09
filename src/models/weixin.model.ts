
export interface JsConfig {
  debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: string | number; // 必填，公众号的唯一标识
  timestamp: number | string ; // 必填，生成签名的时间戳
  nonceStr: string; // 必填，生成签名的随机串
  signature: string;// 必填，签名
  jsApiList: string[] // 必填，需要使用的JS接口列表
}

export interface ShareConfig {
  title: string;
  desc: string;
  link?: string;
  imgUrl: string
}

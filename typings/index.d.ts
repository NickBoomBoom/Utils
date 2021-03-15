declare module 'weixin-js-sdk' {
  const config: (e: any) => any
  const ready: (e: any) => any
  const error: (e: any) => any
  const checkJsApi: (e: any) => any
  const onMenuShareTimeline: (e: any) => any
  const onMenuShareAppMessage: (e: any) => any
  const onMenuShareQQ: (e: any) => any
  const onMenuShareWeibo: (e: any) => any
  const updateTimelineShareData: (e: any) => any
  const updateAppMessageShareData: (e: any) => any
  const startRecord: (e: any) => any
  const stopRecord: (e: any) => any
  const onVoiceRecordEnd: (e: any) => any
  const playVoice: (e: any) => any
  const pauseVoice: (e: any) => any
  const stopVoice: (e: any) => any
  const onVoicePlayEnd: (e: any) => any
  const uploadVoice: (e: any) => any
  const downloadVoice: (e: any) => any
  const translateVoice: (e: any) => any
  const onMenuShareQZone: (e: any) => any
  const chooseImage: (e: any) => any
  const getLocation: (e: any) => any
  const previewImage: (e: any) => any
  const uploadImage: (e: any) => any
  const downloadImage: (e: any) => any
  const getLocalImgData: (e: any) => any
  const getNetworkType: (e: any) => any
  const openLocation: (e: any) => any
  const hideOptionMenu: (e: any) => any
  const showOptionMenu: (e: any) => any
  const closeWindow: (e: any) => any
  const hideMenuItems: (e: any) => any
  const showMenuItems: (e: any) => any
  const hideAllNonBaseMenuItem: (e: any) => any
  const showAllNonBaseMenuItem: (e: any) => any
  const scanQRCode: (e: any) => any
  const openAddress: (e: any) => any
  const openProductSpecificView: (e: any) => any
  const addCard: (e: any) => any
  const chooseCard: (e: any) => any
  const openCard: (e: any) => any
  const consumeAndShareCard: (e: any) => any
  const chooseWXPay: (e: any) => any
  const openEnterpriseRedPacket: (e: any) => any
  const startSearchBeacons: (e: any) => any
  const stopSearchBeacons: (e: any) => any
  const onSearchBeacons: (e: any) => any
  const openEnterpriseChat: (e: any) => any
  const launchMiniProgram: (e: any) => any
  const openBusinessView: (e: any) => any
  const miniProgram: MiniProgram
}


interface MiniProgram {
  navigateBack: (e: any) => any
  navigateTo: (e: any) => any
  redirectTo: (e: any) => any
  switchTab: (e: any) => any
  reLaunch: (e: any) => any
  postMessage: (e: any) => any
  getEnv: (e: any) => any
}




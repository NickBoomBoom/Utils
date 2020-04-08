declare class wx {
    config: {};
    ajax: () => void;
    success: boolean;
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
     * @param config Object || Arrary
     * 当为对象时.朋友圈,qq空间,qq,微信 分享内容统一;
     * 当为数组时,config[0] qq,朋友内容, config[1] qq空间,朋友圈内容
     * {
     *    title:"",
     *    desc:"",
     *    link: "",
     *    imgUrl:""
     * }
     */
    constructor(ajax: any, config: any);
    init(): Promise<void>;
    setShare(): void;
}
export default wx;

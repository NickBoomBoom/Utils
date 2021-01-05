# utils94(工具类函数集结)

| 工具类   | 功能                        |
| -------- | --------------------------- |
| WeChat   | 微信端jssdk处理             |
| dom      | dom 相关                    |
| bom      | bom 相关                    |
| date     | 时间相关(日历生成)          |
| compute  | 计算方法(解决js计算精度bug) |
| feature  | 功能                        |
| storage  | 缓存                        |
| platform | 平台判断                    |



## 快速使用

```
yarn add utils94 

import Utils from 'utils94'

import { WeChat, dom, bom... } from 'utils94'

```



## 1. WeChat

  本包依赖已经引入 "weixin-js-sdk": "^1.4.0-test", 当前版本 1.6
  无需再次引入wexin-js-sdk

| Api       | Feat                        | Params                                                       | Return                              |
| :-------- | :-------------------------- | :----------------------------------------------------------- | :---------------------------------- |
| pre       | 自检函数，使用微信sdk前自检 |                                                              | Promise                             |
| share     | 配置分享内容                | 1.object[] ：对象数组，第一个对象为朋友，qq分享内容，第二个对象为朋友圈，qq空间分享内容。（第二个对象不传则第一个对象默认为第一个对象）分享内容 ：{title, desc, link, imgUrl}<br />2.string[]：过滤分享link上的部分query字段 |                                     |
| autoShare | 自动配置分享                | 参数同share                                                  | Promise<br />可在配置成功后继续处理 |

  

### 1.1 微信端js配置使用方法

  ```javascript
      const shareConfig = {
        title: '微信分享title',
        desc: '详细',
        link: window.location.href,
        imgUrl:''
      }

      const request =async (body) => {
        /** 
         * !划重点!!!!
         * ios中,url 必须是初次进入的url. 且ios 仅需配置一次即可.
         * android中, 需要每次进入新的页面都需要配置一次. 每次配置
         * url 需要过滤 #及之后的参数
        */
        const {url, jsApiList} = body
        const config = await api.initJsSdk(body)
        /*  config:{
              debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: string | number; // 必填，公众号的唯一标识
              timestamp: number | string ; // 必填，生成签名的时间戳
              nonceStr: string; // 必填，生成签名的随机串
              signature: string;// 必填，签名
              jsApiList: string[] // 必填，需要使用的JS接口列表 
            }
        */
        return config
      }

      // 初始化配置(必须)
      const weChat = new Utils.WeChat(
        [
          shareConfig
        ],
        request
      )
      
      // 日常使用 1 
   	  weChat.pre().then(()=> {
				weChat.share([shareConfig,shareConfig], ['token'])
        // dosomething
      })

			// 日常使用 2
			weChat.autoShare([shareConfig,shareConfig], ['token'])
				.then(()=>{
        	// dosomething
      	})

  ```

   ## 2. dom

| Api  | Feat                                                         | Params                                                       | Return |
| :--- | :----------------------------------------------------------- | :----------------------------------------------------------- | :----- |
| on   | 添加监听事件（默认开启passive 优化，自动识别执行函数，智能开启） | 1.element: 监听对象<br />2.event：监听事件<br />3.function：执行函数<br />4.object \| boolean：传对象，capture, once, passive; 传boolean，false：冒泡，true：捕获 |        |
| off  | 移除监听事件                                                 | 同on                                                         |        |

  

  ## 3. bom

| Api            | Feat                             | Params              | Return         |
| :------------- | :------------------------------- | :------------------ | :------------- |
| copy           | 复制文字                         | 1.HTMLDocument：dom | boolean        |
| getQueryString | 获取当前location.search上的key值 | 1.string：key值     | string \| null |

 

  ## 4. date

| Api         | Feat             | Params                                                       | Return                                                       |
| :---------- | :--------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| createMonth | 创建当前月份信息 | 1.Date \| string \| number：不传默认当前机器时间月份<br />2.number：周开始定义，默认1，周一开始 | 二维对象数组，以周为单位分割。<br />date: Date,<br />data:{<br />day:'2020/12/01'<br />week: 1, <br />current: true // 是否为今天<br />} |

 

  ## 5. compute

| Api      | Feat | Params                 | Return |
| :------- | :--- | :--------------------- | :----- |
| divide   | 除法 | 1.number<br />2.number | number |
| multiply | 乘法 | 同上                   | number |
| plus     | 加法 | 同上                   | number |
| minus    | 减法 | 同上                   | number |



  ## 6. feature

| Api             | Feat                   | Params                                                       | Return                                                       |
| :-------------- | :--------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| getVarType      | 获取变量类型           | 1.any                                                        | string<br />Object,String,Number,Null,Undefined,Array,Function,Symbol |
| sliceArray      | 数组切割               | 1.array<br />2.number 隔多少份切割                           | array                                                        |
| checkOverlap    | 检测时间是否重叠       | 1.object[]<br />[<br />{<br />s: 2019/12/2,<br />e:2020/2/2<br />}<br />] | Boolean                                                      |
| filterUrlSearch | 过滤url上query中的字段 | 1. string url<br />2. string[]                               | string 过滤后的url                                           |
| getBase64Img    | 获取图片的base64       | 1.string 图片地址                                            | Promise<string> 返回base64                                   |
| imageToBase64   | imgDom 转化base64      | 1.dom img dom                                                | string base64                                                |



  ## 7. storage

| Api           | Feat             | Params                        | Return              |
| :------------ | :--------------- | :---------------------------- | :------------------ |
| getLocal      | 获取本地缓存数据 | 1.string key                  | string \| undefined |
| setLocal      | 设置本地缓存     | 1.string key<br />2.any value |                     |
| removeLocal   | 移除本地缓存数据 | 1.string key                  |                     |
| clearLocal    | 清空本地缓存     |                               |                     |
| getSession    | 获取浏览器缓存   | 1.string key                  | string \| undefined |
| setSession    | 设置浏览器缓存   | 1.string key<br />2.any value |                     |
| removeSession | 移除浏览器缓存   | 1.string key                  |                     |
| clearSession  | 清空浏览器缓存   |                               |                     |



  ## 8. platform



| Api       | Feat           | Params | Return  |
| :-------- | :------------- | :----- | :------ |
| isWX      | 是否为微信环境 |        | boolean |
| isIOS     | 是否为ios      |        | boolean |
| isAndroid | 是否为安卓     |        | boolean |
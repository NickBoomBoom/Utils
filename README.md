# utils94(工具类函数集结)

| 工具类      | 功能                  |
| ----------- | --------------------- |
| WeChat      | 微信端jssdk处理       |
| dom         | dom 相关              |
| bom         | bom 相关              |
| date        | 时间相关(日历生成)    |
| feature     | 功能                  |
| storage     | 缓存                  |
| platform    | 平台判断              |
| VueHistory  | 记录vue的页面跳转信息 |
| WeChatJsSDK | weixin-js-sdk 1.6版本 |
| Decimal     | js 计算精度解决方案   |
|             |                       |



## 快速使用

**当前全套typescript编写，只编译输出target:ES5，module:ES6，因为ES模块是官方标准，也是以后JavaScript的发展方向，且ES模块支持静态分析，方便tree shacking**

2.0.0 版本后 改为 ES6的 import 模块加载

历史版本只有1.0.0 到 1.0.6  umd 版本

```
yarn add utils94 

import Utils from 'utils94'

import { WeChat, dom, bom... } from 'utils94'

```



## 1. WeChat

  本包依赖已经引入 "weixin-js-sdk": "^1.4.0-test", 当前版本 1.6
  无需再次引入wexin-js-sdk

  - new WeChat( [{title,desc,link,imgUrl},{title,link,imgUrl}], requset) 初始化

    ```javascript
    import {WeChat} from 'utils94' 
    
    // 朋友，QQ分享内容
    const friendShareConfig = {
      title: '微信分享title',
      desc: '详细',
      link: window.location.href,
      imgUrl:''
    }
    // 朋友圈，QQ空间分享内容
    const momentShareConfig = {
      title: '', // 分享标题
      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
    }
    
    const request =async (body) => {
      /** 
        * !划重点!!!!
        * ios中,url 必须是初次进入的url. 且ios 仅需配置一次即可.
        * android中, 需要每次进入新的页面都需要配置一次. 每次配置
        * url 需要过滤 #及之后的参数
      **/
      const {url, jsApiList} = body
      const config = await api.initJsSdk(body)
      /**  config:{
            debug?: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: string | number; // 必填，公众号的唯一标识
            timestamp: number | string ; // 必填，生成签名的时间戳
            nonceStr: string; // 必填，生成签名的随机串
            signature: string;// 必填，签名
            jsApiList: string[] // 必填，需要使用的JS接口列表 
          }
      **/
      return config
    }
    
    // 初始化配置(必须)
    const wx = new WeChat(
      [
        friendShareConfig,
        momentShareConfig
      ],
      request
    )
    ```

    

  - pre 前置预检，

  - 返回Promise

    ```javascript
    wx.pre().then(res => {
      // 配置成功
      // dosomething
    }).catch(err=>{
      // 配置失败
    })
    ```

    

  - share( [{title,desc,link,imgUrl},{title,link,imgUrl}], filter:string[]) 分享设置，filter可过滤掉link上携带的query字段，如‘token’；

  - 无返回

    ```javascript
    wx.pre().then(()=> {
      // 当momentShareConfig 不传时，默认 friendShareConfig 替代
      wx.share([friendShareConfig, momentShareConfig], ['token'])
    })
    ```



  - autoShare( [{title,desc,link,imgUrl},{title,link,imgUrl}], filter:string[]) 自动分享设置，filter可过滤掉link上携带的query字段，如‘token’；

  - 返回Promise

    ```javascript
    // 当momentShareConfig 不传时，默认 friendShareConfig 替代
    wx.autoShare([friendShareConfig, momentShareConfig], ['token']).then(()=> {
      // dosomething
    })
    ```

    
## 2. dom

  - on(element, event, function, object | boolean) 事件监听

  - 返回 监听函数

    [关于passive 的情况，点击了解](https://nick-qi.github.io/base/base.html#addeventlistener-passive-%E4%BC%98%E5%8C%96%EF%BC%88%E5%88%92%E9%87%8D%E7%82%B9%EF%BC%89)

    ```javascript
    import { dom } from 'utils94'
    // ! 自动检查并开启passive 优化
    
    // 事件监听
    dom.on(
      window, 
      'scroll', 
      e => { /* dosomething */},
      {
        capture: false, // boolean 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
        once: false, 		// boolean 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
        passive: true		// boolean 设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
      }
    )
    
    dom.on(
    	window,
      'scroll',
      e => { /* dosomething */},
    	false  // false: 冒泡 默认； true：捕获
    )
    
    ```

    

- off(element, event, function, object | boolean)  移除事件监听

- 返回 移除监听函数

  ```javascript
  import { dom } from 'utils94'
  
  // 移除事件监听
  dom.off(
  	window,
    'scroll',
    e => { /* dosomething */},
    {
      capture: false, 
      once: false, 
      passive: true
    }
  )
  
  dom.off(
  	window,
    'scroll',
    e => { /* dosomething */},
  	false
  )
  ```

  

## 3. bom

  - copy(element) 复制dom中的文字

  - 返回 boolean，true 成功；false 失败

    ```javascript
    import { bom } from 'utils94'
    const el = document.querySelector('#text')
    bom.copy(el) 
    ```

    

## 4. date

  - createMonth(date?:Date | string | number = Date.now()，weekStart?: number = 1 ) 不传默认当前机器时间月份, weekStart: 1  默认周一开始

  - 返回二维对象数组，以周为单位分割

    ```javascript
    import { date } from 'utils94'
    const arr = date.createMonth()
    /* 返回 
    [
      [
        {
          "date": "2020-12-27T16:00:00.000Z",  // Date 对象
          "data": {														 // 数据
            "day": "2020/12/28",							 // 当前日期
            "week": 1,												 // 周几	
            "current": false									 // 是否为当前月数据
          }
        }
        ...
      ],
      ...
    ]
    */
    ```

     
## 5. feature

| 函数                                                 | 功能                                       |
| ---------------------------------------------------- | ------------------------------------------ |
| getVarType(var:any) : string                         | 获取变量类型                               |
| sliceArray(arr:any[], limit: number) : any[any[]]    | 等分切割数组                               |
| filterUrlSearch(url:string, keys: string[]) : string | 过滤url search 中的字符串                  |
| checkOverlap(arr: {s:number, e: number}[]) : boolean | 检测时间是否重叠                           |
| getBase64Img(url: string): Promise<string>           | 图片地址转base64                           |
| imageToBase64(img: HTMLElement): string              | 图片标签转化base64                         |
| guid():string                                        | guid生成                                   |
| flatten(arr: any[]): any[]                           | 数组拍平                                   |
| jsonParse(data: any): any                            | 数据格式化，将被转为string的数据 parse出来 |
| toString(data: any) : string                         | 将数据stringfy                             |
| fillZero(num: number \| string) :string              | 前置补0                                    |
|                                                      |                                            |
|                                                      |                                            |

## 6. storage

| 工具类         | 功能                                            |
| -------------- | ----------------------------------------------- |
| LocalStorage   | window.localStorage 的 get, set, remove,clear   |
| SessionStorage | window.sessionStorage 的 get, set, remove,clear |
| CookieStorage  | js-cookie的 get,set, remove                     |

```javascript
import { LocalStorage, SessionStorage, CookieStorage } from 'utils94/storage'
LocalStorage.set('test', {a:1})  // test '{"a":1}'
LocalStorage.get('test' )  // {a: 1}
LocalStorage.remove('test') // void
LocalStorage.clear() // void

// 其他两个同上使用，只不过CookieStorage 支持传递配置项，且没有clear函数
```


## 7. platform

  - isWX() 是否为微信环境

  - 返回boolean

    

  - isIOS() 是否为ios

  - 返回boolean

    
  
  - isAndroid() 是否为安卓
  
  - 返回boolean



## 8. VueHistory

  原生vue-router 上并不提供 页面跳转记录。

  **仅支持vue-router 3.1.0 及以上版本**

  通过proxy 添加历史记录，在$router上挂载了 _history 字段

  _history: {

  ​	current: number,  // 当前路由下标

  ​	stack: [], // 历史栈数组

  }

  ```javascript
  import {VueHistory} from 'utils94'
  import Vue from 'vue'
  import router from 'router'
  Vue.use(Vue, {
    router, // 路由实例
    onExceed: (obj) => { }, // 前进 超过历史记录 返回历史记录信息 _history
    onExit: (obj) => { }, 	// 后退 低于历史记录 返回历史记录信息 _history
    onChange: (obj) => { }, // 堆栈信息变化 返回历史记录信息 _history
  })
  ```

## 9. Decimal.js 
一个解决js计算精度问题的解决方案

[npm地址](https://www.npmjs.com/package/decimal.js)


# utils94(工具类函数集结)
```
  WX          // 微信端jssdk处理
  dom         // dom 相关
  bom         // bom 相关
  date        // 时间相关(日历生成)
  compute     // 计算方法(解决js计算精度bug)
  feature     // 功能
  storage     // 数据存储
  platform    // 平台判断
```

## 快速使用
```
yarn add utils94 

import Utils from 'utils94'

import { WX, dom, bom... } from 'utils94'

```
  
## 1.WX

  微信端js配置使用方法

  ```javascript
      const config = {
        title: '微信分享title',
        desc: '详细',
        link: window.location.href,
        imgUrl:''
      }

      const request =async (body) => {
        /** 
         * 划重点!!!!
         * ios中,url 必须是初次进入的url. 且ios 仅需配置一次即可.
         * android中, 需要每次进入新的页面都需要配置一次. 每次配置
         * url 需要过滤 #及之后的参数
        */
        const {url, jsApiList} = body
        // 可对数据再处理
        return api.initJsSdk(body)
      }

      // 初始化配置(必须)
      const wx = new Utils.WX(
        [
          config
        ],
        request
      )

      // 非微信sdk 函数均没有自检是否配置成功;
      // 若要使用,可在页面mounted 后使用,即: 
      // pre 是自检函数,自动配置,返回Promise
      mounted() {
        wx.pre().then(()=>{
          wx.share()
          wx.handler('hideAllNonBaseMenuItem')
        })
      }
  ```

   ## 2.dom
  ```javascript
      // 暂无
  ```

  ## 3.bom
  ```javascript
    copy(dom)                  // 复制文字 
    viewPortHeight()   // 返回视窗高度
  ```

  ## 4.date
  ```javascript
    createMonth(Date | string | number)  // 创建当前月份信息

  ```

  ## 5.compute
  ```javascript
    divide(number1, number2)   // 除 法
    multiply(number1, number2) // 乘 法
    plus(number1, number2)     // 加 法
    minus(number1, number2)    // 减 法
  ```

  ## 6.feature
  ```javascript
      deepClone(oldObj, newOld)  // 深拷贝
      sliceArrary(array, limit)  // 等分切割
      timeObject(time)           // 返回 年 月 日 周 时 分 秒 毫秒
      filterUrlSearch(url, filter)// 过滤关键字
      checkOverlap([{s:1, e:2}, {s:2,e:4}]) // 检测重叠
  ```

  ## 7.storage
  ```javascript
    // localStorage 见名知意
    getLocal(key)
    setLocal(key,data)
    removeLocal(key)
    clearLocal()
    // sessionStorage 见名知意
    getSession(key)
    setSession(key,data)
    removeSession(key)
    clearSession()

  ```

  ## 8.platform
  ```javascript
      isWX():boolean
      isIOS():boolean
      isIOSX():boolean
      isAndroid():boolean
  ```
 
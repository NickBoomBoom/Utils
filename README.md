# utils94(工具类函数集结)
```
  wx          // 微信端jssdk处理
  compute     // 计算方法(解决js计算精度bug)
  dom         // dom 相关
  feature     // 功能
  platform    // 平台判断
```

## 快速使用
```
yarn add utils94 

import * as Utils from 'utils94'

```
  
## 1.wx

  微信端js配置使用方法(可通过Utils.wx[FunctionName] 来调用 微信SDK 中的方法)

  ```javascript
      const config = {
        title: '微信分享title',
        desc: '详细',
        link: window.location.href,
        imgUrl:''
      }

      const request =async (body) => {
        const {url, jsApiList} = body
        // 可对数据再处理
        return api.initJsSdk(body)
      }

      // 初始化配置(必须)
      Utils.wx.initConfig(config,request)

      //1. 直接调用分享设置,会有预检查,是否配置成功
      Utils.wx.share()

      //2. 其他函数调用暂未封装 若要使用.
      Utils.wx.pre().then(()=> {
        Utils.wx.hideAllNonBaseMenuItem()
      })
  ```

  ## 2.compute
  ```javascript
    divide(number1, number2)   // 除 法
    multiply(number1, number2) // 乘 法
    plus(number1, number2)     // 加 法
    minus(number1, number2)    // 减 法
  ```

  ## 3.dom
  ```javascript
    viewPortHeight()   // 返回视窗高度
  ```

  ## 4.feature
  ```javascript
      copy(dom)                  // 复制文字 
      deepClone(oldObj, newOld)  // 深拷贝
      sliceArrary(array, limit)  // 等分切割
      timeObject(time)           // 返回 年 月 日 周 时 分 秒 毫秒
      filterUrlSearch(url, filter)// 过滤关键字
  ```

  ## 5.platform
  ```javascript
      isWX():boolean
      isIOS():boolean
      isIOSX():boolean
      isAndroid():boolean
  ```
# Utils

工具类函数集结

## wx

  微信端js配置使用方法
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
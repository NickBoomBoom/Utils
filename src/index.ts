/*
 * @Author: q.chen.work q.chen.work@outlook.com
 * @Date: 2023-01-12 10:04:48
 * @LastEditors: q.chen.work q.chen.work@outlook.com
 * @LastEditTime: 2023-01-12 10:32:43
 * @FilePath: /Utils/src/index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by q.chen.work q.chen.work@outlook.com, All Rights Reserved. 
 */
 
import WeChat from './core/WeChat'
import * as dom from './core/dom'
import * as feature from './core/feature'
import * as platform from './core/platform'
import * as storage from './core/storage'
import * as date from './core/date'
import * as bom from './core/bom'
import VueHistory from './core/VueHistory';
import * as WeChatJsSDK from 'weixin-js-sdk'
import * as Decimal  from 'decimal.js'
const Utils = {
  WeChat,
  bom,
  dom,
  date,
  feature,
  storage,
  platform,
  VueHistory,
  WeChatJsSDK,
  Decimal
}

export {
  WeChat,
  bom,
  dom,
  date,
  feature,
  storage,
  platform,
  VueHistory,
  WeChatJsSDK,
  Decimal
}

export default Utils
/*
 * @Author: q.chen.work q.chen.work@outlook.com
 * @Date: 2023-01-12 10:04:48
 * @LastEditors: q.chen.work q.chen.work@outlook.com
 * @LastEditTime: 2023-01-17 12:46:52
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
  Decimal
}

export default Utils
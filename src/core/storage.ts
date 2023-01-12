/*
 * @Author: q.chen.work q.chen.work@outlook.com
 * @Date: 2023-01-12 10:04:48
 * @LastEditors: q.chen.work q.chen.work@outlook.com
 * @LastEditTime: 2023-01-12 11:02:29
 * @FilePath: /Utils/src/core/storage.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by q.chen.work q.chen.work@outlook.com, All Rights Reserved. 
 */

import { jsonParse, toString } from "./feature"
import * as  Cookies from 'js-cookie'
class BrowserStorage {
  target: any;
  constructor(target: any) {
    this.target = target
  }
  /**
  * 获取数据
  * @param key 变量名
  * @return 格式化后的数据
  */
  get(key: string): any {
    const res = this.target.getItem(key)
    const result = res ? jsonParse(res) : res
    return result
  }
  /**
 * 设置数据
 * @param key 变量名
 * @param value 初始数据:非string类型数据均要json转化
 */
  set(key: string, value: any) {
    this.target.setItem(key, toString(value))
  }

  /**
   * 移除数据
   * @param key 变量名
   */
  remove(key: string) {
    this.target.removeItem(key)
  }
  /**
   * 清除数据
   */
  clear(): void {
    this.target.clear()
  }
}
const LocalStorage = new BrowserStorage(window.localStorage)
const SessionStorage = new BrowserStorage(window.sessionStorage)
const CookieStorage = {
  /**
* 获取数据
* @param key 变量名
* @return 格式化后的数据
*/
  get: (key: string): any => {
    const res = Cookies.get(key)
    return res ? jsonParse(res) : res
  },
  /**
 * 设置数据
 * @param key 变量名
 * @param value 初始数据:非string类型数据均要json转化
 */
  set: (key: string, value: any, option: Cookies.CookieAttributes = {}): void => {
    Cookies.set(key, toString(value), option)
  },
  /**
 * 移除数据
 * @param key 变量名
 */
  remove: (key: string, option: Cookies.CookieAttributes = {}): void => {
    Cookies.remove(key, option)
  }
}

export {
  BrowserStorage,
  LocalStorage,
  SessionStorage,
  CookieStorage
}
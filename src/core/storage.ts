 
import { jsonParse, toString } from "./feature"
import * as Cookies from 'js-cookie'
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
export const LocalStorage = new BrowserStorage(window.localStorage)
export const SessionStorage = new BrowserStorage(window.sessionStorage)
export const CookieStorage = {
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

export const storage = {
  BrowserStorage,
  LocalStorage,
  SessionStorage,
  CookieStorage
}

const l = window.localStorage  // 本地存储
const s = window.sessionStorage // 会话存储

/**
 * 数据格式化
 * @param data 数据
 * @return parse后的数据
 */
function _parse(data: any): any {
  let res = data
  try {
    res = JSON.parse(data)
  } catch (err) {
    // console.log(err)
  }
  return res
}

/**
 * 将非string类型数据 json化 不然无法存储本地
 * @param data 数据
 * @return 字符串数据
 */
function _json(data: any): string {
  if (typeof data === 'string') {
    return data
  } else {
    return JSON.stringify(data)
  }
}

/**
 * 获取本地数据
 * @param key 变量名
 * @return 格式化后的数据
 */
function getLocal(key: string): any {
  let result: any = ''

  try {
    let res = l.getItem(key)
    result = _parse(res)
  } catch (err) {
    throw new Error(err)
  }

  return result
}

/**
 * 设置本地数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
function setLocal(key: string, data: any): void {
  try {
    const newData = _json(data)
    l.setItem(key, newData)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * 移除本地数据
 * @param key 变量名
 */
function removeLocal(key: string): void {
  try {
    l.removeItem(key)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * 清除本地数据
 */
function clearLocal(): void {
  try {
    l.clear()
  } catch (err) {
    throw new Error(err)
  }
}


/**
 * 获取会话数据
 * @param key 变量名
 * @return 格式化后的数据
 */
function getSession(key: string): any {
  let result: any = ''

  try {
    let res = s.getItem(key)
    result = _parse(res)
  } catch (err) {
    throw new Error(err)
  }

  return result
}

/**
 * 设置会话数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
function setSession(key: string, data: any): void {
  try {
    const newData = _json(data)
    s.setItem(key, newData)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * 移除会话数据
 * @param key 变量名
 */
function removeSession(key: string): void {
  try {
    s.removeItem(key)
  } catch (err) {
    throw new Error(err)

  }
}

/**
 * 清空会话缓存
 */
function clearSession(): void {
  try {
    s.clear()
  } catch (err) {
    throw new Error(err)
  }
}


export {
  getLocal,
  setLocal,
  removeLocal,
  clearLocal,

  getSession,
  setSession,
  removeSession,
  clearSession
}
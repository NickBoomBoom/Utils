/**
 * 获取本地数据
 * @param key 变量名
 * @return 格式化后的数据
 */
declare function getLocal(key: string): any;
/**
 * 设置本地数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
declare function setLocal(key: string, data: any): void;
/**
 * 移除本地数据
 * @param key 变量名
 */
declare function removeLocal(key: string): void;
/**
 * 清除本地数据
 */
declare function clearLocal(): void;
/**
 * 获取会话数据
 * @param key 变量名
 * @return 格式化后的数据
 */
declare function getSession(key: string): any;
/**
 * 设置会话数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
declare function setSession(key: string, data: any): void;
/**
 * 移除会话数据
 * @param key 变量名
 */
declare function removeSession(key: string): void;
/**
 * 清空会话缓存
 */
declare function clearSession(): void;
export { getLocal, setLocal, removeLocal, clearLocal, getSession, setSession, removeSession, clearSession };

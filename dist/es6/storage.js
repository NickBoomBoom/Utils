var l = window.localStorage; // 本地存储
var s = window.sessionStorage; // 会话存储
/**
 * 数据格式化
 * @param data 数据
 * @return parse后的数据
 */
function _parse(data) {
    var res = data;
    try {
        res = JSON.parse(data);
    }
    catch (err) {
        // console.log(err)
    }
    return res;
}
/**
 * 将非string类型数据 json化 不然无法存储本地
 * @param data 数据
 * @return 字符串数据
 */
function _json(data) {
    if (typeof data === 'string') {
        return data;
    }
    else {
        return JSON.stringify(data);
    }
}
/**
 * 获取本地数据
 * @param key 变量名
 * @return 格式化后的数据
 */
function getLocal(key) {
    var result = '';
    try {
        var res = l.getItem(key);
        result = _parse(res);
    }
    catch (err) {
        console.error('get localStorage error ===>', err);
    }
    return result;
}
/**
 * 设置本地数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
function setLocal(key, data) {
    try {
        var newData = _json(data);
        l.setItem(key, newData);
    }
    catch (err) {
        console.error('set localStorage error ===>', err);
    }
}
/**
 * 移除本地数据
 * @param key 变量名
 */
function removeLocal(key) {
    try {
        l.removeItem(key);
    }
    catch (err) {
        console.error('remove localStorage error ===>', err);
    }
}
/**
 * 清除本地数据
 */
function clearLocal() {
    try {
        l.clear();
    }
    catch (err) {
        console.error('clear localStorage error ===>', err);
    }
}
/**
 * 获取会话数据
 * @param key 变量名
 * @return 格式化后的数据
 */
function getSession(key) {
    var result = '';
    try {
        var res = s.getItem(key);
        result = _parse(res);
    }
    catch (err) {
        console.error('get sessionStorage error ===>', err);
    }
    return result;
}
/**
 * 设置会话数据
 * @param key 变量名
 * @param data 初始数据:非string类型数据均要json转化
 */
function setSession(key, data) {
    try {
        var newData = _json(data);
        s.setItem(key, newData);
    }
    catch (err) {
        console.error('set sessionStorage error ===>', err);
    }
}
/**
 * 移除会话数据
 * @param key 变量名
 */
function removeSession(key) {
    try {
        s.removeItem(key);
    }
    catch (err) {
        console.error('remove sessionStorage error ===>', err);
    }
}
/**
 * 清空会话缓存
 */
function clearSession() {
    try {
        s.clear();
    }
    catch (err) {
        console.error('clear sessionStorage error ===>', err);
    }
}
export { getLocal, setLocal, removeLocal, clearLocal, getSession, setSession, removeSession, clearSession };
//# sourceMappingURL=storage.js.map
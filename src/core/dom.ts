import { ListenOptions } from '../models/dom.model'
import { getVarType } from './feature'

/* ---------------- 监听函数 优化 start---------------- */
let passiveIfSupported: boolean = false;
const listenDefaultOpt: ListenOptions = {
  capture: false, 
  once: false, 
  passive: true
}

// polyfill 检测当前环境是否支持 passive, 支持即默认开启 passive(默认不执行 preventDefault() )
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: () => {
        passiveIfSupported = true
      }
    })
  );
} catch (err) { }


function isPreventDefault(handler:Function) :boolean {
  const r: RegExp = /(\/\/|\/\*+)(\s)*(\w)+\.preventDefault\((\w|\s)*?\)/g  // 匹配注释中的 preventDefault 
  const r2: RegExp = /(\w)+\.preventDefault\((\w |\s)*?\)/g  // 匹配执行的preventDefault
  const txt = handler.toString().replace(r, '')
  return r2.test(txt)
}

function handlerListenOpt<T>(config: T, handler: Function): ListenOptions | boolean {
  if (passiveIfSupported) {
    const type = getVarType(config)
    const handlerIsDefault = isPreventDefault(handler) // 函数内部是否执行preventDefault, true 为执行
    const passive = !handlerIsDefault// 函数内部执行preventDefault,关闭passive
    if (type === 'Boolean') {
      return {
        ...listenDefaultOpt,
        capture: !!config,
        passive
      }
    }
    if (type === 'Object') {
      return {
        ...listenDefaultOpt,
        ...config,
        passive
      }
    }
  }

  return !!config
}

/**
 * 开始事件监听   
 * @param element 监听对象
 * @param event   监听事件
 * @param handler 监听执行函数
 * @param config  监听配置, 默认 false, 且开启passive(当执行函数内部执行preventDefault时关闭passive). 可传对象参数
 */
function on(
  element,
  event: Event,
  handler: Function,
  config: ListenOptions | boolean = false
) {
  if (document.addEventListener) {
    const params = handlerListenOpt(config, handler)
    return element.addEventListener(event, handler, params);
  } else {
    return element.attachEvent('on' + event, handler);
  }
}
/**
 * 移除事件监听
 * @param element 监听对象
 * @param event   监听事件
 * @param handler 监听执行函数
 * @param config  监听配置, 默认 false, 且开启passive(当执行函数内部执行preventDefault时关闭passive). 可传对象参数
 */
function off(
  element,
  event: Event,
  handler: Function,
  config: ListenOptions | boolean = false
) {
  if (document.removeEventListener) {
    const params = handlerListenOpt(config, handler)
    return element.removeEventListener(event, handler, params);
  } else {
    return element.detachEvent('on' + event, handler);
  }
}
/* ---------------- 监听函数 优化 end---------------- */


export {
  on,
  off
}



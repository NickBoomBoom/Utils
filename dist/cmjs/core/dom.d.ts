import { ListenOptions } from '../models/dom.model';
/**
 * 开始事件监听
 * @param element 监听对象
 * @param event   监听事件
 * @param handler 监听执行函数
 * @param config  监听配置, 默认 false, 且开启passive(当执行函数内部执行preventDefault时关闭passive). 可传对象参数
 */
declare function on(element: any, event: Event, handler: Function, config?: ListenOptions | boolean): any;
/**
 * 移除事件监听
 * @param element 监听对象
 * @param event   监听事件
 * @param handler 监听执行函数
 * @param config  监听配置, 默认 false, 且开启passive(当执行函数内部执行preventDefault时关闭passive). 可传对象参数
 */
declare function off(element: any, event: Event, handler: Function, config?: ListenOptions | boolean): any;
export { on, off };

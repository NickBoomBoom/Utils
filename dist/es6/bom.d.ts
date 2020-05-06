/**
 *  复制文字
 *  TODO:可能有兼容问题,目前在 PC端未发现,待真实环境测试
 * @param {*} dom 需要复制的文字 dom
 * @return  Boolean 值, true 则为复制成功, false 失败
 */
declare function copy(dom: HTMLDocument): boolean;
/**
 * 返回视窗高度, 兼容所有浏览器
 * @return number
 */
declare function viewPortHeight(): number;
export { copy, viewPortHeight };

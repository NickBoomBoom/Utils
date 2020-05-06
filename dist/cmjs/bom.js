"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  复制文字
 *  TODO:可能有兼容问题,目前在 PC端未发现,待真实环境测试
 * @param {*} dom 需要复制的文字 dom
 * @return  Boolean 值, true 则为复制成功, false 失败
 */
function copy(dom) {
    window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.selectNode(dom);
    window.getSelection().addRange(range);
    var bol = document.execCommand("copy");
    return bol;
}
exports.copy = copy;
/**
 * 返回视窗高度, 兼容所有浏览器
 * @return number
 */
function viewPortHeight() {
    return (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight);
}
exports.viewPortHeight = viewPortHeight;
//# sourceMappingURL=bom.js.map
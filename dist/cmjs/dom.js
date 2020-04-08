"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @returns 返回视窗高度, 兼容所有浏览器
 */
function viewPortHeight() {
    return (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight);
}
exports.viewPortHeight = viewPortHeight;
//# sourceMappingURL=dom.js.map
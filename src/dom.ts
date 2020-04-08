/**
 *
 * @returns 返回视窗高度, 兼容所有浏览器
 */
function viewPortHeight(): number {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
}


export {
  viewPortHeight
}
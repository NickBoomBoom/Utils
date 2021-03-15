/**
 *  复制文字
 *  TODO:可能有兼容问题,目前在 PC端未发现,待真实环境测试
 * @param {*} dom 需要复制的文字 dom
 * @return  Boolean 值, true 则为复制成功, false 失败
 */
function copy(dom: HTMLDocument): boolean {
  const selector: any = window.getSelection()
  selector.removeAllRanges();
  const range = document.createRange();
  range.selectNode(dom);
  selector.addRange(range);
  const bol: boolean = document.execCommand("copy");
  return bol;
}

export {
  copy
}
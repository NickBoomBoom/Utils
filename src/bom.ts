/**
 *  复制文字
 *  TODO:可能有兼容问题,目前在 PC端未发现,待真实环境测试
 * @param {*} dom 需要复制的文字 dom
 * @return  Boolean 值, true 则为复制成功, false 失败
 */
function copy(dom: HTMLDocument): boolean {
  window.getSelection().removeAllRanges();
  const range = document.createRange();
  range.selectNode(dom);
  window.getSelection().addRange(range);
  const bol: boolean = document.execCommand("copy");
  return bol;
}


/**
 * location.search 上获取name值
 * @param name 
 * @return String || null
 */
function getQueryString(name): string | null {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) return decodeURIComponent(r[2]);
  return null;
}


export {
  copy,
  getQueryString
}
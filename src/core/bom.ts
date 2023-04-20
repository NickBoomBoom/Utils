/**
 *  复制文字 
 * @param {*} string 需要复制的文字 string
 * @return  Boolean 值, true 则为复制成功, false 失败
 */
export async function copy(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      // 隐藏此输入框
      textarea.style.cssText = `
        position: fixed;
        top:-1000vh;
        opacity:0;
      `
      // 赋值
      textarea.value = text;
      // 选中
      textarea.select();
      // 复制
      document.execCommand('copy');
      // 移除输入框
      document.body.removeChild(textarea);
    }
    return true
  } catch (error) {
    console.error(error);
    return false
  }
 

}

export const bom = {
  copy
}
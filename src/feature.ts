/**
 *  等分切割数组
 *
 * @static
 * @param {*} arr 数组
 * @param {*} limit 份数
 * @returns
 */
function sliceArray(arr: any[], limit: number): any[] {
  let res: any[] = [];
  for (let i = 0; i < arr.length; i += limit) {
    res.push(arr.slice(i, i + limit));
  }
  return res;
}

/**
 * 过滤url search 中的字符串
 * @param url 
 * @param keys 
 */
function filterUrlSearch(url: string, keys: string[] = []): string {
  keys.forEach(key => {
    const reg = new RegExp(`${key}=([^&]*)(&|$)`, 'gi')
    url = url.replace(reg, '')
  })
  return url
}

/**
 * 检测时间是否重叠
 * 基本的思路，日期也可以当成字符串进行比较，把开始日期，结束日期分别存进两个数组，并用sort排序，循环遍历数组，从开始时间的第二个元素去比较结束时间的第一个元素，如果小于，就代表时间段有交叉，直接跳出，不然就继续遍历，遍历结束，说明时间没有重复，可以提交。
 * @param arr numStartEnd[] 数组对象,ex: [{s:1,e:2}]
 */
interface numStartEnd {
  s: number,
  e: number
}
function checkOverlap(arr: numStartEnd[]): boolean {
  let startArr: number[] = []
  let endArr: number[] = []
  let bol: boolean = false
  arr.forEach(t => {
    startArr.push(t.s)
    endArr.push(t.e)
  })

  startArr = startArr.sort((a,b) => a - b)
  endArr = endArr.sort((a, b) => a - b)

  for (let i = 1; i < startArr.length; i++) {

    if (startArr[i] < endArr[i - 1]) {
      bol = true
      break
    }
  }

  return bol
}



/**
 * 返回对象类型, 首字母大写
 * @param variable any
 * @return String  (Object, Boolean, Number, String, Undefined, Null, Array, Function, Symbol)
 */
function getVarType(variable: any): string {
  const type: string = Object.prototype.toString.call(variable)
  type.match(/\s(\S+)]$/)
  return RegExp.$1
}

export {
  getVarType,
  sliceArray,
  checkOverlap,
  filterUrlSearch
}
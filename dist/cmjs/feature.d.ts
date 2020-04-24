/**
 * 深拷贝
 * @param {*} p  原始对象
 * @param {*} c  新对象 可选
 * @returns  object
 */
declare function deepClone(p: any, c: any): any;
/**
 *  等分切割数组
 *
 * @static
 * @param {*} arr 数组
 * @param {*} limit 份数
 * @returns
 */
declare function sliceArrary(arr: any[], limit: number): any[];
/**
 *  返回 年 月 日 周 时 分 秒 毫秒
 *
 * @static
 * @param {any} time 时间戳  毫秒级
 * @returns {年,月,日,周几,时,分,秒,毫秒}
 */
declare function timeObject(time: number): any;
/**
 * 过滤url search 中的字符串
 * @param url
 * @param keys
 */
declare function filterUrlSearch(url: string, keys?: string[]): string;
/**
 * 检测时间是否重叠
 * 基本的思路，日期也可以当成字符串进行比较，把开始日期，结束日期分别存进两个数组，并用sort排序，循环遍历数组，从开始时间的第二个元素去比较结束时间的第一个元素，如果小于，就代表时间段有交叉，直接跳出，不然就继续遍历，遍历结束，说明时间没有重复，可以提交。
 * @param arr numStartEnd[] 数组对象,ex: [{s:1,e:2}]
 */
interface numStartEnd {
    s: number;
    e: number;
}
declare function checkOverlap(arr: numStartEnd[]): boolean;
export { deepClone, sliceArrary, timeObject, checkOverlap, filterUrlSearch };

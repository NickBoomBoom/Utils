/**
 * 获取window.search后参数
 * @param name
 * @returns {null}
 */
function getQueryString(name:string): string {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r: any[] = window.location.search.substr(1).match(reg);
  return r ? unescape(r[2]) : null;
}

/**
 *  等分切割数组
 *
 * @static
 * @param {*} arr 数组
 * @param {*} limit 份数
 * @returns
 */
function isArrSlice(arr: any[], limit: number): any[] {
  let res: any[] = [];
  for (let i = 0; i < arr.length; i += limit) {
    res.push(arr.slice(i, i + limit));
  }
  return res;
}

/**
 *  复制文字
 *  TODO:可能有兼容问题,目前在 PC端发现,待真实环境测试
 * @param {*} dom 需要复制的文字 dom
 * @returns  Boolean 值, true 则为复制成功, false 失败
 */
function copy(dom: any): boolean {
  window.getSelection().removeAllRanges();
  const range = document.createRange();
  range.selectNode(dom);
  window.getSelection().addRange(range);
  const bol: boolean = document.execCommand("copy");
  return bol;
}

// js 计算进度丢失 在严格模式中的解决方案
// 严格模式下,除法的处理
function decimalLength(num1: number, num2: number): number[] {
  let length1: number;
  let length2: number;
  try {
    length1 = num1.toString().split(".")[1].length;
  } catch (e) {
    length1 = 0;
  }
  try {
    length2 = num2.toString().split(".")[1].length;
  } catch (e) {
    length2 = 0;
  }
  return [length1, length2];
}
//除法
function divide(num1: number, num2: number): number {
  const result: number[] = decimalLength(num1, num2);
  const length1: number = result[0];
  const length2: number = result[1];
  const integer1: number = +num1.toString().replace(".", "");
  const integer2: number = +num2.toString().replace(".", "");
  // 默认保留小数点最长的个数
  return (integer1 / integer2) * Math.pow(10, length2 - length1);
}
//乘法
function multiply(arg1: number, arg2: number): number {
  const s1: string = arg1.toString();
  const s2: string = arg2.toString();
  let m: number = 0;
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
//加法
function plus(arg1: number, arg2: number): number {
  let r1: number;
  let r2: number;
  let m: number;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (multiply(arg1, m) + multiply(arg2, m)) / m;
}
//减法
function minus(arg1: number, arg2: number): number {
  let r1: number;
  let r2: number;
  let m: number;
  let n: number;
  let res: number;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  res = +((multiply(arg1, m) - multiply(arg2, m)) / m).toFixed(n);
  return res;
}

/**
 * 如果数字小于1位，前面用0填充 返回字符串格式
 * @param num {Number} 数字
 */
function fillDigit(num: number): string {
  num = parseInt(num + "");
  let res: string = "";
  res = num <= 9 ? "0" + num : num + "";
  return res;
}

// 时间处理方法
/**
 * 倒计时
 *
 * @static
 * @param {any} time 倒计时时间戳  毫秒级
 * @param {any} colon true: 冒号形式  20:30:00
 * @returns  01天01小时03分钟30秒 || 1:20:30:00
 */
function countDown(time: number, colon: boolean = true): string {
  if (time <= 0) return;
  const dayMS: number = 86400000; // 每天毫秒
  const hoursMs: number = 60 * 60 * 1000;
  const minuteMs: number = 60 * 1000;
  const secondMs: number = 1000;
  let day: number = time / dayMS;
  let d: number = day >= 1 ? ~~day : 0;

  const remainingTime: number = d ? time - d * dayMS : time;
  console.log(remainingTime);
  let hours: number = remainingTime / hoursMs;
  let h: number = ~~hours;

  let minute = (remainingTime - h * hoursMs) / minuteMs;
  let m: number = ~~minute;

  let second = (remainingTime - h * hoursMs - m * minuteMs) / secondMs;
  let s: number = ~~second;

  let dd: string = fillDigit(d);
  let hh: string = fillDigit(h);
  let mm: string = fillDigit(m);
  let ss: string = fillDigit(s);
  let res: string = "";
  if (colon) {
    dd && (res = res + dd + ":");
    res = (hh ? res + hh : res + "00") + ":";
    res = (mm ? res + mm : res + "00") + ":";
    res = res + ss;
  } else {
    dd && (res = res + dd + "天");
    hh && (res = res + hh + "小时");
    mm && (res = res + mm + "分");
    res = res + ss + "秒";
  }
  return res;
}

/**
 * 深拷贝
 * @param {*} p  原始对象
 * @param {*} c  新对象 可选
 * @returns  object
 */
function deepCopy(p: any, c: any): any {
  c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}

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

/**
 *
 *
 * @param {*} el dom
 * @param {number} [offset=100] 提前在到达可视距离 多少前加载
 * @returns  Boolean true 视图内  fasle  视图外
 */
function inViewPort(el: any, offset: number = 100): boolean {
  const vh: number = viewPortHeight();
  const offsetTop: number = el.offsetTop;
  const scrollTop: number = document.documentElement.scrollTop;
  const top: number = offsetTop - scrollTop;
  return top <= vh + offset;
}

/* function isInViewPort2 (el, offset= 100) {
  const viewPortHeight = viewPortHeight() 
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top
  return top  <= viewPortHeight + offset
} */

export {
  getQueryString,
  isArrSlice,
  copy,
  divide,
  multiply,
  plus,
  minus,
  countDown,
  deepCopy,
  viewPortHeight,
  inViewPort
};

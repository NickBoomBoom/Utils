
/**
 * 返回对象类型, 首字母大写
 * @param variable any
 * @return String  (Object, Boolean, Number, String, Undefined, Null, Array, Function, Symbol)
 */
function getVarType(variable: any): string {
  const type: string = Object.prototype.toString.call(variable);
  type.match(/\s(\S+)]$/);
  return RegExp.$1;
}

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
  keys.forEach((key) => {
    const reg = new RegExp(`${key}=([^&]*)(&|$)`, "gi");
    url = url.replace(reg, "");
  });
  return url;
}

/**
 * 检测时间是否重叠
 * 基本的思路，日期也可以当成字符串进行比较，把开始日期，结束日期分别存进两个数组，并用sort排序，循环遍历数组，从开始时间的第二个元素去比较结束时间的第一个元素，如果小于，就代表时间段有交叉，直接跳出，不然就继续遍历，遍历结束，说明时间没有重复，可以提交。
 * @param arr dateBeginEnd[] 数组对象,ex: [{s:1,e:2}]
 */
interface dateBeginEnd {
  s: number;
  e: number;
}
function checkOverlap(arr: dateBeginEnd[]): boolean {
  let startArr: number[] = [];
  let endArr: number[] = [];
  let bol: boolean = false;
  arr.forEach((t) => {
    startArr.push(t.s);
    endArr.push(t.e);
  });

  startArr = startArr.sort((a, b) => a - b);
  endArr = endArr.sort((a, b) => a - b);

  for (let i = 1; i < startArr.length; i++) {
    if (startArr[i] < endArr[i - 1]) {
      bol = true;
      break;
    }
  }

  return bol;
}



/**
 * 图片转化base64
 * @param img 图片dom
 */
function imageToBase64(img: HTMLElement | any): string {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: any = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const dataURL = canvas.toDataURL("image/png");
  return dataURL;
}

/**
 * 获取图片的base64
 * @param src 图片地址
 */
function getBase64Img(src: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let result = "";
    let img = new Image();
    img.crossOrigin = "";
    img.src = src;
    img.onload = () => {
      result = imageToBase64(img);
      resolve(result);
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * guid 生成
 * @returns guid
 */
function guid(): string {
  function S4(): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

/**
 * 数组拍平
 *
 */
function flatten(arr: any[]): any[] {
  return arr.reduce((result, item) => {
    return result.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

/**
 * 数据格式化
 * @param data 数据
 * @return parse后的数据
 */
function jsonParse(data: any): any {
  let res = data
  try {
    res = JSON.parse(data)
  } catch (err) {
  }
  return res
}


/**
 * 将非string类型数据 json化 不然无法存储本地
 * @param data 数据
 * @return 字符串数据
 */
function toString(data: any): string {
  if (typeof data === 'string') {
    return data
  } else {
    return JSON.stringify(data)
  }
}

/**
 * 补0操作
 * @param num
 * @return sting
 */
function fillZero(num: number): string {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}
export {
  getVarType,
  sliceArray,
  checkOverlap,
  filterUrlSearch,
  getBase64Img,
  imageToBase64,
  guid,
  flatten,
  jsonParse,
  toString,
  fillZero
};

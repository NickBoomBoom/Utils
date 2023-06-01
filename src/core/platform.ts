const u: string = window.navigator.userAgent;

export function isIos(): boolean {
  const bol: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  return bol;
}

export function isAndroid(): boolean {
  const bol: boolean = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
  return bol;
}

export function isWxApp(): boolean {
  const bol: boolean = !!u.match(/MicroMessenger\/([\d.]+)/);
  return bol;
}

export function isMobile(): boolean {
  if (u.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true; // 移动端
  } else {
    return false; // PC端
  }
}

export function isPc(): boolean {
  return !isMobile()
}

export function isWindows() :boolean {
  return u.indexOf('Win') > -1;
}

export function isMac():boolean  {
  return u.indexOf('Mac') > -1;
}

export const platform = {
  isWxApp,
  isIos,
  isAndroid,
  isPc, 
  isMobile,
  isWindows,
  isMac
}
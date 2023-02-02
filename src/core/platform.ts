const u: string = window.navigator.userAgent;

export function isIOS(): boolean {
  const bol: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  return bol;
}

export function isAndroid(): boolean {
  const bol: boolean = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
  return bol;
}

export function isWX(): boolean {
  const bol: boolean = !!u.match(/MicroMessenger\/([\d.]+)/);
  return bol;
}

export const platform = {
  isWX,
  isIOS,
  isAndroid
}
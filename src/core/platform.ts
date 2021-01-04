const u: string = window.navigator.userAgent;

function isIOS(): boolean {
  const bol: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  return bol;
}

function isAndroid(): boolean {
  const bol: boolean = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
  return bol;
}

function isWX(): boolean {
  const bol: boolean = !!u.match(/MicroMessenger\/([\d.]+)/);
  return bol;
}

export {
  isWX,
  isIOS,
  isAndroid
}
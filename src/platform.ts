function isIOS(): boolean {
  const u: string = navigator.userAgent;
  const bol: boolean = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  return bol;
}

function isIOSX(): boolean {
  const u: string = navigator.userAgent;
  const bol: boolean = /iphone/gi.test(u) && (screen.height === 812 && screen.width === 375); // IOSX 终端

  return bol;

}

function isAndroid(): boolean {
  const u: string = navigator.userAgent;
  const bol: boolean = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; // android终端
  return bol;
}

function isWX(): boolean {
  const u: string = navigator.userAgent;
  const bol: boolean = !!u.match(/MicroMessenger\/([\d.]+)/);
  return bol;
}

export {
  isWX,
  isIOS,
  isIOSX,
  isAndroid
}
/**
 * 判断当前访问的是PC还是wap
 * 使用方法
 * 
 *  let ua = process.server ? req.headers['user-agent'] : navigator.userAgent
    let bl = process.server
      ? req.headers['accept-language']
      : navigator.browserLanguage || navigator.language
    let browser = new Browser(ua, bl)
    browser.device === 'PC' 如果这里为true，为pc，反之为wap
 * 
 */
 
export const Browser = function (_userAgent, _language) {
  let _ua = _userAgent || window.navigator.userAgent
  let match = {
    // 内核
    Trident: _ua.indexOf('Trident') !== -1 || _ua.indexOf('NET CLR') !== -1,
    Presto: _ua.indexOf('Presto') !== -1,
    WebKit: _ua.indexOf('AppleWebKit') !== -1,
    Gecko: _ua.indexOf('Gecko/') !== -1,
    // 浏览器
    UC: _ua.indexOf('UC') !== -1 || _ua.indexOf(' UBrowser') !== -1,
    QQ: _ua.indexOf('QQBrowser') !== -1,
    BaiDu: _ua.indexOf('Baidu') !== -1 || _ua.indexOf('BIDUBrowser') !== -1 || _ua.indexOf('baiduboxapp') !== -1,
    Maxthon: _ua.indexOf('Maxthon') !== -1,
    LBBROWSER: _ua.indexOf('LBBROWSER') !== -1,
    SouGou: _ua.indexOf('MetaSr') !== -1 || _ua.indexOf('Sogou') !== -1,
    IE: _ua.indexOf('MSIE') !== -1 || _ua.indexOf('Trident') !== -1,
    Firefox: _ua.indexOf('Firefox') !== -1,
    Opera: _ua.indexOf('Opera') !== -1 || _ua.indexOf('OPR') !== -1,
    Safari: _ua.indexOf('Safari') !== -1,
    Chrome: _ua.indexOf('Chrome') !== -1 || _ua.indexOf('CriOS') !== -1,
    Wechat: _ua.indexOf('MicroMessenger') !== -1,
    // 系统或平台
    Windows: _ua.indexOf('Windows') !== -1,
    Mac: _ua.indexOf('Macintosh') !== -1,
    Android: _ua.indexOf('Android') !== -1 || _ua.indexOf('Adr') !== -1,
    WP: _ua.indexOf('IEMobile') !== -1,
    BlackBerry: _ua.indexOf('BlackBerry') !== -1 || _ua.indexOf('RIM') !== -1 || _ua.indexOf('BB') !== -1,
    MeeGo: _ua.indexOf('MeeGo') !== -1,
    Symbian: _ua.indexOf('Symbian') !== -1,
    iOS: _ua.indexOf('like Mac OS X') !== -1,
    iPhone: _ua.indexOf('iPh') !== -1,
    iPad: _ua.indexOf('iPad') !== -1,
    // 设备
    Mobile: _ua.indexOf('Mobi') !== -1 || _ua.indexOf('iPh') !== -1 || _ua.indexOf('480') !== -1,
    Tablet: _ua.indexOf('Tablet') !== -1 || _ua.indexOf('iPad') !== -1 || _ua.indexOf('Nexus 7') !== -1
  }
  // 修正
  if (match.Chrome) { match.Chrome = !(match.Opera + match.BaiDu + match.Maxthon + match.SouGou + match.UC + match.QQ + match.LBBROWSER) }
  if (match.Safari) { match.Safari = !(match.Chrome + match.Opera + match.BaiDu + match.Maxthon + match.SouGou + match.UC + match.QQ + match.LBBROWSER) }
  if (match.Mobile) { match.Mobile = !match.iPad }
  // 基本信息
  let hash = {
    engine: ['Trident', 'Presto', 'WebKit', 'Gecko'],
    browser: ['UC', 'QQ', 'BaiDu', 'Maxthon', 'SouGou', 'IE', 'Firefox', 'Opera', 'Safari', 'Chrome', 'LBBROWSER', 'Wechat'],
    os: ['Windows', 'Mac', 'Android', 'WP', 'BlackBerry', 'MeeGo', 'Symbian', 'iOS', 'iPhone', 'iPad'],
    device: ['Mobile', 'Tablet']
  }
  this.device = 'PC'
  this.language = (() => {
    let g = _language.toLowerCase()
    return g === 'c' ? 'zh-cn' : g
  })()
  for (const k in hash) {
    if (hash.hasOwnProperty(k)) {
      for (let [i, len] = [0, hash[k].length]; i < len; i++) {
        let value = hash[k][i]
        if (match[value]) {
          this[k] = value
          break
        }
      }
    }
  }
  // 版本信息
  let version = {
    'Chrome': () => { return _ua.replace(/^.*Chrome\/([\d.]+).*$/, '$1') },
    'IE': () => {
      let v = _ua.replace(/^.*MSIE ([\d.]+).*$/, '$1')
      if (v === _ua) { v = _ua.replace(/^.*rv:([\d.]+).*$/, '$1') }
      return v !== _ua ? v : ''
    },
    'Firefox': () => { return _ua.replace(/^.*Firefox\/([\d.]+).*$/, '$1') },
    'Safari': () => { return _ua.replace(/^.*Version\/([\d.]+).*$/, '$1') },
    'Maxthon': () => { return _ua.replace(/^.*Maxthon\/([\d.]+).*$/, '$1') },
    'QQ': () => { return _ua.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1') },
    'BaiDu': () => { return _ua.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1') },
    'UC': () => { return _ua.replace(/^.*UBrowser\/([\d.]+).*$/, '$1') },
    'Wechat': () => { return _ua.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1') }
  }
  this.version = version[this.browser] ? version[this.browser]() : ''
}

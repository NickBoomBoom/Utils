import * as compute from './compute'
import * as weixin from './weixin'
import * as dom from './dom'
import * as feature from './feature'
import * as platform from './platform'
import * as storage from './storage'
import * as date from './date'
import * as bom from './bom'

const wx = weixin.wx

const Utils = {
  wx,
  bom,
  dom,
  date,
  compute,
  feature,
  storage,
  platform,
}
export {
  wx,
  bom,
  dom,
  date,
  compute,
  feature,
  storage,
  platform,
}

export default Utils
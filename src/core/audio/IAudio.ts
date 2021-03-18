
import { guid } from '../feature'
export default class IAudio {
  readonly id: string = guid()
  protected duration: string
  protected currentTime: number = 0
  protected paused: boolean = true
  constructor() {
    // this.id = guid()
  }

  get info() {
    return {
      currentTime: this.currentTime,
      currentTimeStr: '',
      duration: this.duration,
      durationStr: '',
      paused: this.paused // true 暂停 未播放(default)  false 播放中
    }
  }

  init() { }
  play() { }
  seek(time) { }
  pause() { }
  toggle() { }
  destroy() { }
}

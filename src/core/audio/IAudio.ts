
import { v4 as uuid } from 'uuid'

export class IAudio {
  id
  duration
  currentTime = 0
  paused = true
  constructor() {
    this.id = uuid()
  }

  get info() {
    return {
      currentTime: this.currentTime,
      duration: this.duration,
      paused: this.paused // true 暂停 未播放(default)  false 播放中
    }
  }
  playMethod;
  destroyMethod;
  pauseMethod;
  init() { }
  play() { }
  seek(time) { }
  pause() { }
  toggle() { }
  destroy() { }
}

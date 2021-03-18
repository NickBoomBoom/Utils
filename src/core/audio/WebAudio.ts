
import IAudio from './IAudio'
import { on, off } from '../dom'
interface handler {
  url: string,
  status: AudioStatus

}
enum AudioStatus {
  INITIALIZED,
  CAN_PLAY,
  ERROR,
  WAITING,
  PLAY,
  UPDATE,
  PAUSE,
  ENDED,
}
export default class WebAudio extends IAudio {
  private url: string
  private dom: HTMLAudioElement
  constructor(obj) {
    super()
    const { url, onInit, onEnd, onError, onTimeUpdate, onWait } = obj
    this.url = url
    this.init()
  }

  async init() {
    // audio 生成
    const audio: HTMLAudioElement = document.createElement('audio')
    audio.setAttribute('preload', 'auto')// 如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
    audio.setAttribute('id', this.id)
    audio.setAttribute('src', this.url)
    audio.style.display = 'none'
    document.body.appendChild(audio)
    this.dom = audio
    this.listen()
  }

  // update() {
  //   const { duration, currentTime, paused } = this.dom
  //   this.duration = duration
  //   this.currentTime = currentTime
  //   this.paused = paused
  // }

  // 部分情况下需要与文档对象进行交互才能正常播放
  mounted() {
    // this.isMounted = true
    this.play()
    this.pause()

    const handler = () => {
      window.removeEventListener('touchstart', handler, true)
      this.play()
      this.pause()
    }
    window.addEventListener('touchstart', handler, true)
  }

  // 监听事件
  listen() {
    on(this.dom, 'audioprocess', e => {
      console.log('audioprocess', e)
    })
    on(this.dom, 'canplay', e => {
      console.log('canplay', e)
    })
    on(this.dom, 'canplaythrough', e => {
      console.log('canplaythrough', e)
    })
    on(this.dom, 'complete', e => {
      console.log('complete', e)
    })
    on(this.dom, 'durationchange', e => {
      console.log('durationchange', e)
    })
    on(this.dom, 'emptied', e => {
      console.log('emptied', e)
    })
    on(this.dom, 'ended', e => {
      console.log('ended', e)
    })
    on(this.dom, 'loadeddata', e => {
      console.log('loadeddata', e)
    })
    on(this.dom, 'loadedmetadata', e => {
      console.log('loadedmetadata', e)
    })
    on(this.dom, 'pause', e => {
      console.log('pause', e)
    })
    on(this.dom, 'play', e => {
      console.log('play', e)
    })
    on(this.dom, 'playing', e => {
      console.log('playing', e)
    })
    on(this.dom, 'ratechange', e => {
      console.log('ratechange', e)
    })
    on(this.dom, 'seeked', e => {
      console.log('seeked', e)
    })
    on(this.dom, 'seeking', e => {
      console.log('seeking', e)
    })
    on(this.dom, 'stalled', e => {
      console.log('stalled', e)
    })
    on(this.dom, 'suspend', e => {
      console.log('suspend', e)
    })
    on(this.dom, 'timeupdate', e => {
      console.log('timeupdate', e)
    })
    on(this.dom, 'volumechange', e => {
      console.log('volumechange', e)
    })
    on(this.dom, 'waiting', e => {
      console.log('waiting', e)
    })
  }

  removeListen() {
    // off 移除监听

  }

  toggle() {
    if (this.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  play() {
    this.dom.play()
  }

  pause() {
    this.dom.pause()
  }

  seek(time) {
    this.dom.currentTime = time
  }

  destroy() {
    this.removeListen()
    this.dom.remove()
  }
}

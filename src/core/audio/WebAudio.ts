
// import { IAudio } from './IAudio'
// export default class H5Audio extends IAudio {
//   constructor(obj) {
//     const { url, onInit, onEnd, onError, onTimeUpdate, onWait } = obj
//     super()
//     this.onInit = onInit
//     this.onTimeUpdate = onTimeUpdate
//     this.onEnd = onEnd
//     this.onError = onError
//     this.onWait = onWait
//     this.url = url
//     this.dom = null
//     this.initTask = []
//     this.isMounted = false // 挂载结束,可播放状态
//     this.init()
//   }

//   async init() {
//     // audio 生成
//     const audio = document.createElement('audio')
//     audio.setAttribute('preload', 'auto')// 如果出现该属性，则音频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
//     audio.setAttribute('id', this.id)
//     audio.setAttribute('src', this.url)
//     audio.style.display = 'none'
//     document.body.appendChild(audio)
//     this.dom = audio
//     this.listen()
//   }

//   update() {
//     const { duration, currentTime, paused } = this.dom
//     this.duration = duration
//     this.currentTime = currentTime
//     this.paused = paused
//   }

//   // 部分情况下需要与文档对象进行交互才能正常播放
//   mounted() {
//     this.isMounted = true
//     this.play()
//     this.pause()

//     const handler = () => {
//       window.removeEventListener('touchstart', handler, true)
//       this.play()
//       this.pause()
//     }
//     window.addEventListener('touchstart', handler, true)
//   }

//   // 监听事件
//   listen() {
//     const eventListen = (event, fn) => {
//       this.dom.addEventListener(event, fn)
//     }

//     /* 可播放状态下,方可获取duration */
//     eventListen('canplay', () => {
//       this.update()
//       this.onInit && this.onInit()
//       // !this.isMounted && this.mounted()
//       this.initTask.forEach(t => {
//         t && t()
//       })
//       this.initTask = []
//     })
//     eventListen('ended', e => {
//       this.currentTime = 0
//       this.paused = true
//       this.onEnd && this.onEnd()
//     })

//     eventListen('waiting', e => {
//       this.onWait && this.onWait()
//       this.initTask.push(() => {
//         this.play();
//       })
//     })
//     eventListen('durationchange', e => {
//       this.update()
//     })
//     eventListen('timeupdate', e => {
//       this.update()
//       this.onTimeUpdate && this.onTimeUpdate()
//     })
//     eventListen('error', e => {
//       this.update()
//       this.onError && this.onError()
//     })
//   }

//   toggle() {
//     if (this.paused) {
//       this.play()
//     } else {
//       this.pause()
//     }
//   }

//   play() {
//     this.dom.play()
//     this.onTimeUpdate && this.onTimeUpdate()
//   }

//   pause() {
//     this.dom.pause()
//     this.onTimeUpdate && this.onTimeUpdate()
//   }

//   seek(time) {
//     this.dom.currentTime = time
//   }

//   destroy() {
//     this.dom.remove()
//   }
// }

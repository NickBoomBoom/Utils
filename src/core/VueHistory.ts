const DEFAULT_ROUTER = {
  onReady: (fn: Function) => { },
  push: () => { },
  go: () => { },
  replace: () => { }
}
export const VueHistory = {
  _history: null,

  install(Vue: Object, opt = {
    router: DEFAULT_ROUTER,  // router 实例
    onExceed: (obj: any) => { }, // 超过历史记录
    onExit: (obj: any) => { }, // 低于历史记录
    onChange: (obj: any) => { }, // 堆栈信息变化 
  }) {
    const { onExceed, onExit, onChange } = opt
    let { router } = opt
    router = router || DEFAULT_ROUTER

    const that: any = this

    that._history = new Proxy({
      current: 0, // 当前历史记录下标
      stack: [], // 历史记录堆栈信息
    }, {
      set(obj: any, prop, value) {
        obj[prop] = value
        onChange && onChange(obj)
        return true
      }
    })

    // 挂载到router原型上,_history
    router.constructor.prototype._history = that._history

    // 初始化 将当前栈压入
    router.onReady((res: any) => {
      that._history.stack = [...that._history.stack, res]
    })

    // 使用push的时候压栈
    router.push = new Proxy(router.push, {
      apply(target, obj, args) {
        return Reflect.apply(target, obj, args).then((res: any) => {
          const { stack, current } = that._history
          that._history.stack = [...stack, res].slice()
          that._history.current = current + 1
        })
      }
    })
    // replace
    router.replace = new Proxy(router.replace, {
      apply(target, obj, args) {
        return Reflect.apply(target, obj, args).then((res: any) => {
          const { stack, current } = that._history
          const newStack = stack.slice()
          newStack[current] = res
          that._history.stack = newStack
        })
      }
    })
    /* 
      go函数, 非promise
      hash和history模式下源码均是  window.history.go(n)
    */
    router.go = new Proxy(router.go, {
      apply(target, obj, args) {
        const n = args[0]
        const stackLength = that._history.stack.length
        const nextCurrent = that._history.current + n
        if (nextCurrent < 0) { // 后退超过历史记录长度
          onExit && onExit(that._history)
          throw new Error(`go(${n}),低于历史记录长度,无法跳转`)
        } else if (nextCurrent >= stackLength) { // 前进超过历史记录长度
          onExceed && onExceed(that._history)
          throw new Error(`go(${n}),超过历史记录长度,无法跳转`)
        }
        that._history.current = nextCurrent
        return Reflect.apply(target, obj, args)
      }
    })
  },
}







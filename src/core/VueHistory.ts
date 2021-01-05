const VueHistory = {
  _history: null,

  install(Vue, opt = {
    router: {
      onReady: null,
      push: null,
      go: null,
      replace: null
    },  // router 实例
    onExceed: (obj) => { }, // 超过历史记录
    onExit: (obj) => { }, // 低于历史记录
    onChange: (obj) => { }, // 堆栈信息变化 
  }) {
    const { router, onExceed, onExit, onChange } = opt

    const that = this

    that._history = new Proxy({
      current: 0, // 当前历史记录下标,可能为负,可能大于stack.length
      prev: 0, // 上次历史记录下标值,只存正常值
      stack: [], // 历史记录堆栈信息
    }, {
      set(obj, prop, value) {
        const { current, stack } = obj
        // prev 只记录正常区间的值
        if (prop === 'current' && current > 0 && current < stack.length) {
          obj['prev'] = obj['current']
        }
        obj[prop] = value
        onChange(obj)
        return true
      }
    })

    // 挂载到router原型上,_history
    router.constructor.prototype._history = that._history

    // 初始化 将当前栈压入
    router.onReady(res => {
      that._history.stack = [...that._history.stack, res]
    })
    
    // 使用push的时候压栈
    router.push = new Proxy(router.push, {
      apply(target, obj, args) {
        return Reflect.apply(target, obj, args).then(res => {
          const { stack, current, prev } = that._history
          that._history.stack = [...stack, res].slice()
          if (current < 0 || current > that._history.stack.length - 1) {
            that._history.current = prev + 1
          } else {
            that._history.current = current + 1
          }
        })
      }
    })
    // replace
    router.replace = new Proxy(router.replace, {
      apply(target, obj, args) {
        return Reflect.apply(target, obj, args).then(res => {
          const { stack, prev, current } = that._history
          const newStack = stack.slice()
          if (current < 0 || current > stack.length - 1) {
            newStack[prev] = res
          } else {
            newStack[current] = res
          }
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
        that._history.current = nextCurrent
        if (nextCurrent < 0) { // 后退超过历史记录长度
          onExit(that._history)
          throw new Error(`go(${n}),低于历史记录长度,无法跳转`)
        } else if (nextCurrent > stackLength) { // 前进超过历史记录长度
          onExceed(that._history)
          throw new Error(`go(${n}),超过历史记录长度,无法跳转`)
        }
        return Reflect.apply(target, obj, args)
      }
    })
  },
}


export default VueHistory




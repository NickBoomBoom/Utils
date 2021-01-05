var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var VueHistory = {
    _history: null,
    install: function (Vue, opt) {
        if (opt === void 0) { opt = {
            router: {
                onReady: null,
                push: null,
                go: null,
                replace: null
            },
            onExceed: function (obj) { },
            onExit: function (obj) { },
            onChange: function (obj) { },
        }; }
        var router = opt.router, onExceed = opt.onExceed, onExit = opt.onExit, onChange = opt.onChange;
        var that = this;
        that._history = new Proxy({
            current: 0,
            stack: [],
        }, {
            set: function (obj, prop, value) {
                obj[prop] = value;
                onChange(obj);
                return true;
            }
        });
        // 挂载到router原型上,_history
        router.constructor.prototype._history = that._history;
        // 初始化 将当前栈压入
        router.onReady(function (res) {
            that._history.stack = __spreadArrays(that._history.stack, [res]);
        });
        // 使用push的时候压栈
        router.push = new Proxy(router.push, {
            apply: function (target, obj, args) {
                return Reflect.apply(target, obj, args).then(function (res) {
                    var _a = that._history, stack = _a.stack, current = _a.current;
                    that._history.stack = __spreadArrays(stack, [res]).slice();
                    that._history.current = current + 1;
                });
            }
        });
        // replace
        router.replace = new Proxy(router.replace, {
            apply: function (target, obj, args) {
                return Reflect.apply(target, obj, args).then(function (res) {
                    var _a = that._history, stack = _a.stack, current = _a.current;
                    var newStack = stack.slice();
                    newStack[current] = res;
                    that._history.stack = newStack;
                });
            }
        });
        /*
          go函数, 非promise
          hash和history模式下源码均是  window.history.go(n)
        */
        router.go = new Proxy(router.go, {
            apply: function (target, obj, args) {
                var n = args[0];
                var stackLength = that._history.stack.length;
                var nextCurrent = that._history.current + n;
                if (nextCurrent < 0) { // 后退超过历史记录长度
                    onExit(that._history);
                    throw new Error("go(" + n + "),\u4F4E\u4E8E\u5386\u53F2\u8BB0\u5F55\u957F\u5EA6,\u65E0\u6CD5\u8DF3\u8F6C");
                }
                else if (nextCurrent >= stackLength) { // 前进超过历史记录长度
                    onExceed(that._history);
                    throw new Error("go(" + n + "),\u8D85\u8FC7\u5386\u53F2\u8BB0\u5F55\u957F\u5EA6,\u65E0\u6CD5\u8DF3\u8F6C");
                }
                that._history.current = nextCurrent;
                return Reflect.apply(target, obj, args);
            }
        });
    },
};
export default VueHistory;
//# sourceMappingURL=VueHistory.js.map
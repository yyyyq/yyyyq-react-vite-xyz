// 柯里化示例
// 参数够了自动执行，支持每次传任意个参数
// fn.length 获取函数参数个数 function a(a, b, c) {}  a.length === 3
export function curry<T extends (...args: any[]) => any>(fn: T, arity = fn.length) {
  function createCurried(prevArgs: any[]) {
    return function (this: any, ...nextArgs: any[]) {
      const args = [...prevArgs, ...nextArgs]

      // 参数够了，执行
      if (args.length >= arity) {
        return fn.apply(this, args)
      }

      // 参数不够，继续收集
      return createCurried(args).bind(this)
    }
  }

  return createCurried([])
}



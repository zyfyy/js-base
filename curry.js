// 柯里化 本质函数式编程，通过判断传入函数参数个数，当执行参数满足时候再执行
// 特点：
// - 参数复用
// - 提前返回一个function 延迟执行(不传入足够参数不执行)
// - 前面每组不同参数执行返回的函数有各自含义

function curry(fn, args) {
  // 取到fn的参数个数
  var length = fn.length;
  var args = args || [];
  return function () {
    newArgs = args.concat(Array.prototype.slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}

function multiFn(a, b, c) {
  return a * b * c;
}

var multi = curry(multiFn);

multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2, 3)(4);


{
  // es6写法，香！
  // 默认参数，省着下面声明了
  const curry = (fn, arr = []) => (...args) => {
    // 立即执行函数, 合并curry()执行传入来的参数
    return ((arg) => {
      return arg.length === fn.length ? fn(...arg) : curry(fn, arg);
    })([...arr, ...args]);
  };

  let curryTest = curry((a, b, c, d) => a + b + c + d);
  curryTest(1, 2, 3)(4); //返回10
  curryTest(1, 2)(4)(3); //返回10
  curryTest(1, 2)(3, 4); //返回10
}

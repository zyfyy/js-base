const assert = require("assert");

this.x = 9;
var module = {
  x: 81,
  getX: function () {
    return this.x;
  },
};

module.getX(); // 81

var getX = module.getX;
getX(); // 9, 因为在这个例子中，"this"指向全局对象

// 创建一个'this'绑定到module的函数
var boundGetX = getX.bind(module);
console.log(boundGetX()); // 81

Function.prototype.bin = function (ctx) {
  let fn = this;
  return function (...arg) {
    return fn.call(ctx, ...arg);
  };
};

function getX2() {
  return this.x;
}
let res = getX2.bin(module)();
console.log(res);

Function.prototype.bind = function (ctx) {
  let fThis = this;
  //Array.prototype.slice.call 将类数组转为数组
  let fBound = function (...arg) {
    // new 绑定等级高于显式绑定
    // 作为构造函数调用时，保留指向不做修改
    // 使用 instanceof 判断是否为构造函数调用
    return fThis.apply(this instanceof fBound ? this : ctx, arg);
  };
  // 复制原型
  let NOP = function () {};
  if (this.prototype) {
    NOP.prototype = this.prototype;
    fBound.prototype = new NOP();
  }
  return fBound;
};

function getX3() {
  return this.x;
}
assert.strictEqual(getX3.bind(module)(), 80);

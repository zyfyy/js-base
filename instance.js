function A(a) {
  if (!this instanceof A) {
    return new A();
  }
  this.a = a;
  console.log(this.a);
}

A.prototype.fa = function () {
  console.log(this.a);
};

var a = new A();

function instanceof_(left, right) {
  left = left.__proto__;
  while (left !== right.prototype) {
    left = left.__proto__; // 查找原型，再次while判断
    if (left === null) {
      return false;
    }
  }
  return true;
}

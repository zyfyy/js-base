// 对齐标准继承
class A {
  constructor(name) {
    (this.type = "A"), (this.name = name);
  }
  log() {
    console.log(this.name);
  }
  static a = "aaaa";
}

class B extends A {
  constructor(name) {
    super(name);
    this.kind = "B";
  }
  tt() {
    console.log(this.name);
    console.log(this.kind);
  }
}

console.log(new A("aaa"));
console.log(new B("bbb"));

//
function create(parent) {
  function F() {}
  F.prototype = parent.prototype;
  return new F();
}

function AA(name) {
  this.type = "AA";
  this.name = name;
}
AA.prototype.log = function () {
  console.log(this.name);
};

function BB(name) {
  AA.call(this, name);
  this.kind = "BB";
}
// 和上面方法create功能一致
BB.prototype = Object.create(AA.prototype);
// 此处方便使用Object.assign继承更多其他prototype
BB.prototype.constructor = BB;

BB.prototype.tt = function () {
  console.log(this.name);
  console.log(this.kind);
};

console.log(new AA("aaa"));
console.log(new BB("bbb"));

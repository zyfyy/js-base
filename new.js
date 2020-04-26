function new_(fn, ...arg) {
  console.log(arg, Object.prototype.toString.call(null, arg), typeof arg);
  if (typeof fn != "function") {
    throw fn + " is not a constructor";
  }
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, arg);
  return typeof res === "object" ? res : obj;
}

let Student = function (name) {
  this.name = name;
};

let cc = Object.prototype.toString;

let a = new_(Student, "lsls");
let c = new Student("ddd");

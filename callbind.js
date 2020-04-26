var module = {
  x: 81,
  getX: function () {
    console.log(this.x);
    return this.x;
  },
};
let getX = module.getX;

let bind = Function.prototype.bind;

let boundGetX = bind.call(getX, module);
let boundGetX2 = getX.bind(module);
boundGetX();
boundGetX2();

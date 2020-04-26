var animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Fail" },
];

for (var i = 0; i < animals.length; i++) {
  (function (i) {
    this.print = function () {
      console.log("#" + i + " " + this.species + ": " + this.name);
    };
    this.print();
  }.call(animals[i], i));
}

Function.prototype.call = function (ctx, ...rest) {
  // do not console log
  // console.log(this);
  let othis = ctx || window;
  othis._fn = this;
  let arg = rest;
  let res = othis._fn(...arg);
  // Reflect.deleteProperty(othis, '_fn') //删除_fn属性
  delete othis._fn;
  return res;
};

console.log("bbb:", Array.prototype.slice.call(animals, 1));

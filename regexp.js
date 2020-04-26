// 正则表达式基础
// {} 重复次数 {2} {2,5}
// () group，匹配并记住，可用$1-n标志，或者function中作为顺序参数传入 (){} 表示整个分组重复多少次
// [] 枚举

// ? 可以表示 零个或1个
// 或者存在分组中紧接着'('起作用如捕获、断言、注释等
// 或者再表示重复次数的{} + ?后面，表示要懒惰匹配，要尽可能的减少重复次数

// js支持给分组命名
// js支持负向零宽断言

// string可以 match() replace() search() split() exec()

// match
var str = "For more information, see Chapter 3.4.5.1";
var re = /see (chapter \d+(\.\d)*)/i;
var re2 = /see (chapter \d+(\.\d)*)/gi;

var found = str.match(re);
var found2 = str.match(re2);

console.log(found);
console.log(found2);
console.log(re.source, re2.flags);

// replace
var rep = "abcd".replace(/(^.)/gi, "$1, $$, $&, $`");

var rep2 = "abcd".replace(/(^.)/gi, function (match, p1, offset, string) {
  console.log("xx", match, p1, offset, string);
  return string;
});

console.log(rep);
console.log(rep2);

// search
var str = "hey JudE";
var re = /[A-Z]/g;
var re2 = /[.]/g;
console.log(str.search(re));
console.log(str.search(re2));

//split
var arr = "abc ; def".split(/\s*;\s*/);
console.log(arr);

// exec
// Match "quick brown" followed by "jumps", ignoring characters in between
// Remember "brown" and "jumps"
// Ignore case
var re = /quick\s(brown).+?(jumps)/gi;
var result = re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");
console.log(re, result);

// es6 something new
// u修饰符,匹配unicode
// y修饰符,粘连，全局匹配的时候，紧接着匹配
// s修饰符：dotAll 模式 .会匹配所有的任意单个字符
// 支持分组命名，支持负向零宽断言

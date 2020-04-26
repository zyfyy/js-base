// json_stringify
function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = Array.isArray(obj);
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
jsonStringify({ x: 5 }); // "{"x":5}"
jsonStringify([1, "false", false]); // "[1,"false",false]"
jsonStringify({ b: undefined }); // "{"b":"undefined"}"

// json_parse
// way one
function jsonParse(opt) {
  return eval("(" + opt + ")");
}
jsonParse(jsonStringify({ x: 5 }));

// way two
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();

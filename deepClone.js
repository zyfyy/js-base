function deepClone(origin) {
  let toStr = Object.prototype.toString;
  let isInvalid =
    toStr.call(origin) !== "[object Object]" &&
    toStr.call(origin) !== "[object Array]";
  if (isInvalid) {
    return origin;
  }
  let target = toStr.call(origin) === "[object Object]" ? {} : [];
  for (const key in origin) {
    if (origin.hasOwnProperty(key)) {
      const item = origin[key];
      if (typeof item === "object" && item !== null) {
        target[key] = deepClone(item);
      } else {
        target[key] = item;
      }
    }
  }
  return target;
}

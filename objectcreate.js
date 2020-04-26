function objectcreate(proto, propertiesObject) {
  let res = {};
  res.__proto__ = proto;
  Object.defineProperties(res, propertiesObject);
  return res;
}

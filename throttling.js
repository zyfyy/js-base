function throttle(fn, wait) {
  let prev = new Date();
  return function () {
    const args = arguments;
    const now = new Date();
    if (now - prev > wait) {
      fn.apply(this, args);
      prev = new Date();
    }
  };
}

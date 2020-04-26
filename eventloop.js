console.log("1");
setTimeout(function () {
  console.log("2");
  setImmediate(function () {
    console.log("3");
  });
  process.nextTick(function () {
    console.log("4");
  });
  new Promise(function (resolve) {
    console.log("5");
    resolve();
  }).then(function () {
    console.log("6");
  });
});

// We have two calls that are similar as far as users are concerned, but their names are confusing.
//
//     process.nextTick() fires immediately on the same phase
//     setImmediate() fires on the following iteration or 'tick' of the event loop
// In essence, the names should be swapped. process.nextTick() fires more immediately than setImmediate(), but this is an artifact of the past which is unlikely to change.
// 最佳实践 We recommend developers use setImmediate() in all cases because it's easier to reason about (and it leads to code that's compatible with a wider variety of environments, like browser JS.)

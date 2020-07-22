let a = (a, ...next) => {
  console.log(a, next);
}

a('a');
a('a', 'b');
a('a', 'b', 'c');

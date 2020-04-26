let b = (a) => {
  return (a) => {
    return (a) => {
      return (a) => {
        console.log(a);
      };
    };
  };
};

b();
console.log(b());
console.log("bb");
b()("a");
b()()()("aa");
b("ss")()()("aa");

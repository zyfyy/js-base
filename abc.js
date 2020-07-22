let A = (num, arr) => {
    arr = arr || [];

    console.log('a', num, arr);

    if (num !== undefined) {
        arr.push(num);
        return function(n) {
            return A.call(null, n, arr)
        };
    }

    return arr.reduce((a, b) => {return a + b});
}


console.log(A(1)(2)(3)());

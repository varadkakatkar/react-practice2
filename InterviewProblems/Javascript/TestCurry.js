const curry = require("./Curry.js");

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(7)(2)(3)); // 6
console.log(curriedSum(8, 2)(3)); // 6
console.log(curriedSum(9)(2, 3)); // 6
console.log(curriedSum(11, 2, 3)); // 6

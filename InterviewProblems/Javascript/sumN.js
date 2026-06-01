function sumN(n) {
  // your solution here
  if (typeof n !== "number" || n < 0 || !Number.isInteger(n)) return false;
  if (n === 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum = sum + i;
  }
  return sum;
}

module.exports = { sumN };

console.log("sum using for loop => " + sumN(0));

function sumN1(n) {
  // your solution here
  if (typeof n !== "number" || n < 0 || !Number.isInteger(n)) return false;
  if (n === 0) return 0;

  return n + sumN1(n - 1);
}

module.exports = { sumN1 };

console.log("sum using recursion => " + sumN1(5));

function sumN2(n) {
  // your solution here
  if (typeof n !== "number" || n < 0 || !Number.isInteger(n)) return false;
  if (n === 0) return 0;

  return (n * (n + 1)) / 2;
}

module.exports = { sumN2 };

console.log("sum using recursion 2 => " + sumN2(10));

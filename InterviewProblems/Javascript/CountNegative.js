function countNegatives(arr) {
  if (!Array.isArray(arr)) return false;

  let negativeCount = 0;

  for (let i = 0; i < arr.length; i++) {
    if (!Number.isFinite(arr[i])) return false;

    if (arr[i] < 0) {
      negativeCount++;
    }
  }

  return negativeCount;
}

module.exports = { countNegatives };

console.log(countNegatives([-1, -2, 3]));
console.log(countNegatives([1, 2, 3]));
console.log(countNegatives(["a", -1]));
console.log(countNegatives([NaN, -1]));
console.log(countNegatives([Infinity, -1]));
console.log(countNegatives(null));

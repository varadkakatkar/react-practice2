/*
 * SUM OF ALL ARGUMENTS IN A SINGLE CALL
 * -------------------------------------
 * Unlike the curried version sum(1)(2)(3)(), here ALL numbers are passed in
 * ONE call:  sumAll(4, 56, 7, 8, 9, 10)
 *
 * How it works:
 *   - REST PARAMETER `...args` collects every argument into a real ARRAY.
 *       sumAll(4, 56, 7) -> args = [4, 56, 7]
 *   - reduce() walks that array left-to-right, keeping a running `total`.
 *       total starts at 0, then total = total + currentNumber each step.
 *
 * This naturally supports any number of arguments (0, 1, or many).
 */

let sumAll = function (...args) {
  return args.reduce((total, n) => total + n, 0);
};

// DRY RUN: sumAll(4, 56, 7, 8, 9, 10)
//   Step 1: args = [4, 56, 7, 8, 9, 10]
//   Step 2: reduce with starting total = 0
//
// DRY RUN TABLE:
// +-----------+---------+-------------------+
// | n (curr)  | total   | total + n         |
// +-----------+---------+-------------------+
// | 4         | 0       | 4                 |
// | 56        | 4       | 60                |
// | 7         | 60      | 67                |
// | 8         | 67      | 75                |
// | 9         | 75      | 84                |
// | 10        | 84      | 94                |
// +-----------+---------+-------------------+
//   Output: 94
console.log(sumAll(4, 56, 7, 8, 9, 10));

// Works for any count of args:
console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(5));       // 5
console.log(sumAll());        // 0  (empty -> reduce returns the initial value)

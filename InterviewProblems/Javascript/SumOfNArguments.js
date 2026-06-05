/*
 * SUM OF N ARGUMENTS - INFINITE CURRYING (using recursion)
 * --------------------------------------------------------
 * Goal: support calls like sum(1)(2)(3)(4)(5)()  -> 15
 *
 * Idea:
 *   - Every call sum(a) returns ANOTHER function that expects the next number.
 *   - Each returned function uses a CLOSURE to remember the running total `a`.
 *   - RECURSION: when a number `b` is given, we call sum(a + b) again - this
 *     rebuilds a fresh "waiting" function carrying the new accumulated total.
 *   - BASE CASE: when the function is called with NO argument, `b` is
 *     `undefined`, which means "stop" - we return the accumulated total `a`.
 *
 * So the empty final call `()` is the signal to terminate the chain.
 */

let sum = function (a) {
  return function (b) {
    // recursive case: another number was passed -> keep accumulating
    if (b !== undefined) {
      return sum(a + b);
    }
    // base case: called with no argument -> stop and return the total
    return a;
  };
};

// DRY RUN: sum(1)(2)(3)(4)(5)()
//   sum(1)        -> a=1, returns fn waiting for next number
//   (2)           -> b=2  -> sum(1+2)  = sum(3),  returns fn (total so far 3)
//   (3)           -> b=3  -> sum(3+3)  = sum(6),  returns fn (total so far 6)
//   (4)           -> b=4  -> sum(6+4)  = sum(10), returns fn (total so far 10)
//   (5)           -> b=5  -> sum(10+5) = sum(15), returns fn (total so far 15)
//   ()            -> b=undefined -> BASE CASE -> return a = 15
//   Output: 15
//
// DRY RUN TABLE:
// +-----------+-------------+--------------------------+-------+
// | Call      | b           | Action                   | Total |
// +-----------+-------------+--------------------------+-------+
// | sum(1)    | -           | a = 1                    | 1     |
// | (2)       | 2           | sum(1+2)                 | 3     |
// | (3)       | 3           | sum(3+3)                 | 6     |
// | (4)       | 4           | sum(6+4)                 | 10    |
// | (5)       | 5           | sum(10+5)                | 15    |
// | ()        | undefined   | base case -> return a    | 15    |
// +-----------+-------------+--------------------------+-------+
console.log(sum(1)(2)(3)(4)(5)());
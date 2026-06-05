/*
 * CURRYING WITH CLOSURES
 * ----------------------
 * Currying = turning a multi-arg function into a chain of single-arg functions.
 * Here we do it WITHOUT bind - we use a CLOSURE instead.
 *
 * CLOSURE = an inner function "remembers" the variables of the outer function
 * even after the outer function has finished running.
 *
 * - Outer function `multiply(x)` takes the first number and RETURNS an inner
 *   function `(y) => x * y`.
 * - That inner function keeps a live reference to `x` (this is the closure).
 * - So `multiply(5)` gives us a function where x is permanently 5; we just
 *   supply `y` later to get the result.
 *
 * This is the same "fix some args now, rest later" idea as bind, but achieved
 * purely with function scope instead of `.bind()`.
 */

let multiply = function (x) {
  return function (y) {
    return x * y;
  };
};

// DRY RUN:
//   Step 1: multiply(5) -> x = 5, returns inner fn that remembers x = 5
//   Step 2: multiplyByTwo(10) -> y = 10, computes x * y = 5 * 10
//   Output: 50
let multiplyByTwo = multiply(5);
console.log(multiplyByTwo(10));

// DRY RUN:
//   Step 1: multiply(10) -> x = 10 (closed over)
//   Step 2: multiplyByThree(5) -> y = 5, x * y = 10 * 5
//   Output: 50
let multiplyByThree = multiply(10);
console.log(multiplyByThree(5));

// DRY RUN:
//   Step 1: multiply(15) -> x = 15 (closed over)
//   Step 2: multiplyByFour(5) -> y = 5, x * y = 15 * 5
//   Output: 75
let multiplyByFour = multiply(15);
console.log(multiplyByFour(5));

// DRY RUN:
//   Step 1: multiply(20) -> x = 20 (closed over)
//   Step 2: multiplyByFive(5) -> y = 5, x * y = 20 * 5
//   Output: 100
let multiplyByFive = multiply(20);
console.log(multiplyByFive(5));

// DRY RUN:
//   Step 1: multiply(25) -> x = 25 (closed over)
//   Step 2: multiplyBySix(5) -> y = 5, x * y = 25 * 5
//   Output: 125
let multiplyBySix = multiply(25);
console.log(multiplyBySix(5));

// DRY RUN:
//   Step 1: multiply(30) -> x = 30 (closed over)
//   Step 2: multiplyBySeven(5) -> y = 5, x * y = 30 * 5
//   Output: 150
let multiplyBySeven = multiply(30);
console.log(multiplyBySeven(5));

/*
 * ----------------------------------------------------------------------------
 * MORE PARAM SCENARIOS (closure version of the bind demo edge cases)
 * ----------------------------------------------------------------------------
 * In the bind demo, leftover args were ignored because the original function
 * only had 2 params. With closures the same idea applies: each function only
 * uses the ONE param it declares; any EXTRA args passed are simply ignored,
 * and any MISSING arg becomes `undefined`.
 */

// SCENARIO 1: extra args to the INNER function -> ignored
// DRY RUN:
//   Step 1: multiply(8) -> x = 8 (closed over)
//   Step 2: inner fn declares only (y); calling (5, 99) -> y = 5, 99 ignored
//   Step 3: x * y -> 8 * 5
//   Output: 40   (99 has no parameter, so it is dropped)
let multiplyByEight = multiply(8);
console.log(multiplyByEight(5, 99));

// SCENARIO 2: extra args to the OUTER function -> ignored
// DRY RUN:
//   Step 1: multiply(9, 100) -> outer declares only (x); x = 9, 100 ignored
//   Step 2: multiplyByNine(5) -> y = 5
//   Step 3: x * y -> 9 * 5
//   Output: 45   (100 never had a parameter to land in)
let multiplyByNine = multiply(9, 100);
console.log(multiplyByNine(5));

// SCENARIO 3: MISSING the inner arg (y) -> y is undefined
// DRY RUN:
//   Step 1: multiply(10) -> x = 10
//   Step 2: multiplyByTen() -> no value for y, so y = undefined
//   Step 3: x * y -> 10 * undefined
//   Output: NaN   (any math with undefined gives NaN)
let multiplyByTen = multiply(10);
console.log(multiplyByTen());

// SCENARIO 4: MISSING the outer arg (x) -> x is undefined
// DRY RUN:
//   Step 1: multiply() -> x = undefined (closed over as undefined)
//   Step 2: badMultiply(5) -> y = 5
//   Step 3: x * y -> undefined * 5
//   Output: NaN
let badMultiply = multiply();
console.log(badMultiply(5));

// SCENARIO 5: call the whole chain inline (no intermediate variable)
// DRY RUN:
//   Step 1: multiply(7) -> returns inner fn with x = 7
//   Step 2: immediately call (8) -> y = 8
//   Step 3: x * y -> 7 * 8
//   Output: 56
console.log(multiply(7)(8));

// SCENARIO 6: multiply(7, 8)(9) -> YES this is valid, BUT 8 is ignored
// WHY / JUSTIFICATION:
//   The chain has TWO call stages, and each stage feeds ONE function:
//     - Stage A: multiply(7, 8)  -> hits the OUTER function `function (x)`.
//       The outer fn declares only `x`, so x = 7. The extra `8` has no
//       parameter to land in, so it is dropped right here.
//       This stage returns the inner function `function (y)`, which via the
//       CLOSURE remembers x = 7.
//     - Stage B: (9)             -> hits that returned INNER function.
//       The inner fn declares only `y`, so y = 9.
//   CURRYING part: we supplied the "first arg" (7) in stage A and the
//   "second arg" (9) later in stage B - args provided across multiple calls.
//   CLOSURE part: the inner fn still had access to x = 7 from the outer
//   scope even though multiply() had already returned.
// DRY RUN:
//   Step 1: multiply(7, 8) -> x = 7, 8 ignored, returns inner fn (remembers x=7)
//   Step 2: (9)            -> y = 9
//   Step 3: x * y          -> 7 * 9
//   Output: 63   (NOT 7*8*9 - the 8 never participates)
console.log(multiply(7, 8)(9));

/*
 * WANT THE SECOND NUMBER (8) TO ACTUALLY COUNT?
 * Then the OUTER function must DECLARE that parameter. Below, multiply3 takes
 * (x, y) up front and returns an inner fn taking (z). Now every number is used.
 */
let multiply3 = function (x, y) {
  return function (z) {
    return x * y * z;
  };
};

// DRY RUN: multiply3(7, 8)(9)
//   Step 1: multiply3(7, 8) -> outer DECLARES (x, y): x = 7, y = 8 (both kept!)
//   Step 2: returns inner fn that, via closure, remembers x = 7 AND y = 8
//   Step 3: (9) -> z = 9
//   Step 4: x * y * z -> 7 * 8 * 9
//   Output: 504   (now nothing is ignored)
console.log(multiply3(7, 8)(9));

/*
 * CURRYING WITH bind()
 * --------------------
 * Currying = transforming a function that takes many arguments into a
 * sequence of functions, where some arguments are "fixed" (pre-filled) now
 * and the rest are supplied later.
 *
 * `bind` is one way to curry: it returns a NEW function with the given
 * arguments locked in. The order of arguments is:
 *     bound args (from bind, left-to-right)  THEN  call-time args (left-to-right)
 * These together fill the original parameters (x, y). Any leftover args that
 * have no matching parameter are simply ignored.
 */

let multiply = function (x, y) {
  console.log(x * y);
};

// DRY RUN:
//   Step 1: multiply.bind(this, 2) -> returns new fn with x locked to 2
//   Step 2: multiplyByTow(5)       -> 5 fills next free param => y = 5
//   Step 3: body runs x * y        -> 2 * 5
//   Output: 10
let multiplyByTow = multiply.bind(this, 2);
multiplyByTow(5);

// DRY RUN:
//   Step 1: multiply.bind(this, 3) -> x locked to 3
//   Step 2: multiplyByThree(5)     -> y = 5
//   Step 3: x * y                  -> 3 * 5
//   Output: 15
let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5);

// DRY RUN:
//   Step 1: multiply.bind(this, 5) -> x locked to 5
//   Step 2: multiplyByFour(4, 10)  -> 4 fills y; 10 has NO matching param
//   Step 3: 10 is ignored
//   Step 4: x * y                  -> 5 * 4
//   Output: 20
let multiplyByFour = multiply.bind(this, 5);
multiplyByFour(4, 10);

// DRY RUN:
//   Step 1: multiply.bind(this) -> nothing locked (x still empty here)
//   Step 2: BUT line below calls multiplyByFour, NOT multiplyByFive!
//   Step 3: multiplyByFour already has x = 5 locked
//   Step 4: multiplyByFour(5, 9) -> 5 fills y; 9 ignored
//   Step 5: x * y                -> 5 * 5
//   Output: 25   (multiplyByFive is created but never used)
let multiplyByFive = multiply.bind(this);
multiplyByFour(5, 9);

// DRY RUN:
//   Step 1: multiply.bind(this, 6) -> x locked to 6
//   Step 2: multiplyBySix(5, 9, 10) -> 5 fills y; 9 and 10 have no param
//   Step 3: 9 and 10 are ignored
//   Step 4: x * y                   -> 6 * 5
//   Output: 30
let multiplyBySix = multiply.bind(this, 6);
multiplyBySix(5, 9, 10);


// DRY RUN:
//   Step 1: multiply.bind(this, 7, 8) -> BOTH params locked: x = 7, y = 8
//   Step 2: multiplyBySeven(5)        -> x and y are already full
//   Step 3: 5 has no free param       -> ignored
//   Step 4: x * y                     -> 7 * 8
//   Output: 56   (here the bind side supplied all args, so 5 is dropped)
let multiplyBySeven = multiply.bind(this, 7,8);
multiplyBySeven(5);

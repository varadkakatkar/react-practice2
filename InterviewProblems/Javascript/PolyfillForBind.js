let name = {
  firstName: "Varad",
  lastName: "k",
};

let printFullName = function (hometown, state, country) {
  console.log(
    this.firstName +
      " " +
      this.lastName +
      " from " +
      hometown +
      ", " +
      state +
      ", " +
      country,
  );
};

// Javascript bind
let myFullName = printFullName.bind(name, "dehradun", "UttaraKhand");

myFullName("India");

//Polyfill for bind
//
// GOAL: re-create the native `bind`. Native bind returns a NEW function that,
// when later called, runs the original function with:
//   - a fixed `this` value, AND
//   - some pre-filled (preset) arguments, followed by call-time arguments.
//
// We attach it to Function.prototype so EVERY function can call `.mybind(...)`,
// exactly like the built-in `.bind(...)`.

Function.prototype.mybind = function (...args) {
  // `this` here = the function on which mybind was called (the LEFT of the dot).
  // e.g. in `printFullName.mybind(...)`, `this` === printFullName.
  let obj = this;

  // args[0] = the object to be used as `this` inside the original function.
  let name = args[0];

  // everything after the first arg = the preset arguments to lock in now.
  let params = args.slice(1);

  // Return a NEW function (the bound function). It is NOT executed yet -
  // it runs only when the caller later invokes it, passing args2.
  return function (...args2) {
    console.log("name ", name);
    console.log("params ", params);
    console.log("args2 ", args2);

    // apply() calls obj with `this = name` and a single merged argument array:
    //   [...preset args from bind, ...args supplied at call time]
    obj.apply(name, [...params, ...args2]);
  };
};

// DRY RUN: printFullName.mybind(name, "dehradun", "UttaraKhand")
//   Step 1: obj    = printFullName
//   Step 2: name   = name object ({ firstName:"Varad", lastName:"k" })
//   Step 3: params = ["dehradun", "UttaraKhand"]
//   Step 4: returns a new function -> stored in myFullName2 (nothing logged yet)
//
// DRY RUN: myFullName2("India")
//   Step 5: args2 = ["India"]
//   Step 6: obj.apply(name, ["dehradun", "UttaraKhand", "India"])
//   Step 7: inside printFullName -> this = name, hometown="dehradun",
//           state="UttaraKhand", country="India"
//   Output: "Varad k from dehradun, UttaraKhand, India"
let myFullName2 = printFullName.mybind(name, "dehradun", "UttaraKhand");
myFullName2("India");

//Polyfill for bind with checks (Function check + params check)
//
// Same idea as mybind above, but with two safety guards added BEFORE we build
// the bound function. These guards make our polyfill fail fast with a clear
// error instead of breaking mysteriously later.

Function.prototype.mybindSafe = function (...args) {
  // The function that mybindSafe was called on (left of the dot).
  let obj = this;

  // GUARD 1 - Function check:
  // mybindSafe only makes sense on a function. If someone does
  // `({}).mybindSafe(...)`, `obj` would be a plain object and `obj.apply`
  // would later crash. We catch that here with a clear TypeError, which is
  // also how the native bind behaves (it lives only on functions).
  if (typeof obj !== "function") {
    throw new TypeError(
      "Function.prototype.mybindSafe - what is trying to be bound is not callable",
    );
  }

  // args[0] = the `this` value to bind; rest = preset arguments.
  let thisArg = args[0];
  let params = args.slice(1);

  // GUARD 2 - Params check:
  // Reject any preset argument that is `undefined` (often a sign of a bug,
  // e.g. passing a variable that was never set). NOTE: native bind does NOT
  // do this - this is a stricter, custom rule for our polyfill.
  if (params.some((p) => p === undefined)) {
    throw new TypeError("Function.prototype.mybindSafe - invalid bound argument");
  }

  // Build and return the bound function (runs only when later called).
  return function (...args2) {
    console.log("thisArg ", thisArg);
    console.log("params ", params);
    console.log("args2 ", args2);

    // `return` so the caller actually receives whatever the original returns.
    return obj.apply(thisArg, [...params, ...args2]);
  };
};

// DRY RUN: printFullName.mybindSafe(name, "dehradun", "UttaraKhand")
//   Step 1: obj = printFullName -> typeof obj === "function" -> Guard 1 passes
//   Step 2: thisArg = name object
//   Step 3: params  = ["dehradun", "UttaraKhand"] -> no undefined -> Guard 2 passes
//   Step 4: returns the bound function -> stored in myFullName3
//
// DRY RUN: myFullName3("India")
//   Step 5: args2 = ["India"]
//   Step 6: obj.apply(name, ["dehradun", "UttaraKhand", "India"])
//   Output: "Varad k from dehradun, UttaraKhand, India"
//
// (If instead we did `({}).mybindSafe()` -> Guard 1 throws.
//  If we did `printFullName.mybindSafe(name, undefined)` -> Guard 2 throws.)
let myFullName3 = printFullName.mybindSafe(name, "dehradun", "UttaraKhand");
myFullName3("India");

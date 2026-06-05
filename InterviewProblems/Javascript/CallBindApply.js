/*
 * call() vs apply() vs bind()
 * ---------------------------
 * All three let us control what `this` refers to inside a function (this is
 * called "function borrowing" - using one object's method with another object).
 *
 * The difference is HOW arguments are passed and WHEN the function runs:
 *
 *   call(thisArg, arg1, arg2, ...)   -> sets `this`, args passed individually,
 *                                       and runs the function IMMEDIATELY.
 *
 *   apply(thisArg, [arg1, arg2, ...]) -> same as call, BUT args are passed as
 *                                        a single ARRAY. Runs IMMEDIATELY.
 *
 *   bind(thisArg, arg1, arg2, ...)   -> sets `this` and presets args, but does
 *                                       NOT run. It RETURNS a new function to
 *                                       call later.
 *
 * Memory hook: call = Comma args, Apply = Array args, Bind = Bound-for-later.
 */

let name = {
    firstName: "Varad",
    lastName: "k",
};


let printFullName = function (hometown, state, country) {
    console.log(this.firstName + " " + this.lastName + " from " + hometown + ", " + state + ", " + country);
}

let printFullName2 = function (hometown, state, country) {
    console.log(this.firstName + " " + this.lastName + " from " + hometown + ", " + state + ", " + country);

}

// CALL - args passed individually (comma separated), runs immediately
// DRY RUN:
//   Step 1: call(name, ...) sets `this` = name inside printFullName
//   Step 2: args map by position -> hometown="Dehradun", state="Uttarakhand",
//           country="India"
//   Step 3: function runs RIGHT NOW
//   Output: "Varad k from Dehradun, Uttarakhand, India"
printFullName.call(name, "Dehradun", "Uttarakhand", "India");

// APPLY - same as call but args are passed inside an ARRAY, runs immediately
// DRY RUN:
//   Step 1: apply(name, [...]) sets `this` = name inside printFullName2
//   Step 2: array is unpacked by position -> hometown="Dehradun",
//           state="Uttarakhand", country="India"
//   Step 3: function runs RIGHT NOW
//   Output: "Varad k from Dehradun, Uttarakhand, India"
printFullName2.apply(name, ["Dehradun", "Uttarakhand", "India"]);

// BIND - sets `this` + presets args, but does NOT run; returns a new function
// DRY RUN:
//   Step 1: bind(name, ...) sets `this` = name and locks all three args
//   Step 2: returns a NEW function -> stored in printFullName3 (nothing printed yet)
//   Step 3: printFullName3() actually invokes it (no new args needed - all preset)
//   Output: "Varad k from Dehradun, Uttarakhand, India"
let printFullName3 = printFullName.bind(name, "Dehradun", "Uttarakhand", "India");
printFullName3();


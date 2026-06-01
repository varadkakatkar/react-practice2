/* =====================================================================
   Array.prototype.reduce() — DEEP DIVE (Interview Reference)
   =====================================================================

   SIGNATURE:
   arr.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)

   - callback      : function run once per element
       - accumulator  : the "running result" carried between iterations
       - currentValue : the current element being processed
       - currentIndex : index of currentValue
       - array        : the original array reduce was called on
   - initialValue  : (optional) starting value of the accumulator

   CORE MENTAL MODEL:
   reduce "folds" an array into a SINGLE value by repeatedly combining
   the accumulator with each element. That single value can be ANYTHING:
   a number, string, boolean, object, array, Map, Set, or even a function.

   THE initialValue RULE (very common interview gotcha):
   - If initialValue IS provided:
       accumulator starts = initialValue
       iteration starts at index 0
   - If initialValue is NOT provided:
       accumulator starts = arr[0]
       iteration starts at index 1
   - If the array is EMPTY and NO initialValue is given:
       => TypeError: "Reduce of empty array with no initial value"
   - BEST PRACTICE: almost always pass an initialValue. It avoids the
     empty-array crash and makes the accumulator's type explicit.

   ===================================================================== */

/* ---------------------------------------------------------------------
   1) ACCUMULATOR = NUMBER  → find the max (your original problem)
   --------------------------------------------------------------------- */
const arr = [5, 1, 3, 2, 6];

const findMax = (arr) => {
  if (!Array.isArray(arr)) return false;

  // accumulator `max` is a NUMBER, seeded with the first element.
  // Seeding with arr[0] (not 0) keeps it correct for all-negative arrays.
  return arr.reduce((max, current) => Math.max(max, current), arr[0]);
};

console.log("1) max:", findMax(arr)); // 6

/* Step-by-step trace for [5, 1, 3, 2, 6] with seed arr[0] = 5:
   start: max = 5 (iteration begins at index 1)
   current=1 -> Math.max(5,1)=5
   current=3 -> Math.max(5,3)=5
   current=2 -> Math.max(5,2)=5
   current=6 -> Math.max(5,6)=6
   result: 6
*/

/* ---------------------------------------------------------------------
   2) ACCUMULATOR = NUMBER  → simple sum
   --------------------------------------------------------------------- */
const sum = [10, 20, 30].reduce((acc, n) => acc + n, 0);
console.log("2) sum:", sum); // 60

/* ---------------------------------------------------------------------
   3) ACCUMULATOR = OBJECT  → frequency counter / tally
   Classic interview question: "count occurrences of each item".
   --------------------------------------------------------------------- */
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const countFruits = fruits.reduce((acc, fruit) => {
  // acc is an OBJECT acting as a hashmap { fruit: count }
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc; // ALWAYS return the accumulator
}, {});

console.log("3) frequency:", countFruits);
// { apple: 3, banana: 2, orange: 1 }

/* ---------------------------------------------------------------------
   4) ACCUMULATOR = OBJECT  → group an array of objects by a key
   (like SQL GROUP BY). Returns { key: [items...] }.
   --------------------------------------------------------------------- */
const people = [
  { name: "Asha", dept: "Eng" },
  { name: "Ravi", dept: "Sales" },
  { name: "Meera", dept: "Eng" },
  { name: "Sam", dept: "Sales" },
];

const groupByDept = people.reduce((acc, person) => {
  const key = person.dept;
  // if this group does not exist yet, start it as an empty ARRAY
  if (!acc[key]) acc[key] = [];
  acc[key].push(person.name);
  return acc;
}, {});

console.log("4) groupBy:", groupByDept);
// { Eng: ['Asha', 'Meera'], Sales: ['Ravi', 'Sam'] }

/* ---------------------------------------------------------------------
   5) ACCUMULATOR = ARRAY  → flatten a nested array (one level)
   Shows how reduce can BUILD an array, not just collapse to a scalar.
   --------------------------------------------------------------------- */
const nested = [[1, 2], [3, 4], [5]];

const flat = nested.reduce((acc, innerArr) => {
  // acc is an ARRAY; concat returns a new array of merged contents
  return acc.concat(innerArr);
}, []);

console.log("5) flatten:", flat); // [1, 2, 3, 4, 5]

/* ---------------------------------------------------------------------
   6) ACCUMULATOR = ARRAY  → implement map + filter in a single pass
   Interview favorite: "do map and filter using only reduce".
   Here: keep even numbers AND double them.
   --------------------------------------------------------------------- */
const nums = [1, 2, 3, 4, 5, 6];

const evensDoubled = nums.reduce((acc, n) => {
  if (n % 2 === 0) acc.push(n * 2); // filter (even) + map (×2)
  return acc;
}, []);

console.log("6) map+filter:", evensDoubled); // [4, 8, 12]

/* ---------------------------------------------------------------------
   7) ACCUMULATOR = SET / MAP  → dedupe while preserving order
   The accumulator can be ANY object, including built-ins like Set/Map.
   --------------------------------------------------------------------- */
const withDupes = [1, 2, 2, 3, 3, 3, 4];

const uniqueSet = withDupes.reduce((set, n) => {
  set.add(n); // Set automatically ignores duplicates
  return set;
}, new Set());

console.log("7) unique:", [...uniqueSet]); // [1, 2, 3, 4]

/* ---------------------------------------------------------------------
   8) ACCUMULATOR = STRING  → build a string (e.g. CSV row)
   --------------------------------------------------------------------- */
const words = ["reduce", "is", "powerful"];

const sentence = words.reduce((acc, word, index) => {
  // add a separator for every element except the first
  return index === 0 ? word : `${acc} ${word}`;
}, "");

console.log("8) string:", sentence); // "reduce is powerful"

/* ---------------------------------------------------------------------
   9) ACCUMULATOR = FUNCTION  → FUNCTION COMPOSITION (advanced/senior)
   reduce can chain functions together. Each step the accumulator is a
   FUNCTION; the final accumulator is one composed function.

   compose(f, g, h)(x) = f(g(h(x)))   // right-to-left
   --------------------------------------------------------------------- */
const double = (x) => x * 2;
const increment = (x) => x + 1;
const square = (x) => x * x;

// reduceRight goes right-to-left, which is the natural order for compose.
const compose = (...fns) =>
  fns.reduce((composed, fn) => {
    // `composed` is the accumulated FUNCTION so far.
    // Return a NEW function that applies fn first, then composed.
    return (x) => composed(fn(x));
  });

// pipe is the same idea but left-to-right (more readable for many people)
const pipe = (...fns) =>
  fns.reduce((composed, fn) => (x) => fn(composed(x)));

const composed = compose(double, increment, square); // double(increment(square(x)))
console.log("9a) compose(3):", composed(3)); // square=9 -> inc=10 -> double=20

const piped = pipe(square, increment, double); // double(increment(square(x)))
console.log("9b) pipe(3):", piped(3)); // square=9 -> inc=10 -> double=20

/* ---------------------------------------------------------------------
   10) ACCUMULATOR = OBJECT with MULTIPLE fields → compute several
       aggregates in ONE pass (sum, count, min, max, average).
   Demonstrates returning a rich object as the running result.
   --------------------------------------------------------------------- */
const scores = [40, 90, 70, 20, 100];

const stats = scores.reduce(
  (acc, score) => {
    acc.count += 1;
    acc.sum += score;
    acc.min = Math.min(acc.min, score);
    acc.max = Math.max(acc.max, score);
    acc.avg = acc.sum / acc.count; // recompute running average
    return acc;
  },
  { count: 0, sum: 0, min: Infinity, max: -Infinity, avg: 0 },
);

console.log("10) stats:", stats);
// { count: 5, sum: 320, min: 20, max: 100, avg: 64 }

/* =====================================================================
   INTERVIEW TALKING POINTS / GOTCHAS
   =====================================================================
   1. ALWAYS return the accumulator from the callback. Forgetting to
      `return acc` makes it `undefined` on the next iteration — the #1 bug.

   2. Pass an initialValue. It:
        - prevents the "empty array" TypeError,
        - sets the accumulator type explicitly (e.g. {}, [], 0, ""),
        - makes iteration start at index 0 (predictable).

   3. The accumulator can be ANY type: number, string, boolean, object,
      array, Set, Map, or function. "Reduce" doesn't mean "shrink to a
      number" — it means "fold into one value".

   4. Mutating vs. immutable:
        - acc.push(x) / acc[key]=v  → mutate the SAME accumulator (fast).
        - acc.concat(x) / {...acc}  → return a NEW accumulator each step
          (cleaner/functional but creates garbage; O(n^2) if misused).
      For interviews, mention you USUALLY mutate the accumulator you own
      (created via initialValue), since it's local and safe.

   5. reduceRight is identical but processes right-to-left — natural for
      function composition or right-associative operations.

   6. reduce can re-implement map, filter, find, some, every, flat,
      groupBy, etc. Interviewers love asking you to build these with it.

   7. Time complexity is O(n) for a single pass (assuming O(1) work per
      element). Watch out for O(n) operations inside (spread/concat),
      which can make it O(n^2).
   ===================================================================== */

function findSmallest(arr) {
  if (!Array.isArray(arr)) return false;
  if (arr.length === 0) return null;

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number" || !Number.isFinite(arr[i])) {
      return false;
    }
  }

  let smallest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return smallest;
}

module.exports = { findSmallest };

const arr1 = [3, 1, 2];
console.log(`Smallest number of array [${arr1}] is ${findSmallest(arr1)}`);

const arr2 = [-5, 2, -3, 4];
console.log(`Smallest number of array [${arr2}] is ${findSmallest(arr2)}`);

const arr3 = [0, 2, 3];
console.log(`Smallest number of array [${arr3}] is ${findSmallest(arr3)}`);

const arr4 = [];
console.log(`Smallest number of array [${arr4}] is ${findSmallest(arr4)}`);

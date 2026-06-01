function sum(...args) {
  console.log("args", args);
  return args.reduce((accumulator, current) => {
    console.log("accumulator", accumulator);
    console.log("current", current);
    accumulator += current;
    console.log("accumulator + current", accumulator);
    return accumulator;
  }, 10);
}

let result = sum(200, 300, 400, 500);
console.log(result);

function findSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

let arr = [1, 2, 3, 4, 5];
console.log(findSum(arr));

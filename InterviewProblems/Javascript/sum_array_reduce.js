function sum(...args) {
  return args.reduce((accumulator, current) => accumulator + current, 0);
}

let result = sum(200, 300, 400, 500);
console.log(result);

function makeCounter(initialValue = 0) {
  // Your implementation
  let count = initialValue;

  return {
    increment: () => {
      count++;
      return count;
    },
    decrement: () => {
      count--;
      return count;
    },
    reset: () => {
      count = initialValue;
      return count;
    },

    getValue: () => {
      return count;
    },
  };
}

module.exports = makeCounter;

const counter = makeCounter(5);
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.reset());
console.log(counter.decrement());

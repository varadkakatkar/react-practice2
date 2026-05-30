function flattenArray(arr) {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val);
  }, []);
}

//For the purpose of user debugging.
console.log(flattenArray([1, [2, [3, 4], 5], 6]));

module.exports = flattenArray;

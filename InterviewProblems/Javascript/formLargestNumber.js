function formLargestNumber(arr) {
  //write your implementation here
  const nums = arr.map((num) => num.toString());

  nums.sort((a, b) => {
    return (b + a).localeCompare(a + b);
  });

  if (nums[0] === "0") {
    return "0";
  }

  return nums.join("");
}
const input = [3, 30, 34, 5, 9];
formLargestNumber(input);
module.exports = formLargestNumber;

console.log(formLargestNumber(input));

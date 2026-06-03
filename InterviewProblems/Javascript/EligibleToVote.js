function checkVotingEligibility(age) {
  // implement your solution here
  if (age >= 18) {
    return "Eligible to vote";
  } else {
    return "Not eligible to vote";
  }
}

module.exports = { checkVotingEligibility };

console.log(checkVotingEligibility(18));
console.log(checkVotingEligibility(17));
console.log(checkVotingEligibility(20));
console.log(checkVotingEligibility(10));
console.log(checkVotingEligibility(25));
console.log(checkVotingEligibility(30));
console.log(checkVotingEligibility(35));
console.log(checkVotingEligibility(40));
console.log(checkVotingEligibility(45));
console.log(checkVotingEligibility(50));
console.log(checkVotingEligibility(55));
console.log(checkVotingEligibility(60));

function generateAtoZ() {
  const letters = [];
  for (let code = 65; code <= 90; code++) {
    letters.push(String.fromCharCode(code));
  }
  return letters;
}

module.exports = { generateAtoZ };

console.log(generateAtoZ());

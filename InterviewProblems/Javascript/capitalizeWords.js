function capitalizeWords(sentence) {
  if (!sentence) return "";

  return sentence
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

console.log(capitalizeWords("hello world"));
// "Hello World"

console.log(capitalizeWords("javaScript is FUN"));
// "Javascript Is Fun"

console.log(capitalizeWords("   multiple   spaces   "));
// "Multiple Spaces"

console.log(capitalizeWords(""));
// ""

function capitalizeWordsForLoop(sentence) {
  if (!sentence) return "";

  let words = sentence.trim().split(/\s+/);
  let result = [];

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    result.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
  }

  return result.join(" ");
}

console.log(capitalizeWordsForLoop("hello world"));
// "Hello World"

console.log(capitalizeWordsForLoop("javaScript is FUN"));
// "Javascript Is Fun"

console.log(capitalizeWordsForLoop("   multiple   spaces   "));
// "Multiple Spaces"

console.log(capitalizeWordsForLoop(""));

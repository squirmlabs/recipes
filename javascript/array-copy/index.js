let array = [1, 2, 3, 4];

'Bad Array Copy Code 💩'

let b = [];
for (let i = 0; i < array.length; i++) {
  b.push(array[i]);
}
console.log("Result of bad shallow copy", b)

'Okay Array Copy Code'

let c = Object.assign([], array);
console.log("Result of an okay shallow copy", c)

'Good Loop Code ✅'

let d = [...array]
console.log("Result of a good shallow copy", d)
// Use slice to convert array-like objects into arrays 
function addOne() {
  // arguments.map(i => i+1); // Will not work because arguments is not actually an array.
  // It's an array-like object.
  return Array.prototype.slice.call(arguments).map(i => i + 1);
}
addOne(1, 2, 3, 4);
// ----------------------------------------------------------------
// Allow for arbitrary numbers of arguments to a function.
function myFunc(a, b) {
  const extraArgs = Array.prototype.slice.call(arguments, 2);
  console.log('TCL: myFunc -> extraArgs', extraArgs);
}
myFunc(1, 2, 3, 4, 5, 6, 7, 8);
// ----------------------------------------------------------------
// Manipulate arrays in a functional/pure way, without modifying the original array.
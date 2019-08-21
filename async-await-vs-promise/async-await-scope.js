const returnsAPromise = string =>
  new Promise((resolve, reject) => {
    if (typeof string !== 'string') reject('No string!');
    resolve(`${string} is a resolved promise now`);
  });

const myString = "Adrian's String";

// ASYNC/AWAIT
const myAsyncFunction = async str => {
  // Operation A
  const promiseResults = await returnsAPromise(str);

  // Operation B (needs info from Operation A)
  console.log(`Using async/await, ${promiseResults}`);
  console.log("Careful - I'm not synchronous anymore!");
};
// Operation C (can run whenever)
console.log("I'm over here running synchronously");
myAsyncFunction(myString);

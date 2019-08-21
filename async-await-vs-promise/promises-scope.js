const returnsAPromise = string =>
  new Promise((resolve, reject) => {
    if (typeof string !== 'string') reject('No string!');
    resolve(`${string} is a resolved promise now`);
  });

const myString = "Adrian's String";

// PROMISE CHAIN
const myFunction = str => {
  // Operation A
  returnsAPromise(str)
    // Operation B (needs info from Operation A)
    .then(res => {
      console.log(`Using promise chains, ${res}`);
    });
  // Operation C (can run whenever)
  console.log("I'm over here running synchronously");
};
myFunction(myString);

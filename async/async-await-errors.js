const returnsAPromise = string =>
  new Promise((resolve, reject) => {
    if (typeof string !== 'string') reject('Not a string!');
    resolve(`String is a resolved promise now: ${string}`);
  });

const myString = "Adrian's string";

let isOurPromiseFinished = false;

const myAsyncAwaitBlock = async str => {
  try {
    // If the promise resolves, we enter this code block
    const myPromise = await returnsAPromise(str);
    console.log(`using async/await, ${res}`);
  } catch (err) {
    // If the promise rejects, we enter this code block
    console.log(err);
  } finally {
    /* This is for code that doesn't rely on the outcome of the promise
    but still needs to run once it's handled */
    isOurPromiseFinished = true;
  }
};

myAsyncAwaitBlock(myString);

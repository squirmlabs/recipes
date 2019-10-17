const returnsAPromise = string =>
  new Promise((resolve, reject) => {
    if (typeof string !== 'string') reject('Not a string!');
    resolve(`String is a resolved promise now: ${string}`);
  });

const myFirstString = "Adrian's first string";
const mySecondString = "Adrian's second string";

// PROMISE CHAIN (Promise.all())
const myPromiseAll = (str1, str2) => {
  // Operation A & Operation B can run in parallel
  Promise.all([returnsAPromise(str1), returnsAPromise(str2)])
    // Operation C (needs info from Operations A & B)
    .then(res => {
      console.log(`Promise.all() gives us an array: ${res}`);
    });
};
myPromiseAll(myFirstString, mySecondString);
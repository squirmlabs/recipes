const returnsAPromise = string =>
  new Promise((resolve, reject) => {
    if (typeof string !== 'string') reject('Not a string!');
    resolve(`String is a resolved promise now: ${string}`);
  });

const myFirstString = "Adrian's first string";
const mySecondString = "Adrian's second string";

// ASYNC/AWAIT (Multiple await statements)
const myAwaits = async (str1, str2) => {
  // Operation A & Operation B can run in parallel
  const promise1 = await returnsAPromise(str1);
  const promise2 = await returnsAPromise(str2);

  // Operation C (needs info from Operations A & B)
  console.log(
    `Using multiple awaits, I can handle the results of either promise flexibly: ${promise1} AND ${promise2}`
  );
};

myAwaits(myFirstString, mySecondString);

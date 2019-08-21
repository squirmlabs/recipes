const promiseDemo = Promise.resolve(4);

promiseDemo.then(value =>
  console.log('This will run through fulfillment. The resolved value is', value)
);

promiseDemo.catch(err =>
  console.log(
    'This will not run through fulfillment, it will run through reject',
    err
  )
);

// Example

const returnsAPromise = string => {
  return new Promise((resolve, reject) => {
    if (typeof string === 'string') {
      resolve(`${string} is a resolved promise now`);
    } else {
      reject('Not a string!');
    }
  });
};

// Let’s say we want to use a promise to print a string.
// We’ll resolve the promise by logging a message with our string,
// we’ll reject the promise if we get anything but a string.
// It’s silly, but it’ll illustrate what we’re doing really clearly:

const myString = "Adrian's string";

const myFunction = str => {
  // Operation A
  returnsAPromise(str).then(res => {
    // Operation B (needs info from Operation A)
    console.log(`Using promise chains, ${res}`);
  });
  // Operation C (can run whenever)
  console.log("I'm running synchronously");
};

myFunction(myString);

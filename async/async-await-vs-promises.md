The biggest difference I noticed between promises and async/await is the scope of the asynchronism.

## Promises

If we use our promise-returning function and keep the results in a standard promise chain, it’ll look something like the function below. The asynchronism here is all contained in the promise chain. myFunction operates like any callback would, running synchronously. Our last log will print “I’m over here running synchronously” before returnsAPromise resolves.

Here is a promise resolving a string

```js
const myString = "Adrian's String";

const returnsAPromise = string =>
  new Promise((resolve, reject) => {
    if (typeof string !== 'string') reject('No string!');
    resolve(`${string} is a resolved promise now`);
  });

```

### Promise Chain

```js
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
```

### ASYNC/AWAIT

```js
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
```

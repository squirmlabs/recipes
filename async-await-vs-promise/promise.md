# Promises

A promise is an object that wraps an asynchronous operation and promises to deliver an outcome (or an error) at some time in the future.

Promises give us a vocabulary to express chains of asynchronous operations in a way that almost looks (if you squint your eyes) like it was a sequence of synchronous operations. The main words in your promises vocabulary are then, all, and catch.

Promises allow us to chain together and interweave asynchronous operations. They help us manage numerous operations at once and automatically pull together all the callbacks for us.

1. Callback hell —Promises help minimize the nesting of callbacks.
2. Callback order —Promises automatically weave together multiple callbacks, meaning
you’re no longer concerned with their order of completion.
3. Error handling —Promises allow error handlers to be inserted anywhere in the
chain of asynchronous operations. We can share error handlers between as many
asynchronous operations as we need.

### Then

Then is used to chain together a sequence of asynchronous operations

![alt text](https://i.imgur.com/AQCuiAh.png "Executing sequential asynchronous operations with then")

### All

Promise.all is used to manage asynchronous operations that are running in parallel.
It automatically weaves together the callbacks and invokes a single final callback. Using all, you no longer need to worry about coordinating multiple callbacks that might be invoked in any order.

### Catch

`Catch` is used for error handling. Using promises, we can attach an error handler to the end of our chain. This allows us to share the error hander between all our asynchronous operations, and it will be invoked should any of the operations fail (for example, file 2 fails to load). Visualize promise error handling as a short circuit out of the promise chain. `Catch` allows us to have elegant control over our asynchronous error handling. It gives us back our try/catch statement in the asynchronous world. You can place your error handler anywhere in the chain depending on when you want to detect and report errors.

![alt text](https://i.imgur.com/Ci1FxP9.png "Visualizing a promise chain")

![alt text](https://i.imgur.com/QjcxeKM.png "Executing asynchronous operations in parallel with Promise.all")

![alt text](https://i.imgur.com/0Avv9Sq.png "A more complex example of promises illustrating how then and all can be used to weave complex chains of asynchronous logic.")

![alt text](https://i.imgur.com/lVQeGtx.png "Adding an error handler to a promise chain with catch")

In this example I placed the error handler at the end of the promise chain, although
in reality you can place your error handler anywhere in the chain depending on when
you want to detect and report errors.

> Always have at least one error handler 

> Even if you don’t need error handlers within your promise chain, it’s important to always include at least one error handler at the end of your chain. If you don’t do this, you risk errors going unnoticed because you don’t have any code to catch and report them!

![alt text](https://i.imgur.com/FUIDkWe.png "An error aborts the promise chain and invokes the error handler.")

### Wrapping asynchronous operations in promises

We can use promises even when they aren’t directly supported by the API we’re using. We just have to do the conversion ourselves.

![alt text](https://i.imgur.com/jV2Ed7N.png "A function called readFilePromise that wraps Node’s readFile function")

The `readFilePromise` function creates and returns a `Promise` object. We can then
interact with this promise to manage the async operation.

We instantiate a Promise object with an anonymous function that initiates the asynchronous file loading operation. The anonymous function is passed two parameters.

The first parameter is a `resolve` function that we call when the asynchronous operation
has completed and we’re ready to resolve the promise. This will trigger the next then
handler that is chained to the promise.

The second parameter is a `reject` function that we can call if an error occurs. We can use this to fail the promise and trigger the closest catch handler in the promise chain:

![alt text](https://i.imgur.com/4bhL2eV.png "This technique for wrapping a callback-based asynchronous function in a promise can easily be applied to any situation where you need to do such a conversion.")

A general pattern can be applied to any situation where you need to use promises.

![alt text](https://i.imgur.com/xnDdhlc.png "This technique for wrapping a callback-based asynchronous function in a promise can easily be applied to any situation where you need to do such a conversion.")

## Rules

### Scope

- Only the promise chain itself is asynchronous

### Logic

- Synchronous work can be handled in the same callback

- Multiple promises use Promise.all()

### Error Handling

- Then

- Catch

- Finally
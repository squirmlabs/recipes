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

## Then

Then is used to chain together a sequence of asynchronous operations

![alt text](https://i.imgur.com/AQCuiAh.png "Executing sequential asynchronous operations with then")

## All

Promise.all is used to manage asynchronous operations that are running in parallel.
It automatically weaves together the callbacks and invokes a single final callback. Using all, you no longer need to worry about coordinating multiple callbacks that might be invoked in any order.
## Catch

`Catch` is used for error handling. Using promises, we can attach an error handler to the end of our chain. This allows us to share the error hander between all our asynchronous operations, and it will be invoked should any of the operations fail (for example, file 2 fails to load). Visualize promise error handling as a short circuit out of the promise chain. `Catch` allows us to have elegant control over our asynchronous error handling. It gives us back our try/catch statement in the asynchronous world. You can place your error handler anywhere in the chain depending on when you want to detect and report errors.

### Always have at least one error handler

Even if you don’t need error handlers within your promise chain, it’s important to always
include at least one error handler at the end of your chain. If you don’t do this, you risk errors going unnoticed because you don’t have any code to catch and report them!

## Scope

- Only the promise chain itself is asynchronous

## Logic

- Synchronous work can be handled in the same callback

- Multiple promises use Promise.all()

## Error Handling

- Then

- Catch

- Finally
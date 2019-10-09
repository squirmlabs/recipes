# Javascript Event Loop

The event loop has one simple job. Its job is to look at the `call stack` and the `task/callback queue`. If the `call stack` is empty it will look at the `task/callback queue` and if the `task/callback queue` has any tasks, it will take the first one and push on to the `call stack`. This will continue this as long as the `call stack` is empty. This implies that the `tasl/callback queue` will queue up with multiple `setTimeout` web api calls.

## Call stack

The call stack is where your stack frames are. It's a data structure which records where in the program we are.

If we step into a function, we put something on to the stack, if we return from a function, we pop off the top of the stack that's all the stack can do.


## Heap

The heap, where memory allocation happens.

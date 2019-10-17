# Asynchronous

Something is going on but you don't want to wait till that thing is done to continue with your program. You want to continue while it's happening. So it's happening asynchronously.

## Synchronous

Something happens and you wait until this is finished before you move on to the next.

Often making requests to servers elsewhere, and it can take a couple seconds to get data back for instance and you might not want your program to stall and wait for that data to come back. you want to keep going and keep doing something.

This is where callbacks come in and  callbacks were used for a long time until es6 introduced promises. es7 introduced async await, still dealing with promises but in a different way.


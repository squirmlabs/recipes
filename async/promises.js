// A promise of a string using promise chains

// Let’s say we want to use a promise to print a string.
// Resolve the promise by logging a message with passed string,
// we’ll reject the promise if we get anything but a string.
// It’s silly, but it’ll illustrate what we’re doing really clearly:

const promiseOfString = string => {
  return new Promise((resolve, reject) => {
    if (typeof string === 'string') {
      resolve(`${string} is a resolved promise now`);
    } else {
      reject('Not a string!');
    }
  });
};


const exampleString = "Lucifer's string";

// This function takes a string,
// which then calls a function that returns a promise
// and utilizes the thenable to log the resolved promise
// The string is now a resolved promise

const resolveStringPromise = str => {
  promiseOfString(str).then(res => {
    console.log(`Using promise chains, ${res}`);
  });
  console.log("I'm running synchronously");
};

resolveStringPromise(exampleString);

const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' }
];

function getPosts() {
  setTimeout(() => {
    let output = '';
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);

      const err = false;

      if (!err) {
        resolve();
      } else {
        reject('Error, This is a fake error');
      }
    }, 2000);
  });
}

// createPost({ title: 'Post Three', body: 'This is post three' })
//   .then(getPosts)
//   .catch(err => console.log(err));
const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'Goodbye');
});

Promise.all([promise1, promise2, promise3]).then(values => console.log(values));

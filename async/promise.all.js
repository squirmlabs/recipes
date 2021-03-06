const posts = [
  { title: 'Post One', body: 'This is post one' },
  { title: 'Post Two', body: 'This is post two' }
];

function renderPosts() {
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

function getPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const err = false;

      if (!err) {
        resolve(posts);
      } else {
        reject('Error, This is a fake error');
      }
    }, 2000);
  });
}

const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'Goodbye');
});
const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res =>
  res.json()
);

const createPostThree = createPost({
  title: 'Post Three',
  body: 'This is post three'
})
  .then(renderPosts)
  .catch(err => console.log(err));

const createPostFour = createPost({
  title: 'Post Four',
  body: 'This is post four'
})
  .then(renderPosts)
  .catch(err => console.log(err));

Promise.all([promise1, promise2, promise3, getPosts(), promise4]).then(values =>
  console.log(values)
);

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

async function fetchUsers() {
  const users = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await users.json();
  console.log("TCL: fetchUsers -> data", data)
}
async function init() {
  await createPost({
    title: 'Post Three',
    body: 'This is post three'
  });
  renderPosts();
  await createPost({
    title: 'Post Four',
    body: 'This is post four'
  });
  renderPosts();
  fetchUsers();
}

init();

function a(n) {
  for (let i = 0; i < n * 1000; i++) {
    for (let j = 0; j < n * 20; j++) {
      console.log(i + j);
    }
  }
}

function b(n) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      for (var k = 0; k < n; k++) {
        for (var l = 0; l < 10; l++) {
          console.log(i + j + k + l);
        }
      }
    }
  }
}

function c(n) {
  for (var i = 0; i < 1000; i++) {
    console.log('hi');
  }
}

function d(n) {
  for (var i = 0; i < n * 10; i++) {
    console.log(n);
  }
}

function e(n) {
  for (var i = 0; i < n; i * 2) {
    console.log(n);
  }
}

function f(n) {
  while (true) {
    console.log(n);
  }
}

# Big-O Notation

Big-O is important for analyzing and comparing the efficiencies of algorithms.
The analysis of Big-O starts by looking at the code and applying the rules to simplify
the Big-O notation. The following are the most often used rules:

- Eliminating coefficients/constants (coefficient rule)
- Adding up Big-Os (sum rule)
- Multiplying Big-Os (product rule)
- Determining the polynomial of the Big-O notation by looking at loops
(polynomial rule)

## Primer

The Big-O notation measures the worst-case complexity of an algorithm. **n** represents the number of inputs. The question to ask is `What will happen if **n** reaches infinity?`

Big-O Notation tells us how efficient the algorithm is.

![alt text](https://i.imgur.com/pD6HhVd.png "Common Big-O complexities")

> Common Big-O complexities

### O( 1 )

O(1) does not change with respect to input space. O(1) is referred to as being **constant time**. An example of this algorithm is accessing an item in the array by its index.

### O( **n** )

O(**n**) is **linear time** and applies to algorithms that must do **n** operations in the worst-case scenario. An example of an O(**n**) algorithm is printing numbers from 0 to **n**-1, as shown here:

```js
function linearTime(n){
  for(let i = 0; i < n; i++) {
    console.log(i);
  }
}
```

### O(**n**<sup>2</sup>)

O(**n**<sup>2</sup>) is quadratic time. An example of this complexity is shown here:

```js
function quadraticTime(n){
  for(let i = 0; i < n; i++) {
    console.log(i);
    for(let j = i; j < n; j++) {
      console.log(j);
    }
  }
}
```

### O(**n**<sup>3</sup>)

O(**n**<sup>3</sup>) is cubic time. An example of this complexity is shown here:

```js
function cubicTime(n){
  for(let i=0; i < n; i++) {
    console.log(i);
    for(let j = i; j < n; j++) {
      console.log(j);
      for(let k = j; k < n; k++) {
        console.log(k);
      }

    }

  }
}
```

### O(log **n**)

An example of logarithmic time complexity is printing elements that are a power of 2 between 2 and **n**.

```js
function logarithmicTime(n) {
  for(let i = 2; i <= n; i = i * 2) {
    console.log(i);
  }
}
```

The efficiency of logarithmic time complexities is apparent with large inputs such
as a million items. Although n is a million, `logarithmicTime` will print only 19
items because log2(1,000,000) = 19.9315686

## Rules of Big-O Notation

Let’s represent an algorithm’s complexity as `f(n)`. `n` represents the number of inputs,
`f(n)time` represents the time needed, and `f(n)space` represents the space (additional
memory) needed for the algorithm.

The goal of algorithm analysis is to understand the algorithm’s efficiency by calculating `f(n)`. However, it can be challenging to calculate `f(n)`.

Big-O notation provides some fundamental rules that help developers compute for `f(n)`.

### Coefficient rule

If `f(n)` is `O(g(n))`, then `kf(n)` is `O(g(n))`, for any constant `k > 0`.

The first rule is the coefficient rule, which eliminates coefficients not related to the input size, `n`. This is because as `n` approaches infinity, the other coefficient becomes negligible.

It simply requires you to ignore any non-input-size-related constants. Coefficients in Big-O are negligible with large input sizes. Therefore, this is the most important rule of Big-O notations.

This means that both `5f(n)` and `f(n)` have the same Big-O notation of `O(f(n))`.
Here is an example of a code block with a time complexity of `O(n)`:

```js
function a(n){
  let count = 0;
  for (let i = 0; i < n; i ++){
    count+=1;
  }
  return count;
}
```

This block of code has `f(n) = n`. This is because it adds to count `n` times. Therefore,
this function is `O(n)` in time complexity:

```js
function a(n){
  let count = 0;
  for (let i = 0; i < 5*n; i ++){
    count+=1;
  }
  return count;
}
```

This block has `f(n) = 5n`. This is because it runs from `0 to 5n`. However, the first two examples both have a Big-O notation of `O(n)`. Simply put, this is because if `n` is close to infinity or another large number, those four additional operations are meaningless. It is going to perform it `n` times.

The following code block demonstrates another function with a linear time
complexity but with an additional operation on line 6:

```js
function a(n){
  let count = 0;
  for (let i = 0; i < n; i ++){
    count+=1;
  }
  count+=3;
  return count;
}
```

This block of code has `f(n) = n+1`. There is +1 from the last operation
(count+=3). This still has a Big-O notation of `O(n)`. This is because that 1 operation is not dependent on the input `n`. As `n` approaches infinity, it will become negligible.

### Sum rule “Add Big-Os Up”

If `f(n)` is `O(h(n))` and `g(n)` is `O(p(n))`, then `f(n)+g(n)` is
`O(h(n)+p(n))`.

The sum rule simply states that if a resultant time complexity is a sum of two different time complexities, the resultant Big-O notation is also the sum of two different Big-O notations.

The sum rule is intuitive to understand; time complexities can be added. Imagine a
master algorithm that involves two other algorithms. The Big-O notation of that master
algorithm is simply the sum of the other two Big-O notations.

It is important to remember to apply the coefficient rule after applying this rule.

The following code block demonstrates a function with two main loops whose time
complexities must be considered independently and then summed:

```js
function a(n) {
  let count = 0;
  for (let i = 0; i < n; i ++) {
    count+=1;
  }
  for (let i = 0; i < 5 * n; i ++) {
    count+=1;
  }
  return count;
}
```

In this example, line 4 has `f(n) = n`, and line 7 has `f(n) = 5n`. This results in `6n`.
However, when applying the coefficient rule, the final result is `O(n) = n`.


### Product rule “Multiply Big-Os”

If `f(n)` is `O(h(n))` and `g(n)` is `O(p(n))`, then `f(n)g(n)` is `O(h(n)p(n))`.

Similarly, the product rule states that Big-O is multiplied when the time complexities are multiplied.

The product rule simply states how Big-Os can be multiplied.

The following code block demonstrates a function with two nested for loops for
which the product rule is applied:

```js
function (n) {
  let count = 0;
  for(let i = 0; i < n; i++) {
    count+=1;
    for(let i = 0; i < 5 * n; i++) {
      count+=1;
    }
  }
  return count;
}
```

In this example, `f(n) = 5n*n` because line 7 runs `5n` times for a total of n iterations. Therefore, this results in a total of `5n2` operations. Applying the coefficient rule, the result is that `O(n)=n2`.

### Transitive rule

If `f(n)` is `O(g(n))` and `g(n)` is `O(h(n))`, then `f(n)` is `O(h(n))`.

The transitive rule is a simple way to state that the same time complexity has the same Big-O.

### Polynomial rule “Big-O to the Power of k”

If `f(n)` is a polynomial of degree `k`, then `f(n)` is `O(nk)`.

Intuitively, the polynomial rule states that polynomial time complexities have Big-O of the same polynomial degree.

```js
function a(n) {
  let count = 0;
  for(let i = 0; i < n * n; i++) {
    count+=1;
  }
  return count;
}
```

### Log of a power rule

`log(nk)` is `O(log(n))` for any constant `k > 0`.

With the log of a power rule, constants within a log function are also ignored in Big-O notation.

O(n2)

There are two nested loops. Ignore the constants in front of n.

```js
function someFunction(n) {
  for(let i = 0; i < n * 1000; i++) { // 1000n
    for(let j = 0; j < n * 20; j++) { // 20n
      console.log(i + j);
    }
  }
}
```

O(n3)

> There are four nested loops, but the last loop runs only until 10.
> Using the sum rule we can add the `n`s.

```js
function b(n) {
  for (var i = 0; i < n; i++) { // n
    for (var j = 0; j < n; j++) { // n
      for (var k = 0; k < n; k++) { // n
        for (var l = 0; l < 10; l++) {
          console.log(i + j + k + l);
        }
      }
    }
  }
}
```

O(1)

> Constant complexity. The function runs from 0 to 1000. This does not depend on `n`.

```js
function c(n) {
  for (var i = 0; i < 1000; i++) {
    console.log('hi');
  }
}
```

O(n)

> Linear complexity. The function runs from 0 to 10n. Constants are ignored in Big-O.

```js
function d(n) {
  for (var i = 0; i < n * 10; i++) {
    console.log(n);
  }
}
```

O(log2n)

> Logarithmic complexity. For a given `n`, this will operate only `log2n` times because i is incremented by multiplying by 2 rather than adding 1

```js
function e(n) {
  for (var i = 0; i < n; i * 2) {
    console.log(n);
  }
}
```

O(8)

> Infinite loop. This function will not end.

```js
function f(n) {
  while (true) {
    console.log(n);
  }
}
```
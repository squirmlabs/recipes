# Big-O Notation


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
  for(var i=0; i < n; i++) {
    console.log(i);
  }
}
```

### O(**n**<sup>2</sup>)

O(**n**<sup>2</sup>) is quadratic time. An example of this complexity is shown here:

```js
function quadraticTime(n){
  for(var i=0; i < n; i++) {
    console.log(i);
    for(var j=i; j < n; j++) {
      console.log(j);
    }
  }
}
```

### O(**n**<sup>3</sup>)

O(**n**<sup>3</sup>) is cubic time. An example of this complexity is shown here:

```js
function cubicTime(n){
  for(var i=0; i < n; i++) {
    console.log(i);
    for(var j = i; j < n; j++) {
      console.log(j);
      for(var k = j; k < n; k++) {
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
  for(var i = 2; i <= n; i = i * 2) {
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
  var count = 0;
  for (var i = 0; i < n; i ++){
    count+=1;
  }
  return count;
}
```

This block of code has `f(n) = n`. This is because it adds to count `n` times. Therefore,
this function is `O(n)` in time complexity:

```js
function a(n){
  var count = 0;
  for (var i = 0; i < 5*n; i ++){
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
  var count = 0;
  for (var i = 0; i < n; i ++){
    count+=1;
  }
  count+=3;
  return count;
}
```

This block of code has `f(n) = n+1`. There is +1 from the last operation
(count+=3). This still has a Big-O notation of `O(n)`. This is because that 1 operation is not dependent on the input `n`. As `n` approaches infinity, it will become negligible.

### Sum rule

If `f(n)` is `O(h(n))` and `g(n)` is `O(p(n))`, then `f(n)+g(n)` is
`O(h(n)+p(n))`. The sum rule simply states that if a resultant time
complexity is a sum of two different time complexities, the resultant
Big-O notation is also the sum of two different Big-O notations.

### Product rule

If `f(n)` is `O(h(n))` and `g(n)` is `O(p(n))`, then `f(n)g(n)` is `O(h(n)p(n))`. Similarly, the product rule states that Big-O is multiplied
when the time complexities are multiplied.

### Transitive rule

If `f(n)` is `O(g(n))` and `g(n)` is `O(h(n))`, then `f(n)` is `O(h(n))`. The transitive rule is a simple way to state that the same time complexity has the same Big-O.

### Polynomial rule

If `f(n)` is a polynomial of degree `k`, then `f(n)` is `O(nk)`. Intuitively, the polynomial rule states that polynomial time complexities have Big-O of the same polynomial degree.

### Log of a power rule

`log(nk)` is `O(log(n))` for any constant `k > 0`. With
the log of a power rule, constants within a log function are also
ignored in Big-O notation.

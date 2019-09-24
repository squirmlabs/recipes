# Big-O Notation


## Primer

The Big-O notation measures the worst-case complexity of an algorithm. **n** represents the number of inputs. The question to ask is `What will happen if **n** reaches infinity?`

Big-O Notation tells us how efficient the algorithm is.

![alt text](https://i.imgur.com/XLYXjUj.png "Common Big-O complexities")

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
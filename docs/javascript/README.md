# Javascript

JavaScript has a different variable declaration technique than most programming languages. `var` declares the variable within the function scope, `let` declares the variable in the block scope, and variables can be declared without any operator in the global scope; however, global scope should be avoided at all times. For type checking, `typeof` should be used to validate the expected type. Finally, for equality checks, use  `==` to check the value, and use `===` to check for the type as well as the value. However, use these only on non-object types such as `number`, `string`, and `boolean`.

## Scope & Hoisting

The scope is what defines the access to JavaScript variables. In JavaScript, variables
can belong to the global scope or to the local scope. Global variables are variables that
belong in the global scope and are accessible from anywhere in the program.

In JavaScript, var is one keyword used to declare variables. These variable declarations
“float” all the way to the top. This is known as variable hoisting. Variables declared at the bottom of the script will not be the last thing executed in a JavaScript program during runtime.

```js
// Scope & Hoisting

function scope1() {
  var top = 'top';
  bottom = 'bottom';
  console.log(bottom);
  var bottom;
}
scope1(); // prints "bottom" - no error
```

The bottom variable declaration, which was at the last line in the function, is floated
to the top, and logging the variable works.

The key thing to note about the var keyword is that the scope of the variable is the
closest function scope. What does this mean?

## Declaration with `let` "Block Scope"

Another keyword that can be used to declare a variable is let. Any variables declared
this way are in the closest block scope (meaning within the {} they were declared in).

```js
// Scope & Hoisting

function scope3(print) {
  if (print) {
    let insideIf = '12';
  }
  console.log(insideIf);
}
scope3(true); // insideIf is not defined
```

In this example, nothing is logged to the console because the insideIf variable is
available only inside the if statement block.

## Equality & Types

### Variable Types

In JavaScript, there are seven primitive data types: `boolean`, `number`, `string`, `undefined`, `object`, `function`, and `symbol` (symbol won’t be discussed). One thing that stands out here is that `undefined` is a primitive value that is assigned to a variable that has just been declared. `typeof` is the primitive operator used to return the type of a variable.

```js
// Equality & Types - typeof Check

var is20 = false; // boolean
typeof is20; // boolean

var age = 19;
typeof age; // number

var lastName = 'Bae';
typeof lastName; // string

var fruits = ['Apple', 'Banana', 'Kiwi'];
typeof fruits; // object

var me = { firstName: 'Sammie', lastName: 'Bae' };
typeof me; // object

var nullVar = null;
typeof nullVar; // object

var function1 = function() {
  console.log(1);
};
typeof function1; // function

var blank;
typeof blank; // undefined
```

### Truthy/Falsey Check

True/false checking is used in if statements. In many languages, the parameter inside
the if() function must be a boolean type. However, JavaScript (and other dynamically
typed languages) is more flexible with this. Here’s an example:

```js
if (node) {
}
```

Here, node is some variable. If that variable is `empty`, `null`, or `undefined`, it will be evaluated as false.

Expressions that evaluate to false:

- `false`
- `0`
- Empty strings (`''` and `""`)
- `NaN`
- `undefined`
- `null`

Expressions that evaluate to true:

- true
- Any number other than 0
- Non-empty strings
- Non-empty object

```js
// Equality & Types - Truthy/Falsey Check

var printIfTrue = '';

if (printIfTrue) {
  console.log('truthy');
} else {
  console.log('falsey'); // prints 'falsey'
}
```

### === vs ==

JavaScript is a scripting language, and variables are not assigned a type during
declaration. Instead, types are interpreted as the code runs. Hence, `===` is used to check equality more strictly than `==`. `===` checks for both the type and the value, while `==` checks only for the value.

```js

"5" == 5 // returns true;
"5" === 5 // returns false;

```

"5" == 5 returns true because "5" is coerced to a `number` before the comparison.
On the other hand, "5" === 5 returns `false` because the type of "5" is a `string`, while 5 is a `number`.

### Objects

Most strongly typed languages such as Java use `isEquals()` to check whether two objects
are the same. You may be tempted to simply use the `==` operator to check whether two
objects are the same in JavaScript. However, this will not evaluate to `true`.


```js
// Equality & Types - Objects

var o1 = {};
var o2 = {};

o1 == o2; // returns false
o1 === o2; // returns false
```

Although these objects are equivalent (same properties and values), they are not
equal. Namely, the variables have different addresses in memory.

This is why most JavaScript applications use utility libraries such as lodash1 or
underscore,2 which have the isEqual(object1, object2) function to check two objects
or values strictly. This occurs via implementation of some property-based equality
checking where each property of the object is compared.

In this example, each property is compared to achieve an accurate object equality result.

```js
// Equality & Types - Objects

function isEquivalent(a, b) {
  // arrays of property names
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  // If their property lengths are different, they're different objects
  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    // If the values of the property are different, not equal
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  // If everything matched, correct
  return true;
}
isEquivalent({ hi: 12 }, { hi: 12 }); // returns true

```

However, this would still work for objects that have only a string or a number as the
property.

```js
var obj1 = { prop1: 'test', prop2: function() {} };
var obj2 = { prop1: 'test', prop2: function() {} };

isEquivalent(obj1, obj2); // returns false
console.log("isEquivalent(obj1, obj2)", isEquivalent(obj1, obj2)) //  isEquivalent(obj1, obj2) false
```

This is because functions and arrays cannot simply use the `==` operator to check for
equality.

```js
var function1 = function() {
  console.log(2);
};
var function2 = function() {
  console.log(2);
};
console.log(function1 == function2); // false
```

Although the two functions perform the same operation, the functions have
different addresses in memory, and therefore the equality operator returns false.
The primitive equality check operators, `==` and `===,` can be used only for `strings` and `numbers`. To implement an equivalence check for objects, each property in the object
needs to be checked.

## Javascript Numbers

Number operations of a programming language allow you to compute numerical
values. Here are the number operators in JavaScript:

- `+` : addition
- `-` : subtraction
- `/` : division
- `*` : multiplication
- `%` : modulus

These operators are universally used in other programming languages and are not
specific to JavaScript.

JavaScript uses a 32-bit floating-point representation for numbers, as shown here: 

![alt text](https://i.imgur.com/wI0Gl2v.png "The 32-bit floating-point number system")
> The 32-bit floating-point number system

In this example, the value is `0.15625`. The sign bit (the 31st bit) indicates that the number is negative if the sign bit is 1. The next 8 bits (the 30th to 23rd bits) indicate the exponent value, e. Finally, the remaining 23 bits represent the fraction value.

With the 32 bits, the value is computed by this esoteric formula:

![alt text](https://i.imgur.com/6oyLTIc.png "Esoteric formula")
> Esoteric formula

This shows the following break down of the 32 bits:

![alt text](https://i.imgur.com/hQs66WY.png "Breakdown")
> Breakdown

This results in the following:

![alt text](https://i.imgur.com/dkBXjgQ.png "Result")
> Result

With decimal fractions, this floating-point number system causes some rounding errors in JavaScript. For example, 0.1 and 0.2 cannot be represented precisely.

```js
var v = 0.1 + 0.2 === 0.3 // false
```

To really understand why 0.1 cannot be represented properly as a 32-bit floating-point
number, you must understand binary. Representing many decimals in binary requires an infinite number of digits. This because binary numbers are represented by `2n`
where `n` is an `integer`. While trying to calculate 0.1, long division will go on forever. As shown here, `1010` represents 10 in binary. Trying to calculate 0.1 (1/10) results in an indefinite number of decimal points.

![alt text](https://i.imgur.com/SrtUSwr.png "Long division for 0.1")
> Long division for 0.1

There are some built-in properties of the `Number` object in JavaScript that help
work around this.

### Integer Rounding

Since JavaScript uses floating point to represent all numbers, integer division does not work.

Integer division in programming languages like Java simply evaluates division expressions to their quotient.

For example, 5/4 is 1 in Java because the quotient is 1 (although there is a remainder
of 1 left). However, in JavaScript, it is a floating point.

```js
const v = 5/4 // 1.25
```

This is because Java requires you to explicitly type the integer as an integer.

Hence, the result cannot be a floating point. However, if JavaScript developers want to
implement integer division, they can do one of the following:

- `Math.floor` - rounds down to nearest integer
- `Math.round` - rounds to nearest integer
- `Math.ceil` - rounds up to nearest integer

```js
// Integer Rounding

Math.floor(0.9); // 0
Math.floor(1.1); // 1

Math.round(0.49); // 0
Math.round(0.5); // 1
Math.round(2.9); // 3

Math.ceil(0.1); // 1
Math.ceil(0.9); // 1
Math.ceil(21); // 21
Math.ceil(21.01); // 22
```

### Number.EPSILON

`Number.EPSILON` returns the smallest interval between two representable numbers.
This is useful for the problem with floating-point approximation.

```js
function numberEquals(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

numberEquals(0.1 + 0.2, 0.3); // true
```

This function works by checking whether the difference between the two numbers are smaller than `Number.EPSILON`. Remember that `Number.EPSILON` is the smallest difference between two representable numbers. The difference between 0.1+0.2 and 0.3 will be smaller than `Number.EPSILON`.




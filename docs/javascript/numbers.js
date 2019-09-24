// Number.EPSILON

function numberEquals(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

numberEquals(0.1 + 0.2, 0.3); // true

// Infinity

Infinity > Number.MAX_SAFE_INTEGER; // true
-Infinity <
  Number.MAX_SAFE_INTEGER - // true;
    Infinity -
    32323323 ==
  -Infinity - 1; // true

-Infinity <
  Number.MIN_SAFE_INTEGER <
  Number.MIN_VALUE <
  0 <
  Number.MAX_SAFE_INTEGER <
  Number.MAX_VALUE <
  Infinity;

// Number Algorithms

// Primality Test
// TODO: Move to algorithm repository

function isPrime(n) {
  if (n <= 1) {
    return false;
  }

  // check from 2 to n-1
  for (var i = 2; i < n; i++) {
    if (n % i == 0) {
      return false;
    }
  }

  return true;
}

function isPrimeOptimal(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;

  // This is checked so that we can skip
  // middle five numbers in below loop
  if (n % 2 == 0 || n % 3 == 0) return false;

  for (var i = 5; i * i <= n; i = i + 6) {
    if (n % i == 0 || n % (i + 2) == 0) return false;
  }

  return true;
}

const nums = [
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97
];

nums.map((num) => isPrimeOptimal(num))
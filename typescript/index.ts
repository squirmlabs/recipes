// Type Definition
type Style = 'bold' | 'italic' | number;

let font: Style;

font = 23


// Type Definition of objects
interface Person {
  first: string,
  last: string,
  [key: string]: any
}

const person1: Person = {
  first: 'george',
  last: 'louis'
}

const person2: Person = {
  first: 'george',
  last: 'louis',
  fast: true
}


// Functions

function pow(x: number, y: number): string {
  return Math.pow(x, y).toString();
}
pow(5, 10)

// Commonly seen on functions like event listeners or functions that cause side effects. A function that doesn't return a value
function pow2(x: number, y: number): void {
  Math.pow(x, y).toString();
}

pow2(5, 10)

// Arrays

type MyList = [number?, string?, boolean?]

const arr: MyList = []

arr.push(1)
arr.push('23')
arr.push(false)


// Generics 
// Use a type internal to a class or function
// More often then not youll be using generics rather than creating them

class Observable<T> {
  constructor(public value: T) { }
}

let x: Observable<number>
let y: Observable<Person>;
let z = new Observable(23);

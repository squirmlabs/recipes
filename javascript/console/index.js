const foo = { name: 'foo', age: 23, anxious: true };
const bar = { name: 'bar', age: 13, anxious: false };
const baz = { name: 'baz', age: 63, anxious: true };

// Computed Property Names

console.log('%c My Objects', 'color: red; font-weight: bold');
console.log({ foo, bar, baz });

// Console.table(...)

console.table([foo, bar, baz]);

// Console.time(...)

console.time('Looper');
let i = 0;
while (i < 1000000) {
  i++;
}
console.timeEnd('Looper');

// Stack Trace Logs

const deleteMe = () => console.trace('bye bye database');

deleteMe();
deleteMe();



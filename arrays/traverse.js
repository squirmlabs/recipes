import { names } from './data/names';

function traverse(array) {
  let counter;

  for (counter = 0; counter < array.length; counter++) {
    console.log(array[counter]);
  }
}

console.log('traverse(names)', traverse(names));

traverse(names);

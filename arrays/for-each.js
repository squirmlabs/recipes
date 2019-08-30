import { newReleases } from './data/new-releases';
import { names } from './data/names';

// Simple Traverse
function forEachTraverse(names) {
  names.forEach(function(name) {
    console.log(name);
  });
}

forEachTraverse(names);
console.log("forEachTraverse(names)", forEachTraverse(names))

// Simple traverse, push to new array, then return
function projectNewReleases(array) {
  const videoAndTitlePairs = [];
  // ------------ INSERT CODE HERE! -----------------------------------
  // Use forEach function to accumulate {id, title} pairs from each video.
  // Put the results into the videoAndTitlePairs array using the Array's
  // push() method. Example: videoAndTitlePairs.push(newItem);
  // ------------ INSERT CODE HERE! -----------------------------------
  newReleases.forEach(v => {
    videoAndTitlePairs.push({ id: v.id, title: v.title });
  });
  return videoAndTitlePairs;
}

console.log('projectNewReleases(newReleases)', projectNewReleases(newReleases));
projectNewReleases(newReleases);

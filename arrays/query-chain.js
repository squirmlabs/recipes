import { newReleases } from './data/new-releases';

// Chain the filter and map functions to select the id of all videos
// with a rating of 5.0.
function queryChain(array) {
  return array.filter(v => v.rating === 5.0).map(v => v.id);
}

console.log('queryChain(newReleases)', queryChain(newReleases));

queryChain(newReleases);

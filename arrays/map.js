import { newReleases } from './data/new-releases';

// Use map function to accumulate {id, title} pairs from each video.
function mapReleases(array) {
  return array.map(v => ({ id: v.id, title: v.title }));
}

console.log('mapReleases(newReleases)', mapReleases(newReleases));

mapReleases(newReleases);

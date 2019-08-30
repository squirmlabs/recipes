import { newReleases } from './data/new-releases';

function filterVideos(array, rating) {
  const videos = [];
  // ------------ INSERT CODE HERE! -----------------------------------
  // Use forEach function to accumulate every video with a rating of 5.0
  array.filter(v => {
    if (v.rating === rating) {
      videos.push(v);
    }
  });
  // ------------ INSERT CODE HERE! -----------------------------------

  return videos;
}

const rating = 5.0;

console.log(`Videos with rating ${rating}`, filterVideos(newReleases, rating));

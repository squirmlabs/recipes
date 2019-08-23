// Dependencies
import { minify } from 'html-minifier';

/**
 * Compress the HTML Output
 *
 * @param {object} content Handlebars content
 * @returns {string} Compressed HTML
 */
export function compress(content) {
  return minify(content.fn(this), {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true
  });
}

// Configuration
import { $allowedApps } from '../../../config';

// Utils
import { isDefined, isString } from './is';

/**
 * Return the location
 *
 * @param {object} req Request
 * @returns {object} window.location
 */
export function getLocation(req) {
  return typeof window !== 'undefined' ? window.location : { pathname: req && req.url };
}

/**
 * Return all the params from the url (splits slashes)
 *
 * @param {string} url Url Params with slashes (/es/blog/post-title)
 * @param {number} index Get specific param
 * @returns {array} Params as array
 */
export function getParamsFromUrl(url, index = false) {
  if (url === true) {
    url = getLocation().pathname;
  }

  if (isString(url)) {
    const params = url.split('/');

    params.shift();

    if (params[params.length - 1] === '') {
      params.pop();
    }

    if (index) {
      return isDefined(params[index]) ? params[index] : false;
    }

    return params;
  }
}

/**
 * Return the current app
 *
 * @param {string} url URL
 * @returns {string} Current App
 */
export function getCurrentApp(url) {
  const urlParams = getParamsFromUrl(url);
  const currentApp = urlParams[0];

  return $allowedApps().includes(currentApp) ? currentApp : 'uui';
}

/**
 * Return the current app
 *
 * @returns {string} app
 */
export function getCurrentFrontendApp() {
  const { pathname } = getLocation();

  return getCurrentApp(pathname);
}

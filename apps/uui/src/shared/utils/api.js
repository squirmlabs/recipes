// Dependencies
import axios from 'axios';
import queryString from 'query-string';

// Config
import { $api } from '../../../config';

// Utils
import { isDefined } from './is';
import ClientApiError from './ClintApiError';

/**
 * Returns the API Endpoint or a static JSON
 *
 * @param {string} endpoint Endpoint
 * @param {string} qs Query String (GET variables)
 * @returns {string} Endpoint or Static JSON
 */
export function apiEndpoint(endpoint, qs, external) {
  let query = '';

  if (qs) {
    query = `?${qs}`;
  }

  const url = external ? endpoint : `${$api().internalApi}${endpoint}${query}`;

  return url;
}

/**
 * Returns an object with the fetch options (method, headers, body, etc.)
 *
 * @param {object} options Options
 * @returns {object} Options Object
 */
export function apiOptions(options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = false,
    responseType = false,
  } = options;

  headers['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate';

  if (!headers.Accept) {
    headers.Accept = 'application/json';
  }

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const newOptions = {
    method,
    headers,
  };

  if (isDefined(body)) {
    newOptions.body = body;
  }

  if (responseType) {
    newOptions.responseType = responseType;
  }

  return newOptions;
}

export function apiFetch(
  endpoint,
  options = {},
  query = false,
  external = false,
  next = null,
) {
  let qs;

  delete options.fetchingFrom;

  if (query) {
    qs = queryString.stringify(query);
  }

  const fetchOptions = apiOptions(options);
  const fetchEndpoint = apiEndpoint(endpoint, qs, external);

  const axiosData = {
    method: fetchOptions.method,
    url: fetchEndpoint,
    headers: fetchOptions.headers,
    withCredentials: true,
  };

  if (fetchOptions.body) {
    axiosData.data = fetchOptions.body;
  }

  if (fetchOptions.responseType) {
    axiosData.responseType = fetchOptions.responseType;
  }

  return axios(axiosData)
    .then(response => response && response.data)
    .catch(error => {
      // This will trigger the new Global Error Handler
      if (next) {
        next(error);
        return;
      }
      // WARNING: Error handling code after this is DEPRECATED

      const stringError = error.toString();

      // eslint-disable-next-line no-console
      console.log(
        'AXIOS ERROR:',
        axiosData,
        '==============',
        error.toString(),
      );

      if (stringError.includes('403')) {
        return {
          error: {
            code: 403,
            message: stringError,
            url: axiosData.url,
          },
        };
      }

      return {
        error: {
          code: 666,
          message: stringError,
          url: axiosData.url,
        },
      };
    });
}

export const clientErrorHandler = err => {
  throw new ClientApiError(err.response);
};

export const FILTER_DEBOUNCE = 150;
export const CHANGE_YEAR_DEBOUNCE = 20;

export const KEYS_TO_FILTERS = [
  'advertiserName',
  'subAdvertisers.subAdvertiserName',
  'subAdvertisers.revenueItems.holdingcoName',
  'subAdvertisers.revenueItems.subAdvertiserName',
  'subAdvertisers.revenueItems.agencyName',
];

export const FILTER_OPTIONS = {
  shouldSort: true,
  threshold: 0.0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: KEYS_TO_FILTERS,
};

/**
 * Performs a flatten of arrays
 * Can be used on line 103 if we want to user recursion
 *
 * @param {array} array Results
 * @returns {array} Returns a new array
 */
export function flatten(array) {
  return array.reduce(
    (flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    [],
  );
}

/**
 * Performs test if something is an immutable list
 *
 * @param {Array || Immutable List} result  - Immutable List or Array
 * @returns {Array || Immutable List} - Immutable List or Array
 */
export function immutableSupport(result) {
  return result && result.push && result.toArray ? result.toArray() : result;
}

/**
 * Performs test if something is string or number
 *
 * @param {String || Number} result - String or Number
 * @returns {Boolean}
 */
export function isTypeOfStringOrNumber(result) {
  return typeof result === 'string' || typeof result === 'number';
}

/**
 * Find all of the keys and get the values
 * Split key by the literal notation
 * Example: 'subAdvertisers.subAdvertiserName',
 *
 * @param {string} key Key used to match properties in item
 * @param {object} item Object for each revenue item
 * @returns
 */
export function getValuesForKey(key, item) {
  const keys = key.split('.');
  let results = [item];
  // For each key traverse results for matches
  keys.forEach(_key => {
    const tmp = [];

    results.forEach(result => {
      if (result) {
        // If the key is an array
        if (result instanceof Array) {
          const index = parseInt(_key, 10);
          if (!isNaN(index)) {
            return tmp.push(result[index]);
          }

          result.forEach(res => {
            tmp.push(res[_key]);
          });
        } else if (result && typeof result.get === 'function') {
          tmp.push(result.get(_key));
        } else {
          tmp.push(result[_key]);
        }
      }
    });

    results = tmp;
  });

  // Test for Array and Immutable list support
  // Flatten results
  return results
    .map(immutableSupport)
    .reduce(
      (flat, nextFlat) =>
        flat.concat(
          Array.isArray(nextFlat)
            ? nextFlat.reduce(
                (flat, nextFlat) =>
                  flat.concat(
                    Array.isArray(nextFlat) ? nextFlat.reduce() : nextFlat,
                  ),
                [],
              )
            : nextFlat,
        ),
      [],
    )
    .filter(isTypeOfStringOrNumber);
  // Return result if type matches string or number,
  // I don't think we need to support number but why not.
}

export function searchStrings(strings, query, { caseSensitive } = {}) {
  try {
    return strings
      .map(str => str.toString())
      .some(value => {
        try {
          if (!caseSensitive) {
            value = value.toLowerCase();
          }

          if (value && value.search(query) !== -1) {
            return true;
          }

          return false;
        } catch (e) {
          console.trace('searchStrings -> catch', e); // eslint-disable-line
          return false;
        }
      });
  } catch (e) {
    console.trace('searchStrings -> catch', e); // eslint-disable-line
    return false;
  }
}

export function createFilter(query, keys, options = {}) {
  return item => {
    function matchValues(key) {
      const values = getValuesForKey(key, item);
      return searchStrings(values, query, options);
    }

    // Returns true if at least one element in the array matches
    // the return of searchStrings
    function matchWordToKeys() {
      return keys.some(matchValues);
    }
    // Exit if query is empty
    if (query === '') {
      return true;
    }

    // FF: Case sensitivity
    if (!options.caseSensitive) {
      query = query.toLowerCase();
    }

    const userInputWithSpaces = query.split(' ');

    // If no keys are provided,
    // test whether all words from user
    // pass searchStrings
    if (!keys) {
      return userInputWithSpaces.every(query =>
        searchStrings([item], query, options),
      );
    }

    if (typeof keys === 'string') {
      keys = [keys];
    }

    // For every word the user provides,
    // Test if the word matches any of the
    // values of the keys provided
    return userInputWithSpaces.every(matchWordToKeys);
  };
}

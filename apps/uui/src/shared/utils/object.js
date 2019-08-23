// Utils
import { isArray, isDefined, isObject } from './is';

/**
 * Returns the object keys in an array
 *
 * @param {object} items Object
 * @returns {array} Keys in array
 */
export function keys(items) {
  return isObject(items) ? Object.keys(items) : false;
}

/**
 * Performs a forEach for Arrays or Objects
 *
 * @param {*} items Object || Array
 * @param {function} callback Callback
 * @returns {boolean} True if exists
 */
export function forEach(items, callback) {
  if (isDefined(items) && isDefined(items[0]) && isDefined(items[0].Field) || isArray(items)) {
    return items.forEach(callback);
  } else if (!isDefined(items)) {
    return false;
  }

  return isObject(items) ? keys(items).forEach(callback) : false;
}

/**
 * Returns true if a key exists in a given array or object
 *
 * @param {string} key Key
 * @param {object} items Object
 * @returns {boolean} True if exists
 */
export function exists(key, items) {
  if (!isArray(items) && !isObject(items)) {
    return false;
  }

  if (isArray(items)) {
    return items.includes(key);
  }

  return keys(items).includes(key);
}

/**
 * Stringify && Parse an Object
 *
 * @param {object} obj Object
 * @returns {object} Parsed JSON
 */
export function parseObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

import { isString } from './is';

export const formatValueToCompare = (value = '') => {
  // Convert $ and % to numbers
  if (value !== null && value !== '' && !value.match(/[a-z]/i)) {
    value = Number(value.replace(/[^a-zA-Z0-9.-]+/g, ''));
  }

  // Convert all strings to lower case
  if (isString(value)) {
    value = value.toLowerCase();
  }

  return value;
};

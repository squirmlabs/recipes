// Utils
import { isDefined } from './is';
import { forEach } from './object';
import { removeHTML } from './string';

export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Return just the attributes with values
 *
 * @param {object} props Props
 * @returns {object} newProps
 */
export function attrs(props) {
  const newProps = {};

  forEach(props, prop => {
    if (prop) {
      newProps[prop] = props[prop];
    }
  });

  return newProps;
}

export function cx(...classes) {
  return classes.join(' ');
}

/**
 * Gets a new state
 *
 * @param {object} state State
 * @param {object} newState New State
 * @returns {object} New State
 */
export function getNewState(state, newState) {
  return Object.assign({}, state, newState);
}

export function sanitizeMetas(metas) {
  if (metas) {
    return metas.map(meta => {
      if (meta.name && meta.content) {
        return {
          name: meta.name,
          content: removeHTML(meta.content)
        };
      }

      return meta;
    });
  }

  return [];
}

/**
 * Returns true if is the first render
 *
 * @param {array} items Items
 * @returns {boolean} True if is first render
 */
export function isFirstRender(items) {
  return !isDefined(items) || items.length === 0 || Object.keys(items).length === 0;
}

export function isNotEmpty(props, obj) {
  let isEmpty = false;

  props.forEach(prop => {
    if (!obj.hasOwnProperty(prop)) {
      isEmpty = true;
    }
  });

  return !isEmpty;
}

export function mapArrayToParams(params, values, exclude = []) {
  const props = {};

  if (params.length === values.length) {
    params.forEach((param, i) => {
      if (!exclude.includes(param)) {
        props[param] = values[i];
      }
    });
  }

  return props;
}

/**
 * Redirects to a specific url
 *
 * @param {string} url URL
 * @returns {void}
 */
export function redirectTo(url = '/') {
  if (isBrowser()) {
    window.location.href = url;
  }

  return false;
}

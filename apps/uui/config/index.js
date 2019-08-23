// Configuration
import common from './common.json';
import auth from './auth.json';
import local from './local.json';
import development from './development.json';
import qa from './qa.json';
import qe from './qe.json';
import stage from './stage.json';
import production from './production.json';
import test from './test.json';

// Config container
let config;

const envConfigurations = {
  local: {
    ...local,
    ...common,
    ...auth,
    cache: {
      ...common.cache,
      ...local.cache,
    },
  },
  development: {
    ...development,
    ...common,
    ...auth,
    cache: {
      ...common.cache,
      ...development.cache,
    },
  },
  qa: {
    ...qa,
    ...common,
    ...auth,
    cache: {
      ...common.cache,
      ...qa.cache,
    },
  },
  stage: {
    ...stage,
    ...common,
    ...auth,
    cache: {
      ...common.cache,
      ...stage.cache,
    },
  },
  qe: {
    ...qe,
    ...common,
    ...auth,
    cache: {
      ...common.cache,
      ...qe.cache,
    },
  },
  production: {
    ...production,
    ...common,
    ...auth,
    cache: {
      ...common.cache,
      ...production.cache,
    },
  },
  test: {
    ...test,
    ...common,
    ...auth,
    cache: {
      ...common.cache,
      ...test.cache,
    },
  },
};

const currentEnv = process.env.UPFRONTS_ENV || 'local';

export function $getEnvironment() {
  return currentEnv;
}

export function $isTest() {
  return $getEnvironment() === 'test';
}

export function $isDevelopment() {
  return $getEnvironment() === 'development';
}

export function $isLocal() {
  return $getEnvironment() === 'local';
}

export function $isQA() {
  return $getEnvironment() === 'qa';
}

export function $isQE() {
  return $getEnvironment() === 'qe';
}

export function $isStage() {
  return $getEnvironment() === 'stage';
}

export function $isProduction() {
  return $getEnvironment() === 'production';
}

/**
 * Returns the selected environment configuration
 *
 * @returns {object} Config
 */
export function $config() {
  if (!config) {
    config = envConfigurations[currentEnv];
  }

  return config;
}

/**
 * Returns allowedApps node
 *
 * @returns {array} allowedApps
 */
export function $allowedApps() {
  return $config().allowedApps;
}

/**
 * Returns whitelist node
 *
 * @returns {array} whitelist
 */
export function $whitelist() {
  return $config().whitelist;
}

/**
 * Returns api node
 *
 * @returns {string} api
 */
export function $api() {
  return $config().api;
}

/**
 * Returns appName node
 *
 * @returns {string} appName
 */
export function $appName() {
  return $config().appName;
}

/**
 * Returns baseUrl node
 *
 * @returns {string} baseUrl
 */
export function $baseUrl() {
  return $config().baseUrl;
}

/**
 * Returns cache node
 *
 * @returns {object} cache
 */
export function $cache() {
  return $config().cache;
}

/**
 * Returns dashboard node
 *
 * @returns {string} dashboard
 */
export function $dashboard() {
  return $config().dashboard;
}

/**
 * Returns MyID node
 *
 * @returns {string} MyID
 */
export function $auth() {
  const { clientId, clientSecret, callbackUrl } = $config().auth[
    $getEnvironment()
  ];

  return {
    clientId,
    clientSecret,
    callbackUrl,
    ...$config().auth,
  };
}

/**
 * Returns security node
 *
 * @returns {object} security
 */
export function $security() {
  return $config().security;
}

/**
 * Returns serverPort node
 *
 * @returns {number} serverPort
 */
export function $serverPort() {
  return $config().serverPort;
}

/**
 * Returns session node
 *
 * @returns {object} session
 */
export function $session() {
  return $config().session;
}

/**
 * Returns views node
 *
 * @returns {object} views
 */
export function $views() {
  return $config().views;
}

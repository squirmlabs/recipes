// Dependencies
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { analyticsMiddleware } from 'react-redux-analytics';
import { siteCatalystMiddleware } from 'react-redux-analytics-sitecatalyst';
import { $isProduction } from '@Configuration';

// Root Reducer
import rootReducer from '../reducers';

// eslint-disable-next-line import/no-dynamic-require
require(`../analytics/${$isProduction() ? 's_code' : 's_code_dev'}.js`);

const sConfig = {
  s_account: $isProduction() ? 'wdgdatgmediait' : 'wdgdatgmediaitdev',
  s_code: {
    visitorNamespace: 'datgmediaitanalytics',
    trackingServer: 'w88.go.com',
  },
};

export default function configureStore({ initialState, appName, reducer }) {
  const middleware = [
    thunk,
    analyticsMiddleware({
      reducerName: 'analytics',
      location: typeof window !== 'undefined' ? window.location : '',
    }),
    siteCatalystMiddleware({
      s_gi: sAccount =>
        typeof window !== 'undefined' ? window.s_gi(sAccount) : '',
      config: sConfig,
    }),
  ];

  return createStore(
    rootReducer(appName, reducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
}

// Dependencies
import React from 'react';
import { compose } from 'recompose';
import { sendAnalytics } from 'react-redux-analytics';

let loaded = false;

export default function Analytics(
  Wrapper,
  pageName = 'Dashboard',
  location = '/',
) {
  const Component = props => <Wrapper {...props} />;

  return compose(
    sendAnalytics({
      pageName,
      prop1: 'Upfront_Ad_Sales',
      prop10: location,
      sendPageViewOnDidMount: () => {
        // This ensures the HoC sends analytics only once on app load.
        // The rest of the analytics when page changes occur are
        // tracked implicitly by the react-redux-analytics-sitecatalyst lib
        loaded += 1;

        return loaded === 1;
      },
    }),
  )(Component);
}

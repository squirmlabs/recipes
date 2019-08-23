// Dependencies
import React from 'react';
import { array, string } from 'prop-types';
import ReactHelmet from 'react-helmet';

// Utils
import { sanitizeMetas } from '@Utils/frontend';

const Helmet = props => (
  <ReactHelmet
    title={`Upfront ${props.title}`}
    meta={sanitizeMetas(props.meta)}
  />
);

Helmet.propTypes = {
  meta: array,
  title: string,
};

export default Helmet;

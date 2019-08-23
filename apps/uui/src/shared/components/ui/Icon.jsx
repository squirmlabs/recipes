// Dependencies
import React from 'react';
import { string } from 'prop-types';

const Icon = props => {
  const { type, className = '', ...iconProps } = props;

  return <i className={`fa fa-${type} ${className}`} {...iconProps} />;
};

Icon.propTypes = {
  className: string,
  type: string.isRequired,
};

export default Icon;

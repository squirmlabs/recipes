// Dependencies
import React from 'react';
import { bool, string } from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

const Link = props => {
  const { to, refresh = false, external = false } = props;
  const linkProps = { ...props };
  let newTo = to;
  let newRefresh = refresh;

  if (to.charAt(0) === '/') {
    newTo = to.substring(1);
  }

  if (to.indexOf('http') !== -1 || external) {
    newRefresh = true;
  }

  let newURL = `/${newTo}`;

  delete linkProps.to;
  delete linkProps.dispatch;
  delete linkProps.currentLanguage;
  delete linkProps.refresh;
  delete linkProps.external;

  if (to === '/' || to.indexOf('http') !== -1 || external) {
    newURL = to;
  }

  if (newRefresh) {
    return <a href={newURL} {...linkProps} />;
  }

  return (
    <ReactRouterLink {...linkProps} to={newURL} />
  );
};

Link.propTypes = {
  to: string.isRequired,
  refresh: bool,
  external: bool
};

export default Link;

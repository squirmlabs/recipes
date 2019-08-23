// Dependencies
import React from 'react';
import { connect } from 'react-redux';

export default function baseComponent(Wrapper) {
  const BaseComponent = props => <Wrapper {...props} />;

  return connect(({ device }) => ({
    isMobile: device.isMobile
  }))(BaseComponent);
}

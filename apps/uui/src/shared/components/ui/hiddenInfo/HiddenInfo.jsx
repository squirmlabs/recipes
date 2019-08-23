import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// Styles
import styles from './HiddenInfo.scss';

const HiddenInfo = props => (
  <div
    className={classnames(
      props.shouldShow ? styles.hiddenShow : styles.hiddenHide,
      { [styles.isAbsolute]: props.isAbsolute,
        [styles.isDisplayNone]: props.isDisplayNone },
    )}
  >
    {props.shouldRender && props.children}
  </div>
);

HiddenInfo.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  shouldRender: PropTypes.bool,
  isAbsolute: PropTypes.bool,
  isDisplayNone: PropTypes.bool,
  children: PropTypes.node,
};

HiddenInfo.defaultProps = {
  shouldRender: true,
};

export default HiddenInfo;

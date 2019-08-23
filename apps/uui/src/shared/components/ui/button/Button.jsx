import React from 'react';
import PropTypes from 'prop-types';

// Components
import Icon from '../Icon';

// Styles
import styles from './Button.scss';

const Button = ({ className, children, icon, width, ...buttonProps }) => (
  <button className={`${className} ${styles.Button}`} {...buttonProps}>
    {icon && <Icon type={icon} />}
    <div className={styles.body}>{children}</div>
  </button>
);

Button.defaultProps = {
  className: '',
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  width: PropTypes.number,
};

export default Button;

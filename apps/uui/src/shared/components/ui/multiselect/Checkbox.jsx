import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Styles
import styles from './Checkbox.scss';

const Checkbox = ({ checked, isMixed, onChange }) => (
  <Fragment>
    <input
      className={classNames(styles.optionCheckbox, {
        [styles.mixed]: isMixed,
      })}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
    <div />
  </Fragment>
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  isMixed: PropTypes.bool,
};

export default Checkbox;

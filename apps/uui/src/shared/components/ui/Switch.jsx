import React from 'react';
import { bool, func, string } from 'prop-types';
import styles from './Switch.scss';

const Switch = ({ name, checked, onChange }) => (
  <div className={styles.switch}>
    <input
      type="checkbox"
      name={name}
      id={name}
      className={styles.iosToggle}
      checked={checked}
      onChange={onChange}
    />
    <label
      htmlFor={name}
      className={styles.checkboxLabel}
      data-off="off"
      data-on="on"
    />
  </div>
);

Switch.propTypes = {
  name: string,
  checked: bool,
  onChange: func,
};

export default Switch;

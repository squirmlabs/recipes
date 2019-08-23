import React from 'react';
import PropTypes from 'prop-types';

// Components
import Checkbox from './Checkbox';

// Styles
import styles from './Option.scss';

const Option = ({ id, name, checked, ...props }) => {
  const onChange = () => props.onChange(id);

  return (
    <div className={styles.option} onClick={onChange}>
      <Checkbox checked={checked} onChange={onChange} isMixed={props.isMixed} />
      <label>{name}</label>
    </div>
  );
};

Option.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  isMixed: PropTypes.bool,
};

export default Option;

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './YearPicker.scss';

const YearPicker = props => (
  <select
    value={props.selectedYear}
    className={styles.yearPicker}
    onChange={props.onChangeYear}
    data-qeid={props['data-qeid']}
  >
    <option value="" disabled>
      Select a year
    </option>
    {props.years.map(year => (
      <option key={year.value} value={year.value}>
        {year.label}
      </option>
    ))}
  </select>
);

YearPicker.propTypes = {
  selectedYear: PropTypes.string,
  years: PropTypes.array,
  onChangeYear: PropTypes.func.isRequired,
  'data-qeid': PropTypes.string,
};

export default YearPicker;

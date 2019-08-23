// Dependencies
import React from 'react';
import { bool } from 'prop-types';

// Styles
import styles from './Spinner.scss';

const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.spinCover} data-qeid="spinner">
      <div className={styles.spinner} />
    </div>
  );
};

Spinner.propTypes = {
  isLoading: bool,
};

export default Spinner;

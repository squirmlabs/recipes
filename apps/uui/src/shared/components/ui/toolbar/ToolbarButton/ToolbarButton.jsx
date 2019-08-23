import React from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '@Ui/button';

// Styles
import styles from './ToolbarButton.scss';

const ToolbarButton = ({ handleEvent, isDisabled, label }) => (
  <div
    data-qeid={`action-button-${label.toLowerCase()}`}
    className={styles.button}
  >
    <Button
      data-qeid={`${label.toLowerCase()}-button`}
      onClick={handleEvent}
      disabled={isDisabled}
    >
      {label}
    </Button>
  </div>
);

ToolbarButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleEvent: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default ToolbarButton;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const WithLabelAndError = props => (
  <div
    className={classNames(props.styles.inputContainer, {
      [props.styles.inputContainerError]: props.errorText,
    })}
    data-qeid={props['data-qeid']}
  >
    <label className={props.styles.requiredLabel}>{props.label}</label>
    {props.children}
    {props.errorText && (
      <p className={props.styles.errorText}>{props.errorText}</p>
    )}
  </div>
);

WithLabelAndError.propTypes = {
  'data-qeid': PropTypes.string,
  styles: PropTypes.object.isRequired,
  errorText: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  label: PropTypes.string,
};

export default WithLabelAndError;

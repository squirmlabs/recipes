import React from 'react';
import PropTypes from 'prop-types';

// Components
import Input from '@Form/type/Input';
import WithLabelAndError from './WithLabelAndError';

const InputWithError = props => (
  <WithLabelAndError
    styles={props.styles}
    errorText={props.errorText}
    data-qeid={props['data-qeid']}
    label={props.label}
  >
    <Input
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required={props.required}
    />
  </WithLabelAndError>
);

InputWithError.propTypes = {
  'data-qeid': PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default InputWithError;

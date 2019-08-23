import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// Utils
import * as UpfrontsPropTypes from '@Utils/propTypes';

const SelectPicker = props => (
  <select value={props.selectedOptionId || ''} onChange={props.onChange}>
    <option value="" disabled>
      {props.placeholder}
    </option>
    {props.options.map(option => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
);

const mapStateToProps = state => ({
  options: state.options,
  isPickerLoading: state.options.isOptionsLoading,
});

SelectPicker.propTypes = {
  // eslint-disable-next-line react/no-typos
  options: UpfrontsPropTypes.Options,
  placeholder: PropTypes.string,
  selectedOptionId: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  null,
)(SelectPicker);

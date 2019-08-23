import { Component } from 'react';
import defer from 'lodash/defer';
import PropTypes from 'prop-types';

class FormValidator extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
    config: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = { errorTexts: {} };

  validate() {
    const { values, config } = this.props;
    const errorTexts = {};
    let isValid = true;

    config.forEach(field => {
      const isInvalidString =
        !field.type && field.required && !values[field.name].trim();
      const isInvalidNumber =
        field.type === 'numeric' && field.required && !values[field.name];

      if (isInvalidString || isInvalidNumber) {
        errorTexts[field.name] = field.errorText;
        isValid = false;
      }
    });

    this.setState({ errorTexts });
    return isValid;
  }

  validateField(fieldName) {
    const { values, config } = this.props;
    const fieldMetadata = config.find(field => field.name === fieldName);

    if (fieldMetadata.required && values[fieldName]) {
      this.setState({
        errorTexts: {
          ...this.state.errorTexts,
          [fieldName]: '',
        },
      });
    }
  }

  submitWrapper = submitFn => e => {
    e.preventDefault();
    if (this.validate()) {
      submitFn(e);
    }
  };

  inputWrapper = (fieldName, changeFn) => e => {
    changeFn(e, fieldName);
    defer(() => this.validateField(fieldName));
  };

  render() {
    const { errorTexts } = this.state;

    return this.props.children({
      submitWrapper: this.submitWrapper,
      inputWrapper: this.inputWrapper,
      errorTexts,
    });
  }
}

export default FormValidator;

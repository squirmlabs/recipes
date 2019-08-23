// Dependencies
import React, { Component } from 'react';
import { bool, string, shape, any, arrayOf, func } from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';

// Utils
import { cx } from '@Utils/frontend';

// Styles
import styles from './MultiSelect.scss';

class DropDown extends Component {
  static propTypes = {
    options: arrayOf(shape({
      value: any.isRequired,
      label: string.isRequired,
    })).isRequired,
    values: arrayOf(any).isRequired,
    onChange: func,
    single: bool
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  }

  handleSelectOptionChange = index => () => {
    const { options, onChange, values, single = false } = this.props;
    let opts = [];

    if (onChange) {
      opts = options.map((option, i) => {
        const opt = {
          ...option,
          selected: values.includes(option.value),
          clicked: false,
        };

        if (index === i) {
          opt.selected = !opt.selected;
          opt.clicked = true;
        }

        return opt;
      });

      if (single) {
        opts = opts.filter((option, i) => option.selected && i === index);

        this.handleClickOutside();
      }

      onChange(opts);
    }
  }

  handleSelectAll = () => {
    const { options, onChange, values } = this.props;

    if (onChange && values.length > 0) {
      onChange(options.map(option => ({ ...option, selected: false })));
    }
  }

  handleClickOutside = () => {
    const { open } = this.state;

    if (open) {
      this.setState({ open: false });
    }
  }

  render() {
    const { open } = this.state;
    const { options, values, single = false } = this.props;

    const label = options
      .filter(option => values.includes(option.value))
      .map(option => option.label.replace(/&nbsp;/g, '').replace(/(<([^>]+)>)/ig, ''))
      .join(', ');

    return (
      <div className={styles.dropdown}>
        <button
          className={styles.dropbtn}
          onClick={this.toggle}
        >
          <span>{ label || 'All' }</span>
        </button>
        <div className={cx(styles.options, open ? styles.show : '')}>
          {!single &&
            <a
              onClick={this.handleSelectAll}
              className={values.length === 0 ? styles.selected : ''}
            >
              All
            </a>
          }
          {
            options.map((option, index) => (
              <a
                key={index}
                onClick={this.handleSelectOptionChange(index)}
                className={values.includes(option.value) ? styles.selected : ''}
                dangerouslySetInnerHTML={{ __html: option.label }}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default enhanceWithClickOutside(DropDown);

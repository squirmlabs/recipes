import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
// Styles
import styles from './SearchFilter.scss';

class SearchFilter extends Component {
  state = {
    query: '',
  };

  onChangeSearchFilter = event => {
    event.persist();
    this.setState({ query: event.target.value }, () => {
      this.debounceUserInput(event);
    });
  };

  onClearSearchFilter = () => {
    this.setState({ query: '' }, () => {
      this.debounceUserInput({ target: { value: '' } });
    });
  };

  debounceUserInput = debounce(this.props.onChange, 250);

  render() {
    const { className, placeholder, 'data-qeid': dataQeid } = this.props;

    return (
      <div className={classnames(styles.SearchFilter, className)}>
        <i className={`${styles.actionSearch} fa fa-search`} />
        <input
          placeholder={placeholder || 'Search'}
          value={this.state.query}
          onChange={this.onChangeSearchFilter}
          data-qeid={dataQeid}
        />
        {this.state.query && (
          <i
            className={`${styles.actionSearchClear} fa fa-times-circle`}
            onClick={this.onClearSearchFilter}
          />
        )}
      </div>
    );
  }
}

SearchFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  'data-qeid': PropTypes.string,
};

export default SearchFilter;

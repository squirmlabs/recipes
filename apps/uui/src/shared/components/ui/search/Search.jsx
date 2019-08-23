import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Search.scss';

const Search = props => (
  <div
    className={props.className || styles.Search}
    data-qeid={props['data-qeid']}
  >
    <i className="fa fa-search" />
    <input
      placeholder={props.placeholder}
      value={props.searchQuery}
      onChange={props.onSearch}
    />
    {props.searchQuery && (
      <i
        className={`${styles.actionSearchClear} fa fa-times-circle`}
        onClick={props.onClear}
      />
    )}
  </div>
);

Search.propTypes = {
  className: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  placeholder: PropTypes.string,
  'data-qeid': PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'Search',
};

export default Search;

import React from 'react';
import PropTypes from 'prop-types';

// Components
import ListItem from './ListItem';

const List = props => (
  <React.Fragment>
    {props.items.map(item => (
      <ListItem
        key={item.value}
        selected={props.selected === item.value}
        value={item.value}
        onChange={props.onChange}
        disabled={item.disabled}
      >
        {item.label}
      </ListItem>
    ))}
  </React.Fragment>
);

List.propTypes = {
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    }),
  ),
};

export default List;

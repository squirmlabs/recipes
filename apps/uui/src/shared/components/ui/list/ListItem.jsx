import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Components
import Icon from '../Icon';

// Styles
import styles from './List.scss';

const ListItem = props => (
  <div
    data-qeid="list-item"
    onClick={() => props.onChange(props.value)}
    className={classNames({
      'selected-row': props.selected,
      [styles.ListItemSelected]: props.selected,
      [styles.ListItem]: !props.selected,
      [styles.ListItemDisabled]: props.disabled,
    })}
  >
    {props.children} {<Icon type="angle-right" />}
  </div>
);

ListItem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selected: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ListItem;

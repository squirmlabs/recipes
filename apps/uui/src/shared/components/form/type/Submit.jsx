// Dependencies
import React from 'react';
import { func, string } from 'prop-types';

// Utils
import { attrs } from '@Utils/frontend';

// Components
import Input from './Input';

const Submit = props => {
  const {
    className,
    id,
    name,
    onClick,
    placeholder,
    type = 'button',
    value = '',
    contentKey,
  } = props;

  return (
    <div className="Submit">
      <Input
        {...attrs({
          className,
          id,
          name,
          onClick,
          placeholder,
          type,
          value,
          contentKey,
        })}
      />
    </div>
  );
};

Submit.propTypes = {
  className: string,
  contentKey: string,
  id: string,
  name: string,
  onClick: func,
  placeholder: string,
  type: string,
  value: string,
};

export default Submit;

// Dependencies
import React from 'react';
import { bool, string } from 'prop-types';

// Utils
import { attrs } from '@Utils/frontend';

const Textarea = props => {
  const {
    autoFocus = false,
    className,
    id = false,
    name,
    value = '',
    contentKey,
  } = props;

  return (
    <div className="Textarea">
      <textarea {...attrs({ autoFocus, id, name, className, contentKey })}>
        {value}
      </textarea>
    </div>
  );
};

Textarea.propTypes = {
  autoFocus: bool,
  className: string,
  contentKey: string,
  id: string,
  name: string,
  value: string,
};

export default Textarea;

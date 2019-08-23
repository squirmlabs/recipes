//todo-component.js
import React from 'react';

function TodoComponent(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <p>{props.price}</p>
    </div>
  );
}

export default TodoComponent;

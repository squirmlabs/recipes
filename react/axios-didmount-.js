import React from 'react';
import TodoComponent from './todo-component';

import axios from 'axios';

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    axios.get('https://api.vschool.io/ericnatejones/todo/').then(response => {
      this.setState(() => {
        return {
          todos: response.data
        };
      });
    });
  }

  render() {
    let mappedTodos = this.state.todos.map(todo => {
      return (
        <TodoComponent
          title={todo.title}
          description={todo.description}
          price={todo.price}
        />
      );
    });

    return mappedTodos;
  }
}

export default TodoList;

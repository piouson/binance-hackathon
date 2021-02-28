import React, { useReducer, useState } from 'react';
import { filterTodoReducer, todoReducer } from './todoReducer';
import { todoActions } from './todoActions';

export const getId = (mask = 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx') =>
  mask.replace(/[x]/gi, () => Math.random().toString(16)[5]);

export const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: true,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    complete: false,
  },
];

export const TodoButtons = ({ onShowAll, onShowComplete, onShowIncomplete }) => (
  <div>
    <button type="button" onClick={onShowAll}>
      All
    </button>
    <button type="button" onClick={onShowComplete}>
      Complete
    </button>
    <button type="button" onClick={onShowIncomplete}>
      Incomplete
    </button>
  </div>
);

export const TodoList = ({ todos = [], onCheckboxChange }) => (
  <dl>
    {todos.map(({ id, task, complete }) => (
      <dd key={id} style={{ marginLeft: 20 }}>
        <label>
          <input
            type="checkbox"
            checked={complete}
            onChange={() => onCheckboxChange({ id, complete })}
            value={id}
          />
          {task}
        </label>
      </dd>
    ))}
  </dl>
);

export const TodoForm = ({ task, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={task} onChange={onChange} />
    <button type="submit" disabled={!task}>
      Add Todo
    </button>
  </form>
);

const Todo = () => {
  const [filteredTodo, dispatchFilter] = useReducer(filterTodoReducer, todoActions.ALL);
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [task, setTask] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setTask(value);
  };

  const handleCheckboxChange = ({ id, complete }) => {
    dispatchTodos({
      type: complete ? todoActions.UNDO_TODO : todoActions.DO_TODO,
      id,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task) {
      dispatchTodos({
        type: todoActions.ADD_TODO,
        task,
      });
    }
    setTask('');
  }

  const handleShowAll = () => dispatchFilter({ type: todoActions.SHOW_ALL });
  const handleShowComplete = () => dispatchFilter({ type: todoActions.SHOW_COMPLETE });
  const handleShowIncomplete = () => dispatchFilter({ type: todoActions.SHOW_INCOMPLETE });

  const filteredTodos = todos.filter((todo) => {
    if (filteredTodo === todoActions.ALL) return true;
    if (filteredTodo === todoActions.COMPLETE && todo.complete) return true;
    if (filteredTodo === todoActions.INCOMPLETE && !todo.complete) return true;
    return false;
  });

  return (
    <div style={{ margin: 20 }}>
      <h1>Todo List</h1>
      <TodoButtons
        onShowAll={handleShowAll}
        onShowComplete={handleShowComplete}
        onShowIncomplete={handleShowIncomplete}
      />
      <TodoList todos={filteredTodos} onCheckboxChange={handleCheckboxChange} />
      <TodoForm task={task} onChange={handleInputChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default Todo;

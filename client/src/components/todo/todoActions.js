export const getId = (mask = 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx') =>
  mask.replace(/[x]/gi, () => Math.random().toString(16)[5]);

export const todoActions = {
  SHOW_ALL: 'SHOW_ALL',
  ALL: 'ALL',
  SHOW_COMPLETE: 'SHOW_COMPLETE',
  COMPLETE: 'COMPLETE',
  SHOW_INCOMPLETE: 'SHOW_INCOMPLETE',
  INCOMPLETE: 'INCOMPLETE',
  DO_TODO: 'DO_TODO',
  UNDO_TODO: 'UNDO_TODO',
  ADD_TODO: 'ADD_TODO',
  CLEAR_INPUT: 'CLEAR_INPUT',
};

export const updateTodo = (state, id, complete) => {
  return state.map((todo) =>
    todo.id === id ? { ...todo, complete } : todo,
  );
};

export const doTodo = (state, action) => updateTodo(state, action.id, true);

export const undoTodo = (state, action) => updateTodo(state, action.id, false);

export const addTodo = (state, action) => ([
  ...state,
  {
    id: getId(),
    task: action.task,
    complete: false,
  },
]);

export const todoReset = () => '';
import { todoActions, doTodo, addTodo, undoTodo } from './todoActions';

export const filterTodoReducer = (state, action) => {
  switch (action.type) {
    case todoActions.SHOW_ALL:
      return todoActions.ALL;
    case todoActions.SHOW_COMPLETE:
      return todoActions.COMPLETE;
    case todoActions.SHOW_INCOMPLETE:
      return todoActions.INCOMPLETE;
    default:
      return state;
  }
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case todoActions.DO_TODO:
      return doTodo(state, action);
    case todoActions.UNDO_TODO:
      return undoTodo(state, action);
    case todoActions.ADD_TODO:
      return addTodo(state, action);
    default:
      return state;
  }
};

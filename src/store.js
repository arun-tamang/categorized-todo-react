import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import moment from 'moment';

import rootReducer from './reducers/index';

// import default data
let CURRENT_USER = {};
if (localStorage.currentUser) {
  CURRENT_USER = JSON.parse(localStorage.currentUser);
}

export const defaultState = {
  // default data here
  todoList: {
    showPopUp: false,
    title: 'Your Todos:',
    todoCategories: [],
    todoProps: [],
    popUpEditTitle: '',
    todoToEdit: -1,
    searchValue: {
      tags: [],
      keywords: ''
    },
    addFormHeight: 60,
    activeAddTodoFormIndex: -1,
    todoToAdd: {
      title: '',
      tagIds: [],
      tagNames: [],
      expiresAt: moment(),
      categoryId: -1,
      completed: false
    },
    categoryToAdd: '',
    addCategoryFormHeight: 0,
    availableTags: [],
    metadata: {}
  },
  user: {
    authenticated: CURRENT_USER.authenticated || false,
    userDetails: CURRENT_USER.userDetails || ''
  },
  logInDetails: {
    email: '',
    password: ''
  }
};

// const store = createStore(
//   rootReducer,
//   defaultState,
//   applyMiddleware(thunkMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import todoList from './todoList';
import user from './user';
import logInDetails from './loginDetails';
// import registerDetails from './registerDetails';

const rootReducer = combineReducers({ todoList, user, logInDetails, form: formReducer });

export default rootReducer;

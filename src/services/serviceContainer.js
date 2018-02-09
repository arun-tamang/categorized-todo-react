import { addTodo } from './todoListService/adderService';
import { editTodo } from './todoListService/editService';
import { deleteTodo } from './todoListService/deleteService';
import { searchTodo } from './todoListService/searchService';
import { setTodoCompleted } from './todoListService/setTodoCompleted';
import { addCategory } from './todoListService/addCategory';
import { getCategoryIndex } from './todoListService/getCategoryIndex';
import * as todoService from './todoListService/todoService';

import { login } from './userService/loginService';
import { register } from './userService/registerService';
// import {} from './userService/logoutService'

import { downloadTodos } from './resourceService/downloadTodos';
import { fetchTodos } from './resourceService/fetchTodos';
import { downloadTodoCategories } from './resourceService/downloadTodoCategories';
import { refreshAcsToken } from './resourceService/refreshAcsToken';
import { fetchTags } from './resourceService/fetchTags';

import { setTokenInHeader } from './axiosService';

const SERVICES = {
  addTodo,
  deleteTodo,
  editTodo,
  searchTodo,
  setTodoCompleted,
  todoService,

  addCategory,
  getCategoryIndex,

  login,
  register,

  downloadTodos,
  downloadTodoCategories,
  fetchTodos,
  refreshAcsToken,
  fetchTags,

  setTokenInHeader
};

export default SERVICES;

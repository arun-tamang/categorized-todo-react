import moment from 'moment';

export const ADD_FORM_MAX_HEIGHT = 60;
export const ADD_FORM_MIN_HEIGHT = 0;

const setTodoProps = (state, action) => {
  return {
    ...state,
    todoProps: action.payload.todoProps
  };
};

const setTodoMetaData = (state, action) => {
  return {
    ...state,
    metadata: action.payload.metadata
  };
};

const addTodo = (todoCategories, action) => {
  let todosCopy = [...todoCategories[action.payload.categoryIndex].todos];
  todosCopy.unshift(action.payload.newTodo);
  todoCategories[action.payload.categoryIndex].todos = todosCopy;

  return todoCategories;
};

const editTodo = (todoCategories, action) => {
  let todosCopy = [...todoCategories[action.payload.categoryIndex].todos];
  todosCopy[action.payload.todoIndex].name = action.payload.title;
  todoCategories[action.payload.categoryIndex].todos = todosCopy;

  return todoCategories;
};

const setTodoCompleted = (todoCategories, action) => {
  todoCategories[action.payload.categoryIndex].todos[action.payload.todoIndex].completed =
    action.payload.isCompleted;

  return todoCategories;
};

const setSearchKeywords = (state, action) => {
  return {
    ...state,
    keywords: action.payload.keywords
  };
};

const setSearchTags = (state, action) => {
  let stateCopy = { ...state };
  let tagCopy = [...state.tags];
  let index = tagCopy.indexOf(action.payload.newTag);
  if (index === -1) {
    // stateCopy.tags.push(action.payload.newTag);
    tagCopy.push(action.payload.newTag);
  } else {
    // stateCopy.tags.splice(index,1);
    tagCopy.splice(index, 1);
  }
  stateCopy.tags = tagCopy;

  return stateCopy;
};

const toggleHeight = (state, action) => {
  if (state === ADD_FORM_MIN_HEIGHT) {
    return ADD_FORM_MAX_HEIGHT;
  }
  // console.log('from toggle heigt', state, action);

  return ADD_FORM_MIN_HEIGHT;
};

const selectAddForm = (stateCopy, action) => {
  // toggleHeight(state.addFormHeight);
  stateCopy.activeAddTodoFormIndex = action.payload.index;
  if (action.payload.index !== action.payload.activeIndex) {
    stateCopy.addFormHeight = ADD_FORM_MAX_HEIGHT;
  } else {
    stateCopy.addFormHeight = toggleHeight(stateCopy.addFormHeight);
  }

  return stateCopy;
};

const setTitleToAdd = (todoToAdd, action) => {
  todoToAdd.title = action.payload.title;

  return todoToAdd;
};

const setExpDateToAdd = (todoToAdd, action) => {
  todoToAdd.expiresAt = action.payload.date;

  return todoToAdd;
};

const setTagIdsToAdd = (todoToAdd, action) => {
  let tagIdsCopy = [...todoToAdd.tagIds];
  let index = tagIdsCopy.indexOf(action.payload.id);
  if (index === -1) {
    tagIdsCopy.push(action.payload.id);
  } else {
    tagIdsCopy.splice(index, 1);
  }
  todoToAdd.tagIds = tagIdsCopy;

  return todoToAdd;
};

const setTagNamesToAdd = (todoToAdd, action) => {
  let tagNamesCopy = [...todoToAdd.tagNames];
  let index = tagNamesCopy.indexOf(action.payload.name);
  if (index === -1) {
    tagNamesCopy.push(action.payload.name);
  } else {
    tagNamesCopy.splice(index, 1);
  }
  todoToAdd.tagNames = tagNamesCopy;

  return todoToAdd;
};

const setTodoToAddCategory = (todoToAdd, action) => {
  todoToAdd.categoryId = action.payload.id;

  return todoToAdd;
};

const resetTodoToAdd = (todoToAdd) => {
  todoToAdd.title = '';
  todoToAdd.tagIds = [];
  todoToAdd.tagNames = [];
  todoToAdd.expiresAt = moment();
  todoToAdd.category = '';

  return todoToAdd;
};

const moveTodo = (state, action) => {
  let todos = [...state];
  let dragTodo = todos[action.payload.dragIndex];
  // need to swap
  todos.splice(action.payload.dragIndex, 1);
  todos.splice(action.payload.hoverIndex, 0, dragTodo);

  return todos;
};

const addCategory = (todoCategories, action) => {
  let todoCategoriesCopy = [...todoCategories];
  todoCategoriesCopy.unshift(action.payload.newCategory);

  return todoCategoriesCopy;
};

const todoList = (state = [], action) => {
  switch (action.type) {
    case 'SET_TODO_CATEGORIES':
      return {
        ...state,
        todoCategories: action.payload.todoCategories
      };
    case 'ADD_TODO':
      return {
        ...state,
        todoCategories: addTodo([...state.todoCategories], action)
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todoProps: [
          ...state.todoProps.slice(0, action.payload.index),
          ...state.todoProps.slice(action.payload.index + 1)
        ]
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todoCategories: editTodo([...state.todoCategories], action)
      };
    case 'SET_TODO_COMPLETED':
      return {
        ...state,
        todoProps: setTodoCompleted([...state.todoCategories], action)
      };
    case 'SET_TODO_PROPS':
      return setTodoProps(state, action);
    case 'SET_TODO_META_DATA':
      return setTodoMetaData(state, action);
    case 'SET_TAGS':
      return {
        ...state,
        availableTags: action.payload.tags
      };
    case 'SET_SEARCH_KEYWORDS':
      return {
        ...state,
        searchValue: setSearchKeywords(state.searchValue, action)
      };
    case 'SET_SEARCH_TAGS':
      return {
        ...state,
        searchValue: setSearchTags(state.searchValue, action)
      };
    case 'SET_TODO_TO_EDIT':
      return {
        ...state,
        todoToEdit: action.payload.todoId
      };
    case 'TOGGLE_POPUP':
      return {
        ...state,
        showPopUp: !state.showPopUp
      };
    case 'SET_POPUP_EDIT_TITLE':
      return {
        ...state,
        popUpEditTitle: action.payload.title
      };
    case 'TOGGLE_ADD_FORM':
      return selectAddForm({ ...state }, action);
    case 'SET_TITLE_TO_ADD':
      return {
        ...state,
        todoToAdd: setTitleToAdd({ ...state.todoToAdd }, action)
      };
    case 'SET_EXP_DATE_TO_ADD':
      return {
        ...state,
        todoToAdd: setExpDateToAdd({ ...state.todoToAdd }, action)
      };
    case 'SET_TAG_IDS_TO_ADD':
      return {
        ...state,
        todoToAdd: setTagIdsToAdd({ ...state.todoToAdd }, action)
      };
    case 'SET_TAG_NAMES_TO_ADD':
      return {
        ...state,
        todoToAdd: setTagNamesToAdd({ ...state.todoToAdd }, action)
      };
    case 'SET_TODO_TO_ADD_CATEGORY':
      return {
        ...state,
        todoToAdd: setTodoToAddCategory({ ...state.todoToAdd }, action)
      };
    case 'RESET_TODO_TO_ADD':
      return {
        ...state,
        todoToAdd: resetTodoToAdd({ ...state.todoToAdd })
      };
    case 'SET_CATEGORY_TO_ADD':
      return {
        ...state,
        categoryToAdd: action.payload.name
      };
    case 'RESET_CATEGORY_TO_ADD':
      return {
        ...state,
        categoryToAdd: ''
      };
    case 'ADD_CATEGORY_LOCALLY':
      return {
        ...state,
        todoCategories: addCategory(state.todoCategories, action)
      };
    case 'TOGGLE_ADD_CATEGORY_FORM':
      return {
        ...state,
        addCategoryFormHeight: toggleHeight(state.addCategoryFormHeight, action)
      };
    case 'RESET_STORE':
      return action.payload.defaultState.todoList;
    case 'MOVE_TODO':
      return {
        ...state,
        todoProps: moveTodo(state.todoProps, action)
      };
    default:
      return state;
  }
};

export default todoList;

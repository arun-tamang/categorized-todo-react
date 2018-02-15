import SERVICES from '../services/serviceContainer';
import * as Types from '../utils/constants/todoActionTypes';

// add todo
export function addTodo(newTodo, categoryIndex) {
  return {
    type: Types.ADD_TODO,
    payload: {
      newTodo,
      categoryIndex
    }
  };
}

// remove todo
export function removeTodo(index) {
  return {
    type: Types.REMOVE_TODO,
    payload: {
      index
    }
  };
}

// edit todo
export function editTodo(title, todoIndex, categoryIndex) {
  return {
    type: Types.EDIT_TODO,
    payload: {
      title,
      todoIndex,
      categoryIndex
    }
  };
}

// set todo completed
export function setTodoCompleted(isCompleted, todoIndex, categoryIndex) {
  return {
    type: Types.SET_TODO_COMPLETED,
    payload: {
      isCompleted,
      todoIndex,
      categoryIndex
    }
  };
}

// search todo
export function searchTodo(keys, tags) {
  return {
    type: Types.SEARCH_TODO,
    payload: {
      keys,
      tags
    }
  };
}

// set todoProps
export function setTodoProps(todoProps) {
  return {
    type: Types.SET_TODO_PROPS,
    payload: {
      todoProps
    }
  };
}

// set metadata
export function setTodoMetaData(metadata) {
  return {
    type: Types.SET_TODO_META_DATA,
    payload: {
      metadata
    }
  };
}

// set search keywords
export function setSearchKeywords(keywords) {
  return {
    type: Types.SET_SEARCH_KEYWORDS,
    payload: {
      keywords
    }
  };
}

// set search tags
export function setSearchTags(newTag) {
  return {
    type: Types.SET_SEARCH_TAGS,
    payload: {
      newTag
    }
  };
}

// set todoToEdit
export function setTodoToEdit(todoId) {
  return {
    type: Types.SET_TODO_TO_EDIT,
    payload: {
      todoId
    }
  };
}

export function moveTodo(dragIndex, hoverIndex) {
  return {
    type: Types.MOVE_TODO,
    payload: {
      dragIndex,
      hoverIndex
    }
  };
}

// fetch todos
export function fetchTodos(userId, pageNo) {
  return (dispatch) => {
    return SERVICES.downloadTodos(userId, pageNo).then(
      (downloadedTodos) => {
        if (downloadedTodos) {
          let extractedTodos = SERVICES.todoService.extractTodos(
            downloadedTodos.data
          );
          dispatch(setTodoProps(extractedTodos));
          dispatch(setTodoMetaData(downloadedTodos.metadata));
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

// add todos
// export function addTodos (title, tags) {
// }

// search todos
export function searchTodos(searchValue, userId) {
  return (dispatch) => {
    return SERVICES.searchTodo(searchValue, userId).then((response) => {
      if (response) {
        let extractedTodos = SERVICES.todoService.extractTodos(
          response.data.data
        );
        // this.currentNumTodos = extractedTodos.length;
        dispatch(setTodoProps(extractedTodos));
      }
    });
  };
}

export function setTodoCategories(todoCategories) {
  return {
    type: Types.SET_TODO_CATEGORIES,
    payload: {
      todoCategories
    }
  };
}

export function fetchTodoCategories(userId) {
  return (dispatch) => {
    return SERVICES.downloadTodoCategories(userId).then(
      (downloadedCategories) => {
        if (downloadedCategories) {
          dispatch(setTodoCategories(downloadedCategories));
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function setTags(tags) {
  return {
    type: Types.SET_TAGS,
    payload: {
      tags
    }
  };
}

export function fetchTags(userId) {
  return (dispatch) => {
    return SERVICES.fetchTags(userId).then(
      (fetchedTags) => {
        if (fetchedTags) {
          dispatch(setTags(fetchedTags.data));
        }
        // dispatch(setTodoProps(extractedTodos));
        // dispatch(setTodoMetaData(downloadedTodos.metadata));
      },
      (err) => {
        console.log(err);
      }
    );
  };
}

export function togglePopUp() {
  return {
    type: Types.TOGGLE_POPUP
  };
}

export function setPopUpEditTitle(title) {
  return {
    type: Types.SET_POPUP_EDIT_TITLE,
    payload: {
      title
    }
  };
}

export function toggleAddForm(index, activeIndex) {
  return {
    type: Types.TOGGLE_ADD_FORM,
    payload: {
      index,
      activeIndex
    }
  };
}

export function setTitleToAdd(title) {
  return {
    type: Types.SET_TITLE_TO_ADD,
    payload: {
      title
    }
  };
}

export function setExpDateToAdd(date) {
  return {
    type: Types.SET_EXP_DATE_TO_ADD,
    payload: {
      date
    }
  };
}

export function setTagIdsToAdd(id) {
  return {
    type: Types.SET_TAG_IDS_TO_ADD,
    payload: {
      id
    }
  };
}

export function setTagNamesToAdd(name) {
  return {
    type: Types.SET_TAG_NAMES_TO_ADD,
    payload: {
      name
    }
  };
}

export function setTodoToAddCategory(id) {
  return {
    type: Types.SET_TODO_TO_ADD_CATEGORY,
    payload: {
      id
    }
  };
}

export function resetTodoToAdd() {
  return {
    type: Types.RESET_TODO_TO_ADD
  };
}

export function setCategoryToAdd(name) {
  return {
    type: Types.SET_CATEGORY_TO_ADD,
    payload: {
      name
    }
  };
}

export function resetCategoryToAdd() {
  return {
    type: Types.RESET_CATEGORY_TO_ADD
  };
}

export function toggleAddCategoryForm() {
  return {
    type: Types.TOGGLE_ADD_CATEGORY_FORM
  };
}

export function addCategoryLocally(newCategory) {
  return {
    type: Types.ADD_CATEGORY_LOCALLY,
    payload: {
      newCategory
    }
  };
}

export function addCategory(userId, name) {
  return (dispatch) => {
    SERVICES.addCategory(userId, name).then((result) => {
      dispatch(addCategoryLocally({ ...result, todos: [] }));
      dispatch(resetCategoryToAdd());
    });
  };
}

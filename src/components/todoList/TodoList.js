import React from 'react';
import TodoCategory from '../TodoCategory';
import AddCategoryForm from '../forms/AddCategoryForm';
import SERVICES from '../../services/serviceContainer';

const TodoList = (props) => {
  const initiateEdit = (title, id) => {
    props.setPopUpEditTitle(title);
    props.setTodoToEdit(id);
  };

  const performEdit = (title, categoryIndex) => {
    let id = props.todoToEdit;
    SERVICES.editTodo(title, id, props.userId).then((response) => {
      let todoIndex = SERVICES.todoService.getTodoIndex(
        id,
        props.todoCategories[categoryIndex].todos
      );
      props.editTodo(title, todoIndex, categoryIndex);
    });
    props.setTodoToEdit(-1);
  };

  const setTodoCompleted = (isCompleted, todoId, categoryIndex) => {
    SERVICES.setTodoCompleted(isCompleted, todoId, props.userId).then(
      (response) => {
        const todoIndex = SERVICES.todoService.getTodoIndex(
          todoId,
          props.todoCategories[categoryIndex].todos
        );
        props.setTodoCompleted(isCompleted, todoIndex, categoryIndex);
      }
    );
  };

  const changeCompleted = (completedValue, todoId, categoryIndex) => {
    const todoIndex = SERVICES.todoService.getTodoIndex(
      todoId,
      props.todoCategories[categoryIndex].todos
    );
    props.setTodoCompleted(completedValue, todoIndex, categoryIndex);
  };

  return (
    <div>
      <div className="container">
        <div className="todos-container">
          <h2 className="todo-header">{props.title}</h2>
          <div className="add-button-container">
            <h3 className="add-form-title">Add Category</h3>
            <button
              onClick={props.toggleAddCategoryForm}
              className="fa fa-plus"
            />
          </div>
          <div className="add-category-wrapper">
            <AddCategoryForm
              height={props.addCategoryFormHeight}
              categoryToAdd={props.categoryToAdd}
              userId={props.userId}
              setCategoryToAdd={props.setCategoryToAdd}
              addCategory={props.addCategory}
            />
          </div>
          {props.todoCategories.map((item, index) => (
            <TodoCategory
              key={String(index)}
              userId={props.userId}
              categoryIndex={index}
              categoryId={item.id}
              name={item.name}
              todos={item.todos}
              todoToAdd={props.todoToAdd}
              todoToEdit={props.todoToEdit}
              initiateEdit={initiateEdit}
              setEditValue={props.setPopUpEditTitle}
              editTitle={props.popUpEditTitle}
              performEdit={performEdit}
              setTodoCompleted={setTodoCompleted}
              changeCompleted={changeCompleted}
              activeAddTodoFormIndex={props.activeAddTodoFormIndex}
              addFormHeight={
                props.activeAddTodoFormIndex === index ? props.addFormHeight : 0
              }
              availableTags={props.availableTags}
              setTitleToAdd={props.setTitleToAdd}
              setExpDateToAdd={props.setExpDateToAdd}
              setTagIdsToAdd={props.setTagIdsToAdd}
              setTagNamesToAdd={props.setTagNamesToAdd}
              setTodoToAddCategory={props.setTodoToAddCategory}
              toggleAddForm={props.toggleAddForm}
              addTodo={props.addTodo}
              resetTodoToAdd={props.resetTodoToAdd}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;

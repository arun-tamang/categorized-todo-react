import React from 'react';
import TodoCategoryContainer from '../../containers/TodoCategoryContainer';
import AddCategoryForm from '../forms/AddCategoryForm';

const TodoList = (props) => {
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
            <TodoCategoryContainer
              key={String(index)}
              userId={props.userId}
              categoryIndex={index}
              categoryId={item.id}
              name={item.name}
              todos={item.todos}
              todoToAdd={props.todoToAdd}
              todoToEdit={props.todoToEdit}
              initiateEdit={props.initiateEdit}
              setEditValue={props.setPopUpEditTitle}
              editTitle={props.popUpEditTitle}
              performEdit={props.performEdit}
              setTodoCompleted={props.setTodoCompleted}
              changeCompleted={props.changeCompleted}
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

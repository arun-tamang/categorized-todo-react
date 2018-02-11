import React from 'react';
import TodoTable from './todoTable/TodoTable';
import { AddTodoForm } from './forms/AddTodo';

export default (props) => {
  return (
    <div className="category-container">
      <h3 className="category-name">Category: {props.name}</h3>
      <TodoTable
        categoryIndex={props.categoryIndex}
        todoProps={props.todos}
        todoToEdit={props.todoToEdit}
        initiateEdit={props.initiateEdit}
        setEditValue={props.setEditValue}
        editTitle={props.editTitle}
        performEdit={props.performEdit}
        setTodoCompleted={props.setTodoCompleted}
        changeCompleted={props.changeCompleted}
      />
      <div className="add-button-container">
        <h3 className="add-form-title">Add Todo</h3>
        <button
          onClick={() =>
            props.toggleAddForm(
              props.categoryIndex,
              props.activeAddTodoFormIndex
            )
          }
          className="fa fa-plus"
        />
      </div>
      <div className="add-wrapper">
        <AddTodoForm
          height={props.addFormHeight}
          addTitle={props.todoToAdd.title}
          activeTagIds={props.todoToAdd.tagIds}
          categoryId={props.categoryId}
          availableTags={props.availableTags}
          expiryDate={props.todoToAdd.expiresAt}
          handleAddSubmit={props.handleAdd}
          setTitleToAdd={props.setTitleToAdd}
          setExpDateToAdd={props.setExpDateToAdd}
          setTagIdsToAdd={props.setTagIdsToAdd}
          setTagNamesToAdd={props.setTagNamesToAdd}
          setTodoToAddCategory={props.setTodoToAddCategory}
          index={props.categoryIndex}
        />
      </div>
    </div>
  );
};

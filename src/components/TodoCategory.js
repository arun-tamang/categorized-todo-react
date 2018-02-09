import React from 'react';
import _ from 'lodash';
import TodoTable from './todoTable/TodoTable';
import { AddTodoForm } from './forms/AddTodo';
import SERVICES from '../services/serviceContainer';

export default (props) => {
  const performEdit = (title) => {
    props.performEdit(title, props.categoryIndex);
  };

  const setTodoCompleted = (isCompleted, todoId) => {
    props.setTodoCompleted(isCompleted, todoId, props.categoryIndex);
  };

  const changeCompleted = (isCompleted, todoId) => {
    props.changeCompleted(isCompleted, todoId, props.categoryIndex);
  };

  const handleAdd = () => {
    let todoToAdd = { ...props.todoToAdd, categoryId: props.categoryId };

    SERVICES.addTodo(props.userId, todoToAdd)
      .then((response) => {
        response = _.mapKeys(response, function(value, key) {
          return _.camelCase(key);
        });
        let tags = props.todoToAdd.tagNames.map((item) => ({ name: item }));
        props.addTodo({ ...response, tags }, props.categoryIndex);
        props.resetTodoToAdd();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="category-container">
      <h3 className="category-name">Category: {props.name}</h3>
      <TodoTable
        todoProps={props.todos}
        todoToEdit={props.todoToEdit}
        initiateEdit={props.initiateEdit}
        setEditValue={props.setEditValue}
        editTitle={props.editTitle}
        performEdit={performEdit}
        setTodoCompleted={setTodoCompleted}
        changeCompleted={changeCompleted}
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
          handleAddSubmit={handleAdd}
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

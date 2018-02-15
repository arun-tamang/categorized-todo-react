import React from 'react';
import TodoCategory from '../components/TodoCategory';
import { addTodo } from '../services/todoListService/adderService';
import _ from 'lodash';

export default class TodoCategoryContainer extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  performEdit = (title) => {
    this.props.performEdit(title, this.props.categoryIndex);
  };

  setTodoCompleted = (isCompleted, todoId) => {
    this.props.setTodoCompleted(isCompleted, todoId, this.props.categoryIndex);
  };

  changeCompleted = (isCompleted, todoId) => {
    this.props.changeCompleted(isCompleted, todoId, this.props.categoryIndex);
  };

  handleAdd = () => {
    let todoToAdd = {
      ...this.props.todoToAdd,
      categoryId: this.props.categoryId
    };

    addTodo(this.props.userId, todoToAdd)
      .then((response) => {
        response = _.mapKeys(response, function (value, key) {
          return _.camelCase(key);
        });
        let tags = this.props.todoToAdd.tagNames.map((item) => ({
          name: item
        }));
        this.props.addTodo({ ...response, tags }, this.props.categoryIndex);
        this.props.resetTodoToAdd();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <TodoCategory
        {...this.props}
        performEdit={this.performEdit}
        setTodoCompleted={this.setTodoCompleted}
        changeCompleted={this.changeCompleted}
        handleAdd={this.handleAdd}
      />
    );
  }
}

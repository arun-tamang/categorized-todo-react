import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodoList from '../components/todoList/TodoList';
import * as actionCreators from '../actions/todoActionCreators';
import { editTodo } from '../services/todoListService/editService';
import * as todoService from '../services/todoListService/todoService';
import { setTodoCompleted } from '../services/todoListService/setTodoCompleted';

class TodoListContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  initiateEdit = (title, id) => {
    this.props.setPopUpEditTitle(title);
    this.props.setTodoToEdit(id);
  };

  performEdit = (title, categoryIndex) => {
    let id = this.props.todoToEdit;
    editTodo(title, id, this.props.userId).then((response) => {
      let todoIndex = todoService.getTodoIndex(
        id,
        this.props.todoCategories[categoryIndex].todos
      );
      this.props.editTodo(title, todoIndex, categoryIndex);
    });
    this.props.setTodoToEdit(-1);
  };

  setTodoCompleted = (isCompleted, todoId, categoryIndex) => {
    setTodoCompleted(isCompleted, todoId, this.props.userId).then(
      (response) => {
        const todoIndex = todoService.getTodoIndex(
          todoId,
          this.props.todoCategories[categoryIndex].todos
        );
        this.props.setTodoCompleted(isCompleted, todoIndex, categoryIndex);
      }
    );
  };

  changeCompleted = (completedValue, todoId, categoryIndex) => {
    const todoIndex = todoService.getTodoIndex(
      todoId,
      this.props.todoCategories[categoryIndex].todos
    );
    this.props.setTodoCompleted(completedValue, todoIndex, categoryIndex);
  };

  componentDidMount() {
    this.props.fetchTodoCategories(this.props.userId).then(() => {
      this.props.fetchTags(this.props.userId);
    });
  }

  render() {
    return (
      <TodoList
        {...this.props}
        initiateEdit={this.initiateEdit}
        performEdit={this.performEdit}
        setTodoCompleted={this.setTodoCompleted}
        changeCompleted={this.changeCompleted}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.todoList,
  userId: state.user.userDetails.id
});

const mapDispachToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispachToProps)(TodoListContainer);

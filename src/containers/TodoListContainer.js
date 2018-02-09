import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/todoActionCreators';
import TodoList from '../components/todoList/TodoList';

const mapStateToProps = (state) => ({
  ...state.todoList,
  userId: state.user.userDetails.id
});

const mapDispachToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch);

const TodoListContainer = connect(mapStateToProps, mapDispachToProps)(TodoList);

export default TodoListContainer;

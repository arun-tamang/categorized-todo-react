import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle, withHandlers, withState, branch, renderComponent } from 'recompose';
import Spinner from '../components/Spinner';
import TodoList from '../components/todoList/TodoList';
import * as actionCreators from '../actions/todoActionCreators';
import { editTodo } from '../services/todoListService/editService';
import * as todoService from '../services/todoListService/todoService';
import { setTodoCompleted } from '../services/todoListService/setTodoCompleted';

const mapStateToProps = (state) => ({
  ...state.todoList,
  userId: state.user.userDetails.id
});

const mapDispachToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch);

const getLoadingStatus = ({ isLoading }) => {
  return isLoading;
};

const withSpinnerWhileLoading = branch(
  getLoadingStatus,
  renderComponent(Spinner)
);

const enhance = compose(
  connect(mapStateToProps, mapDispachToProps),
  withHandlers({
    initiateEdit: (props) => (title, id) => {
      props.setPopUpEditTitle(title);
      props.setTodoToEdit(id);
    },
    performEdit: (props) => (title, categoryIndex) => {
      let id = props.todoToEdit;
      editTodo(title, id, props.userId).then((response) => {
        let todoIndex = todoService.getTodoIndex(
          id,
          props.todoCategories[categoryIndex].todos
        );
        props.editTodo(title, todoIndex, categoryIndex);
      });
      props.setTodoToEdit(-1);
    },
    setTodoCompleted: (props) => (isCompleted, todoId, categoryIndex) => {
      setTodoCompleted(isCompleted, todoId, props.userId).then((response) => {
        const todoIndex = todoService.getTodoIndex(
          todoId,
          props.todoCategories[categoryIndex].todos
        );
        props.setTodoCompleted(isCompleted, todoIndex, categoryIndex);
      });
    },
    changeCompleted: (props) => (completedValue, todoId, categoryIndex) => {
      const todoIndex = todoService.getTodoIndex(
        todoId,
        props.todoCategories[categoryIndex].todos
      );
      props.setTodoCompleted(completedValue, todoIndex, categoryIndex);
    }
  }),
  withState('isLoading', 'setLoading', true),
  lifecycle({
    componentDidMount() {
      this._ismounted = true;
      this.props.fetchTodoCategories(this.props.userId).then(() => {
        this.props.fetchTags(this.props.userId).then(() => {
          setTimeout(() => {
            if (this._ismounted === true) {
              this.setState((prevState) => ({ isLoading: false }));
            }
          }, 3000);
        });
      });
    },
    componentWillUnmount() {
      this._ismounted = false;
    }
  }),
  withSpinnerWhileLoading
);

export default enhance(TodoList);

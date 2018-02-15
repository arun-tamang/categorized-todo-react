import _ from 'lodash';
import { compose, pure, withHandlers } from 'recompose';
import TodoCategory from '../components/TodoCategory';
import { addTodo } from '../services/todoListService/adderService';

const enhance = compose(
  pure,
  withHandlers({
    performEdit: ({ performEdit, categoryIndex }) => (title) => {
      performEdit(title, categoryIndex);
    },
    setTodoCompleted: ({ setTodoCompleted, categoryIndex }) => (isCompleted, todoId) => {
      setTodoCompleted(isCompleted, todoId, categoryIndex);
    },
    changeCompleted: (props) => (isCompleted, todoId) => {
      props.changeCompleted(isCompleted, todoId, props.categoryIndex);
    },
    handleAdd: (props) => () => {
      let todoToAdd = {
        ...props.todoToAdd,
        categoryId: props.categoryId
      };

      addTodo(props.userId, todoToAdd)
        .then((response) => {
          response = _.mapKeys(response, function(value, key) {
            return _.camelCase(key);
          });
          let tags = props.todoToAdd.tagNames.map((item) => ({
            name: item
          }));
          props.addTodo({ ...response, tags }, props.categoryIndex);
          props.resetTodoToAdd();
        })
        .catch((err) => console.log(err));
    }
  })
);

export default enhance(TodoCategory);

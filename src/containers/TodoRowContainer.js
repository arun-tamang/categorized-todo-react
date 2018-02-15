import TodoRow from '../components/todoTable/TodoRow';
import { compose, pure, withHandlers, withState } from 'recompose';

const enhance = compose(
  pure,
  withState('completedVals', 'setCompletedVals', [true, false]),
  withHandlers({
    initiateEdit: (props) => (e) => {
      props.initiateEdit(props.title, props.id);
    },
    handleTitleChange: (props) => (e) => {
      props.handleTitleChange(e.target.value);
    },
    performEdit: (props) => (e) => {
      if (e.keyCode === 13) {
        props.performEdit(e.target.value);
      }
    },
    setCompleted: (props) => (value) => {
      if (props.completedVals.indexOf(value) !== -1) {
        props.setTodoCompleted(value, props.id);
      }
    },
    changeCompleted: (props) => (value) => {
      props.changeCompleted(value, props.id);
    }
  })
);

export default enhance(TodoRow);

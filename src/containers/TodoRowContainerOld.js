import React from 'react';
import TodoRow from '../components/todoTable/TodoRow';

export default class TodoRowContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.completedVals = [true, false];
  }

  initiateEdit = (e) => {
    this.props.initiateEdit(this.props.title, this.props.id);
  };

  handleTitleChange = (e) => {
    this.props.handleTitleChange(e.target.value);
  };

  performEdit = (e) => {
    if (e.keyCode === 13) {
      this.props.performEdit(e.target.value);
    }
  };

  setCompleted = (value) => {
    if (this.completedVals.indexOf(value) !== -1) {
      this.props.setTodoCompleted(value, this.props.id);
    }
  };

  changeCompleted = (value) => {
    this.props.changeCompleted(value, this.props.id);
  };

  render() {
    return (
      <TodoRow
        {...this.props}
        completedVals={this.completedVals}
        initiateEdit={this.initiateEdit}
        handleTitleChange={this.handleTitleChange}
        performEdit={this.performEdit}
        setCompleted={this.setCompleted}
        changeCompleted={this.changeCompleted}
      />
    );
  }
}

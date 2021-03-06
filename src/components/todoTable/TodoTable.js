import React from 'react';
import TodoRowContainer from '../../containers/TodoRowContainer';

const TodoTable = (props) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>S.N.</th>
          <th>title</th>
          <th>completed</th>
          <th>tags</th>
          <th>createdAt</th>
          <th>expiresAt</th>
        </tr>
      </thead>
      <tbody>
        {props.todoProps.map((item, i) => (
          <TodoRowContainer
            key={item.id}
            id={item.id}
            index={i}
            title={item.name}
            completed={item.completed}
            createdAt={item.createdAt}
            expiresAt={item.expiresAt}
            editTitle={props.editTitle}
            tags={item.tags}
            initiateEdit={props.initiateEdit}
            handleTitleChange={props.setEditValue}
            enableEdit={item.id === props.todoToEdit ? true : false}
            performEdit={props.performEdit}
            setTodoCompleted={props.setTodoCompleted}
            changeCompleted={props.changeCompleted}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;

import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { EditButton } from '../buttons/EditButton.js';
import { DeleteButton } from '../buttons/DeleteButton.js';

const todoSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const todoTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveTodo(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const Todo = (props) => {
  let buttonStyle = {
    margin: '10px 10px 10px 0',
    padding: '5px 0'
  };

  let handleEditClick = () => {
    props.handleEdit(props.title, props.id);
  };

  let handleDeleteClick = () => {
    props.handleDelete(props.id);
  };

  const { connectDragSource, connectDropTaget, isDragging } = props;

  return connectDragSource(
    connectDropTaget(
      <li style={{ opacity: isDragging ? 0 : 1 }} className="todo">
        <EditButton buttonStyle={buttonStyle} handleClick={handleEditClick} />
        <DeleteButton
          buttonStyle={buttonStyle}
          handleClick={handleDeleteClick}
        />
        <span> {props.title} </span>
        <ul className="todo-tags-list">
          <i className="fa fa-tags" />
          {props.tags.map((tagItem, index) => (
            <li key={index}>
              <a>{tagItem}</a>
            </li>
          ))}
        </ul>
      </li>
    )
  );
};

export default DropTarget('todo', todoTarget, connect => ({
  connectDropTaget: connect.dropTarget()
}))(
  DragSource('todo', todoSource, (connect,monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(Todo)
);

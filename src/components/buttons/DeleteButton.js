import React from 'react';

export const DeleteButton = (props) => {
  // let name = 'Delete';

  return (
    <button
      style={props.buttonStyle}
      className='slide btn btn-danger '
      onClick={props.handleClick}
    >
      <i className='fa fa-trash' />
    </button>
  );
};

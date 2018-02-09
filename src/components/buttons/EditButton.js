import React from 'react';

export const EditButton = (props) => {
  let handleClick = () => {
    props.handleClick();
  };

  return (
    <button
      style={props.buttonStyle}
      className='slide btn btn-success'
      onClick={handleClick}
    >
      <i className='fa fa-pencil' />
    </button>
  );
};

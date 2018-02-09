import React from 'react';

export const AddButton = (props) => {

  let name = 'Add';

  return (
    <button style={props.buttonStyle} onClick={props.handleClick}>
        {name}
      </button>
  )
}
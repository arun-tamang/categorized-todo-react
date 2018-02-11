import React from 'react';

export default (props) => {
  return props.editable ? (
    <textarea
      style={{ border: 'none', width: '100%' }}
      value={props.editTitle}
      onKeyDown={props.performEdit}
      onChange={props.handleChange}
    />
  ) : (
    <p onDoubleClick={props.initiateEdit}> {props.title} </p>
  );
};

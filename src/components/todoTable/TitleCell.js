import React from 'react';

export default (props) => {
  // console.log(props);
  const initiateEdit = (e) => {
    props.initiateEdit(props.title, props.id);
  };

  const handleChange = (e) => {
    props.handleChange(e.target.value);
  };

  const performEdit = (e) => {
    if (e.keyCode === 13) {
      props.performEdit(e.target.value);
    }
  };

  return (
    props.editable ? (
      <textarea
        style={{border: "none", width: "100%"}}
        value={props.editTitle}
        onKeyDown={performEdit}
        onChange={handleChange}
      />
    ) :
      (
        <p onDoubleClick={initiateEdit}> {props.title} </p>
      )
  );
};
